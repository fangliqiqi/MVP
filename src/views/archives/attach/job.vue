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
								<a href="/template/员工工作记录模板.xls" download> 批量导入模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:workingStatus="item">
				<el-tag size="small" :type="item.workingStatus == 1 ? 'info' : ''">{{ item.workingStatus == 1 ? '离职' : '在职' }}</el-tag>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		<!--详情-->
		<attach-detail-vue ref="attachDetailRef"></attach-detail-vue>
		<add-job-vue ref="addJobRef" @ok="refresh"></add-job-vue>

		<!--批量导入弹框-->
		<batch-import-dialog
			ref="batchImportDialogRef"
			:header="JOB_HEADER"
			:errName="'员工工作记录批量导入'"
			:download="true"
			url="/yifu-archives/method/tempworkrecording/importListAdd"
			@ok="refresh"
		/>
	</div>
</template>

<script setup name="工作记录">
import { reactive, ref, toRefs } from 'vue';

import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { JOB_HEADER, JOB_HEADER_EXPORT } from '/@/utils/header';
import { exportExcel } from '/@/utils/xlsx';
import {exportExcelSheet} from '/@/utils/excel';
import { ElMessageBox } from 'element-plus';
import attachDetailVue from './component/attachDetail.vue';
import addJobVue from './component/addJob.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { getJobRecordList, deteleJob, getJobDetail, exportJobList, deleteJobByIds } from '/@/api/attach';
import { getDictbyType } from '/@/api/dict';
import { translateDict } from '/@/utils/utils';
import moment from 'moment';

const proTableRef = ref(null);
const attachDetailRef = ref(null);
const addJobRef = ref(null);
const batchImportDialogRef = ref(null);

// 新增按钮
const handleAddClick = () => {
	addJobRef.value.openDialog('', state.workTypeList);
};
// 批量导入
const handleBatchImport = () => {
	if (batchImportDialogRef.value) batchImportDialogRef.value.openDialog();
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
	exportJobList(state.params).then((res) => {
		if(res.code==200){
			exportExcelSheet(
				JOB_HEADER_EXPORT,
				res.data.map((item) => {
					return {
						empName: item.empName,
						empIdcard: item.empIdcard,
						workUnit: item.workUnit,
						workDepart: item.workDepart || '',
						workJob: item.workJob || '',
						workingType: translateDict(state.workTypeList, item.workingType) || '',
						workingStatus: item.workingStatus ? '离职' : '在职',
						startDate: item.startDate ? item.startDate.substring(0, 10) : '',
						endDate: item.endDate ? item.endDate.substring(0, 10) : '',
					};
				}),
				`工作记录批量导出${moment().format('YYYYMMDD')}`
			);
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

// 多选
const selectionChange = (res) => {
	state.selectOptions = res;
	if (res.length > 0) {
		state.btn[3].disabled = false;
	} else {
		state.btn[3].disabled = true;
	}
};
// 批量删除
const handleBatchDelete = () => {
	if (state.selectOptions.length > 0) {
		ElMessageBox.confirm(`是否确定删除${state.selectOptions.length}条工作记录？`, '提示', {
			type: 'warning',
		}).then(() => {
			const ids = [];
			state.selectOptions.map((item) => {
				ids.push(item.id);
			});
			deleteJobByIds(ids).then((res) => {
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
			dataIndex: 'workUnit',
			title: '工作单位',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'workDepart',
			title: '工作部门',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'workJob',
			title: '工作岗位',
			hideInSearch: true,
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'workingType	',
			title: '工作类型',
			hideInSearch: true,
			minWidth: 140,
			formatter: (row) => {
				return translateDict(state.workTypeList, row.workingType) || '--';
			},
		},
		{
			dataIndex: 'workingStatus',
			title: '在职状态',
			hideInSearch: true,
			minWidth: 120,
			scopedSlots: { customRender: 'workingStatus' },
		},
		{
			dataIndex: 'startDate',
			title: '开始工作日期',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				return row.startDate ? row.startDate.substring(0, 10) : '';
			},
		},
		{
			dataIndex: 'endDate',
			title: '结束工作日期',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				return row.endDate ? row.endDate.substring(0, 10) : '--';
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
			permission: ['archives_tempworkrecording_add'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '批量导入',
			permission: ['archives_tempworkrecording_importListAdd'],
			onClick: handleBatchImport,
			type: 'normal',
			icon: 'icon-ic_edit_upload',
		},
		{
			label: '批量导出',
			permission: ['archives_tempworkrecording-export'],
			onClick: handleBatchExport,
			type: 'normal',
			icon: 'icon-ic_edit_export',
		},
		{
			label: '批量删除',
			permission: ['archives_tempworkrecording_del_batch'],
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
			permission: ['archives_tempworkrecording_get'], // 权限标识
		},
		{
			text: '编辑',
			prop: 'edit', // 唯一标识
			permission: ['archives_tempworkrecording_edit'], // 权限标识
		},
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: ['archives_tempworkrecording_del'], // 权限标识
		},
	],
	detailConf: [
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '工作单位', key: 'workUnit', tooltip: true },
		{ label: '工作部门', key: 'workDepart', tooltip: true },
		{ label: '工作岗位', key: 'workJob', tooltip: true },
		{ label: '工作类型', key: 'workingType' },
		{ label: '在职状态', key: 'workingStatus' },
		{ label: '开始工作日期', key: 'startDate' },
		{ label: '结束工作日期', key: 'endDate' },
		{ label: '创建人', key: 'createName' },
		{ label: '创建时间', key: 'createTime' },
	],
	workTypeList: [], //字典数据
	selectOptions: [],
	params: {},
});

const { columns, cellBtns, btn, searchConfig } = toRefs(state);

const request = async (params) => {
	try {
		const res = await getJobRecordList(params);
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
				const res = await deteleJob(item.id);
				if (res && res.code == 200) {
					ElMessage.success('删除成功');
					refresh();
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			})
			.catch(() => {});
	} else if (prop === 'edit') {
		addJobRef.value.openDialog(item, state.workTypeList);
	} else if (prop === 'detail') {
		// 详情
		getJobDetail(item.id)
			.then((res) => {
				if (res.code == 200) {
					const data = res.data;
					data.workingType = translateDict(state.workTypeList, data.workingType);
					data.workingStatus = translateStatus(data.workingStatus);
					data.startDate = data.startDate ? data.startDate.substring(0, 10) : '';
					data.endDate = data.endDate ? data.endDate.substring(0, 10) : '';
					if (attachDetailRef.value) attachDetailRef.value.openDialog(data, state.detailConf, '工作记录详情');
				} else {
					ElMessage.error(res.msg || '获取工作记录详情失败');
				}
			})
			.catch((e) => {
				ElMessage.error('获取工作记录详情失败');
			});
	}
};

const translateStatus = (status) => {
	return status == '0' ? '在职' : '离职';
};

const initConfigData = () => {
	getDictbyType('workinfo_type')
		.then((res) => {
			if (res && res.code == 200 && res.data) {
				state.workTypeList = res.data;
			} else {
				ElMessage.error(res.msg || '获取工作类型字典失败');
			}
		})
		.catch((e) => {
			ElMessage.error(e.msg || '获取工作类型字典失败');
		});
};

onMounted(() => {
	initConfigData();
});
</script>
<style lang="scss" scoped src="./css/index.scss"></style>
