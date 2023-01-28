<template>
	<div class="system-dict-container">
		<pro-table row-key="id" ref="proRef" :columns="columns" :btn="btn" columnEmptyText="--" :request="request">
			<!-- 操作 -->
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
	</div>
</template>

<script setup name="数据权限">
import { reactive, toRefs } from 'vue';
import { getPermissionList, delPermission } from '@/api/permission';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { onRefresh, offRefresh } from '/@/utils/events';

const proRef = ref(null);
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();

// 表头的按钮事件要放在上面，放在下面会报错/
// 新增
const handleAddClick = () => {
	router.push({
		path: '/system/permission/addPermission',
		query: {},
	});
};

const state = reactive({
	btn: [
		{
			label: '新增',
			onClick: handleAddClick,
			permission: ['sys_permission_add'],
			icon: 'icon-ic_edit_add',
		},
	],
	columns: [
		{
			dataIndex: 'linkType',
			title: '类型',
			hideInSearch: true,
			formatter: (item) => {
				return item.linkType == 1 ? '用户' : '用户组';
			},
		},
		{
			dataIndex: 'linkName',
			title: '应用对象',
		},
		{
			dataIndex: 'isCreateAuth',
			title: '创建人',
			hideInSearch: true,
			formatter: (item) => {
				return item.isCreateAuth == 1 ? '开' : '关';
			},
		},
		{
			dataIndex: 'isSettleAuth',
			title: '项目',
			hideInSearch: true,
			formatter: (item) => {
				return item.isSettleAuth == 1 ? '开' : '关';
			},
		},
		{
			dataIndex: 'isDeptAuth',
			title: '部门',
			hideInSearch: true,
			valueEnum: {
				0: '关',
				1: '本部门',
				2: '多部门',
			},
		},
		{
			dataIndex: 'isDiySql',
			title: '自定义SQL',
			hideInSearch: true,
			formatter: (item) => {
				return item.isDiySql == 1 ? '开' : '关';
			},
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			minWidth: 100,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
	cellBtns: [
		{
			text: '编辑',
			prop: 'edit', // 唯一标识
			permission: ['sys_permission_edit'], // 权限标识
		},
		{
			text: '删除',
			prop: 'del', // 唯一标识
			permission: ['sys_permission_del'], // 权限标识
		},
	],
});

const { columns, cellBtns, btn } = toRefs(state);

const request = async (params) => {
	try {
		const res = await getPermissionList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records.map((item, i) => {
					return { ...item, index: (params.current - 1) * params.size + i + 1 };
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

const onCellClick = async (prop, item) => {
	if (prop == 'edit') {
		router.push({
			path: '/system/permission/editPermission',
			query: {
				id: item.id,
			},
		});
	} else if (prop == 'del') {
		ElMessageBox.confirm('是否确定删除？', '提示', {
			type: 'warning',
		})
			.then(async () => {
				try {
					const res = await delPermission(item.id);
					if (res && res.code == 200) {
						ElMessage.success('删除成功');
						proRef.value.refresh();
					} else {
						ElMessage.error(res.msg);
					}
				} catch (e) {
					console.log('get exception:', e);
				}
			})
			.catch(() => {
				// 取消
			});
	}
};

// 子组件事件 刷新
const refresh = () => {
	proRef.value.refresh();
};

const listener = () => {
	console.log('listener');
	onRefresh(proxy, route.path, () => {
		refresh();
	});
};

onMounted(() => {
	listener();
});

onUnmounted(() => {
	offRefresh(proxy);
});
</script>

