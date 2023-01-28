import request from '@/utils/request';


/**
 * 获取菜单
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function getMenus(params) {
	return request({
		url: '/yifu-upms/method/menu',
		method: 'GET',
    params,
	});
}

/**
 * 获取菜单树
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function getMenuTree(params) {
	return request({
		url: '/yifu-upms/method/menu/tree',
		method: 'GET',
    params,
	});
}


/**
 * 获取菜单详情
 * @param {*} id 
 * @returns 
 */
export async function getMenuInfo(id) {
	return request({
		url: `/yifu-upms/method/menu/${id}`,
		method: 'GET',
	});
}

/**
 * 删除单个菜单
 * @param {*} id 
 */
export async function deleteMenu(id) { 
	return request({
		url: `/yifu-upms/method/menu/${id}`,
		method: 'delete',
	});
}


/**
 * 删除菜单缓存
 * @returns 
 */
export async function deleteMenuCache(){
	return request({
		url: `/yifu-upms/method/menu/cache`,
		method: 'delete',
	});
}


/**
 * 新建菜单
 * @param {*} data 
 * @returns 
 */
export async function addMenuInfo(data) {
	return request({
		url: '/yifu-upms/method/menu',
		method: 'post',
		data,
	});
}


/**
 * 更新菜单
 * @param {*} data 
 * @returns 
 */
export async function updateMenuInfo(data) {  
	return request({
		url: '/yifu-upms/method/menu',
		method: 'put',
		data,
	});

}

/**
 * 获取用户菜单权限
 * @param {*} id 
 * @returns 
 */
 export async function getMenuByRoleId(id) {
	return request({
		url: `/yifu-upms/method/menu/tree/${id}`,
		method: 'GET',
	});
}

/**
 * 获取菜单列表不分页
 * @param {*} id 
 * @returns 
 */
 export async function getMenuList(params) {
	return request({
		url: '/yifu-upms/method/menu/listOfPageMenu',
		method: 'GET',
		params
	});
}