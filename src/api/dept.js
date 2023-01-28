import request from '/@/utils/request';


/**
 * 获取部门列表
 * @param {*} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function getDeptList(params) {
	return request({
		url: '/yifu-upms/method/dept/tree',
		method: 'GET',
    params,
	});
}


/**
 * 同步部门信息
 * @returns 
 */
export async function syncData() {
	return request({
		url: '/yifu-upms/method/dept/updateDept',
		method: 'post',
	});
}