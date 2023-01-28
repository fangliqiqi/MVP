<template>
	<div class="system-dict-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="columns"
			:request="request"
			:btn="btn"
			:searchConfig="searchConfig"
			multi
			@selectionChange="selectionChange"
			@onReset="onReset"
			:initParams="initParams"
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
								<a href="/template/subject/项目档案批量导入模板.xlsx" download>批量导入模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/subject/项目档案批量更新模板.xlsx" download>批量更新模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/subject/项目档案批量划转模板.xlsx" download>批量划转模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/subject/项目档案批量减项模板.xlsx" download>批量减项模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>

			<template v-slot:archivesLocation="item">
				<el-tree-select
					v-model="params.archivesLocation"
					style="width: 100%"
					:placeholder="item.placeholder || '请选择'"
					:props="areaProps"
					@current-change="changeArchivesLocation"
					@clear="clearFileAddress"
					node-key="id"
					:load="loadArea"
					lazy
					clearable
					check-strictly
				/>
			</template>

			<template v-slot:socialSecurityLocation="item">
				<el-tree-select
					v-model="params.socialSecurityLocation"
					:key="'arch_search_props_' + item.dateIndex + '_' + 'oIndex'"
					style="width: 100%"
					:placeholder="item.placeholder || '请选择'"
					:props="areaProps"
					@current-change="changeSocialSecurityLocation"
					@clear="clearSocialSecurityLocation"
					node-key="id"
					:load="loadArea"
					check-strictly
					lazy
					clearable
				/>
			</template>

			<template v-slot:businessPrimaryType="item">
				<el-tree-select
					v-model="params.businessThirdType"
					lazy
					:load="businessPrimaryTypeLoad"
					style="width: 100%"
					:placeholder="item.placeholder || '请选择'"
					:props="{
						label: 'label',
						children: 'children',
						isLeaf: 'isLeaf',
					}"
					@current-change="changeSocialSecurityLocation"
					node-key="id"
					clearable
				/>
			</template>

			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<addSubjectCheckInfo ref="checkInfoDialog" @ok="refreshList" />
		<reduce-electronic-dialog ref="reduceElectronicRef" @ok="refreshList" />
		<change-subject-dialog ref="changeElectronicRef" @ok="refreshList" />
		<export-excel-dialog 
			ref="exportExcelRef" 
			:heads="SUBJECT_EXPORT_HEADER" 
			title="项目档案导出" 
			useCode="archives_temployeeproject_batchexport"
		/>
		<!-- 证明开具弹窗 -->
		<changeProveVue ref="changeProveRef" />

		<!--批量导入弹框-->
		<batch-import-dialog
			ref="batchImportDialogRef"
			:header="SUBJECT_IMPORT_HEADER"
			url="/yifu-archives/method/temployeeproject/importListAdd"
			@ok="refreshList"
			:type="1"
			demobilize
			batchName="subject-batch-import"
			:errorHeader="SUBJECT_BATCH_COMMON_ERROR_HEADER"
			:errorData="batchErrorData"
			demobilizeParamsName="idAdd"
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
			ref="batchUpdateDialogRef"
			:header="SUBJECT_IMPORT_HEADER"
			url="/yifu-archives/method/temployeeproject/importListUpate"
			@ok="refreshList"
			batchName="subject-batch-update"
			:valid="validBatchUpdateSheet"
			:errorHeader="SUBJECT_BATCH_COMMON_ERROR_HEADER"
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

		<!--批量减项弹框-->
		<batch-import-dialog
			title="批量减项"
			ref="batchReduceDialogRef"
			:header="SUBJECT_REDUCE_HEADER"
			batchName="subject-batch-reduce"
			url="/yifu-archives/method/temployeeproject/batchDeleteEmpPro"
			@ok="refreshList"
			:type="1"
			:errorHeader="SUBJECT_BATCH_REDUCE_ERROR_HEADER"
			:errorData="batchErrorData"
			customError
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量减项失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!--批量划转弹框-->
		<batch-import-dialog
			title="批量划转"
			ref="batchChangeDialogRef"
			:header="SUBJECT_CHANGE_HEADER"
			batchName="subject-batch-change"
			url="/yifu-archives/method/tempchangeinfo/batchChangeArc"
			@ok="refreshList"
			:type="1"
			:errorHeader="SUBJECT_BATCH_COMMON_ERROR_HEADER"
			:errorData="batchErrorData"
			customError
			customErrorContent
			download
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量划转失败！</div>
					<!--反馈信息-->
					<span>存在不符合要求的数据，请修改后，重新导入！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>

		<!--批量删除弹框-->
		<batch-import-dialog
			title="批量删除"
			ref="batchDeleteDialog"
			:type="1"
			errName="项目档案批量删除"
			@ok="refreshList"
			batchName="suject-batch-delete"
			:errorHeader="SUBJECT_BATCH_DEL_ERROR_HEADER"
			:errorData="batchErrorData"
			download
			customError
			customErrorContent
		>
			<template #error>
				<div>
					<div style="color: red; font-size: 24px; text-align: center; margin: 10px 0 25px">批量删除失败！</div>
					<span>该档案存在进行中/已完结的服务！<br />已为您下载反馈结果！</span>
				</div>
			</template>
		</batch-import-dialog>
	</div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, onUnmounted } from 'vue';
import { getProjectPage, delProject, delArrProject, exportEmpProject } from '/@/api/subject';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { loadNode, idToArea } from '/@/utils/city';
import { getDictByItemTypes } from '/@/utils/utils.js';
import addSubjectCheckInfo from './component/addSubjectCheckInfo.vue';
import changeProveVue from './component/changeProve.vue';
import { useRouter, useRoute  } from 'vue-router';
import reduceElectronicDialog from './component/reduceSubjectDialog.vue';
import changeSubjectDialog from './component/changeSubjectDialog.vue';
import { SUBJECT_EXPORT_HEADER } from '/@/utils/header';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { onRefresh, offRefresh } from '/@/utils/events';

import {
	SUBJECT_IMPORT_HEADER,
	SUBJECT_UPDATE_HEADER,
	SUBJECT_REDUCE_HEADER,
	SUBJECT_CHANGE_HEADER,
	ERROR_HEADER,
	SUBJECT_BATCH_DEL_ERROR_HEADER,
	SUBJECT_BATCH_COMMON_ERROR_HEADER,
	SUBJECT_BATCH_REDUCE_ERROR_HEADER,
} from '/@/utils/header';
import { SALARY_STATUS_OPTION } from '/@/utils/dicts';
import { validImportSheet } from '/@/utils/xlsx';
import { init } from 'echarts';

export default {
	name: '项目档案',
	components: {
		ProTable,
		ProButtons,
		ArrowDown,
		addSubjectCheckInfo,
		reduceElectronicDialog,
		changeSubjectDialog,
		changeProveVue,
		ExportExcelDialog,
		batchImportDialog,
	},
	setup() {
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const proTableRef = ref(null);
		const checkInfoDialog = ref(null);
		const reduceElectronicRef = ref(null);
		const changeElectronicRef = ref(null);
		const router = useRouter();
		const route = useRoute();
		const changeProveRef = ref(null);
		const exportExcelRef = ref(null);
		const batchImportDialogRef = ref(null);
		const batchUpdateDialogRef = ref(null);
		const batchReduceDialogRef = ref(null);
		const batchChangeDialogRef = ref(null);
		const batchDeleteDialog = ref(null);
		const { proxy } = getCurrentInstance();

		// 新增
		const handleAddClick = () => {
			if (checkInfoDialog.value) {
				checkInfoDialog.value.openDialog();
			}
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

		// 批量导入
		const handleBatchImport = () => {
			if (batchImportDialogRef.value) batchImportDialogRef.value.openDialog();
		};

		// 批量更新
		const handleBatchUpdate = () => {
			if (batchUpdateDialogRef.value) batchUpdateDialogRef.value.openDialog();
		};

		// 批量减项
		const handleReduceExport = () => {
			if (batchReduceDialogRef.value) batchReduceDialogRef.value.openDialog();
		};

		// 批量划转
		const handleChangeExport = () => {
			if (batchChangeDialogRef.value) batchChangeDialogRef.value.openDialog();
		};

		// 批量更新表头校验
		const validBatchUpdateSheet = async (values) => {
			const file = values.file.raw;
			const data = await validImportSheet(file, SUBJECT_IMPORT_HEADER, 0, null, SUBJECT_UPDATE_HEADER);
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
				message.error('请先选择待删除的项目档案');
				return;
			}
			const text = `<p style="font-size:16px;font-weight:600">是否确定删除${state.selectionChangeList.length}条项目档案?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，档案将从系统消失，请谨慎操作！</span></p>`;

			ElMessageBox.confirm(text, {
				type: 'warning',
				dangerouslyUseHTMLString: true,
			})
				.then(async () => {
					try {
						// const ids = state.selectionChangeList.reduce((str, v1) => {
						// 	return str ? `${str},${v1.id}` : `${v1.id}`;
						// }, '');
						const idList = state.selectionChangeList.map((v) => v.id);
						const res = await delArrProject(idList);
						if (res && res.code === 200) {
							message.success('档案批量删除成功');
							refreshList();
						} else {
							if (res.data && batchDeleteDialog.value) {
								res.data.map((item) => {
									const arr = item.message.split(';');
									item.empName = arr[0] || '';
									item.empIdCard = arr[1] || '';
									item.deptNo = arr[2] || '';
									item.result = '否';
									item.error = arr[3] || '';
									return item;
								});
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
			if(searchParams.hasOwnProperty('projectStatusReplace')){
				if(searchParams.projectStatusReplace==0){
					searchParams.proStatus  = 0	
				}else if(searchParams.projectStatusReplace==1){
					searchParams.proStatus  = 1
				}
				searchParams.projectStatusReplace = searchParams.projectStatusReplace==1?0:(searchParams.projectStatusReplace!=0?1:0)
			}
			delete searchParams.size;
			delete searchParams.current;
			for (let key in searchParams) {
				if (searchParams[key] === undefined || searchParams[key] === null||(searchParams[key] instanceof Array && searchParams[key].length === 0)) {
					delete searchParams[key];
				}
				if(key === 'archivesLocation' || key === 'socialSecurityLocation'){
					delete searchParams[key];
				}
			}

			exportExcelRef.value &&
				exportExcelRef.value.openDialog((params, exportFile) => {
					let data = {
						// ...searchParams,
						exportFields:params.map((item) => item.dataIndex),
					};
					const idList = state.selectionChangeList.map((item) => item.id);
					if (idList && idList.length) {
						data.idList = idList;
					}else{
						data = {
							...data,
							...searchParams,
						}
					}
					exportEmpProject({},data).then((res) => {
						if (res.code && res.code !== 200) {
							ElMessageBox.error(res.msg);
						}
						exportFile(true);
					});
				});
		};

		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};

		const isGray = (item) => {
			return item.projectStatus == '1';
		};
		const isGraydelete = (item) => {
			return item.projectStatus == '0' && item.status == '1';
		};

		const formatColumnsitem = ({ dataIndex, title, minWidth, customRender, formatter, ellipsis = false, tooltip = false }) => {
			return [
				{
					dataIndex: dataIndex,
					title: title,
					minWidth: minWidth,
					valueType: 'custom',
					scopedSlots: { customRender: customRender },
					hideInTable: true,
					tooltip,
					ellipsis,
				},
				{
					dataIndex: dataIndex,
					title: title,
					minWidth: minWidth,
					formatter: formatter,
					hideInSearch: true,
					tooltip,
					ellipsis,
				},
			];
		};

		const listener = () => {
			onRefresh(proxy, route.path, () => {
				refreshList();
			});
		};

		onMounted(() => {
			listener();
		});

		onUnmounted(() => {
			offRefresh(proxy);
		});

		// 重置
		const onReset = () => {
			delete route.query.projectIdCard;
			state.params = {};
			state.initParams.empIdcard = null;
		};

		const state = reactive({
			areaProps: {
				label: 'areaName',
				isLeaf: 'isLeaf',
				children: 'children',
			},

			selectionChangeList: [], // 列表多选选中的内容

			SUBJECT_EXPORT_HEADER: SUBJECT_EXPORT_HEADER, // 导出字典
			SUBJECT_IMPORT_HEADER: SUBJECT_IMPORT_HEADER, // 导入头
			SUBJECT_UPDATE_HEADER: SUBJECT_UPDATE_HEADER, // 更新必填头
			SUBJECT_REDUCE_HEADER: SUBJECT_REDUCE_HEADER, // 批量减项
			SUBJECT_CHANGE_HEADER: SUBJECT_CHANGE_HEADER, // 批量划转

			params: {
				archivesLocation: null, // 档案所在地 (fileProvince,fileCity,fileTown)
				socialSecurityLocation: null, // 社保所在地
				businessThirdType: null, // 业务类型
				empNatrue: null, // 员工类型
				contractStatus: null, // 合同状态
				insuranceStatus: null, // 商险状态
				socialStatus: null, // 社保状态
				fundStatus: null, // 公积金状态
				projectStatus: null, // 在项状态
			},

			dict: {
				emp_natrue: null, // 员工类型
				personnel_state: null, // 合同状态
				commercial_satte: null, // 商险状态
				social_ecurity_state: null, // 社保、公积金状态
				in_item_state: null, // 在项状态
			}, // 字典数据

			searchConfig: {
				labelWidth: '125px',
				option: {
					extBtn: 'extBtns',
				},
			},
			columns: [
				{
					dataIndex: 'empNo',
					title: '员工编码',
					minWidth: 140,
					ellipsis: true,
					fixed: 'left',
				},
				{
					dataIndex: 'empName',
					title: '员工姓名',
					minWidth: 120,
					ellipsis: true,
				},
				{
					dataIndex: 'empIdcard',
					title: '身份证号',
					minWidth: 180,
				},
				{
					dataIndex: 'empPhone',
					title: '手机号码',
					minWidth: 140,
				},
				...formatColumnsitem({
					dataIndex: 'archivesLocation',
					title: '档案所在地',
					minWidth: 160,
					customRender: 'archivesLocation',
					tooltip: true,
					formatter: (val) => {
						return idToArea({ province: val.fileProvince, city: val.fileCity, town: val.fileTown });
					},
				}),
				...formatColumnsitem({
					dataIndex: 'socialSecurityLocation',
					title: '社保所在地',
					minWidth: 160,
					tooltip: true,
					customRender: 'socialSecurityLocation',
					formatter: (val) => {
						return idToArea({ province: val.socialProvince, city: val.socialCity, town: val.socialTown });
					},
				}),
				{
					dataIndex: 'unitName',
					title: '客户名称',
					minWidth: 180,
					ellipsis: true,
				},
				{
					dataIndex: 'deptName',
					title: '项目名称',
					minWidth: 180,
					ellipsis: true,
				},
				{
					dataIndex: 'deptNo',
					title: '项目编码',
					minWidth: 120,
					ellipsis: true,
				},
				{
					dataIndex: 'businessThirdType',
					title: '业务类型',
					minWidth: 120,
					ellipsis: true,
				},
				{
					dataIndex: 'empNatrue',
					title: '员工类型',
					minWidth: 120,
					multiple: true,
					searchIndex: 'empNatureArray',
				},
				{
					dataIndex: 'createTime',
					title: '创建时间',
					minWidth: 160,
					hideInSearch: true,
				},
				{
					dataIndex: 'createName',
					title: '创建人',
					minWidth: 100,
					hideInSearch: true,
				},
				{
					dataIndex: 'contractStatus',
					title: '合同状态',
					minWidth: 100,
					multiple: true,
					searchIndex: 'contractStatusArray',
				},
				{
					dataIndex: 'insuranceStatus',
					title: '商险状态',
					minWidth: 100,
					multiple: true,
					searchIndex: 'insuranceStatusArray',
				},
				{
					dataIndex: 'socialStatus',
					title: '社保状态',
					minWidth: 100,
					multiple: true,
					searchIndex: 'socialStatusArray',
				},
				{
					dataIndex: 'fundStatus',
					title: '公积金状态',
					minWidth: 100,
					multiple: true,
					searchIndex: 'fundStatusArray',
				},
				{
					dataIndex: 'salaryStatus',
					title: '近3个月发薪',
					minWidth: 100,
					hideInSearch: true,
					valueEnum: SALARY_STATUS_OPTION,
				},
				{
					dataIndex: 'projectStatusReplace',
					title: '在项状态',
					minWidth: 100,
					formatter: (val) => {
						const text =
							val.projectStatus == 1
								? '已减项'
								: val.projectStatus == 0 && val.status == 0
								? '草稿'
								: val.projectStatus == 0 && val.status == 1
								? '已审核'
								: '--';
						return text;
					},
					valueEnum: {
						0: '草稿',
						1: '已审核',
						2: '已减项',
					},
				},
				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 220,
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
					permission: ['archives_temployeeproject_add'],
					icon: 'icon-ic_edit_add',
				},
				{
					label: '批量导入',
					type: 'normal',
					onClick: handleBatchImport,
					permission: ['wxhr:employeeProjectinfo_importListAdd'],
					icon: 'icon-ic_edit_upload',
				},
				{
					label: '批量更新',
					type: 'normal',
					onClick: handleBatchUpdate,
					permission: ['archives_project_importListUpdate'],
					icon: 'icon-ic_edit_refresh',
				},
				{
					label: '批量删除',
					type: 'normal',
					onClick: handleDeleteClick,
					permission: ['archives_temployeeproject_batchdel'],
					icon: 'icon-ic_edit_delete',
				},
				{
					label: '批量导出',
					type: 'normal',
					onClick: handleBatchExport,
					permission: ['archives_temployeeproject_batchexport'],
					icon: 'icon-ic_edit_export',
				},
				{
					label: '批量划转',
					type: 'normal',
					onClick: handleChangeExport,
					permission: ['archives_tempchangeinfo_batchchange'],
				},
				{
					label: '批量减项',
					type: 'normal',
					onClick: handleReduceExport,
					permission: ['archives_temployeeproject_batchdelempproinfo'],
				},
			],
			cellBtns: [
				{
					text: '详情',
					prop: 'detail', // 唯一标识
					permission: [], // 权限标识
				},
				{
					text: '编辑',
					prop: 'edit', // 唯一标识
					permission: ['archives_temployeeproject_edit'], // 权限标识
					tooltip: '当前档案不可编辑',
					isGray: isGray,
				},
				{
					text: '减项',
					prop: 'reduce', // 唯一标识
					permission: ['archives_temployeeproject_delempproinfo'], // 权限标识
					tooltip: '当前档案不可减项',
					isGray: isGray,
				},
				{
					text: '删除',
					prop: 'delete', // 唯一标识
					permission: ['archives_temployeeproject_del'], // 权限标识
					tooltip: '当前档案不可删除',
					isGray: isGraydelete,
				},
				{
					text: '划转',
					prop: 'change', // 唯一标识
					permission: ['archives_tempchangeinfo_change'], // 权限标识
					tooltip: '当前档案不可划转',
					isGray: isGray,
				},
				{
					text: '证明开具',
					prop: 'prove', // 唯一标识
					permission: ['demo_tcertrecord_add'], // 权限标识
					tooltip: '当前档案不可开具证明',
				},
			],
			initParams: {
				empIdcard: '',
			},
		});

		onMounted(() => {
			// 请求字典数据
			getDictByItemTypes([
				'emp_natrue',
				'personnel_state',
				'commercial_satte',
				'social_ecurity_state',
				'in_item_state',
				'fund_status',
				'customer_business_sub_type',
			]).then((res) => {
				// console.log('字典集', res);
				state.dict = res;
				state.columns = state.columns.map((item) => {
					const target = { ...item };
					switch (item.dataIndex) {
						case 'empNatrue':
							target.valueEnum = res['emp_natrue']; // 人员类型
							break;
						// case 'businessThirdType':
						// 	target.valueEnum = res['customer_business_sub_type']; //业务类型
						// 	break;
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

				// console.log('get columns:',state.columns)
			});
		});

		// 获取档案所在地
		const changeArchivesLocation = (val, node) => {
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

			state.params.fileProvince = pro;
			state.params.fileCity = city;
			state.params.fileTown = town;
		};

		/**
		 * 清空档案所在地
		 */
		const clearFileAddress = () => {
			state.params.fileProvince = null;
			state.params.fileCity = null;
			state.params.fileTown = null;
		};

		/**
		 * 清空社保所在地信息
		 */
		const clearSocialSecurityLocation = () => {
			state.params.socialProvince = null;
			state.params.socialCity = null;
			state.params.socialTown = null;
		};

		// 社保所在地
		const changeSocialSecurityLocation = (val, node) => {
			const values = [val.id];
			if (node.parent && node.parent.level != 0) {
				// 获取市或者省
				values.unshift(node.parent.data.id);
				if (node.parent.parent && node.parent.parent.level != 0) {
					// 获取省
					values.unshift(node.parent.parent.data.id);
				}
			}

			state.params.socialProvince = values[0] || null;
			state.params.socialCity = values[1] || null;
			state.params.socialTown = values[2] || null;
		};

		// 业务类型数据格式化
		const businessPrimaryTypeLoad = (node, resolve) => {
			if (node.isLeaf) return resolve([]);
			setTimeout(() => {
				resolve([]);
			}, 400);
		};

		
		const request = async (params) => {
			const p = Object.assign({}, state.params, params);
			if (p.projectStatusReplace == '0') {
				//草稿
				p.projectStatus = 0;
				p.status = 0;
				delete p.projectStatusReplace;
			} else if (p.projectStatusReplace == '1') {
				//已审核
				p.projectStatus = 0;
				p.status = 1;
				delete p.projectStatusReplace;
			} else if (p.projectStatusReplace == '2') {
				//已减项
				p.projectStatus = 1;
				delete p.status;
				delete p.projectStatusReplace;
			} else {
				delete p.projectStatusReplace;
				delete p.status;
				delete p.projectStatus;
			}

			delete p.archivesLocation;
			delete p.socialSecurityLocation;

			try {
				const res = await getProjectPage(p);
				if (res && res.code == 200 && res.data) {
					return {
						current: res.data.current,
						total: res.data.total,
						data: res.data.records.map((item, i) => {
							return {
								...item,
								index: (params.current - 1) * params.size + i + 1,
							};
						}),
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

		watchEffect(() => {
			if(route.query.projectIdCard){
				state.initParams.empIdcard = route.query.projectIdCard;
				proTableRef.value&&proTableRef.value.doSearch({
					empIdcard:route.query.projectIdCard,
					size:10,
					current:1,
					initParams:route.query.projectIdCard,
				})
			}
		});

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
						const res = await delProject(item.id);
						if (res && res.code === 200) {
							message.success('档案删除成功');
							refreshList();
						} else {
							message.error(res.msg || '档案删除失败');
						}
					} catch (e) {
						console.log('get exception:', e);
						message.error('档案删除失败');
					}
				})
				.catch(() => {});
		};

		const onCellClick = async (prop, item) => {
			const projectIdCard = route.query.projectIdCard?route.query.projectIdCard:'';
			switch (prop) {
				case 'detail':
					router.push({ name: 'subject-detail', params: { id: item.id},query:{projectIdCard:projectIdCard} });
					break;
				case 'edit': // 编辑操作
					router.push({ name: 'subject-edit', params: { id: item.id } });
					break;
				case 'delete': // 删除操作
					deleteCell(item);
					break;
				case 'reduce': // 减项
					if (reduceElectronicRef.value) {
						reduceElectronicRef.value.openDialog(item);
					}
					break;
				case 'change': // 划转
					if (changeElectronicRef.value) {
						changeElectronicRef.value.openDialog(item);
					}
					break;
				case 'prove': // 证明开具
					if (changeProveRef.value) changeProveRef.value.openDialog(item);
					break;
			}
		};

		const selectionChange = (selection) => {
			state.selectionChangeList = selection;
		};

		const batchErrorData = (prop, errorData) => {
			let data = null;
			switch (prop) {
				case 'subject-batch-reduce':
					// 批量减项
					data = errorData
						.map((item) => {
							const arr = item.message.split(';');
							return {
								line: item.lineNum,
								isError: '是',
								empName: arr[0] || '',
								empIdCard: arr[1] || '',
								deptNo: arr[2] || '',
								leaveReason: arr[3] || '',
								leaveRemark: arr[4] || '',
								error: arr[5] || '',
							};
						})
						.sort((a, b) => Number(a.line) - Number(b.line));
					break;
				case 'suject-batch-delete':
					// 批量删除
					data = errorData.map((item) => {
						return {
							empName: item.empName,
							empIdCard: item.empIdCard,
							deptNo: item.deptNo,
							result: '否',
							error: item.error,
						};
					});
					break;

				case 'subject-batch-change':
					// 批量划转

					data = errorData
						.map((item) => {
							let message = item.errors && item.errors.length ? item.errors.join(',') : null;
							return {
								line: item.lineNum,
								isError: message ? '是' : '否',
								error: message,
							};
						})
						.sort((a, b) => Number(a.line) - Number(b.line));
					break;
				default:
					data = errorData
						.map((item) => {
							return {
								line: item.lineNum,
								isError: item.message ? '是' : '否',
								error: item.message,
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
			refreshList,
			changeArchivesLocation,
			changeSocialSecurityLocation,
			clearSocialSecurityLocation,
			businessPrimaryTypeLoad,
			checkInfoDialog,
			reduceElectronicRef,
			changeElectronicRef,
			selectionChange,
			changeProveRef,
			exportExcelRef,
			batchImportDialogRef,
			batchUpdateDialogRef,
			validBatchUpdateSheet,
			batchReduceDialogRef,
			batchChangeDialogRef,
			batchDeleteDialog,
			batchErrorData,
			onReset,
			ERROR_HEADER,
			SUBJECT_BATCH_DEL_ERROR_HEADER,
			SUBJECT_BATCH_COMMON_ERROR_HEADER,
			SUBJECT_BATCH_REDUCE_ERROR_HEADER,
			clearFileAddress,
			loadArea,
		};
	},
};
</script>

<style lang="scss" scoped src="./css/subject.scss">
</style>
