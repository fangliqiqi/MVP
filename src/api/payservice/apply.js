import request from '@/utils/request';
/**
 * 申报对象-列表
 * @param {*} params 
 * @returns 
 */
export async function getApplyList(params) {
  return request({
    url: '/yifu-salary/method/tstatisticsdeclarer/page',
    method: 'GET',
    params,
  });
}

/**
 * 申报对象-导出
 * @param {*} data 
 * @returns 
 */
export async function applyExport(data) {
  return request({
    url: '/yifu-salary/method/tstatisticsdeclarer/export',
    method: 'POST',
    responseType: 'blob',
    data,
  });
}
/**
 * 申报对象-删除单条
 * @param {*} params 
 * @returns 
 */
export async function deleteApply(params) {
  return request({
    url: '/yifu-salary/method/tstatisticsdeclarer/updateFlagById',
    method: 'POST',
    params
  });
}
/**
 * 申报对象-批量导入删除
 * @param {*} data 
 * @returns 
 */
export async function batchImportDeleteApply(data) {
  return request({
    url: '/yifu-salary/method/tstatisticsdeclarer/importListDelete',
    method: 'POST',
    data
  });
}