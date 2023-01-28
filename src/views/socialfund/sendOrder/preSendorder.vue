<template>
	<div class="system-dict-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :multi="true"
			:searchConfig="searchConfig" @selectionChange="selectionChange" @switchChange="switchChange">
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
								<a href="/template/socialfund/易服批量派增预派单模板.xls" download> 批量派增模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/socialfund/易服批量派减预派单模板.xls" download> 批量派减模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/socialfund/易服批量更新预派单模板.xls" download> 批量更新模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		<!-- 批量派增 -->
		<batch-import-dialog ref="batchImportDialogRef" :header="PREORDER_HEADER_ADD" batchName="pre-order-batch-import"
			:errorHeader="ERROR_HEADER" :errorData="batchErrorData" :upload="(params) => batchUploadFile(params, 'add')"
			:ext-params="state.batchExtParams" :rules="state.batchRules" customError download @ok="refresh">
			<template #error>
				<div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
		<!-- 批量派减 -->
		<batch-import-dialog ref="batchReduceDialogRef" :header="PREORDER_HEADER_MINUS"
			:upload="(params) => batchUploadFile(params, 'minus')" :errName="'批量派减'" :title="'批量派减'" :download="true"
			@ok="refresh">
			<template #error>
				<div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!-- 批量更新 -->
		<batch-import-dialog ref="batchUpdateDialogRef" :header="PREORDER_HEADER_UPDATE"
			:upload="(params) => batchUploadFile(params, 'update')" :errName="'批量更新'" :title="'批量更新'" :download="true"
			@ok="refresh">
			<template #error>
				<div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
		<!--批量导出  -->
		<export-excel-dialog ref="exportExcelRef" :heads="PREORDER_HEADER_EXPORT" :title="'预派单导出'" />

		<!-- 取消派单 -->
		<edit-ispresend ref="ispresend" @ok="refresh"></edit-ispresend>
	</div>
</template>

<script setup name="预派单">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import editIspresend from './component/editIspresend.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { getDictByItemTypes } from '/@/utils/utils';
import { readExcel } from '/@/utils/xlsx';
import { PREORDER_HEADER_MINUS, PREORDER_HEADER_ADD, ERROR_HEADER, PREORDER_HEADER_UPDATE, PREORDER_HEADER_EXPORT } from '/@/utils/header';
import { onRefresh, offRefresh } from '/@/utils/events';
import {
	getpresendorderList,
	deletePresendorder,
	editPreBydispatchFlag,
	dispatchPreById,
	editPreByisSubmit,
	preBybatchReduce,
	preBybatchAdd,
	getProjectName,
	getSocialAccount,
	getFundAccount,
	preBybatchUpdate,
	preBybatchExport,
	preBybatchDispatch,
} from '/@/api/socialfund/presendorder';
const storeObj = useStore();
const proTableRef = ref(null);
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const exportExcelRef = ref(null);
const batchImportDialogRef = ref(null);
const batchReduceDialogRef = ref(null);
const batchUpdateDialogRef = ref(null);
const ispresend = ref(null);
const dispathLoading = ref(false);// 一键派单loading

// 批量操作
const handleBatch = (type) => {
	switch (type) {
		case 'add': //批量派增
			batchImportDialogRef.value && batchImportDialogRef.value.openDialog();
			break;
		case 'reduce': //批量派减
			batchReduceDialogRef.value && batchReduceDialogRef.value.openDialog();
			break;
		case 'update': //批量更新
			batchUpdateDialogRef.value && batchUpdateDialogRef.value.openDialog();
			break;
	}
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

// 批量导入操作
const batchUploadFile = async (params, type) => {
	const { file } = params;
	if (type == 'add') {
		const p = {
			departId: params.departId,
			socialHouse: params.socialHouse,
			fundHouse: params.fundHouse ? params.fundHouse : null,
		};
		return await getExcelData(file, params, preBybatchAdd, p);
	} else if (type == 'minus') {
		return await getExcelData(file, params, preBybatchReduce);
	} else if (type == 'update') {
		return await getExcelData(file, params, preBybatchUpdate);
	}
};

const getExcelData = async (file, params, postMethod, p) => {
	try {
		const excelData = await readExcel(file.raw);
		//遍历所有的sheet表
		let list = [...excelData[0].data];
		const content = list.map((item) => {
			const keys = Object.keys(item);
			const target = {};
			keys.forEach((key) => {
				if (!key.startsWith('__EMPTY')) {
					target[key] = item[key];
				}
			});
			return target;
		});
		return new Promise(async (resolve, reject) => {
			try {
				const res = await postMethod(JSON.stringify(content), p);
				const msg = res.message || res.msg || '导入失败';

				if (res && res.data && Array.isArray(res.data) && res.data.length) {
					// 存在错误信息
					resolve({
						code: 1,
						msg,
						data: res.data,
					});
				} else if (res && res.code === 200) {
					resolve({
						code: 200,
						msg: '导入成功',
						data: null,
					});
				} else {
					resolve({
						code: 1,
						msg,
						data: null,
					});
				}
			} catch (exception) {
				console.log('get exception:', exception);
				reject({
					code: 1,
					msg: '导入失败',
				});
			}
		});
	} catch (exception) {
		// console.log('get exception:', exception);
		return {
			code: 1,
			msg: '导入失败',
		};
	}
};

// 批量导出
const handleBatchExport = async () => {
	let searchParams = Object.assign({}, proTableRef.value.getParams());
	delete searchParams.size;
	delete searchParams.current;
	delete searchParams.startEndTime;

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
			const createById = storeObj.state.userInfos.userInfos.id
			const newData = Object.assign({}, data, { createBy: createById })
			preBybatchExport(newData).then((res) => {
				if (res.code && res.code !== 200) {
					ElMessage.error(res.msg);
				}
				exportFile(true);
			});
		});
};
// 一键派单
const handleDispath = () => {
	// console.log("一键派单",state.selectionChangeList);
	dispathLoading.value = true;
	const idsArr = [];
	state.selectionChangeList.map((item) => {
		idsArr.push(item.id);
	});
	// const params = {
	// 	// idStr: idsArr.length ? idsArr.join(',') : '',
	// };
	ElMessageBox.confirm('是否确定一键派单？', '提示', {
		type: 'warning',
	})
		.then(() => {
			preBybatchDispatch(idsArr).then((res) => {
				if (res.code == 200) {
					ElMessage.success(res.msg || '一键派单成功');
					refresh();
				} else {
					ElMessage.error(res.msg || '一键派单失败');
				}
			}).finally(() => {
			dispathLoading.value = false;
		});
		})
		.catch(() => {
			console.log('取消');
			dispathLoading.value = false;
		})
};

// 置灰按钮
const isGray = (row) => {
	return row.preStatus == '2';
};

// 获取项目/社保/公积金
const requestList = async (params, method) => {
	try {
		const type = method;
		switch (type) {
			case 'getProjectName':
				const res = await getProjectName(params);
				if (res.code == 200) {
					return {
						current: res.data.current,
						total: res.data.total,
						data: res.data.records,
					};
				} else {
					ElMessage.error(res.msg);
				}
				break;
			case 'getSocialAccount':
				const res1 = await getSocialAccount(params);
				if (res1.code == 200) {
					return {
						current: res1.data.current,
						total: res1.data.total,
						data: res1.data.records,
					};
				} else {
					ElMessage.error(res1.msg);
				}
				break;
			case 'getFundAccount':
				const res2 = await getFundAccount(params);
				if (res2.code == 200) {
					return {
						current: res2.data.current,
						total: res2.data.total,
						data: res2.data.records,
					};
				} else {
					ElMessage.error(res2.msg);
				}
				break;
		}
	} catch (error) {
		console.log('数据请求', error);
	}

	return {
		current: 1,
		total: 0,
		data: [],
	};
};


const state = reactive({
	// 批量导入自定义弹窗
	batchExtParams: [
		{
			dataIndex: 'departId',
			title: '项目名称',
			position: 'header',
			type: 'page-select',
			config: {
				request: (params) => requestList(params, 'getProjectName'),
				valueKey: 'departNo',
				title: 'departName',
				search: 'departName',
				placeholder: '请选择项目名称',
				onChange: (val) => {
					// console.log('get eleContract info:', val);
				},
			},
		},
	],
	// 批量导入校验规则
	batchRules: {
		departId: [{ required: true, message: '请选择项目名称', trigger: 'change' }],
		socialHouse: [{ required: true, message: '请选择社保户名', trigger: 'change' }],
	},
	searchConfig: {
		labelWidth: 110,
		option: {
			extBtn: 'extBtns',
		},
	},
	columns: [
		{
			dataIndex: 'id',
			title: 'ID',
			minWidth: 180,
			hideInSearch: true,
		},
		{
			dataIndex: 'empName',
			title: '员工姓名',
			minWidth: 120,
			tooltip: true,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			minWidth: 200,
		},
		{
			dataIndex: 'customerName',
			title: '客户名称',
			minWidth: 220,
			tooltip: true,
		},
		{
			dataIndex: 'payAddress',
			title: '缴费地',
			minWidth: 200,
			hideInSearch: true,
			tooltip: true,
		},
		{
			dataIndex: 'type',
			title: '增减类型',
			minWidth: 140,
			tag: {
				0: { type: 'success', },
				1: { type: 'danger', },
			}
		},
		{
			dataIndex: 'preStatus',
			title: '单据状态',
			minWidth: 140,
		},
		{
			dataIndex: 'dispatchFlag',
			title: '是否派单',
			minWidth: 140,
			hideInSearch: true,
			align: 'center',
			switch: {
				activeValue: '0',
				inactiveValue: '1',
			},
		},
		{
			dataIndex: 'dataSubStatus',
			title: '资料是否提交',
			minWidth: 140,
			align: 'center',
			switch: {
				activeValue: '0',
				inactiveValue: '1',
			},
		},
		{
			dataIndex: 'remark',
			title: '备注',
			minWidth: 200,
			tooltip: true,
			hideInSearch: true,
		},
		{
			dataIndex: 'createTime',
			title: '导入日期',
			minWidth: 180,
			searchIndex: 'startEndTime',
			startTime: 'createTimeStart',
			endTime: 'createTimeEnd',
			valueType: 'dateTimeRange',

			valueFormat: 'YYYY-MM-DD HH:mm:ss',
			format: 'YYYY-MM-DD',
			selectType: 'daterange',
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			minWidth: 240,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],

	btn: [
		{
			label: '批量派增',
			onClick: () => handleBatch('add'),
			permission: ['social_tpredispatchinfo_importAddList'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '批量派减',
			onClick: () => handleBatch('reduce'),
			permission: ['social_tpredispatchinfo_importAddList'],
			icon: 'icon-ic_edit_add',
			type: 'normal',
		},
		{
			label: '批量更新',
			onClick: () => handleBatch('update'),
			permission: ['social:tpredispatchinfo_updateList'],
			type: 'normal',
			icon: 'icon-ic_edit_add',
		},
		{
			label: '导出',
			onClick: handleBatchExport,
			permission: ['social:tpredispatchinfo_doexportPreDispatch'],
			type: 'normal',
			icon: 'icon-ic_edit_export',
		},
		{
			label: '一键派单',
			onClick: handleDispath,
			permission: ['social_tpredispatchinfo_dispatch'],
			loading: dispathLoading,
			type: 'normal',
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: ['social_tpredispatchinfo_get'], // 权限标识
		},
		{
			text: '修改',
			prop: 'edit', // 唯一标识
			permission: ['social_tpredispatchinfo_get', 'social_tpredispatchinfo_edit'], // 权限标识
		},
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: ['social_tpredispatchinfo_del'], // 权限标识
			isGray: isGray, // 是否灰色
		},
		{
			text: '派单',
			prop: 'send', // 唯一标识
			permission: ['social_tpredispatchinfo_dispatch'], // 权限标识
		},
	],
	dictKeys: [
		'send_order_type', //派单类型
		'pre_send_status', //单据状态
		'data_submit_status', //资料是否提交
		'is_send_order', //是否派单
	], //字典项,
	selectionChangeList: [],
	dictData: {}, //字典数据
});

const { columns, cellBtns, btn, searchConfig } = toRefs(state);

const selectionChange = (selection) => {
	state.selectionChangeList = selection;
};

const request = async (params) => {
	try {
		const res = await getpresendorderList(params);
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

// 是否派单
const switchChange = (val, item, type) => {
	switch (type) {
		case 'dispatchFlag':
			changeDispatchFlag(val, item);
			break;
		case 'dataSubStatus':
			changeDataSubStatus(val, item);
			break;
	}
};

const changeDispatchFlag = (val, item) => {
	if (val == 0) {
		ElMessageBox.confirm(`是否确定派单？`, '提示', {
			type: 'warning',
		})
			.then(async () => {
				try {
					const res = await editPreBydispatchFlag({ id: item.id, dispatchFlag: 0 });
					if (res && res.code === 200) {
						ElMessage.success('派单成功');
						refresh();
					} else {
						ElMessage.error(res.msg || '派单失败');
					}
				} catch (e) {
					console.log(e);
					ElMessage.error(e.sag || '派单失败');
				}
			})
			.catch(() => { });
	} else {
		if (ispresend.value) ispresend.value.openDialog(item);
	}
};

// 资料是否提交
const changeDataSubStatus = (val, item) => {
	ElMessageBox.confirm(`是否确定${val == '0' ? '提交' : '取消提交'}资料？`, '提示', {
		type: 'warning',
	})
		.then(async () => {
			try {
				const res = await editPreByisSubmit({ ids: item.id, status: val });
				if (res && res.code === 200) {
					ElMessage.success(val == '0' ? '提交成功' : '取消成功');
					refresh();
				} else {
					ElMessage.error(res.msg || val == '0' ? '提交失败' : '取消失败');
				}
			} catch (e) {
				console.log(e);
				ElMessage.error(e.sag || val == '0' ? '提交失败' : '取消失败');
			}
		})
		.catch(() => { });
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'detail':
			router.push({
				name: 'pre-order-detail',
				params: {
					id: item.id,
				},
			});
			break;
		case 'edit':
			router.push({
				name: 'pre-order-edit',
				params: {
					id: item.id,
				},
			});
			break;
		case 'delete':
			ElMessageBox.confirm(`是否确定删除？`, '提示', {
				type: 'warning',
			})
				.then(async () => {
					try {
						const res = await deletePresendorder(item.id);
						if (res && res.code === 200) {
							ElMessage.success('删除成功');
							refresh();
						} else {
							ElMessage.error(res.msg || '删除失败');
						}
					} catch (e) {
						ElMessage.error(e.sag || '删除失败');
					}
				})
				.catch(() => { });
			break;
		case 'send':
			ElMessageBox.confirm(`是否确定派单？`, '提示', {
				type: 'warning',
			})
				.then(async () => {
					try {
						const res = await dispatchPreById({ id: item.id });
						if (res && res.code === 200) {
							ElMessage.success('派单成功');
						
						} else {
							ElMessage.error(res.msg || '派单失败');
						}
					} catch (e) {
						console.log(e);
						ElMessage.error(e.sag || '派单失败');
					}
				})
				.catch(() => { }).finally(()=>{
					refresh();
				});
			break;
	}
};

// 字典获取
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		// console.log(res);
		if (res) {
			// 列表赋值
			state.columns.map((item) => {
				switch (item.dataIndex) {
					case 'type': //派单类型
						item.valueEnum = res['send_order_type'];
						break;
					case 'preStatus': //单据状态
						item.valueEnum = res['pre_send_status'];
						break;
					case 'dispatchFlag': //是否派单
						item.valueEnum = res['is_send_order'];
						break;
					case 'dataSubStatus': //资料提交
						item.valueEnum = res['data_submit_status'];
						break;
				}
				return item;
			});
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

const listener = () => {
	onRefresh(proxy, route.path, () => {
		refresh();
	});
};

onUnmounted(() => {
	offRefresh(proxy);
});

onMounted(() => {
	loadDicts();
	listener();
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
