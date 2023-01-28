// 划转相关接口
import request from '@/utils/request';

/**
 * 获取所有项目名称
 * @returns 
 */
export async function getAllDept() {
	return request({
		url: '/yifu-archives/method/tempchangeinfo/getAllDept',
		method: 'get',
	});
}

/**
 * 获取所有单位名称
 * @returns 
 */
 export async function getAllUint() {
	return request({
		url: '/yifu-archives/method/tempchangeinfo/getAllUint',
		method: 'get',
	});
}

// 获取单位名称
export async function getUnitPage(params) {
	return request({
		url: '/yifu-archives/method/tsettledomain/getUnitPage',
		method: 'get',
		params
	});
}

/**
 * 获取所有单位名称
 * @returns 
 */
 export async function empProArcChange(data) {
	return request({
		url: '/yifu-archives/method/tempchangeinfo/empProArcChange',
		method: 'post',
    data
	});
}
