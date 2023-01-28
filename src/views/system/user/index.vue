<template>
	<div class="system-dict-container">
		<pro-table row-key="id" ref="proRef" :columns="columns" :btn="btn" columnEmptyText="--" :request="request">
			<!-- 列表 -->
			<template v-slot:roleList="item">
				<span>{{ transformDeptRole(item.roleList, 'roleName') }}</span>
			</template>
			<template v-slot:post="item">
				<span>{{ translateDict(postTypeOptions, item.post) }}</span>
			</template>
			<template v-slot:userGroup="item">
				<span v-if="item.userGroup">{{ translateDict(userGroupOptions, item.userGroup) }}</span>
				<span v-else>--</span>
			</template>
			<template v-slot:lockFlag="item">
				<el-tag size="small" :type="transformLockFlag(lockFlagOptions, item.lockFlag).type">{{
					transformLockFlag(lockFlagOptions, item.lockFlag).label
				}}</el-tag>
			</template>
			<!-- 操作 -->
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<edit-user ref="editUserRef" @ok="refresh" />
	</div>
</template>

<script setup name="用户管理">
import { reactive, toRefs } from 'vue';
import { getUserlist, getUserDetail, syncData } from '/@/api/user';
import { getDictbyType } from '/@/api/dict';
import { translateDict } from '/@/utils/utils';
import { ElMessage } from 'element-plus';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import EditUser from './component/editUser.vue';
import { ElLoading } from 'element-plus';

const proRef = ref(null);
const editUserRef = ref(null);
const isShowLoading = ref(false)
const handleRefresh = async () => {
	// 手动同步
	const loading = ElLoading.service({
		lock: true,
		text: '数据同步中...',
		background: 'rgba(0, 0, 0, 0.7)',
	});
	try {
		isShowLoading.value = true
		const res = await syncData();
		if (res && res.code === 200) {
			// 同步成功
			ElMessage.success('数据同步成功');
			if (proRef.value) proRef.value.refresh();
		} else {
			ElMessage.error(res.msg || '数据同步失败');
		}
		isShowLoading.value = false
	} catch (e) {
		ElMessage.error('数据同步失败');
		console.log('get exception:', e);
	} finally {
		loading.close();
		isShowLoading.value = false
	}
};

const state = reactive({
	btn: [
		{
			label: '手动同步',
			permission: ['sys_role_add'],
			loading:isShowLoading,
			icon: 'icon-ic_edit_refresh',
			onClick: handleRefresh,
		},
	],
	columns: [
		{
			dataIndex: 'index',
			title: '序号',
			hideInSearch: true,
			minWidth: '80px',
		},
		{
			dataIndex: 'nickname',
			title: '姓名',
			minWidth: '100px',
		},
		{
			dataIndex: 'username',
			title: '用户名',
			hideInSearch: true,
			minWidth: '120px',
		},
		{
			dataIndex: 'deptName',
			title: '部门',
			hideInSearch: true,
			minWidth: '140px',
		},
		{
			dataIndex: 'phone',
			title: '手机号',
			hideInSearch: true,
			minWidth: '140px',
		},
		{
			dataIndex: 'email',
			title: '邮箱',
			hideInSearch: true,
			minWidth: 260,
		},
		{
			dataIndex: 'roleList',
			title: '角色',
			hideInSearch: true,
			minWidth: 200,
			formatter: (item) => {
				const roleArr = [];
				item.roleList.forEach((it) => {
					roleArr.push(it['roleName']);
				});
				return roleArr.join(',');
			},
			ellipsis: true,
		},
		{
			dataIndex: 'post',
			title: '职务',
			hideInSearch: true,
			minWidth: '140px',
			scopedSlots: { customRender: 'post' },
		},
		{
			dataIndex: 'userGroup',
			title: '用户组',
			hideInSearch: true,
			minWidth: '140px',
			scopedSlots: { customRender: 'userGroup' },
		},
		{
			dataIndex: 'lockFlag',
			title: '用户状态',
			hideInSearch: true,
			minWidth: '140px',
			scopedSlots: { customRender: 'lockFlag' },
		},
		{
			dataIndex: 'createTime',
			title: '创建时间',
			hideInSearch: true,
			minWidth: '180px',
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			minWidth: 120,
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
			permission: ['sys_user_edit'], // 权限标识
		},
	],
	postTypeOptions: [],
	userGroupOptions: [],
	lockFlagOptions: [
		{
			value: '9',
			label: '锁定',
			type: 'info',
		},
		{
			value: '0',
			label: '有效',
			type: '',
		},
	],
});

const { columns, cellBtns, btn, postTypeOptions, userGroupOptions, lockFlagOptions } = toRefs(state);

// 状态翻译,因为不确定tag的问题，所以暂时这样写
const transformLockFlag = (options, lock) => {
	const item = options.find((item) => item.value == lock);
	return item;
};
// 数组数据切割
const transformDeptRole = (options, type) => {
	const roleArr = [];
	options.forEach((item) => {
		roleArr.push(item[type]);
	});
	return roleArr.join(',');
};

const request = async (params) => {
	try {
		const res = await getUserlist(params);
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
		const res = await getUserDetail(item.userId);
		const data = {
			userGroupOptions: userGroupOptions.value,
			postTypeOptions: postTypeOptions.value,
		};
		if (res.code == 200) {
			const row = res.data;
			editUserRef.value.openDialog(row, data);
		} else {
			ElMessage.error(res.msg);
		}
	}
};

// 子组件事件 刷新
const refresh = () => {
	proRef.value.refresh();
};

const initConfigData = () => {
	// 获取职务列表
	getDictbyType('post_type').then((res) => {
		if (res && res.code == 200 && res.data) {
			state.postTypeOptions = res.data;
		} else {
			ElMessage.error(res.msg);
		}
	});
	// 获取用户组列表
	getDictbyType('group_type').then((res) => {
		if (res && res.code == 200 && res.data) {
			state.userGroupOptions = res.data;
		} else {
			ElMessage.error(res.msg);
		}
	});
};

// 初始数据
initConfigData();
</script>
