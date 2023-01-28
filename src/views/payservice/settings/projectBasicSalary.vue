<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn" :searchConfig="state.searchConfig">
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<add-salary-basic-conf ref="addSalaryBasicConfigRef" @ok="refreshList"></add-salary-basic-conf>
	</div>
</template>

<script setup name="项目基础配置">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import addSalaryBasicConf from './component/addSalaryBasicConf.vue';
import { getConfigSalaryList, delConfigSalary } from '/@/api/payservice/settings';
import { onRefresh, offRefresh } from '/@/utils/events';
import { ElMessage, ElMessageBox } from 'element-plus';
const proTableRef = ref(null);
const router = useRouter();
const route = useRoute();

const addSalaryBasicConfigRef = ref(null);

const { proxy } = getCurrentInstance();
const refreshList = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.onSearch();
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'edit':
			if (addSalaryBasicConfigRef.value) addSalaryBasicConfigRef.value.openDialog(item);
			break;
		case 'remove':
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
				const res = await delConfigSalary(item.id);
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
			dataIndex: 'name',
			title: '配置名称',
			minWidth: 220,
			tooltip: true,
			fixed: 'left',
		},
		{
			dataIndex: 'departName',
			title: '项目名称',
			minWidth: 180,
			ellipsis: true,
		},
		{
			dataIndex: 'departNo',
			title: '项目编码',
			minWidth: 220,
			tooltip: true,
		},
		{
			dataIndex: 'salaryMonth',
			title: '薪酬月份',
			minWidth: 160,
				hideInSearch: true,
			valueEnum: {
				'-6': '前6月',
				'-5': '前5月',
				'-4': '前4月',
				'-3': '前3月',
				'-2': '前2月',
				'-1': '上月',
				0: '本月',
				1: '下月',
			},
		},

		{
			dataIndex: 'socialMonth',
			title: '社保月份',
			minWidth: 160,
			hideInSearch: true,
			valueEnum: {
				'-6': '前6月',
				'-5': '前5月',
				'-4': '前4月',
				'-3': '前3月',
				'-2': '前2月',
				'-1': '上月',
				0: '本月',
				1: '下月',
			},
		},
		{
			dataIndex: 'fundMonth',
			title: '公积金月份',
			hideInSearch: true,
			minWidth: 160,
			valueEnum: {
				'-6': '前6月',
				'-5': '前5月',
				'-4': '前4月',
				'-3': '前3月',
				'-2': '前2月',
				'-1': '上月',
				0: '本月',
				1: '下月',
			},
		},
		{
			dataIndex: 'socialPriority',
			title: '社保优先级',
			hideInSearch: true,
			minWidth: 160,
			valueEnum: {
				0: '生成',
				1: '缴纳',
			},
		},
		{
			dataIndex: 'fundPriority',
			title: '公积金优先级',
			hideInSearch: true,
			minWidth: 160,
			valueEnum: {
				0: '生成',
				1: '缴纳',
			},
		},
		{
			// 改为已启用、已禁用无过期状态
			dataIndex: 'grantType',
			title: '发放方式',
			minWidth: 160,
			hideInSearch: true,
			valueEnum: {
				0: '现金',
				1: '转账',
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
			label: '新增配置',
			onClick: () => {
				if (addSalaryBasicConfigRef.value) addSalaryBasicConfigRef.value.openDialog();
			},
			permission: ['wxhr:tconfigsalary_add'],
			icon: 'icon-ic_edit_add',
		},
	],
	cellBtns: [
		{
			text: '编辑',
			permission: ['wxhr:tconfigsalary_edit'],
			prop: 'edit', // 唯一标识
		},

		{
			text: '删除',
			permission: ['wxhr:tconfigsalary_del'],
			prop: 'remove', // 唯一标识
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

const request = async (params) => {
	try {
		const res = await getConfigSalaryList(params);
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

