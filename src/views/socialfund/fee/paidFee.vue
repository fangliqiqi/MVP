<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :searchConfig="state.searchConfig" :columns="state.columns"
			:request="request" :btn="state.btn" @selectionChange="selectionChange" multi :initParams="state.initParams">
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
								<a href="/template/socialfund/社保模板-合并版.xls" download> 社保模板-合并版</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/socialfund/养老三险模板.xls" download> 养老三险模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/socialfund/医保模板.xls" download> 医保模板</a>
							</el-dropdown-item>

							<el-dropdown-item>
								<a href="/template/socialfund/公积金模板.xls" download> 公积金模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!-- 社保导入-->
		<batch-import-dialog title="社保导入-合并版" ref="socialImportRef" :type="1" :header="EXPORT_PAID_SOCIAL_HEADER"
			url="/yifu-social/method/tpaymentinfo/importListAdd" :ext="state.uploadExt" @ok="refreshList"
			batchName="social-all-import" :errorHeader="EXPORT_PAID_SOCIAL_FEEDBACK_HEADER" :errorData="batchErrorData" customError
			@change-status="changeStatus" customProcess download :limitZipSize='50'>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量导入失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>

			<template #loading>
				<!--自定义加载-->
				<el-progress type="circle" :percentage="state.p" color="var(--el-color-primary)" />
			</template>
		</batch-import-dialog>

		<!-- 养老三险导入-->
		<batch-import-dialog title="养老三险导入" ref="otherImportRef" :type="1" :header="EXPORT_PAID_OTHER_HEADER"
			url="/yifu-social/method/tpaymentinfo/importListSocialHeFei" :ext="state.uploadExt" @ok="refreshList"
			batchName="social-three-import" :errorHeader="EXPORT_PAID_SOCIAL_FEEDBACK_HEADER" :errorData="batchErrorData"
			@change-status="changeStatus" customProcess customError download :limitZipSize='50'>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量导入失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>

			<template #loading>
				<!--自定义加载-->
				<el-progress type="circle" :percentage="state.p" color="var(--el-color-primary)" />
			</template>
		</batch-import-dialog>

		<!-- 医保导入-->
		<batch-import-dialog title="医保导入" ref="medialImportRef" :type="1" :header="EXPORT_PAID_MEDIAL_HEADER"
			url="/yifu-social/method/tpaymentinfo/importListSocialHeFei" :ext="state.uploadExt" @ok="refreshList"
			batchName="social-medical-import" :errorHeader="EXPORT_PAID_SOCIAL_FEEDBACK_HEADER" :errorData="batchErrorData" customError
			@change-status="changeStatus" customProcess download :limitZipSize='50'>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量导入失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>

			<template #loading>
				<!--自定义加载-->
				<el-progress type="circle" :percentage="state.p" color="var(--el-color-primary)" />
			</template>
		</batch-import-dialog>

		<!-- 公积金导入-->
		<batch-import-dialog title="公积金导入" ref="fundImportRef" :type="1" :header="EXPORT_PAID_FUND_HEADER"
			url="/yifu-social/method/tpaymentinfo/batchImportPaymentFundInfo" @ok="refreshList" batchName="fund-batch-import"
			:errorHeader="EXPORT_PAID_SOCIAL_FEEDBACK_HEADER" :errorData="batchErrorData" customError customErrorContent download :limitZipSize='50'>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量导入失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<paid-fee-detail ref="paidFeeDetailRef"></paid-fee-detail>
		<export-excel-dialog ref="exportExcelRef" :heads="EXPORT_PAID_FEE_PARAMS" title="批量导出"
			useCode="social_tpaymentinfo_export" />
		<export-excel-dialog ref="exportMergeExcelRef" :heads="EXPORT_PAID_FEE_PARAMS_MERGE" title="合并导出"
			useCode="social_tpaymentinfo_merge_export" />


		<batch-delete-paid-fee ref="batchDeletePaidFeeRef" @ok="refreshList"></batch-delete-paid-fee>
	</div>
</template>

<!--实缴费用-->
<script setup name="实缴费用">
import BatchImportDialog from '/@/components/BatchImportDialog/index.vue';
import batchDeletePaidFee from './component/batchDeletePaidFee.vue';
import paidFeeDetail from './component/paidFeeDetail.vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { getPaidFeeList, deletePaidFee, exportPaidFee, getProcess, manualPush, exportMerge, daBiaoCommit } from '/@/api/socialfund/fee';
import { getAreaJson, loadNode, idToArea } from '/@/utils/city';
import { EMPTY_PLACEHOLDER, formatMoney, randomString, getDictByItemTypes } from '/@/utils/utils';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import { EXPORT_PAID_FEE_PARAMS } from '/@/utils/header';
import moment from 'moment';
import { onRefresh, offRefresh } from '/@/utils/events';
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';
import { Local } from '/@/utils/storage';
import { getHuConfigList } from '/@/api/permission/socialHandlePermission';


import {
	EXPORT_PAID_SOCIAL_HEADER,
	EXPORT_PAID_OTHER_HEADER,
	EXPORT_PAID_MEDIAL_HEADER,
	EXPORT_PAID_FUND_HEADER,
	STAFF_IMPORT_ERROR_HEADER,
	EXPORT_PAID_FEE_PARAMS_MERGE,
	EXPORT_PAID_SOCIAL_FEEDBACK_HEADER
} from '/@/utils/header';

const router = useRouter();
const route = useRoute();

const socialImportRef = ref(null); // 社保导入
const otherImportRef = ref(null); // 养老三险导入
const fundImportRef = ref(null); // 公积金导入
const medialImportRef = ref(null); // 医保导入
const exportExcelRef = ref(null); // 批量导出
const exportMergeExcelRef = ref(null); // 合并导出
const paidFeeDetailRef = ref(null);

const proTableRef = ref(null);
const batchDeletePaidFeeRef = ref(null);

const { proxy } = getCurrentInstance();
const isLoading = ref(false)
const refreshList = (c) => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.refresh();
};

/**
 * 错误信息
 */
const batchErrorData = (prop, errorData) => {
	return errorData
		.map((item) => {
			return {
				line: item.lineNum,
				isError: item.result == '0' ? '是' : '否',
				empName: item.empName,
				empIdCard: item.empIdCard,
				socialHousehold: item.socialHousehold,
				providentHousehold: item.providentHousehold,
				error: item.message,
			};
		})
		.sort((a, b) => Number(a.line) - Number(b.line));
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'detail':
			// 详情
			if (paidFeeDetailRef.value) paidFeeDetailRef.value.openDialog(item);
			break;
		case 'remove':
			// 删除
			deleteCell(item);
			break;
	}
};

/**
 *获取进度信息
 */
const getProcessInfo = () => {
	getProcess().then((res) => {
		if (res || res < 100) {
			state.p = res;
			sendProcess();
		} else {
			state.p = 0;
		}
	});
};

const sendProcess = () => {
	setTimeout(() => {
		if (state.process) {
			getProcessInfo();
		}
	}, 3000);
};

const changeStatus = (data) => {
	if (data.state === 'uploading') {
		state.process = true;
		// 需要开始获取进度
		getProcessInfo();
	} else {
		// 需要停止获取进度
		state.process = false;
		state.p = 0;
	}
};

// 批量导出
const handleBatchExport = () => {
	let searchParams = Object.assign({}, proTableRef.value.getParams(), state.params);
	delete searchParams.size;
	delete searchParams.current;
	delete searchParams.createTime;

	if (exportExcelRef.value) {
		exportExcelRef.value.openDialog((params, exportFile) => {
			const data = {
				...searchParams,
				exportFields: params.map((item) => item.dataIndex),
			};
			const idList = state.selectionChangeList.map((t) => t.id);
			if (idList && idList.length) {
				data.idList = idList;
			}
			exportPaidFee({}, data).then((res) => {
				if (res.code && res.code !== 200) {
					ElMessage.error(res.msg);
				}
				exportFile(true);
			});
		});
	}
};

// 合并导出
const handleMergeExport = () => {

	let searchParams = Object.assign({}, proTableRef.value.getParams(), state.params);
	delete searchParams.size;
	delete searchParams.current;
	delete searchParams.createTime;
	
	if (exportMergeExcelRef.value) {
		// console.log('get exportExcelRef:', exportExcelRef.value);
		exportMergeExcelRef.value.openDialog((params, exportFile) => {
			const data = {
				...searchParams,
				exportFields: params.map((item) => item.dataIndex),
			};
			const idList = state.selectionChangeList.map((t) => t.id);
			if (idList && idList.length) {
				data.idList = idList;
			}
			exportMerge({}, data).then((res) => {
				if (res.code && res.code !== 200) {
					ElMessage.error(res.msg);
				}
				exportFile(true);
			});
		});
	}
};
let loadingIcon = null
// 手动推送
const handleManualPush = () => {
	isLoading.value = true
	const text = `<p style="font-size:16px;font-weight:600">是否立即推送至EKP系统？<br/>
				<span style="display: inline-block;line-height: 18px;margin-top:4px;color:red;font-size:14px;font-weight:400">推送后，数据将禁止修改，请谨慎操作！！！</span></p>`;
	ElMessageBox.confirm(text, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		dangerouslyUseHTMLString: true,
	}).then(() => {
		loadingIcon = ElLoading.service({
			lock: true,
			text: '正在推送中...',
			background: 'rgba(0, 0, 0, 0.7)',
		});
		const paramsData  =  Object.assign({},proTableRef.value.getParams())
		delete paramsData.socialCreateMonth
		delete paramsData.createTime
		manualPush(paramsData).then(
			(res) => {
				if (res && res.code == 200) {
					refreshList()
					ElMessage.success({message:'已将选择范围内“本账号”导入且“已打标”的数据，成功推送至EKP',duration:5000});
				} else {
					ElMessage.error(res.msg || '推送处理失败');
				}
			},
			() => {
				ElMessage.error('推送处理失败');
			}
		).finally(() => {
			isLoading.value = false
			if (loadingIcon) {
				loadingIcon.close()
			}
		});
	}).catch(() => {
		isLoading.value = false
	})

}
//确认无误操作
const isLoadingNoBug = ref(false)
const sureNoBugHandle = () => {
	const text = `<p style="font-size:16px;font-weight:600">是否已确认无误?<br/>
				<span style="display: inline-block;line-height: 18px;margin-top:4px;color:red;font-size:14px;font-weight:400">确认无误后，数据会定时推送至EKP，推送后将禁止修改，请谨慎操作！！！</span></p>`;
	ElMessageBox.confirm(text, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		dangerouslyUseHTMLString: true,
	}).then(() => {
		isLoadingNoBug.value = true
		noBugFunc()
	}).catch(() => {
		isLoadingNoBug.value = false
	})
}

// 确认无误提交方法
const noBugFunc = () => {
	let searchParams = Object.assign({}, proTableRef.value.getParams(), state.params);
	delete searchParams.size;
	delete searchParams.current;
	delete searchParams.socialCreateMonth;
	const data = {
		...searchParams,
	};
	const idList = state.selectionChangeList.map((t) => t.id);
	if (idList && idList.length) {
		data.idList = idList;
	}
	delete data.createTime
	daBiaoCommit(data).then((res) => {
		if (res.code && res.code !== 200) {
			return ElMessage.error(res.msg || "操作失败");
		}
		refreshList()
		ElMessage.success('操作成功')
		isLoadingNoBug.value = false
	}).catch(err => {
		ElMessage.error('操作失败')
	}).finally(() => {
		isLoadingNoBug.value = false
	});
}

const deleteCell = (item) => {
	const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，该记录将从系统消失，请谨慎操作！</span></p>`;
	ElMessageBox.confirm(text, {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		dangerouslyUseHTMLString: true,
	})
		.then(async () => {
			try {
				const res = await deletePaidFee(item.id);
				if (res && res.code === 200) {
					ElMessage.success('删除成功');
					refreshList();
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				ElMessage.error((e && e.msg) || '删除失败');
			}
		})
		.catch(() => { });
};

const selectionChange = (selection) => {
	state.selectionChangeList = selection;
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
	selectionChangeList: [], // 选中项
	uploadExt: {
		random: null,
		type: 0, // type 0是 三险 1是医保导入
	},

	searchConfig: {
		labelWidth: 110,
		option: {
			extBtn: 'extBtns',
		},
	},
	process: false, // 获取进度
	p: 0, // 进度数据
	initParams: {
		// 初始参数
		socialCreateMonth: moment().format('YYYYMM'),
	},
	columns: [
		{
			dataIndex: 'empNo',
			title: '员工编码',
			minWidth: 220,
			tooltip: true,
			hideInSearch: true,
			fixed: 'left',
		},
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
			dataIndex: 'socialSecurityNo',
			title: '社保编号',
			minWidth: 200,
		},

		{
			dataIndex: 'unitName',
			title: '客户名称',
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
			dataIndex: 'socialCreateMonth',
			title: '生成月份',
			minWidth: 160,
			valueType: 'date',
			selectType: 'month',
			valueFormat: 'YYYYMM',
			format: 'YYYY年MM月',
			hideInTable: true,
			clearable: false,
		},
		{
			dataIndex: 'socialPayMonth',
			title: '缴纳月份',
			valueType: 'date',
			selectType: 'month',
			valueFormat: 'YYYYMM',
			format: 'YYYY年MM月',
			hideInTable: true,
		},
		{
			dataIndex: 'socialHousehold',
			title: '社保户',
			minWidth: 200,
			valueType: 'PageSelect',
			request: requestHouseList,
			pageProps: {
				valueKey: 'name',
				title: 'name',
				search: 'name',
				parmas: {
					type: 0
				}
			},
			tooltip: true,
		},
		{
			dataIndex: 'socialPayAddr',
			title: '社保缴纳地',
			minWidth: 200,
			tooltip: true,
			hideInSearch: true,
		},

		{
			dataIndex: 'socialPayMonth',
			title: '社保缴纳月份',
			minWidth: 160,
			hideInSearch: true,
		},

		{
			dataIndex: 'socialCreateMonth',
			title: '社保生成月份',
			minWidth: 160,
			hideInSearch: true,
		},

		{
			dataIndex: 'socialSum',
			title: '社保合计',
			minWidth: 200,
			hideInSearch: true,
			formatter: (row) => {
				if (row.socialSum) {
					return formatMoney(row.socialSum) + '元';
				}
				return EMPTY_PLACEHOLDER;
			},
		},
		{
			dataIndex: 'providentHousehold',
			title: '公积金户',
			minWidth: 200,
			valueType: 'PageSelect',
			request: requestHouseList,
			pageProps: {
				valueKey: 'name',
				title: 'name',
				search: 'name',
				parmas: {
					type: 1
				}
			},
			tooltip: true,
		},
		{
			dataIndex: 'providentPayAddr',
			title: '公积金缴纳地',
			minWidth: 200,
			tooltip: true,
			hideInSearch: true,
		},
		{
			dataIndex: 'providentPayMonth',
			title: '公积金缴纳月份',
			hideInSearch: true,
			valueType: 'date',
			selectType: 'month',
			valueFormat: 'YYYYMM',
			format: 'YYYY年MM月',
			minWidth: 160,
		},
		{
			dataIndex: 'providentCreateMonth',
			title: '公积金生成月份',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'providentSum',
			title: '公积金合计',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				if (row.providentSum) {
					return formatMoney(row.providentSum) + '元';
				}
				return EMPTY_PLACEHOLDER;
			},
		},
		{
			dataIndex: 'sumAll',
			title: '总合计',
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
			dataIndex: 'socialAddress',
			title: '缴纳地',
			minWidth: 200,
			valueType: 'addRess',
			tooltip: true,
			hideInTable: true,
			params: {
				pro: 'socialProvince',
				city: 'socialCity',
				town: 'socialTown',
			},
		},
		{
			dataIndex: 'createName',
			title: '导入人',
			hideInSearch: false,
			minWidth: 180,
		},
		{
			dataIndex: 'createTime',
			title: '导入时间',
			minWidth: 180,
			valueType: 'dateTimeRange',
			searchIndex: 'createTime',
			startTime: 'createTimeStart',
			endTime: 'createTimeEnd',
		},
		{
			dataIndex: 'lockStatus',
			title: '打标状态',
			minWidth: 160,
			hideInSearch: false,
			valueEnum: {
				0: '未打标',
				1: '已打标',
			}
		},
		{
			dataIndex: 'pushStatus',
			title: '推送状态',
			hideInSearch: true,
			minWidth: 180,
			valueEnum: {
				0: '已推送',
				1: '未推送',
			},
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 200,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
	btn: [
		{
			label: '社保导入-合并版',
			onClick: () => {
				const random = Local.get('user_info').id + randomString();
				state.uploadExt = {
					random,
				};
				if (socialImportRef.value) {
					state.process = false;
					state.p = 0;
					socialImportRef.value.openDialog();
				}
			},
			permission: ['social_tpaymentinfo_batchImport'],
			icon: 'icon-ic_edit_upload',
		},
		{
			label: '养老三险导入',
			onClick: () => {
				const random = Local.get('user_info').id + randomString();
				state.uploadExt = {
					random,
					type: 0, // type 0是 三险 1是医保导入
				};
				if (otherImportRef.value) {
					state.process = false;
					state.p = 0;
					otherImportRef.value.openDialog();
				}
			},
			type: 'default',
			permission: ['social_tpaymentinfo_three_batchImport'],
			icon: 'icon-ic_edit_upload',
		},
		{
			label: '医保导入',
			type: 'default',
			permission: ['social_tpaymentinfo_medical_batchImport'],
			onClick: () => {
				const random = Local.get('user_info').id + randomString();
				state.uploadExt = {
					random,
					type: 1, // type 0是 三险 1是医保导入
				};
				if (medialImportRef.value) {
					state.process = false;
					state.p = 0;
					medialImportRef.value.openDialog();
				}
			},
			icon: 'icon-ic_edit_upload',
		},
		{
			label: '公积金导入',
			type: 'default',
			permission: ['social_tpaymentinfo_batchImport'],
			onClick: () => {
				if (fundImportRef.value) fundImportRef.value.openDialog();
			},
			icon: 'icon-ic_edit_upload',
		},

		{
			label: '批量导出',
			type: 'default',
			icon: 'icon-ic_edit_upload',
			permission: ['social_tpaymentinfo_export'],
			onClick: handleBatchExport,
		},
		{
			label: '合并导出',
			type: 'default',
			icon: 'icon-ic_edit_upload',
			permission: ['social_tpaymentinfo_export'],
			onClick: handleMergeExport,
		},

		{
			label: '批量删除',
			type: 'default',
			icon: 'icon-ic_edit_delete',
			permission: ['social_tpaymentinfo_batchDelete'],
			onClick: () => {
				// 批量删除
				if (batchDeletePaidFeeRef.value) batchDeletePaidFeeRef.value.openDialog();
			},
		},
		{
			label: '确认无误',
			type: 'default',
			icon: 'icon-ic_edit_refresh',
			permission: [],
			loading: isLoadingNoBug,
			key: 'push',
			onClick: sureNoBugHandle,
		},

		{
			label: '推送至EKP',
			type: 'default',
			icon: 'icon-ic_edit_refresh',
			permission: [],
			loading: isLoading,
			key: 'push',
			onClick: handleManualPush,
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: ['social_tpaymentinfo_detail'],
		},
		{
			text: '删除',
			permission: ['social_tpaymentinfo_del'],
			prop: 'remove', // 唯一标识
		},
	],
	dictKeys: [],
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
		}
	}
};

const request = async (params) => {
	try {
		if (params.createTime) {
			params.createTime = null;
		}
		const res = await getPaidFeeList(params);
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
