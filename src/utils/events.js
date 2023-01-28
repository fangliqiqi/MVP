export const EVENTS = {
	REFRESH: 'refresh',
};

/**
 * 刷新通知
 * @param {*} proxy
 * @param {*} target  发送需要刷新的列表url
 * @param {*} params  额外的传递参数，特殊需要使用，一般可不使用
 */
export function emitRefresh(proxy, target, params = {}) {
	proxy.mittBus.emit(EVENTS.REFRESH, { ...params, target });
}

/**
 * 监听刷新消息
 * @param {*} proxy
 * @param {*} target  作用页面url
 * @param {*} resolve  匹配回调函数
 * @param {*} reject  错误回调函数
 */
export function onRefresh(proxy, target, resolve, reject = ()=>{}) {
	proxy.mittBus.on(EVENTS.REFRESH, (res) => {
		// console.log('get EVENTS.REFRESH:',res,target)
		if (res.target === target) {
			resolve(res.params);
		} else if(reject){
			reject(new Error('target参数不匹配'));
		}
	});
}


/**
 * 需要在onUnmounted中销毁
 * @param {*} proxy 
 */
export function offRefresh(proxy) {
    proxy.mittBus.off(EVENTS.REFRESH)
}
