<template>
	<div v-show="isShowLockScreen">
		<div class="layout-lock-screen-mask"></div>
		<div class="layout-lock-screen-img" :class="{ 'layout-lock-screen-filter': state.isShowLoockLogin }"></div>
		<div class="layout-lock-screen">
			<div
				class="layout-lock-screen-date"
				ref="layoutLockScreenDateRef"
				@mousedown="onDown"
				@mousemove="onMove"
				@mouseup="onEnd"
				@touchstart.stop="onDown"
				@touchmove.stop="onMove"
				@touchend.stop="onEnd"
			>
				<div class="layout-lock-screen-date-box">
					<div class="layout-lock-screen-date-box-time">
						{{ state.time.hm }}<span class="layout-lock-screen-date-box-minutes">{{ state.time.s }}</span>
					</div>
					<div class="layout-lock-screen-date-box-info">{{ state.time.mdq }}</div>
				</div>
				<div class="layout-lock-screen-date-top">
					<SvgIcon name="ele-Top" />
					<div class="layout-lock-screen-date-top-text">上滑解锁</div>
				</div>
			</div>
			<transition name="el-zoom-in-center">
				<div v-show="state.isShowLoockLogin" class="layout-lock-screen-login">
					<div class="layout-lock-screen-login-box">
						<div class="layout-lock-screen-login-box-img">
							<img alt="" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg" />
						</div>
						<div class="layout-lock-screen-login-box-name">Administrator</div>
						<div class="layout-lock-screen-login-box-value">
							<el-input
								placeholder="请输入密码"
								ref="layoutLockScreenInputRef"
								v-model="state.lockScreenPassword"
								@keyup.enter.native.stop="onLockScreenSubmit()"
							>
								<template #append>
									<el-button @click="onLockScreenSubmit">
										<el-icon>
											<ele-Right />
										</el-icon>
									</el-button>
								</template>
							</el-input>
						</div>
					</div>
					<div class="layout-lock-screen-login-icon">
						<SvgIcon name="ele-Microphone" />
						<SvgIcon name="ele-AlarmClock" />
						<SvgIcon name="ele-SwitchButton" />
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script setup name="layoutLockScreen">
import { formatDate } from '/@/utils/formatTime';
import { Local } from '/@/utils/storage';

const { proxy } = getCurrentInstance();
const layoutLockScreenInputRef = ref();
const store = useStore();
const state = reactive({
	transparency: 1,
	downClientY: 0,
	moveDifference: 0,
	isShowLoockLogin: false,
	isFlags: false,
	querySelectorEl: '',
	time: {
		hm: '',
		s: '',
		mdq: '',
	},
	setIntervalTime: 0,
	isShowLockScreen: false,
	isShowLockScreenIntervalTime: 0,
	lockScreenPassword: '',
});
// 鼠标按下
const onDown = (down) => {
	state.isFlags = true;
	state.downClientY = down.touches ? down.touches[0].clientY : down.clientY;
};
// 鼠标移动
const onMove = (move) => {
	if (state.isFlags) {
		const el = state.querySelectorEl;
		const opacitys = (state.transparency -= 1 / 200);
		if (move.touches) {
			state.moveDifference = move.touches[0].clientY - state.downClientY;
		} else {
			state.moveDifference = move.clientY - state.downClientY;
		}
		if (state.moveDifference >= 0) return false;
		el.setAttribute('style', `top:${state.moveDifference}px;cursor:pointer;opacity:${opacitys};`);
		if (state.moveDifference < -400) {
			el.setAttribute('style', `top:${-el.clientHeight}px;cursor:pointer;transition:all 0.3s ease;`);
			state.moveDifference = -el.clientHeight;
			setTimeout(() => {
				if(el && el.parentNode){
					el.parentNode.removeChild(el)
				}
			}, 300);
		}
		if (state.moveDifference === -el.clientHeight) {
			state.isShowLoockLogin = true;
			layoutLockScreenInputRef.value.focus();
		}
	}
};
// 鼠标松开
const onEnd = () => {
	state.isFlags = false;
	state.transparency = 1;
	if (state.moveDifference >= -400) {
		state.querySelectorEl.setAttribute('style', `top:0px;opacity:1;transition:all 0.3s ease;`);
	}
};
// 获取要拖拽的初始元素
const initGetElement = () => {
	nextTick(() => {
		state.querySelectorEl = proxy.$refs.layoutLockScreenDateRef;
	});
};
// 时间初始化
const initTime = () => {
	state.time.hm = formatDate(new Date(), 'HH:MM');
	state.time.s = formatDate(new Date(), 'SS');
	state.time.mdq = formatDate(new Date(), 'mm月dd日，WWW');
};
// 时间初始化定时器
const initSetTime = () => {
	initTime();
	state.setIntervalTime = window.setInterval(() => {
		initTime();
	}, 1000);
};
// 锁屏时间定时器
const initLockScreen = () => {
	if (store.state.themeConfig.themeConfig.isLockScreen) {
		state.isShowLockScreenIntervalTime = window.setInterval(() => {
			if (store.state.themeConfig.themeConfig.lockScreenTime <= 1) {
				state.isShowLockScreen = true;
				setLocalThemeConfig();
				return false;
			}
			store.state.themeConfig.themeConfig.lockScreenTime--;
		}, 1000);
	} else {
		clearInterval(state.isShowLockScreenIntervalTime);
	}
};
// 存储布局配置
const setLocalThemeConfig = () => {
	store.state.themeConfig.themeConfig.isDrawer = false;
	Local.set('themeConfig', store.state.themeConfig.themeConfig);
};
// 密码输入点击事件
const onLockScreenSubmit = () => {
	store.state.themeConfig.themeConfig.isLockScreen = false;
	store.state.themeConfig.themeConfig.lockScreenTime = 30;
	setLocalThemeConfig();
};
// 页面加载时
onMounted(() => {
	initGetElement();
	initSetTime();
	initLockScreen();
});
// 页面卸载时
onUnmounted(() => {
	window.clearInterval(state.setIntervalTime);
	window.clearInterval(state.isShowLockScreenIntervalTime);
});
</script>

<style scoped lang="scss" src="./css/index.scss"></style>
