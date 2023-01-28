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
								<a href="/template/员工伤残模板.xls" download> 批量导入模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:injuryIdentification="item">
				<el-tag size="small" :type="item.injuryIdentification == 1 ? 'info' : ''">{{ item.injuryIdentification == 1 ? '否' : '是' }}</el-tag>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		<!--详情-->
		<attach-detail-vue ref="attachDetailRef"></attach-detail-vue>
		<add-invalidism-vue ref="addInvalidismRef" @ok="refresh"></add-invalidism-vue>

		<!--批量导入弹框-->
		<batch-import-dialog
			ref="batchImportDialogRef"
			:header="INVALIDISM_HEADER"
			url="/yifu-archives/method/tempdisabilityinfo/importListAdd"
			@ok="refresh"
			:errName="'员工伤残信息批量导入'"
			:download="true"
			:type="1"
		/>
	</div>
</template>

<script setup name="伤残信息">
import { reactive, ref, toRefs } from 'vue';

import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox } from 'element-plus';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { INVALIDISM_HEADER, INVALIDISM_HEADER_EXPORT } from '/@/utils/header';
import { exportExcel } from '/@/utils/xlsx';
import {exportExcelSheet} from '/@/utils/excel.js';
import attachDetailVue from './component/attachDetail.vue';
import addInvalidismVue from './component/addInvalidism.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { getInvalidismList, deleteInvalidism, exportInvalidismList, deleteInvalidismByIds, getInvalidismDetail } from '/@/api/attach';
import { getDictbyType } from '/@/api/dict';
import { translateDict } from '/@/utils/utils';
import moment from 'moment';

const proTableRef = ref(null);
const attachDetailRef = ref(null);
const addInvalidismRef = ref(null);
const batchImportDialogRef = ref(null);

// 新增按钮
const handleAddClick = () => {
	addInvalidismRef.value.openDialog('', state.disabilityGradeList);
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
	exportInvalidismList(state.params).then((res) => {
		if (res.code == 200) {
			exportExcelSheet(
				INVALIDISM_HEADER_EXPORT,
				res.data.map((item) => {
					return {
						empName: item.empName,
						empIdcard: item.empIdcard,
						disabilityName: item.disabilityName || '',
						occupationalDisease: item.occupationalDisease || '',
						disabilityLevel: translateDict(state.disabilityGradeList, item.disabilityLevel) || '',
						startTime: item.startTime ? item.startTime.substring(0, 10) : '',
						endTime: item.endTime ? item.endTime.substring(0, 10) : '',
						injuryIdentification: item.injuryIdentification == 1 ? '否' : '是',
						remark: item.remark || '',
					};
				}),
				`伤残信息批量导出${moment().format('YYYYMMDD')}`
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

const selectionChange = (selection) => {
	state.selectOptions = selection;
	if (selection.length > 0) {
		state.btn[3].disabled = false;
	} else {
		state.btn[3].disabled = true;
	}
};

const handleBatchDelete = () => {
	if (state.selectOptions.length > 0) {
		ElMessageBox.confirm(`是否确定删除${state.selectOptions.length}条伤残信息？`, '提示', {
			type: 'warning',
		}).then(() => {
			const ids = [];
			state.selectOptions.map((item) => {
				ids.push(item.id);
			});
			deleteInvalidismByIds(ids).then((res) => {
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
			dataIndex: 'disabilityName',
			title: '伤残病名称',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'occupationalDisease',
			title: '职业病名称',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'disabilityLevel',
			title: '伤残等级',
			hideInSearch: true,
			minWidth: 120,
			formatter: (row) => {
				return translateDict(state.disabilityGradeList, row.disabilityLevel) || '--';
			},
		},
		{
			dataIndex: 'startTime',
			title: '伤残开始日期',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				return row.startTime ? row.startTime.substring(0, 10) : '';
			},
		},
		{
			dataIndex: 'endTime',
			title: '伤残结束日期',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				return row.endTime ? row.endTime.substring(0, 10) : '';
			},
		},
		{
			dataIndex: 'injuryIdentification',
			title: '是否工伤',
			hideInSearch: true,
			minWidth: 120,
			scopedSlots: { customRender: 'injuryIdentification' },
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
			permission: ['archives_tempdisabilityinfo_add'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '批量导入',
			permission: ['archives_tempdisabilityinfo_importListAdd'],
			onClick: handleBatchImport,
			type: 'normal',
			icon: 'icon-ic_edit_upload',
		},
		{
			label: '批量导出',
			permission: ['archives_tempdisabilityinfo_exportList'],
			onClick: handleBatchExport,
			type: 'normal',
			icon: 'icon-ic_edit_export',
		},
		{
			label: '批量删除',
			permission: ['archives_tempdisabilityinfo_del_batch'],
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
			permission: ['archives_tempdisabilityinfo_get'], // 权限标识
		},
		{
			text: '编辑',
			prop: 'edit', // 唯一标识
			permission: ['archives_tempdisabilityinfo_edit'], // 权限标识
		},
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: ['archives_tempdisabilityinfo_del'], // 权限标识
		},
	],
	detailConf: [
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '伤残病名称', key: 'disabilityName', tooltip: true },
		{ label: '职业病名称', key: 'occupationalDisease', tooltip: true },
		{ label: '伤残等级', key: 'disabilityLevel' },
		{ label: '是否工伤', key: 'injuryIdentification' },
		{ label: '伤残开始日期', key: 'startTime' },
		{ label: '伤残结束日期', key: 'endTime' },
		{ label: '创建人', key: 'createName' },
		{ label: '创建时间', key: 'createTime' },
		{ label: '备注', key: 'remark', tooltip: 'true', size: 24 },
		{ label: '附件内容', key: '', file: 'true', size: 24 },
	], // 详情展示用的配置
	disabilityGradeList: [], //伤残等级字典
	selectOptions: [], //下拉框选项
	params: {},
});

const { columns, cellBtns, btn, searchConfig } = toRefs(state);

const request = async (params) => {
	try {
		const res = await getInvalidismList(params);
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
				const res = await deleteInvalidism(item.id);
				if (res && res.code == 200) {
					ElMessage.success('删除成功');
					refresh();
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			})
			.catch(() => {});
	} else if (prop === 'edit') {
		addInvalidismRef.value.openDialog(item, state.disabilityGradeList);
	} else if (prop === 'detail') {
		// 详情
		getInvalidismDetail(item.id)
			.then((res) => {
				if (res.code == 200 && res.data) {
					const data = res.data;
					data.startTime = data.startTime ? data.startTime.substring(0, 10) : '';
					data.endTime = data.endTime ? data.endTime.substring(0, 10) : '';
					data.disabilityLevel = translateDict(state.disabilityGradeList, data.disabilityLevel);
					data.injuryIdentification = data.injuryIdentification == '0' ? '是' : '否';
					if (attachDetailRef.value) attachDetailRef.value.openDialog(data, state.detailConf, '伤残信息详情', true);
				} else {
					ElMessage.error(res.msg || '获取伤残信息详情失败');
				}
			})
			.catch((err) => {
				ElMessage.error('获取伤残信息详情失败');
			});
	}
};

const initConfigData = () => {
	// 伤残等级
	getDictbyType('disability_grade')
		.then((res) => {
			if (res && res.code == 200 && res.data) {
				state.disabilityGradeList = res.data;
			} else {
				ElMessage.error(res.msg || '获取伤残等级字典失败');
			}
		})
		.catch((e) => {
			ElMessage.error(e.msg || '获取伤残等级字典失败');
		});
};

onMounted(() => {
	initConfigData();
});
</script>
<style lang="scss" scoped src="./css/index.scss"></style>

