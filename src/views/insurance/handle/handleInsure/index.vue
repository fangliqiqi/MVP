<template>
	<div class="archives-online-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="columns"
			:request="request"
			:btn="btn"
			:multi="true"
			:searchConfig="searchConfig"
			@selectionChange="selectionChange"
			@onReset="onReset"
			@onLoading="
				(loading) => {
					tabChangeing = loading;
				}
			"
		>
			<template v-slot:tabChange>
				<el-tabs type="card" class="card" @tab-change="tabChange" v-model="downSizeState">
					<el-tab-pane label="待投保" name="1" :disabled="tabChangeing"> </el-tab-pane>
					<el-tab-pane label="投保中" name="2" :disabled="tabChangeing"> </el-tab-pane>
					<el-tab-pane label="已投保" name="3" :disabled="tabChangeing"> </el-tab-pane>
				</el-tabs>
			</template>
			<template v-slot:BeginEndTime="item">
				{{ formatRangeDateAndDiff(item.policyStart, item.policyEnd) }}
				<span v-if="item.buyMonth" style="color: red">{{ `${item.buyMonth}个月` }}</span>
			</template>
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
								<a href="/template/insurance/商险登记保单保费模板.xlsx" download>登记保单保费模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/insurance/商险批量办理模板.xlsx" download>商险批量办理模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/insurance/商险批量变更模板.xlsx" download>商险批量变更模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/insurance/商险登记发票号模板.xlsx" download>登记发票号模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:ProjectSelect>
				<project-select v-model="params.deptNo" clearable style="width: 100%" />
			</template>
			<template v-slot:CompanySelect>
				<company-select v-model="params.insuranceCompanyName" style="width: 100%" />
			</template>

			<template v-slot:buyStandard>
				<div class="buy-standard-range" v-if="!forceUpdateInput">
					<el-input
						ref="buyStandardMinRef"
						v-model="params.buyStandardMin"
						placeholder="最低标准"
						class="buy-standard-range--left"
						clearable
						:formatter="(value) => formatterToNumberMin(value)"
					></el-input>
					<span class="buy-standard-range--middle">-</span>
					<el-input
						ref="buyStandardMaxRef"
						v-model="params.buyStandardMax"
						placeholder="最高标准"
						class="buy-standard-range--right"
						clearable
						:formatter="(value) => formatterToNumberMax(value)"
					></el-input>
				</div>
			</template>

			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!--新增校验弹框-->
		<check-info-vue ref="checkInfoDialog" @ok="refreshList"></check-info-vue>
		<down-shift-dialog ref="downshiftDialog" @ok="refreshList"></down-shift-dialog>

		<!--登记保单保费弹框-->
		<batch-import-dialog
			title="登记保单保费"
			ref="registeredPolic"
			:header="INSURE_REG_HEADER_EXPORT"
			:upload="registeredPolicy"
			@ok="refreshList"
			:type="1"
			customError
			:errorHeader="customErrorHeader(INSURE_REG_HEADER_EXPORT)"
			download
			:dateFormatKeys="DATE_FORMAT_KEY"
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">登记保单保费失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!-- 登记发票号 -- 2022-12-8 zhangrun -->
		<batch-import-dialog
			title="登记发票号"
			ref="registeredInvoice"
			:header="INSURE_INVOICE_HEADER_EXPORT"
			:upload="registeredInvoiceNo"
			@ok="refreshList"
			:type="1"
			customError
			:errorHeader="customErrorHeader(INSURE_INVOICE_HEADER_EXPORT)"
			download
			:dateFormatKeys="DATE_FORMAT_KEY"
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">登记发票号失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!-- 参保信息变更导入弹窗  2022-12-8---zhangrun -->
		<batch-import-dialog
			title="参保信息变更"
			ref="informationChange"
			:header="INSURE_INFORMATION_CHANGE_HEADER_EXPORT"
			:upload="insInformationChange"
			@ok="refreshList"
			:type="1"
			customError
			:errorHeader="customErrorHeader(INSURE_INFORMATION_CHANGE_HEADER_EXPORT)"
			download
			:dateFormatKeys="DATE_FORMAT_KEY"
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">参保信息变更失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!-- 参保信息变更弹窗  2022-12-8---zhangrun -->
		<change-dialog ref="changeDialog" @ok="refreshList" />

		<!--批量办理-->
		<batch-import-dialog
			title="批量办理"
			ref="mulityInsure"
			:header="INSURE_MULITY_HEADER"
			:upload="handleMulityInsure"
			@ok="refreshList"
			:type="1"
			customError
			:errorHeader="customErrorHeader(INSURE_MULITY_HEADER)"
			download
			:dateFormatKeys="DATE_FORMAT_KEY"
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量办理失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!-- 保单详情 -->
		<insure-detail-dialog ref="insureDetailRef" />

		<!--办理成功报错弹框-->
		<batch-import-dialog
			title="办理成功"
			ref="batchDeleteDialog"
			:type="1"
			@ok="refreshList"
			errName="办理成功"
			batchName="staff-batch-delete"
			:errorHeader="HANDLE_BACK_INSURANCE_HEADER"
			:errorData="batchErrorData"
			customError
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">办理成功失败！</div>
					<!--反馈信息-->
					<span>已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!-- 退回错误弹窗 -->
		<batch-import-dialog
			title="退回"
			ref="batchBackDialog"
			:type="1"
			@ok="refreshList"
			errName="投保退回"
			batchName="staff-batch-back"
			:errorHeader="HANDLE_BACK_INSURANCE_HEADER"
			:errorData="batchErrorData"
			customError
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">退回失败！</div>
					<!--反馈信息-->
					<span>已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
		<!-- 退回弹窗 -->
		<down-shift-dialog ref="downShiftDialog" title="退回" :required="true" :type="1" @errorBack="openBatchBack" @sucess="sucessBack" />

		<!-- 投保成功弹窗 -->
		<down-shift-dialog
			ref="insureSucessDialog"
			:required="false"
			title="投保成功"
			:type="2"
			@errorBack="openBatchInsureSucess"
			@sucess="sucessBackInsureSucess"
		/>
	</div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue';
import {
	getInsuranceHandleListPage,
	registeredPolicyPremium,
	getInsuranceExportList,
	insuranceHandleImport,
	registeredInvoiceNoImport,
	updateInsuranceInsured,
} from '/@/api/insurance/handle.js';
import { getDictByItemTypes } from '/@/utils/utils';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import checkInfoVue from './component/checkInfo.vue';
import { ElMessageBox, ElLoading } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import BatchImportDialog from '/@/components/BatchImportDialog/index.vue';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import { useRouter } from 'vue-router';
import ProjectSelect from '../../component/ProjectSelect.vue';
import CompanySelect from '../../component/InsureCompanySelect.vue';
import {
	INSURE_REG_HEADER_EXPORT,
	STAFF_BATCH_DEL_ERROR_HEADER,
	HANDLE_INSURE_HEADER,
	HANDLE_BACK_INSURANCE_HEADER,
	HANDLE_REPLACE_INSURE_HEADER,
	DATE_FORMAT_KEY,
	INSURE_MULITY_HEADER,
	INSURE_INVOICE_HEADER_EXPORT,
	INSURE_INFORMATION_CHANGE_HEADER_EXPORT,
} from '/@/utils/header.js';
import moment from 'moment';
import insureDetailDialog from '/@/views/insurance/component/insureDetailDialog.vue';
import { settleType, buyHandleStatus, buyType } from '../../component/dict.js';
import { exportMoreSheet } from '/@/utils/excel';
import { formatRangeDateAndDiff } from '/@/utils/formatTime.js';
import downShiftDialog from '../../component/downshiftDialog.vue';
import ChangeDialog from './component/ChangeDialog.vue';

export default {
	name: '投保办理',
	components: {
		ProTable,
		ProButtons,
		ArrowDown,
		checkInfoVue,
		BatchImportDialog,
		ExportExcelDialog,
		insureDetailDialog,
		ProjectSelect,
		CompanySelect,
		downShiftDialog,
		ChangeDialog,
	},
	setup() {
		const router = useRouter();
		const { appContext } = getCurrentInstance();

		const forceUpdateInput = ref(false);

		const message = appContext.config.globalProperties.$message;

		const proTableRef = ref(null);
		const checkInfoDialog = ref(null);
		const downshiftDialog = ref(null);
		const batchImportDialog = ref(null);
		const batchUpdateDialog = ref(null);
		const exportExcelRef = ref(null);
		const batchDownshiftDialog = ref(null);
		const batchDeleteDialog = ref(null);
		const registeredPolic = ref(null);
		const batchBackDialog = ref(null);
		const downShiftDialog = ref(null);
		const insureSucessDialog = ref(null);
		const mulityInsure = ref(null);
		// 登记发票号 -- 2022-12-8 zhangrun
		const registeredInvoice = ref(null);
		const informationChange = ref(null);
		const changeDialog = ref(null);

		const handleAddClick = () => {
			if (checkInfoDialog.value) {
				checkInfoDialog.value.openDialog();
			}
		};
		const formatAddress = (province, city) => {
			if (province && city) {
				return `${province}/${city}`;
			}

			if (province) {
				return `${province}`;
			}

			if (city) {
				return `${city}`;
			}

			return '';
		};
		// 详情
		const insureDetailRef = ref(null);
		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};

		/**登记保单保费 */
		const batchImport = () => {
			if (registeredPolic.value) registeredPolic.value.openDialog();
		};

		// 登记发票号弹窗 -- 2022-12-8 zhangrun
		const invoiceImport = () => {
			registeredInvoice.value?.openDialog();
		};

		// 登记发票号 -- 2022-12-8 zhangrun
		const registeredInvoiceNo = (_, data) => {
			return registeredInvoiceNoImport(data);
		};

		// 参保信息变更弹窗 -- 2022-12-8 zhangrun
		const informationChangeImport = () => {
			informationChange.value?.openDialog();
		};

		// 参保信息变更 -- 2022-12-8 zhangrun
		const insInformationChange = (_, data) => {
			return updateInsuranceInsured(data);
		};

		/**登记保单保费 */
		const registeredPolicy = (_, data) => {
			return registeredPolicyPremium(data);
		};

		//批量办理
		const handleMulityInsure = (_, data) => {
			return insuranceHandleImport(data);
		};
		/**导出办理 */
		const handleInsureExport = () => {
			const text = `<p style="font-size:16px;font-weight:600">办理成功<br/>
				<span style="color:red;font-size:14px;font-weight:400">确定这些记录导出办理吗？</span></p>`;
			ElMessageBox.confirm(text, {
				type: 'warning',
				dangerouslyUseHTMLString: true,
			})
				.then(async () => {
					try {
						const res = await getInsuranceExportList(updateSearchParams(1));
						if (res && res.code === 200) {
							downloadExcel(res);
							refreshList();
						} else {
							message.error(res.msg || '操作失败');
							refreshList();
						}
					} catch (e) {
						console.log('eeee', e);
						message.error(e.msg || '操作失败');
					}
				})
				.catch(() => {});
		};

		// 投保中导出
		const handleInsureExport2 = () => {
			// 普通下载，需要更换这个接口文件
			state.btn.find((item) => item.label == '导出').loading = true;
			getInsuranceExportList(updateSearchParams(2))
				.then((res) => {
					if (res && res.code === 200) {
						downloadExcel(res, `商险投保导出投保中人员名册${moment().format('YYYYMMDDHHmmss')}`);
					} else {
						message.error(res.msg || '操作失败');
					}
				})
				.finally(() => {
					state.btn.find((item) => item.label == '导出').loading = false;
				});
		};

		// 已投保
		const handleInsureExport3 = () => {
			// 普通下载，需要更换这个接口文件
			state.btn.find((item) => item.label == '导出').loading = true;
			getInsuranceExportList(updateSearchParams(3))
				.then((res) => {
					if (res && res.code === 200) {
						downloadExcel(res, `商险投保导出已投保人员名册${moment().format('YYYYMMDDHHmmss')}`);
					} else {
						message.error(res.msg || '操作失败');
					}
				})
				.finally(() => {
					state.btn.find((item) => item.label == '导出').loading = false;
				});
		};

		const updateSearchParams = (buyHandleStatus) => {
			let tParams = null;
			if (state.selectionChangeList.length > 0) {
				const ids = state.selectionChangeList.map((item) => item.id);
				tParams = {
					idList: ids,
				};
			} else {
				tParams = Object.assign(proTableRef.value.getParams(), state.params);
				delete tParams.size;
				delete tParams.current;
			}

			return { ...tParams, buyHandleStatus };
		};

		// 下载导出数据
		const downloadExcel = (res, filename) => {
			const exportData =
				res.data &&
				res.data.map((item) => {
					item['insuranceAddress'] = formatAddress(item.insuranceProvinceName, item.insuranceCityName); //商险购买地
					item['insuranceHandleAddress'] = formatAddress(item.insuranceHandleProvinceName, item.insuranceHandleCityName); //商险办理地
					item['settleType'] = settleType[item.settleType];
					item['buyType'] = buyType[item.buyType];
					return item;
				});
			/**替换的数据  buytype用的中文名替换改字典配置时需要同步修改 */
			let _replace_data = exportData.filter((e) => {
				return e['buyType'] === '替换';
			});
			/**新增和批增的数据 */
			let _add_data = exportData.filter((e) => {
				return e['buyType'] !== '替换';
			});
			if (exportData.length === 0) {
				message.error('导出办理数据为空！');
				return;
			}
			exportMoreSheet(
				[HANDLE_INSURE_HEADER, HANDLE_REPLACE_INSURE_HEADER],
				[_add_data, _replace_data],
				['新增批增', '替换'],
				filename || `商险投保导出办理人员名册${moment().format('YYYYMMDDHHmmss')}`
			);
		};

		//批量办理
		const handleMulity = () => {
			if (mulityInsure.value) mulityInsure.value.openDialog();
		};
		// 办理成功
		const handleSuccessClick = () => {
			if (!state.selectionChangeList || state.selectionChangeList.length === 0) {
				message.error('请勾选需要操作的记录');
				return;
			}
			insureSucessDialog.value.openDialog(state.selectionChangeList);
		};
		const openBatchBack = (data) => {
			batchBackDialog.value.openErrorDialog(data);
		};

		const openBatchInsureSucess = (data) => {
			batchDeleteDialog.value.openErrorDialog(data);
		};
		// let tableLoading = null;
		const sucessBack = () => {
			// tableLoading.close();
			refreshList();
		};
		const sucessBackInsureSucess = () => {
			// tableLoading.close();
			refreshList();
		};
		const insureLoading = (loading) => {
			tableLoading = ElLoading.service({
				lock: true,
				text: '正在办理中...',
				background: 'rgba(0, 0, 0, 0.7)',
			});
			// console.log('loading', loading);
		};

		// 办理退回
		const handleBackExport = () => {
			if (!state.selectionChangeList || state.selectionChangeList.length === 0) {
				message.error('请勾选需要操作的记录');
				return;
			}
			downShiftDialog.value.openDialog(state.selectionChangeList);
		};

		/**
		 * 待办理 => 导出办理、退回
		 * 办理中 => 办理成功、退回
		 * 已办理 => 登记保单保费
		 */
		const buttonDisableFlag = (val) => {
			switch (state.downSizeState) {
				case '1':
					if (['insure_export', 'insure_back'].includes(val)) {
						return true;
					} else {
						return false;
					}
				case '2':
					if (['insure_success', 'insure_back', 'insure_mulity'].includes(val)) {
						return true;
					} else {
						return false;
					}
				case '3':
					if (['insure_set', 'insure_back'].includes(val)) {
						return true;
					} else {
						return false;
					}
			}
		};

		const state = reactive({
			tabChangeing: false,
			searchConfig: {
				labelWidth: 110,
				option: {
					extBtn: 'extBtns',
				},
			},
			columns: [
				{
					dataIndex: 'buyHandleStatus',
					title: '投保状态',
					width: 110,
					hideInSearch: true,
					valueEnum: buyHandleStatus,
				},
				{
					dataIndex: 'buyType',
					title: '投保类型',
					hideInSearch: true,
					width: 110,
					valueEnum: buyType,
				},
				{
					dataIndex: 'projectName',
					title: '项目',
					hideInSearch: true,
					minWidth: 180,
					ellipsis: true,
				},
				{
					dataIndex: 'projectName',
					title: '所在项目',
					hideInTable: true,
					valueType: 'custom',
					scopedSlots: { customRender: 'ProjectSelect' },
				},

				{
					dataIndex: 'empName',
					title: '姓名',
					hideInSearch: true,
					minWidth: 120,
				},
				{
					dataIndex: 'empName',
					title: '员工姓名',
					hideInTable: true,
				},
				{
					dataIndex: 'empIdcardNo',
					title: '身份证号',
					hideInSearch: true,
					minWidth: 180,
				},
				{
					dataIndex: 'empIdcardNo',
					title: '员工身份证号',
					hideInTable: true,
				},

				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					hideInTable: true,
					valueType: 'custom',
					scopedSlots: { customRender: 'CompanySelect' },
				},
				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					ellipsis: true,
					hideInSearch: true,
					minWidth: 120,
				},

				{
					dataIndex: 'insuranceTypeName',
					title: '险种',
					ellipsis: true,
					minWidth: 120,
				},
				{
					dataIndex: 'createTime',
					title: '保单起止时间',
					hideInSearch: true,
					minWidth: 230,
					valueType: 'custom',
					scopedSlots: { customRender: 'BeginEndTime' },
					ellipsis: true,
				},

				{
					dataIndex: 'buyType',
					title: '派单类型',
					hideInTable: true,
					minWidth: 140,
					valueEnum: buyType,
				},
				{
					dataIndex: 'createName',
					title: '派单人',
					hideInTable: true,
					minWidth: 120,
				},
				{
					dataIndex: 'createTime',
					title: '派单时间',
					minWidth: 180,
					hideInTable: true,
					searchIndex: 'startEndTime',
					startTime: 'startDate',
					endTime: 'endDate',
					format: 'YYYY-MM-DD',
					valueFormat: 'YYYY-MM-DD',
					valueType: 'dateTimeRange',
				},
				{
					dataIndex: 'buyStandard',
					title: '购买标准（元）',
					hideInSearch: true,
					minWidth: 120,
				},
				{
					dataIndex: 'buyStandard',
					title: '购买标准',
					hideInTable: true,
					minWidth: 120,
					valueType: 'custom',
					scopedSlots: { customRender: 'buyStandard' },
				},
				{
					dataIndex: 'createName',
					title: '派单人',
					hideInSearch: true,
					minWidth: 120,
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
					width: 100,
					hideInSearch: true,
					fixed: 'right',
					scopedSlots: {
						customRender: 'option',
					},
				},
			],
			btn: [
				{
					label: '导出',
					onClick: handleInsureExport2,
					permission: ['handle_insure_export'],
					type: 'default',
					icon: 'icon-ic_edit_upload',
					show: () => {
						return state.downSizeState === '2';
					},
				},
				{
					label: '导出',
					onClick: handleInsureExport3,
					permission: ['handle_insure_export'],
					type: 'default',
					icon: 'icon-ic_edit_upload',
					show: () => {
						return state.downSizeState === '3';
					},
				},

				{
					label: '批量办理',
					type: 'default',
					icon: 'icon-ic_edit_upload',
					onClick: handleMulity,
					permission: ['handle_insure_batch'],
					show: () => {
						return buttonDisableFlag('insure_mulity');
					},
				},
				{
					label: '导出办理',
					onClick: handleInsureExport,
					permission: ['handle_insure_export'],
					type: 'default',
					icon: 'icon-ic_edit_upload',
					show: () => {
						return buttonDisableFlag('insure_export');
					},
				},
				{
					label: '登记保单保费',
					type: 'default',
					onClick: batchImport,
					permission: ['handle_insure_cost'],
					icon: 'icon-ic_edit_refresh',
					show: () => {
						return buttonDisableFlag('insure_set');
					},
				},
				// 2022-12-8 zhangrun
				{
					label: '登记发票号',
					type: 'default',
					onClick: invoiceImport,
					permission: ['handle_insure_invoice'],
					icon: 'icon-ic_edit_refresh',
					show: () => {
						return buttonDisableFlag('insure_set');
					},
				},
				// 2022-12-8 zhangrun
				{
					label: '参保信息变更',
					type: 'default',
					onClick: informationChangeImport,
					permission: ['handle_insured'],
					icon: 'icon-ic_edit_refresh',
					show: () => {
						return buttonDisableFlag('insure_set');
					},
				},
				{
					label: '投保成功',
					type: 'default',
					onClick: handleSuccessClick,
					permission: ['handle_insure_back'],
					icon: 'icon-ic_edit_refresh',
					show: () => {
						return buttonDisableFlag('insure_success');
					},
					disabled: () => {
						return state.selectionChangeList.length === 0;
					},
				},
				{
					label: '退回',
					type: 'danger',
					onClick: handleBackExport,
					icon: 'icon-ic_edit_export',
					show: () => {
						return buttonDisableFlag('insure_back');
					},
					disabled: () => {
						return state.selectionChangeList.length === 0;
					},
				},
			],
			cellBtns: [
				{
					text: '查看',
					prop: 'detail', // 唯一标识
				},
				{
					text: '变更',
					prop: 'change',
					permission: ['handle_insured_by_id'],
					isHide: () => !buttonDisableFlag('insure_set'),
				},
			],
			DICTS: {},
			dictKeys: [
				'emp_natrue',
				'emp_married',
				'emp_national',
				'emp_political',
				'emp_registype',
				'education',
				'EMP_SOURCE',
				'social_ecurity_state',
				'commercial_satte',
				'personnel_state',
				'fund_status',
			],
			params: {
				deptNo: '',
				insuranceCompanyName: '',
				buyStandardMin: null,
				buyStandardMax: null,
			},
			areaProps: {
				label: 'areaName',
				isLeaf: 'isLeaf',
				children: 'children',
			},
			selectionChangeList: [], // 列表多选选中的内容
			downSizeState: '1',
		});

		const onReset = () => {
			state.params = {};
		};

		const selectionChange = (selection) => {
			state.selectionChangeList = selection;
		};

		const request = async (params) => {
			try {
				const p = Object.assign({}, params, state.params, { buyHandleStatus: state.downSizeState });
				delete p.fileAddress;

				const res = await getInsuranceHandleListPage(
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

		const tabChange = (value) => {
			refreshList();
		};

		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'detail':
					insureDetailRef.value && insureDetailRef.value.openDialog(item);
					break;
				case 'change':
					changeDialog.value?.openDialog(item);
					break;
			}
		};

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
							case 'fileSource':
								target.valueEnum = res['EMP_SOURCE']; // 档案来源
								break;

							case 'socialStatus':
								target.valueEnum = res['social_ecurity_state']; // 社保
								break;

							case 'insuranceStatus':
								target.valueEnum = res['commercial_satte']; // 商险
								break;

							case 'fundStatus':
								target.valueEnum = res['fund_status']; // 公积金
								break;
							case 'contractStatus':
								target.valueEnum = res['personnel_state']; // 合同
								break;
						}
						return target;
					});
				}
			} catch (e) {
				console.log('get exception:', e);
			}
		};

		onMounted(() => {
			loadDicts();
		});

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

		const batchErrorData = (prop, errorData) => {
			let data = null;
			switch (prop) {
				case 'staff-batch-delete':
					// 办理成功的错误返回
					console.log('dataaa', errorData, buyHandleStatus);
					data = errorData.map((item) => {
						item['buyHandleStatus'] = buyHandleStatus[item.buyHandleStatus];
						item['buyType'] = buyType[item.buyType];
						item['policeStartEnd'] = `${item.policyStart}-${item.policyEnd}`;
						return item;
					});
					break;
				case 'staff-batch-back':
					// 办理成功的错误返回
					data = errorData.map((item) => {
						item['buyHandleStatus'] = buyHandleStatus[item.buyHandleStatus];
						item['buyType'] = buyType[item.buyType];
						item['policeStartEnd'] = `${item.policyStart}-${item.policyEnd}`;
						return item;
					});
					break;
			}
			return data;
		};

		const buyStandardMinRef = ref();
		const buyStandardMaxRef = ref();

		const formatterToNumber = (value, _ref) => {
			const format = `${value}`.replace(/\D|[^\d]/g, '');
			// 太变态了，forceUpdate 为什么不行
			setTimeout(() => {
				// 数据更新完成，销毁输入框
				if (value !== format) {
					forceUpdateInput.value = true;
					setTimeout(() => {
						// 销毁完成，恢复输入框
						forceUpdateInput.value = false;
						setTimeout(() => {
							// 输入框恢复后才能获取到实例
							unref(_ref).focus();
						}, 0);
					}, 0);
				}
			}, 0);

			return format;
		};

		const formatterToNumberMin = (value) => {
			return formatterToNumber(value, buyStandardMinRef);
		};
		const formatterToNumberMax = (value) => {
			return formatterToNumber(value, buyStandardMaxRef);
		};

		return {
			...toRefs(state),
			formatterToNumberMin,
			formatterToNumberMax,
			buyStandardMinRef,
			buyStandardMaxRef,
			forceUpdateInput,
			request,
			onCellClick,
			proTableRef,
			insureDetailRef,
			checkInfoDialog,
			downshiftDialog,
			batchImportDialog,
			batchDownshiftDialog,
			refreshList,
			batchUpdateDialog,
			selectionChange,
			exportExcelRef,
			onReset,
			batchDeleteDialog,
			INSURE_REG_HEADER_EXPORT,
			STAFF_BATCH_DEL_ERROR_HEADER,
			DATE_FORMAT_KEY,
			customErrorHeader,
			HANDLE_BACK_INSURANCE_HEADER,
			tabChange,
			registeredPolic,
			registeredPolicy,
			batchErrorData,
			formatRangeDateAndDiff,
			batchBackDialog,
			ProjectSelect,
			CompanySelect,
			downShiftDialog,
			openBatchBack,
			INSURE_MULITY_HEADER,
			insureSucessDialog,
			openBatchInsureSucess,
			sucessBackInsureSucess,
			// insureLoading,
			sucessBack,
			handleMulityInsure,
			mulityInsure,
			INSURE_INVOICE_HEADER_EXPORT,
			INSURE_INFORMATION_CHANGE_HEADER_EXPORT,
			registeredInvoiceNo,
			registeredInvoice,
			informationChange,
			insInformationChange,
			changeDialog,
		};
	},
};
</script>

<style lang="scss" scoped src="./css/index.scss"></style>
