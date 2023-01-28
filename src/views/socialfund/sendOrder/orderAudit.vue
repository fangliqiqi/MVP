<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn"
			:searchConfig="state.searchConfig" @selectionChange="selectionChange" multi>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<audit-batch-dialog ref="auditBatchDialogRef" @ok="refreshList"></audit-batch-dialog>
	</div>
</template>

<script setup name="派单审核">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { getOrderAuditList, batchExportOrderList, exportOrderAuditList } from '/@/api/socialfund/order';
import { getAreaJson, loadNode, idToArea } from '/@/utils/city';
import { getDictByItemTypes } from '/@/utils/utils';
import { ORDER_SEARCH_HEADER } from '/@/utils/header';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import auditBatchDialog from './component/auditBatchDialog.vue';
import { onRefresh, offRefresh } from '/@/utils/events';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getHuConfigList } from '/@/api/permission/socialHandlePermission';

const proTableRef = ref(null);
const exportExcelRef = ref(null);
const auditBatchDialogRef = ref(null);
const router = useRouter();
const route = useRoute();
const isShowLoading = ref(false);

const { proxy } = getCurrentInstance();
const refreshList = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.refresh();
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'audit':
			// 详情
			router.push({ name: 'socialfund-order-audit', params: { id: item.id } });
			break;
	}
};

/**
 * 批量审核
 */
const handleBatchAudit = () => {
	if (!state.selectionChangeList || state.selectionChangeList.length === 0) {
		ElMessage.error('请先选择待审核的派单信息');
		return;
	}

	if (auditBatchDialogRef.value) auditBatchDialogRef.value.openDialog(state.selectionChangeList);
};


/**
 * 批量导出
 */
const handleBatchExport = () => {
	isShowLoading.value = true;
	let p = null
	if (state.selectionChangeList.length > 0) {
		const ids = []
		state.selectionChangeList.map(item => {
			ids.push(item.id)
		})
		// p = {
		// 	ids:ids.join(',')
		// }
		p = {
			idList: ids
		}
	} else {
		p = {
			...proTableRef.value.getParams()
		}
		delete p.size
		delete p.current
		delete p.createTime
	}
	exportOrderAuditList({mId:p.menuInfo}, p).then(res => {
		if (res.code == 200) {
			ElMessage.success('导出成功');
		} else {
			ElMessage.error(res.msg || '导出失败');
		}
	})
		.catch((err) => {
			ElMessage.error(err.msg || '导出失败');
		}).finally(() => {
			isShowLoading.value = false
		});
};
// 获取户列表
const requestHouseList = async (params) => {
	try {
		params = Object.assign({}, { type: 0 }, params)
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
			dataIndex: 'leaveDate',
			title: '离职日期',
			hideInSearch: true,
			minWidth: 180,
			dateFormat: 'YYYY-MM-DD',
		},

		
		{
			dataIndex: 'dispatchItem',
			title: '派单项',
			hideInSearch: true,
			minWidth: 180,
			multiple: true,
			tooltip: true,
		},

		{
			dataIndex: 'createName',
			title: '申请人',
			minWidth: 180,
			multiple: true,
		},
		{
			dataIndex: 'organName',
			title: '申请人所在部门',
			minWidth: 180,
			hideInSearch: true,
			multiple: true,
			tooltip: true,
		},
		{
			dataIndex: 'createTime',
			title: '申请时间',
			minWidth: 160,
			valueType: 'dateTimeRange',
			searchIndex: 'createTime',
			startTime: 'createTimeStart',
			endTime: 'createTimeEnd',
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
			label: '批量审核',
			onClick: handleBatchAudit,
			permission: ['wxhr:tdispatchinfo_batch_audit'],
			disabled: () => {
				return !state.selectionChangeList || state.selectionChangeList.length === 0;
			},
			icon: 'icon-ic_edit_export',
		},
		{
			label: '批量导出',
			onClick: handleBatchExport,
			permission: ['tdispatchinfo-export'],
			type: 'normal',
			loading: isShowLoading,
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '审核',
			prop: 'audit', // 唯一标识
			permission: ['wxhr:dispatch_auth'],
		},
	],
	dictKeys: ['emp_natrue', 'send_order_type', 'social-conduct-status', 'fund-conduct-status', 'dispatch-audit-status'],
	DICTS: {},
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
		const res = await getOrderAuditList(params);
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
