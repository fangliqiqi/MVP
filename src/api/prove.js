import request from '@/utils/request';

/**
 * 获取证明开具列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
export async function getProveList(params) {
	return request({
		url: '/yifu-archives/method/tcertrecord/page',
		method: 'GET',
		params,
	});
}

/**
 *获取证明开具详情
 * @export
 * @param {*} params
 */
export async function getProveDetail(id) {
	return request({
		url: '/yifu-archives/method/tcertrecord/' + id,
		method: 'GET',
	});
}

/**
 * 导出证明开具列表
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function exportProveList(data) {
	return request({
		url: '/yifu-archives/method/tcertrecord/noPage',
		method: 'POST',
		data,
	});
}

// /tcertrecord/getCertRecordInfo  
/**
 * 获取证明开具弹窗信息
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function getProveByid(params) {
	return request({
		url: '/yifu-archives/method/tcertrecord/getCertRecordInfo',
		method: 'GET',
		params
	});
}


/**
 *新增证明开具
 * @export
 * @param {*} params
 */
 export async function addProve(data) {
	return request({
		url: '/yifu-archives/method/tcertrecord',
		method: 'POST',
		data,
	});
}