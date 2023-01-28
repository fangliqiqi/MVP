import request from '@/utils/request';

/**
 * 获取投保办理
 * @param
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
 * 获取投保办理(带数据权限)
 * @param
 * @returns
 */
export async function getInsuranceHandleListPage(params, data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getInsuranceHandleListPage',
		method: 'POST',
		params,
		data,
	});
}

/**
 * 登记保单保费
 * @param
 * @returns
 */
export async function registeredPolicyPremium(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/registeredPolicyPremium',
		method: 'POST',
		data,
	});
}

/**
 * 批量办理
 * @param
 * @returns
 */
export async function insuranceHandleImport(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/insuranceHandleImport',
		method: 'POST',
		data,
	});
}

/**
 * 批量办理
 * @param
 * @returns
 */
export async function insuranceRefundImport(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/insuranceRefundImport',
		method: 'POST',
		data,
	});
}

/**
 * 导出办理
 * @param
 * @returns
 */
export async function getInsuranceExportList(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getInsuranceExportList',
		method: 'POST',
		data,
	});
}

/**
 * 减员办理分页查询
 * @param
 * @returns
 */
export async function getInsuranceRefundList(params) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getInsuranceRefundHandlingPageList',
		method: 'GET',
		params,
	});
}

/**
 * 办理成功
 * @param
 * @returns
 */
export async function successfulInsurance(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/successfulInsurance',
		method: 'POST',
		data,
	});
}

/**
 * 投保退回
 * @param
 * @returns
 */
export async function rollBackInsurance(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/rollBackInsurance',
		method: 'POST',
		data,
	});
}

/**
 * 减员办理导出
 * @param
 * @returns
 */
export async function getInsuranceRefundHandlingList(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getInsuranceRefundHandlingList',
		method: 'POST',
		data,
	});
}

/**
 * 减员办理导出
 * @param
 * @returns
 */
export async function updateInsuranceRefund(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/updateInsuranceRefund',
		method: 'POST',
		data,
	});
}

// /**
//  * 减员办理导出
//  * @param
//  * @returns
//  */
// export async function updateRefundMoney(data) {
// 	return request({
// 		url: '/yifu-insurances/method/insuranceDetail/updateRefundMoney',
// 		method: 'POST',
// 		data,
// 	});
// }

// 减员退费分页列表
export async function getInsuranceRefundMoneyPageList(params) {
	return request({
		url: '/yifu-insurances/method/insuranceRefund/getInsuranceRefundMoneyPageList',
		method: 'GET',
		params,
	});
}

// 减员退费列表导出
export async function getInsuranceRefundMoneyList(params) {
	return request({
		url: '/yifu-insurances/method/insuranceRefund/getInsuranceRefundMoneyList',
		method: 'GET',
		params,
	});
}

// 登记减员退费
export async function updateRefundMoney(data) {
	return request({
		url: '/yifu-insurances/method/insuranceRefund/updateRefundMoney',
		method: 'POST',
		data,
	});
}

/**
 * 登记发票号
 * @param 
 * @returns 
 */
export async function registeredInvoiceNoImport(data) {
    return request({
        url: '/yifu-insurances/method/insuranceDetail/registeredInvoiceNo',
        method: 'POST',
        data,
    });
}

/**
 * 参保信息变更导入
 * @param 
 * @returns 
 */
export async function updateInsuranceInsured(data) {
    return request({
        url: '/yifu-insurances/method/insuranceDetail/updateInsuranceInsured',
        method: 'POST',
        data,   
    });
}

/**
 * 参保信息变更单条变更
 * @param 
 * @returns 
 */
export async function updateInsuranceInsuredById(data) {
    return request({
        url: '/yifu-insurances/method/insuranceDetail/updateInsuranceInsuredById',
        method: 'POST',
        data,   
    });
}


