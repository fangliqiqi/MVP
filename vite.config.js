import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
const pathResolve = (dir) => {
	return resolve(__dirname, '.', dir);
};

const alias = {
	'/@': pathResolve('./src/'),
	'@': pathResolve('./src/'),
};
// 1. 以下地址只是在本地调试使用，打包时不需关注当前currentProxy已经连接地址的；因为打包后currentProxy连接的地址不会被使用，会自动匹配线上地址/域名。
// 2. 本地如果使用 生产地址 在调试，调试完后切记提交前把currentProxy改为dev测试环境地址；防止本地使用生产环境地址调试后，未修改地址而提交到dev分支，
//  别人拉取dev分支去使用时，忘了修改地址而误操作了线上数据；
const proxyConfig = {
	// mvp: 'http://mvp.wanxinwork.com/', // 生产环境
	dev: 'https://qas-mvp-1.worfu.com/', // 测试环境
	fang: 'http://172.16.24.66:8888/', // 房新江
	hu: 'http://172.16.24.77:8888/', // 胡雨辰
	hong: 'http://172.16.24.250:8888/', // 洪光武
	can: 'http://172.16.24.225:3511/v1.0/invoke/', //李灿灿
	zha: 'http://172.16.24.176:3511/v1.0/invoke/', //查济
};

const currentProxy = 'hong';
const viteConfig = defineConfig((mode) => {
	const env = loadEnv(mode.mode, process.cwd());
	return {
		plugins: [
			vue(),
			vueSetupExtend(),
			AutoImport({
				imports: ['vue', 'vue-router', 'vuex'],
			}),
		],
		root: process.cwd(),
		resolve: { alias },
		// base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
		base: mode.command === 'serve' ? './' : '/',
		server: {
			host: '0.0.0.0',
			port: env.VITE_PORT,
			open: env.VITE_OPEN,
			hmr: true,
			proxy: {
				'/yifu-auth': {
					// 登录、权限
					target: proxyConfig[currentProxy], //测试环境api地址：0，房新江本地服务地址：1，胡雨辰本地服务地址：2，洪光武本地服务地址：3
					ws: true,
					changeOrigin: true,
				},
				'/yifu-upms': {
					// 系统管理
					target: proxyConfig[currentProxy],
					ws: true,
					changeOrigin: true,
				},
				'/yifu-archives': {
					// 档案和合同
					target: proxyConfig[currentProxy],
					ws: true,
					changeOrigin: true,
				},
				'/yifu-codegen': {
					// 代码生成
					target: proxyConfig[currentProxy],
					ws: true,
					changeOrigin: true,
				},
				'/yifu-job': {
					target: proxyConfig[currentProxy], // 目前只可使用房新江本地和测试环境
					ws: true,
					changeOrigin: true,
				},
				'/yifu-social': {
					target: proxyConfig[currentProxy], // 社保、公积金
					ws: true,
					changeOrigin: true,
				},
				'/yifu-insurances': {
					target: proxyConfig[currentProxy], // 商险
					ws: true,
					changeOrigin: true,
				},
				'/yifu-salary': {
					target: proxyConfig[currentProxy], // 薪资
					ws: true,
					changeOrigin: true,
				},
				'/yifu-order': {
					target: proxyConfig[currentProxy], // order
					ws: true,
					changeOrigin: true,
				},
				'/yifu-check': {
					// 这个服务用了很久，为什么没有配置开发环境
					target: proxyConfig[currentProxy],
					ws: true,
					changeOrigin: true,
				},
			},
		},
		build: {
			outDir: 'dist',
			minify: 'terser',
			sourcemap: false,
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					entryFileNames: `assets/[name].${new Date().getTime()}.js`,
					chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
					assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
					compact: true,
					manualChunks: {
						vue: ['vue', 'vue-router', 'vuex'],
						echarts: ['echarts'],
					},
				},
			},
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
				ie8: true,
				output: {
					comments: true,
				},
			},
		},
		css: {
			postcss: {
				plugins: [
					{
						postcssPlugin: 'internal:charset-removal',
						AtRule: {
							charset: (atRule) => {
								if (atRule.name === 'charset') {
									atRule.remove();
								}
							},
						},
					},
				],
			},
		},
	};
});

export default viteConfig;
