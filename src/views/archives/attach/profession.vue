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
								<a href="/template/员工职业资格模板.xls" download> 批量导入模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:heightIdentification="item">
				<el-tag size="small" :type="item.heightIdentification == 1 ? 'info' : ''">{{ item.heightIdentification == 1 ? '否' : '是' }}</el-tag>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		<!--详情-->
		<attach-detail-vue ref="attachDetailRef"></attach-detail-vue>
		<add-profession-vue ref="addProfessionRef" @ok="refresh"></add-profession-vue>

		<!--批量导入弹框-->
		<batch-import-dialog
			ref="batchImportDialogRef"
			:header="PROFESSION_HEADER"
			:errName="'员工职业资格批量导入'"
			:download="true"
			url="/yifu-archives/method/tempprofessionalqualification/importListAdd"
			@ok="refresh"
		/>
	</div>
</template>

<script setup name="职业资格">
import { reactive, ref, toRefs } from 'vue';

import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox } from 'element-plus';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { PROFESSION_HEADER, PROFESSION_HEADER_EXPORT } from '/@/utils/header';
import { exportExcel } from '/@/utils/xlsx';
import {exportExcelSheet} from '/@/utils/excel';
import attachDetailVue from './component/attachDetail.vue';
import addProfessionVue from './component/addProfession.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { getProfessionList, deleteProfession, exportProfessionList, getProfessionDetail, deleteProfessionByIds } from '/@/api/attach';
import { getDictbyType } from '/@/api/dict';
import { translateDict } from '/@/utils/utils';
import moment from 'moment';

const proTableRef = ref(null);
const attachDetailRef = ref(null);
const addProfessionRef = ref(null);
const batchImportDialogRef = ref(null);

// 新增按钮
const handleAddClick = () => {
	addProfessionRef.value.openDialog('', state.dictConfig);
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
	exportProfessionList(state.params).then((res) => {
		if(res.code==200){
			exportExcelSheet(
				PROFESSION_HEADER_EXPORT,
				res.data.map((item) => {
					return {
						empName: item.empName,
						empIdcard: item.empIdcard,
						certificationNo: item.certificationNo || '',
						declareYear: item.declareYear || '',
						assessmentUnit: item.assessmentUnit || '',
						obtainType: translateDict(state.dictConfig.obtainTypeList, item.obtainType) || '',
						qualificationType: translateDict(state.dictConfig.qualificationTypeList, item.qualificationType) || '',
						qualificationLevel: translateDict(state.dictConfig.qualificationLevelList, item.qualificationLevel) || '',
						heightIdentification: item.heightIdentification == 1 ? '否' : '是',
						remark: item.remark || '',
					};
				}),
				`职业资格批量导出_${moment().format('YYYYMMDD')}`
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
		ElMessageBox.confirm(`是否确定删除${state.selectOptions.length}条职业资格？`, '提示', {
			type: 'warning',
		}).then(() => {
			const ids = [];
			state.selectOptions.map((item) => {
				ids.push(item.id);
			});
			deleteProfessionByIds(ids).then((res) => {
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
			dataIndex: 'certificationNo',
			title: '证书编号',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'declareYear',
			title: '申报年度',
			hideInSearch: true,
			minWidth: 120,
			ellipsis: true,
		},
		{
			dataIndex: 'assessmentUnit',
			title: '评定机构',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'obtainType',
			title: '获取方式',
			hideInSearch: true,
			minWidth: 120,
			formatter: (row) => {
				return translateDict(state.dictConfig.obtainTypeList, row.obtainType) || '--';
			},
		},
		{
			dataIndex: 'qualificationType',
			title: '资格类型',
			hideInSearch: true,
			minWidth: 200,
			ellipsis: true,
			formatter: (row) => {
				return translateDict(state.dictConfig.qualificationTypeList, row.qualificationType) || '--';
			},
		},
		{
			dataIndex: 'qualificationLevel',
			title: '资格等级',
			hideInSearch: true,
			minWidth: 120,
			formatter: (row) => {
				return translateDict(state.dictConfig.qualificationLevelList, row.qualificationLevel) || '--';
			},
		},
		{
			dataIndex: 'heightIdentification',
			title: '是否最高资格',
			hideInSearch: true,
			minWidth: 120,
			scopedSlots: { customRender: 'heightIdentification' },
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
			permission: ['archives_tempprofessionalqualification_add'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '批量导入',
			permission: ['archives-professionalqualification-batch-import'],
			onClick: handleBatchImport,
			type: 'normal',
			icon: 'icon-ic_edit_upload',
		},
		{
			label: '批量导出',
			permission: ['archives-professionalqualification-batch-export'],
			onClick: handleBatchExport,
			type: 'normal',
			icon: 'icon-ic_edit_export',
		},
		{
			label: '批量删除',
			permission: ['archives_tempprofessionalqualification_del_batch'],
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
			permission: ['archives_tempprofessionalqualification_get'], // 权限标识
		},
		{
			text: '编辑',
			prop: 'edit', // 唯一标识
			permission: ['archives_tempprofessionalqualification_edit'], // 权限标识
		},
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: ['archives_tempprofessionalqualification_del'], // 权限标识
		},
	],
	detailConf: [
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '证书编号', key: 'certificationNo', tooltip: true },
		{ label: '申报年度', key: 'declareYear' },
		{ label: '评定机构', key: 'assessmentUnit', tooltip: true },
		{ label: '获取方式', key: 'obtainType' },
		{ label: '资格类型', key: 'qualificationType' },
		{ label: '资格等级', key: 'qualificationLevel' },
		{ label: '是否最高资格', key: 'heightIdentification', size: 24 },
		{ label: '创建人', key: 'createName' },
		{ label: '创建时间', key: 'createTime' },
		{ label: '备注', key: 'remark', tooltip: 'true', size: 24 },
		{ label: '附件内容', key: '', file: 'true', size: 24 },
	], // 详情展示用的配置
	dictConfig: {
		obtainTypeList: [],
		qualificationTypeList: [],
		qualificationLevelList: [],
	},
	selectOptions: [],
	params: {},
});

const { columns, cellBtns, btn, searchConfig } = toRefs(state);

const request = async (params) => {
	try {
		const res = await getProfessionList(params);
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
				const res = await deleteProfession(item.id);
				if (res && res.code == 200) {
					ElMessage.success('删除成功');
					refresh();
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			})
			.catch(() => {});
	} else if (prop === 'edit') {
		addProfessionRef.value.openDialog(item, state.dictConfig);
	} else if (prop === 'detail') {
		// 详情
		getProfessionDetail(item.id)
			.then((res) => {
				if (res && res.code == 200 && res.data) {
					const data = res.data;
					data.obtainType = translateDict(state.dictConfig.obtainTypeList, item.obtainType) || '';
					data.qualificationType = translateDict(state.dictConfig.qualificationTypeList, item.qualificationType) || '';
					data.qualificationLevel = translateDict(state.dictConfig.qualificationLevelList, item.qualificationLevel) || '';
					data.heightIdentification = data.heightIdentification == 1 ? '否' : '是';
					if (attachDetailRef.value) attachDetailRef.value.openDialog(data, state.detailConf, '职业资格详情', true);
				} else {
					ElMessage.error(res.msg || '获取职业资格详情失败');
				}
			})
			.catch((err) => {
				ElMessage.error('获取职业资格详情失败');
			});
	}
};

const initConfigData = () => {
	// 获取方式
	getDictbyType('obtain_type')
		.then((res) => {
			if (res && res.code == 200 && res.data) {
				state.dictConfig.obtainTypeList = res.data;
			} else {
				ElMessage.error(res.msg || '获取资格获取方式字典失败');
			}
		})
		.catch((e) => {
			ElMessage.error(e.msg || '获取资格获取方式字典失败');
		});
	//  资格类型
	getDictbyType('qualification_type')
		.then((res) => {
			if (res && res.code == 200 && res.data) {
				state.dictConfig.qualificationTypeList = res.data;
			} else {
				ElMessage.error(res.msg || '获取资格类型字典失败');
			}
		})
		.catch((e) => {
			ElMessage.error(e.msg || '获取资格类型字典失败');
		});

	// 资格证书
	getDictbyType('qualification_level')
		.then((res) => {
			if (res && res.code == 200 && res.data) {
				state.dictConfig.qualificationLevelList = res.data;
			} else {
				ElMessage.error(res.msg || '获取资格证书字典失败');
			}
		})
		.catch((e) => {
			ElMessage.error(e.msg || '获取资格证书字典失败');
		});
};

onMounted(() => {
	initConfigData();
});
</script>
<style lang="scss" scoped src="./css/index.scss"></style>

