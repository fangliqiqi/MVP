import request from '@/utils/request';

/**
 * 电子保单列表
 * @returns
 */
export async function getPage(params, data) {
	return request({
		url: '/yifu-insurances/method/insuranceEnclosure/getInsuranceEnclosurePage',
		method: 'POST',
		params,
		data,
	});
}

/**
 * 电子保单删除
 */
export async function deleteInsuranceEnclosure(id) {
	return request({
		url: `/yifu-insurances/method/insuranceEnclosure/deleteInsuranceEnclosure/${id}`,
		method: 'GET',
	});
}

/**
 * 电子保单查询下载
 */
export async function getInsuranceEnclosureUrl(id) {
	return request({
		url: `/yifu-insurances/method/insuranceEnclosure/getInsuranceEnclosureUrl/${id}`,
		method: 'GET',
	});
}

/**
 * 电子保单上传
 */
export async function uploadInsuranceEnclosure(data, onUploadProgress) {
	return request({
		url: '/yifu-insurances/method/insuranceEnclosure/uploadInsuranceEnclosure',
		method: 'POST',
		data,
		onUploadProgress,
	});
}
