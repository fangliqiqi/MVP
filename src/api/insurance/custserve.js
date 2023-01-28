import request from '@/utils/request';

/**
 * 项目列表
 * @returns
 */
export async function deptList() {
	return request({
		url: `/yifu-insurances/method/insuranceDetail/getDeptListByUser`,
		method: 'GET',
	});
}

/**
 * 投保分页列表
 * @param
 * @data
 * @returns
 */
export async function getInsuranceListPage(params, data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getInsuranceListPage',
		method: 'POST',
		params,
		data,
	});
}

/**
 * 投保不分页列表,导出用
 * @data
 * @returns
 */
export async function getInsuranceList(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getInsuranceList',
		method: 'POST',
		data,
	});
}

/**
 * 通过id查询详情
 * @param {投保id} id
 * @returns
 */
export async function getInsuranceDetail(id) {
	return request({
		url: `/yifu-insurances/method/insuranceDetail/${id}`,
		method: 'GET',
	});
}

/**
 * 通过id编辑
 * @param {投保id} id
 * @returns
 */
export async function editInsurance(data) {
	return request({
		url: `/yifu-insurances/method/insuranceDetail/editInsurance`,
		method: 'POST',
		data,
	});
}

/**
 * 投保新增,导入
 */
export async function addInsurance(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/addInsurance',
		method: 'POST',
		data,
	});
}

/**
 * 投保批增,导入
 */
export async function batchInsurance(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/batchInsurance',
		method: 'POST',
		data,
	});
}

/**
 * 投保替换,导入
 */
export async function replaceInsurance(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/replaceInsurance',
		method: 'POST',
		data,
	});
}

/**
 * 已投保分页列表
 * @param
 * @data
 * @returns
 */
export async function getInsuredListPage(params, data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getInsuredListPage',
		method: 'POST',
		params,
		data,
	});
}

/**
 * 已投保不分页列表,导出用
 * @data
 * @returns
 */
export async function getInsuredList(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getInsuredList',
		method: 'POST',
		data,
		responseType: 'blob',
		timeout: 0,
	});
}

/**
 * 已投保减员操作,导入
 */
export async function saveInsuranceRefund(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/saveInsuranceRefund',
		method: 'POST',
		data,
	});
}

/**
 * 已投保变更项目,导入
 */
export async function deptChange(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/deptChange',
		method: 'POST',
		data,
	});
}

/**
 * 已投保变更结算月,导入
 */
export async function settleMonthChange(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/settleMonthChange',
		method: 'POST',
		data,
	});
}

/**
 * 通过id删除
 */
export async function deleteInsurance(id) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/deleteInsurance',
		method: 'get',
		params: { id },
	});
}

/**
 * 通过id出险
 */
export async function updateIsUse(id) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/updateIsUse',
		method: 'get',
		params: { id },
	});
}

/**
 * 已减员分页列表
 * @param
 * @data
 * @returns
 */
export async function getInsuranceRefundPageList(params, data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getInsuranceRefundPageList',
		method: 'POST',
		params,
		data,
	});
}

/**
 * 已减员不分页列表,导出用
 * @data
 * @returns
 */
export async function getInsuranceRefundList(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getInsuranceRefundList',
		method: 'POST',
		data,
	});
}

/**
 * 通过id查询操作流程
 * @param {投保id} id
 * @returns
 */
export async function operate(id) {
	return request({
		url: `/yifu-insurances/method/insuranceDetail/operate/${id}`,
		method: 'GET',
	});
}
