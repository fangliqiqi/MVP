import request from '@/utils/request';

/**
 * 获取客户列表
 * @param {} params 列表请求参数
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
 * 表格列表
 * @param {} params 表格列表请求参数
 * 
 */
 export async function getTableList(params) {
	return request({
		url: '/yifu-archives/method/tcutsomerdatapermisson/page',
		method: 'GET',
		params,
	});
}


/**
 *新增
 * @export
 * @param {*} datga
 */
export async function addProPerssion(data) {
	return request({
		url: '/yifu-archives/method/tcutsomerdatapermisson',
		method: 'POST',
		data,
	});
}
/**
 *启用禁用
 * @export
 * @param {*} data
 */
 export async function disabledAndNotDisabled(data) {
	return request({
		url: '/yifu-archives/method/tcutsomerdatapermisson',
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
		url: '/yifu-archives/method/tcutsomerdatapermisson/' + id,
		method: 'DELETE',
	});
}
//导出
export async function getExportList(data) {
	return request({
		url: '/yifu-archives/method/tcutsomerdatapermisson/getList',
		method: 'POST',
		data,
	});
}


