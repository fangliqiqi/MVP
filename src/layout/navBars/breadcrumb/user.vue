<template>
	<div class="layout-navbars-breadcrumb-user" :style="{ flex: layoutUserFlexNum }">
		<!-- <el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onComponentSizeChange">
			<div class="layout-navbars-breadcrumb-user-icon">
				<i class="iconfont icon-ziti" title="组件大小"></i>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="medium" :disabled="state.disabledSize === 'large'">大型</el-dropdown-item>
					<el-dropdown-item command="small" :disabled="state.disabledSize === 'default'">默认</el-dropdown-item>
					<el-dropdown-item command="mini" :disabled="state.disabledSize === 'small'">小型</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown> -->
		<!-- <div class="layout-navbars-breadcrumb-user-icon" @click="onSearchClick">
			<el-icon title="菜单搜索">
				<ele-Search />
			</el-icon>
		</div> -->
		<!-- <div class="layout-navbars-breadcrumb-user-icon" @click="onLayoutSetingClick">
			<el-icon class="icon-skin iconfont" title="布局配置" :size="18"><Aim/></el-icon>
		</div> -->
		<!-- <div class="layout-navbars-breadcrumb-user-icon">
			<el-popover placement="bottom" trigger="click">
				<template #reference>
					<el-badge :is-dot="true">
						<el-icon title="消息">
							<ele-Bell />
						</el-icon>
					</el-badge>
				</template>
				<UserNews />
			</el-popover>
		</div> -->
		<div class="layout-navbars-breadcrumb-user-icon mr10" @click="onScreenfullClick">
			<!-- <i
				class="iconfont"
				:title="state.isScreenfull ? '开全屏' : '关全屏'"
				:class="!state.isScreenfull ? 'icon-fullscreen' : 'icon-tuichuquanping'"
			></i> -->
			<el-icon
				class="iconfont" 
				:title="state.isScreenfull ? '关全屏' : '开全屏'"
				:class="!state.isScreenfull ? 'icon-fullscreen' : 'icon-tuichuquanping'"
				:size="18"
				><FullScreen /></el-icon>
		</div>
		<el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
			<span class="layout-navbars-breadcrumb-user-link">
				<img alt="头像" :src="getUserInfos.photo?getUserInfos.photo:'/photo.png'" class="layout-navbars-breadcrumb-user-link-photo mr5" />
				{{ getUserInfos.nickName }}
				<el-icon class="el-icon--right">
					<ele-ArrowDown />
				</el-icon>
			</span>
			<template #dropdown>

				<el-dropdown-menu>
					<!-- <el-dropdown-item command="/home">首页</el-dropdown-item>
					<el-dropdown-item command="wareHouse">代码仓库</el-dropdown-item>
					<el-dropdown-item command="/404">404</el-dropdown-item>
					<el-dropdown-item command="/401">401</el-dropdown-item> -->
					<el-dropdown-item  command="changePassWord">修改密码</el-dropdown-item>
					<el-dropdown-item  command="logOut">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<Search ref="searchRef" />
		<change-password-vue ref="changePassWordRef" @ok="toLayout"/>
	</div>
</template>

<script setup name="layoutBreadcrumbUser">
import { ElMessageBox, ElMessage } from 'element-plus';
import screenfull from 'screenfull';
// import { resetRoute } from '/@/router/index';
import { FullScreen,Aim} from '@element-plus/icons-vue';
import {  Local } from '/@/utils/storage';
import UserNews from '/@/layout/navBars/breadcrumb/userNews.vue';
import Search from '/@/layout/navBars/breadcrumb/search.vue';
import changePasswordVue from './changePassWord.vue';

const { proxy } = getCurrentInstance();
const router = useRouter();
const store = useStore();
const searchRef = ref();
const changePassWordRef = ref();


const state = reactive({
	isScreenfull: false,
	isShowUserNewsPopover: false,
	disabledSize: '',
});
// 获取用户信息 vuex
const getUserInfos = computed(() => {
	return store.state.userInfos.userInfos;
});
// 获取布局配置信息
const getThemeConfig = computed(() => {
	return store.state.themeConfig.themeConfig;
});
// 设置分割样式
const layoutUserFlexNum = computed(() => {
	let num = '';
	const { layout, isClassicSplitMenu } = getThemeConfig.value;
	const layoutArr = ['defaults', 'columns'];
	if (layoutArr.includes(layout) || (layout === 'classic' && !isClassicSplitMenu)) num = '1';
	else num = '';
	return num;
});
// 全屏点击时
const onScreenfullClick = () => {
	if (!screenfull.isEnabled) {
		ElMessage.warning('暂不不支持全屏');
		return false;
	}
	screenfull.toggle();
	screenfull.on('change', () => {
		if (screenfull.isFullscreen) state.isScreenfull = true;
		else state.isScreenfull = false;
	});
};
// 布局配置 icon 点击时
const onLayoutSetingClick = () => {
	proxy.mittBus.emit('openSetingsDrawer');
};
// 下拉菜单点击时
const onHandleCommandClick = (path) => {
	if (path === 'logOut') {
		ElMessageBox({
			closeOnClickModal: false,
			closeOnPressEscape: false,
			title: '提示',
			message: '此操作将退出登录, 是否继续?',
			showCancelButton: true,
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			buttonSize: 'default',
			beforeClose: (action, instance, done) => {
				if (action === 'confirm') {
					instance.confirmButtonLoading = true;
					instance.confirmButtonText = '退出中';
					setTimeout(() => {
						done();
						setTimeout(() => {
							instance.confirmButtonLoading = false;
						}, 300);
					}, 700);
				} else {
					done();
				}
			},
		})
			.then( async () => {
				let res = await store.dispatch('userInfos/logout')
				console.log(res);
				ElMessage.success('安全退出成功！');
				window.location.reload();
				// setTimeout(() => {
				// 	// window.location.href = '';
				// 	window.location.href="/";
				// }, 300);
				
			})
			.catch(() => {});
	}else if(path === 'changePassWord'){
		changePassWordRef.value&&changePassWordRef.value.openDialog(getUserInfos.value);
	}else if (path === 'wareHouse') {
		window.open('https://gitee.com/lyt-top/vue-next-admin');
	} else {
		router.push(path);
	}
};
// 退出登录
const toLayout = async () => {
	// console.log('退出登录');
	let res = await store.dispatch('userInfos/logout')
	console.log(res);
	// ElMessage.success('安全退出成功！');
	window.location.reload();
};


// 菜单搜索点击
// const onSearchClick = () => {
// 	searchRef.value.openSearch();
// };

// 组件大小改变
// const onComponentSizeChange = (size) => {
// 	Local.remove('themeConfig');
// 	getThemeConfig.value.globalComponentSize = size;
// 	Local.set('themeConfig', getThemeConfig.value);
// 	proxy.$ELEMENT.size = size;
// 	initComponentSize();
// 	window.location.reload();
// };

// 初始化全局组件大小
const initComponentSize = () => {
	switch (Local.get('themeConfig').globalComponentSize) {
		case 'large':
			state.disabledSize = 'large';
			break;
		case 'default':
			state.disabledSize = 'default';
			break;
		case 'small':
			state.disabledSize = 'small';
			break;
	}
};
// 页面加载时
onMounted(() => {
	if (Local.get('themeConfig')) {
		initComponentSize();
	}
});
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	&-link {
		height: 100%;
		display: flex;
		align-items: center;
		white-space: nowrap;
		&-photo {
			width: 25px;
			height: 25px;
			border-radius: 100%;
		}
	}
	&-icon {
		padding: 0 10px;
		cursor: pointer;
		color: var(--next-bg-topBarColor);
		height: 50px;
		line-height: 50px;
		display: flex;
		align-items: center;
		&:hover {
			background: var(--next-color-user-hover);
			i {
				display: inline-block;
				animation: logoAnimation 0.3s ease-in-out;
			}
		}
	}
	::v-deep(.el-dropdown) {
		color: var(--next-bg-topBarColor);
	}
	::v-deep(.el-badge) {
		height: 40px;
		line-height: 40px;
		display: flex;
		align-items: center;
	}
	::v-deep(.el-badge__content.is-fixed) {
		top: 12px;
	}
}
</style>
