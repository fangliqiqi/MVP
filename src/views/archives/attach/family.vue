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
								<a href="/template/员工家庭模板.xls" download> 批量导入模板</a>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!--详情-->
		<attach-detail-vue ref="attachDetailRef"></attach-detail-vue>
		<add-family-vue ref="addFamilyRef" @ok="refresh"></add-family-vue>

		<!--批量导入弹框-->
		<batch-import-dialog
			ref="batchImportDialogRef"
			:header="FAMILY_HEADER"
			url="/yifu-archives/method/tempfamily/importListAdd"
			:errName="'员工家庭信息批量导入'"
			:download="true"
			@ok="refresh"
		/>
	</div>
</template>

<script setup name="家庭信息">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import batchImportDialog from '/@/components/BatchImportDialog/index.vue';
import { FAMILY_HEADER, FAMILY_HEADER_EXPORT } from '/@/utils/header';
import { exportExcel } from '/@/utils/xlsx';
import { exportExcelSheet } from '/@/utils/excel';
import { ElMessageBox, ElMessage } from 'element-plus';
import attachDetailVue from './component/attachDetail.vue';
import addFamilyVue from './component/addFamily.vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { deleteFaily, getFailyList, exportFailyList, deleteFailyByIds } from '/@/api/attach';
import { getDictbyType } from '/@/api/dict';
import { translateDict } from '/@/utils/utils';
import moment from 'moment';

const proTableRef = ref(null);
const attachDetailRef = ref(null);
const addFamilyRef = ref(null);
const batchImportDialogRef = ref(null);

// 新增按钮
const handleAddClick = () => {
	addFamilyRef.value.openDialog('', state.relationList);
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
	exportFailyList(state.params).then((res) => {
		if(res.code==200){
			exportExcelSheet(
				FAMILY_HEADER_EXPORT,
				res.data.map((item) => {
					return {
						empName: item.empName,
						empIdcard: item.empIdcard,
						familyName: item.familyName,
						relationshipSelf: translateDict(state.relationList, item.relationshipSelf) || '',
						birthday: item.birthday ? item.birthday.substring(0, 10) : '',
						workUnit: item.workUnit || '',
						contractTel: item.contractTel || '',
					};
				}),
				`家庭信息批量导出${moment().format('YYYY-MM-DD')}`,
			);
			ElMessage.success('导出成功');
		}else{
			ElMessage.error(res.msg);
		}
	}).catch((err) => {
		ElMessage.error('导出失败');
	}).finally(() => {
		state.btn.find((item) => item.label === '批量导出').loading = false;
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
		ElMessageBox.confirm(`是否确定删除${state.selectOptions.length}条家庭信息？`, '提示', {
			type: 'warning',
		}).then(() => {
			const ids = [];
			state.selectOptions.map((item) => {
				ids.push(item.id);
			});

			deleteFailyByIds(ids).then((res) => {
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
			dataIndex: 'familyName',
			title: '成员姓名',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'relationshipSelf',
			title: '与本人关系',
			hideInSearch: true,
			minWidth: 140,
			formatter: (val) => {
				return translateDict(state.relationList, val.relationshipSelf) || '--';
			},
		},
		{
			dataIndex: 'birthday',
			title: '出生日期',
			hideInSearch: true,
			minWidth: 160,
			formatter: (val) => {
				return val.birthday ? val.birthday.substring(0, 10) : '--';
			},
		},
		{
			dataIndex: 'workUnit',
			title: '工作单位',
			hideInSearch: true,
			minWidth: 180,
			tooltip: true,
		},
		{
			dataIndex: 'contractTel',
			title: '手机号码',
			hideInSearch: true,
			minWidth: 160,
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
			permission: ['archives-family-add'],
			icon: 'icon-ic_edit_add',
		},
		{
			label: '批量导入',
			permission: ['archives-family-batch-import'],
			onClick: handleBatchImport,
			type: 'normal',
			icon: 'icon-ic_edit_upload',
		},
		{
			label: '批量导出',
			permission: ['archives-family-batch-export'],
			onClick: handleBatchExport,
			type: 'normal',
			icon: 'icon-ic_edit_export',
			loading:false
		},
		{
			label: '批量删除',
			permission: ['archives-family-batch-delete'],
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
			permission: ['archives-family-detail'], // 权限标识
		},
		{
			text: '编辑',
			prop: 'edit', // 唯一标识
			permission: ['archives-family-edit'], // 权限标识
		},
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: ['archives-family-delete'], // 权限标识
		},
	],
	detailConf: [
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '成员姓名', key: 'familyName', tooltip: true },
		{ label: '与本人关系', key: 'relationshipSelf' },
		{ label: '出生日期', key: 'birthday' },
		{ label: '工作单位', key: 'workUnit', tooltip: true },
		{ label: '手机号码', key: 'contractTel' },
		{ label: '创建人', key: 'createName' },
		{ label: '创建时间', key: 'createTime' },
	],
	relationList: [], //字典数据
	selectOptions: [], //多选数据
	params: {}, //导出请求数据
});

const { columns, cellBtns, btn, searchConfig } = toRefs(state);

const request = async (params) => {
	try {
		const res = await getFailyList(params);
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
// 页面刷新
const refresh = () => {
	proTableRef.value.refresh();
};

const onCellClick = async (prop, item) => {
	if (prop === 'delete') {
		ElMessageBox.confirm('是否确定删除？', '提示', {
			type: 'warning',
		})
			.then(async () => {
				const res = await deleteFaily(item.id);
				if (res && res.code == 200) {
					ElMessage.success('删除成功');
					refresh();
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			})
			.catch(() => {});
	} else if (prop === 'edit') {
		addFamilyRef.value.openDialog(item, state.relationList);
	} else if (prop === 'detail') {
		// 详情
		item.relationshipSelf = translateDict(state.relationList, item.relationshipSelf);
		item.birthday = item.birthday ? item.birthday.substring(0, 10) : '';
		if (attachDetailRef.value) attachDetailRef.value.openDialog(item, state.detailConf, '家庭信息详情');
	}
};

const initConfigData = () => {
	getDictbyType('family_relation')
		.then((res) => {
			if (res && res.code == 200 && res.data) {
				state.relationList = res.data;
			} else {
				ElMessage.error(res.msg || '获取亲属关系字典失败');
			}
		})
		.catch((e) => {
			ElMessage.error(e.msg || '获取亲属关系字典失败');
		});
};

onMounted(() => {
	initConfigData();
});
</script>
<style lang="scss" scoped src="./css/index.scss"></style>
