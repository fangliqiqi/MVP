import request from '@/utils/request';

/**
 * 获取字典列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function getDictPage(params) {
	return request({
		url: '/yifu-upms/method/dict/page',
		method: 'GET',
		params,
	});
}

/**
 *获取字典数据
 * @export
 * @param {*} type 列表请求参数 字典type
 * @return {*}
 */
export async function getDictbyType(type) {
	return request({
		url: '/yifu-upms/method/dict/type/' + type,
		method: 'GET',
	});
}

/**
 *获取字典数据
 * @export
 * @param {array} type 列表请求参数 字典type
 * @return {*}
 */
export async function getItembyTypes(itemTypes) {
	return request({
		url: '/yifu-upms/method/dict/getParentDictItemByTypes',
		method: 'GET',
		params: {
			itemTypes: itemTypes.join(','),
		},
	});
}

/**
 * 清楚字典缓存
 * @returns 返回Promise对象
 */
export async function clearCache() {
	return request({
		url: '/yifu-upms/method/dict/cache',
		method: 'delete',
	});
}

/**
 * 删除字典项
 * @param {*} id 字典id
 * @returns
 */
export async function delDict(id) {
	return request({
		url: '/yifu-upms/method/dict/' + id,
		method: 'DELETE',
	});
}

/**
 * 获取字典内容
 * @param {*} id
 * @returns
 */
export async function getDictInfo(id) {
	return request({
		url: '/yifu-upms/method/dict/' + id,
		method: 'get',
	});
}

/**
 * 新增字典
 * @param {*} data 字典内容
 * @returns
 */
export async function addDict(data) {
	return request({
		url: '/yifu-upms/method/dict',
		method: 'POST',
		data,
	});
}

/**
 * 更新字典项
 * @param {*} data 字典内容
 * @returns
 */
export async function updateDict(data) {
	return request({
		url: '/yifu-upms/method/dict',
		method: 'PUT',
		data,
	});
}

/**
 * 字典项详情列表
 * @param {*} params
 * @returns
 */
export async function getDicItemPage(params) {
	return request({
		url: '/yifu-upms/method/dict/item/page',
		method: 'get',
		params,
	});
}

/**
 * 获取字典项详情
 * @param {*} id
 * @returns
 */
export async function getDicItemInfo(id) {
	return request({
		url: '/yifu-upms/method/dict/item/' + id,
		method: 'get',
	});
}

/**
 * 新增字典项
 * @param {*} id
 * @returns
 */
export async function addDicItem(data) {
	return request({
		url: '/yifu-upms/method/dict/item/',
		method: 'post',
		data,
	});
}

/**
 * 更新字典项
 * @param {*} id
 * @returns
 */
export async function updateDicItem(data) {
	return request({
		url: '/yifu-upms/method/dict/item/',
		method: 'put',
		data,
	});
}

/**
 * 更新字典项
 * @param {*} id
 * @returns
 */
export async function delDicItem(id) {
	return request({
		url: '/yifu-upms/method/dict/item/' + id,
		method: 'delete',
	});
}
