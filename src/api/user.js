import request from '@/utils/request';


/**
 * 获取用户信息
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function getUserInfo() {
	return request({
		url: '/yifu-upms/method/user/info',
		method: 'GET',
	});
}


/**
 * 获取用户管理信息
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function getUserlist(params) {
	return request({
		url: '/yifu-upms/method/user/page',
		method: 'GET',
		params,
	});
}

/**
 * 修改用户信息
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function updateUser(data) {
	return request({
		url: '/yifu-upms/method/user',
		method: 'PUT',
		data
	});
}

/**
 * 获取用户详情
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function getUserDetail(id) {
	return request({
		url: '/yifu-upms/method/user/'+id,
		method: 'get',
	});
}


/**
 * 同步部门信息
 * @returns 
 */
 export async function syncData() {
	return request({
		url: '/yifu-upms/method/user/updateUser',
		method: 'post',
	});
}