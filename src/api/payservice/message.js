import request from '@/utils/request';

/**
 * 最低工资提醒-列表
 * @param {*} params 
 * @returns 
 */
 export async function getminSalaryList(params) {
	return request({
		url: '/yifu-salary/method/sysmessagesalary/page',
		method: 'GET',
		params,
	});
}

/**
 *有工资无社保-列表
 *
 * @export
 * @param {*} params
 * @return {*} 
 */
export async function getsalaryNotsocial(params) {
	return request({
		url: '/yifu-salary/method/thavesalarynosocial/page',
		method: 'GET',
		params,
	});
}

/**
 *
 *有工资无社保-导出
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function exportSalaryNotsocial(data) {
	return request({
		url: '/yifu-salary/method/thavesalarynosocial/export',
		method: 'POST',
		responseType: 'blob',
		data,
	});
}

/*
*有工资无社保-反馈原因
*
*/
export async function salaryNotsocialFeedback(params) {
	return request({
		url: '/yifu-salary/method/thavesalarynosocial/feedback',
		method: 'POST',
		params,
	});
}

/**
 * 最低工资提醒-导出
 * @param {*} data 
 * @returns 
 */
export async function exportMinSalary(data) {
	return request({
		url: '/yifu-salary/method/sysmessagesalary/export',
		method: 'POST',
		responseType: 'blob',
		data,
	});
}

/**
 *最低工资提醒-反馈原因
 * @export
 * @param {*} params
 * @return {*} 
 */
export async function minSalaryFeedback(params) {
	return request({
		url: '/yifu-salary/method/sysmessagesalary/feedback',
		method: 'POST',
		params,
	});
}