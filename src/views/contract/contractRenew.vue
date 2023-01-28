<template>
	<div class="system-dict-container">
		<pro-table 
			ref="proTableRef" 
			row-key="id" 
			:columns="columns"
			:request="request" 
			:btn="btn"
      :multi="true"
			:searchConfig="searchConfig"
      @selectionChange="selectionChange"
			@onReset="onReset"
		>

			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
    

	</div>
</template>

<script setup name="续签待办">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { exportExcel } from '/@/utils/xlsx';
import {exportExcelSheet} from '/@/utils/excel';
import {CONTRACT_EXPORT_HEADER_RENEW} from '/@/utils/header';
import { getDictByItemTypes } from '/@/utils/utils';
import { getAreaJson, loadNode, idToArea } from '/@/utils/city';
import {getContractRenewList,exportContractRenew} from '/@/api/contract';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import moment from 'moment';

const proTableRef = ref(null);
const router = useRouter();


// 批量导出
const handleBatchExport = () => {
	if(state.selectionChangeList.length>0){
		const ids = []
		state.selectionChangeList.map(item=>{
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
	state.btn.find(item=>item.label=='批量导出').loading = true;
	exportContractRenew(state.params).then(res=>{
		if(res.code==200){
			exportExcelSheet(
				CONTRACT_EXPORT_HEADER_RENEW,
				res.data.map(item=>{
					return {
						empCode:item.empCode||'',
						empName:item.empName||'',
						empIdcard:item.empIdcard||'',
						contractStart:item.contractStart?moment(item.contractStart).format('YYYY-MM-DD'):'',
						contractEnd:item.contractEnd?moment(item.contractEnd).format('YYYY-MM-DD'):'',
						fileProvince:item.fileProvince?idToArea({province:item.fileProvince},''):'',
						fileCity:item.fileCity?idToArea({city:item.fileCity},''):'',
						fileTown:item.fileTown?idToArea({town:item.fileTown},''):'',
						project:item.project||'',
						projectNo:item.projectNo||'',
						empType:state.dictValue['emp_natrue'][item.empType]||'',
						contractType:item.contractType||'',
						contractTerm:state.dictValue['employee_contract_type'][item.contractTerm]||'',
						daysDue:item.daysDue||'',
						dueFlag:state.dictValue['cintract_dueFlag'][item.dueFlag]||'',
						daysOver:item.daysOver||'',
						firstAlertTime:item.firstAlertTime?moment(item.firstAlertTime).format('YYYY-MM-DD'):'',
						alertPerson:item.alertPerson||'',
					}
				}),
				`续签待办批量导出${moment().format('YYYYMMDD')}`
			);
			ElMessage.success('导出成功');	
		}else{
			ElMessage.error(res.msg);
		}						
	}).catch(err=>{
		ElMessage.error('导出失败');
	}).finally(()=>{
		state.btn.find(item=>item.label=='批量导出').loading = false;
	})
};

const isGray = (item)=>{
	return item.handleStatus ==  1;
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
				dataIndex: 'empCode',
				title: '员工编码',
				minWidth:180,
        hideInSearch: true,
			},
			{
				dataIndex: 'empName',
				title: '员工姓名',
				minWidth:160,
			},
			{
				dataIndex: 'empIdcard',
				title: '身份证号',
				minWidth: 200,
			},
      {
				dataIndex: 'contractStart',
				title: '合同起始日期',
				hideInSearch: true,
				minWidth: 160,
				dateFormat: 'YYYY-MM-DD',
			},
			{
				dataIndex: 'contractEnd',
				title: '合同截止日期',
				hideInSearch: true,
				minWidth: 160,
        dateFormat: 'YYYY-MM-DD',
			},
			{
				dataIndex: 'fileAddress',
				title: '档案所在地',
				minWidth: 200,
				hideInSearch: true,
				tooltip: true,
				formatter: (row) => {
					return idToArea({ province: row.fileProvince, city: row.fileCity, town: row.fileTown });
				},
			},
			
      {
				dataIndex: 'project',
				title: '项目名称',
				minWidth: 200,
				tooltip: true,
			},
			{
				dataIndex: 'projectNo',
				title: '项目编码',
				minWidth: 160,
			},
			{
				dataIndex: 'empType',
				title: '员工类型',
				minWidth: 160,
			},
			{
				dataIndex: 'contractType',
				title: '合同类型',
				minWidth: 200,
			},
      {
				dataIndex: 'contractTerm',
				title: '签订期限',
				minWidth: 200,
				hideInSearch: true,
			},
			{
				dataIndex: 'archivesLocation',
				title: '档案所在地',
				minWidth: 200,
				valueType:'addRess',
				hideInTable: true,
				params:{
					pro:'fileProvince',
					city:'fileCity',
					town:'fileTown'
				},
			},
			{
				dataIndex: 'daysDue',
				title: '距离到期天数',
				minWidth: 180,
				tooltip:true,
        hideInSearch: true,
			},
      {
				dataIndex: 'dueFlag',
				title: '是否过期',
				minWidth: 160,
        hideInSearch: true,
			},
      {
				dataIndex: 'daysOver',
				title: '过期天数',
				minWidth: 160,
				hideInSearch: true,
			},
      {
				dataIndex: 'firstAlertTime',
				title: '首次提醒时间',
				hideInSearch: true,
				minWidth: 160,
        dateFormat: 'YYYY-MM-DD',
			},
      {
				dataIndex: 'alertPerson',
				title: '提醒人',
				minWidth: 160,
			},
      {
				dataIndex: 'dueFlag',
				title: '是否过期',
				minWidth: 160,
        hideInTable: true,
			},
      {
				dataIndex: 'handleStatus',
				title: '处理状态',
				minWidth: 160,
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
				permission: ['demo_tempcontractalert_export'],
				onClick: handleBatchExport,
				icon: 'icon-ic_edit_export',
				loading: false,
			},
		],
		cellBtns: [
			{
				text: '续签',
				prop: 'sign', // 唯一标识
				permission: ['temployeecontractinfo_add'], // 权限标识
				isGray:isGray,
				tooltip:'处理中状态不可操作'
			}
		],
		dictKeys:[  //字典项
			'emp_natrue',//员工类型
      'personnel_type',//合同类型
      'cintract_dueFlag',//是否过期
      'contract_handle_status',//处理状态
			'employee_contract_type',//签订期限
		],
    dictValue:{},
    selectionChangeList:[],
		params: {},
		areaJson:null,
		areaProps: {
			label: 'areaName',
			isLeaf: 'isLeaf',
			children: 'children',
		},
	});

	const { columns, cellBtns,btn,searchConfig,params,areaJson,areaProps } = toRefs(state);

  const selectionChange = (selection) => {
			state.selectionChangeList = selection;
	};

	const request = async (params) => {
		try {
			const p = Object.assign({}, params, state.params);
			
			delete p.fileAddress;
			
			const res = await getContractRenewList(p);
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
	// 重置
	const onReset = () => {
		state.params = {};
	};


	// 页面刷新
	const refresh = ()=>{
		proTableRef.value.refresh();
	}
	// 点击事件
	const onCellClick = async (prop, item) => {
    if(prop === 'sign'){
			router.push({ 
				name: 'contract-renew', 
				query: {
					id: item.contractId,
				},
			})
    }
		
	};

	// 字典获取
	const loadDicts = async () => {
		try {
			const res = await getDictByItemTypes(state.dictKeys);
      state.dictValue = res; 
			if (res) {
				// 列表赋值
				state.columns.map(item=>{
					switch(item.dataIndex){
						case 'empType':
							item.valueEnum = res['emp_natrue']; // 员工类型
							break;
						case 'contractType':                  //合同类型
            const arr = [];
							for(const i in res['personnel_type']){    
								arr.push({
									key:res['personnel_type'][i],
									value:res['personnel_type'][i]
								})
							}
							item.valueEnum = arr 
							break;
						case 'dueFlag':
							item.valueEnum = res['cintract_dueFlag']; // 是否过期
							break;
						case 'handleStatus':
							item.valueEnum = res['contract_handle_status']; // 处理状态
							break;
						case 'contractTerm':               //签订期限
							item.valueEnum = res['employee_contract_type']; 
							break;
					}
					return item;
				})
			}
		} catch (e) {
			console.log('get exception:', e);
		}
	};

	onMounted(async () => {
		loadDicts();
		const json = getAreaJson();
		state.areaJson = json;
	});

	

</script>
<style lang="scss" scoped src="./css/contractFile.scss"></style>