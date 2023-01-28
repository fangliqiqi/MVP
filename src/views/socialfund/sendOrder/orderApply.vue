<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn"
			:searchConfig="state.searchConfig">
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
								<a href="/template/socialfund/社保、公积金批量派增模板.xlsx" download> 批量派增模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/socialfund/派单申请批量派减模板.xls" download> 批量派减模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>

			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!--批量派增弹框-->
		<batch-import-dialog title="批量派增" ref="batchDispatchAddRef" :type="1" :header="DISPATCH_BATCH_ADD_HEADER"
			url="/yifu-social/method/tdispatchinfo/importListAdd" @ok="refreshList" batchName="socialfund-batch-dispath-add"
			:errorHeader="STAFF_IMPORT_ERROR_HEADER" :errorData="batchErrorData" customError customErrorContent download>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量导入失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!--批量派减弹框-->
		<batch-import-dialog title="批量派减" ref="batchDispatchReduceRef" :type="1" :header="DISPATCH_BATH_REDUCE_HEADER"
			url="/yifu-social/method/tdispatchinfo/importListReduce" @ok="refreshList"
			batchName="socialfund-batch-dispath-reduce" :errorHeader="STAFF_IMPORT_ERROR_HEADER" :errorData="batchErrorData"
			customError customErrorContent download>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量导入失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
	</div>
</template>

<script setup name="派单申请">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { getOrderApplyList, removeOrderInfo } from '/@/api/socialfund/order';
import { idToArea } from '/@/utils/city';
import { getDictByItemTypes } from '/@/utils/utils';
import { STAFF_IMPORT_ERROR_HEADER, DISPATCH_BATH_REDUCE_HEADER, DISPATCH_BATCH_ADD_HEADER } from '/@/utils/header';
import { onRefresh, offRefresh } from '/@/utils/events';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import BatchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { getHuConfigList } from '/@/api/permission/socialHandlePermission';

const proTableRef = ref(null);
const batchDispatchAddRef = ref(null); // 批量派增
const batchDispatchReduceRef = ref(null); // 批量派减
const router = useRouter();
const route = useRoute();

const { proxy } = getCurrentInstance();
const refreshList = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.onSearch();
};

/**
 * 错误信息处理
 */
const batchErrorData = (prop, errorData) => {
	let data = null;
	if (prop === 'socialfund-batch-dispath-add' || prop === 'socialfund-batch-dispath-reduce') {
		// 批量派增、批量派减
		data = errorData
			.map((item) => {
				const isError = item.color === 'red' ? '是' : '否';
				return {
					line: item.lineNum,
					isError,
					error: item.message,
				};
			})
			.sort((a, b) => Number(a.line) - Number(b.line));
	}
	return data;
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'detail':
			// 详情
			router.push({ name: 'socialfund-order-apply-detail', params: { id: item.id } });
			break;
		case 'remove':
			// 删除
			deleteCell(item);
			break;
	}
};

/**
 * 删除单个派单信息
 */
const deleteCell = (item) => {
	const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，派单信息将从系统消失，请谨慎操作！</span></p>`;

	ElMessageBox.confirm(text, {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		dangerouslyUseHTMLString: true,
	})
		.then(async () => {
			try {
				const res = await removeOrderInfo(item.id);
				if (res && res.code === 200) {
					ElMessage.success('派单信息删除成功');
					refreshList();
				} else {
					ElMessage.error(res.msg || '派单信息删除失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				ElMessage.error((e && e.msg) || '派单信息删除失败');
			}
		})
		.catch(() => { });
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
		option: {
			extBtn: 'extBtns',
		},
	},
	columns: [
		{
			dataIndex: 'type',
			title: '派单类型',
			hideInSearch: true,
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
		// {
		// 	dataIndex: 'socialHouseholdName',
		// 	title: '社保户',
		// 	minWidth: 180,
		// 	tooltip: true,
		// },
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
			title: '派单状态',
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
			hideInSearch: true,
			tooltip: true,
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
			label: '批量派增',
			onClick: () => {
				if (batchDispatchAddRef.value) batchDispatchAddRef.value.openDialog();
			},
			permission: ['demo_tdispatchinfo-batch-import'],
			icon: 'icon-ic_edit_export',
		},
		{
			label: '批量派减',
			onClick: () => {
				if (batchDispatchReduceRef.value) batchDispatchReduceRef.value.openDialog();
			},
			type: 'default',
			permission: ['demo_tdispatchinfo-batch-reduce'],
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: ['demo_tdispatchinfo_get'],
		},
		{
			text: '删除',
			prop: 'remove', // 唯一标识
			permission: ['demo_tdispatchinfo_del'],
			isGray: (item) => {
				// 审核不通过，或审核通过但是全部办理失败的允许删除
				/**
				 * 1: "待审核"
				 * 2: "审核通过"
				 * 3: "审核不通过"
				 *  4: "已办结"
				 *
				 * socialHandleStatus，fundHandleStatus
				 **/
				if (item.status == 3) {
					return false;
				}

				if (item.status == 4) {
					// 已办结的情况下
					let target = true;
					if (item.socialHouseholdName) {
						// 存在社保
						target &= item.socialHandleStatus == 2;
					}
					if (item.providentHouseholdName) {
						target &= item.fundHandleStatus == 2;
					}

					return !target;
				}
				return true;
			},
		},
	],
	dictKeys: ['emp_natrue', 'send_order_type', 'social-conduct-status', 'fund-conduct-status', 'dispatch-audit-status'],
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
		const res = await getOrderApplyList(params);
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
.module-download {
	a {
		text-decoration: none;
		color: var(--el-button-text-color);
	}
}
</style>
