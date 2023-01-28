/*
	员工合同相关接口
*/

import request from '@/utils/request';

/**
 * 获取合同申请列表
 * @param {*} params
 * @returns
 */
export async function getContractApplyList(params) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/applyPage',
		method: 'get',
		params,
	});
}

/**
 *
 *新增员工合同：hasPermission('temployeecontractinfo_add')
 * @export
 * @param {*} auditStatus 审核状态 保存 传0 提交传1
 */
export async function addContractApply(data) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/saveNewContract',
		method: 'POST',
		data,
	});
}

/**
 *
 *修改员工合同：hasPermission('temployeecontractinfo_edit')
 * @export
 * @param {*} data
 * @return {*}
 */
export async function updateContractApply(data) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/updateContract',
		method: 'POST',
		data,
	});
}

/**
 *获取员工合同详情
 *通过id查询
 * @export
 * @param {*} id
 * @return {*}
 */
export async function getContractDetail(id) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/' + id,
		method: 'get',
	});
}

/**
 * 删除员工合同
 * @export
 * @param {*} id ('temployeecontractinfo_del')
 * @return {*}
 */
export async function deleteContractApply(id) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/' + id,
		method: 'DELETE',
	});
}

/**
 * 批量删除员工合同
 * @export
 * @param {*} params ('') temployeecontractinfo_del
 * @return {*}
 */
export async function deleteContractApplyBatch(data) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/batchDeleteContract',
		method: 'DELETE',
		data,
	});
}

/**
 *根据签订类型获取合同列表
 *
 * @export
 * @param {*}  empId，settleDomain,auditStatus 2 ,inUse '0'
 * @return {*}
 */
export async function getContractBySit(data) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/getListByParam',
		method: 'POST',
		data,
	});
}

/**
 *获取审批列表
 *
 * @export
 * @param {*} data
 * @return {*}
 */
export async function getContractAuditList(data) {
	return request({
		url: '/yifu-archives/method/temployeecontractaudit/getContractAuditList',
		method: 'post',
		data,
	});
}

/**
 *合同归档分页列表
 *
 * @export
 * @param {*} params
 * @return {*}
 */
export async function getContractFileList(params) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/filingPage',
		method: 'get',
		params,
	});
}
/**
 *合同归档-归档
 *
 * @export
 * @param {*} data
 */
export async function editContractFile(data) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/filingContract',
		method: 'post',
		data,
	});
}

/**
 * 获取合同审核列表
 * @param {*} params
 * @returns
 */
export async function getContractAuditPageList(params) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/auditPage',
		method: 'get',
		params,
	});
}

/**
 *导出合同审核列表
 *
 * @export
 * @param {*} params employee_export_contract_audit
 * @param {*} data
 * @return {*} 
 */
export async function exportContractAudit(params,data) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/exportAuditContractInfo',
		method: 'POST',
		responseType: 'blob',
		params,
		data,
	});
}


/**
 *合同查询列表-分页
 *
 * @export
 * @param {*} params
 * @return {*}
 */
export async function getContractSearchList(params) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/page',
		method: 'get',
		params,
	});
}

// 员工合同批量导出
export async function exportContract(params, data) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/exportContractInfo',
		method: 'POST',
		responseType: 'blob',
		params,
		data,
	});
}

//员工合同批量导出[合并历史]
export async function exportContractHistory(params, data) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/exportContractInfoHistory',
		method: 'POST',
		responseType: 'blob',
		params,
		data,
	});
}

// 员工合同续签待办
export async function getContractRenewList(params) {
	return request({
		url: '/yifu-archives/method/tempcontractalert/page',
		method: 'get',
		params,
	});
}

// 员工合同续签待办导出
export async function exportContractRenew(data) {
	return request({
		url: '/yifu-archives/method/tempcontractalert/noPage',
		method: 'POST',
		data,
	});
}

/**
 * 合同审核 temployeecontractinfo_audit
 * @param {auditStatus:str,auditRemark:str} data   auditStatus 2审核通过；3审核不通过
 * @returns
 */
export async function auditContract(data) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/auditContract',
		method: 'post',
		data,
	});
}

/**
 * 合同批量审核 temployeecontractinfo_audit
 * @param {auditStatus:str,auditRemark:str} data   auditStatus 2审核通过；3审核不通过
 * @returns
 */
 export async function batchCheckContract(data) {
	return request({
		url: '/yifu-archives/method/temployeecontractinfo/auditContractBatch',
		method: 'post',
		data,
	});
}


