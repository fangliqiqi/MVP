<template>
	<!-- 空数据展示 -->
	<div class="empty-container">
		<img :src="emptyView" class="empty-image" alt="logo" />
		<span class="empty-title">{{ emptyText }}</span>
		<div class="empty-tips">{{ tips }}</div>
	</div>
</template>
<script>
import emptyView from '/@/assets/table_empty.png';
import { reactive, toRefs } from 'vue';
export default {
	props: {
		// 空数据提示
		emptyText: {
			type: String,
			default: '暂无相关数据',
		},
		tips: {
			type: String,
			default: '没有您想要的内容',
		},
	},
	setup(props, context) {
		const state = reactive({
			description: '空数据页面',
		});

		return {
			...toRefs(state),
			emptyView,
		};
	},
};
</script>
<style lang="scss" scoped src="./css/index.scss">
</style>
