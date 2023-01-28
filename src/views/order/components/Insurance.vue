<template>
	<div class="custserve-container">
		<pro-table ref="proTableRef" row-key="onlyId" :columns="columns" :request="request" :btn="btn" :searchConfig="searchConfig" :manualRequest="true">
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
							<el-dropdown-item>
								<a href="/template/insurance/商险减员模板.xlsx" download>减员模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>

			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

			<template v-slot:buyHandleStatus="item">
				<!-- 减员办理状态 -->
				<span v-if="item.buyType == 5">{{ reduceHandleStatus[item.reduceHandleStatus] }}</span>
				<!-- 非减员办理状态 -->
				<span v-else>{{ buyHandleStatus[item.buyHandleStatus] }}</span>
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
			@ok="actionSuccess"
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
			@ok="actionSuccess"
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
			@ok="actionSuccess"
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

		<!-- 减员 -->
		<batch-import-dialog
			title="发起减员"
			ref="reduceInsureRef"
			:header="INSURE_REDUCE_HEADER"
			:upload="reduceInsuranceByFile"
			@ok="actionSuccess"
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
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox } from 'element-plus';
import insureDetailDialog from '/@/views/insurance/component/insureDetailDialog.vue';
import insureEditDialog from '/@/views/insurance/component/insureEditDialog.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { INSURE_ADD_HEADER, INSURE_BATCH_HEADER, INSURE_CHANGE_HEADER, DATE_FORMAT_KEY, INSURE_REDUCE_HEADER } from '/@/utils/header.js';
import { deleteInsurance } from '/@/api/insurance/custserve.js';
import { getInsuranceListPage, addInsurance, batchInsurance, replaceInsurance, saveInsuranceRefund } from '/@/api/order.js';
import { distributeType, reduceHandleStatus, buyHandleStatus } from '/@/views/insurance/component/dict.js';
import { Local } from '/@/utils/storage';

export default {
	name: 'Insurance',
	components: {
		ProTable,
		ProButtons,
		insureDetailDialog,
		insureEditDialog,
		ArrowDown,
		batchImportDialog,
	},
	emits: ['onActionUpdate'],
	props: { orderNo: String },

	setup(props, context) {
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
		// 减员
		const reduceInsureRef = ref(null);

		// 监听属性值改变
		watch(
			() => props.orderNo,
			(newVal, oldVal) => {
				refreshList();
			}
		);

		const actionSuccess = () => {
			refreshList();
			context.emit('onActionUpdate');
		};

		// 新增
		const handleAddClick = () => {
			addInsureRef.value && addInsureRef.value.openDialog();
		};

		// 新增导入
		const addInsuranceByFile = (_, data) => {
			return addInsurance({ data, orderNo: props.orderNo });
		};

		// 批增
		const handleBatchImport = () => {
			addBatchInsureRef.value && addBatchInsureRef.value.openDialog();
		};

		// 批增导入
		const addBatchInsuranceByFile = (_, data) => {
			return batchInsurance({ data, orderNo: props.orderNo });
		};

		// 替换
		const handleBatchUpdate = () => {
			insureChangeRef.value && insureChangeRef.value.openDialog();
		};

		// 替换导入
		const changeInsuranceByFile = (_, data) => {
			return replaceInsurance({ data, orderNo: props.orderNo });
		};

		// 减员
		const handleReduceImport = () => {
			reduceInsureRef.value && reduceInsureRef.value.openDialog();
		};

		// 减员导入
		const reduceInsuranceByFile = (_, data) => {
			return saveInsuranceRefund({ data, orderNo: props.orderNo });
		};

		// 自定义导出头
		const customErrorHeader = (header) => {
			const _header = [];

			Object.keys(header).forEach((dataIndex) => {
				_header.push({ title: header[dataIndex], dataIndex: dataIndex });
			});

			_header.push({
				title: '错误原因',
				dataIndex: 'errorMessage',
				width: 200,
			});

			return _header;
		};

		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};

		const doSearchList = () => {
			proTableRef.value && proTableRef.value.doSearch();
		};

		// 返回true表示不可用
		const isEditAndDelete = (item) => {
			if (inject('disable')) {
				return true;
			}
			const userInfo = Local.get('user_info');
			if (userInfo?.id == item.createBy) {
				return item.buyHandleStatus !== 4;
			}

			if (item.buyType != 5 && item.buyHandleStatus == 4) {
				return false;
			}

			return true;
		};

		const state = reactive({
			searchConfig: {
				labelWidth: '90px',
				option: {
					extBtn: 'extBtns',
				},
			},
			columns: [
				{
					dataIndex: 'buyType',
					title: '派单类型',
					width: 115,
					valueEnum: distributeType,
					hideInSearch: true,
				},
				{
					dataIndex: 'empName',
					title: '员工姓名',
					width: 120,
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
					dataIndex: 'buyStandard',
					title: '购买标准（元）',
					minWidth: 120,
					hideInSearch: true,
					ellipsis: true,
				},
				{
					dataIndex: 'dieDisableQuota',
					title: '身故和残疾（万元）',
					minWidth: 150,
					hideInSearch: true,
					ellipsis: true,
				},
				{
					dataIndex: 'medicalQuota',
					title: '医疗额度（万元）',
					minWidth: 140,
					hideInSearch: true,
					ellipsis: true,
				},
				{
					dataIndex: 'createName',
					title: '申请人',
					minWidth: 120,
					hideInSearch: true,
					ellipsis: true,
				},
				{
					dataIndex: 'createUserDeptName',
					title: '申请人所在部门',
					minWidth: 120,
					hideInSearch: true,
					ellipsis: true,
				},
				{
					dataIndex: 'createTime',
					title: '申请时间',
					valueType: 'dateTimeRange',
					searchIndex: 'createTime',
					startTime: 'startDate',
					endTime: 'endDate',
					minWidth: 160,
					valueFormat: 'YYYY-MM-DD',
					format: 'YYYY-MM-DD',
					selectType: 'daterange',
				},
				{
					dataIndex: 'buyHandleStatus',
					title: '办理状态',
					width: 115,
					hideInSearch: true,
					valueType: 'custom',
					scopedSlots: { customRender: 'buyHandleStatus' },
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
					disabled: () => {
						return inject('disable');
					},
				},
				{
					label: '批增',
					onClick: handleBatchImport,
					permission: ['insurance_custserve_insure_batch_add'],
					icon: 'icon-ic_edit_add',
					disabled: () => {
						return inject('disable');
					},
				},
				{
					label: '替换',
					type: 'normal',
					onClick: handleBatchUpdate,
					permission: ['insurance_custserve_insure_update'],
					icon: 'icon-ic_edit_refresh',
					disabled: () => {
						return inject('disable');
					},
				},
				{
					label: '减员',
					type: 'normal',
					onClick: handleReduceImport,
					permission: ['insurance_custserve_insured_reduce'],
					icon: 'icon-ic_edit_export',
					disabled: () => {
						return inject('disable');
					},
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
			const p = Object.assign({ orderNo: props.orderNo }, params);

			try {
				const res = await getInsuranceListPage(
					{
						size: p.size,
						current: p.current,
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
			...toRefs(props),
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			addInsureRef,
			addBatchInsureRef,
			insureChangeRef,
			reduceInsureRef,
			refreshList,
			doSearchList,
			insureDetailRef,
			insureEditRef,
			INSURE_ADD_HEADER,
			INSURE_BATCH_HEADER,
			INSURE_CHANGE_HEADER,
			INSURE_REDUCE_HEADER,
			addInsuranceByFile,
			customErrorHeader,
			addBatchInsuranceByFile,
			changeInsuranceByFile,
			reduceInsuranceByFile,
			DATE_FORMAT_KEY,
			reduceHandleStatus,
			buyHandleStatus,
			actionSuccess,
		};
	},
};
</script>

<style lang="scss" scoped src="./css/Insurance.scss"></style>
