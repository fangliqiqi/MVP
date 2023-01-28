<template>
	<div class="system-dict-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" 
								:btn="btn" :searchConfig="searchConfig" :multi="true"
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
								<a href="/template/员工合同管理导入模板.xlsx" download> 批量导入模板</a>
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
			:header="CONTRACT_APPLY_HEADER"
			url="/yifu-archives/method/temployeecontractinfo/batchImport"
			:errName="'合同批量申请'"
			:title="'批量申请'"
			:download="true"
			@ok="refresh"
		>
		<template #error>
				<div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
		<!-- 批量删除反馈 -->
		<show-deletes-vue ref="showDeletesRef" @ok="refresh"/>
	</div>
</template>

<script setup name="合同申请">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { CONTRACT_APPLY_HEADER} from '/@/utils/header';
import { ElMessageBox } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { getDictByItemTypes } from '/@/utils/utils';
import {getContractApplyList,deleteContractApply,getContractDetail,deleteContractApplyBatch} from '/@/api/contract';
import { useRouter,useRoute } from 'vue-router';
import { getAreaJson, idToArea } from '/@/utils/city';
import { onRefresh, offRefresh } from '/@/utils/events';
import showDeletesVue from './component/showDeletes.vue';
// import moment from 'moment';

const proTableRef = ref(null);
const batchImportDialogRef = ref(null)
const showDeletesRef = ref(null);
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();

// 新增按钮
const handleAddClick = () => {
	router.push({ 
		name: 'contract-add', 
		params: {}
	});
};

// 批量导入
const handleBatchImport = () => {
	if (batchImportDialogRef.value) batchImportDialogRef.value.openDialog();
};

// 多选
const selectionChange = (res)=>{
	state.selectOptions = res;
	if(state.selectOptions.length>0){
		state.btn.find(item=>item.label=='批量删除').disabled = false;
	}else{
		state.btn.find(item=>item.label=='批量删除').disabled = true;
	}
}

// 批量删除
const handleBatchDelete = ()=>{
	if(state.selectOptions.length>0){
		const text = `<p style="font-size:16px;font-weight:600">是否确定删除${state.selectOptions.length}条员工合同?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后员工合同将从系统消失，请谨慎操作！</span></p>`
		ElMessageBox.confirm(text, {
			type: 'warning',
			dangerouslyUseHTMLString: true,
		}).then(() => {
			const ids = []
			state.selectOptions.map(item=>{
				ids.push(item.id)
			})
			deleteContractApplyBatch(ids).then(res=>{
				if(res.code==200&&res.data&&res.data.length>0){
					showDeletesRef.value.openDialog(res.data);
					proTableRef.value.refresh();
				} else if(res.code==200&&!res.data){
					ElMessage.success(res.msg||'删除成功');
					proTableRef.value.refresh();
				}else{
					ElMessage.error(res.msg||'删除失败');
				}
				
			})
		});
	}
}
const isGray = (item)=>{
	return item.auditStatus !=  0;
}
const isDelete = (item)=>{
	// return item.auditStatus ==  1||item.auditStatus ==  2||item.auditStatus ==  3;
	return item.auditStatus !=  0;
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
				hideInSearch: true,
				tooltip: true,
				minWidth: 200,
				formatter: (val) => {
					return idToArea({ province: val.fileProvince, city: val.fileCity, town: val.fileTown });
				},
			},
			{
				dataIndex: 'empNatrue',
				title: '员工类型',
				hideInSearch: true,
				minWidth: 160,
			},
			{
				dataIndex: 'contractName',
				title: '合同类型',
				hideInSearch: true,
				minWidth: 200,
			},
			{
				dataIndex: 'situation',
				title: '签订类型',
				hideInSearch: true,
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
				dataIndex: 'applyNo',
				title: '申请编号',
				minWidth:180,
				hideInTable: true,
			},
			{
				dataIndex: 'subjectUnit',
				title: '客户名称',
				hideInSearch: true,
				minWidth: 200,
				tooltip:true
			},
			{
				dataIndex: 'contractParty',
				title: '合同甲方',
				hideInSearch: true,
				minWidth: 160,
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
				hideInSearch: true,
				minWidth:200,
				tooltip:true
			},
			{
				dataIndex: 'auditStatus',
				title: '审批状态',
				minWidth: 160,
				valueType:'select',
			},
			{
				dataIndex: 'createTime',
				title: '创建时间',
				minWidth: 180,
				searchIndex: 'startEndTime',
				startTime: 'createTimeStart',
				endTime: 'createTimeEnd',
				valueType:'dateTimeRange',
			},
			{
				dataIndex: 'option',
				title: '操作',
				key: 'option',
				minWidth:200,
				hideInSearch: true,
				fixed: 'right',
				scopedSlots: {
					customRender: 'option',
				},
			},
		],
			
		btn: [
			{
				label: '合同申请',
				onClick: handleAddClick,
				permission: ['temployeecontractinfo_add'],
				icon: 'icon-ic_edit_add',
			},
			{
				label: '批量申请',
				permission: ['temployeecontractinfo_batch_import'],
				onClick: handleBatchImport,
				type: 'normal',
				icon: 'icon-ic_edit_upload',
			},
			{
				label: '批量删除',
				permission: ['temployeecontractinfo_del'],
				onClick: handleBatchDelete,
				type: 'normal',
				icon: 'icon-ic_edit_delete',
				disabled:true,
			},
			
		],
		cellBtns: [
			{
				text: '详情',
				prop: 'detail', // 唯一标识
				permission: ['temployeecontractinfo_detail'], // 权限标识
			},
			{
				text: '编辑',
				prop: 'edit', // 唯一标识
				permission: ['temployeecontractinfo_edit'], // 权限标识
				isGray:isGray,
				tooltip: '非待提交状态不可编辑',
			},
			{
				text: '删除',
				prop: 'delete', // 唯一标识
				permission: ['temployeecontractinfo_del'], // 权限标识
				isGray:isDelete,
				tooltip: '待审核、审核通过状态不可删除',
			},
		],
		selectOptions:[],//多选数据
		params:{},//导出请求数据
		dictKeys:[  //字典项
    'emp_natrue',//员工类型
		'contract_audit_status',//审批状态
		'employee_contract_type',//签订期限
		'check_type'  // 审核类型
  ],
	});

	const { columns, cellBtns,btn,searchConfig} = toRefs(state);

	const request = async (params) => {
		try {
			const res = await getContractApplyList(params);
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
			const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后员工合同将从系统消失，请谨慎操作！</span></p>`
			ElMessageBox.confirm(
			text, 
			{
				type: 'warning',
				dangerouslyUseHTMLString: true,
			}).then(async () => {
					const res = await deleteContractApply(item.id);
					if (res && res.code == 200) {
						ElMessage.success('删除成功');
						refresh();
				}else{
					ElMessage.error(res.msg||'删除失败');
				}
			}).catch(() => {})
		} 
		else if (prop === 'edit') {
			router.push({ 
				name: 'contract-edit', 
				query: {
					id: item.id,
				},
			})
		} else if (prop === 'detail') {
			router.push({ 
				name: 'contract-detail', 
				query: {
					id: item.id,
				},
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
						case 'empNatrue':
							item.valueEnum = res['emp_natrue']; // 人员类型
							break;
						case 'auditStatus':
							item.valueEnum = res['contract_audit_status']; // 审批状态
							break;
						case 'contractType':
							item.valueEnum = res['employee_contract_type']; // 签订期限
							break;
						case 'type':
							item.valueEnum = res['check_type'];	// 审核类型
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
<style lang="scss" scoped  src="./css/contractApply.scss"></style>
