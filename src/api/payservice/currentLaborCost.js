import request from '@/utils/request';
/**
 * 本期申报劳务费-列表
 * @param {*} params 
 * @returns 
 */
export async function getCurrentLabortList(params) {
  return request({
    url: '/yifu-salary/method/tstatisticslabor/page',
    method: 'GET',
    params,
  });
}

/**
 * 本期申报劳务费-导出
 * @param {*} data 
 * @returns 
 */
export async function currentLabortyExport(data) {
  return request({
    url: '/yifu-salary/method/tstatisticslabor/export',
    method: 'POST',
    responseType: 'blob',
    data,
  });
}
/**
 * 本期申报劳务费-删除单条
 * @param {*} params 
 * @returns 
 */
export async function deleteCurrentLaborty(id) {
  return request({
    url: '/yifu-salary/method/tstatisticslabor/' + id,
    method: 'delete',
  });
}
/**
 * 本期申报劳务费-批量删除
 * @param {*} params 
 * @returns 
 */
export async function deleteBatchCurrentLaborty(params) {
  return request({
    url: '/yifu-salary/method/tstatisticslabor/batchDelete',
    method: 'POST',
    params
  });
}
/**
 * 本期申报劳务费-手动刷新
 * @param {*} params 
 * @returns 
 */
 
 export async function refreshCurrentLaborty(params) {
  return request({
    url: '/yifu-salary/method/tstatisticslabor/refreshStatisticsLabor',
    method: 'POST',
    params
  });
}