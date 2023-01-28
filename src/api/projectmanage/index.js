import request from '@/utils/request';
/**
 *结算主体-列表
 * @param {*} params 
 * @returns 
 */
export async function getProjectManageList(params) {
  return request({
    url: '/yifu-archives/method/tsettledomain/page',
		method: 'get',
		params
  });
}
/**
 * 结算主体-x详情
 * @param {*} id 
 * @returns 
 */
export async function getProjectManageDetail(id) {
  return request({
    url: '/yifu-archives/method/tsettledomain/'+id,
    method: 'get',
  });
}

//导出
export async function getExportList(params) {
	return request({
    url: '/yifu-archives/method/tsettledomain/noPage',
		method: 'get',
		params,
	});
}
