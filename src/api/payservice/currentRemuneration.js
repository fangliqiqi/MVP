import request from '@/utils/request';
/**
 * 本期稿酬申报-列表
 * @param {*} params 
 * @returns 
 */
export async function getCurrentRemunerationList(params) {
  return request({
    url: '/yifu-salary/method/tstatisticsremuneration/page',
    method: 'GET',
    params,
  });
}

/**
 * 本期稿酬申报-导出
 * @param {*} data 
 * @returns 
 */
export async function currentRemunerationExport(data) {
  return request({
    url: '/yifu-salary/method/tstatisticsremuneration/export',
    method: 'POST',
    responseType: 'blob',
    data,
  });
}
/**
 * 本期稿酬申报-删除单条
 * @param {*} id 
 * @returns 
 */
export async function deleteCurrentRemuneration(id) {
  return request({
    url: '/yifu-salary/method/tstatisticsremuneration/' + id,
    method: 'delete',
  });
}
/**
 * 本期稿酬申报-批量删除
 * @param {*} data 
 * @returns 
 */
export async function deleteBatchRemuneration(params) {
  return request({
    url: '/yifu-salary/method/tstatisticsremuneration/batchDelete',
    method: 'POST',
    params
  });
}
/**
 * 本期稿酬申报-手动刷新
 * @param {*} data 
 * @returns 
 */
 export async function refreshRemuneration(params) {
  return request({
    url: '/yifu-salary/method/tstatisticsremuneration/refreshStatisticsRemuneration',
    method: 'POST',
    params
  });
}