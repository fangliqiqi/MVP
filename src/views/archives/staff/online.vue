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
		>
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
								<a href="/template/人员档案批量导入模板.xlsx" download> 批量导入模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/人员档案批量更新模板.xlsx" download> 批量更新模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/人员档案批量减档模板.xlsx" download> 批量减档模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>

			<template v-slot:fileAddress="item">
				<el-tree-select
					v-model="params.fileAddress"
					:key="'arch_search_props_' + item.dateIndex + '_' + 'oIndex'"
					style="width: 100%"
					placeholder="请选择"
					:props="areaProps"
					@current-change="changeFileAddress"
					@clear="clearFileAddress"
					node-key="id"
					:load="loadArea"
					check-strictly
					lazy
					clearable
				/>
			</template>

			<template v-slot:empAgeStart="item">
				<el-input-number
					v-model="params.empAgeStart"
					placeholder="请输入"
					:min="1"
					:max="100"
					:precision="0"
					:step="1"
					:controls="false"
					:style="{ width: '100%' }"
				/>
			</template>
			<template v-slot:empAgeEnd="item">
				<el-input-number
					v-model="params.empAgeEnd"
					placeholder="请输入"
					:min="1"
					:precision="0"
					:step="1"
					:controls="false"
					:style="{ width: '100%' }"
				/>
			</template>

			<template v-slot:projectNum="item">
				<a href="#" @click="toSubject(item)">{{ item.projectNum }}</a>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!--新增校验弹框-->
		<check-info-vue ref="checkInfoDialog" @ok="refreshList"></check-info-vue>
		<downshift-dialog ref="downshiftDialog" @ok="refreshList"></downshift-dialog>

		<!--批量导入弹框-->
		<batch-import-dialog
			ref="batchImportDialog"
			:type="1"
			:header="STAFF_IMPORT_HEADER"
			url="/yifu-archives/method/temployeeinfo/batchImportEmployee"
			demobilize
			@ok="refreshList"
			batchName="staff-batch-import"
			demobilizeParamsName="isCanAdd"
			:errorHeader="STAFF_IMPORT_ERROR_HEADER"
			:errorData="batchErrorData"
			customError
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量导入失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!--批量更新弹框-->
		<batch-import-dialog
			title="批量更新"
			ref="batchUpdateDialog"
			:header="STAFF_BATCH_UPDATE_HEADER"
			url="/yifu-archives/method/temployeeinfo/batchUpdateEmployee"
			@ok="refreshList"
			batchName="staff-batch-update"
			:valid="validBatchUpdateSheet"
			:errorHeader="STAFF_IMPORT_ERROR_HEADER"
			:errorData="batchErrorData"
			customError
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量更新失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!--批量减档弹框-->
		<batch-import-dialog
			title="批量减档"
			ref="batchDownshiftDialog"
			:type="1"
			@ok="refreshList"
			:header="STAFF_DOWNSHIFT_HEADER"
			batchName="staff-batch-downshift"
			url="/yifu-archives/method/temployeeinfo/batchMinusEmployee"
			:errorHeader="ERROR_HEADER"
			:errorData="batchErrorData"
			customError
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量减档失败！</div>
					<!--反馈信息,更换提示-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!--批量删除弹框-->
		<batch-import-dialog
			title="批量删除"
			ref="batchDeleteDialog"
			:type="1"
			@ok="refreshList"
			errName="员工档案批量删除"
			batchName="staff-batch-delete"
			:errorHeader="STAFF_BATCH_DEL_ERROR_HEADER"
			:errorData="batchErrorData"
			customError
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量删除失败！</div>
					<!--反馈信息-->
					<span>该档案存在进行中/已完结的服务！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<export-excel-dialog 
			ref="exportExcelRef" 
			:heads="STAFF_EXPORT_HEADER" 
			title="员工档案导出" 
			useCode="hro:archives-online-batch-export"
		/>
	</div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue';
import { getStaffList, delStaffInfo, exportStaffList, batchDeleteStaff } from '/@/api/staff';
import { getDictByItemTypes } from '/@/utils/utils';
import { SALARY_STATUS_OPTION } from '/@/utils/dicts';

import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import checkInfoVue from './component/checkInfo.vue';
import downshiftDialog from './component/downshiftDialog.vue';
import { ElMessageBox } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import BatchImportDialog from '/@/components/BatchImportDialog/index.vue';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import { useRouter, useRoute } from 'vue-router';
import { validImportSheet } from '/@/utils/xlsx';
import { onRefresh, offRefresh } from '/@/utils/events';
import {
	STAFF_IMPORT_HEADER,
	STAFF_BATCH_UPDATE_HEADER,
	STAFF_UPDATE_HEADER,
	STAFF_EXPORT_HEADER,
	STAFF_DOWNSHIFT_HEADER,
	STAFF_IMPORT_ERROR_HEADER,
	ERROR_HEADER,
	STAFF_BATCH_DEL_ERROR_HEADER,
} from '/@/utils/header';
import { getAreaJson, loadNode, idToArea } from '/@/utils/city';

export default {
	name: '在档人员',
	components: {
		ProTable,
		ProButtons,
		ArrowDown,
		checkInfoVue,
		downshiftDialog,
		BatchImportDialog,
		ExportExcelDialog,
	},
	setup() {
		const router = useRouter();
		const route = useRoute();
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const proTableRef = ref(null);
		const checkInfoDialog = ref(null);
		const downshiftDialog = ref(null);
		const batchImportDialog = ref(null);
		const batchUpdateDialog = ref(null);
		const exportExcelRef = ref(null);
		const batchDownshiftDialog = ref(null);
		const batchDeleteDialog = ref(null);
		const { proxy } = getCurrentInstance();
		const handleAddClick = () => {
			if (checkInfoDialog.value) {
				checkInfoDialog.value.openDialog();
			}
		};

		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};

		const batchImport = () => {
			if (batchImportDialog.value) batchImportDialog.value.openDialog();
		};

		// 批量更新表头校验
		const validBatchUpdateSheet = async (values) => {
			const file = values.file.raw;
			const data = await validImportSheet(file, STAFF_BATCH_UPDATE_HEADER, 0, null, STAFF_UPDATE_HEADER);
			// console.log('导入表头校验', data);
			if (data && Array.isArray(data) && data.length) {
				return { code: 200 };
			} else if (data && data.code && data.code == 1) {
				return {
					code: 1,
					msg: `表格数据为空，请检查表格数据是否正确`,
				};
			} else {
				return {
					code: 1,
					msg: `请检查你的表头信息，并确保与批量更新模板一致`,
				};
			}
		};

		// 批量删除
		const handleDeleteClick = () => {
			if (!state.selectionChangeList || state.selectionChangeList.length === 0) {
				message.error('请先选择待删除的人员档案');
				return;
			}
			const text = `<p style="font-size:16px;font-weight:600">是否确定删除${state.selectionChangeList.length}条档案?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，档案将从系统消失，请谨慎操作！</span></p>`;
			ElMessageBox.confirm(text, {
				type: 'warning',
				dangerouslyUseHTMLString: true,
			})
				.then(async () => {
					try {
						const ids = state.selectionChangeList.map((item) => item.id);
						const res = await batchDeleteStaff(ids);

						if (res && res.code === 200) {
							message.success('档案批量删除成功');
							refreshList();
						} else {
							if (res.data && batchDeleteDialog.value) {
								batchDeleteDialog.value.openErrorDialog(res.data);
							}
							// message.error(res.msg || '删除失败');
						}
					} catch (e) {
						message.error('删除失败');
					}
				})
				.catch(() => {});
		};

		// 批量导出
		const handleBatchExport = () => {
			let searchParams = Object.assign({}, proTableRef.value.getParams(), state.params);
			delete searchParams.size;
			delete searchParams.current;
			for(let s in searchParams){
				if(searchParams[s] instanceof Array && searchParams[s].length === 0||s==='fileAddress'){
					delete searchParams[s]
				}
			}
			
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
					exportStaffList({}, data).then((res) => {
						if (res.code && res.code !== 200) {
							ElMessageBox.error(res.msg);
						}
						exportFile(true);
					});
				});
		};

		const state = reactive({
			searchConfig: {
				labelWidth: 110,
				option: {
					extBtn: 'extBtns',
				},
			},
			columns: [
				{
					dataIndex: 'empCode',
					title: '员工主码',
					minWidth: 140,
					tooltip: true,
					fixed: 'left',
				},
				{
					dataIndex: 'empName',
					title: '员工姓名',
					minWidth: 160,
				},
				{
					dataIndex: 'empIdcard',
					title: '身份证号',
					minWidth: 200,
				},
				{
					dataIndex: 'empNatrue',
					title: '员工类型',
					minWidth: 180,
					multiple: true,
					hideInTable: true,
					searchIndex: 'empNatureArray',
				},
				{
					dataIndex: 'empAge',
					title: '年龄(岁)',
					minWidth: 100,
					hideInSearch: true,
				},
				{
					dataIndex: 'empAgeStart',
					title: '开始年龄',
					minWidth: 100,
					valueType: 'custom',
					placeholder: '请输入开始年龄(岁)',
					hideInTable: true,
					scopedSlots: { customRender: 'empAgeStart' },
				},
				{
					dataIndex: 'empAgeEnd',
					title: '截止年龄',
					placeholder: '请输入截止年龄(岁)',
					valueType: 'custom',
					minWidth: 100,
					hideInTable: true,
					scopedSlots: { customRender: 'empAgeEnd' },
				},
				{
					dataIndex: 'empPhone',
					title: '手机号码',
					minWidth: 140,
				},
				{
					dataIndex: 'address',
					title: '档案所在地',
					hideInSearch: true,
					minWidth: 180,
					ellipsis: true,
					formatter: (row) => {
						return idToArea({ province: row.fileProvince, city: row.fileCity, town: row.fileTown });
					},
				},
				{
					dataIndex: 'fileSource',
					title: '档案来源',
					hideInSearch: true,
					minWidth: 160,
					tooltip: true,
				},
				{
					dataIndex: 'empNatrue',
					title: '员工类型',
					minWidth: 180,
					multiple: true,
					hideInSearch: true,
					searchIndex: 'empNatureArray',
				},
				{
					dataIndex: 'createTime',
					title: '创建时间',
					hideInSearch: true,
					minWidth: 180,
				},
				{
					dataIndex: 'createName',
					title: '创建人',
					hideInSearch: true,
					minWidth: 160,
					tooltip: true,
				},
				{
					dataIndex: 'multi',
					title: '是否多项目',
					hideInSearch: true,
					minWidth: 120,
					formatter: (row) => {
						if (row.projectNum == null || row.projectNum == undefined) {
							return '--';
						}
						return row.projectNum > 1 ? '是' : '否';
					},
				},
				{
					dataIndex: 'projectNum',
					title: '现存项目数',
					hideInSearch: true,
					minWidth: 120,
					scopedSlots: {
						customRender: 'projectNum',
					},
				},

				{
					dataIndex: 'contractStatus',
					title: '合同状态',
					valueType: 'select',
					minWidth: 160,
					multiple: true,
					searchIndex: 'contractStatusArray',
				},
				{
					dataIndex: 'insuranceStatus',
					title: '商险状态',
					valueType: 'select',
					minWidth: 160,
					multiple: true,
					searchIndex: 'insuranceStatusArray',
				},
				{
					dataIndex: 'socialStatus',
					title: '社保状态',
					valueType: 'select',
					minWidth: 160,
					multiple: true,
					searchIndex: 'socialStatusArray',
				},

				{
					dataIndex: 'fundStatus',
					title: '公积金状态',
					valueType: 'select',
					minWidth: 160,
					multiple: true,
					searchIndex: 'fundStatusArray',
				},
				{
					dataIndex: 'fileAddress',
					title: '档案所在地',
					hideInTable: true,
					valueType: 'custom',
					scopedSlots: {
						customRender: 'fileAddress',
					},
				},
				{
					dataIndex: 'salaryStatus',
					title: '近3个月发薪',
					minWidth: 180,
					valueEnum: SALARY_STATUS_OPTION,
				},

				{
					dataIndex: 'status',
					title: '档案状态',
					minWidth: 180,
					valueEnum: {
						0: '草稿',
						1: '已审核',
					},
				},
				{
					dataIndex: 'projectNum',
					title: '是否多项目',
					hideInTable: true,
					minWidth: 180,
					valueEnum: {
						1: '否',
						2: '是',
					},
				},

				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 240,
					hideInSearch: true,
					fixed: 'right',
					scopedSlots: {
						customRender: 'option',
					},
				},
			],
			btn: [
				{
					label: '新增',
					onClick: handleAddClick,
					permission: ['temployeeinfo_add'],
					icon: 'icon-ic_edit_add',
				},
				{
					label: '批量导入',
					onClick: batchImport,
					type: 'default',
					permission: ['employee_batch_import'],
					icon: 'icon-ic_edit_upload',
				},
				{
					label: '批量更新',
					type: 'default',
					onClick: () => {
						if (batchUpdateDialog.value) {
							// 批量更新
							batchUpdateDialog.value.openDialog();
						}
					},
					permission: ['employee_batch_update'],
					icon: 'icon-ic_edit_refresh',
				},
				{
					label: '批量删除',
					type: 'default',
					onClick: handleDeleteClick,
					permission: ['temployeeinfo_batch_del'],
					icon: 'icon-ic_edit_delete',
				},
				{
					label: '批量导出',
					type: 'default',
					onClick: handleBatchExport,
					permission: ['hro:archives-online-batch-export'],
					icon: 'icon-ic_edit_export',
				},
				{
					label: '批量减档',
					type: 'default',
					onClick: () => {
						if (batchDownshiftDialog.value) batchDownshiftDialog.value.openDialog();
					},
					permission: ['temployeeinfo_batch_minus'],
					icon: 'icon-ic_edit_delete',
				},
			],
			cellBtns: [
				{
					text: '详情',
					prop: 'detail', // 唯一标识
				},
				{
					text: '编辑',
					prop: 'edit', // 唯一标识
					permission: ['temployeeinfo_edit'], // 权限标识
				},
				{
					text: '减档',
					prop: 'downshift', // 唯一标识
					permission: ['temployeeinfo_minus'], // 权限标识
				},
				{
					text: '删除',
					prop: 'delete', // 唯一标识
					permission: ['temployeeinfo_del'], // 权限标识
					tooltip: '当前状态不可删除',
					isGray: (item) => {
						return item.status != '0';
					},
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
			params: {},
			areaProps: {
				label: 'areaName',
				isLeaf: 'isLeaf',
				children: 'children',
			},
			selectionChangeList: [], // 列表多选选中的内容
		});

		const onReset = () => {
			state.params = {};
		};

		const selectionChange = (selection) => {
			state.selectionChangeList = selection;
		};

		const request = async (params) => {
			try {
				const p = Object.assign({}, params, state.params, { fileStatus: '0' }); // fileStatus: 0 正常 1 已减档
				delete p.fileAddress;

				const res = await getStaffList(p);
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

		const deleteCell = (item) => {
			const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，档案将从系统消失，请谨慎操作！</span></p>`;

			ElMessageBox.confirm(text, {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				dangerouslyUseHTMLString: true,
			})
				.then(async () => {
					try {
						const res = await delStaffInfo(item.id);
						if (res && res.code === 200) {
							message.success('档案删除成功');
							refreshList();
						} else {
							message.error(res.msg || '档案删除失败');
						}
					} catch (e) {
						console.log('get exception:', e);
						message.error((e && e.msg) || '档案删除失败');
					}
				})
				.catch(() => {});
		};

		const loadArea = (node, resolve) => {
			const level = node.level;
			const isLeaf = node.isLeaf;
			if (level === 0) {
				const data = loadNode(0);
				resolve(data);
			} else if (isLeaf) {
				return resolve([]);
			} else {
				return resolve(loadNode(node.data.id));
			}

			return resolve([]);
		};
		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'detail':
					router.push({ name: 'online-detail', params: { id: item.id } });
					break;
				case 'delete':
					// 删除操作
					deleteCell(item);
					break;

				case 'edit':
					router.push({ name: 'online-edit', params: { id: item.id } });
					break;
				case 'downshift':
					// 减档
					if (downshiftDialog.value) downshiftDialog.value.openDialog(item);
					break;
			}
		};
		// 跳转到项目档案（携带身份证）
		const toSubject = (item) => {
			router.push({ path: '/archives/subject', query: { projectIdCard: item.empIdcard } });
		};

		const changeFileAddress = (val, node) => {
			// console.log('get changeFileAddress val:', val, ',and node:', node);
			// 获取档案所在地
			const values = [val.id];
			if (node.parent && node.parent.level != 0) {
				// 获取市或者省
				values.unshift(node.parent.data.id);
				if (node.parent.parent && node.parent.parent.level != 0) {
					// 获取省
					values.unshift(node.parent.parent.data.id);
				}
			}

			let pro = null,
				city = null,
				town = null;
			pro = values[0] || null;
			if (values.length > 1) city = values[1] || null;
			if (values.length > 2) town = values[2] || null;
			// console.log(state.params.fileAddress)
			state.params.fileProvince = pro;
			state.params.fileCity = city;
			state.params.fileTown = town;
		};

		const clearFileAddress = () => {
			state.params.fileProvince = null;
			state.params.fileCity = null;
			state.params.fileTown = null;
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

		const listener = () => {
			onRefresh(proxy, route.path, () => {
				refreshList();
			});
		};

		onMounted(() => {
			loadDicts();
			listener();
		});

		onUnmounted(() => {
			offRefresh(proxy);
		});

		const batchErrorData = (prop, errorData) => {
			let data = null;
			switch (prop) {
				case 'staff-batch-import':
					// 人员档案批量导入
					data = errorData
						.map((item) => {
							const errors = item.errors || [];
							return {
								line: item.lineNum,
								isError: errors.length > 0 ? '是' : '否',
								error: errors.join(','),
							};
						})
						.sort((a, b) => Number(a.line) - Number(b.line));
					break;

				case 'staff-batch-downshift':
					// 人员档案批量减档
					data = errorData
						.map((item) => {
							const errors = item.errorSet || [];
							return {
								line: item.lineNum,
								error: errors.join(','),
							};
						})
						.sort((a, b) => Number(a.line) - Number(b.line));

					break;

				case 'staff-batch-update':
					// 人员档案批量更新
					data = errorData
						.map((item) => {
							const errors = item.errors || [];
							return {
								line: item.lineNum,
								isError: errors.length > 0 ? '是' : '否',
								error: errors.join(','),
							};
						})
						.sort((a, b) => Number(a.line) - Number(b.line));
					break;

				case 'staff-batch-delete':
					// 批量导出删除
					data = errorData
						.map((item) => {
							return {
								line: item.lineNum,
								empName: item.empName,
								empIdCard: item.empIdCard,
								result: item.result == 0 ? '否' : '是',
								error: item.errorSet.join(','),
							};
						})
						.sort((a, b) => Number(a.line) - Number(b.line));

					break;
			}

			return data;
		};

		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			checkInfoDialog,
			downshiftDialog,
			batchImportDialog,
			batchDownshiftDialog,
			refreshList,
			changeFileAddress,
			loadArea,
			clearFileAddress,
			batchUpdateDialog,
			STAFF_BATCH_UPDATE_HEADER,
			STAFF_IMPORT_HEADER,
			STAFF_EXPORT_HEADER,
			validBatchUpdateSheet,
			selectionChange,
			exportExcelRef,
			STAFF_DOWNSHIFT_HEADER,
			onReset,
			batchDeleteDialog,
			STAFF_IMPORT_ERROR_HEADER,
			ERROR_HEADER,
			batchErrorData,
			STAFF_BATCH_DEL_ERROR_HEADER,
			toSubject,
		};
	},
};
</script>

<style lang="scss" scoped src="./css/online.scss"></style>
