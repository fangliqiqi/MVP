import request from '@/utils/request';

/**
 * 派单查询列表
 * @param {*} params
 * @returns
 */
export async function getOrderList(params) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/page',
		method: 'get',
		params,
	});
}

/**
 * 派单查询批量导出
 * @param {*} params
 * @param {*} data
 * @returns
 */
export async function batchExportOrderList(params, data) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/export',
		method: 'POST',
		responseType: 'blob',
		params,
		data,
	});
}

/**
 * 获取派单申请列表
 * @param {*} params
 */
export async function getOrderApplyList(params) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/pageApply',
		method: 'get',
		params,
	});
}

/**
 * 获取派单申请列表 - 订单用
 * @param {*} params
 */
 export async function getApplyListOrder(params) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/pageApplyOrder',
		method: 'get',
		params,
	});
}


/**
 * 删除派单信息 hasPermission('demo_tdispatchinfo_del')
 * @param {*} id  派单id
 * @returns
 */
export async function removeOrderInfo(id) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/' + id,
		method: 'delete',
	});
}

/**
 * 获取派单审核列表
 * @param {*} params
 */
export async function getOrderAuditList(params) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/pageAudit',
		method: 'get',
		params,
	});
}


/**
 * 派单审核列表导出
 * @param {*} params 
 * @param {*} data 
 * @returns 
 */
export async function exportOrderAuditList(params,data) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/auditExport',
		method: 'post',
		responseType: 'blob',
		params,
		data,
	});
}

/**
 * 获取公积金办理列表
 * @param {*} params
 */
export async function getFundConductList(params) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/pageFundHandle',
		method: 'get',
		params,
	});
}

/**
 * 获取社保办理列表
 * @param {*} params
 */
export async function getSocialConductList(params) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/pageSocialHandle',
		method: 'get',
		params,
	});
}

/**
 * 获取派单详情
 * @param {*} id
 */
export async function getDispathchInfo(id) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/getSocialAndFundInfoById',
		method: 'get',
		params: {
			id,
		},
	});
}

/**
 *
 * 派单审核和批量派单审核
 * @param {ids:Array(str),auditStatus:str,auditRemark:str} params
 */
export async function addApplyAudit(params,data) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/addApplyAudit',
		method: 'post',
		params,
		data
	});
}

/**
 * 办理和批量办理
 * @returns {ids:Array(str),typeSub:str,auditStatus:str,auditRemark:str,socialType:str} params
 */
export async function addApplyHandle(params,data) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/addApplyHandle',
		method: 'post',
		params,
		data
	});
}

/**
 * 导出社保花名册 hasPermission('wxhr:tdispatchinfo_doexportSocialRecordRoster')
 * @param { idStr:str,...} params
 */
export async function doexportSocialRecordRoster(params, data) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/doexportSocialRecordRoster',
		method: 'post',
		responseType: 'blob',
		params,
		data,
	});
}

/**
 * 导出公积金变更清册  hasPermission('wxhr:tdispatchinfo_doexportFundRecordChange')
 * @param {idStr:str} params
 * @returns
 */
export async function doexportFundRecordChange(params, data) {
	return request({
		url: '/yifu-social/method/tdispatchinfo/doexportFundRecordChange',
		method: 'post',
		responseType: 'blob',
		params,
		data,
	});
}
