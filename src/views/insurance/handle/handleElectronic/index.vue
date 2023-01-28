<template>
	<div class="custserve-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="state.columns"
			:request="request"
			:btn="state.btn"
			:searchConfig="state.searchConfig"
		>
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

			<template v-slot:enclosureName="item">
				<a @click="onItemClick(item)" class="item-click">{{ item.enclosureName }}</a>
			</template>
		</pro-table>

		<add-electronic ref="addElectronicRef" @ok="refresh" />
	</div>
</template>

<script setup name="电子保单">
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import addElectronic from '../../component/addElectronic.vue';

import { getPage, deleteInsuranceEnclosure, getInsuranceEnclosureUrl } from '/@/api/insurance/electronic.js';

const proTableRef = ref(null);
const addElectronicRef = ref(null);

// 导入
const handleAddClick = () => {
	addElectronicRef?.value?.openDialog();
};

const state = reactive({
	columns: [
		{
			dataIndex: 'enclosureName',
			title: '保单号',
			hideInTable: true,
		},
		{
			dataIndex: 'enclosureName',
			title: '保单号',
			valueType: 'custom',
			scopedSlots: { customRender: 'enclosureName' },
			hideInSearch: true,
		},
		{
			dataIndex: 'createName',
			title: '导入人',
		},
		{
			dataIndex: 'createTime',
			title: '导入时间',
			valueFormat: 'YYYY-MM-DD',
			valueType: 'date',
			hideInSearch: true,
		},
		{
			dataIndex: 'policyDate',
			title: '导入时间',
			hideInTable: true,
			selectType: 'daterange',
			format: 'YYYY-MM-DD',
			valueFormat: 'YYYY-MM-DD',
			searchIndex: 'startEndTime',
			startTime: 'startTime',
			endTime: 'endTime',
			valueType: 'dateTimeRange',
		},
		{
			dataIndex: 'remark',
			title: '备注',
			minWidth: 150,
			ellipsis: true,
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 70,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
	btn: [
		{
			label: '导入',
			onClick: handleAddClick,
			permission: ['insurance_handle_electronic_import'],
			icon: 'icon-ic_edit_add',
		},
	],
	cellBtns: [
		{
			text: '删除',
			prop: 'delete', // 唯一标识
			permission: ['insurance_handle_electronic_delete'], // 权限标识
		},
	],
});

const deleteCell = (item) => {
	const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，电子保单记录将从系统消失，请谨慎操作！</span></p>`;

	ElMessageBox.confirm(text, {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		dangerouslyUseHTMLString: true,
	})
		.then(async () => {
			try {
				const res = await deleteInsuranceEnclosure(item.id);
				if (res.code === 200) {
					ElMessage.success('删除成功');
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			} catch (e) {
				ElMessage.error('删除失败');
			} finally {
				proTableRef?.value?.doSearch();
			}
		})
		.catch(() => {});
};

const onCellClick = (prop, item) => {
	switch (prop) {
		case 'delete': // 删除操作
			deleteCell(item);
			break;
	}
};

const onItemClick = (item) => {
	ElMessage.warning('正在下载');
	getInsuranceEnclosureUrl(item.id).then((res) => {
		const path = (res.data || '').replace(/(http:|https:)/, location.protocol);
		window.open(path, '_blank');
	});
};

const refresh = () => {
	proTableRef?.value?.refresh();
};

const request = async (params) => {
	const p = Object.assign({}, state.params, params);
	try {
		const res = await getPage(
			{
				current: params.current,
				size: params.size,
				mId:p.mId
			},
			p
		);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records || [],
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
</script>
