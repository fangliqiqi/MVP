<template>
	<div class="system-dict-container">
		<pro-table row-key="id" ref="proRef" :columns="columns" :btn="btn" columnEmptyText="--" :request="request">
			<!-- 操作 -->
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!-- 子组件 -->
		<add-role-vue ref="addRoleRef" @ok="refresh"></add-role-vue>
		<add-manage-vue ref="addManageRef"></add-manage-vue>
		<detail-role-vue ref="detailRoleRef"></detail-role-vue>
	</div>
</template>

<script setup name="角色管理">
import { reactive, toRefs } from 'vue';
import { getRolePage, delRoleByid } from '@/api/role';
import { ElMessage, ElMessageBox } from 'element-plus';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import addRoleVue from './component/addRole.vue';
import addManageVue from './component/addManage.vue';
import detailRoleVue from './component/detailRole.vue';

const proRef = ref(null);
const addRoleRef = ref(null);
const addManageRef = ref(null);
const detailRoleRef = ref(null);
// 表头的按钮事件要放在上面，放在下面会报错/
// 新增角色
const handleAddClick = () => {
	addRoleRef.value.openDialog();
};

const state = reactive({
	btn: [
		{
			label: '新增',
			onClick: handleAddClick,
			permission: ['sys_role_add'],
			icon: 'icon-ic_edit_add',
		},
	],
	columns: [
		{
			dataIndex: 'index',
			title: '序号',
			hideInSearch: true,
			Width: '80px',
		},
		{
			dataIndex: 'roleName',
			title: '角色名称',
			minWidth: '200px',
			tooltip: true,
		},
		{
			dataIndex: 'roleCode',
			title: '角色标识',
			hideInSearch: true,
			minWidth: '200px',
			tooltip: true,
		},
		{
			dataIndex: 'roleDesc',
			title: '角色描述',
			hideInSearch: true,
			width: 400,
			tooltip: true,
		},
		{
			dataIndex: 'createTime',
			title: '创建时间',
			hideInSearch: true,
			minWidth: '200px',
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
	cellBtns: [
		{
			text: '查看',
			prop: 'detail', // 唯一标识
			permission: [], // 权限标识
		},
		{
			text: '编辑',
			prop: 'edit', // 唯一标识
			permission: ['sys_role_edit'], // 权限标识
		},
		{
			text: '权限',
			prop: 'perm', // 唯一标识
			permission: ['sys_role_perm'], // 权限标识
		},
		{
			text: '删除',
			prop: 'del', // 唯一标识
			permission: ['sys_role_del'], // 权限标识
		},
	],
});

const { columns, cellBtns, btn } = toRefs(state);

const request = async (params) => {
	try {
		const res = await getRolePage(params);
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
	if (prop == 'detail') {
		detailRoleRef.value.openDialog(item);
	} else if (prop == 'edit') {
		addRoleRef.value.openDialog(item);
	} else if (prop == 'perm') {
		addManageRef.value.openDialog(item);
	} else if (prop == 'del') {
		ElMessageBox.confirm('是否确定删除？', '提示', {
			type: 'warning',
		})
			.then(async () => {
				try {
					const res = await delRoleByid(item.roleId);
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
</script>
