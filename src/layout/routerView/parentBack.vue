<template>
	<div class="h100">
		<router-view v-slot="{ Component }">
			<transition :name="setTransitionName" mode="out-in">
				<div>
					<keep-alive>
						<component
							:is="Component"
							v-if="state.keepAliveNameList.includes(route.path)"
							:key="state.refreshRouterViewKey"
							class="w100"
							:style="{ minHeight }"
						/>
					</keep-alive>
					<component
						:is="Component"
						v-if="!state.keepAliveNameList.includes(route.path)"
						:key="state.refreshRouterViewKey"
						class="w100"
						:style="{ minHeight }"
					/>
				</div>
			</transition>
		</router-view>
	</div>
</template>

<script setup name="layoutParentView">
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
	excludeNameList: ['', ''],
	viewList: [], // 当前的tag列表
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

const isKeepAlive = computed(() => {
	return state.keepAliveNameList.includes(route.path) && !state.noCacheView.includes(route.path);
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

	// proxy.mittBus.on('onRefreshTagSession', (viewList) => {
	// 	// tagView 更新

	// 	const deleteView = [];

	// 	state.viewList.forEach((item) => {
	// 		if (!viewList.find((t) => t.path === item.path)) {
	// 			deleteView.push(item);
	// 		}
	// 	});

	// 	noCacheView = deleteView.map((item) => item.path);
	// 	state.viewList = viewList;
	// });
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
