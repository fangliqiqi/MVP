<template>
	<div class="hro-status-container">
		<span class="dot" :style="`height:${2 * radius}px;width:${2 * radius}px;background-color:${dotColor};margin-right:${space}px;margin-bottom:${(7 - radius) / 2}px`"></span>
		<span>{{ title }}</span>
	</div>
</template>

<script>
import { ref, reactive, defineComponent, toRefs, computed, onMounted, watch } from 'vue';
export default defineComponent({
	name: 'DotStatus',
	props: {
		color: {
			// 自定义颜色
			type: String,
			default: null,
		},
		title: {
			// 显示文字
			type: String,
			default: null,
			required: false,
		},
		type: {
			// 默认提供四种类型颜色
			type: String,
			default: 'info',
		},
		space: {
			type: Number,
			default: 12,
		},
	},
	setup(props, context) {
		const status = {
			info: '#707881',
			warn: '#E6A23C',
			success: '#859BCD',
			error: '#F56C6C',
		};

		const state = reactive({
			dotColor: null,
			radius: 3,
		});

		onMounted(() => {
			if (props.color) {
				state.dotColor = props.color;
			} else {
				console.log('get dotColor:', status[props.type]);
				state.dotColor = status[props.type];
			}
		});

		return {
			...toRefs(state),
			...toRefs(props),
		};
	},
});
</script>

<style lang="scss" scoped src="./css/index.scss"></style>
