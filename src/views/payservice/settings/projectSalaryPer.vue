<template>
	<div class="cardinal-config-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn" :searchConfig="state.searchConfig">
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<add-salary-per-Dialog ref="addSalaryPerDialogRef" :isModifyOrAddFlag="isModifyOrAdd" @ok="refreshList"></add-salary-per-Dialog>
	</div>
</template>

<!--项目薪资权限配置-->
<script setup name="项目薪酬权限">
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import addSalaryPerDialog from './component/addSalaryPerDialog.vue';
import { getTdeptseeList, delDeptSee } from '/@/api/payservice/settings';
import { onRefresh, offRefresh } from '/@/utils/events';
import { ElMessage, ElMessageBox } from 'element-plus';
const proTableRef = ref(null);
const router = useRouter();
const route = useRoute();
const isModifyOrAdd = ref(false) //默认是添加   false是修改
const addSalaryPerDialogRef = ref(null);

const { proxy } = getCurrentInstance();
const refreshList = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.onSearch();
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'edit':
			// 编辑
			isModifyOrAdd.value = true
			if (addSalaryPerDialogRef.value) addSalaryPerDialogRef.value.openDialog(item);

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
				const res = await delDeptSee(item.id);
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
			dataIndex: 'deptName',
			title: '项目名称',
			minWidth: 220,
			tooltip: true,
			fixed: 'left',
		},

		{
			dataIndex: 'deptNo',
			title: '项目编码',
			minWidth: 180,
		},
		{
			// 改为已启用、已禁用无过期状态
			dataIndex: 'canSee',
			title: '是否允许查看工资',
			minWidth: 160,
			hideInSearch: true,
			valueEnum: {
				0: '是',
				1: '否',
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
					isModifyOrAdd.value = false
				if (addSalaryPerDialogRef.value) addSalaryPerDialogRef.value.openDialog();
			},
			permission: ['salary_tdeptsee_add'],
			icon: 'icon-ic_edit_add',
		},
	],
	cellBtns: [
		{
			text: '编辑',
			prop: 'edit', // 唯一标识
			permission: ['salary_tdeptsee_edit'],
		},

		{
			text: '删除',
			permission: ['salary_tdeptsee_del'],
			prop: 'remove', // 唯一标识
			tooltip: '当前状态不可操作',
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
		const res = await getTdeptseeList(params);
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