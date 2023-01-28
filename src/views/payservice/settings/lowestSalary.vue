<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn" :showHeader="false">
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<add-min-salary-conf ref="addMinSalaryConfRef" @ok="refreshList"></add-min-salary-conf>
	</div>
</template>

<!---->
<script setup name="最低工资标准">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import addMinSalaryConf from './component/addMinSalaryConf.vue';
import { getMinSalaryList, delMinSalary } from '/@/api/payservice/settings';
import { idToArea } from '/@/utils/city';
import {  formatMoney } from '/@/utils/utils';
import { onRefresh, offRefresh } from '/@/utils/events';
import { ElMessage, ElMessageBox } from 'element-plus';
const proTableRef = ref(null);
const route = useRoute();

const addMinSalaryConfRef = ref(null);

const { proxy } = getCurrentInstance();
const refreshList = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.onSearch();
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'edit':
			// 编辑
			if (addMinSalaryConfRef.value) addMinSalaryConfRef.value.openDialog(item);
			break;
		case 'delete':
			// 删除
			deleteCell(item);
			break;
	}
};

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
				const res = await delMinSalary(item.id);
				if (res && res.code === 200) {
					ElMessage.success('删除成功');
					refreshList();
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				ElMessage.error('删除失败');
			}
		})
		.catch(() => {});
};

const state = reactive({
	searchConfig: {
		labelWidth: 90,
	},
	columns: [
		{
			dataIndex: 'address',
			valueType: 'addRess',
			title: '所在地',
			minWidth: 220,
			params: {
				pro: 'province',
				city: 'city',
				town: 'town',
			},
			tooltip: true,
			fixed: 'left',
			formatter: (row) => {
				return idToArea({ province: row.province, city: row.city, town: row.town });
			},
		},
		{
			dataIndex: 'salaryBase',
			title: '最低工资（元）',
			minWidth: 180,
			ellipsis: true,
			formatter: (row) => {
				return formatMoney(row.salaryBase);
			},
		},
		// {
		// 	dataIndex: 'applyStartDate',
		// 	title: '有效区间',
		// 	minWidth: 220,
		// 	tooltip: true,
		// 	hideInSearch: true,
		// 	formatter: (row) => {
		// 		let start = row.startDate;
		// 		let end = row.endDate;
		// 		return start + '~' + end;
		// 	},
		// },
		{
			// 改为已启用、已禁用无过期状态
			dataIndex: 'status',
			title: '状态',
			minWidth: 160,
			valueEnum: {
				1: '启用',
				2: '停用',
			},
		},

		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 240,
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
			onClick: () => {
				if (addMinSalaryConfRef.value) addMinSalaryConfRef.value.openDialog();
			},
			permission: ['wxhr:tminsalary_add'],
			icon: 'icon-ic_edit_add',
		},
	],
	cellBtns: [
		{
			text: '编辑',
			permission: ['wxhr:tminsalary_edit'],
			prop: 'edit', // 唯一标识
		},
		{
			text: '删除',
			permission: ['wxhr:tminsalary_del'],
			prop: 'delete',
		},
	],
	dictKeys: [],
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

const loadDicts = async () => {
	if (state.dictKeys && state.dictKeys.length) {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
		}
	}
};

const request = async (params) => {
	try {
		const res = await getMinSalaryList(params);
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