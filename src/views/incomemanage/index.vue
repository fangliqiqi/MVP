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
		</pro-table>

	</div>
</template>

<script setup name='收入明细'>
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessage } from 'element-plus';
import {incomeSalaryList,incomeSalaryExport} from '/@/api/incomemanage/index';
const proTableRef = ref(null);
const isShowLoading = ref(false)

// 批量导出
const handleBatchExport = () => {
		const ids = []
		state.selectOptions.map(item=>{
			ids.push(item.id)
		})
		const idObj = {
			ids:ids.length>0?ids.join(','):''
		}
		state.params = proTableRef.value.getParams()
		delete state.params.size
		delete state.params.current
		const objData = Object.assign({},state.params,idObj.ids?idObj:{})
		isShowLoading.value = true
		incomeSalaryExport(objData).then(res=>{
			if(res.code==200){
				ElMessage.success('导出成功');
			}else{
				ElMessage.error(res.msg||'导出失败');
			}							
		}).catch(err=>{
			ElMessage.error(err.msg||'导出失败');
		}).finally(()=>{
			isShowLoading.value = false
		})
};

// 多选
const selectionChange = (res)=>{
	state.selectOptions = res;
}
const state = reactive({
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
			hideInSearch: false,
			minWidth:160,
				fixed: 'left',
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			minWidth: 200,
			hideInSearch: false,
			tooltips: true,
		},
		{
			dataIndex: 'deptName',
			title: '项目名称',
			hideInSearch: false,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'deptNo', 
			title: '项目编码',
			hideInSearch: false,
			minWidth: 140,
		},
	// 新增的字段 applyNo
		{
				dataIndex: 'applyNo',
				title: '申请编码',
				minWidth: 160,
			},
		{
			dataIndex: 'unitName',
			title: '客户名称',
			hideInSearch: false,
			minWidth: 180,
			tooltip: true,
		},
			{
			dataIndex: 'feeType',
			title: '费用类型',
			hideInSearch: false,
			minWidth: 200,
			valueEnum:{
				1:'管理费',
				2:'风险费'
			}
		},
		{
			dataIndex: 'feeMode',
			title: '收费方式',
			hideInSearch: true,
			minWidth:200,
			valueEnum:{
				1:'按比例',
				2:'金额-人数',
				3:'金额-人次',
			}
		},
		{
			dataIndex: 'charges',
			title: '收费标准',
			hideInSearch: true,
			minWidth: 150,
		},
		{
			dataIndex: 'sourceType',
			title: '收入来源',
			hideInSearch: false,
			minWidth: 140,
			valueEnum:{
				1:'社保',
				2:'公积金',
				3:'商险',
				4:'薪资',
			}
		},
		{
			dataIndex: 'money',
			title: '金额',
			hideInSearch: true,
			minWidth: 200,
			tooltip:true
		},
		{
			dataIndex: 'createMonth',
			title: '生成月份',
			hideInSearch: false,
			minWidth: 200,
			valueType: 'date',
			selectType: 'month',
			format:'YYYYMM',
			valueFormat: 'YYYYMM',
			clearable:true,
		},
		
		{
			dataIndex: 'payMonth',
			title: '缴纳月份',
			hideInSearch: false,
			minWidth: 160,
			valueType: 'date',
			selectType: 'month',
			format:'YYYYMM',
			valueFormat: 'YYYYMM',
			clearable:true,
		},
		{
			dataIndex: 'dataCreateMonth',
			title: '数据生成时间',
			hideInSearch: false,
			hideInTable:true,
			minWidth: 160,
			valueType: 'date',
			selectType: 'month',
			format:'YYYYMM',
			valueFormat: 'YYYYMM',
			clearable:true,
		},
			{
			dataIndex: 'createTime',
			title: '数据生成时间',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'sendStatus',
			title: '推送状态',
			hideInSearch: false,
			minWidth: 100,
			fixed: 'right',
			valueEnum:{
				0:'未推送',
				1:'已推送'
			}
		},
	],
		
	btn: [			
		{
			label: '批量导出',
			loading:isShowLoading,
			permission: ['social_tincome-export'],
			onClick: handleBatchExport,
			icon: 'icon-ic_edit_export',
		},
		
	],
	cellBtns: [],
	selectOptions:[],//多选数据
	params:{},//导出请求数据
	dictKeys:[]
});

const { columns, cellBtns,btn,searchConfig} = toRefs(state);

const request = async (params) => {
	try {
		const res = await incomeSalaryList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records
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

</script>