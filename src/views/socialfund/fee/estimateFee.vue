<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :searchConfig="state.searchConfig" :columns="state.columns"
			:request="request" :btn="state.btn" @selectionChange="selectionChange" multi>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		<add-estimate-fee ref="addEstimateFeeRef" @ok="refreshList"></add-estimate-fee>
		<export-excel-dialog ref="exportExcelRef" :heads="EXPORT_ESTIMATE_FEE_PARAMS" title="批量导出"
			useCode="social_tforecastlibrary-export" />
		<estimate-fee-detail ref="estimateFeeDetailRef"></estimate-fee-detail>
	</div>
</template>

<!--预估费用-->
<script setup name="预估费用">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { getEstimateFeeList, exportEstimateFee } from '/@/api/socialfund/fee';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import EstimateFeeDetail from './component/estimateFeeDetail.vue';
import addEstimateFee from './component/addEstimateFee.vue';
import { EMPTY_PLACEHOLDER, formatMoney, getDictByItemTypes } from '/@/utils/utils';
import { EXPORT_ESTIMATE_FEE_PARAMS } from '/@/utils/header';
import { onRefresh, offRefresh } from '/@/utils/events';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getHuConfigList } from '/@/api/permission/socialHandlePermission';

const proTableRef = ref(null);
const addEstimateFeeRef = ref(null);
const exportExcelRef = ref(null); // 批量导出
const estimateFeeDetailRef = ref(null);
const router = useRouter();
const route = useRoute();

const { proxy } = getCurrentInstance();
const refreshList = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.refresh();
};

const onCellClick = async (prop, item) => {
	if (prop === 'detail') {
		if (estimateFeeDetailRef.value) estimateFeeDetailRef.value.openDialog(item);
	}
};

// 批量导出
const handleBatchExport = () => {
	let searchParams = Object.assign({}, proTableRef.value.getParams(), state.params);
	delete searchParams.size;
	delete searchParams.current;

	if (exportExcelRef.value) {
		// console.log('get exportExcelRef:', exportExcelRef.value);
		exportExcelRef.value.openDialog((params, exportFile) => {
			const data = {
				...searchParams,
				exportFields: params.map((item) => item.dataIndex),
			};
			const idList = state.selectionChangeList.map((t) => t.id);
			if (idList && idList.length) {
				data.idList = idList;
			}
			delete data.createTime;
			exportEstimateFee({}, data).then((res) => {
				if (res.code && res.code !== 200) {
					ElMessageBox.error(res.msg);
				}
				exportFile(true);
			});
		});
	}
};

const selectionChange = (selection) => {
	state.selectionChangeList = selection;
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
	selectionChangeList: [], // 选中项
	searchConfig: {
		labelWidth: 120,
	},
	columns: [
		{
			dataIndex: 'empName',
			title: '员工姓名',
			minWidth: 180,
			fixed: 'left',
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			minWidth: 200,
		},

		{
			dataIndex: 'unitName',
			title: '客户名称',
			minWidth: 180,
			tooltip: true,
		},

		{
			dataIndex: 'deptName',
			title: '项目名称',
			minWidth: 180,
			tooltip: true,
		},
		{
			dataIndex: 'deptNo',
			title: '项目编码',
			minWidth: 180,
			tooltip: true,
		},
		{
			dataIndex: 'empNatrue',
			title: '员工类型',
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
			minWidth: 200,
			valueType: 'addRess',
			tooltip: true,
			params: {
				pro: 'socialProvince',
				city: 'socialCity',
				town: 'socialTown',
			},
		},
		{
			dataIndex: 'socialPayMonth',
			title: '社保缴纳月份',
			minWidth: 160,
			valueType: 'date',
			selectType: 'month',
			valueFormat: 'YYYYMM',
			format: 'YYYY年MM月',
		},
		{
			dataIndex: 'socialCreateMonth',
			title: '社保生成月份',
			minWidth: 160,
			valueType: 'date',
			selectType: 'month',
			valueFormat: 'YYYYMM',
			format: 'YYYY年MM月',
		},
		{
			dataIndex: 'socialSum',
			title: '社保费用',
			hideInSearch: true,
			minWidth: 200,
			formatter: (row) => {
				if (row.unitSocialSum == null && row.personalSocialSum == null) {
					return EMPTY_PLACEHOLDER;
				}
				let unitSocialSum = row.unitSocialSum ?? 0;
				let personalSocialSum = row.personalSocialSum ?? 0;
				return formatMoney((unitSocialSum * 100 + personalSocialSum * 100) / 100) + '元';
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
			dataIndex: 'fundAddress',
			title: '公积金缴纳地',
			minWidth: 200,
			valueType: 'addRess',
			tooltip: true,
			params: {
				pro: 'fundProvince',
				city: 'fundCity',
				town: 'fundTown',
			},
		},
		{
			dataIndex: 'providentPayMonth',
			title: '公积金缴纳月份',
			minWidth: 160,
			valueType: 'date',
			selectType: 'month',
			valueFormat: 'YYYYMM',
			format: 'YYYY年MM月',
		},
		{
			dataIndex: 'providentCreateMonth',
			title: '公积金生成月份',
			minWidth: 160,
			valueType: 'date',
			selectType: 'month',
			valueFormat: 'YYYYMM',
			format: 'YYYY年MM月',
		},
		{
			dataIndex: 'FundSum',
			title: '公积金费用',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				if (row.unitFundSum == null && row.personalFundSum == null) {
					return EMPTY_PLACEHOLDER;
				}

				let unitFundSum = row.unitFundSum ?? 0;
				let personalFundSum = row.personalFundSum ?? 0;
				return formatMoney((unitFundSum * 100 + personalFundSum * 100) / 100) + '元';
			},
		},
		{
			dataIndex: 'sumAll',
			title: '费用合计',
			hideInSearch: true,
			minWidth: 180,
			formatter: (row) => {
				if (row.sumAll) {
					return formatMoney(row.sumAll) + '元';
				}
				return EMPTY_PLACEHOLDER;
			},
		},
		{
			dataIndex: 'createTime',
			title: '数据生成时间',
			minWidth: 180,
			valueType: 'dateTimeRange',
			searchIndex: 'createTime',
			startTime: 'createTimeStart',
			endTime: 'createTimeEnd',
		},
		{
			dataIndex: 'dataPush',
			title: '同步状态',
			valueEnum: {
				0: '未同步',
				1: '已同步',
			},
		},

		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 140,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
	btn: [
		{
			label: '按缴纳月重新生成',
			onClick: () => {
				if (addEstimateFeeRef.value) addEstimateFeeRef.value.openDialog();
			},
			permission: ['social_tforecastlibrary_create'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '批量导出',
			type: 'default',
			onClick: handleBatchExport,
			permission: ['social_tforecastlibrary-export'],
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: ['social_tforecastlibrary_get'],
		},
	],
	dictKeys: ['emp_natrue'],
	DICTS: {},
});

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
					case 'empNatrue':
						target.valueEnum = res['emp_natrue']; // 人员类型
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
		const res = await getEstimateFeeList(params);
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


