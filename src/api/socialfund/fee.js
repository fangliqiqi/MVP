import request from '@/utils/request';

/**
 * 获取预估费用列表  hasPermission('social_tforecastlibrary-export')
 * @param {*} params
 * @returns
 */
export async function getEstimateFeeList(params) {
	return request({
		url: '/yifu-social/method/tforecastlibrary/page',
		method: 'get',
		params,
	});
}

/**
 * 按缴纳月重新生成  按缴纳月重新生成：hasPermission('social_tforecastlibrary_create')
 * @param {payMonths:str,empIdCard:str,settleDomainIds:str} data
 */
export async function createForecastlibary(params) {
	return request({
		url: '/yifu-social/method/tforecastlibrary/createForecastlibary',
		method: 'post',
		params,
	});
}

/**
 * 获取预估费的数据
 * @param {*} id
 * @returns
 */
export async function getForecastInfo(id) {
	return request({
		url: '/yifu-social/method/tforecastlibrary/' + id,
		method: 'get',
	});
}

/**
 * 批量导出预估费用
 *
 */
export async function exportEstimateFee(params, data) {
	return request({
		url: '/yifu-social/method/tforecastlibrary/export',
		method: 'post',
		responseType: 'blob',
		params,
		data,
	});
}

/**
 * 批量导出实缴费用
 *
 */
export async function exportPaidFee(params, data) {
	return request({
		url: '/yifu-social/method/tpaymentinfo/export',
		method: 'post',
		responseType: 'blob',
		params,
		data,
	});
}

/**
 *合并导出
 *
 * @export
 * @param {*} params
 * @param {*} data
 * @return {*} 
 */
export async function exportMerge(params, data) {
	return request({
		url: '/yifu-social/method/tpaymentinfo/sumExport',
		method: 'post',
		responseType: 'blob',
		params,
		data,
	});
}


/**
 * 預估費用刪除 hasPermission('social_tforecastlibrary_del')
 * @param {*} id
 */
export async function removeEstimateFee(id) {
	return request({
		url: '/yifu-social/method/tforecastlibrary/' + id,
		method: 'delete',
	});
}

// /**
//  * 客户名称列表
//  * @param {*} param
//  */
// export async function getCustomerList(params) {
// 	return request({
// 		url: '/yifu-archives/method/tcustomerinfo/page',
// 		params: {
// 			...params,
// 			deleteFlag: '0', // "删除标识（0未删除/1删除）")
// 			stopFlag: '0', // 合同状态 0正常1已停止
// 		},
// 	});
// }

/**
 * 客户名称列表
 * @param {*} param
 */
 export async function getCustomerList(params) {
	return request({
		url: '/yifu-archives/method/tsettledomain/getUnitPage',
		params: {
			...params
		},
	});
}

/**
 * 获取结算主体分页列表
 * @param {*} params
 * @returns
 */
export async function getSettleDomainList(params) {
	return request({
		url: '/yifu-archives/method/tempchangeinfo/getAllDeptPage',
		method: 'get',
		params
	});
}

/**
 * 获取实缴费用列表
 * @param {*} params
 * @returns
 */
export async function getPaidFeeList(params) {
	return request({
		url: '/yifu-social/method/tpaymentinfo/page',
		method: 'get',
		params,
	});
}

/**
 * 实缴库删除 social_tpaymentinfo_del
 * @param {*} id
 * @returns
 */
export async function deletePaidFee(id) {
	return request({
		url: '/yifu-social/method/tpaymentinfo/' + id,
		method: 'delete',
	});
}

/**
 * 实缴库批量删除 通过ids删除缴费库：hasPermission('social_tpaymentinfo_del')
 * @param {empIdCard:string,socialHouseId:str,fundHouseId:str,socialCreateMonth:str,socialPayMonth:str} params
 */
export async function removeBatchByIdsAndType(params) {
	return request({
		url: '/yifu-social/method/tpaymentinfo/removeBatchByIdsAndType',
		method: 'post',
		params,
	});
}

/**
 * 获取实缴库记录详情
 * @param {*} id
 * @returns
 */
export async function getPaidFee(id) {
	return request({
		url: '/yifu-social/method/tpaymentinfo/' + id,
		method: 'get',
	});
}

/**
 * 获取上传进度
 */
export async function getProcess() {
	return request({
		url: '/yifu-social/method/tpaymentinfoimportlog/exportPaymentInfoLog',
		method: 'get',
	});
}
// 是否打标提价
export async function daBiaoCommit(data){
	return request({
		url: '/yifu-social/method/tpaymentinfo/batchUpdatePaymentInfo',
		method: 'post',
		data,
	});
}
// 手动推送，添加参数
export async function manualPush(data){
	return request({
		url: '/yifu-social/method/tpaymentinfo/pushPaymentSocialFundInfo',
		method: 'post',
		timeout: 60000 * 30,//30分钟
		data
	});
}
