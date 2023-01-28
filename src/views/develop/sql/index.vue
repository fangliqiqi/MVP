<template>
	<div class="system-sql-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :showHeader="false">
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<add-sql-vue ref="addSqlDialog" @ok="refreshList"></add-sql-vue>
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { getDataSourceList, delDataSource, getDataSource } from '/@/api/sql';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox } from 'element-plus';
import addSqlVue from './component/addSql.vue';
export default {
	name: '数据源',
	components: {
		ProTable,
		ProButtons,
		addSqlVue,
	},
	setup() {
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const proTableRef = ref(null);
		const addSqlDialog = ref(null);

		const handleAddClick = () => {
			if (addSqlDialog.value) {
				addSqlDialog.value.openDialog();
			}
		};

		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};

		const state = reactive({
			columns: [
				{
					dataIndex: 'index',
					title: '序号',
					minWidth: 80,
				},
				{
					dataIndex: 'name',
					title: '名称',
					minWidth: 160,
				},
				{
					dataIndex: 'url',
					title: 'jdbcUrl',
					minWidth: 180,
					tooltip: true,
				},

				{
					dataIndex: 'username',
					title: '用户名',
					minWidth: 110,
				},
				{
					dataIndex: 'password', // 0:菜单，1：按钮
					title: '密码',
					minWidth: 180,
					tooltip: true,
				},
				{
					dataIndex: 'createTime',
					title: '创建时间',
					minWidth: 180,
				},
				{
					dataIndex: 'updateTime',
					title: '更新时间',
					minWidth: 180,
				},

				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 200,
					scopedSlots: {
						customRender: 'option',
					},
				},
			],
			btn: [
				{
					label: '新增',
					onClick: handleAddClick,
					icon: 'icon-ic_edit_add',
				},
			],
			cellBtns: [
				{
					text: '编辑',
					prop: 'edit', // 唯一标识
				},
				{
					text: '删除',
					prop: 'delete', // 唯一标识
				},
			],
		});

		const request = async (params) => {
			try {
				const res = await getDataSourceList(params);
				if (res && res.code == 200 && res.data) {
					return {
						current: res.data.current,
						total: res.data.total,
						data: res.data.records.map((item, i) => {
							return {
								...item,
								index: (params.current - 1) * params.size + i + 1,
							};
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

		const deleteCell = (item) => {
			ElMessageBox.confirm(`是否确定删除？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					try {
						const res = await delDataSource(item.id);
						if (res && res.code === 200) {
							message.success('数据源删除成功');
							refreshList();
						} else {
							message.error(res.msg || '数据源删除失败');
						}
					} catch (e) {
						console.log('get exception:', e);
						message.error('数据源删除失败');
					}
				})
				.catch(() => {});
		};

		const onCellClick = async (prop, item) => {
			if (prop === 'delete') {
				// 删除操作
				deleteCell(item);
			} else if (prop === 'edit') {
				if (addSqlDialog.value) {
					addSqlDialog.value.openDialog(item);
				}
				// 编辑操作
				// try {
				// 	const res = await getDataSource(item.id);
				// 	if (res && res.code === 200) {
				// 		if (addSqlDialog.value) {
				// 			addSqlDialog.value.openDialog(res.data);
				// 		}
				// 	}
				// } catch (e) {
				// 	console.log('get exception:', e);
				// 	if (addSqlDialog.value) {
				// 		addSqlDialog.value.openDialog(item);
				// 	}
				// }
			}
		};

		return {
			...toRefs(state),
			request,
			onCellClick,
			addSqlDialog,
			proTableRef,
			refreshList,
		};
	},
};
</script>

<style lang="scss" scoped>
.system-sql-container {
}
</style>
