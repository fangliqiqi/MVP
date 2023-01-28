<template>
	<div class="staff-project-container">
		<!--部分字典信息-->
		<el-row>
			<el-col v-for="item in state.params" :key="`basicInfo_${item}`" class="basic-info-item" :span="getColNumber(item)">
				<span class="desc-title" v-html="getTitle(item)"></span>
				<div class="desc-content">
					<el-tooltip placement="top-start" effect="dark" popper-class="detail-tooltip-popper">
						<template #content>
							<div class="detail-tooltip-container">
								<span v-html="getValue(item)"> </span>
							</div>
						</template>
						<span>{{ getValue(item) }} </span>
					</el-tooltip>
				</div>
			</el-col>

			<!--减项项目-->
			<template v-if="isReduce">
				<el-col v-for="item in state.reduceParams" :key="`basicInfo_${item}`" class="basic-info-item" :span="getColNumber(item)">
					<span class="desc-title" v-html="getTitle(item)"> </span>
					<div class="desc-content">
						<el-tooltip placement="top-start" effect="dark" popper-class="detail-tooltip-popper">
							<template #content>
								<div class="detail-tooltip-container">
									<span v-html="getValue(item)"> </span>
								</div>
							</template>
							<span>{{ getValue(item) }} </span>
						</el-tooltip>
					</div>
				</el-col>
			</template>
		</el-row>

		<el-tabs v-model="state.activeInfo" type="card" class="attach-tabs" style="margin-top: 16px">
			<!--tabs信息-->
			<el-tab-pane v-for="item in state.config" :key="`attach_tab_${item.name}`" :label="item.label" :name="item.name">
				<template v-if="item.name === 'contract' || item.name === 'insurance'">
					<pro-table
						row-key="id"
						:columns="item.columns"
						:request="item.request"
						:showHeader="false"
						:customEmpty="true"
						:searchConfig="state.searchConfig"
					>
						<template #empty>
							<div>暂无数据</div>
						</template>

						<template v-slot:contractOption="item">
							<span style="color: var(--el-color-primary); cursor: pointer" @click="goContractDetail(item)">详情</span>
						</template>
					</pro-table>
				</template>

				<template v-else-if="item.name === 'logs'">
					<pro-table ref="proTableRef" row-key="id" :columns="item.columns" :request="item.request" :showHeader="false" customEmpty tableExpand>
						<template v-slot:expand="item">
							<!--expand -->
							<div class="diff-content" style="margin-left: 50px">
								<div>
									{{ item.updateTime }}由<span style="font-weight: bold"> {{ item.createName }}</span>
								</div>
								<div v-html="getTextInfo(item)"></div>
							</div>
						</template>
					</pro-table>
				</template>

				<template v-else-if="item.name === 'social'">
					<!--社保信息-->
					<div v-if="props.social">
						<el-row>
							<el-col v-for="item in item.socailparams" :key="`basicInfo_${item}`" class="basic-info-item" :span="getColNumber(item)">
								<span class="desc-title" v-html="getTitle(item)"> </span>
								<div class="desc-content">
									<el-tooltip placement="top-start" effect="dark" :content="getValue(item, props.social)">
										<span>{{ getValue(item, props.social) }} </span>
									</el-tooltip>
								</div>
							</el-col>
						</el-row>
						<table class="table" aria-describedby="social_security">
							<tr v-for="(t, key) in SOCIAIFUND_SOCIAL_TABLE" :key="key">
								<td v-for="(item, i) in t" :key="i" :rowspan="item.rowspan || '1'" :colspan="item.colspan || '1'">
									{{ item.label || translateData(item, props.social, state.DICTS) }}
								</td>
							</tr>
						</table>
					</div>
					<empty-view v-else></empty-view>
				</template>
				<template v-else-if="item.name === 'fund'">
					<!--公积金信息-->
					<div v-if="props.fund">
						<el-row>
							<el-col v-for="item in item.fundparams" :key="`basicInfo_${item}`" class="basic-info-item" :span="getColNumber(item)">
								<span class="desc-title" v-html="getTitle(item)"> </span>
								<div class="desc-content">
									<el-tooltip placement="top-start" effect="dark" :content="getValue(item, props.fund)">
										<span>{{ getValue(item, props.fund) }} </span>
									</el-tooltip>
								</div>
							</el-col>
						</el-row>
						<table class="table" aria-describedby="accumulation_fund">
							<tr v-for="(t, key) in SOCIAIFUND_FUND_TABLE" :key="key">
								<td v-for="(item, i) in t" :key="i" :rowspan="item.rowspan || '1'" :colspan="item.colspan || '1'">
									{{ item.label || translateData(item, props.fund, state.DICTS) }}
								</td>
							</tr>
						</table>
					</div>
					<empty-view v-else></empty-view>
				</template>
				<template v-else-if="item.name === 'salary'">
					<!--发薪信息-->
					<el-row>
						<el-col v-for="item in item.params" :key="`basicInfo_${item}`" class="basic-info-item" :span="getColNumber(item)">
							<span class="desc-title" v-html="getTitle(item)"> </span>
							<div class="desc-content">
								<el-tooltip placement="top-start" effect="dark" :content="getValue(item)">
									<span>{{ getValue(item) }} </span>
								</el-tooltip>
							</div>
						</el-col>
					</el-row>
				</template>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup name="staffProject">
import { STAFF_INFO_DIC } from '/@/utils/header';
import ProTable from '/@/components/ProTable/ProTable.vue';
import { getDictByItemTypes, EMPTY_PLACEHOLDER, getDictValue } from '/@/utils/utils';
import { FILTER_LOG_PARAMS, SOCIAIFUND_SOCIAL_TABLE, SOCIAIFUND_FUND_TABLE } from '/@/utils/header';
import { getSubjectChangeLog, getInsuranceListByIdCard } from '/@/api/staff';
import { getContractSearchList } from '/@/api/contract';
import { SEX_OPTION, SALARY_STATUS_OPTION } from '/@/utils/dicts';
import { getLogDictValue, getLogDictLabel } from '/@/utils/log';
import { idToArea } from '/@/utils/city';
import { translateData } from '/@/utils/translate';
import EmptyView from '/@/components/EmptyView/index.vue';
import { settleType, buyHandleStatus, buyType } from '/@/views/insurance/component/dict.js';
import moment from 'moment';

const props = defineProps({
	info: Object,
	social: Object,
	fund: Object,
});
const router = useRouter();
const route = useRoute();

const request = async (params, api) => {
	return {
		current: 1,
		total: 0,
		data: [],
	};
};

const requestInsuranceList = async (params) => {
	try {
		const res = await getInsuranceListByIdCard(Object.assign({}, params, { idCard: props.info.empIdcard, deptNo: props.info.deptNo }));
		if (res.code === 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		}
	} catch {}

	return {
		current: 1,
		total: 0,
		data: [],
	};
};

const isReduce = computed(() => {
	// console.log('get projectStatus:', props.info && props.info.projectStatus);
	return props.info && props.info.projectStatus == '1';
});

const requestLogs = async (params) => {
	try {
		if (state.logSource && state.logSource.length) {
			const { current, size } = params;
			const beginIndex = (current - 1) * size;
			const endIndex = current * size;
			if (state.logSource.length >= beginIndex) {
				return {
					current,
					total: state.logSource.length,
					data: state.logSource.slice(beginIndex, endIndex),
				};
			}
			return {
				current: 1,
				total: state.logSource.length,
				data: state.logSource.slice(0, size),
			};
		}

		const res = await getSubjectChangeLog(Object.assign({}, params, { projectId: props.info.id }));
		if (res && res.code == 200 && res.data) {
			const data = res.data;
			state.logSource = data;
			return {
				current: res.data.current,
				total: data.length,
				data: data.slice(0, params.size),
			};
		}
	} catch (e) {
		console.log('get exception:', e);
	}
	return {
		current: 1,
		total: 0,
		data: [],
	};
};

const goContractDetail = (item) => {
	const name = route.name;
	// console.log(route.params.id);
	// 判断从项目档案详情还是人员档案详情跳转
	if(name === 'subject-detail'){
		router.push({
			name: 'subjectContract-detail',
			query: {
				id: item.id,
				projectId: route.params.id,
			},
		});
	}else if(name === 'online-detail'){
		router.push({
			name: 'onlineContract-detail',
			query: {
				id: item.id,
			},
		});
	}
};

const requestContractList = async (params) => {
	try {
		const res = await getContractSearchList(
			Object.assign({}, params, { empIdcard: props.info && props.info.empIdcard, deptNo: props.info && props.info.deptNo })
		);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		}
	} catch (e) {
		console.log('get exception:', e);
	}
	return {
		current: 1,
		total: 0,
		data: [],
	};
};

const getDiffText = (val) => {
	const a = val.split(',');
	return a
		.filter((t) => !FILTER_LOG_PARAMS.includes(t))
		.map((item) => {
			return getLogDictLabel(item, 'subject');
		})
		.join(',');
};

const state = reactive({
	span: 6,
	DICTS: {
		collegeDict: {
			0: '是',
			1: '否',
		},
		fileStatusEnmu: {
			0: '草稿',
			1: '已审核',
		},
		salaryStatusOption: SALARY_STATUS_OPTION,
		sexOption: SEX_OPTION,
		handle_status: {
			0: '待办理',
			1: '已办理',
			2: '办理失败',
			3: '已派减',
			4: '办理中',
			5: '部分办理失败',
		},
	},
	activeInfo: 'contract', // 选中项目详情中的子项
	dictKeys: [
		'emp_natrue', // 员工类型
		'EMP_SOURCE', // 档案来源
		'work_type',
		'contract_status', // 合同状态
		'emp_married',
		'emp_national',
		'emp_political',
		'emp_registype',
		'education',
		'commercial_satte',
		'social_ecurity_state',
		'fund_status',
		'personnel_state',
		'personnel_type',
		'social_reduce_reason',
		'project_emp_source',
		'customer_business_parent', //业务类型一二三级
		'customer_business_type',
		'customer_business_sub_type',
		'coverage_status',
	],
	params: [
		'empNo', // 员工编码
		'empNatrue', // 员工分类
		'unitName', // 客户姓名
		'deptName', // 项目名称
		'deptNo', // 项目编码
		'businessPrimaryType', // 业务类型
		'contractType', // 合同类型
		'workingHours', // 工时制
		'post', // 应聘职位
		'enjoinDate', // 入职日期
		'tryPeriod', // 使用期
		'projectSource', // 项目来源
		'projectStatus', // 档案状态
	], // 需要显示的字段key

	reduceParams: [
		// 减项显示
		'leaveReason',
		'leaveTime',
		'leaveRemark',
	],

	searchConfig: {},
	config: [
		{
			name: 'contract',
			label: '合同信息',
			columns: [
				{
					dataIndex: 'contractParty',
					title: '合同甲方',
					minWidth: 160,
					ellipsis: true,
				},
				{
					dataIndex: 'contractNo',
					title: '合同编码',
					minWidth: 100,
					ellipsis: true,
				},
				{
					dataIndex: 'contractName',
					title: '合同类型',
					minWidth: 100,
					ellipsis: true,
				},
				{
					dataIndex: 'contractStart',
					title: '合同起始日期',
					minWidth: 100,
					dateFormat: 'YYYY-MM-DD',
				},
				{
					dataIndex: 'contractEnd',
					title: '合同截止日期',
					minWidth: 120,
					dateFormat: 'YYYY-MM-DD',
				},
				{
					dataIndex: 'contractTerm',
					title: '合同年限',
					minWidth: 120,
				},
				{
					dataIndex: 'inUse',
					title: '合同状态',
					minWidth: 100,
				},
				{
					dataIndex: 'remark',
					title: '备注',
					minWidth: 160,
					ellipsis: true,
				},
				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					minWidth: 80,
					hideInSearch: true,
					fixed: 'right',
					scopedSlots: {
						customRender: 'contractOption',
					},
				},
			],
			request: requestContractList,
		},
		{
			name: 'insurance',
			label: '商险信息',
			columns: [
				{
					dataIndex: 'buyHandleStatus',
					title: '商险状态',
					width: 112,
					valueEnum: buyHandleStatus,
				},
				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					minWidth: 100,
					ellipsis: true,
				},
				{
					dataIndex: 'insuranceTypeName',
					title: '险种',
					minWidth: 80,
					ellipsis: true,
				},
				{
					dataIndex: 'buyType',
					title: '投保类型',
					width: 80,
					valueEnum: buyType,
				},
				{
					dataIndex: 'buyStandard',
					title: '购买标准（元）',
					width: 120,
				},
				{
					dataIndex: 'actualPremium',
					title: '实际保费（元）',
					width: 120,
				},
				{
					dataIndex: 'dieDisableQuota',
					title: '身故或残疾（万元）',
					width: 160,
				},
				{
					dataIndex: 'medicalQuota',
					title: '医疗额度（万元）',
					width: 140,
				},
				{
					dataIndex: 'invoiceNo',
					title: '发票号',
					minWidth: 80,
				},
				{
					dataIndex: 'policyNo',
					title: '保单号',
					minWidth: 80,
				},
				{
					dataIndex: 'policyStart',
					title: '保单开始日期',
					width: 116,
				},
				{
					dataIndex: 'policyEnd',
					title: '保单结束日期',
					width: 116,
				},
				{
					dataIndex: 'buyMonth',
					title: '购买月数',
					width: 80,
				},
				{
					dataIndex: 'policyEffect',
					title: '保单生效时间',
					width: 116,
				},
			],
			request: requestInsuranceList,
		},
		{
			name: 'social',
			label: '社保信息',
			socailparams: ['orderTYpe', 'socialStatus', 'socialHouseholdName', 'socialAddress', 'socialStartDate', 'socialReduceDate'],
		},
		{
			name: 'fund',
			label: '公积金信息',
			fundparams: ['orderTYpe', 'fundStatus', 'providentHouseholdName', 'fundAddress', 'providentStart', 'fundReduceDate'],
		},
		{
			name: 'salary',
			label: '发薪信息',
			params: ['salaryStatus', 'bankName', 'bankSubName', 'bankNo'],
		},
		{
			name: 'logs',
			label: '操作日志',
			columns: [
				{
					dataIndex: 'createName',
					title: '操作人',
					minWidth: 80,
				},
				{
					dataIndex: 'updateTime',
					title: '操作时间',
					minWidth: 140,
				},
				{
					dataIndex: 'differenceInfo',
					title: '操作内容',
					minWidth: 160,
					tooltip: true,
					formatter: (row) => {
						if (row.differenceInfo) {
							return getDiffText(row.differenceInfo);
						}
					},
				},
			],
			request: requestLogs,
		},
	],
	logSource: [],
});

const getTextInfo = (val) => {
	const differenceInfo = val.differenceInfo;
	const newInfo = JSON.parse(val.newInfo);
	const oldInfo = JSON.parse(val.oldInfo);
	const a = differenceInfo.split(',');
	return a
		.filter((t) => !FILTER_LOG_PARAMS.includes(t))
		.map((item) => {
			let div = "<div class='diff-item'>";
			const label = getLogDictLabel(item, 'subject');
			let oldVal = '',
				newVal = '';

			oldVal = getLogDictValue(item, oldInfo, state.DICTS);

			if (oldVal == '' || oldVal == null || oldVal == undefined) {
				oldVal = '[空值]';
			}
			newVal = getLogDictValue(item, newInfo, state.DICTS);

			if (newVal == '' || newVal == null || newVal == undefined) {
				newVal = '[空值]';
			}
			div += `<span>修改了</span><span style="font-weight:bold;">${label}</span>：<span style="color:var(	--hro-color-text-disabeld);" class='old-value'>${oldVal}</span>  ->  <span class='new-val'>${newVal}</span>`;
			div += '</div>';
			return div;
		})
		.join('');
};

onMounted(() => {
	loadDicts();
});

/**
 * 加载字典值
 */
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			const target = Object.assign({}, state.DICTS, res);
			state.DICTS = target;
			refreshParams(target);
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

const refreshParams = (dicts) => {
	state.config.forEach((item) => {
		const name = item.name;

		if (name === 'contract') {
			// 合同列表
			item.columns = item.columns.map((prop) => {
				if (prop.dataIndex === 'inUse') {
					prop.valueEnum = dicts['contract_status'];
				}
				return prop;
			});
		}
	});
};

const getColNumber = (item) => {
	return 6;
};

const getTitle = (item) => {
	let title = null;

	switch (item) {
		case 'leaveTime':
			title = '减项时间';
			break;
		case 'leaveRemark':
			title = '减项备注';
			break;
		case 'leaveReason':
			title = '减项原因';
			break;
		default:
			title = STAFF_INFO_DIC[item];
			break;
	}

	return title;
};

const getValue = (item, info) => {
	let val = info ? info[item] : props.info[item];
	switch (item) {
		case 'empNatrue':
			// 员工类型
			val = getDictValue('emp_natrue', val, state.DICTS);
			break;
		case 'contractType':
			val = getDictValue('personnel_type', val, state.DICTS);
			break;
		case 'workingHours':
			val = getDictValue('work_type', val, state.DICTS);
			break;
		case 'projectSource':
			val = getDictValue('project_emp_source', val, state.DICTS);
			break;
		case 'businessPrimaryType':
			const first = props.info.businessPrimaryType??'--'
			const secord = props.info.businessSecondType??'--'
			const three = props.info.businessThirdType??'--'
			val =  `${first}/${secord}/${three}`;
			break;
		case 'projectStatus':
			val =
				props.info.projectStatus == 1
					? '已减项'
					: props.info.projectStatus == 0 && props.info.status == 0
					? '草稿'
					: props.info.projectStatus == 0 && props.info.status == 1
					? '已审核'
					: EMPTY_PLACEHOLDER;
			break;
		case 'salaryStatus':
			// 三个月发薪
			val = getDictValue('salaryStatusOption', val, state.DICTS);
			break;
		case 'leaveReason':
			val = getDictValue('social_reduce_reason', val, state.DICTS);
			break;
		case 'orderTYpe': //派单类型
			val = info.socialReduceDate || info.fundReduceDate ? '派减' : '派增';
			break;
		case 'socialStatus':
		case 'fundStatus': //社保公积金状态
			val = getDictValue('handle_status', info.handleStatus, state.DICTS);
			break;
		case 'socialAddress': //社保缴纳地
			val = idToArea({ province: info.socialProvince, city: info.socialCity, area: info.socialTown });
			break;
		case 'fundAddress': //公积金缴纳地
			val = idToArea({ province: info.fundProvince, city: info.fundCity, area: info.fundTown });
			break;
		case 'providentStart':
		case 'fundReduceDate':
		case 'socialStartDate':
		case 'socialReduceDate':
			val = val ? moment(val).format('YYYY-MM-DD') : EMPTY_PLACEHOLDER;
			break;
		default:
			if (val === null || val === undefined || val == '') {
				// 默认为空 '--'
				return EMPTY_PLACEHOLDER;
			}
			break;
	}
	return val;
};

const formatBusinessType = (...args) => {
	// 格式化字符串拼接
	const types = [];
	args.forEach((arg) => {
		if (arg) {
			types.push(arg);
		}
	});
	return types.join('/');
};
</script>

<style lang="scss" scoped src="./css/staffProject.scss"></style>
