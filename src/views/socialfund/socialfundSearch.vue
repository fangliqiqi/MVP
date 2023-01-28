<template>
	<div class="system-dict-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :multi="true"
			:searchConfig="searchConfig" @selectionChange="selectionChange">
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
								<a href="/template/socialfund/批量调基模板.xlsx" download> 批量调基模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!--批量导出  -->
		<export-excel-dialog ref="exportExcelRef" :heads="SOCIAIFUND_EXPORT_HEARED" :title="'社保公积金查询批量导出'"
			useCode="tsocialfundinfo-export" />
		<!-- 批量调基 -->
		<batch-import-dialog ref="batchImportDialogRef" :header="SOCIAIFUND_BATCH_BASE" :errName="'批量调基'" :title="'批量调基'"
			:errorHeader="ERROR_HEADER" :errorData="batchErrorData" :url="'/yifu-social/method/tsocialfundinfo/importListAdd'"
			:rules="state.batchRules" :ext-params="state.batchExtParams" customError :download="true" @ok="refresh">
		</batch-import-dialog>
	</div>
</template>

<script setup name="社保公积金查询">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessageBox,ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { getDictByItemTypes } from '/@/utils/utils';
import { getHuConfigList } from '/@/api/permission/socialHandlePermission';
import { SOCIAIFUND_EXPORT_HEARED, SOCIAIFUND_BATCH_BASE, ERROR_HEADER } from '/@/utils/header';
import { getsocialfundList, socialfundExport, socialfundBatchBase } from '/@/api/socialfund/socialfundSearch';

const proTableRef = ref(null);
const router = useRouter();
const exportExcelRef = ref(null);
const batchImportDialogRef = ref(null);

// 批量调基
const handleBatchDispatch = () => {
	if (batchImportDialogRef.value) batchImportDialogRef.value.openDialog();
};

// 批量导出
const handleBatchExport = () => {
	let searchParams = Object.assign({}, proTableRef.value.getParams());
	delete searchParams.size;
	delete searchParams.current;
	exportExcelRef.value &&
		exportExcelRef.value.openDialog((params, exportFile) => {
			const data = {
				...searchParams,
				exportFields: params.map((item) => item.dataIndex),
			};
			const idList = state.selectionChangeList.map((t) => t.id);
			if (idList && idList.length) {
				data.idList = idList;
			}
			socialfundExport(data).then((res) => {
				if (res.code && res.code !== 200) {
					ElMessageBox.error(res.msg);
				}
				exportFile(true);
			});
		});
};

const batchErrorData = (prop, errorData) => {
	return errorData.map((item) => {
		const errors = item.message;
		return {
			line: item.lineNum,
			isError: errors ? '是' : '否',
			error: errors,
		};
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
	batchExtParams: [
		{
			dataIndex: 'doMonth',
			title: '月份',
			position: 'header',
			type: 'month',
			config: {
				placeholder: '请选择月份',
				format: 'YYYYMM',
				valueFormat: 'YYYYMM',
				clearable: true,
				disabledDate: (current) => {
					return current && current.valueOf() > Date.now();
				},
			},
		},
	],
	batchRules: {
		doMonth: [{ required: true, message: '请选择月份', trigger: 'change' }],
	},
	searchConfig: {
		labelWidth: 110,
		option: {
			extBtn: 'extBtns',
		},
	},
	columns: [
		{
			dataIndex: 'empName',
			title: '员工姓名',
			minWidth: 180,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			minWidth: 200,
		},
		{
			dataIndex: 'empType',
			title: '员工类型',
			minWidth: 140,
		},
		{
			dataIndex: 'unitName',
			title: '单位名称',
			minWidth: 220,
			tooltip: true,
			hideInSearch: true,
		},
		{
			dataIndex: 'settleDomainName',
			title: '项目名称',
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'settleDomainCode',
			title: '项目编码',
			minWidth: 200,
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
			dataIndex: 'archivesLocation',
			title: '社保缴纳地',
			minWidth: 200,
			valueType: 'addRess',
			tooltip: true,
			type:0,
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
			dataIndex: 'archivesLocation',
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
			dataIndex: 'socialStatus',
			title: '社保状态',
			minWidth: 180,
		},
		{
			dataIndex: 'fundStatus',
			title: '公积金状态',
			minWidth: 180,
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			minWidth: 120,
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
			onClick: handleBatchExport,
			permission: ['tsocialfundinfo-export'],
			icon: 'icon-ic_edit_export',
		},
		{
			label: '批量调基',
			onClick: handleBatchDispatch,
			permission: ['tsocialfundinfo-batch-import'],
			type: 'normal',
			icon: 'icon-ic_edit_add',
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: ['tsocialfundinfo_get'], // 权限标识
		},
	],
	dictKeys: [
		'emp_natrue', //员工类型
		'social_handle_status', //社保办理状态
		'fund_handle_status', //公积金办理状态
	],
	selectionChangeList: [],
});

const { columns, cellBtns, btn, searchConfig } = toRefs(state);

const selectionChange = (selection) => {
	state.selectionChangeList = selection;
};



const request = async (params) => {
	try {
		const res = await getsocialfundList(params);
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

// 页面刷新
const refresh = () => {
	proTableRef.value.refresh();
};

const onCellClick = async (prop, item) => {
	if (prop === 'detail') {
		console.log('详情');
		router.push({
			name: 'social-fund-detail',
			params: {
				id: item.id,
			},
		});
	}
};

// 字典获取
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		// console.log('字典获取', res);
		if (res) {
			// 列表赋值
			state.columns.map((item) => {
				switch (item.dataIndex) {
					case 'empType': //员工类型
						item.valueEnum = res['emp_natrue'];
						break;
					case 'socialStatus': //社保状态
						item.valueEnum = res['social_handle_status'];
						break;
					case 'fundStatus': //公积金状态
						item.valueEnum = res['fund_handle_status'];
						break;
				}
				return item;
			});
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

onMounted(async () => {
	loadDicts();
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
