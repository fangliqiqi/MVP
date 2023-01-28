import request from '@/utils/request';


/**
 * 获取数据权限
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function getPermissionList(params) {
	return request({
		url:'/yifu-upms/method/dataAuth/getSysDataAuthPage',
		method: 'GET',
		params,
	});
}

/**
 * 新增/编辑数据权限
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function addPermission(data) {
	return request({
		url:'/yifu-upms/method/dataAuth/saveOrUpdate',
		method: 'post',
		data,
	});
}

export async function getPermission(id) {
	return request({
		url:'/yifu-upms/method/dataAuth/'+id,
		method: 'get',
	});
}

/**
 * 删除数据权限
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function delPermission(id) {
	return request({
		url:'/yifu-upms/method/dataAuth/'+id,
		method: 'DELETE',
	});
}