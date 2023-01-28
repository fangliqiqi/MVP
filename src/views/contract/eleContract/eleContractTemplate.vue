<template>
	<div class="contract-apply-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn" @onReset="onReset" manualRequest>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

			<template v-slot:address="item">
				<el-tree-select
					v-model="state.params.fileAddress"
					:data="state.areaJson"
					:key="'arch_search_props_' + item.dateIndex + '_'"
					style="width: 100%"
					placeholder="请选择"
					:props="state.areaProps"
					@current-change="changeFileAddress"
					@clear="clearFileAddress"
					node-key="id"
					check-strictly
					clearable
				/>
			</template>
		</pro-table>

		<!--新增-->
		<edit-ele-contract-template-vue type="add" ref="addEleContractTemplateRef" @ok="refreshList"> </edit-ele-contract-template-vue>
		<!--编辑-->
		<edit-ele-contract-template-vue type="edit" ref="editEleContractTemplateRef" @ok="refreshList"> </edit-ele-contract-template-vue>

		<upload-template-vue ref="uploadTemplateRef"></upload-template-vue>
	</div>
</template>

<script setup name="电子合同模板">
import ProTable from '/@/components/ProTable/ProTable.vue';
import { getEleContractTemplateList, getCompanyTemplatePreviewUrl, getTemplateMainUrl } from '/@/api/eleContract';
import ProButtons from '/@/components/ProButtons/index.vue';
import editEleContractTemplateVue from './component/editEleContractTemplate.vue';
import uploadTemplateVue from './component/uploadTemplate.vue';
import { getCityLevelJson, idToArea } from '/@/utils/city';
import { ElMessageBox, ElMessage } from 'element-plus';
import { ELE_CONTRACT_OVERTIME_FLAG } from '/@/utils/dicts';
import { getDictByItemTypes } from '/@/utils/utils';

const editEleContractTemplateRef = ref(null);
const addEleContractTemplateRef = ref(null);
const proTableRef = ref(null);
const uploadTemplateRef = ref(null);

const onReset = () => {
	state.params = {};
};

onMounted(() => {
	// console.log('获取name instance:', getCurrentInstance());
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
		const res = await getEleContractTemplateList(p);
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
	if (prop === 'edit') {
		// 编辑
		if (editEleContractTemplateRef.value) editEleContractTemplateRef.value.openDialog(item);
	} else if (prop === 'upload') {
		if (uploadTemplateRef.value) uploadTemplateRef.value.openDialog(item);
	} else if (prop === 'preview') {
		// 预览

		getCompanyTemplatePreviewUrl({ id: item.id }).then(
			(res) => {
				if (res.code === 200) {
					window.open(res.data);
				} else {
					ElMessage.error(res.msg || '获取模板预览地址失败');
				}
			},
			(error) => {
				const msg = (error && error.msg) || '获取模板预览地址失败';
				ElMessage.error(msg);
			}
		);
	} else if (prop === 'maintain') {
		// 维护模板
		getTemplateMainUrl({ id: item.id }).then(
			(res) => {
				if (res.code === 200) {
					window.open(res.data);
				} else {
					ElMessage.error(res.msg || '获取模板维护地址失败');
				}
			},
			(error) => {
				const msg = (error && error.msg) || '获取模板维护地址失败';
				ElMessage.error(msg);
			}
		);
	}
};
const changeFileAddress = (val, node) => {
	// 获取档案所在地
	const values = [val.id];
	if (node.parent && node.parent.level != 0) {
		// 获取市或者省
		values.unshift(node.parent.data.id);
	}
	let pro = null,
		city = null;

	pro = values[0] || null;
	if (values.length > 1) city = values[1] || null;

	state.params.province = pro;
	state.params.city = city;
};

const clearFileAddress = () => {
	state.params.province = null;
	state.params.city = null;
};

const state = reactive({
	areaJson: null,
	areaProps: {
		label: 'areaName',
	},
	dictKeys: ['personnel_type'],
	params: {},
	btn: [
		{
			label: '新增',
			onClick: () => {
				if (addEleContractTemplateRef.value) addEleContractTemplateRef.value.openDialog();
			},
			permission: ['demo_fddcontracttemplate_add'],
			icon: 'icon-ic_edit_add',
		},
	],
	cellBtns: [
		{
			text: '编辑',
			prop: 'edit', // 唯一标识
			permission: ['demo_fddcontracttemplate_edit'],
		},
		{
			text: '模板上传',
			prop: 'upload', // 唯一标识
			permission: ['demo_fddcontracttemplate_preview'],
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !!record.fddTemplateId;
			},
		},
		{
			text: '模板预览',
			prop: 'preview', // 唯一标识
			permission: ['demo_fddcontracttemplate_preview'],
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !(record.fddTemplateId && record.modifyUploadStatus == 1);
			},
		},
		{
			text: '模板维护',
			prop: 'maintain', // 唯一标识
			permission: ['demo_fddcontracttemplate_upkeep'],
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !record.fddTemplateId;
			},
		},
	],
	columns: [
		{
			dataIndex: 'localName',
			title: '模板名称',
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'fileaddress',
			title: '地区',
			hideInSearch: true,
			minWidth: 180,
			ellipsis: true,
			formatter: (row) => {
				return idToArea({ province: row.province, city: row.city, town: row.town });
			},
		},
		{
			dataIndex: 'type',
			title: '合同类型',
			hideInSearch: true,
			minWidth: 160,
			ellipsis: true,
		},

		{
			dataIndex: 'modifyUploadStatus',
			title: '合同定稿状态',
			minWidth: 160,
			hideInSearch: true,
			valueEnum: {
				1: '成功',
			},
		},
		{
			dataIndex: 'overtimeWageFlag',
			title: '有无加班工资',
			minWidth: 160,
			hideInSearch: true,
			valueEnum: ELE_CONTRACT_OVERTIME_FLAG,
		},
		{
			dataIndex: 'createName',
			title: '创建人',
			minWidth: 160,
			hideInSearch: true,
			ellipsis: true,
		},
		{
			dataIndex: 'createTime',
			title: '创建时间',
			minWidth: 160,
			hideInSearch: true,
			ellipsis: true,
		},
		{
			dataIndex: 'address',
			title: '地区',
			hideInTable: true,
			valueType: 'custom',
			minWidth: 180,
			scopedSlots: {
				customRender: 'address',
			},
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 280,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
});
</script>
