import request from '@/utils/request';

/**
 * 保单号对应起止保时间分页查询
 */
export async function insurancePolicy(params) {
	return request({
		url: '/yifu-insurances/method/insurancePolicy/page',
		method: 'GET',
		params,
	});
}

/**
 * 保单号对应起止保时间不分页查询
 */
export async function insurancePolicyList(params) {
	return request({
		url: '/yifu-insurances/method/insurancePolicy/list',
		method: 'GET',
		params,
	});
}

/**
 * 修改保单号对应起止保时间
 */
export async function insurancePolicyUpdate(data) {
	return request({
		url: '/yifu-insurances/method/insurancePolicy/update',
		method: 'POST',
		data,
	});
}

/**
 * 修改保单号对应起止保时间
 */
export async function getPolicyDetail(id) {
	return request({
		url: `/yifu-insurances/method/insurancePolicy/${id}`,
		method: 'GET',
	});
}

/**
 * 删除保单号对应起止保时间
 */
export async function deletePolicyDetail(id) {
	return request({
		url: `/yifu-insurances/method/insurancePolicy/${id}`,
		method: 'DELETE',
	});
}
