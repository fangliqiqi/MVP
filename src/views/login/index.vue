<template>
	<div class="login-container">
		<!-- <div class="login-icon-group">
			 <img :src="logoBg" alt="背景图">
		</div> -->
		<div class="login-content">
			<div class="login-content-main">
				<img :src="chatu" alt="登录图" class="logo_img">
				<div class="logo_form">
					<img :src="loginLogo" alt="登录图标" class="logo_title">
					<Account />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup name="login">
import Account from '/@/views/login/component/account.vue';
// import logoMini from '/@/assets/logo.png';
// import loginIconTwo from '/@/assets/login-icon-two.svg';
// import logoBg from '/@/assets/bg.png';
import chatu from '/@/assets/chatu.png';
import loginLogo from '/@/assets/login_logo.png';

const store = useStore();
const state = reactive({
	tabsActiveName: 'account',
});
// 获取布局配置信息
const getThemeConfig = computed(() => {
	
	return store.state.themeConfig.themeConfig;
});

document.documentElement.style.fontSize = 16 +'px'

</script>

<style scoped lang="scss" src="./css/index.scss"></style>
