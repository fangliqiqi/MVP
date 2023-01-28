<template>
	<div class="archives-online-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="downSizeState === -100 ? columnsRefund : columns"
			:request="request"
			:btn="btn"
			:multi="downSizeState !== -100"
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
					<el-tab-pane label="待减员" name="1" :disabled="tabChangeing"> </el-tab-pane>
					<el-tab-pane label="减员中" name="2" :disabled="tabChangeing"> </el-tab-pane>
					<el-tab-pane label="减员成功" name="4" :disabled="tabChangeing"> </el-tab-pane>
					<el-tab-pane label="退保登记" :name="-100" :disabled="tabChangeing"> </el-tab-pane>
				</el-tabs>
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
								<a href="/template/insurance/商险批量办理模板.xlsx" download>商险批量办理模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/insurance/商险登记退保费用模板.xlsx" download>商险登记退保费用模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:ProjectSelect>
				<project-select v-model="params.deptNo" style="width: 100%" />
			</template>
			<template v-slot:CompanySelect>
				<company-select v-model="params.insuranceCompanyName" style="width: 100%" />
			</template>

			<template v-slot:BeginEndTime="item">
				{{ formatRangeDateAndDiff(item.policyStart, item.policyEnd) }}
				<span v-if="item.buyMonth" style="color: red">{{ `${item.buyMonth}个月` }}</span>
			</template>
			<template v-slot:projectNum="item">
				<a href="#" @click="toSubject(item)">{{ item.projectNum }}</a>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!-- 保单详情 -->
		<insure-detail-dialog ref="insureDetailRef" />

		<!--批量办理-->
		<batch-import-dialog
			title="批量办理"
			ref="handleMulity"
			:header="INSURE_MULITY_HEADER"
			:upload="registeredPolicy"
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

		<!--减员办理成功报错弹框-->
		<batch-import-dialog
			title="减员成功"
			ref="batchDeleteDialog"
			:type="1"
			@ok="refreshList"
			errName="减员成功"
			batchName="staff-batch-delete"
			:errorHeader="HANDLE_REFUND_INSURANCE_HEADER"
			:errorData="batchErrorData"
			customError
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">减员成功失败！</div>
					<!--反馈信息-->
					<span>已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!--减员退回成功报错弹框-->
		<batch-import-dialog
			title="减员退回"
			ref="batchRefundBackDialog"
			:type="1"
			@ok="refreshList"
			errName="减员退回"
			batchName="staff-batch-refund-back"
			:errorHeader="HANDLE_REFUND_INSURANCE_HEADER"
			:errorData="batchErrorData"
			customError
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">减员退回失败！</div>
					<!--反馈信息-->
					<span>已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!-- 退回弹窗 -->
		<down-shift-dialog ref="downShiftDialog" title="退回" :type="3" :required="true" @errorBack="openBatchBack" @sucess="sucessBack" />

		<!-- 投保成功弹窗 -->
		<down-shift-dialog
			ref="insureSucessDialog"
			:required="false"
			title="减员成功"
			:type="4"
			@errorBack="openBatchInsureSucess"
			@sucess="sucessBackInsureSucess"
		/>

		<!--登记退保费用-->
		<batch-import-dialog
			title="登记退保费用"
			ref="handleRefundRef"
			:header="INSURE_REFUND_HEADER"
			:upload="registeredSurrenderPolicy"
			@ok="refreshList"
			:type="1"
			customError
			:errorHeader="customErrorHeader(INSURE_REFUND_HEADER)"
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
	</div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue';
import CompanySelect from '../../component/InsureCompanySelect.vue';
import {
	getInsuranceRefundList,
	getInsuranceRefundHandlingList,
	updateRefundMoney,
	insuranceRefundImport,
	getInsuranceRefundMoneyPageList,
	getInsuranceRefundMoneyList,
} from '/@/api/insurance/handle';
import { getDictByItemTypes } from '/@/utils/utils';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import insureDetailDialog from '/@/views/insurance/component/insureDetailDialog.vue';
import BatchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { settleType, buyType, reduceHandleStatus } from '../../component/dict.js';
import { formatRangeDateAndDiff, diffRangeDate, diffRangeDays } from '/@/utils/formatTime.js';
import moment from 'moment';
import ProjectSelect from '../../component/ProjectSelect.vue';
import downShiftDialog from '../../component/downshiftDialog.vue';
import {
	STAFF_IMPORT_HEADER,
	STAFF_BATCH_UPDATE_HEADER,
	STAFF_EXPORT_HEADER,
	STAFF_DOWNSHIFT_HEADER,
	STAFF_IMPORT_ERROR_HEADER,
	ERROR_HEADER,
	STAFF_BATCH_DEL_ERROR_HEADER,
	HANDLE_REPLACE_INSURE_HEADER,
	HANDLE_REFUND_INSURANCE_HEADER,
	INSURE_EXPORT_REFUND_BACK_HEADER,
	INSURE_REFUND_BACK_HEADER,
	DATE_FORMAT_KEY,
	INSURE_MULITY_HEADER,
	INSURE_REFUND_HEADER,
	INSURE_REFUND_HEADER_EXPORT,
} from '/@/utils/header';
import { exportMoreSheet, exportExcelSheet } from '/@/utils/excel';
export default {
	name: '退保办理',
	components: {
		ProTable,
		ProButtons,
		ArrowDown,
		insureDetailDialog,
		BatchImportDialog,
		ProjectSelect,
		CompanySelect,
		downShiftDialog,
	},
	setup() {
		const router = useRouter();
		// 详情
		const insureDetailRef = ref(null);
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const handleRefundRef = ref(null);
		const proTableRef = ref(null);
		const batchDeleteDialog = ref(null);
		const downShiftDialog = ref(null);
		const insureSucessDialog = ref(null);
		const handleMulity = ref(null);
		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};

		const buttonDisableFlag = (val) => {
			switch (state.downSizeState) {
				case '1':
					if (['downsize_export', 'downsize_back'].includes(val)) {
						return true;
					} else {
						return false;
					}
				case '2':
					if (['downsize_sucess', 'downsize_back', 'downsize_mulity'].includes(val)) {
						return true;
					} else {
						return false;
					}
				case '4':
					if (['downsize_refund'].includes(val)) {
						return true;
					} else {
						return false;
					}
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

		/**导出 */
		const handleDownsizeExport = () => {
			const text = `<p style="font-size:16px;font-weight:600">办理成功<br/>
				<span style="color:red;font-size:14px;font-weight:400">确定这些记录导出办理吗？</span></p>`;
			ElMessageBox.confirm(text, {
				type: 'warning',
				dangerouslyUseHTMLString: true,
			})
				.then(async () => {
					try {
						const res = await getInsuranceRefundHandlingList(updateSearchParams(1));
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

		// 退保登记导出
		const handleDownsizeExport100 = () => {
			const tParams = Object.assign(proTableRef.value.getParams(), state.params);
			delete tParams.size;
			delete tParams.current;

			state.btn.find((item) => item.label == '导出').loading = true;

			getInsuranceRefundMoneyList(tParams)
				.then((res) => {
					if (res && res.code === 200) {
						const exportData =
							res.data &&
							res.data.map((item) => {
								item['buyType'] = buyType[item.buyType];
								return item;
							});

						exportExcelSheet(INSURE_REFUND_HEADER_EXPORT, exportData, `商险减员退保登记记录${moment().format('YYYYMMDDHHmmss')}`);
					} else {
						message.error(res.msg || '操作失败');
					}
				})
				.finally(() => {
					state.btn.find((item) => item.label == '导出').loading = false;
				});
		};

		// 减员中导出
		const handleDownsizeExport2 = () => {
			state.btn.find((item) => item.label == '导出').loading = true;
			getInsuranceRefundHandlingList(updateSearchParams(2))
				.then((res) => {
					if (res && res.code === 200) {
						downloadExcel(res, `商险减员导出减员中人员名册${moment().format('YYYYMMDDHHmmss')}`);
					} else {
						message.error(res.msg || '操作失败');
					}
				})
				.finally(() => {
					state.btn.find((item) => item.label == '导出').loading = false;
				});
		};

		// 减员成功导出
		const handleDownsizeExport4 = () => {
			state.btn.find((item) => item.label == '导出').loading = true;
			getInsuranceRefundHandlingList(updateSearchParams(4))
				.then((res) => {
					if (res && res.code === 200) {
						downloadExcel(res, `商险减员导出减员成功人员名册${moment().format('YYYYMMDDHHmmss')}`);
					} else {
						message.error(res.msg || '操作失败');
					}
				})
				.finally(() => {
					state.btn.find((item) => item.label == '导出').loading = false;
				});
		};

		const updateSearchParams = (reduceHandleStatus) => {
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
			return { ...tParams, reduceHandleStatus };
		};

		// 下载导出数据
		const downloadExcel = (res, filename) => {
			const exportData =
				res.data &&
				res.data.map((item) => {
					item['insuranceAddress'] = formatAddress(item.insuranceProvinceName, item.insuranceCityName); //商险购买地
					item['insuranceHandleAddress'] = formatAddress(item.insuranceHandleProvinceName, item.insuranceHandleCityName); //商险办理地
					//减员办理导出时类型默认为减员
					item['buyType'] = '减员';
					item['settleType'] = settleType[item.settleType];
					return item;
				});
			if (exportData.length === 0) {
				message.error('减员办理数据为空！');
				return;
			}

			exportMoreSheet(
				[HANDLE_REPLACE_INSURE_HEADER],
				[exportData],
				['减员'],
				filename || `商险减员导出办理人员名册${moment().format('YYYYMMDDHHmmss')}`
			);
		};

		const handleRefundImport = () => {
			unref(handleRefundRef)?.openDialog();
		};
		const registeredPolicy = (_, data) => {
			return insuranceRefundImport(data);
		};

		const registeredSurrenderPolicy = (_, data) => {
			return updateRefundMoney(data);
		};

		const openBatchBack = () => {
			batchBackDialog.value.openErrorDialog(res.data);
		};
		const sucessBack = () => {
			refreshList();
		};
		const openBatchInsureSucess = (data) => {
			batchDeleteDialog.value.openErrorDialog(data);
		};
		const sucessBackInsureSucess = () => {
			refreshList();
		};
		// 办理退回
		const handleBackExport = () => {
			if (!state.selectionChangeList || state.selectionChangeList.length === 0) {
				message.error('请勾选需要操作的记录');
				return;
			}
			downShiftDialog.value.openDialog(state.selectionChangeList);
		};

		//批量办理
		const handleMulityDownsizeExport = () => {
			if (handleMulity.value) handleMulity.value.openDialog();
		};
		// 减员成功
		const handleSuccessClick = () => {
			if (!state.selectionChangeList || state.selectionChangeList.length === 0) {
				message.error('请勾选需要操作的记录');
				return;
			}
			insureSucessDialog.value.openDialog(state.selectionChangeList);
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
					dataIndex: 'reduceHandleStatus',
					title: '减员状态',
					minWidth: 160,
					hideInSearch: true,
					valueEnum: reduceHandleStatus,
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
					minWidth: 140,
					valueType: 'custom',
					scopedSlots: { customRender: 'ProjectSelect' },
				},
				{
					dataIndex: 'empName',
					title: '姓名',
					hideInSearch: true,
					minWidth: 200,
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
					hideInSearch: true,
					minWidth: 120,
				},
				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					hideInTable: true,
					valueType: 'custom',
					scopedSlots: { customRender: 'CompanySelect' },
				},

				{
					dataIndex: 'insuranceTypeName',
					title: '险种',
					minWidth: 120,
				},
				{
					dataIndex: 'policyTime',
					title: '保单起止时间',
					hideInSearch: true,
					minWidth: 230,
					valueType: 'custom',
					scopedSlots: { customRender: 'BeginEndTime' },
				},

				{
					dataIndex: 'buyStandard',
					title: '购买标准',
					hideInSearch: true,
					minWidth: 120,
				},
				{
					dataIndex: 'createName',
					title: '派单人',
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
					dataIndex: 'createTime',
					title: '派单日期',
					hideInTable: true,
					searchIndex: 'startEndTime',
					startTime: 'startDate',
					endTime: 'endDate',
					format: 'YYYY-MM-DD',
					valueFormat: 'YYYY-MM-DD',
					valueType: 'dateTimeRange',
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
			columnsRefund: [
				{
					dataIndex: 'buyType',
					title: '投保类型',
					minWidth: 115,
					hideInSearch: true,
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
					minWidth: 100,
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
					minWidth: 170,
				},
				{
					dataIndex: 'empIdcardNo',
					title: '员工身份证号',
					hideInTable: true,
				},

				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					hideInSearch: true,
					minWidth: 130,
				},
				{
					dataIndex: 'insuranceCompanyName',
					title: '保险公司',
					hideInTable: true,
					valueType: 'custom',
					scopedSlots: { customRender: 'CompanySelect' },
				},

				{
					dataIndex: 'insuranceTypeName',
					title: '险种',
					minWidth: 150,
				},
				{
					dataIndex: 'policyTime',
					title: '保单起止时间',
					hideInSearch: true,
					minWidth: 220,
					valueType: 'custom',
					scopedSlots: { customRender: 'BeginEndTime' },
				},
				{
					dataIndex: 'buyStandard',
					title: '购买标准',
					hideInSearch: true,
					minWidth: 100,
				},
				{
					dataIndex: 'refundMoney',
					title: '退费金额（元）',
					minWidth: 130,
					hideInSearch: true,
				},
				{
					dataIndex: 'returnEmpName',
					title: '退至人姓名',
					minWidth: 100,
					hideInSearch: true,
				},
				{
					dataIndex: 'returnEmpIdcardNo',
					title: '退至人身份证号',
					minWidth: 170,
					hideInSearch: true,
				},
				{
					dataIndex: 'returnProjectName',
					title: '退至项目',
					minWidth: 180,
					hideInSearch: true,
					ellipsis: true,
				},

				{
					dataIndex: 'createName',
					title: '派单人',
					minWidth: 120,
					hideInTable: true,
				},
				{
					dataIndex: 'createTime',
					title: '派单日期',
					hideInTable: true,
					searchIndex: 'startEndTime',
					startTime: 'startDate',
					endTime: 'endDate',
					format: 'YYYY-MM-DD',
					valueFormat: 'YYYY-MM-DD',
					valueType: 'dateTimeRange',
				},
			],
			btn: [
				{
					label: '导出',
					type: 'default',
					icon: 'icon-ic_edit_upload',
					onClick: handleDownsizeExport100,
					permission: ['handle_down_export'],
					show: () => {
						return state.downSizeState === -100;
					},
				},
				{
					label: '登记退保费用',
					type: 'default',
					onClick: handleRefundImport,
					permission: ['insurance_custserve_reduction_money'],
					show: () => {
						return state.downSizeState === -100;
					},
				},
				{
					label: '导出',
					type: 'default',
					icon: 'icon-ic_edit_upload',
					onClick: handleDownsizeExport2,
					permission: ['handle_down_export'],
					show: () => {
						return state.downSizeState == 2;
					},
				},
				{
					label: '导出',
					type: 'default',
					icon: 'icon-ic_edit_upload',
					onClick: handleDownsizeExport4,
					permission: ['handle_down_export'],
					show: () => {
						return state.downSizeState == 4;
					},
				},

				{
					label: '批量办理',
					type: 'default',
					icon: 'icon-ic_edit_upload',
					onClick: handleMulityDownsizeExport,
					permission: ['handle_down_batch'],
					show: () => {
						return buttonDisableFlag('downsize_mulity');
					},
				},
				{
					label: '导出办理',
					type: 'default',
					icon: 'icon-ic_edit_upload',
					onClick: handleDownsizeExport,
					permission: ['handle_down_export'],
					show: () => {
						return buttonDisableFlag('downsize_export');
					},
				},
				{
					label: '减员成功',
					type: 'default',
					icon: 'icon-ic_edit_refresh',
					onClick: handleSuccessClick,
					permission: ['handle_down_sucess'],
					show: () => {
						return buttonDisableFlag('downsize_sucess');
					},
					disabled: () => {
						return state.selectionChangeList.length === 0;
					},
				},
				{
					label: '减员退回',
					type: 'danger',
					icon: 'icon-ic_edit_export',
					onClick: handleBackExport,
					permission: ['handle_down_back'],
					show: () => {
						return buttonDisableFlag('downsize_back');
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
			],
			DICTS: {},
			dictKeys: ['insurance_buyHandleStatus', 'is_use', 'is_overdue'],
			params: {
				deptNo: '',
				insuranceCompanyName: '',
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
				let res = {};
				if (state.downSizeState === -100) {
					// 退保登记列表，这块应该分割出来的，但是操作难度大
					const p = Object.assign({}, params, state.params);
					res = await getInsuranceRefundMoneyPageList(p);
				} else {
					const p = Object.assign({}, params, state.params, { reduceHandleStatus: state.downSizeState }); // fileStatus: 0 正常 1 已减档
					res = await getInsuranceRefundList(p);
				}

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

		const tabChange = () => {
			refreshList();
		};

		const batchErrorData = (prop, errorData) => {
			let data = null;
			switch (prop) {
				case 'staff-batch-delete':
					// 办理成功的错误返回
					console.log('dataaa', errorData);
					data = errorData.map((item) => {
						item['buyHandleStatus'] = reduceHandleStatus[item.buyHandleStatus];
						item['policeStartEnd'] = `${item.policyStart}-${item.policyEnd}`;
						return item;
					});
					break;
				case 'staff-batch-refund-back':
					// 退回的错误返回
					data = errorData.map((item) => {
						item['reduceHandleStatus'] = reduceHandleStatus[item.reduceHandleStatus];
						item['policeStartEnd'] = `${item.policyStart}-${item.policyEnd}`;
						return item;
					});
					break;
			}
			return data;
		};

		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'detail':
					insureDetailRef.value && insureDetailRef.value.openDialog(item);
					break;
			}
		};

		// 跳转到项目档案（携带身份证）
		const toSubject = (item) => {
			router.push({ path: '/archives/subject', query: { projectIdCard: item.empIdcard } });
		};

		const loadDicts = async () => {
			try {
				const res = await getDictByItemTypes(state.dictKeys);
				if (res) {
					state.DICTS = res;
					state.columns = state.columns.map((item) => {
						const target = { ...item };
						switch (item.dataIndex) {
							case 'buyHandleStatus':
								target.valueEnum = res['insurance_buyHandleStatus']; // 投保状态
								break;
							case 'isUse':
								target.valueEnum = res['is_use']; // 投保状态
								break;
							case 'isOverdue':
								target.valueEnum = res['is_overdue']; // 投保状态
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

		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			insureDetailRef,
			handleRefundRef,
			refreshList,
			STAFF_BATCH_UPDATE_HEADER,
			STAFF_IMPORT_HEADER,
			STAFF_EXPORT_HEADER,
			selectionChange,
			STAFF_DOWNSHIFT_HEADER,
			onReset,
			STAFF_IMPORT_ERROR_HEADER,
			ERROR_HEADER,
			STAFF_BATCH_DEL_ERROR_HEADER,
			INSURE_REFUND_BACK_HEADER,
			HANDLE_REFUND_INSURANCE_HEADER,
			INSURE_EXPORT_REFUND_BACK_HEADER,
			INSURE_REFUND_HEADER,
			toSubject,
			tabChange,
			batchErrorData,
			formatRangeDateAndDiff,
			batchDeleteDialog,
			customErrorHeader,
			ProjectSelect,
			buttonDisableFlag,
			DATE_FORMAT_KEY,
			INSURE_MULITY_HEADER,
			downShiftDialog,
			openBatchBack,
			sucessBack,
			openBatchInsureSucess,
			sucessBackInsureSucess,
			registeredPolicy,
			insureSucessDialog,
			handleMulity,
			registeredSurrenderPolicy,
		};
	},
};
</script>

<style lang="scss" scoped src="./css/index.scss"></style>
