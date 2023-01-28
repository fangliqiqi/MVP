
import request from '@/utils/request';

/**
 * 合同商险权限列表
 * @param {} params 表格列表请求参数
 * 
 */
 export async function getInsurancePerlist(params) {
	return request({
		url: '/yifu-insurances/method/tinsuranceareares/page',
		method: 'GET',
		params,
	});
}




/**
 *新增商险
 * @export
 * @param {*} datga 权限：tinsuranceareares_add
 */
export async function addInsurancePer(data) {
	return request({
		url: '/yifu-insurances/method/tinsuranceareares',
		method: 'POST',
		data,
	});
}


/**
 *导出商险权限
 *
 * @export
 * @param {*} data tinsuranceareares-export
 * @return {*} 
 */
export async function exportInsurancePer(data) {
	return request({
		url: '/yifu-insurances/method/tinsuranceareares/export',
		method: 'POST',
		responseType: 'blob',
		data,
	});
}


/**
 *删除商险权限
 *
 * @export
 * @param {*} id tinsuranceareares_del
 * @return {*} 
 */
export async function deleteInsurancePer(id) {
	return request({
		url: '/yifu-insurances/method/tinsuranceareares/' + id,
		method: 'DELETE',
	});
}



/**
 *启用禁用商险权限
 *
 * @export 
 * @param {*} params tinsuranceareares_edit
 */
 export async function updateInsurancePer(params) {
	return request({
		url: '/yifu-insurances/method/tinsuranceareares/updateStatus',
		method: 'PUT',
		params,
	});
}



