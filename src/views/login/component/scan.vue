<template>
	<div class="login-scan-container">
		<div ref="qrcodeRef"></div>
		<div class="font12 mt20 login-msg">打开手机扫一扫，快速登录/注册</div>
	</div>
</template>

<script setup name="loginScan">
import QRCode from 'qrcodejs2-fixes';

const qrcodeRef = ref('');
// 初始化生成二维码
const initQrcode = () => {
	qrcodeRef.value.innerHTML = '';
	new QRCode(qrcodeRef.value, {
		text: `https://qm.qq.com/cgi-bin/qm/qr?k=RdUY97Vx0T0vZ_1OOu-X1yFNkWgDwbjC&jump_from=webapi`,
		width: 260,
		height: 260,
		colorDark: '#000000',
		colorLight: '#ffffff',
	});
};
// 页面加载时
onMounted(() => {
	initQrcode();
});
</script>

<style scoped lang="scss" src="./css/scan.scss">

</style>
