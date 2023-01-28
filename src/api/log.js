import request,{SYSTEM_PREFIX} from '@/utils/request';


/**
 * 获取日志信息
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function getLogList(params) {
	return request({
		url:SYSTEM_PREFIX + '/yifu-upms/method/log/page',
		method: 'GET',
		params,
	});
}

/**
 * 删除日志信息
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function delLogById(id) {
	return request({
		url: SYSTEM_PREFIX +`/yifu-upms/method/log/${id}`,
		method: 'DELETE',
	});
}