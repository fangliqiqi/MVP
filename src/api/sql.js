import request from '@/utils/request';

/**
 * 获取数据源列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function getDataSourceList(params) {
	return request({
		url: '/yifu-codegen/method/dsconf/page',
		method: 'GET',
		params,
	});
}

/**
 * 获取数据源配置
 * @param {*} data
 * @returns
 */
 export async function getDataSource(id) {
	return request({
		url: '/yifu-codegen/method/dsconf/'+id,
		method: 'get',
	});
}


/**
 * 新增数据源配置
 * @param {*} data
 * @returns
 */
export async function addDataSource(data) {
	return request({
		url: '/yifu-codegen/method/dsconf',
		method: 'post',
		data,
	});
}

/**
 * 更新数据源配置
 * @param {*} data 
 * @returns 
 */
export async function updateDataSource(data) {
	return request({
		url: '/yifu-codegen/method/dsconf',
		method: 'put',
		data,
	});
}


/**
 * 删除数据源配置
 * @param {*} id 
 * @returns 
 */
export async function delDataSource(id) {
	return request({
		url: '/yifu-codegen/method/dsconf/'+id,
		method: 'delete',
	});
}