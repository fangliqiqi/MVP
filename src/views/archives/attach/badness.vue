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
								<a href="/template/不良记录批量导入模板.xlsx" download> 批量导入模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<!-- <template v-slot:heightIdentification="item">
				<el-tag size="small" :type="item.heightIdentification == 1 ? 'info' : ''">{{ item.heightIdentification == 1 ? '否' : '是' }}</el-tag>
			</template> -->
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		<!--详情-->
		<table-detail-vue ref="tableDetailRef"></table-detail-vue>
		<!-- 新增 -->
		<add-badness-vue ref="addBadnessRef" @ok="refresh"></add-badness-vue>

		<!--批量导入弹框-->
		<batch-import-dialog
			ref="batchImportDialogRef"
			:header="BADNESS_HEADER"
			:errName="'员工不良记录批量导入'"
			:download="true"
			url="/yifu-archives/method/tempbadrecord/importListAdd"
			@ok="refresh"
		/>
	</div>
</template>

<script setup name="不良记录">
import { reactive, ref, toRefs } from 'vue';

import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox } from 'element-plus';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { BADNESS_HEADER } from '/@/utils/header';
import tableDetailVue from '/@/components/TableDetail/index.vue';
import addBadnessVue from './component/addBadness.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { getBadnessList, deleteBadness, exportBadnessList, getBadnessDetail, deleteBadnessByIds } from '/@/api/attach';
import moment from 'moment';
import { truncate } from 'lodash';

const proTableRef = ref(null);
const tableDetailRef = ref(null);
const addBadnessRef = ref(null);
const batchImportDialogRef = ref(null);

// 新增按钮
const handleAddClick = () => {
	addBadnessRef.value.openDialog('', state.dictConfig);
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
	state.btn.find((item) => item.label === '批量导出').loading = true;
	exportBadnessList(state.params)
		.then((res) => {
			if (res.code == 200) {
				ElMessage.success('导出成功');
			} else {
				ElMessage.error(res.msg || '导出失败');
			}
		})
		.catch((err) => {
			ElMessage.error(err.msg || '导出失败');
		}).finally(() => {
			state.btn.find((item) => item.label === '批量导出').loading = false;
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
		ElMessageBox.confirm(`是否确定删除${state.selectOptions.length}条不良记录？`, '提示', {
			type: 'warning',
		}).then(() => {
			const ids = [];
			state.selectOptions.map((item) => {
				ids.push(item.id);
			});
			deleteBadnessByIds(ids).then((res) => {
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
			dataIndex: 'project',
			title: '产生项目',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'happenTime',
			title: '发生时间',
			hideInSearch: true,
			minWidth: 120,
			dateFormat: 'YYYY-MM-DD',
			ellipsis: true,
		},
		{
			dataIndex: 'loseFee',
			title: '费用损失',
			hideInSearch: true,
			minWidth: 140,
		},
		{
			dataIndex: 'loseFeeOther',
			title: '其他损失',
			hideInSearch: true,
			minWidth: 140,
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
			permission: ['demo_tempbadrecord_add'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '批量导入',
			permission: ['archives_tempbadrecord_importListAdd'],
			onClick: handleBatchImport,
			type: 'normal',
			icon: 'icon-ic_edit_upload',
		},
		{
			label: '批量导出',
			permission: ['demo_tempbadrecord_export_batch'],
			onClick: handleBatchExport,
			type: 'normal',
			loading: false,
			icon: 'icon-ic_edit_export',
		},
		{
			label: '批量删除',
			permission: ['demo_tempbadrecord_del_batch'],
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
			permission: ['demo_tempbadrecord_get'], // 权限标识
		},
		{
			text: '编辑',
			prop: 'edit', // 唯一标识
			permission: ['demo_tempbadrecord_edit'], // 权限标识
		},
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: ['demo_tempbadrecord_del'], // 权限标识
		},
	],
	detailConf: [
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '产生项目', key: 'project', tooltip: true },
		{ label: '项目编码', key: 'projectCode' },
		{ label: '发生时间', key: 'happenTime', date: 'YYYY-MM-DD' },
		{ label: '费用损失', key: 'loseFee' },
		{ label: '其他损失', key: 'loseFeeOther' },
		{ label: '创建人', key: 'createName' },
		{ label: '创建时间', key: 'createTime' },
		{ label: '不良记录描述', key: 'remark', size: 24, tooltip: true },
		{ label: '附件内容', key: '', file: 'true', size: 24 },
	], // 详情展示用的配置
	selectOptions: [],
	params: {},
});

const { columns, cellBtns, btn, searchConfig } = toRefs(state);

const request = async (params) => {
	try {
		const res = await getBadnessList(params);
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
				const res = await deleteBadness(item.id);
				if (res && res.code == 200) {
					ElMessage.success('删除成功');
					refresh();
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			})
			.catch(() => {});
	} else if (prop === 'edit') {
		addBadnessRef.value.openDialog(item);
	} else if (prop === 'detail') {
		// 详情
		getBadnessDetail(item.id)
			.then((res) => {
				if (res && res.code == 200 && res.data) {
					const data = res.data;
					if (tableDetailRef.value) tableDetailRef.value.openDialog(data, state.detailConf, '不良记录详情', true);
				} else {
					ElMessage.error(res.msg || '获取不良记录详情失败');
				}
			})
			.catch(() => {
				ElMessage.error('获取不良记录详情失败');
			});
	}
};
</script>
<style lang="scss" scoped src="./css/index.scss"></style>
