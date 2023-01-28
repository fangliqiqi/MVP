<template>
	<div class="custserve-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :searchConfig="searchConfig" @onReset="onReset">
			<template #extBtns>
				<el-dropdown style="margin-left: 6px" popper-class="module-download">
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
								<a href="/template/insurance/商险减员模板.xlsx" download>减员模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/insurance/商险变更项目模板.xlsx" download>变更项目模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/insurance/商险变更结算月模板.xlsx" download>变更结算月模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<!-- search -->
			<template v-slot:ProjectSelect>
				<project-select v-model="params.deptNo" style="width: 100%" />
			</template>
			<template v-slot:CompanySelect>
				<company-select v-model="params.insuranceCompanyName" style="width: 100%" />
			</template>

			<!-- table cell -->
			<template v-slot:BeginEndTime="item">
				{{ formatRangeDateAndDiff(item.policyStart, item.policyEnd) }}
				<span v-if="item.buyMonth" style="color: red">{{ `${item.buyMonth}个月` }}</span>
			</template>

			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!-- 查看 -->
		<insure-detail-dialog ref="insureDetailRef" />

		<!-- 减员 -->
		<batch-import-dialog
			title="发起减员"
			ref="reduceInsureRef"
			:header="INSURE_REDUCE_HEADER"
			:upload="reduceInsuranceByFile"
			@ok="refreshList"
			:type="1"
			customError
			:errorHeader="customErrorHeader(INSURE_REDUCE_HEADER)"
			download
			:dateFormatKeys="DATE_FORMAT_KEY"
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">减员失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!-- 变更项目 -->
		<batch-import-dialog
			title="变更项目"
			ref="deptChangeRef"
			:header="DEPT_CHANGE_HEADER"
			:upload="deptChangeByFile"
			@ok="refreshList"
			:type="1"
			customError
			:errorHeader="customErrorHeader(DEPT_CHANGE_HEADER)"
			download
			:dateFormatKeys="DATE_FORMAT_KEY"
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">项目变更失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!-- 变更结算月 -->
		<batch-import-dialog
			title="变更结算月"
			ref="settleMonthChangeRef"
			:header="SETTLE_MONTH_CHANGE_HEADER"
			:upload="settleMonthChangeByFile"
			@ok="refreshList"
			:type="1"
			customError
			:errorHeader="customErrorHeader(SETTLE_MONTH_CHANGE_HEADER)"
			download
			:dateFormatKeys="DATE_FORMAT_KEY"
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">变更结算月失败！</div>
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
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import ProjectSelect from '../component/ProjectSelect.vue';
import CompanySelect from '../component/InsureCompanySelect.vue';

import { ArrowDown } from '@element-plus/icons-vue';
import { formatRangeDateAndDiff } from '/@/utils/formatTime.js';
import { INSURE_REDUCE_HEADER, INSURED_HEADER_EXPORT, DEPT_CHANGE_HEADER, SETTLE_MONTH_CHANGE_HEADER, DATE_FORMAT_KEY } from '/@/utils/header.js';
import moment from 'moment';
import { exportExcel } from '/@/utils/xlsx';
import { exportExcelSheet } from '/@/utils/excel';
import { getDictByItemTypes } from '/@/utils/utils.js';
import { getInsuredListPage, getInsuredList, saveInsuranceRefund, deptChange, settleMonthChange, updateIsUse } from '/@/api/insurance/custserve.js';
import { reduceHandleStatus, buyType, isUse, isOverdue, isEffect } from '../component/dict.js';

export default {
	name: '已投保',
	components: {
		ProTable,
		ProButtons,
		insureDetailDialog,
		batchImportDialog,
		ArrowDown,
		ProjectSelect,
		CompanySelect,
	},
	setup() {
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const proTableRef = ref(null);

		const insureDetailRef = ref(null);
		const reduceInsureRef = ref(null);
		const deptChangeRef = ref(null);
		const settleMonthChangeRef = ref(null);

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

		const handleBatchExport = () => {
			const p = Object.assign({}, state.params, proTableRef.value.getParams());
			delete p.size;
			delete p.current;
			state.btn.find((item) => item.label === '导出已投保名册').loading = true;
			getInsuredList(p)
				.then((res) => {
					// exportExcelSheet(
					// 	INSURED_HEADER_EXPORT,
					// 	(res.data || []).map((item) => {
					// 		item.reduceHandleStatus = reduceHandleStatus[item.reduceHandleStatus];
					// 		item.buyType = buyType[item.buyType];
					// 		item.isUse = isUse[item.isUse];
					// 		item.isOverdue = isOverdue[item.isOverdue];
					// 		item.isEffect = isEffect[item.isEffect];

					// 		item['insuranceAddress'] = formatAddress(item.insuranceProvinceName, item.insuranceCityName); //商险购买地
					// 		item['insuranceHandleAddress'] = formatAddress(item.insuranceHandleProvinceName, item.insuranceHandleCityName); //商险办理地

					// 		return item;
					// 	}),
					// 	`商险已投保人员名册_${moment().format('YYYYMMDDHHmmss')}`
					// );
					message.success('导出成功');
				})
				.finally(() => {
					state.btn.find((item) => item.label === '导出已投保名册').loading = false;
				});
		};

		// 减员
		const handleReduceImport = () => {
			reduceInsureRef.value && reduceInsureRef.value.openDialog();
		};

		// 减员导入
		const reduceInsuranceByFile = (_, data) => {
			return saveInsuranceRefund(data);
		};

		// 变更项目
		const handleDeptChangeImport = () => {
			deptChangeRef.value && deptChangeRef.value.openDialog();
		};

		// 变更项目导入
		const deptChangeByFile = (_, data) => {
			return deptChange(data);
		};

		// 变更结算月
		const handleSettleMonthChangeImport = () => {
			settleMonthChangeRef.value && settleMonthChangeRef.value.openDialog();
		};

		// 便跟结算月导入
		const settleMonthChangeByFile = (_, data) => {
			return settleMonthChange(data);
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

		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};

		// 返回true表示不可用
		const isGray = (item) => {
			// 已出险
			if (item.isUse == 1) {
				return true;
			}

			// 已失效
			if (item.isEffect == 1) {
				return true;
			}
			// 已过期
			if (item.isOverdue == 1) {
				return true;
			}

			// 待减员 减员中 减员成功
			if (item.reduceHandleStatus == 1 || item.reduceHandleStatus == 2 || item.reduceHandleStatus == 4) {
				return true;
			}

			return false;
		};

		const onReset = () => {
			state.params = {
				deptNo: null,
				insuranceCompanyName: null,
			};
		};

		const state = reactive({
			params: { deptNo: null, insuranceCompanyName: null },

			searchConfig: {
				labelWidth: '110px',
				option: {
					extBtn: 'extBtns',
				},
			},
			columns: [
				{
					dataIndex: 'reduceHandleStatus',
					title: '减员状态',
					width: 115,
					hideInSearch: true,
					valueEnum: reduceHandleStatus,
				},
				{
					dataIndex: 'buyType',
					title: '投保类型',
					width: 90,
					valueEnum: {
						1: '新增',
						3: '批增',
						4: '替换',
					},
				},
				{
					dataIndex: 'projectName',
					title: '项目',
					minWidth: 140,
					hideInSearch: true,
					ellipsis: true,
				},
				{
					dataIndex: 'empName',
					title: '姓名',
					width: 100,
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
					ellipsis: true,
					hideInSearch: true,
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
					hideInSearch: true,
					ellipsis: true,
				},

				{
					dataIndex: 'reduceHandleStatus',
					title: '减员状态',
					width: 90,
					hideInTable: true,
					valueEnum: {
						1: '待减员',
						2: '减员中',
						3: '减员退回',
						4: '减员成功',
					},
				},

				{
					dataIndex: 'policyDate',
					title: '保单起止时间',
					minWidth: 220,
					hideInSearch: true,
					scopedSlots: { customRender: 'BeginEndTime' },
				},

				{
					dataIndex: 'buyStandard',
					title: '购买标准（元）',
					width: 120,
					hideInSearch: true,
				},
				{
					dataIndex: 'isUse',
					title: '是否出险',
					width: 90,
					valueEnum: isUse,
				},
				{
					dataIndex: 'isEffect',
					title: '是否有效',
					valueEnum: isEffect,
					hideInSearch: true,
				},

				{
					dataIndex: 'isOverdue',
					title: '是否过期',
					valueEnum: isOverdue,
				},

				// 仅搜索
				{
					dataIndex: 'deptNo',
					title: '项目',
					valueType: 'custom',
					hideInTable: true,
					scopedSlots: { customRender: 'ProjectSelect' },
				},
				{
					dataIndex: 'policyNo',
					title: '保单号',
					hideInTable: true,
				},
				{
					dataIndex: 'policyDate',
					title: '保单起止日期',
					hideInTable: true,
					selectType: 'daterange',
					format: 'YYYY-MM-DD',
					valueFormat: 'YYYY-MM-DD',
					searchIndex: 'startEndTime',
					startTime: 'policyStart',
					endTime: 'policyEnd',
					valueType: 'dateTimeRange',
				},
				{
					dataIndex: 'invoiceNo',
					title: '发票号',
					hideInTable: true,
				},

				{
					dataIndex: 'createName',
					title: '派单人',
					width: 90,
				},
				{
					width: 100,
					dataIndex: 'createTime',
					title: '派单日期',
					selectType: 'daterange',
					format: 'YYYY-MM-DD',
					valueFormat: 'YYYY-MM-DD',
					searchIndex: 'startEndTime_1',
					startTime: 'createStartTime',
					endTime: 'createEndTime',
					valueType: 'dateTimeRange',
				},
				{
					dataIndex: 'id',
					title: 'id',
					width: 180,
					hideInSearch: true,
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
			btn: [
				{
					label: '导出已投保名册',
					onClick: handleBatchExport,
					permission: ['insurance_custserve_insured_export'],
					icon: 'icon-ic_edit_export',
				},
				{
					label: '减员',
					onClick: handleReduceImport,
					permission: ['insurance_custserve_insured_reduce'],
					type: 'normal',
				},
				{
					label: '变更项目',
					onClick: handleDeptChangeImport,
					permission: ['insurance_custserve_insured_change_dept'],
					type: 'normal',
				},
				{
					label: '变更结算月',
					onClick: handleSettleMonthChangeImport,
					permission: ['insurance_custserve_insured_change_month'],
					type: 'normal',
				},
			],
			cellBtns: [
				{
					text: '查看',
					prop: 'detail', // 唯一标识
					permission: ['insurance_custserve_insured_detail'], // 权限标识
				},
				{
					text: '出险	',
					prop: 'edit', // 唯一标识
					permission: ['insurance_custserve_insured_edit'], // 权限标识
					tooltip: '当前转态不可出险',
					isGray: isGray,
				},
			],
		});

		onMounted(() => {
			// 请求字典数据
			getDictByItemTypes(['emp_natrue']).then((res) => {
				// console.log('字典集', res);
				state.dict = res;
				state.columns = state.columns.map((item) => {
					const target = { ...item };
					switch (item.dataIndex) {
						case 'empNatrue': // 需要更新的字典值
							target.valueEnum = res['emp_natrue']; // 根据指定键取字典值
							break;
					}
					return target;
				});
			});
		});

		const request = async (params) => {
			const p = Object.assign({}, state.params, params);

			try {
				const res = await getInsuredListPage(
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
			const text = `<p style="font-size:16px;font-weight:600">确定标记该人员出险吗？<br/>
				<span style="color:red;font-size:14px;font-weight:400">出险后，无法减员，请谨慎操作！</span></p>`;

			ElMessageBox.confirm(text, {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				dangerouslyUseHTMLString: true,
			})
				.then(async () => {
					try {
						const res = await updateIsUse(item.id);
						if (res && res.code === 200) {
							message.success('出险成功');
							proTableRef.value && proTableRef.value.doSearch();
						} else {
							message.error(res.msg || '出险失败');
						}
					} catch (e) {
						message.error('出险失败');
					}
				})
				.catch(() => {});
		};

		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'detail':
					insureDetailRef.value && insureDetailRef.value.openDialog(item);
					break;
				case 'edit': // 出险
					deleteCell(item);
					break;
			}
		};

		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			refreshList,
			insureDetailRef,
			reduceInsureRef,
			deptChangeRef,
			settleMonthChangeRef,
			onReset,
			formatRangeDateAndDiff,
			INSURE_REDUCE_HEADER,
			customErrorHeader,
			reduceInsuranceByFile,
			DEPT_CHANGE_HEADER,
			deptChangeByFile,
			SETTLE_MONTH_CHANGE_HEADER,
			settleMonthChangeByFile,
			DATE_FORMAT_KEY,
		};
	},
};
</script>

<style lang="scss" scoped src="./css/insured.scss">

</style>
