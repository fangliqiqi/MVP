<template>
	<div class="contract-apply-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="state.columns"
			:request="request"
			:btn="state.btn"
			@onReset="onReset"
			manualRequest
			:searchConfig="state.searchConfig"
		>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

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
								<a href="/template/电子合同导入模板.xls" download> 批量导入模板</a>
							</el-dropdown-item>
							<!-- <el-dropdown-item>
								<a href="/template/电子合同导入或更新模板.xls" download> 批量更新模板</a>
							</el-dropdown-item> -->
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
		</pro-table>

		<!--批量导入弹框-->
		<batch-import-dialog
			ref="batchImportDialog"
			:type="1"
			:header="ELE_CONTRACT_IMPORT_HEADER"
			@ok="refreshList"
			batchName="ele-contract-batch-import"
			:errorHeader="ERROR_HEADER"
			:errorData="batchErrorData"
			:upload="batchImport"
			:ext-params="state.batchExtParams"
			:rules="state.batchRules"
			customError
			download
		/>

		<!--批量更新弹框-->
		<batch-import-dialog
			title="批量更新"
			:type="1"
			ref="batchUpdateDialog"
			:header="ELE_CONTRACT_IMPORT_HEADER"
			:upload="batchUpdate"
			@ok="refreshList"
			batchName="ele-contract-batch-update"
			:errorHeader="ERROR_HEADER"
			:errorData="batchErrorData"
			:ext-params="state.batchExtParams"
			:rules="state.batchRules"
			customError
			download
		/>
	</div>
</template>

<script setup name="电子合同">
import ProTable from '/@/components/ProTable/ProTable.vue';
import {
	getEleContractList,
	sendEleContract,
	sendSign,
	getSeal,
	resign,
	signPreview,
	signDownload,
	tansferEleContract,
	batchAddFddEmpInfo,
	batchUpdateFddEmpInfo,
	getEleContractTemplateList,
	sendTask,
} from '/@/api/eleContract';
import ProButtons from '/@/components/ProButtons/index.vue';
import { getCityLevelJson, idToArea } from '/@/utils/city';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { ELE_CONTRACT_OVERTIME_FLAG } from '/@/utils/dicts';
import { getDictByItemTypes } from '/@/utils/utils';
import BatchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { ELE_CONTRACT_IMPORT_HEADER, ERROR_HEADER } from '/@/utils/header';
import { readExcel } from '/@/utils/xlsx';

const proTableRef = ref(null);

const batchImportDialog = ref(null);
const batchUpdateDialog = ref(null);

const onReset = () => {
	state.params = {};
};

onMounted(() => {
	loadDicts();
	const json = getCityLevelJson();
	state.areaJson = json;
});

const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
			state.columns = state.columns.map((item) => {
				const target = { ...item };
				switch (item.dataIndex) {
					case 'type':
						target.valueEnum = res['personnel_type']; // 合同类型
						break;
				}
				return target;
			});
			if (proTableRef.value) proTableRef.value.refresh();
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

const request = async (params) => {
	try {
		const p = Object.assign({}, params, state.params);
		delete p.fileAddress;
		const res = await getEleContractList(p);
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

const refreshList = () => {
	if (proTableRef.value) proTableRef.value.refresh();
};

const onCellClick = async (prop, item) => {
	const loading = ElLoading.service({
		lock: true,
		text: '请求中...',
		background: 'rgba(0, 0, 0, 0.7)',
		'custom-class': 'dept-global-loading',
	});

	switch (prop) {
		case 'send':
			// 发送合同
			sendEleContract(item.id)
				.then(
					(res) => {
						if (res && res.code == 200) {
							ElMessage.success('操作成功');
							refreshList();
						} else {
							ElMessage.error(res.msg || '操作失败');
						}
					},
					(error) => {
						ElMessage.error((error && error.msg) || '操作失败');
					}
				)
				.finally(() => {
					if (loading) loading.close();
				});
			break;

		case 'sign':
			// 发送签署
			sendSign(item.fddContractId)
				.then(
					(res) => {
						if (res && res.code == 200) {
							ElMessage.success('操作成功');
							refreshList();
						} else {
							ElMessage.error(res.msg || '操作失败');
						}
					},
					(error) => {
						ElMessage.error((error && error.msg) || '操作失败');
					}
				)
				.finally(() => {
					if (loading) loading.close();
				});
			break;

		case 'seal':
			// 盖章
			getSeal(item.fddContractId)
				.then(
					(res) => {
						if (res && res.code == 200) {
							let signUrl = '';
							const companyList = res.data.company || [];
							if (companyList && companyList.length) {
								signUrl = companyList[0].signUrl;
							}
							if (signUrl) {
								window.open(signUrl);
								ElMessage.success('操作成功');
								refreshList();
							} else {
								ElMessage.error('文件地址有误！');
							}
						} else {
							ElMessage.error(res.msg || '接口请求出错！');
						}
					},
					(error) => {
						ElMessage.error((error && error.msg) || '操作失败');
					}
				)
				.finally(() => {
					if (loading) loading.close();
				});
			break;
		case 'resign':
			// 作废重签
			resign(item.fddContractId)
				.then(
					(res) => {
						if (res && res.code == 200) {
							ElMessage.success('操作成功');
							refreshList();
						} else {
							ElMessage.error(res.msg || '操作失败');
						}
					},
					(error) => {
						ElMessage.error((error && error.msg) || '操作失败');
					}
				)
				.finally(() => {
					if (loading) loading.close();
				});
			break;

		case 'preview':
			// 签署文件预览
			signPreview(item.fddContractId)
				.then(
					(res) => {
						if (res && res.code == 200) {
							ElMessage.success('操作成功');
							window.open(res.data);
							refreshList();
						} else {
							ElMessage.error(res.msg || '操作失败');
						}
					},
					(error) => {
						ElMessage.error((error && error.msg) || '操作失败');
					}
				)
				.finally(() => {
					if (loading) loading.close();
				});
			break;

		case 'download':
			// 签署文件下载
			signDownload(item.fddContractId)
				.then(
					(res) => {
						const data = res;
						const fileReader = new FileReader();
						fileReader.onload = function () {
							try {
								const jsonData = JSON.parse(fileReader.result);
								let msg = '下载失败';
								if (jsonData.msg) {
									// 说明是普通对象数据，后台转换失败
									msg += `,${jsonData.msg}`;
								}
								ElMessage.error(msg);
								return;
							} catch (err) {
								// 解析成对象失败，说明是正常的文件流
								const blob = new Blob([res], { type: 'application/zip' });
								const downloadElement = document.createElement('a');
								const href = window.URL.createObjectURL(blob); // 创建下载的链接
								downloadElement.href = href;
								downloadElement.download = '签署文件.zip'; // 下载后文件名
								document.body.appendChild(downloadElement);
								downloadElement.click(); // 点击下载
								document.body.removeChild(downloadElement); // 下载完成移除元素
								window.URL.revokeObjectURL(href); // 释放掉blob对象
							}
						};
						fileReader.readAsText(data);
					},
					(error) => {
						ElMessage.error((error && error.msg) || '操作失败');
					}
				)
				.finally(() => {
					if (loading) loading.close();
				});
			break;

		case 'transfer':
			// 转移附件到合同
			tansferEleContract(item.fddContractId)
				.then(
					(res) => {
						if (res && res.code == 200) {
							ElMessage.success(res.msg || '操作成功');
							refreshList();
						} else {
							ElMessage.error(res.msg || '操作失败');
						}
					},
					(error) => {
						ElMessage.error((error && error.msg) || '操作失败');
					}
				)
				.finally(() => {
					if (loading) loading.close();
				});
			break;
		default:
			if (loading) loading.close();
			break;
	}
};

// 获取合同模板
const requestTemplate = async (params) => {
	try {
		const res = await getEleContractTemplateList(params);
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

const getExcelData = async (file, params, postMethod) => {
	try {
		const excelData = await readExcel(file.raw);
		/**
		 * 遍历所有的sheet表
		 */
		let list = [...excelData[0].data];
		const content = list.map((item) => {
			const keys = Object.keys(item);
			const target = {};
			keys.forEach((key) => {
				if (!key.startsWith('__EMPTY')) {
					target[key] = item[key];
				}
			});
			target['法大大模板id'] = params.fddTemplateId;
			return target;
		});

		return new Promise(async (resolve, reject) => {
			try {
				const res = await postMethod(JSON.stringify(content));
				const msg = res.message || res.msg || '导入失败';

				if (res && res.data && Array.isArray(res.data) && res.data.length) {
					// 存在错误信息
					resolve({
						code: 1,
						msg,
						data: res.data,
					});
				} else if (res && res.data && res.data.allMatch == 'true') {
					// 是否仍然导入?确定,全部发送合同;取消,合同信息不插入,修改后再全量导入

					const data = res.data.data;
					const keys = Object.keys(data);
					const tips = `<div style="color:red">第${keys.join('、')}行，${
						res.msg || '存在“在用的合同”'
					} </div><div style="margin-top:30px;">确定后将全部发送合同，否则合同信息不插入,修改后再全量导入，是否继续？ </div>`;

					ElMessageBox.confirm(tips, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						// type: 'warning',
						dangerouslyUseHTMLString: true,
					})
						.then(
							async () => {
								try {
									const taskRes = await sendTask(Object.values(data));
									const msg = taskRes.message || taskRes.msg || '导入失败';
									if (taskRes && taskRes.data && taskRes.data.length) {
										resolve({
											code: 1,
											msg,
											data: taskRes.data,
										});
									} else if (taskRes && taskRes.code == 200) {
										ElMessage.success('操作成功');
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
								} catch (e) {
									reject({
										code: 1,
										msg: '导入失败',
									});
								}
							},
							(error) => {
								if (batchImportDialog.value) batchImportDialog.value.closeDialog();
							}
						)
						.catch(() => {
							if (batchImportDialog.value) batchImportDialog.value.closeDialog();
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

		// console.log('getExcelData res:', res);
		// const msg = res.message || res.msg || '导入失败';
		// if (res && res.data && res.data.length) {
		// 	// 存在错误信息
		// } else if (res && res.code === 200) {
		// 	return {
		// 		code: 200,
		// 		msg: '导入成功',
		// 		data: null,
		// 	};
		// } else {
		// 	return {
		// 		code: 1,
		// 		msg,
		// 		data: null,
		// 	};
		// }
	} catch (exception) {
		console.log('get exception:', exception);
		return {
			code: 1,
			msg: '导入失败',
		};
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

const batchImport = async (params) => {
	// console.log('get batchImport:', params);
	const { file } = params;
	return await getExcelData(file, params, batchAddFddEmpInfo);
	// 批量导入数据
};

const batchUpdate = async (params) => {
	const { file } = params;
	// console.log('get params:',params)
	// 批量更新数据
	return await getExcelData(file, params, batchUpdateFddEmpInfo);
};

const state = reactive({
	areaJson: null,
	batchExtParams: [
		{
			dataIndex: 'fddTemplateId',
			title: '合同模板',
			position: 'header',
			type: 'page-select',
			config: {
				request: requestTemplate,
				valueKey: 'fddTemplateId',
				title: 'localName',
				search: 'localName',
				placeholder: '请选择合同模板',
				onChange: (val) => {
					console.log('get eleContract info:', val);
				},
			},
		},
	],
	batchRules: {
		fddTemplateId: [{ required: true, message: '请选择合同模板', trigger: 'change' }],
	},
	areaProps: {
		label: 'areaName',
		isLeaf: 'isLeaf',
		children: 'children',
	},
	dictKeys: ['personnel_type'],
	params: {},
	searchConfig: {
		labelWidth: 110,
		option: {
			extBtn: 'extBtns',
		},
	},
	btn: [
		{
			label: '批量导入',
			onClick: () => {
				if (batchImportDialog.value) batchImportDialog.value.openDialog();
			},
			permission: ['employee_batch_import'],
			icon: 'icon-ic_edit_upload',
		},
		// {
		// 	label: '批量更新',
		// 	type: 'default',
		// 	onClick: () => {
		// 		if (batchUpdateDialog.value) {
		// 			// 批量更新
		// 			batchUpdateDialog.value.openDialog();
		// 		}
		// 	},
		// 	permission: ['employee_batch_update'],
		// 	icon: 'icon-ic_edit_refresh',
		// },
	],
	cellBtns: [
		{
			text: '发送合同',
			prop: 'send', // 唯一标识
			permission: ['demo_fddcontracttemplate_edit'],
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return record.fddContractId != null;
			},
		},
		{
			text: '发送签署',
			prop: 'sign', // 唯一标识
			permission: ['demo_fddcontracttemplate_preview'],
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !(record.draftId != null && record.signTaskId == null);
			},
		},
		{
			text: '盖章',
			prop: 'seal', // 唯一标识
			permission: ['demo_fddcontracttemplate_preview'],
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !(Number(record.receiveSignStatus) === 2 && Number(record.sendSignStatus) === 1);
			},
		},
		{
			text: '作废重签',
			prop: 'resign', // 唯一标识
			permission: ['demo_fddcontracttemplate_upkeep'],
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !(Number(record.sendSignStatus) !== 2 && record.taskId != null);
			},
		},
		{
			text: '签署文件预览',
			prop: 'preview',
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !record.signTaskId;
			},
		},
		{
			text: '签署文件下载',
			prop: 'download',
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !record.signTaskId;
			},
		},
		{
			text: '转移附件到合同',
			prop: 'transfer',
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !(record.isMove == 0 && record.signTaskId && record.signStatus == 2);
			},
		},
	],
	columns: [
		{
			dataIndex: 'empName',
			title: '员工姓名',
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			minWidth: 180,
		},
		{
			dataIndex: 'departNo',
			title: '项目编码',
			hideInSearch: true,
			minWidth: 160,
			ellipsis: true,
		},

		{
			dataIndex: 'empPhone',
			title: '手机号码',
			minWidth: 160,
			hideInSearch: true,
		},
		{
			dataIndex: 'contractStart',
			title: '合同起始日期',
			dateFormat: 'YYYY-MM-DD',
			minWidth: 160,
			hideInSearch: true,
		},
		{
			dataIndex: 'contractEnd',
			title: '合同截止日期',
			minWidth: 160,
			hideInSearch: true,
			dateFormat: 'YYYY-MM-DD',
			ellipsis: true,
		},
		{
			dataIndex: 'periodStart',
			title: '合同试用期开始时间',
			dateFormat: 'YYYY-MM-DD',
			minWidth: 160,
			hideInSearch: true,
			ellipsis: true,
		},
		{
			dataIndex: 'periodEnd',
			title: '合同试用期结束时间',
			dateFormat: 'YYYY-MM-DD',
			minWidth: 160,
			hideInSearch: true,
			ellipsis: true,
		},
		{
			dataIndex: 'periodSalaryPerMonth',
			title: '试用期工资',
			minWidth: 160,
			hideInSearch: true,
			ellipsis: true,
		},
		{
			dataIndex: 'salaryType',
			title: '工资形式',
			minWidth: 160,
			hideInSearch: true,
			ellipsis: true,
			valueEnum: { 1: '计时工资', 2: '计件工资', 3: '其他' },
		},
		{
			dataIndex: 'salaryStandardPerHour',
			title: '计时工资',
			minWidth: 160,
			hideInSearch: true,
			ellipsis: true,
		},
		{
			dataIndex: 'salaryStandardPerPiece',
			title: '计件工资',
			minWidth: 160,
			hideInSearch: true,
			ellipsis: true,
		},
		{
			dataIndex: 'workSpace',
			title: '工作地点',
			hideInSearch: true,
			minWidth: 180,
		},
		{
			dataIndex: 'taskId',
			title: '定稿任务发送状态',
			hideInSearch: true,
			minWidth: 180,
			formatter: (record) => {
				return record.taskId == null ? '未发送' : '已发送';
			},
		},
		{
			dataIndex: 'signTaskId',
			title: '签署任务发送状态',
			hideInSearch: true,
			minWidth: 180,
			formatter: (record) => {
				return record.signTaskId == null ? '未发送' : '已发送';
			},
		},
		{
			dataIndex: 'signStatus',
			title: '签署状态',
			hideInSearch: true,
			minWidth: 180,
			valueEnum: {
				1: '未签署',
				2: '已签署',
				4: '已拒签',
				5: '已撤销',
			},
		},
		{
			dataIndex: 'sendSignStatus',
			title: '签署发送方状态',
			hideInSearch: true,
			minWidth: 180,
			valueEnum: {
				1: '未签署',
				2: '已签署',
				3: '已拒签',
				4: '已撤销',
			},
		},
		{
			dataIndex: 'receiveSignStatus',
			title: '签署接收方状态',
			hideInSearch: true,
			valueType: 'custom',
			minWidth: 180,
			valueEnum: {
				1: '未签署',
				2: '已签署',
				3: '已拒签',
				4: '已撤销',
			},
		},
		{
			dataIndex: 'taskStatus',
			title: '定稿状态',
			hideInSearch: true,
			minWidth: 180,
			valueEnum: {
				1: '未定稿',
				2: '定稿成功',
			},
		},
		{
			dataIndex: 'remark',
			title: '定稿备注',
			hideInSearch: true,
			minWidth: 180,
		},
		{
			dataIndex: 'signRemark',
			title: '签署备注',
			hideInSearch: true,
			minWidth: 180,
		},
		{
			dataIndex: 'createName',
			title: '创建用户',
			hideInSearch: true,
			minWidth: 180,
		},
		{
			dataIndex: 'createTime',
			title: '创建时间',
			hideInSearch: true,
			minWidth: 180,
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 320,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
});
</script>
<style lang="scss" scoped src="./css/eleContract.scss">

</style>
