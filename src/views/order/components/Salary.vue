<template>
	<div class="system-dict-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :searchConfig="searchConfig" :manualRequest="true">
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
								<a href="/template/payservice/薪资上传模板.xls" download>薪资模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/payservice/劳务费上传模板.xls" download>劳务费模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/payservice/稿酬上传模板.xls" download>稿酬模板</a>
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
			:width="'816px'"
			:header="pay_header"
			batchName="pay-batch-import"
			:errorHeader="ERROR_HEADER"
			:errorData="batchErrorData"
			:upload="(params) => batchUploadFileExt(params, { orderId: props.orderNo })"
			:ext-params="state.batchExtParams"
			:rules="state.batchRules"
			:errName="'薪酬导入表单'"
			:type="importType"
			:cardCheck="cardCheck"
			customError
			download
			@changeFile="changeFile"
			@ok="doActionSuccess"
		>
		</batch-import-dialog>
	</div>
</template>

<script setup name="Salary">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { LABOR_APPLY_HEADER, BOOK_APPLY_HEADER, AWARD_APPLY_HEADER, ERROR_HEADER } from '/@/utils/header';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getDictByItemTypes } from '/@/utils/utils';
import { readExcel } from '/@/utils/xlsx';
import { useRouter, useRoute } from 'vue-router';
import { getAreaJson, idToArea } from '/@/utils/city';
import { onRefresh, offRefresh } from '/@/utils/events';
import {
	payParams,
	changePayParams,
	moneyParams,
	batchRules,
	changeFile,
	cardCheck,
	pay_header,
	importType,
	batchUploadFileExt,
	batchErrorData,
	batchUploadyYearMoney,
	momeyRules,
} from '/@/views/payservice/payImport/component/payimport.js'; //导入申请数据
import { getpeoBillList,getpeoBillListOrder } from '/@/api/payservice/paysearch';

const proTableRef = ref(null);
const batchImportDialogRef = ref(null);

const emits = defineEmits(['onActionUpdate']);
const props = defineProps({ orderNo: String });

const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();

// 导入表单
const handleAddClick = () => {
	changePayParams(0);
	if (batchImportDialogRef.value) batchImportDialogRef.value.openDialog();
};

const state = reactive({
	batchExtParams: [...payParams],
	batchRules: { ...batchRules },
	moneyParams: [...moneyParams],
	searchConfig: {
		labelWidth: 90,
		option: {
			extBtn: 'extBtns',
		},
	},
	columns: [
		{
			dataIndex: 'empName',
			title: '员工姓名',
			minWidth: 160,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			width: 170,
		},
		{
			dataIndex: 'empPhone',
			title: '手机号码',
			width: 140,
			hideInSearch: true,
		},
		{
			dataIndex: 'bankNo',
			title: '银行卡号',
			minWidth: 200,
			hideInSearch: true,
			tooltip: true,
		},
		{
			dataIndex: 'bankName',
			title: '开户行总行',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'bankProvince',
			title: '开户行省',
			hideInSearch: true,
			minWidth: 120,
			valueType: 'addRess',
			params: {
				pro: 'bankProvince',
			},
		},
		{
			dataIndex: 'bankCity',
			title: '开户行市',
			hideInSearch: true,
			minWidth: 120,
			valueType: 'addRess',
			params: {
				city: 'bankCity',
			},
		},
		{
			dataIndex: 'bankSubName',
			title: '开户行支行',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'salaryMonth',
			title: '薪酬月份',
			hideInTable: true,
			valueType: 'date',
			selectType: 'month',
			format: 'YYYYMM',
			valueFormat: 'YYYYMM',
			minWidth: 120,
		},
		{
			dataIndex: 'formType',
			title: '表单类型',
			hideInSearch: true,
			minWidth: 120,
		},
		{
			dataIndex: 'salaryMonth',
			title: '薪酬月份',
			hideInSearch: true,
			minWidth: 120,
		},
		{
			dataIndex: 'relaySalary',
			title: '应发薪酬',
			hideInSearch: true,
			minWidth: 120,
			formatter: (row) => {
				if (row.formType == '3') {
					return row.relaySalaryUnit;
				} else {
					return row.relaySalary;
				}
			},
		},
		{
			dataIndex: 'salaryTax',
			title: '个税金额',
			hideInSearch: true,
			minWidth: 120,
			formatter: (row) => {
				return Number(row.salaryTax) + Number(row.salaryTaxUnit);
			},
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			minWidth: 100,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],

	btn: [
		{
			label: '导入表单',
			onClick: handleAddClick,
			permission: [],
			icon: 'icon-ic_edit_add',
			disabled: () => {
				return inject('disable');
			},
		},
	],

	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: [], // 权限标识
		},
	],

	params: {}, //导出请求数据
	dictKeys: [
		//字典项
		'form_type', //表单类型
		'salary_status', //薪酬状态
	],
});

watch(
	() => props.orderNo,
	(val) => {
		refresh();
	}
);

const { columns, cellBtns, btn, searchConfig } = toRefs(state);

const request = async (params) => {
	try {
		params['orderId'] = props.orderNo;
		const res = await getpeoBillListOrder(params);
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
const refresh = () => {
	proTableRef.value.refresh();
};

const doActionSuccess = () => {
	emits('onActionUpdate');
	refresh();
};

// 字典获取
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			// 列表赋值
			state.columns.map((item) => {
				switch (item.dataIndex) {
					case 'status':
						item.valueEnum = res['salary_status']; // 薪酬状态
						break;
					case 'formType':
						item.valueEnum = res['form_type']; // 表单类型
						break;
				}
				return item;
			});
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

const onCellClick = async (prop, item) => {
	if (prop === 'detail') {
		// console.log('详情');
		router.push({
			name: 'oreder-manage-payservice-bill-detail',
			params: {
				id: item.salaryFormId,
			},
		});
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
<style lang="scss" scoped>
.module-download {
	a {
		text-decoration: none;
		color: var(--el-button-text-color);
	}
}
</style>
