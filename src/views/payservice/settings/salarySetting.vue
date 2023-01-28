<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn" :searchConfig="state.searchConfig">
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<add-salary-Setting ref="addSalarySettingRef" @ok="refreshList"></add-salary-Setting>
	</div>
</template>

<script setup name="工资报表配置">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';

import addSalarySetting from './component/addSalarySetting.vue';

import { getSalaySettingList,deleteSalaySetting } from '/@/api/payservice/settings';

import { onRefresh, offRefresh } from '/@/utils/events';
import { ElMessage, ElMessageBox } from 'element-plus';

const addSalarySettingRef = ref(null); //添加工资配置
const route = useRoute();
const proTableRef = ref(null);
const { proxy } = getCurrentInstance();
const refreshList = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.onSearch();
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'edit':
			// 编辑
			if (addSalarySettingRef.value) addSalarySettingRef.value.openDialog(item);
			break;
		case 'remove':
			// 删除
			deleteCell(item);
			break;
	}
};

/**
 * 删除单条报表
 */
const deleteCell = (item) => {
	const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">删除后，配置将从系统消失，请谨慎操作！</span></p>`;
	ElMessageBox.confirm(text, {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		dangerouslyUseHTMLString: true,
	})
		.then(async () => {
			try {
				const res = await deleteSalaySetting(item.id);
				if (res && res.code === 200) {
					ElMessage.success('工资报表删除成功');
					refreshList();
				} else {
					ElMessage.error(res.msg || '工资报表删除失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				ElMessage.error((e && e.msg) || '工资报表删除失败');
			}
		})
		.catch(() => {});
};

const state = reactive({
	searchConfig: {
		labelWidth: 120,
		option: {
			extBtn: 'extBtns',
		},
	},
	columns: [
		{
			dataIndex: 'dbFiedName',
			title: '系统标准数据项',
			minWidth: 180,
			hideInSearch: false,
			tooltip: false,
		},
		{
			dataIndex: 'cnName',
			title: '原表对应数据项',
			minWidth: 180,
			hideInSearch: false,
			tooltip: false,
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 120,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
	params: {},
	btn: [
		{
			label: '新增',
			onClick: () => {
				if (addSalarySettingRef.value) addSalarySettingRef.value.openDialog();
			},
			permission: ['wxhr:tsalaryconfigstandard_add'],
			icon: 'icon-ic_edit_add',
		},
	],
	cellBtns: [
		{
			text: '编辑',
			permission: ['wxhr:tsalaryconfigstandard_edit'],
			prop: 'edit', // 唯一标识
		},
		{
			text: '删除',
			permission: ['wxhr:tsalaryconfigstandard_del'],
			prop: 'remove', // 唯一标识
		},
	],
	dictKeys: ['emp_natrue', 'send_order_type', 'social-conduct-status', 'fund-conduct-status', 'dispatch-audit-status'],
	DICTS: {},
});

const listener = () => {
	onRefresh(proxy, route.path, () => {
		refreshList();
	});
};

onUnmounted(() => {
	offRefresh(proxy);
});

onMounted(() => {
	listener();
});

const request = async (params) => {
	try {
		if (params.createTime) {
			params.createTime = null;
		}
		const res = await getSalaySettingList(params);
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
</script>

<style lang="scss" scoped src="./css/comm.scss"></style>
