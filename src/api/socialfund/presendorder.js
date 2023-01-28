import request from '@/utils/request';

/**
 * 获取预派单列表
 * @param {*} params
 * @returns
 */
export async function getpresendorderList(params) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/page',
		method: 'get',
		params,
	});
}

/**
 *获取预派单详情
 * @export
 * @param {*} id
 * @return {*}  social_tpredispatchinfo_get
 */
export async function getpresendorderDetail(id) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/'+id,
		method: 'get',
	});
}

/**
 *编辑预派单
 * @export
 * @param {*} 
 * @return {*} social_tpredispatchinfo_edit
 */
export async function editPresendorder(data) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo',
		method: 'put',
		data,
	});
}

/**
 *删除预派单
 * @export
 * @param {*} id
 * @return {*} 
 */
export async function deletePresendorder(id) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/'+id,
		method: 'delete',
	});
}

/**
 *更新预派单是否派单状态
 * @export
 * @param {*} params id dispatchFlag cancelRemark
 * @return {*}  后端要求 post 请求但是是拼接在url 后面
 */
export async function editPreBydispatchFlag(params) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/updateDispatchFlag',
		method: 'post',
		params,
	});
}

/**
 *预派单 资料是否提交
 * @export
 * @param {*} params ids status 
 * @return {*}  后端要求 post 请求但是是拼接在url 后面
 */
export async function editPreByisSubmit(params) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/modifyDataSubmitStatus',
		method: 'post',
		params,
	});
}

/**
 *预派单 单个派单
 * @export
 * @param {*} params id
 * @return {*}  后端要求 post 请求但是是拼接在url 后面
 */
export async function dispatchPreById(params) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/dispatchById',
		method: 'post',
		params,
	});
}

/**
 *预派单 批量派减
 *
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function preBybatchReduce(data) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/analysisJsonStringImportReduce',
		method: 'POST',
		data,
	});
}
/**
 *预派单 批量派增
 *
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function preBybatchAdd(data,params) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/analysisJsonStringImportAdd',
		method: 'POST',
		data,
		params
	});
}

// 获取项目名称
export async function getProjectName(params) {
	return request({
		url: '/yifu-archives/method/tempchangeinfo/getAllDeptPage',
		method: 'get',
		params
	});
	
}
// 获取社保户
export async function getSocialAccount(params) {
	return request({
		url: '/yifu-social/method/syshouseholdinfo/page?delFlag=0&type=0',
		method: 'get',
		params
	});
}
// 获取公积金户
export async function getFundAccount(params) {
	return request({
		url: '/yifu-social/method/syshouseholdinfo/page?delFlag=0&type=1',
		method: 'get',
		params
	});
}

/**
 *
 *预派单 批量更新
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function preBybatchUpdate(data) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/analysisJsonStringUpdate',
		method: 'post',
		data,
	});
}

/**
 *预派单 批量导出
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function preBybatchExport(data,params) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/doexportPreDispatch',
		method: 'post',
		responseType: 'blob',
		params,
		data
	});
}

// 预派单 一键派单
export async function preBybatchDispatch(data) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/oneKeyToDispatch',
		method: 'post',
		data,
	});
}