<template>
	<div class="custserve-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :searchConfig="searchConfig" @onReset="onReset">
			<template #extBtns>
				<el-dropdown popper-class="module-download" style="margin-left: 6px">
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
								<a href="/template/insurance/商险新增模板.xlsx" download>新增投保模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/insurance/商险批增模板.xlsx" download>批增模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/insurance/商险替换模板.xlsx" download>替换模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>

			<template v-slot:BeginEndTime="item">
				{{ formatRangeDateAndDiff(item.policyStart, item.policyEnd) }}
				<span v-if="item.buyMonth" style="color: red">{{ `${item.buyMonth}个月` }}</span>
			</template>

			<template v-slot:ProjectSelect>
				<project-select v-model="params.deptNo" style="width: 100%" />
			</template>

			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!-- 保单详情 -->
		<insure-detail-dialog ref="insureDetailRef" />
		<!-- 编辑 -->
		<insure-edit-dialog ref="insureEditRef" @ok="doSearchList" />
		<!-- 新增投保 -->
		<batch-import-dialog
			title="新增投保"
			ref="addInsureRef"
			:header="INSURE_ADD_HEADER"
			:upload="addInsuranceByFile"
			@ok="refreshList"
			:type="1"
			customError
			:errorHeader="customErrorHeader(INSURE_ADD_HEADER)"
			download
			:dateFormatKeys="DATE_FORMAT_KEY"
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">新增投保失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
		<!-- 批增投保 -->
		<batch-import-dialog
			title="批增投保"
			ref="addBatchInsureRef"
			:header="INSURE_BATCH_HEADER"
			:upload="addBatchInsuranceByFile"
			@ok="refreshList"
			:type="1"
			customError
			:errorHeader="customErrorHeader(INSURE_BATCH_HEADER)"
			download
			:dateFormatKeys="DATE_FORMAT_KEY"
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批增投保失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!-- 替换 -->
		<batch-import-dialog
			title="替换投保"
			ref="insureChangeRef"
			:header="INSURE_CHANGE_HEADER"
			:upload="changeInsuranceByFile"
			@ok="refreshList"
			:type="1"
			customError
			:errorHeader="customErrorHeader(INSURE_CHANGE_HEADER)"
			download
			:dateFormatKeys="DATE_FORMAT_KEY"
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">替换投保失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox } from 'element-plus';
import insureDetailDialog from '../component/insureDetailDialog.vue';
import insureEditDialog from '../component/insureEditDialog.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { INSURE_ADD_HEADER, INSURE_BATCH_HEADER, INSURE_CHANGE_HEADER, INSURE_HEADER_EXPORT, DATE_FORMAT_KEY } from '/@/utils/header.js';
import { formatRangeDateAndDiff } from '/@/utils/formatTime.js';
import { exportExcel } from '/@/utils/xlsx';
import { exportExcelSheet } from '/@/utils/excel';

import { getSettleDomainList } from '/@/api/socialfund/fee';

import moment from 'moment';
import {
	getInsuranceListPage,
	getInsuranceList,
	addInsurance,
	batchInsurance,
	replaceInsurance,
	deleteInsurance,
} from '/@/api/insurance/custserve.js';
import ProjectSelect from '../component/ProjectSelect.vue';
import { settleType, buyHandleStatus, buyHandleStatusList, buyType } from '../component/dict.js';
import { Local } from '/@/utils/storage';
import { getProjectManageList } from '/@/api/projectmanage/index';


export default {
	name: '投保',
	components: {
		ProTable,
		ProButtons,
		insureDetailDialog,
		insureEditDialog,
		ArrowDown,
		batchImportDialog,
		ProjectSelect,
	},
	setup() {
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const proTableRef = ref(null);
		// 新增
		const addInsureRef = ref(null);
		// 批增
		const addBatchInsureRef = ref(null);
		// 详情
		const insureDetailRef = ref(null);
		// 编辑
		const insureEditRef = ref(null);
		// 替换
		const insureChangeRef = ref(null);

		// 新增
		const handleAddClick = () => {
			addInsureRef.value && addInsureRef.value.openDialog();
		};
		// 新增导入
		const addInsuranceByFile = (_, data) => {
			return addInsurance(data);
		};

		// 批增
		const handleBatchImport = () => {
			addBatchInsureRef.value && addBatchInsureRef.value.openDialog();
		};

		// 批增导入
		const addBatchInsuranceByFile = (_, data) => {
			return batchInsurance(data);
		};

		// 替换
		const handleBatchUpdate = () => {
			insureChangeRef.value && insureChangeRef.value.openDialog();
		};

		// 替换导入
		const changeInsuranceByFile = (_, data) => {
			return replaceInsurance(data);
		};

		// 自定义导出头
		const customErrorHeader = (header) => {
			const _header = [];

			Object.keys(header).forEach((dataIndex) => {
				_header.push({ header: header[dataIndex], key: dataIndex, width: 18 });
			});

			_header.push({
				header: '错误原因',
				key: 'errorMessage',
				width: 30,
			});

			return _header;
		};

		// 导出
		const handleBatchExport = () => {
			const p = Object.assign({}, state.params, proTableRef.value.getParams());
			delete p.size;
			delete p.current;
			state.btn.find((item) => item.label == '导出').loading = true;
			getInsuranceList(p)
				.then((res) => {
					exportExcelSheet(
						INSURE_HEADER_EXPORT,
						(res.data || []).map((item) => {
							item.buyHandleStatus = buyHandleStatus[item.buyHandleStatus];
							item.settleType = settleType[item.settleType];
							item.buyType = buyType[item.buyType];
							return item;
						}),
						`商险投保人员名册_${moment().format('YYYYMMDDHHmmss')}`
					);
					message.success('导出成功');
				})
				.finally(() => {
					state.btn.find((item) => item.label == '导出').loading = false;
				});
		};

		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};

		const doSearchList = () => {
			proTableRef.value && proTableRef.value.doSearch();
		};

		// 返回true表示不可用
		const isEditAndDelete = (item) => {
			const userInfo = Local.get('user_info');
			if (userInfo?.id == item.createBy) {
				return item.buyHandleStatus != 4;
			}
			return true;
		};

		const onReset = () => {
			state.params = { deptNo: null, buyHandleStatusList: [1, 2, 4] };
		};

// 获取结算主体列表
const requestZhutiList = async (params) => {
	try {
		const p = Object.assign({}, { deleteFlag: 0 }, params)
		const res = await getProjectManageList(p);
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
}
		const state = reactive({
			params: {
				deptNo: null,
				buyHandleStatusList: [1, 2, 4],
			},

			searchConfig: {
				labelWidth: '90px',
				option: {
					extBtn: 'extBtns',
				},
			},
			columns: [
				{
					dataIndex: 'buyHandleStatus',
					title: '投保状态',
					width: 115,
					valueEnum: buyHandleStatusList,
				},
				{
					dataIndex: 'buyType',
					title: '投保类型',
					width: 110,
					hideInSearch: true,
					valueEnum: buyType,
				},
				{
					dataIndex: 'projectName',
					title: '项目',
					minWidth: 120,
					hideInSearch: true,
					ellipsis: true,
				},
				// {
				// 	dataIndex: 'projectName',
				// 	title: '项目',
				// 	hideInTable: true,
				// 	valueType: 'custom',
				// 	scopedSlots: { customRender: 'ProjectSelect' },
				// },

						{
					dataIndex: 'deptNo',
					title: '项目',
					minWidth: 200,
					valueType: 'PageSelect',
					hideInTable: true,
					request:requestZhutiList,
					pageProps:{
							valueKey:'departNo',
							title:'departName',
							search:'departName',
							parmas:{
							}
					},
					tooltip: true,
				},
				{
					dataIndex: 'empName',
					title: '姓名',
					width: 140,
					tooltip: true,
				},
				{
					dataIndex: 'empIdcardNo',
					title: '身份证号',
					width: 170,
				},

				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					minWidth: 120,
					hideInSearch: true,
					ellipsis: true,
				},
				{
					dataIndex: 'insuranceTypeName',
					title: '险种',
					minWidth: 120,
					hideInSearch: true,
					ellipsis: true,
				},
				{
					dataIndex: 'policyTimeRange',
					title: '保单起止时间',
					minWidth: 230,
					hideInSearch: true,
					valueType: 'custom',
					scopedSlots: { customRender: 'BeginEndTime' },
				},
				{
					dataIndex: 'buyStandard',
					title: '购买标准',
					minWidth: 110,
					hideInSearch: true,
				},
				{
					dataIndex: 'createName',
					title: '派单人',
					minWidth: 110,
					hideInSearch: true,
				},
				{
					dataIndex: 'createTime',
					title: '派单日期',
					width: 100,
					hideInSearch: true,
					dateFormat: 'YYYY-MM-DD',
				},
				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 180,
					hideInSearch: true,
					fixed: 'right',
					scopedSlots: {
						customRender: 'option',
					},
				},
			],
			btn: [
				{
					label: '新增投保',
					onClick: handleAddClick,
					permission: ['insurance_custserve_insure_add'],
					icon: 'icon-ic_edit_add',
				},
				{
					label: '批增',
					onClick: handleBatchImport,
					permission: ['insurance_custserve_insure_batch_add'],
					icon: 'icon-ic_edit_add',
				},
				{
					label: '替换',
					type: 'normal',
					onClick: handleBatchUpdate,
					permission: ['insurance_custserve_insure_update'],
					icon: 'icon-ic_edit_refresh',
				},
				{
					label: '导出',
					type: 'normal',
					onClick: handleBatchExport,
					permission: ['insurance_custserve_insure_export'],
					icon: 'icon-ic_edit_export',
				},
			],
			cellBtns: [
				{
					text: '查看',
					prop: 'detail', // 唯一标识
					permission: ['insurance_custserve_insure_detail'], // 权限标识
				},
				{
					text: '编辑',
					prop: 'edit',
					permission: ['insurance_custserve_insure_edit'], // 权限标识
					tooltip: '当前状态不可编辑',
					isGray: isEditAndDelete,
				},
				{
					text: '删除',
					prop: 'delete', // 唯一标识
					permission: ['insurance_custserve_insure_delete'], // 权限标识
					tooltip: '当前状态不可删除',
					isGray: isEditAndDelete,
				},
			],
		});





		const request = async (params) => {
			const p = Object.assign({}, state.params, params);
			try {
				const res = await getInsuranceListPage(
					{
						size: p.size,
						current: p.current,
						mId: p.mId,
					},
					p
				);
				if (res && res.code == 200 && res.data) {
					return {
						current: res.data.current,
						total: res.data.total,
						data: res.data.records || [],
					};
				}
			} catch (e) {}
			return {
				current: 1,
				total: 0,
				data: [],
			};
		};

		const deleteCell = (item) => {
			const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，投保记录将从系统消失，请谨慎操作！</span></p>`;

			ElMessageBox.confirm(text, {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				dangerouslyUseHTMLString: true,
			})
				.then(async () => {
					try {
						const res = await deleteInsurance(item.id);
						if (res.code === 200) {
							message.success('删除成功');
						} else {
							message.error(res.msg || '删除失败');
						}
					} catch (e) {
						message.error('删除失败');
					} finally {
						doSearchList();
					}
				})
				.catch(() => {});
		};

		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'detail':
					insureDetailRef.value && insureDetailRef.value.openDialog(item);
					break;
				case 'edit': // 编辑操作
					insureEditRef.value && insureEditRef.value.openDialog(item);
					break;
				case 'delete': // 删除操作
					deleteCell(item);
					break;
			}
		};

		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			addInsureRef,
			addBatchInsureRef,
			insureChangeRef,
			refreshList,
			doSearchList,
			insureDetailRef,
			insureEditRef,
			onReset,
			INSURE_ADD_HEADER,
			INSURE_BATCH_HEADER,
			INSURE_CHANGE_HEADER,
			formatRangeDateAndDiff,
			addInsuranceByFile,
			customErrorHeader,
			addBatchInsuranceByFile,
			changeInsuranceByFile,
			DATE_FORMAT_KEY,
		};
	},
};
</script>

<style lang="scss" scoped src="./css/insure.scss"></style>
