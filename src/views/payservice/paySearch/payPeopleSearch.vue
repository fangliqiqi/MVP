<template>
	<div class="system-dict-container">
		<pro-table 
      ref="proTableRef" 
      row-key="id" 
      :columns="columns" 
      :request="request" 
			:btn="btn" 
      :searchConfig="searchConfig" 
      :multi="true"
			@selectionChange="selectionChange"
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
								<a href="/template/payservice/薪资档案维护模板.xlsx" download> 批量导入模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/payservice/薪酬人员查询批量更新模板.xlsx" download> 批量更新模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
						
					</template>
				</el-dropdown>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!--批量导入弹框-->
		<batch-import-dialog 
			ref="batchImportDialogRef" 
			:header="SALARY_PEOPLE_SEARCH_IMPORT_HEADER"
			:errName="'人员薪酬信息批量导入'"
			:ext-params="state.batchExtParams"
			:rules="state.batchRules"
			:title="'批量导入'"
			:download="true"
			:upload="importUpload"
			:salaryFlag="true"
			@ok="refresh" 
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量导入失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>


		<!--批量更新弹框-->
		<batch-import-dialog 
			ref="batchUpdateDialogRef" 
			:header="SALARY_PEOPLE_SEARCH_UPDATE_HEADER"
			url="/yifu-salary/method/tsalaryemployee/batchUpdateSalaryEmployee"
			:errName="'薪酬人员查询批量更新'"
			:title="'批量更新'"
			:download="true"
			@ok="refresh" 
		/>

		<!--编辑-->
		<edit-pay-people-vue ref="editPayPeopleRef" @ok="refresh"></edit-pay-people-vue>

	</div>
</template>

<script setup name='薪酬人员查询'>
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import editPayPeopleVue from './component/editPayPeople.vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { exportExcel } from '/@/utils/xlsx';
import { ElMessageBox,ElMessage } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { SALARY_PEOPLE_SEARCH_UPDATE_HEADER,SALARY_PEOPLE_SEARCH_IMPORT_HEADER} from '/@/utils/header';
import { getDictByItemTypes} from '/@/utils/utils'
import {getpayPeopleList,exportpayPeople,batchImportPayPeople} from '/@/api/payservice/paysearch';
import { getProjectName } from '/@/api/socialfund/presendorder';


const proTableRef = ref(null);
const editPayPeopleRef = ref(null);
const isShowLoading = ref(false)
const batchImportDialogRef = ref(null)
const batchUpdateDialogRef = ref(null)
const deptObj = ref({})

// 批量导出
const handleBatchExport = () => {
	isShowLoading.value= true
	if(state.selectOptions.length>0){
		const ids = []
		state.selectOptions.map(item=>{
			ids.push(item.id)
		})
		state.params = {
			ids:ids.join(',')
		}
	}else{
		state.params = proTableRef.value.getParams()
		delete state.params.size
		delete state.params.current
	}
	exportpayPeople(state.params).then(res=>{
		if(res.code==200){
			ElMessage.success('导出成功');
		}else{
			ElMessage.error(res.msg||'导出失败');
		}							
	}).catch(err=>{
		ElMessage.error(err.msg||'导出失败');
	}).finally(()=>{
		isShowLoading.value= false
	})
};

// 批量导入
const handleBatchImport = () => {
	batchImportDialogRef.value&&batchImportDialogRef.value.openDialog()
}

// 导入执行
const importUpload = (res,data)=>{
	const params = {
		empList:data,
		isUpdate:res.salaryFlag?1:0,
		dept:{
			customerId:deptObj.value.customerId,
			customerName:deptObj.value.customerName,
			customerNo:deptObj.value.customerNo,
			id:deptObj.value.id,
			departName:deptObj.value.departName,
			departNo:deptObj.value.departNo,
		}
	}
	return batchImportPayPeople(params)
}

// 批量更新
const handleBatchUpdate = () => {
	batchUpdateDialogRef.value&&batchUpdateDialogRef.value.openDialog()
}

// 多选
const selectionChange = (res)=>{
	state.selectOptions = res;
}

// 项目名称列表
const requestList = async (params) => {
	try {
		const res = await getProjectName(params);
		if (res.code == 200) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		} else {
			ElMessage.error(res.msg);
		}
	} catch (error) {
		console.log('数据请求', error);
	}

	return {
		current: 1,
		total: 0,
		data: [],
	};
};



const state = reactive({
		batchExtParams:[
			{
				dataIndex: 'settleDepart',
				title: '项目名称',
				position: 'header',
				type: 'page-select',
				span: 24,
				config: {
					request: (params) => requestList(Object.assign({},params,{flag:'1'})),
					valueKey: 'id',
					title: 'departName',
					search: 'departName',
					placeholder: '请选择项目名称',
					onChange: async (val) => {
						// console.log(val);
						deptObj.value = val
					},
				},
			},
		],
		batchRules:{
			settleDepart:[
				{
					required: true,
					message: '请选择项目名称',
					trigger: 'change',
				},
			],
		},
		searchConfig: {
			labelWidth: 110,
			option: {
				extBtn: 'extBtns',
			},
		},
		columns: [
			{
				dataIndex: 'empName',
				title: '员工姓名',
				minWidth:160,
			},
			{
				dataIndex: 'empIdcard',
				title: '身份证号',
				minWidth: 200,
				tooltips: true,
			},
			{
				dataIndex: 'deptName',
				title: '项目名称',
				minWidth: 160,
				tooltip: true,
			},
			{
				dataIndex: 'deptNo', 
				title: '项目编码',
				minWidth: 140,
			},
			{
				dataIndex: 'invoiceTitle',
				title: '封面抬头',
				minWidth: 200,
				tooltip:true
			},
			{
				dataIndex: 'unitName',
				title: '客户名称',
				hideInSearch: true,
				minWidth: 180,
				tooltip: true,
			},
			{
				dataIndex: 'bankName',
				title: '开户行总行',
				hideInSearch: true,
				minWidth:200,
				tooltip:true
			},
      {
				dataIndex: 'bankProvince',
				title: '开户行省',
				hideInSearch: true,
				minWidth: 150,
				valueType:'addRess',
				params:{
					pro:'bankProvince',
				},
			},
      {
				dataIndex: 'bankCity',
				title: '开户行市',
				hideInSearch: true,
				minWidth: 140,
				valueType:'addRess',
				params:{
					pro:'bankCity',
				},
			},
      {
				dataIndex: 'bankSubName',
				title: '开户行支行',
				hideInSearch: true,
				minWidth: 200,
				tooltip:true
			},
      {
				dataIndex: 'bankNo',
				title: '银行卡号',
				hideInSearch: true,
				minWidth: 200,
				tooltip:true
			},
      {
				dataIndex: 'empPhone',
				title: '手机号码',
				hideInSearch: true,
				minWidth: 160,
			},
      {
				dataIndex: 'taxMonth',
				title: '计税月份',
				hideInSearch: true,
				minWidth: 160,
			},
      {
				dataIndex: 'fileStatus',
				title: '在职状态',
				hideInSearch: true,
				minWidth: 160,
				valueEnum:{
					0:'在职',
					1:'离职'
				}
			},
			{
				dataIndex: 'option',
				title: '操作',
				key: 'option',
				minWidth:140,
				hideInSearch: true,
				fixed: 'right',
				scopedSlots: {
					customRender: 'option',
				},
			},
		],
			
		btn: [			
			{
				label: '批量导出',
				permission: ['salary_tsalaryemployee-export'],
				onClick: handleBatchExport,
				loading:isShowLoading,
				icon: 'icon-ic_edit_export',
			},
			{
				label: '批量导入',
				permission: ['tsalaryemployee_import_employee'],
				onClick: handleBatchImport,
				type:'normal',
				icon: 'icon-ic_edit_upload',
			},
			{
				label: '批量更新',
				permission: ['tsalaryemployee_batch_update'],
				onClick: handleBatchUpdate,
				type:'normal',
				icon: 'icon-ic_edit_refresh',
			},
			
		],
		cellBtns: [
			{
				text: '编辑',
				prop: 'edit', // 唯一标识
				permission: ['salary_tsalaryemployee_get','salary_tsalaryemployee_edit'], // 权限标识
			},
		],
		selectOptions:[],//多选数据
		params:{},//导出请求数据
    dictKeys:[]
	});

	const { columns, cellBtns,btn,searchConfig} = toRefs(state);

	const request = async (params) => {
		try {
			const res = await getpayPeopleList(params);
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
		if (prop === 'edit') {
			editPayPeopleRef.value&&editPayPeopleRef.value.openDialog(item)
		}
	};

  // 字典获取
	const loadDicts = async () => {
		try {
			const res = await getDictByItemTypes(state.dictKeys);
			if (res) {
				// 列表赋值
				state.columns.map(item=>{
					
					return item;
				})
			}
		} catch (e) {
			console.log('get exception:', e);
		}
	};
	

	onMounted(() => {
		loadDicts();
	})
	

</script>
<style lang="scss" scoped>
.module-download {
	a {
		text-decoration: none;
		color: var(--el-button-text-color);
	}
}
</style>
