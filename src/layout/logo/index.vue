<template>
	<div class="layout-logo" v-if="setShowLogo" @click="onThemeConfigChange">
		<img  alt="" :src="logoMini" class="layout-logo-medium-img" />
		<span>{{ getThemeConfig.globalTitle }}</span>
	</div>
	<div class="layout-logo-size" v-else @click="onThemeConfigChange">
		<img  alt="" :src="logoMini" class="layout-logo-size-img" />
	</div>
</template>

<script setup name="layoutLogo">
import logoMini from '/@/assets/logo.png';

const store = useStore();
// 获取布局配置信息
const getThemeConfig = computed(() => {
	return store.state.themeConfig.themeConfig;
});
// 设置 logo 的显示。classic 经典布局默认显示 logo
const setShowLogo = computed(() => {
	let { isCollapse, layout } = store.state.themeConfig.themeConfig;
	return !isCollapse || layout === 'classic' || document.body.clientWidth < 1000;
});
// logo 点击实现菜单展开/收起
const onThemeConfigChange = () => {
	if (store.state.themeConfig.themeConfig.layout === 'transverse') return false;
	store.state.themeConfig.themeConfig.isCollapse = !store.state.themeConfig.themeConfig.isCollapse;
};
</script>

<style scoped lang="scss" src="./css/index.scss">
</style>
