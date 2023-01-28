import request from '@/utils/request';


/**
 * 获取社保公积金查询列表
 * @param {*} params
 * @returns
 */
export async function getsocialfundList(params) {
	return request({
		url:'/yifu-social/method/tsocialfundinfo/page',
		method: 'get',
		params,
	});
}

/**
 *获取社保公积金查询详情
 * @param {*} params demo_tsocialfundinfo_get
 * @returns
 */
 export async function getsocialfundDetail(params) {
	return request({
		url:'/yifu-social/method/tsocialfundinfo/getDetailById',
		method: 'post',
		params
	});
}

/**
 *社保公积金查询导出
 * @export
 * @param {*} data
 * @param {*} params
 * @return {*} 
 */
export async function socialfundExport(data,params) {
	return request({
		url:'/yifu-social/method/tsocialfundinfo/export',
		method: 'post',
		responseType: 'blob',
		data,
		params
	});
}

/**
 *社保公积金查询 批量调基
 *
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function socialfundBatchBase(data,params) {
	return request({
		url:'/yifu-social/method/tsocialfundinfo/importListAdd',
		method: 'post',
		data,
		params
	});
}


/**
 *档案中的社保详情
 * @export
 * @param {*} params 获取社保，根据身份证与项目ID
 * @return {*} 
 */
export async function socialDetail(params) {
	return request({
		url:'/yifu-social/method/tsocialinfo/getSocialByIdCardAndDeptId',
		method: 'get',
		params
	});
}

/**
 * 档案中的公积金详情
 * @export
 * @param {*} params 获取公积金，根据身份证与项目ID
 * @return {*} 
 */
export async function fundDetail(params) {
	return request({
		url:'/yifu-social/method/tprovidentfund/getFundByIdCardAndDeptId',
		method: 'get',
		params
	});
}