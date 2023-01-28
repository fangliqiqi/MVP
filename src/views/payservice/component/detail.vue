<template>
	<div class="edit-staff-page">
		<div class="content">
			<el-tabs v-model="activeName" type="card" class="demo-tabs" v-loading="loading">
				<!-- 薪资报表 -->
				<el-tab-pane :label="salaryLabel" name="first">
					<pro-table 
						ref="proTableRef" 
						row-key="id" 
						:columns="columns" 
						:dataSource="dataList" 
						:styleChange="true"
						:tableRowClassName="tableRowClassName"
					>
						<template v-slot:option="item">
							<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
						</template>
					</pro-table>
					<el-pagination
						v-model:currentPage="state.pagination.currentPage"
						:page-size="10"
						background
						layout="total, prev, pager, next, jumper"
						:total="totalNum"
						@current-change="handleCurrentChange"
						hide-on-single-page
					/>
				</el-tab-pane>

				<!-- 情况说明 -->
				<el-tab-pane label="情况说明" name="second">
					<el-form label-width="110px" v-if="state.salary.status != 0">
						<div v-for="(item, index) in infoShow" :key="index">
							<div class="title" v-if="item.remarkText || item.fileList.length || item.type == '11'">
								<span>{{ item.filelabel }}</span>
							</div>
							<el-row style="margin-top: 20px" v-if="item.remarkText || item.fileList.length || item.type == '11'">
								<el-col :span="24">
									<el-form-item :label="item.remarkLabel">
										{{ item.remarkText }}
									</el-form-item>
									<el-form-item label="附件">
										<div>
											<a v-for="file in item.fileList" :href="file.attaUrl" :key="file.attaUrl" target="_blank" style="display: block">
												{{ file.attaName }}
											</a>
										</div>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</el-form>
					<empty-view v-else></empty-view>
				</el-tab-pane>
				<el-tab-pane label="流程进展明细" name="third">
					<div class="check_right" v-if="auditLogList.length > 0">
						<el-timeline style="padding: 20px">
							<el-timeline-item v-for="(item, index) in auditLogList" :key="index" color="#58BD7D" size="large" :icon="Select">
								<div class="check_content">
									<p>{{ item.nodeId }}</p>
									<el-form-item label="操作人：">
										{{ item.approvalManName }}
									</el-form-item>
									<el-form-item label="操作时间：">
										{{ item.approvalTime }}
									</el-form-item>
									<el-form-item label="备注：" v-if="item.approvalOpinion">
										<div>
											{{ item.approvalOpinion }}
										</div>
									</el-form-item>
								</div>
							</el-timeline-item>
						</el-timeline>
					</div>
					<empty-view v-else></empty-view>
				</el-tab-pane>
			</el-tabs>
			<div class="operation-container">
				<el-button type="primary" @click="onExport" style="height: 100%">导 出</el-button>
				<el-button @click="onCancel" style="height: 100%">关 闭</el-button>
			</div>
		</div>

		<!-- 薪资详情 -->
		<table-detail ref="tableDetailRef" labelWidth="160px" formType="Array" />
	</div>
</template>
<script setup name="detail">
import { useRoute, useRouter } from 'vue-router';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import TableDetail from '/@/components/TableDetail/index.vue';
import EmptyView from '/@/components/EmptyView/index.vue';
import { EMPTY_PLACEHOLDER, closeCurrentTab,getDictByItemTypes } from '/@/utils/utils';
import { SALARY_EXPORT_HEADER,LABOR_EXPORT_HEADER,BOOK_EXPORT_HEADER } from '/@/utils/header';
import { exportExcelSheet } from '/@/utils/excel';
import { idToArea } from '/@/utils/city';
import { Select } from '@element-plus/icons-vue';
import { getpayImportDetail } from '/@/api/payservice/payimport';
import { getFile } from '/@/api/file';
import { ElMessage } from 'element-plus';
import moment from 'moment';

const proTableRef = ref(null);
const route = useRoute();
const router = useRouter();
const tableDetailRef = ref(null);
const { proxy } = getCurrentInstance();

const activeName = ref('first');
const state = reactive({
	name: '',
	salary: {}, //基本数据
	salaryAccountList: [], //薪资报表
	auditLogList: [], //流程进展明细
	loading: false,
	infoShow: [
		{
			filelabel: '薪资原表',
			type: 11,
			remark: 'remark',
			remarkLabel: '说明',
			fileList: [],
		},
		{
			filelabel: '自有员工发放说明(工资表中存在自有员工)',
			type: 8,
			remark: 'ownRemark',
			remarkLabel: '发放原因',
			fileList: [],
		},
		{
			filelabel: '薪资员工发放稿费/劳务费说明',
			type: 12,
			remark: 'haveSalaryRemark',
			remarkLabel: '发放原因',
			fileList: [],
		},
		{
			filelabel: '特殊值(3500/5000)发放说明',
			type: 13,
			remark: 'haveSpecialRemark',
			remarkLabel: '发放原因',
			fileList: [],
		},
		{
			filelabel: '重复金额发放原因说明',
			type: 14,
			remark: 'repeatRemark',
			remarkLabel: '发放原因',
			fileList: [],
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: [], // 权限标识
		},
	],
	pagination: {
		currentPage: 1,
	}, //分页
	dictKeys:[  //字典项
		'salary_status',//薪酬状态
	],
	salaryStatus:{},//薪酬状态

});

const { cellBtns, salaryAccountList, infoShow, auditLogList, loading } = toRefs(state);

const columns = computed(() => {
	// 薪资
	const pay = [
		{
			dataIndex: 'empName',
			title: '员工姓名',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'salaryStyle',
			title: '工资发放方式',
			hideInSearch: true,
			minWidth: 160,
			valueEnum: {
				0: '现金',
				1: '转账',
			},
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'empPhone',
			title: '手机号码',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'bankNo',
			title: '银行卡号',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'bankName',
			title: '开户行总行',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'bankProvince',
			title: '开户行省',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueType: 'addRess',
			params: {
				pro: 'bankProvince',
			},
		},
		{
			dataIndex: 'bankCity',
			title: '开户行市',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueType: 'addRess',
			params: {
				city: 'bankCity',
			},
		},
		{
			dataIndex: 'bankSubName',
			title: '开户行支行',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'salaryGiveTime',
			title: '工资发放时间',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '立即发',
				1: '暂停发',
			},
		},
		{
			dataIndex: 'deduSocialMonth',
			title: '社保扣缴月份',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'deduProvidentMonth',
			title: '公积金扣缴月份',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'socialPriority',
			title: '社保优先级',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '生成',
				1: '缴纳',
			},
		},
		{
			dataIndex: 'fundPriority',
			title: '公积金优先级',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '生成',
				1: '缴纳',
			},
		},
		{
			dataIndex: 'annualBonusType',
			title: '年终奖扣税方案',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '合并',
				1: '单独',
			},
		},
		{
			dataIndex: 'isDeductSocial',
			title: '是否扣除社保',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '否',
				1: '是',
			},
		},
		{
			dataIndex: 'isDeductFund',
			title: '是否扣除公积金',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '否',
				1: '是',
			},
		},
		{
			dataIndex: 'salaryMonth',
			title: '工资月份',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'deptName',
			title: '项目名称',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'isRepeat',
			title: '本月是否重复金额',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '否',
				1: '是',
			},
		},
		{
			dataIndex: 'ownFlag',
			title: '是否自有员工',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '否',
				1: '是',
			},
		},
		{
			dataIndex: 'haveSpecialFlag',
			title: '是否薪资特殊值',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '否',
				1: '是',
			},
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			minWidth: 140,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	];
	// 劳务费
	const labor = [
		{
			dataIndex: 'empName',
			title: '员工姓名',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'empPhone',
			title: '手机号码',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'relaySalary',
			title: '劳务费',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'bankNo',
			title: '银行卡号',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'bankName',
			title: '开户行总行',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'bankProvince',
			title: '开户行省',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueType: 'addRess',
			params: {
				pro: 'bankProvince',
			},
		},
		{
			dataIndex: 'bankCity',
			title: '开户行市',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueType: 'addRess',
			params: {
				city: 'bankCity',
			},
		},
		{
			dataIndex: 'bankSubName',
			title: '开户行支行',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'salaryGiveTime',
			title: '工资发放时间',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '立即发',
				1: '暂停发',
			},
		},
		{
			dataIndex: 'isPersonTax',
			title: '是否个人承担部分税费',
			hideInSearch: true,
			minWidth: 200,
			valueEnum: {
				0: '公司承担全部税费',
				1: '个人承担部分税费',
				2:'个人承担全部税费'
			},
		},
		{
			dataIndex: 'salaryTax',
			title: '个税-个人承担',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'salaryTaxUnit',
			title: '个税-单位承担',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'relaySalaryUnit',
			title: '公司应发',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'actualSalary',
			title: '个人实收',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'isRepeat',
			title: '本月是否重复金额',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '否',
				1: '是',
			},
		},
		{
			dataIndex: 'ownFlag',
			title: '是否自有员工',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '否',
				1: '是',
			},
		},
		{
			dataIndex: 'haveSalaryFlag',
			title: '是否发薪员工',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '否',
				1: '是',
			},
		},
	];
	// 稿酬
	const copy = [
		{
			dataIndex: 'empName',
			title: '员工姓名',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'empPhone',
			title: '手机号码',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'relaySalary',
			title: '稿酬',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'bankNo',
			title: '银行卡号',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'bankName',
			title: '开户行总行',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'bankProvince',
			title: '开户行省',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueType: 'addRess',
			params: {
				pro: 'bankProvince',
			},
		},
		{
			dataIndex: 'bankCity',
			title: '开户行市',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueType: 'addRess',
			params: {
				city: 'bankCity',
			},
		},
		{
			dataIndex: 'bankSubName',
			title: '开户行支行',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'salaryTax', 
			title: '个税',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'actualSalary',
			title: '个人实收',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'isRepeat',
			title: '本月是否重复金额',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '否',
				1: '是',
			},
		},
		{
			dataIndex: 'ownFlag',
			title: '是否自有员工',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '否',
				1: '是',
			},
		},
		{
			dataIndex: 'haveSalaryFlag',
			title: '是否发薪员工',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
			valueEnum: {
				0: '否',
				1: '是',
			},
		},
		
	];
	const type = state.salary.formType;
	if (type == '0'||type == '1') {
		return pay;
	} else if (type == '3') {
		return labor;
	} else if (type == '4') {
		return copy;
	}
});

const onCellClick = (record, item) => {
	if (record == 'detail') {
		// 薪资详情
		const data = item.saiList.map((it) => {
			it.label = it.cnName;
			it.key = it.salaryMoney??it.textValue;
			it.key = it.key == 0 ? '0.00' : it.key;
			return it;
		});
		
		tableDetailRef.value && tableDetailRef.value.openDialog(data, [], salaryLabel);
	}
};

const salaryLabel = computed(() => {
	const type = state.salary.formType;
	if (type == '0') {
		return '薪资报表';
	}else if(type == '1'){
		return '绩效报表';
	}else if (type == '3') {
		return '劳务费报表';
	} else if (type == '4') {
		return '稿酬报表';
	}
});

onMounted(async () => {
	if (route.params.id) {
		try {
			state.name = route.name;
			state.loading = true;
			const res = await getpayImportDetail(route.params.id);
			if (res.code == 200) {
				state.salary = res.data.salary;
				state.salaryAccountList = res.data.salaryAccountList;

				state.auditLogList = res.data.auditLogList;
				state.infoShow.map((item) => {
					item.remarkText = res.data.salary[item.remark];
				});
				state.loading = false;
			} else {
				ElMessage.error(res.msg || '获取详情失败');
				state.loading = false;
			}

			const file = await getFile(route.params.id);
			if (file.code == 200) {
				file.data.map((f) => {
					state.infoShow.map((s) => {
						if (s.type == f.relationType) {
							s.fileList.push(f);
						}
					});
				});
			} else {
				ElMessage.error(file.msg || '获取附件失败');
			}

			// 获取字典
			const dicts = await getDictByItemTypes(state.dictKeys);
			if(dicts&&dicts.salary_status){
				state.salaryStatus = dicts.salary_status;
			}

		} catch (error) {
			state.loading = false;
			ElMessage.error(error.msg || '获取详情失败');
		}
	}
});

// 分页
const totalNum = computed(() => {
	return state.salaryAccountList ? state.salaryAccountList.length : 0;
});
const handleCurrentChange = (val) => {
	state.pagination.currentPage = val;
};

// 数据分页
const dataList = computed(() => {
	const records = state.salaryAccountList;
	// 如果有传的外部id,也就是员工报账查询过来的,那就找到对应的数据并把数据放到第一条
	if(route.params.dataId){
		const data = records.filter((item) => {
			return item.id == route.params.dataId;
		})[0]
		const index = records.indexOf(data);
		if(index > -1&&index != 0){
			records.splice(index,1);
			records.unshift(data)
		}
	}

	if (records.length > 0) {
		const start = (state.pagination.currentPage - 1) * 10;
		const end = state.pagination.currentPage * 10;
		const data = records.slice(start, end);
		return { records: data };
	}
});

const tableRowClassName = ({ row, rowIndex }) => {
	if (rowIndex === 0&&route.params.dataId) {
		return 'first-row';
	}
	return '';
};

const exportFHeader = computed(() => {
	const type = state.salary.formType;
	if (type == '0'|| type == '1' ) {
		return SALARY_EXPORT_HEADER
	}else if (type == '3') {
		return LABOR_EXPORT_HEADER
	} else if (type == '4') {
		return BOOK_EXPORT_HEADER
	}
});

// 导出
const onExport = async () => {
	const exportData = JSON.parse(JSON.stringify(state.salaryAccountList));
	exportData.map((item) => {
		item.status =  translate(state.salary.status, state.salaryStatus);
		item.salaryStyle = translate(item.salaryStyle,{0:'现金',1:'转账'});
		item.salaryGiveTime = translate(item.salaryGiveTime,{0:'立即发',1:'暂停发'});
		item.socialPriority = translate(item.socialPriority,{0:'生成',1:'缴纳'});
		item.fundPriority = translate(item.fundPriority,{0:'生成',1:'缴纳'});
		item.annualBonusType = translate(item.annualBonusType,{0:'合并',1:'单独'});
		item.isDeductSocial = translate(item.isDeductSocial,{0:'否',1:'是'});
		item.isDeductFund = translate(item.isDeductFund,{0:'否',1:'是'});
		item.isRepeat = translate(item.isRepeat,{0:'否',1:'是'});
		item.ownFlag = translate(item.ownFlag,{0:'否',1:'是'});
		item.haveSpecialFlag = translate(item.haveSpecialFlag,{0:'否',1:'是'});
		item.haveSalaryFlag = translate(item.haveSalaryFlag,{0:'否',1:'是'});
		item.isPersonTax = translate(item.isPersonTax,{
				0: '公司承担全部税费',
				1: '个人承担部分税费',
				2:'个人承担全部税费'
			});
		item.bankProvince = idToArea({province:item.bankProvince});
		item.bankCity = idToArea({city:item.bankCity});
		return item;
	});
	// console.log(exportData);
	exportExcelSheet(exportFHeader.value,exportData,`${salaryLabel.value}导出${moment().format('YYYYMMDD')}`);
};

// 判断是有值，且数据进行翻译
const translate = (key,dicts) => {
	//注意:***  0 等于空字符串
	if(key===undefined||key===null||key===''&&key!==0){
		return '';
	}
	return dicts[key]||key;
};

// 关闭
const onCancel = () => {
	const name = state.name;
	let path = null;
	switch (name) {
		case 'payservice-import-detail':
			path = '/payservice/payImport/payImportApply';
			break;
		case 'payservice-audit-detail':
			path = '/payservice/payImport/payImportAudit';
			break;
		case 'payservice-project-detail':
			path = '/payservice/paySearch/payProjectSearch';
			break;
		case 'payservice-bill-detail':
			path = '/payservice/paySearch/peopleBillSearch';
			break;
		default: // 关闭当前页
			router.back();
			closeCurrentTab(route, proxy);
			return;
	}
	router.push({
		path,
		query: {},
	});
	closeCurrentTab(route, proxy); // 关闭当前页
};





</script>

<style lang="scss" scoped src="./detail.scss">
</style>
<style>
.check_right .el-timeline-item__node--large {
	width: 22px !important;
	height: 22px !important;
	left: -6px;
}
.tooltip_pay_24 {
	max-width: calc((100vw - 200px) / 1.5);
}
</style>
