<template>
	<div class="system-dict-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn">
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!-- <add-dic-dialog ref="addDicDialog" @ok="refreshList"></add-dic-dialog>
		<add-dict-item-dialog-vue ref="addDictItemRef"> </add-dict-item-dialog-vue> -->
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { getDictPage, clearCache, delDict } from '/@/api/dict';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox } from 'element-plus';

export default {
	name: '定时任务日志',
	components: {
		ProTable,
		ProButtons,
	},
	setup() {
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const proTableRef = ref(null);
		const handleAddClick = () => {
			// if (addDicDialog.value) {
			// 	addDicDialog.value.openDialog();
			// }
		};

		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};

		const clearMemory = async () => {
			try {
				const res = await clearCache();
				if (res && res.code === 200) {
					message.success('字典缓存清除成功');
					refreshList();
				} else {
					message.error(res.msg || '字典缓存清除失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				message.error('字典缓存清除失败');
			}
		};

		const isGray = (item) => {
			return item.systemFlag === '0';
		};

		const state = reactive({
			columns: [
				{
					dataIndex: 'index',
					title: '序号',
					hideInSearch: true,
					minWidth: 80,
				},
				{
					dataIndex: 'description',
					title: '字典名称',
					minWidth: 160,
				},
				{
					dataIndex: 'type',
					title: '字典编码',
					minWidth: 140,
				},

				{
					dataIndex: 'systemFlag',
					title: '字典类型',
					valueEnum: {
						0: '系统类',
						1: '业务类',
					},
					minWidth: 110,
				},
				{
					dataIndex: 'remark', // 0:菜单，1：按钮
					title: '备注信息',
					hideInSearch: true,
					minWidth: 180,
				},
				{
					dataIndex: 'createTime',
					title: '创建时间',
					hideInSearch: true,
					minWidth: 180,
				},
				{
					dataIndex: 'createBy',
					title: '创建人',
					hideInSearch: true,
					minWidth: 180,
				},
				{
					dataIndex: 'parentItemType',
					title: '上级字典',
					hideInSearch: true,
					minWidth: 180,
				},
				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 200,
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
					onClick: handleAddClick,
					permission: ['sys_dict_add'],
					icon: 'icon-ic_edit_add',
				},
				{
					label: '清除缓存',
					onClick: clearMemory,
					icon: 'icon-ic_edit_refresh',
				},
			],
			cellBtns: [
				{
					text: '编辑',
					prop: 'edit', // 唯一标识
					permission: ['sys_dict_edit'], // 权限标识
					tooltip: '当前字典不可编辑',
					isGray: isGray,
				},
				{
					text: '删除',
					prop: 'delete', // 唯一标识
					permission: ['sys_dict_del'], // 权限标识
					tooltip: '当前字典不可删除',
					isGray: isGray,
				},
				{
					text: '字典项',
					prop: 'dict', // 唯一标识
					permission: ['sys_dict_edit'], // 权限标识
					tooltip: '当前字典不可操作字典项',
					isGray: isGray,
				},
			],
		});

		const request = async (params) => {
			try {
				const res = await getDictPage(params);
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
						const res = await delDict(item.id);
						if (res && res.code === 200) {
							message.success('字典删除成功');
							refreshList();
						} else {
							message.error(res.msg || '字典删除失败');
						}
					} catch (e) {
						console.log('get exception:', e);
						message.error('字典删除失败');
					}
				})
				.catch(() => {});
		};

		const onCellClick = async (prop, item) => {
			if (prop === 'delete') {
				// 删除操作
				deleteCell(item);
			} else if (prop === 'edit') {
				// 编辑操作
				// if (addDicDialog.value) {
				// 	addDicDialog.value.openDialog(item);
				// }
			} else if (prop === 'dict') {
				// 显示字典项弹框
				// if(addDictItemRef.value) addDictItemRef.value.openDialog(item)
			}
		};

		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			refreshList,
		};
	},
};
</script>

<style lang="scss" scoped>
.system-dict-container {
}
</style>
