<template>
	<div class="error">
		<div class="error-flex">
			<div class="left">
				<div class="left-item">
					<div class="left-item-animation left-item-num">404</div>
					<div class="left-item-animation left-item-title">地址输入错误，请重新输入地址~</div>
					<div class="left-item-animation left-item-msg">您可以先检查网址，然后重新输入或给我们反馈问题。</div>
					<div class="left-item-animation left-item-btn">
						<el-button type="primary" round @click="onGoHome">返回首页</el-button>
					</div>
				</div>
			</div>
			<div class="right">
				<img  alt="" src="/404.png" />
			</div>
		</div>
	</div>
</template>

<script setup name="404">
const router = useRouter();
const onGoHome = () => {
	router.push('/');
};
</script>

<style scoped lang="scss" src="./css/404.scss">

</style>
