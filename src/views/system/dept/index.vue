<template>
	<div class="system-dept-container">
		<pro-table ref="proRef" row-key="id" :columns="columns" :request="request" :searchConfig="searchConfig" :btn="btn">
			<template v-slot:weight="item">
				<span>{{ item.weight }}</span>
			</template>
		</pro-table>
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { getDeptList, syncData } from '/@/api/dept';
import ProTable from '/@/components/ProTable/ProTable.vue';
import { ElLoading } from 'element-plus';

export default {
	name: '部门管理',
	components: {
		ProTable,
	},
	setup() {
		const proRef = ref(null);
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const filterData = (data, keywords, selectedIds = []) => {
			let target = [];
			let ids = [...selectedIds];
			target = data
				.map((item) => {
					const target = { ...item };
					if (item.children) {
						// 包含子集，需要子集存在与过滤内容匹配项目或者本省存在与过滤内容匹配项
						const res = filterData(item.children, keywords, ids);
						const children = res.data;
						ids = res.ids;
						if (children && children.length) {
							// 子集存在，不能当前匹配不匹配都直接添加返回
							target.children = children;
							ids.push(target.id);
							return target;
						}
					}
					if (item.name.indexOf(keywords) !== -1) {
						// 子集不存在，判断当前是否需要加
						delete target.children;
						ids.push(target.id);
						return target;
					}
					return null;
				})
				.filter((item) => !!item);

			return { data: target, ids };
		};

		const onSearch = (data, params) => {
			const keywords = params.name;
			let target = [];
			if (keywords && keywords.trim().length) {
				const res = filterData(data, params.name, []) || { data: [], ids: [] };
				target = res.data;
				if (proRef.value && target.length) {
					// 暂时只展开一级
					proRef.value.setExpandRowKeys(res.ids);
				}
				return {
					current: 1,
					total: target.length,
					data: target,
				};
			}
			if (proRef.value) {
				proRef.value.refresh();
			}
		};
			const isShowLoading = ref(false)
		const handleRefresh = async () => {
			isShowLoading.value = true
			// 手动同步
			const loading = ElLoading.service({
				lock: true,
				text: '数据同步中...',
				background: 'rgba(0, 0, 0, 0.7)',
				'custom-class': 'dept-global-loading',
			});

			try {
				const res = await syncData();
				if (res && res.code === 200) {
					// 同步成功
					message.success('数据同步成功');
					if (proRef.value) proRef.value.refresh();
				} else {
					message.error(res.msg || '数据同步失败');
				}
			} catch (e) {
				message.error('数据同步失败');
				console.log('get exception:', e);
			} finally {
				loading.close();
				isShowLoading.value = false
			}
		};

		const state = reactive({
			searchConfig: {
				pagination: false,
				onSearch: onSearch,
			},
			columns: [
				{
					dataIndex: 'name',
					title: '部门名称',
					ellipsis: true,
				},
				{
					dataIndex: 'createTime',
					title: '创建时间',
					hideInSearch: true,
				},
			],
			btn: [
				{
					label: '手动同步',
					onClick: handleRefresh,
					loading:isShowLoading,
					permission: ['sys_dict_add'],
					icon: 'icon-ic_edit_refresh',
				},
			],
		});

		const request = async (params) => {
			// console.log('获取请求数据：', params);
			try {
				const res = await getDeptList(params);
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

		return {
			...toRefs(state),
			request,
			onSearch,
			proRef,
		};
	},
};
</script>

<style lang="scss" scoped>
.dept-global-loading {
	color: white;
}
</style>
