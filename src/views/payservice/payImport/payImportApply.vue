<template>
	<div class="system-dict-container">
		<pro-table 
      ref="proTableRef" 
      row-key="id" 
      :columns="columns" 
      :request="request" 
			:btn="btn" 
      :searchConfig="searchConfig" 
		>
			<template #extBtns>
				<el-dropdown class="arch-btn" popper-class="module-download">
					<span class="el-dropdown-link">
						<el-button size="default">
							模板下载
							<el-icon class="el-icon--right">
								<arrow-down />
							</el-icon>
						</el-button>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>
								<a href="/template/payservice/薪资上传模板.xls" download>薪资模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/payservice/劳务费上传模板.xls" download>劳务费模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/payservice/稿酬上传模板.xls" download>稿酬模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/payservice/年终奖测算导入模板.xls" download>年终奖测算模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item"  @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>	

		<!--批量导入弹框-->
		<batch-import-dialog
      ref="batchImportDialogRef"
			:width="'816px'"
      :header="pay_header"
      batchName="pay-batch-import"
      :errorHeader="ERROR_HEADER"
      :errorData="batchErrorData"
      :upload="batchUploadFile"
      :ext-params="state.batchExtParams"
      :rules="state.batchRules"
			:errName="'薪酬导入表单'"
			:type="importType"
			:cardCheck="cardCheck"
			:beforeFlag="beforeFlag"
      customError
      download
			@changeFile="changeFile"
      @ok="refresh"
    >
		</batch-import-dialog>
		<!-- 年终奖计算 -->
		<batch-import-dialog
      ref="moneyDialogRef"
      :header="AWARD_APPLY_HEADER"
      batchName="pay-batch-import"
      :errorHeader="ERROR_HEADER"
      :errorData="batchErrorData"
      :upload="batchUploadyYearMoney"
      :ext-params="state.moneyParams"
      :rules="momeyRules"
			:title="'年终奖计税测算'"
			:type="1"
      customError
      download
      @ok="refresh"
    >
		</batch-import-dialog>
		<!-- 提交 -->
		<submit-pay ref="submitPayRef" @ok="refresh"></submit-pay>
		
	</div>
</template>

<script setup name="薪酬导入申请">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import {LABOR_APPLY_HEADER,BOOK_APPLY_HEADER,AWARD_APPLY_HEADER,ERROR_HEADER} from '/@/utils/header';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage ,ElMessageBox} from 'element-plus';
import { getDictByItemTypes } from '/@/utils/utils';
import { readExcel } from '/@/utils/xlsx';
import { useRouter,useRoute } from 'vue-router';
import { getAreaJson, idToArea } from '/@/utils/city';
import { onRefresh, offRefresh } from '/@/utils/events';
import {
	payParams,
	changePayParams,
	moneyParams,
	batchRules,
	changeFile,
	cardCheck,
	beforeFlag,
	pay_header,
	importType,
	batchUploadFile,
	batchErrorData,
	batchUploadyYearMoney,
	momeyRules,
	}from './component/payimport.js' //导入申请数据
import submitPay from './component/submitPay.vue'  //提交弹窗
import {getpayImportList,deletepayImport,doSendEKP,doPushincome} from '/@/api/payservice/payimport'


const proTableRef = ref(null);
const batchImportDialogRef = ref(null)
const moneyDialogRef = ref(null)
const submitPayRef = ref(null)

const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();


// 导入表单
const handleAddClick = () => {
	changePayParams(0);
	if (batchImportDialogRef.value) batchImportDialogRef.value.openDialog();
};


// 年终奖计算
const handleBatchImport = () => {
	moneyDialogRef.value&&moneyDialogRef.value.openDialog();
};

// 按钮灰色
const isGray = (item,nums)=>{
	const flag = nums.includes(item.status)
	return !flag
}

// 按钮显隐
const isHide = (item,nums)=>{
	const flag = nums.includes(item.status)
	return !flag
}



const state = reactive({
		batchExtParams:[...payParams],
		batchRules:{...batchRules},
		moneyParams:[...moneyParams],
		searchConfig: {
			labelWidth: 110,
			option: {
				extBtn: 'extBtns',
			},
		},
		columns: [
			{
				dataIndex: 'status',
				title: '薪酬状态',
				hideInSearch: true,
				minWidth: 160,
			},
			{
				dataIndex: 'deptName',
				title: '项目名称',
				minWidth: 200,
				tooltip: true,
			},
			{
				dataIndex: 'deptNo',
				title: '项目编码',
				minWidth: 160,
			},
			// 新增的字段 applyNo  
			{
				dataIndex: 'applyNo',
				title: '申请编码',
				minWidth: 160,
			},
      {
				dataIndex: 'status',
				title: '薪酬状态',
				hideInTable: true,
				minWidth: 160,
			},
			{
				dataIndex: 'settlementAmount',
				title: '项目金额',
				minWidth:160,
        hideInSearch: true,
			},
			{
				dataIndex: 'invoiceTitle',
				title: '封面抬头',
				hideInSearch: true,
				minWidth: 200,
				tooltip:true
			},
			{
				dataIndex: 'salaryMonth',
				title: '薪酬月份',
				minWidth: 160,
				valueType: 'date',
				selectType:'month',
				valueFormat:'YYYYMM',
				format:'YYYYMM',
			},
			{
				dataIndex: 'formType',
				title: '表单类型',
				minWidth: 160,
        hideInSearch: true,
			},
			{
				dataIndex: 'createTime',
				title: '创建时间',
				minWidth: 180,
				hideInSearch: true,
			},
      {
				dataIndex: 'createName',
				title: '创建人',
				minWidth: 180,
				hideInSearch: true,
			},
			{
				dataIndex: 'option',
				title: '操作',
				key: 'option',
				minWidth:280,
				hideInSearch: true,
				fixed: 'right',
				scopedSlots: {
					customRender: 'option',
				},
			},
		],
			
		btn: [
			{
				label: '导入表单',
				onClick: handleAddClick,
				permission: [],
				icon: 'icon-ic_edit_add',
			},
			{
				label: '年终奖计税测算',
				permission: ['salary_tstatisticsbonus-batch-import'],
				onClick: handleBatchImport,
				type: 'normal',
				icon: 'icon-ic_edit_upload',
			},		
		],
		cellBtns: [
			{
				text: '详情',
				prop: 'detail', // 唯一标识
				permission: [], // 权限标识
			},
			{
				text: '提交',
				prop: 'submit', // 唯一标识
				permission: [], // 权限标识
				isGray: (item)=>isGray(item,[0,6,5]),
			},
			{
				text: '删除',
				prop: 'delete', // 唯一标识
				permission: ['salary_tsalarystandard_del'], // 权限标识
				isGray: (item)=>isGray(item,[0,6,5]),
			},
      {
				text: '发送数字化平台',
				prop: 'send', // 唯一标识
				permission: [], // 权限标识
				isHide:(item)=>isHide(item,[0,1,2,3,4,5,6,7,8,9,10]),
				isGray: (item)=>isGray(item,[2,10]),
				
			},
			{
				text: '推送收入',
				prop: 'push', // 唯一标识
				permission: ['salary_tsalarystandard_push'], // 权限标识
				isHide:(item)=>isHide(item,[11,12]),
			},

		],
		selectOptions:[],//多选数据
		params:{},//导出请求数据
		dictKeys:[  //字典项
			'form_type',//表单类型
			'salary_status',//薪酬状态
  	],
		isSendFinishFlag:true   // 数字化发送请求是否完毕
	});

	const { columns, cellBtns,btn,searchConfig} = toRefs(state);

	const request = async (params) => {
		try {
			const res = await getpayImportList(params);
			if (res && res.code == 200 && res.data) {
				return {
					current: res.data.current,
					total: res.data.total,
					data: res.data.records.map((item, i) => {
						return {
							...item,
							index: (params.current - 1) * params.size + i + 1,
						};
					}),
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
	// 页面刷新
	const refresh = ()=>{
		proTableRef.value.refresh();
	}

	const onCellClick = async (prop, item) => {
		if (prop === 'delete') {
			ElMessageBox.confirm('是否确定删除',{
				type: 'warning',
			}).then(async () => {
					const res = await deletepayImport(item.id);
					if (res && res.code == 200) {
						ElMessage.success('删除成功');
						refresh();
				}else{
					ElMessage.error(res.msg||'删除失败');
				}
			}).catch(() => {})
		}else if (prop === 'detail') {
			router.push({ 
				name: 'payservice-import-detail', 
				params: {
					id: item.id,
				},
			})
		}else if(prop == 'submit'){
			submitPayRef.value&&submitPayRef.value.openDialog(item);
      
    }else if(prop == 'send'){
			if(!state.isSendFinishFlag) return 
			state.isSendFinishFlag = false
			doSendEKP(item.id).then(res=>{
				if(res.code == 200){
					ElMessage.success('发送成功');
					refresh();
				}else{
					ElMessage.error(res.msg||'发送失败');
				}
			}).catch(err=>{
				console.log(err);
				ElMessage.error('发送失败'||err.msg);
			}).finally(()=>{
				state.isSendFinishFlag = true
			})
    }else if(prop == 'push'){
			doPushincome(item.id).then(res=>{
				if(res.code == 200){
					ElMessage.success('生成收入并推送中，请耐心等待');
					refresh();
				}else if(res.code=='1'){
					ElMessage.error(res.msg||'数据处理中，请勿重复点击！');
				}else{
					ElMessage.error(res.msg||'推送失败');
				}
			}).catch(err=>{
				// console.log(err);
				ElMessage.error('推送失败'||err.msg);
			})
		}
	};

	// 字典获取
	const loadDicts = async () => {
		try {
			const res = await getDictByItemTypes(state.dictKeys);
			if (res) {
				// 列表赋值
				state.columns.map(item=>{
					switch(item.dataIndex){
						case 'status':
							item.valueEnum = res['salary_status']; // 薪酬状态
							break;
						case 'formType':
							item.valueEnum = res['form_type']; // 表单类型
							break;
					}
					return item;
				})
			}
		} catch (e) {
			console.log('get exception:', e);
		}
	};


	const listener = () => {
		onRefresh(proxy, route.path, () => {
			refresh();
		});
	};

	onMounted(() => {
		loadDicts();
		listener();

	});

	onUnmounted(() => {
		offRefresh(proxy);
	});

	

</script>
<style lang="scss" scoped src="./css/comm.scss"></style>
