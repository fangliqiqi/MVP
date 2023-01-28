<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn"
			:searchConfig="state.searchConfig" @selectionChange="selectionChange" multi>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<export-excel-dialog ref="exportExcelRef" :heads="ORDER_SEARCH_HEADER" title="派单查询导出" />
	</div>
</template>

<script setup name="派单查询">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { getOrderList, batchExportOrderList } from '/@/api/socialfund/order';
import { getDictByItemTypes } from '/@/utils/utils';
import { ORDER_SEARCH_HEADER } from '/@/utils/header';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import { onRefresh, offRefresh } from '/@/utils/events';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getHuConfigList } from '/@/api/permission/socialHandlePermission';

const proTableRef = ref(null);
const exportExcelRef = ref(null);
const router = useRouter();
const route = useRoute();

const { proxy } = getCurrentInstance();
const refreshList = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.onSearch();
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'detail':
			// 详情
			router.push({ name: 'socialfund-order-detail', params: { id: item.id } });
			break;
	}
};

// 批量导出
const handleBatchExport = () => {
	let searchParams = Object.assign({}, proTableRef.value.getParams(), state.params);
	delete searchParams.size;
	delete searchParams.current;
	delete searchParams.startEndTime;
	
	if (exportExcelRef.value) {
		exportExcelRef.value.openDialog((params, exportFile) => {
			const data = {
				...searchParams,
				exportFields: params.map((item) => item.dataIndex),
			};
			const idList = state.selectionChangeList.map((t) => t.id);
			if (idList && idList.length) {
				data.idList = idList;
			}
			// console.log(data);
			delete data.createTime;
			batchExportOrderList({}, data).then(
				(res) => {
					if (res.code && res.code !== 200) {
						ElMessageBox.error(res.msg);
					}
					exportFile(true);
				},
				(res) => {
					ElMessage.error((res && res.msg) || '导出失败');
					exportFile(true);
				}
			);
		});
	}
};
// 获取户列表
const requestHouseList = async (params) => {
	try {
			params = Object.assign({},{type:0},params)
		const res = await getHuConfigList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		} else {
			ElMessage.error(res.msg);
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
const state = reactive({
	searchConfig: {
		labelWidth: 120,
	},
	dictKeys: ['emp_natrue', 'send_order_type', 'social-conduct-status', 'fund-conduct-status', 'dispatch-audit-status'],
	DICTS: {},
	columns: [
		{
			dataIndex: 'type',
			title: '派单类型',
			minWidth: 180,
			tag:{
				0: { type: 'success', },
				1: { type: 'danger', },
			},
			fixed: 'left',
		},
		{
			dataIndex: 'applyNo',
			title: '申请编码',
			minWidth: 220,
			tooltip: true,
			hideInSearch: true,
			
		},
		{
			dataIndex: 'empNo',
			title: '员工编码',
			minWidth: 180,
			hideInSearch: true,
			ellipsis: true,
		},
		{
			dataIndex: 'empName',
			title: '员工姓名',
			minWidth: 180,
			ellipsis: true,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			minWidth: 220,
			tooltip: true,
		},
		{
			dataIndex: 'empType',
			title: '员工类型',
			hideInSearch: true,
			minWidth: 180,
		},
		{
			dataIndex: 'belongUnitName',
			title: '客户名称',
			hideInSearch: true,
			minWidth: 180,
			tooltip: true,
		},
		{
			dataIndex: 'settleDomainName',
			title: '项目名称',
			minWidth: 180,
			tooltip: true,
		},
		{
			dataIndex: 'settleDomainCode',
			title: '项目编码',
			minWidth: 180,
		},
		
		{
			dataIndex: 'dispatchItem',
			title: '派单项',
			hideInSearch: true,
			minWidth: 180,
			tooltip: true,
		},
		{
			dataIndex: 'status',
			title: '派单状态',
			hideInTable: true,
		},
		{
			dataIndex: 'socialHouseholdName',
			title: '社保户',
			minWidth: 200,
			valueType: 'PageSelect',
			request:requestHouseList,
			pageProps:{
					valueKey:'name',
					title:'name',
					search:'name',
					parmas:{
						type:0
					}
			},
			tooltip: true,
		},
		{
			dataIndex: 'socialAddress',
			title: '社保缴纳地',
			hideInTable: true,
			valueType: 'addRess',
			params: {
				pro: 'socialProvince',
				city: 'socialCity',
				town: 'socialTown',
			},
		},
		{
			dataIndex: 'socialHandleStatus',
			title: '社保办理状态',
			hideInTable: true,
		},
		{
			dataIndex: 'providentHouseholdName',
			title: '公积金户',
			minWidth: 200,
			valueType: 'PageSelect',
			request:requestHouseList,
			pageProps:{
					valueKey:'name',
					title:'name',
					search:'name',
					parmas:{
						type:1
					}
			},
			tooltip: true,
		},
		{
			dataIndex: 'funAddress',
			title: '公积金缴纳地',
			hideInTable: true,
			valueType: 'addRess',
			params: {
				pro: 'fundProvince',
				city: 'fundCity',
				town: 'fundTown',
			},
		},
		{
			dataIndex: 'status',
			title: '审核状态',
			hideInSearch: true,
			minWidth: 180,
		},
		{
			dataIndex: 'socialHandleStatus',
			title: '社保办理状态',
			hideInSearch: true,
			minWidth: 180,
		},

		{
			dataIndex: 'fundHandleStatus',
			title: '公积金办理状态',
			minWidth: 180,
		},
		{
			dataIndex: 'createName',
			title: '申请人',
			minWidth: 180,
		},
		{
			dataIndex: 'organName',
			title: '申请人所在部门',
			minWidth: 180,
			tooltip: true,
			hideInSearch: true,
		},
		{
			dataIndex: 'createTime',
			title: '申请时间',
			valueType: 'dateTimeRange',
			searchIndex: 'createTime',
			startTime: 'createTimeStart',
			endTime: 'createTimeEnd',
			minWidth: 160,
			valueFormat: 'YYYY-MM-DD HH:mm:ss',
			format: 'YYYY-MM-DD',
			selectType: 'daterange',
		},
		{
			dataIndex: 'auditUserName',
			title: '审核人',
			minWidth: 180,
		},
		{
			dataIndex: 'auditTime',
			title: '审核时间',
			valueType: 'dateTimeRange',
			searchIndex: 'startEndTime',
			startTime: 'auditTimeStart',
			endTime: 'auditTimeEnd',
			minWidth: 160,
			valueFormat: 'YYYY-MM-DD HH:mm:ss',
			format: 'YYYY-MM-DD',
			selectType: 'daterange',
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 120,
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
			label: '批量导出',
			onClick: handleBatchExport,
			permission: ['tdispatchinfo-export'],
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: ['mvp-order-search-detail'],
		},
	],
	selectionChangeList: [], // 列表多选选中的内容
});

const selectionChange = (selection) => {
	state.selectionChangeList = selection;
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
});

const loadDicts = async () => {
	if (state.dictKeys && state.dictKeys.length) {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;

			state.columns = state.columns.map((item) => {
				const target = { ...item };
				switch (item.dataIndex) {
					case 'empType':
						target.valueEnum = res['emp_natrue']; // 人员类型
						break;

					case 'type':
						target.valueEnum = res['send_order_type']; // 派单类型
						break;

					case 'socialHandleStatus':
						target.valueEnum = res['social-conduct-status']; // 社保办理状态
						break;

					case 'fundHandleStatus':
						target.valueEnum = res['fund-conduct-status']; // 公积金
						break;
					case 'status':
						target.valueEnum = res['dispatch-audit-status']; // 派单审核状态
						break;
				}
				return target;
			});
		}
	}
};

const request = async (params) => {
	try {
		if (params.createTime) {
			params.createTime = null;
		}
		const res = await getOrderList(params);
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

<style lang="scss" scoped>
</style>
