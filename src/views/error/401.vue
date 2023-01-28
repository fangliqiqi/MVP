<template>
	<div class="error">
		<div class="error-flex">
			<div class="left">
				<div class="left-item">
					<div class="left-item-animation left-item-num">401</div>
					<div class="left-item-animation left-item-title">您未被授权，没有操作权限~</div>
					<div class="left-item-animation left-item-btn">
						<el-button type="primary" round @click="onSetAuth">重新授权</el-button>
					</div>
				</div>
			</div>
			<div class="right">
				<img  alt=""  src="/401.png" />
			</div>
		</div>
	</div>
</template>

<script setup name="401">
import { Local } from '/@/utils/storage';

const router = useRouter();
const onSetAuth = () => {
	Local.clear();
	router.push('/login');
};
</script>

<style scoped lang="scss" src="./css/401.scss">
</style>
