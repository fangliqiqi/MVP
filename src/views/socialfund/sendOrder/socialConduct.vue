<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn"
			:searchConfig="state.searchConfig" @selectionChange="selectionChange" multi>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<export-excel-dialog ref="exportExcelRef" :heads="SOCIAL_CONDUCT_ROSTER" title="导出花名册" />
		<social-conduct-dialog ref="socialConductDialogRef" @ok="refreshList" />
	</div>
</template>

<script setup name="社保办理">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { getSocialConductList, batchExportOrderList, doexportSocialRecordRoster } from '/@/api/socialfund/order';
import { getAreaJson, loadNode, idToArea } from '/@/utils/city';
import { getDictByItemTypes } from '/@/utils/utils';
import { SOCIAL_CONDUCT_ROSTER } from '/@/utils/header';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import socialConductDialog from './component/socialConductDialog.vue';
import { getHuConfigList } from '/@/api/permission/socialHandlePermission';
import { onRefresh, offRefresh } from '/@/utils/events';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';


const proTableRef = ref(null);
const exportExcelRef = ref(null);
const socialConductDialogRef = ref(null);
const router = useRouter();
const route = useRoute();

const { proxy } = getCurrentInstance();
const refreshList = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.refresh();
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'handle':
			// 办理
			router.push({ name: 'socialfund-social-conduct', params: { id: item.id } });

			break;
	}
};

/**
 * 批量办理
 */
const handleBatchConduct = () => {
	if (!state.selectionChangeList || state.selectionChangeList.length === 0) {
		ElMessage.error('请先选择待办理的派单信息');
		return;
	}

	const target = state.selectionChangeList;
	const type = target[0].type;

	if (target.length > 1 && target.find((item) => item.type != type)) {
		ElMessage.error('请选择全为派增或派减的数据!');
		return;
	}

	if (socialConductDialogRef.value) socialConductDialogRef.value.openDialog(target, type);
};

/**
 * 导出花名册
 */
const isShowLoading = ref(false)
const handleBatchRoster = () => {
	let searchParams = Object.assign({}, proTableRef.value.getParams(), state.params);
	delete searchParams.size;
	delete searchParams.current;
	delete searchParams.createTime;
	delete searchParams.startEndTime;
	isShowLoading.value = true
	// let loading = ElLoading.service({
	// 	lock: true,
	// 	text: '导出中...',
	// 	background: 'rgba(0, 0, 0, 0.7)',
	// 	'custom-class': 'dept-global-loading',
	// });

	const idList = state.selectionChangeList.map((t) => t.id);
	const idStr = idList && idList.length ? idList.join(',') : null;
// 
	doexportSocialRecordRoster({mId:searchParams.menuInfo}, { ...searchParams, idStr })
		.then((res) => { })
		.finally((res) => {
			// if (loading) loading.close();
			isShowLoading.value = false
		});
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
			minWidth: 180,
			valueType: 'addRess',
			tooltip: true,
			params: {
				pro: 'socialProvince',
				city: 'socialCity',
				town: 'socialTown',
			},
		},

		{
			dataIndex: 'socialHandleStatus',
			title: '办理状态',
			hideInTable: true,
			minWidth: 160,
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
			dataIndex: 'socialHandleStatus',
			title: '办理状态',
			hideInSearch: true,
			minWidth: 160,
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
			label: '批量办理',
			onClick: handleBatchConduct,
			disabled: () => {
				return !state.selectionChangeList || state.selectionChangeList.length === 0;
			},
			permission: ['wxhr:tdispatchinfo_batch_handle'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '导出花名册',
			onClick: handleBatchRoster,
			loading: isShowLoading,
			type: 'default',
			permission: ['wxhr:tdispatchinfo_doexportSocialRecordRoster'],
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '办理',
			prop: 'handle', // 唯一标识
			permission: ['wxhr:tdispatchinfo_handle'],
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
						if (item.hideInTable) {
							target.valueEnum = {
								0: '待办理',
								4: '办理中',
							};
						} else {
							target.valueEnum = res['social-conduct-status']; // 社保办理状态
						}

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
		const res = await getSocialConductList(params);
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
