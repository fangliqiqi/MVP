// 电子档案相关接口
import request from '@/utils/request';


/**
 * 分页查询
 * @param {parentId:str} params 列表请求参数
 * @returns Promise 可通过await 同步获取也可以通过then方式异步获取
 */
 export async function getElectronicPage(params) {
	return request({
		url: '/yifu-archives/method/telecemployeeinfo/page',
		method: 'GET',
		params,
	});
}

/**
 * 删除档案
 * @param {*} id 字典id
 * @returns
 */
 export async function delElectronic(id) {
	return request({
		url: '/yifu-archives/method/telecemployeeinfo/' + id,
		method: 'DELETE',
	});
}

/**
 * 新增档案
 * @param {*} id 字典id
 * @returns
 */
 export async function addElectronic(data) {
	return request({
		url: '/yifu-archives/method/telecemployeeinfo',
		method: 'POST',
		data
	});
}



/**
 * 获取电子档案详情
 * @param {*} id 字典id
 * @returns
 */
 export async function getElectronic(id) {
	return request({
		url: '/yifu-archives/method/telecemployeeinfo/' + id,
		method: 'get',
	});
}




/**
 * 编辑档案
 * @param {*} id 字典id
 * @returns
 */
 export async function updateElectronic(data) {
	return request({
		url: '/yifu-archives/method/telecemployeeinfo',
		method: 'PUT',
		data
	});
}

