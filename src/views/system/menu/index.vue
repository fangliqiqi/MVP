<template>
	<div class="system-menu-container">
		<pro-table ref="proRef" row-key="id" :columns="columns" :request="request" :showHeader="false" :searchConfig="searchConfig" :btn="btn">
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>

			<template v-slot:icon="item">
				<em :class="`iconfont ${item.icon}`"></em>
			</template>
		</pro-table>

		<add-menu-vue ref="addMenuRef" @ok="refreshList"></add-menu-vue>
	</div>
</template>

<script>
import { reactive, ref, toRefs, defineComponent } from 'vue';
import { ElMessageBox } from 'element-plus';
import { getMenuTree, getMenuInfo, deleteMenu, deleteMenuCache } from '/@/api/menu';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import addMenuVue from './component/addMenu.vue';

export default defineComponent({
	name: '菜单管理',
	components: {
		ProTable,
		ProButtons,
		addMenuVue,
	},
	setup() {
		const proRef = ref(null); // proTable
		const addMenuRef = ref(null); //addMenuRef

		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;

		const handleAddClick = () => {
			addMenuRef.value.openDialog();
		};
		const isShowLoading = ref(false)
		const updateCacheClick = () => {
			isShowLoading.value = true
			// 更新缓存
			deleteMenuCache().then(
				(res) => {
					if (res && res.code == 200) {
						message.success('菜单缓存更新成功');
						proRef.value.refresh();
					} else {
						message.error(res.msg || '菜单缓存更新失败');
					}
				},
				(error) => {
					if (error) {
						message.error(error.msg || '菜单缓存更新失败');
					} else {
						message.error('菜单缓存更新失败');
					}
				}
			).catch().finally(()=>{
				isShowLoading.value = false
			});
		};

		const isGray = (item) => {
			return item.systemFlag === '0';
		};

		const state = reactive({
			searchConfig: {
				pagination: false,
			},
			btn: [
				{
					label: '新增',
					onClick: handleAddClick,
					permission: ['sys_menu_add'],
					icon: 'icon-ic_edit_add',
				},
				{
					label: '更新缓存',
					loading:isShowLoading,
					onClick: updateCacheClick,
					icon: 'icon-ic_edit_refresh',
				},
			],
			columns: [
				{
					dataIndex: 'name',
					title: '菜单名称',
					minWidth: 180,
					ellipsis: true,
				},
				{
					dataIndex: 'icon',
					title: '图标',
					valueType: 'custom',
					scopedSlots: {
						customRender: 'icon',
					},
				},
				{
					dataIndex: 'sortOrder',
					title: '排序',
				},
				{
					dataIndex: 'path',
					title: '路由地址',
					minWidth: 140,
					tooltip: true,
				},
				{
					dataIndex: 'type', // 0:菜单，1：按钮
					title: '类型',
					valueEnum: {
						0: '菜单',
						1: '按钮',
					},
				},
				{
					dataIndex: 'permission',
					title: '权限标识',
					minWidth: 220,
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
					permission: ['sys_menu_edit'], // 权限标识
					tooltip: '当前菜单不可编辑',
					isGray: isGray,
				},
				{
					text: '删除',
					prop: 'delete', // 唯一标识
					permission: ['sys_menu_del'], // 权限标识
					tooltip: '当前菜单不可删除',
					isGray: isGray,
				},
			],
		});

		const request = async (params) => {
			try {
				const res = await getMenuTree(params);
				if (res && res.code == 200 && res.data) {
					return {
						current: 1,
						total: res.data.length,
						data: res.data,
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
			proRef.value.refresh();
		};

		const onCellClick = async (prop, item) => {
			if (prop === 'edit') {
				// 点击编辑按钮
				try {
					const res = await getMenuInfo(item.id);
					if (res && res.code === 200) {
						addMenuRef.value.openDialog(res.data);
					} else {
						message.error(res.msg || '获取菜单详情失败');
					}
				} catch (e) {
					console.log('get exception:', e);
					message.error('获取菜单详情失败');
				}
			} else if (prop === 'delete') {
				// 点击删除按钮
				ElMessageBox.confirm(`是否确定删除？`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
					.then(async () => {
						try {
							const res = await deleteMenu(item.id);
							if (res && res.code == 200) {
								message.success('删除成功');
								refreshList();
							} else {
								message.error(res.msg || '删除失败');
							}
						} catch (e) {
							console.log('get exception:', e);
							message.error('删除失败');
						}
					})
					.catch(() => {});
			}
		};

		return {
			...toRefs(state),
			request,
			onCellClick,
			proRef,
			addMenuRef,
			refreshList,
		};
	},
});
</script>

