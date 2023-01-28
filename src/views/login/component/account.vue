<template>
	<el-form size="large" :model="state.ruleForm"  :rules="rules"  ref="ruleForm" @keyup.enter="onSignIn" class="login-content-form">
		<el-form-item class="login-animation1" prop="username">
			<el-input type="text" placeholder="请输入用户名" v-model="state.ruleForm.username" clearable autocomplete="off">
				<template #prefix>
					<img :src="yonghu" alt="用户">
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2" prop="password">
			<el-input :type="state.isShowPassword ? 'text' : 'password'" placeholder="请输入密码" v-model="state.ruleForm.password" autocomplete="off">
				<template #prefix>
					<img :src="mima" alt="密码">
				</template>
				<template #suffix>
					<em
						class="iconfont el-input__icon login-content-password"
						:class="state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="state.isShowPassword = !state.isShowPassword"
					>
					</em>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation4">
			<el-button type="primary" class="login-content-submit" round @click="onSignIn" :loading="state.loading.signIn">
				<span>登录</span>
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup name="loginAccount">
import { ElMessage } from 'element-plus';
import { initBackEndControlRoutes } from '/@/router/backEnd';
import { formatAxis } from '/@/utils/formatTime';
import {Session } from '/@/utils/storage';
import mima from '/@/assets/ic_mima.svg';
import yonghu from '/@/assets/ic_yonghu.svg';



const store = useStore();
const router = useRouter();
const state = reactive({
	isShowPassword: false,
	ruleForm: {
		username: '',
		password: '',
	},
	loading: {
		signIn: false,
	},
});

const ruleForm = ref(null);
const rules = reactive({
	username: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
	],
});

// 时间获取
const currentTime = computed(() => {
	return formatAxis(new Date());
});
// 登录
const onSignIn = () => {
	ruleForm.value.validate(async (valid) => {
		if (valid) {
			state.loading.signIn = true;
			// 1、请注意执行顺序(存储用户信息到vuex)
			try {
				// console.log(`state.ruleForm->`,state.ruleForm);
				await store.dispatch('userInfos/login', state.ruleForm)
				await initBackEndControlRoutes();
				// console.log(`output->`,store.state.menuList)
				signInSuccess()
			} catch (error) {
				state.loading.signIn = false
			}	
		}
	});
};

// // 登录成功后的跳转
const signInSuccess = () => {
	// 初始化登录成功时间问候语
	let currentTimeInfo = currentTime.value;
	// 登录成功，跳到转首页

	router.push('/')
	// 登录成功提示
	// 关闭 loading
	state.loading.signIn = false;
	const menuFlag = Session.get('menu')&& Session.get('menu').length> 0 ? true : false;
	if(!menuFlag){
		ElMessage.warning('该用户未授权，请联系管理员！')
		state.loading.signIn = false;
		return false
	}
	const signInText = '欢迎回来！';
	// console.log(store.state.userInfos.userInfos);
	const username = store.state.userInfos.userInfos.nickName;
	ElMessage.success(`${username}${currentTimeInfo}，${signInText}`);
};
</script>

<style scoped lang="scss" src="./css/account.scss">

</style>
