<template>
	<div class="system-dict-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="columns"
			:request="request"
			:btn="btn"
			:searchConfig="searchConfig"
			:multi="true"
			@selectionChange="selectionChange"
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
								<a href="/template/员工学历模板.xls" download> 批量导入模板</a>
							</el-dropdown-item>
							<el-dropdown-item>
								<a href="/template/批量更新员工学历模板.xls" download> 批量更新模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:highIdentification="item">
				<el-tag size="small" :type="item.highIdentification == 1 ? 'info' : ''">{{ item.highIdentification == 1 ? '否' : '是' }}</el-tag>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		<!--详情-->
		<attach-detail-vue ref="attachDetailRef"></attach-detail-vue>
		<add-degree-vue ref="addDegreeRef" @ok="refresh"></add-degree-vue>

		<!--批量导入弹框-->
		<batch-import-dialog
			ref="batchImportDialogRef"
			:header="DEGREE_HEADER"
			:errName="'员工学历信息批量导入'"
			:download="true"
			url="/yifu-archives/method/tempeducation/importListAdd"
			@ok="refresh"
		/>

		<batch-import-dialog
			ref="batchUpdateDialogRef"
			:header="DEGREE_HEADER_UPDATE"
			:title="'批量更新'"
			:errName="'员工学历信息批量更新'"
			:download="true"
			url="/yifu-archives/method/tempeducation/importListUpate"
			@ok="refresh"
		/>
	</div>
</template>

<script setup name="学历信息">
import { reactive, ref, toRefs } from 'vue';

import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { DEGREE_HEADER, DEGREE_HEADER_EXPORT, DEGREE_HEADER_UPDATE } from '/@/utils/header';
import { exportExcel } from '/@/utils/xlsx';
import { exportExcelSheet } from '/@/utils/excel';
import { ElMessageBox ,ElMessage} from 'element-plus';
import attachDetailVue from './component/attachDetail.vue';
import addDegreeVue from './component/addDegree.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { getdegreeList, deteleDegree, exportDegreeList, deleteDegreeByIds, getDegreeDetail } from '/@/api/attach';
import { getDictbyType } from '/@/api/dict';
import { translateDict } from '/@/utils/utils';
import moment from 'moment';

const proTableRef = ref(null);
const attachDetailRef = ref(null);
const addDegreeRef = ref(null);
const batchImportDialogRef = ref(null);
const batchUpdateDialogRef = ref(null);

// 新增按钮
const handleAddClick = () => {
	addDegreeRef.value.openDialog('', state.dictConfig);
};
// 批量导入
const handleBatchImport = () => {
	if (batchImportDialogRef.value) batchImportDialogRef.value.openDialog();
};

// 批量更新
const handleBatchUpdate = () => {
	if (batchUpdateDialogRef.value) batchUpdateDialogRef.value.openDialog();
};
// 批量导出
const handleBatchExport = () => {
	if (state.selectOptions.length > 0) {
		const ids = [];
		state.selectOptions.map((item) => {
			ids.push(item.id);
		});
		state.params = {
			ids: ids.join(','),
		};
	} else {
		state.params = proTableRef.value.getParams();
		delete state.params.size;
		delete state.params.current;
	}
	state.btn.find((item) => item.label == '批量导出').loading = true;
	exportDegreeList(state.params).then((res) => {
		if(res.code==200){
			// exportExcelSheet(
			// 	DEGREE_HEADER_EXPORT,
			// 	res.data.map((item) => {
			// 		return {
			// 			id: item.id,
			// 			empName: item.empName,
			// 			empIdcard: item.empIdcard,
			// 			school: item.school || '',
			// 			collageSystem: item.collageSystem || '',
			// 			major: item.major || '',
			// 			educationName: translateDict(state.dictConfig.educationList, item.educationName) || '',
			// 			type: translateDict(state.dictConfig.educationTypeList, item.type) || '',
			// 			highIdentification: item.highIdentification == 1 ? '否' : '是',
			// 			educationSystem: translateDict(state.dictConfig.educationSystemList, item.educationSystem) || '',
			// 			entryDate: item.entryDate ? item.entryDate.substring(0, 10) : '',
			// 			gradutionDate: item.gradutionDate ? item.gradutionDate.substring(0, 10) : '',
			// 			certificationName: item.certificationName || '',
			// 			remark: item.remark || '',
			// 		};
			// 	}),
			// 	`学历信息批量导出${moment().format('YYYYMMDD')}`
			// );
			ElMessage.success('导出成功');
		}else{
			ElMessage.error(res.msg);
		}
	}).catch((err) => {
		ElMessage.error('导出失败');
	}).finally(() => {
		state.btn.find((item) => item.label == '批量导出').loading = false;
	});
};

const selectionChange = (selection) => {
	state.selectOptions = selection;
	if (selection.length > 0) {
		state.btn[4].disabled = false;
	} else {
		state.btn[4].disabled = true;
	}
};
// 批量删除
const handleBatchDelete = () => {
	if (state.selectOptions.length > 0) {
		ElMessageBox.confirm(`是否确定删除${state.selectOptions.length}条学历信息？`, '提示', {
			type: 'warning',
		}).then(() => {
			const ids = [];
			state.selectOptions.map((item) => {
				ids.push(item.id);
			});
			deleteDegreeByIds(ids).then((res) => {
				if (res.code == 200 && res.data) {
					ElMessage.success('删除成功');
					proTableRef.value.refresh();
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			});
		});
	}
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
			dataIndex: 'school',
			title: '学校',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'collageSystem',
			title: '院系名称',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'major',
			title: '专业',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'educationName',
			title: '学历',
			hideInSearch: true,
			minWidth: 160,
			formatter: (val) => {
				return translateDict(state.dictConfig.educationList, val.educationName) || '--';
			},
		},
		{
			dataIndex: 'type',
			title: '学历类型',
			hideInSearch: true,
			minWidth: 160,
			formatter: (val) => {
				return translateDict(state.dictConfig.educationTypeList, val.type) || '--';
			},
		},
		{
			dataIndex: 'highIdentification',
			title: '最高学历',
			hideInSearch: true,
			minWidth: 160,
			scopedSlots: { customRender: 'highIdentification' },
		},
		{
			dataIndex: 'educationSystem	',
			title: '学制类型',
			hideInSearch: true,
			minWidth: 160,
			formatter: (val) => {
				return translateDict(state.dictConfig.educationSystemList, val.educationSystem) || '--';
			},
		},
		{
			dataIndex: 'entryDate',
			title: '入学时间',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				return row.entryDate ? row.entryDate.substring(0, 10) : '--';
			},
		},
		{
			dataIndex: 'gradutionDate',
			title: '毕业时间',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				return row.gradutionDate ? row.gradutionDate.substring(0, 10) : '--';
			},
		},
		{
			dataIndex: 'createName',
			title: '创建人',
			minWidth: 160,
		},
		{
			dataIndex: 'createTime',
			title: '创建时间',
			minWidth: 180,
			searchIndex: 'createTimes',
			valueType: 'dateTimeRange',
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			minWidth: 200,
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
			permission: ['archives_tempeducation_add'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '批量导入',
			permission: ['archives_education_importListAdd'],
			onClick: handleBatchImport,
			type: 'normal',
			icon: 'icon-ic_edit_upload',
		},
		{
			label: '批量导出',
			permission: ['archives_tempeducation_export'],
			onClick: handleBatchExport,
			type: 'normal',
			icon: 'icon-ic_edit_export',
		},
		{
			label: '批量更新',
			permission: ['archives_education_importListUpdate'],
			onClick: handleBatchUpdate,
			type: 'normal',
			icon: 'icon-ic_edit_refresh',
		},
		{
			label: '批量删除',
			permission: ['archives_education_del_batch'],
			onClick: handleBatchDelete,
			type: 'normal',
			icon: 'icon-ic_edit_delete',
			disabled: true,
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: ['archives_tempeducation_get'], // 权限标识
		},
		{
			text: '编辑',
			prop: 'edit', // 唯一标识
			permission: ['archives_tempeducation_edit'], // 权限标识
		},
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: ['archives_tempeducation_del'], // 权限标识
		},
	],
	detailConf: [
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '学校', key: 'school', tooltip: true },
		{ label: '院系名称', key: 'collageSystem', tooltip: true },
		{ label: '专业', key: 'major', tooltip: true },
		{ label: '学历', key: 'educationName' },
		{ label: '学历类型', key: 'type' },
		{ label: '最高学历', key: 'highIdentification' },
		{ label: '入学时间', key: 'entryDate' },
		{ label: '毕业时间', key: 'gradutionDate' },
		{ label: '学制类型', key: 'educationSystem' },
		{ label: '证书名称', key: 'certificationName', tooltip: true },
		{ label: '创建人', key: 'createName' },
		{ label: '创建时间', key: 'createTime' },
		{ label: '备注', key: 'remark', tooltip: 'true', size: 24 },
		{ label: '附件内容', key: '', file: 'true', size: 24 },
	],
	dictConfig: {
		educationList: [],
		educationTypeList: [],
		educationSystemList: [],
	}, // 字典配置
	selectOptions: [],
	params: {},
});

const { columns, cellBtns, btn, searchConfig } = toRefs(state);

const request = async (params) => {
	try {
		const res = await getdegreeList(params);
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

const refresh = () => {
	proTableRef.value.refresh();
};

const onCellClick = async (prop, item) => {
	if (prop === 'delete') {
		ElMessageBox.confirm('是否确定删除？', '提示', {
			type: 'warning',
		})
			.then(async () => {
				const res = await deteleDegree(item.id);
				if (res && res.code == 200) {
					ElMessage.success('删除成功');
					refresh();
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			})
			.catch(() => {});
	} else if (prop === 'edit') {
		addDegreeRef.value.openDialog(item, state.dictConfig);
	} else if (prop === 'detail') {
		// 详情
		getDegreeDetail(item.id)
			.then((res) => {
				if (res.code == 200) {
					const data = res.data;
					data.startDate = data.startDate ? data.startDate.substring(0, 10) : '';
					data.endDate = data.endDate ? data.endDate.substring(0, 10) : '';
					data.educationName = translateDict(state.dictConfig.educationList, data.educationName) || '';
					data.type = translateDict(state.dictConfig.educationTypeList, data.type) || '';
					data.highIdentification = data.highIdentification == '1' ? '否' : '是';
					data.educationSystem = translateDict(state.dictConfig.educationSystemList, data.educationSystem) || '';
					attachDetailRef.value.openDialog(data, state.detailConf, '学历信息详情', true);
				} else {
					ElMessage.error(res.msg || '获取学历信息详情失败');
				}
			})
			.catch(() => {
				ElMessage.error('获取学历信息详情失败');
			});
	}
};

const initConfigData = () => {
	// 学历
	getDictbyType('education')
		.then((res) => {
			if (res && res.code == 200 && res.data) {
				state.dictConfig.educationList = res.data;
			} else {
				ElMessage.error(res.msg || '获取学历字典失败');
			}
		})
		.catch((e) => {
			ElMessage.error(e.msg || '获取学历字典失败');
		});

	// 学历类型
	getDictbyType('education_type')
		.then((res) => {
			if (res && res.code == 200 && res.data) {
				state.dictConfig.educationTypeList = res.data;
			} else {
				ElMessage.error(res.msg || '获取学历类型字典失败');
			}
		})
		.catch((e) => {
			ElMessage.error(e.msg || '获取学历类型字典失败');
		});

	// 学制类型
	getDictbyType('education_system')
		.then((res) => {
			if (res && res.code == 200 && res.data) {
				state.dictConfig.educationSystemList = res.data;
			} else {
				ElMessage.error(res.msg || '获取学制类型字典失败');
			}
		})
		.catch((e) => {
			ElMessage.error(e.msg || '获取学制类型字典失败');
		});
};

onMounted(() => {
	initConfigData();
});
</script>
<style lang="scss" scoped src="./css/index.scss"></style>
