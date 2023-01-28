<template>
	<div class="system-dict-container">
		<pro-table 
			ref="proTableRef" 
			row-key="id" 
			:columns="columns"
			:request="request" 
			:btn="btn" 
			:searchConfig="searchConfig"
			@onReset="onReset"
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
								<a href="/template/员工合同归档批量更新模板.xlsx" download> 批量导入模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>	

		<!--批量更新弹框-->
		<batch-import-dialog 
			ref="batchImportDialogRef" 
			:header="CONTRACT_FILE_HEADER"
			url="/yifu-archives/method/temployeecontractinfo/batchUpdate"
			:errName="'合同归档批量更新'"
			:title="'批量更新'"
			:download="true"
			@ok="refresh" 
		/>
    
		<!-- 归档弹窗 -->
		<edit-contract-file-vue ref="contractFileRef" @ok="refresh"></edit-contract-file-vue>

	</div>
</template>

<script setup name="合同归档">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import editContractFileVue from './component/editContractFile.vue';
import { CONTRACT_FILE_HEADER} from '/@/utils/header';
import { ArrowDown } from '@element-plus/icons-vue';
import { getDictByItemTypes } from '/@/utils/utils';
import { getAreaJson, loadNode, idToArea } from '/@/utils/city';
import {getContractFileList,getContractDetail} from '/@/api/contract';

const proTableRef = ref(null);
const batchImportDialogRef = ref(null)
const contractFileRef = ref(null)

// 批量更新
const handleBatchImport = () => {
	if (batchImportDialogRef.value) batchImportDialogRef.value.openDialog();
};

const state = reactive({
		searchConfig: {
			labelWidth: 110,
			option: {
				extBtn: 'extBtns',
			},
		},
		columns: [
			{
				dataIndex: 'type',
				title: '审核类型',
				hideInSearch: false,
				minWidth: 200,
				tooltip: true,
			},
			{
				dataIndex: 'applyNo',
				title: '申请编号',
				hideInSearch: true,
				minWidth:180,
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
				dataIndex: 'archivesLocation',
				title: '档案所在地',
				minWidth: 200,
				valueType:'addRess',
				tooltip: true,
				params:{
					pro:'fileProvince',
					city:'fileCity',
					town:'fileTown'
				},
			},
			{
				dataIndex: 'empNatrue',
				title: '员工类型',
				minWidth: 160,
			},
			{
				dataIndex: 'contractName',
				title: '合同类型',
				minWidth: 200,
			},
			{
				dataIndex: 'situation',
				title: '签订类型',
				minWidth: 200,
			},
			{
				dataIndex: 'subjectDepart',
				title: '项目名称',
				minWidth: 200,
				tooltip: true,
			},
			{
				dataIndex: 'deptNo',
				title: '项目编码',
				minWidth: 160,
			},
			{
				dataIndex: 'subjectUnit',
				title: '客户名称',
				minWidth: 200,
				tooltip:true
			},
			{
				dataIndex: 'contractParty',
				title: '合同甲方',
				minWidth: 200,
				tooltip:true
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
				dataIndex: 'contractType',
				title: '签订期限',
				minWidth: 200,
				tooltip:true
			},
      {
				dataIndex: 'applyNo',
				title: '申请编号',
				minWidth:180,
				hideInTable: true,
			},
      {
				dataIndex: 'createName',
				title: '创建人',
				minWidth: 180,
				hideInSearch: true,
			},
			{
				dataIndex: 'createTime',
				title: '创建时间',
				minWidth: 180,
				hideInSearch: true,
			},
      {
				dataIndex: 'inUse',
				title: '合同状态',
				hideInSearch: true,
				minWidth: 160,
			},
      {
				dataIndex: 'isFile',
				title: '附件状态',
				minWidth: 160,
				formatter: (row) => {
					return row.isFile === '1' ? '无' : '有';
				},
				hideInSearch: true,
			},
			{
				dataIndex: 'isAtta',
				title: '附件状态',
				minWidth: 160,
				hideInTable: true,
				valueEnum:{
					0:'有',
					1:'无'
				}
			},
      {
				dataIndex: 'isFile',
				title: '归档状态',
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
				label: '批量更新',
				permission: ['temployeecontractinfo_batch_update'],
				onClick: handleBatchImport,
				icon: 'icon-ic_edit_refresh',
			},
		],
		cellBtns: [
			{
				text: '归档',
				prop: 'file', // 唯一标识
				permission: ['temployeecontractinfo_filing'], // 权限标识
			}
		],
		dictKeys:[  //字典项
			'emp_natrue',//员工类型
			'contract_status',//合同状态
			'situation_type',// 签订类型
			'contract_file_status',//合同归档状态
			'employee_contract_type',//签订期限
			'personnel_type',//合同类型
			'check_type' //审核类型
		],
		params: {},
		areaJson:null,
		areaProps: {
			label: 'areaName',
			isLeaf: 'isLeaf',
			children: 'children',
		},
	});

	const { columns, cellBtns,btn,searchConfig,params,areaJson,areaProps} = toRefs(state);

	const request = async (params) => {
		try {
			const p = Object.assign({}, params, state.params);
			
			delete p.fileAddress;
			

			const res = await getContractFileList(p);
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

	const changeFileAddress = (val, node) => {
			// console.log('get changeFileAddress val:', val, ',and node:', node);
			// 获取档案所在地
			const values = [val.id];
			if (node.parent) {
				// 获取市或者省
				values.unshift(node.parent.data.id);
				if (node.parent.parent) {
					// 获取省
					values.unshift(node.parent.parent.data.id);
				}
			}

			let pro = null,
				city = null,
				town = null;

			pro = values[0] || null;
			if (values.length > 1) city = values[1] || null;
			if (values.length > 2) town = values[2] || null;
			state.params.fileProvince = pro;
			state.params.fileCity = city;
			state.params.fileTown = town;
	};
	const clearFileAddress = () => {
		state.params.fileProvince = null;
		state.params.fileCity = null;
		state.params.fileTown = null;
	};
	const loadArea = (node, resolve) => {
			const level = node.level;
			const isLeaf = node.isLeaf;
			if (level === 0) {
				const data = loadNode(0);
				resolve(data);
			} else if (isLeaf) {
				return resolve([]);
			} else {
				return resolve(loadNode(node.data.id));
			}

			return resolve([]);
		};

	// 页面刷新
	const refresh = ()=>{
		proTableRef.value.refresh();
	}
	// 点击事件
	const onCellClick = async (prop, item) => {
    if(prop === 'file'){
			let res = await getContractDetail(item.id);
			// console.log(res);
      contractFileRef.value.openDialog(item);
    }
		
	};

	// 字典获取
	const loadDicts = async () => {
		try {
			const res = await getDictByItemTypes(state.dictKeys);
			// console.log(res);
			if (res) {
				// 列表赋值
				state.columns.map(item=>{
					switch(item.dataIndex){
						case 'empNatrue':
							item.valueEnum = res['emp_natrue']; // 人员类型
							break;
						case 'contractName':
							const arr= []
							for(let i in res['personnel_type']){    
								arr.push({
									key:res['personnel_type'][i],
									value:res['personnel_type'][i]
								})
							}
							item.valueEnum = arr // 合同类型
							break;
						case 'situation':
							const sitArr = []
							for(let i in res['situation_type']){
								sitArr.push({
									key:res['situation_type'][i],
									value:res['situation_type'][i]
								})
							}
							item.valueEnum = sitArr; // 签订类型
							break;
						case 'auditStatus':
							item.valueEnum = res['contract_audit_status']; // 审批状态
							break;
						case 'contractType':
							item.valueEnum = res['employee_contract_type']; // 签订期限
							break;
						case 'inUse':
							item.valueEnum = res['contract_status']; // 合同状态
							break;
						case 'isFile':
							item.valueEnum = res['contract_file_status']; // 合同归档状态
							break;
						case 'type':
							item.valueEnum = res['check_type']; 	// 审核类型
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
