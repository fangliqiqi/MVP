import { store } from '/@/store/index';
import { judementSameArr } from '/@/utils/arrayOperation';

/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="xxx"）
 * @directive 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
 * @directive 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
 */
export function authDirective(app) {
	// 单个权限验证（v-auth="xxx"）
	app.directive('auth', {
		mounted(el, binding) {
			if (!store.state.userInfos.permission.some((v) => v === binding.value)) el.parentNode.removeChild(el);
		},
	});
	// 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
	app.directive('auths', {
		mounted(el, binding) {
			let flag = false;
			if(!binding.value || binding.value.length === 0){
				// 添加默認配置，若權限傳入爲空或不傳入，則默認不校驗權限
				flag = true;
			}else {
				store.state.userInfos.permission.map((val) => {
					binding.value.map((v) => {
						if (val === v) flag = true;
					});
				});
			}

			if (!flag) el.parentNode.removeChild(el);
		},
	});
	// 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
	app.directive('auth-all', {
		mounted(el, binding) {
			const flag = judementSameArr(binding.value, store.state.userInfos.permission);
			if (!flag) el.parentNode.removeChild(el);
		},
	});
}
