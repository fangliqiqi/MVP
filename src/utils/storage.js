const PRFIX = 'hro_mvp_'; // 添加前缀，

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
	// 设置永久缓存
	set(key, val) {
		window.localStorage.setItem(PRFIX+key, JSON.stringify(val));
	},
	// 获取永久缓存
	get(key) {
		let json = window.localStorage.getItem(PRFIX+key);
		return JSON.parse(json);
	},
	// 移除永久缓存
	remove(key) {
		window.localStorage.removeItem(PRFIX+key);
	},
	// 移除全部永久缓存
	clear() {
		window.localStorage.clear();
	},
};

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
	// 设置临时缓存
	set(key, val) {
		window.sessionStorage.setItem(PRFIX+key, JSON.stringify(val));
	},
	// 获取临时缓存
	get(key) {
		let json = window.sessionStorage.getItem(PRFIX+key);
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove(key) {
		window.sessionStorage.removeItem(PRFIX+key);
	},
	// 移除全部临时缓存
	clear() {
		window.sessionStorage.clear();
	},
};
