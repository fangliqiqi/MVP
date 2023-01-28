import request from '@/utils/request';
/**
 * 回盘数据-列表
 * @param {*} params 
 * @returns 
 */
export async function getRecodeDataList(params) {
  return request({
    url: '/yifu-salary/method/tstatisticscurrentreportmarket/page',
    method: 'GET',
    params,
  });
}

/**
 * 回盘数据-导入
 * @param {*} data 
 * @returns 
 */
export async function recodeDataImport(data) {
  return request({
    url: '/yifu-salary/method/tstatisticscurrentreportmarket/importListAdd',
    method: 'POST',
    data,
  });
}
/**
 * 回盘数据-批量删除
 * @param {*} params 
 * @returns 
 */
export async function deleteBatchRecodeData(params) {
  return request({
    url: '/yifu-salary/method/tstatisticscurrentreportmarket/doDeleteByDeclareMonth',
    method: 'POST',
    params,
  });
}
/**
 * 回盘数据-删除单条
 * @param {*} id 
 * @returns 
 */
export async function deleteRecodeData(id) {
  return request({
    url: '/yifu-salary/method/tstatisticscurrentreportmarket/' + id,
    method: 'delete',
  });
}