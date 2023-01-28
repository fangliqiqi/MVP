import request from '@/utils/request';

/**
 * 获取客户列表
 * @param {} params 客户列表请求参数
 * 
 */
export async function getSysUserList(params) {
	return request({
		url: '/yifu-upms/method/user/getSysUserList',
		method: 'GET',
		params,
	});
}

/**
 * 列表
 * @param {} params 社保公积金审核列表请求参数
 * 
 */
 export async function getTableList(params) {
	return request({
		url: '/yifu-social/method/tsocialfundhouseres/page',
		method: 'GET',
		params,
	});
}


/**
 *新增社保公积金审核权限
 * @export
 * @param {*} datga
 */
export async function addSocialFundPerssion(data) {
	return request({
		url: '/yifu-social/method/tsocialfundhouseres',
		method: 'POST',
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
 *启用禁用
 * @export
 * @param {*} data
 */
 export async function disabledAndNotDisabled(data) {
	return request({
		url: '/yifu-social/method//tsocialfundhouseres',
		method: 'PUT',
		data,
	});
}
/**
 *删除
 * @export
 * @param {*} params
 */
export async function deleteInfo(id) {
	return request({
		url: '/yifu-social/method/tsocialfundhouseres/' + id,
		method: 'DELETE',
	});
}
//导出
export async function getExportList(data) {
	return request({
		url: '/yifu-social/method/tsocialfundhouseres/exportList',
		method: 'POST',
		data,
	});
}


