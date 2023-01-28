<template>
	<div class="contract-apply-container">
		<pro-table 
			ref="proTableRef" 
			row-key="id" 
			:columns="state.columns" 
			:request="request" 
			@onReset="onReset" 
			:searchConfig="state.searchConfig"
			:btn="state.btn"
			:multi="true"
			@selectionChange="selectionChange"
		>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

			<template v-slot:fileAddress="item">
				<el-tree-select
					v-model="state.params.fileAddress"
					:data="state.areaJson"
					:key="'arch_search_props_' + item.dateIndex"
					style="width: 100%"
					placeholder="请选择"
					:props="state.areaProps"
					@current-change="changeFileAddress"
					@clear="clearFileAddress"
					node-key="id"
					:load="loadArea"
					check-strictly
					lazy
					clearable
					download
				/>
			</template>
		</pro-table>
			<!-- 批量审核-->
			<contract-check-dilog ref="contractCheckRef" @ok="refreshList" />
			
	</div>
</template>

<script setup name="合同审核">
import ProTable from '/@/components/ProTable/ProTable.vue';
import { getContractAuditPageList,exportContractAudit,batchCheckContract } from '/@/api/contract';
import contractCheckDilog from './component/contractCheckDilog.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { getAreaJson, loadNode, idToArea } from '/@/utils/city';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getDictByItemTypes } from '/@/utils/utils';
import { onRefresh, offRefresh } from '/@/utils/events';

const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const proTableRef = ref(null);
const contractCheckRef = ref(null);

const refreshList = () => {
	if (proTableRef.value) proTableRef.value.refresh();
};

const onReset = () => {
	state.params = {};
};

const listener = () => {
	onRefresh(proxy, route.path, () => {
		refreshList();
	});
};

onUnmounted(() => {
	offRefresh(proxy);
});

onMounted(() => {
	listener();
	loadDicts();
	const json = getAreaJson();
	state.areaJson = json;
});

const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
			state.columns = state.columns.map((item) => {
				const target = { ...item };
				switch (item.dataIndex) {
					case 'empNatrue':
						target.valueEnum = res['emp_natrue']; // 人员类型
						break;
					case 'contractType':
						target.valueEnum = res['employee_contract_type']; // 签订期限
						break;

					case 'contractStatus':
						target.valueEnum = res['personnel_state']; // 合同
						break;

					case 'situation':
						// 签订类型
						target.valueEnum = transformDict(res['situation_type']);
						break;
					case 'contractName':
						// 合同类型
						target.valueEnum = transformDict(res['personnel_type']);
						break;
						// 审核类型
					case 'type':
						target.valueEnum = res['check_type'];
						break;
				}
				return target;
			});
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

const transformDict = (dict) => {
	const values = Object.values(dict);
	const target = {};
	values.forEach((v) => (target[v] = v));
	return target;
};


/**
 * 省市区延迟加载的加载方法
 */
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

const onCellClick = async (prop, item) => {
	if (prop === 'audit') {
		// 跳转审核页面
		router.push({ name: 'contract-audit', params: { id: item.id } });
	}
};
const changeFileAddress = (val, node) => {
	// 获取档案所在地
	const values = [val.id];
	if (node.parent && node.parent.level != 0) {
		// 获取市或者省
		values.unshift(node.parent.data.id);
		if (node.parent.parent && node.parent.parent.level != 0) {
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

const selectionChange = (selection) => {
		state.selectionChangeList = selection;
};

const isShowLoading = ref(false);
// 批量导出
const handleBatchExport = async () => {
	isShowLoading.value = true
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

	const { menuInfo,...otherKey }  = state.params
	const p = Object.assign({},{mId:menuInfo})
	// Object.assign({},otherKey,{menuInfo:menuInfo})
	exportContractAudit(p, Object.assign({},otherKey,{menuInfo:menuInfo})).then(res=>{
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
// 批量审核
const handleBatchCheck = async () => {
		if(state.selectionChangeList.length==0){
				return  ElMessage.error('请选择待审核的合同！');
		}
	if (contractCheckRef.value) contractCheckRef.value.openDialog(state.selectionChangeList);
};


const state = reactive({
	areaJson: null,
	searchConfig: {
		labelWidth: 110,
	},
	selectionChangeList: [],// 选中的数据
	params: {},
	dictKeys: [
		//字典项
		'emp_natrue', //员工类型
		'employee_contract_type', // 签订期限
		'situation_type', // 签订类型
		'personnel_type', //合同类型
		'check_type'  //审核类型
	],
	DICTS: {
		
	},
	areaProps: {
		label: 'areaName',
	},

	cellBtns: [
		{
			text: '审核',
			prop: 'audit', // 唯一标识
			permission: ['temployeecontractinfo_audit'],
		},
	],
	btn:[
		{
			label: '批量导出',
			permission: ['employee_export_contract_audit'],
			onClick:handleBatchExport,
			icon: 'icon-ic_edit_export',
			loading:isShowLoading
		},
		{
			label: '批量审核',
			permission: ['temployeecontractinfo_audit'],
			onClick: handleBatchCheck,
			icon: 'icon-ic_edit_add'
		},
	],
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
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'empName',
			title: '员工姓名',
			minWidth: 160,
			ellipsis: true,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			minWidth: 180,
		},
		{
			dataIndex: 'fileaddress', //fileProvince、fileCity、fileTown
			title: '档案所在地',
			// hideInSearch: true,
			tooltip: true,
			minWidth: 180,
			valueType:'addRess',
			params:{
				pro:'fileProvince',
				city:'fileCity',
				town:'fileTown'
			},
			// formatter: (row) => {
			// 	return idToArea({ province: row.fileProvince, city: row.fileCity, town: row.fileTown });
			// },
		},
		// {
		// 	dataIndex: 'fileAddress',
		// 	title: '档案所在地',
		// 	hideInTable: true,
		// 	valueType: 'custom',
		// 	scopedSlots: {
		// 		customRender: 'fileAddress',
		// 	},
		// },
		{
			dataIndex: 'empNatrue',
			title: '员工类型',
			minWidth: 160,
			ellipsis: true,
		},
		{
			dataIndex: 'contractName',
			title: '合同类型',
			minWidth: 180,
			ellipsis: true,
		},
		{
			dataIndex: 'situation',
			title: '签订类型',
			minWidth: 160,
			ellipsis: true,
		},
		{
			dataIndex: 'subjectDepart',
			title: '项目名称',
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'deptNo',
			title: '项目编码',
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'subjectUnit',
			title: '客户名称',
			minWidth: 180,
			tooltip: true,
		},
		{
			dataIndex: 'contractParty',
			title: '合同甲方',
			minWidth: 160,
			ellipsis: true,
		},
		{
			dataIndex: 'contractStart',
			title: '合同起始日期',
			hideInSearch: true,
			minWidth: 160,
			ellipsis: true,
			dateFormat: 'YYYY-MM-DD',
		},
		{
			dataIndex: 'contractEnd',
			title: '合同截止日期',
			hideInSearch: true,
			minWidth: 160,
			ellipsis: true,
			dateFormat: 'YYYY-MM-DD',
		},
		{
			dataIndex: 'contractType',
			title: '签订期限',
			minWidth: 160,
			ellipsis: true,
		},
		{
			dataIndex: 'createName',
			title: '创建人',
			hideInSearch: false,
			minWidth: 160,
			ellipsis: true,
		},
		// {
		// 	dataIndex: 'auditUserName',
		// 	title: '创建人',
		// 	minWidth: 160,
		// 	ellipsis: true,
		// },
		{
			dataIndex: 'createTime',
			title: '创建时间',
			hideInSearch: true,
			minWidth: 160,
			ellipsis: true,
		},
		{
			dataIndex: 'applyNo',
			title: '申请编码',
			hideInTable: true,
			minWidth: 160,
			ellipsis: true,
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 100,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	]
});

const request = async (params) => {
	try {
		// console.log(state.params);
		const p = Object.assign({}, params);
		delete p.fileAddress;
		const res = await getContractAuditPageList(p);
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


</script>
