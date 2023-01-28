<template>
	<template v-for="val in chils">
		<el-sub-menu :index="val.path" :key="val.path" v-if="val.children && val.children.length > 0">
			<template #title>
				<SvgIcon :name="val.meta.icon" />
				<span :style="`margin-left:${val.meta.icon?'0':'10'}px`">{{ val.meta.title }}</span>
			</template>
			<sub-item :chil="val.children" />
		</el-sub-menu>
		<template v-else>
			<el-menu-item :index="val.path" :key="val.path" @click="(e)=>clickFun(e,val)">
				<template v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
					<SvgIcon :name="val.meta.icon" />
					<span :style="`margin-left:${val.meta.icon?'0':'10'}px`">{{ val.meta.title }}</span>
				</template>
				<template v-else>
					<a :href="val.meta.isLink" target="_blank" rel="opener">
						<SvgIcon :name="val.meta.icon" />
						{{ val.meta.title }}
					</a>
				</template>
			</el-menu-item>
		</template>
	</template>
</template>

<script setup name="navMenuSubItem">
const props = defineProps({
	chil: {
		type: Array,
		default: () => [],
	},
});

// 获取父级菜单数据
const chils = computed(() => {
	return props.chil;
});

const clickFun = (e,val) => {
	// console.log('[ clickFun2 ] >',e,val )
	// state.defaultActive = path;
};
</script>
