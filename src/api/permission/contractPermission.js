
import request from '@/utils/request';

/**
 * 获取员工列表
 * @param {} params 
 */
export async function getUserList(params) {
	return request({
		url: '/yifu-upms/method/user/page',
		method: 'GET',
		params,
	});
}

/**
 * 合同审核权限列表
 * @param {} params 表格列表请求参数
 * 
 */
 export async function getContractPerlist(params) {
	return request({
		url: '/yifu-archives/method/temployeecontractareares/page',
		method: 'GET',
		params,
	});
}


/**
 *新增
 * @export
 * @param {*} datga 权限：temployeecontractareares_add
 */
export async function addContractPer(data) {
	return request({
		url: '/yifu-archives/method/temployeecontractareares',
		method: 'POST',
		data,
	});
}

/**
 * 导出合同审核权限
 * @export 
 * @param {*} data temployeecontractareares-export
 * @return {*} 
 */
export async function exportContractPer(data) {
	return request({
		url: '/yifu-archives/method/temployeecontractareares/export',
		method: 'POST',
		responseType: 'blob',
		data,
	});
}


/**
 *删除合同审核权限
 *
 * @export
 * @param {*} id temployeecontractareares_del
 * @return {*} 
 */
export async function deleteContractPer(id) {
	return request({
		url: '/yifu-archives/method/temployeecontractareares/' + id,
		method: 'DELETE',
	});
}



/**
 *合同审核禁用启用
 * @export 
 * @param {*} data  temployeecontractareares_edit
 */
 export async function updateContractPer(params) {
	return request({
		url: '/yifu-archives/method/temployeecontractareares/updateStatus',
		method: 'PUT',
		params,
	});
}



