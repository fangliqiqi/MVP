import request from '@/utils/request';


/**
 * 获取角色 分页
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function getRolePage(params) {
	return request({
		url: '/yifu-upms/method/role/page',
		method: 'GET',
		params
	});
}
/**
 * 获取角色 不分页
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function getRoleList(params) {
	return request({
		url: '/yifu-upms/method/role/list',
		method: 'GET',
		params
	});
}

/**
 * 角色新增
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function addRole(data) {
	return request({
		url: '/yifu-upms/method/role',
		method: 'POST',
		data,
	});
}
/**
 * 角色更新
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function updateRole(data) {
	return request({
		url: '/yifu-upms/method/role',
		method: 'put',
		data,
	});
}

/**
 * 角色删除
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function delRoleByid(id) {
	return request({
		url: '/yifu-upms/method/role/'+id,
		method: 'DELETE',
	});
}

/**
 * 编辑角色权限
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function updateRolePerm(data) {
	return request({
		url: '/yifu-upms/method/role/menu',
		method: 'PUT',
		data,
	});
}