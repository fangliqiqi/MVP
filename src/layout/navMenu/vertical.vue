<template>
	<el-menu
		router
		:default-active="state.defaultActive"
		background-color="transparent"
		:collapse="state.isCollapse"
		:unique-opened="getThemeConfig.isUniqueOpened"
		:collapse-transition="false"
	>
		<template v-for="val in menuLists">
			<el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path" >
				<template #title>
					<SvgIcon :name="val.meta.icon" />
					<span :style="`margin-left:${val.meta.icon?'0':'10'}px`">{{ val.meta.title }}</span>
				</template>
				<SubItem :chil="val.children" />
			</el-sub-menu>
			<template v-else>
				<el-menu-item :index="val.path" :key="val.path">
					<SvgIcon class="iconfont" :name="val.meta.icon" />
					<template #title v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
						<span :style="`margin-left:${val.meta.icon?'0':'10'}px`">{{ val.meta.title }}</span>
					</template>
					<template #title v-else>
						<a :href="val.meta.isLink" target="_blank" rel="opener" class="w100">{{ val.meta.title }}</a>
					</template>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script setup name="navMenuVertical">
import { onBeforeRouteUpdate } from 'vue-router';
import SubItem from '/@/layout/navMenu/subItem.vue';

const props = defineProps({
	menuList: {
		type: Array,
		default: () => [],
	},
});
const store = useStore();
const route = useRoute();
const state = reactive({
	// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
	defaultActive: route.meta.isDynamic ? route.meta.isDynamicPath : route.path,
	isCollapse: false,
});
// 获取父级菜单数据
const menuLists = computed(() => {
	return props.menuList;
});
const clickFun = (path) => {
	console.log('[ clickFun1 ] >',path )
	// state.defaultActive = path;
};
// 获取布局配置信息
const getThemeConfig = computed(() => {
	return store.state.themeConfig.themeConfig;
});
// 菜单高亮（详情时，父级高亮）
const setParentHighlight = (currentRoute) => {
	const { path, meta } = currentRoute;
	const pathSplit = meta.isDynamic ? meta.isDynamicPath.split('/') : path.split('/');
	if (pathSplit.length >= 4 && meta.isHide) return pathSplit.splice(0, 3).join('/');
	else return path;
};
// 设置菜单的收起/展开
watch(
	store.state.themeConfig.themeConfig,
	() => {
		document.body.clientWidth <= 1000 ? (state.isCollapse = false) : (state.isCollapse = getThemeConfig.value.isCollapse);
	},
	{
		immediate: true,
	}
);
// 页面加载时
onMounted(() => {
	state.defaultActive = setParentHighlight(route);
});
// 路由更新时
onBeforeRouteUpdate((to) => {
	// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
	state.defaultActive = setParentHighlight(to);
	const clientWidth = document.body.clientWidth;
	if (clientWidth < 1000) getThemeConfig.value.isCollapse = false;
});
</script>
