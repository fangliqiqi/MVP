<template>
	<div class="cardinal-config-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="state.columns"
			:request="request"
			:btn="state.btn"
			:searchConfig="state.searchConfig"
			@selectionChange="selectionChange"
			multi
		>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		
		<!-- 新增 -->
		<add-contract-permission-vue ref="addContractPermissionRef" @ok="refresh"/>
	</div>
</template>

<script setup name="合同审核权限">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { getAreaJson, loadNode, idToArea } from '/@/utils/city';
import addContractPermissionVue from './component/addContractPermission.vue'
import { getDictByItemTypes } from '/@/utils/utils';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getContractPerlist,exportContractPer,deleteContractPer,updateContractPer} from '/@/api/permission/contractPermission';




const proTableRef = ref(null);
const addContractPermissionRef = ref(null);
const store = useStore();


const refresh = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.refresh();
};
const isShowLoading = ref(false)


// 新增
const handleAdd = () => {
  addContractPermissionRef.value&&addContractPermissionRef.value.openDialog()
};

// 批量导出
const handleBatchExport = () => {
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
	// console.log(state.params);
	exportContractPer(state.params).then(res=>{
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


const state = reactive({
	searchConfig: {
		labelWidth: 120,
	},
	columns: [
		{
			dataIndex: 'userName',
			title: '审核人',
			minWidth:160,
			// tooltip: true,
		},
		{
			dataIndex: 'organName',
			title: '审核人所在部门',
			minWidth: 180,
			// tooltip: true,
		},
		{
			dataIndex: 'fileAddress',
			title: '档案所在地',
			minWidth: 220,
			valueType: 'addRess',
			// tooltip: true,
			params:{
				pro: 'fileProvince',
				city: 'fileCity',
				town: 'fileTown',
			}
		},
		{
			dataIndex: 'status',
			title: '授权状态',
			minWidth: 160,
			// tooltip: true,
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 200,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
	params: {},
	btn: [
    {
			label: '新增',
			onClick: handleAdd,
			loading:isShowLoading,
			permission: ['temployeecontractareares_add'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '批量导出',
			onClick: handleBatchExport,
			loading:isShowLoading,
			permission: ['temployeecontractareares-export'],
      type:'normal',
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: ['temployeecontractareares_del'],
			// isGray:(row)=>{
			// 	return row.feedBack||row.createBy != state.userInfos.id
			// },
		},
    {
			text: '启用',
			prop: 'enable', // 唯一标识
			permission: ['temployeecontractareares_edit'],
			isGray:(row)=>{
				return row.status == '0'
			},
		},
    {
			text: '禁用',
			prop: 'stop', // 唯一标识
			permission: ['temployeecontractareares_edit'],
			isGray:(row)=>{
				return row.status == '1'
			},
		},
	],
	selectionChangeList: [], // 列表多选选中的内容
	dictKeys:['permission_status'], // 字典key
});

const selectionChange = (selection) => {
	state.selectionChangeList = selection;
};
const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'delete':
			// console.log('删除');
			ElMessageBox.confirm(`是否确定删除？`, '提示', {
				type: 'warning',
			})
				.then(async () => {
					try {
						const res = await deleteContractPer(item.id);
						if (res && res.code === 200) {
							ElMessage.success('删除成功');
							refresh();
						} else {
							ElMessage.error(res.msg || '删除失败');
						}
					} catch (e) {
						ElMessage.error(e.sag || '删除失败');
					}
				})
				.catch(() => {});
			break;
		case 'enable':
			// console.log('启用');
			ElMessageBox.confirm(`是否确定启用？`, '提示', {
				type: 'warning',
			})
				.then(async () => {
					try {
						const res = await updateContractPer({
							id: item.id,
							status: 0,
						});
						if (res && res.code === 200) {
							ElMessage.success('启用成功');
							refresh();
						} else {
							ElMessage.error(res.msg || '启用失败');
						}
					} catch (e) {
						ElMessage.error(e.sag || '启用失败');
					}
				})
				.catch(() => {});
			break;
		case 'stop':
			// console.log('禁用');
			ElMessageBox.confirm(`是否确定禁用？`, '提示', {
				type: 'warning',
			})
				.then(async () => {
					try {
						const res = await updateContractPer({
							id: item.id,
							status: 1,
						});
						if (res && res.code === 200) {
							ElMessage.success('禁用成功');
							refresh();
						} else {
							ElMessage.error(res.msg || '禁用失败');
						}
					} catch (e) {
						ElMessage.error(e.sag || '禁用失败');
					}
				})
				.catch(() => {});
			break;
	}
};

onMounted(() => {
	state.userInfos = store.state.userInfos.userInfos;
});


const request = async (params) => {
	try {
		const res = await getContractPerlist(params);
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

// 字典获取
	const loadDicts = async () => {
		try {
			const res = await getDictByItemTypes(state.dictKeys);
			if (res) {
				// 列表赋值
				state.columns.map(item=>{
					switch(item.dataIndex){
						case 'status':
							item.valueEnum = res['permission_status']
							break;
					}
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
