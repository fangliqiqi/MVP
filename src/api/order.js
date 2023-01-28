import request from '@/utils/request';

/**
 * 获取Order订单列表
 * @param {*} params
 * @returns
 */
export async function getOrderList(params) {
	return request({
		url: '/yifu-order/method/order/getOrderPageList',
		method: 'GET',
		params,
	});
}

// 获取订单详情
export async function getDetailById(id) {
	return request({
		url: `/yifu-order/method/order/${id}`,
		method: 'get',
	});
}

// 获取订单详情附件
export async function getEnclosureUrl(id) {
	return request({
		url: `/yifu-order/method/order/getEnclosureUrl/${id}`,
		method: 'get',
	});
}

// 获取订单详情
export async function getOrderReplyPageList(params) {
	return request({
		url: `/yifu-order/method/order/getOrderReplyPageList`,
		method: 'get',
		params,
	});
}

// 添加一条回复记录
export async function uploadReplyEnclosure(data, onUploadProgress) {
	return request({
		url: `/yifu-order/method/order/uploadReplyEnclosure`,
		method: 'POST',
		data,
		onUploadProgress,
	});
}

// 商险列表
export async function getInsuranceListPage(params, data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/getOrderInsuredListPage',
		method: 'POST',
		params,
		data,
	});
}

/**
 * 投保新增,导入
 */
export async function addInsurance(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/addOrderInsurance',
		method: 'POST',
		data,
	});
}

/**
 * 投保批增,导入
 */
export async function batchInsurance(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/batchOrderInsurance',
		method: 'POST',
		data,
	});
}

/**
 * 投保替换,导入
 */
export async function replaceInsurance(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/replaceOrderInsurance',
		method: 'POST',
		data,
	});
}

/**
 * 已投保减员操作,导入
 */
export async function saveInsuranceRefund(data) {
	return request({
		url: '/yifu-insurances/method/insuranceDetail/refundOrderInsurance',
		method: 'POST',
		data,
	});
}

/**
 * 获取导出订单列表信息
 * @param {*} params
 * @returns
 */
export async function exportOrderList(data) {
	return request({
		url: '/yifu-order/method/order/getOrderList',
		method: 'post',
		data,
	});
}

/**
 * 改变订单状态
 * @param {*} params
 * @returns
 */
export async function handleOrder(params) {
	return request({
		url: '/yifu-order/method/order/handleOrder',
		method: 'GET',
		params,
	});
}
