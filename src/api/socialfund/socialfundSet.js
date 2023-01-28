import request from '@/utils/request';

/**
 * 获取社保公积金配置列表
 * @param {*} params
 * @returns
 */
export async function getCardinalConfigList(params) {
	return request({
		url:'/yifu-social/method/sysbasesetinfo/page',
		method: 'get',
		params,
	});
}


/**
 * 获取社保公积金配置
 * @param {*} id  配置ID 
 * @returns 
 */
export async function getCardinalConfig(id) {
	return request({
		url:'/yifu-social/method/sysbasesetinfo/'+id,
		method: 'get',
	});
}


/**
 * 新增社保公积金配置
 * @param {*} data  新增项 
 * @returns 
 */
 export async function addCardinalConfig(data) {
	return request({
		url:'/yifu-social/method/sysbasesetinfo',
		method: 'post',
		data,
	});
}


/**
 * 编辑社保公积金配置
 * @param {*} data  更新项 
 * @returns 
 */
 export async function updateCardinalConfig(data) {
	return request({
		url:'/yifu-social/method/sysbasesetinfo',
		method: 'put',
		data,
	});
}


/**
 * 获取户配置列表
 * @param {*} params
 * @returns
 */
 export async function getHuConfigList(params) {
	return request({
		url:'/yifu-social/method/syshouseholdinfo/page',
		method: 'get',
		params,
	});
}
 
/**
 *新增户配置
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function addHuConfig(data) {
	return request({
		url:'/yifu-social/method/syshouseholdinfo',
		method: 'post',
		data,
	});
}

/**
 *编辑户配置
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function editHuConfig(data) {
	return request({
		url:'/yifu-social/method/syshouseholdinfo',
		method: 'put',
		data,
	});
}

/**
 *户配置详情
 * @export
 * @param {*} id
 * @return {*} 
 */
export async function getHuConfigdetail(id) {
	return request({
		url:'/yifu-social/method/syshouseholdinfo/'+id,
		method: 'get',
	});
}

/**
 *政策配置列表
 * @export
 * @param {*} params
 * @return {*} 
 */
export async function getPolicyConfigList(params) {
	return request({
		url:'/yifu-social/method/tagentconfig/page',
		method: 'get',
		params,
	});
}

/**
 *新增政策配置
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function addPolicyConfig(data) {
	return request({
		url:'/yifu-social/method/tagentconfig',
		method: 'post',
		data,
	});
}

/**
 *编辑政策配置
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function editPolicyConfig(data) {
	return request({
		url:'/yifu-social/method/tagentconfig',
		method: 'put',
		data,
	});
}

/**
 *政策配置详情
 * @export
 * @param {*} id
 * @return {*} 
 */
export async function getPolicyConfigdetail(id) {
	return request({
		url:'/yifu-social/method/tagentconfig/'+id,
		method: 'get',
	});
}

/**
 *删除政策配置
 * @export
 * @param {*} id
 * @return {*} 
 */
export async function delPolicyConfig(id) {
	return request({
		url:'/yifu-social/method/tagentconfig/'+id,
		method: 'DELETE',
	});
}

/**
 *获取预派配置列表
 * @export
 * @param {*} params
 * @return {*} 
 */
export async function getPreConfigList(params) {
	return request({
		url:'/yifu-social/method/tdispatchdayconf/page',
		method: 'get',
		params,
	});
}

/**
 * 启用禁用[social_sysbasesetinfo_enable]
 * @param {id:str,status:int}  params  0.在用 1.终止 2.过期
 * @returns 
 */
export async function disableOrEnableById(params){
	return request({
		url:'/yifu-social/method/sysbasesetinfo/disableOrEnableById',
		method:'POST',
		params,

	})
}

/**
 * 基数配置修改操作日志
 * @param {*} params 
 * @returns 
 */
export async function getConfigLog(params){
	return request({
		url:'/yifu-social/method/tsociallog/page',
		method:'get',
		params,

	})
}

/**
 *
 *获取最新配置数据
 * @export
 * @param {*} params  参数: houseHoldName（户名称） type (类型： 0 社保  1 公积金) 
 * @return {*} 
 */
export async function getNewConfig(params){
	return request({
		url:'/yifu-social/method/sysbasesetinfo/getBaseSetByParam',
		method:'get',
		params,
	})
}