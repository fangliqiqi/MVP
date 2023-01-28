import request from '@/utils/request';
/**
 * 收入明细-列表
 * @param {*} params 
 * @returns 
 */
export async function incomeSalaryList(params) {
  return request({
    url: '/yifu-social/method/tincome/page',
    method: 'GET',
    params,
  });
}
/**
 * 收入明细-导出
 * @param {*} data 
 * @returns 
 */
export async function incomeSalaryExport(data) {
  return request({
    url: '/yifu-social/method/tincome/export',
    method: 'POST',
    responseType: 'blob',
    data,
  });
}
