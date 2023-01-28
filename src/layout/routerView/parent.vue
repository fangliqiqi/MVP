<template>
	<div class="h100">
		<router-view v-slot="{ Component }">
			<transition :name="setTransitionName" mode="out-in">
				<div>
					<keep-alive :exclude="state.excludeNameList" :max="maxKeepAlive">
						<component :is="Component" v-if="$route.meta.isKeepAlive" :key="state.refreshRouterViewKey" class="w100" :style="{ minHeight }" />
					</keep-alive>
					<component :is="Component" v-if="!$route.meta.isKeepAlive" :key="state.refreshRouterViewKey" class="w100" :style="{ minHeight }" />
				</div>
			</transition>
		</router-view>
	</div>
</template>

<script setup name="layoutParentView">
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
const instance = getCurrentInstance();

onBeforeRouteUpdate((to) => {
	// console.log('get onBeforeRouteUpdate------------------------', instance);
	if (to && to.meta && to.meta.isKeepAlive) {
		// 进入前去除缓存排除名单
		const t = state.excludeNameList || [];
		const name = to.name;
		const index = t.indexOf(name);
		// console.log('需要检查，t:', t, ',and index:', index, ',and excludeNameList：', state.excludeNameList);
		if (index !== -1) {
			// 需要更新排除列表
			t.splice(index, 1);
			state.excludeNameList = t;
			// console.log('get onBeforeRouteUpdate excludeNameList:', state.excludeNameList);
		}
	}
});

const props = defineProps({
	minHeight: {
		type: String,
		default: '',
	},
});

const { proxy } = getCurrentInstance();
const route = useRoute();
const store = useStore();
const state = reactive({
	refreshRouterViewKey: null,
	keepAliveNameList: [],
	excludeNameList: [],
	noCacheView: [],
});

// 设置主界面切换动画
const setTransitionName = computed(() => {
	return store.state.themeConfig.themeConfig.animation;
});
// 设置最小高度
const minHeight = computed(() => {
	return props.minHeight;
});
// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
	return store.state.keepAliveNames.keepAliveNames;
});

const maxKeepAlive = computed(() => {
	return store.state.themeConfig.themeConfig.limitTagNumber || 20; //设置0则缓存20个
});

// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
	state.keepAliveNameList = getKeepAliveNames.value;
	proxy.mittBus.on('onTagsViewRefreshRouterView', (fullPath) => {
		state.keepAliveNameList = getKeepAliveNames.value.filter((path) => route.path !== path);
		state.refreshRouterViewKey = null;
		nextTick(() => {
			state.refreshRouterViewKey = fullPath;
			state.keepAliveNameList = getKeepAliveNames.value;
		});
	});

	proxy.mittBus.on('onTagsViewCloseRouterView', (closeTagName) => {
		// tag关闭，取消缓存
		// console.log('get on onTagsViewCloseRouterView:', closeTagName);
		const t = state.excludeNameList || [];
		// console.log('get t:', t, state.excludeNameList);
		t.push(...closeTagName);
		state.excludeNameList = t;
		// console.log('get excludeNameList:', state.excludeNameList);
	});
});

// 页面卸载时
onUnmounted(() => {
	proxy.mittBus.off('onTagsViewRefreshRouterView');
});
// 监听路由变化，防止 tagsView 多标签时，切换动画消失
watch(
	() => route.fullPath,
	() => {
		state.refreshRouterViewKey = route.fullPath;
	}
);
</script>
