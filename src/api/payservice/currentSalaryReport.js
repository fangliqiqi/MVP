import request from '@/utils/request';
/**
 * 本期薪资申报-列表
 * @param {*} params 
 * @returns 
 */
export async function getCurrentSalaryReportList(params) {
  return request({
    url: '/yifu-salary/method/tstatisticscurrentreport/page',
    method: 'GET',
    params,
  });
}

/**
 * 本期薪资申报-导出
 * @param {*} data 
 * @returns 
 */
export async function currentSalaryReportExport(data) {
  return request({
    url: '/yifu-salary/method/tstatisticscurrentreport/export',
    method: 'POST',
    responseType: 'blob',
    data,
  });
}
/**
 * 本期薪资申报-手动刷新
 * @param {*} params 
 * @returns 
 */
export async function cuerrentSalaryRefresh(params) {
  return request({
    url: '/yifu-salary/method/tstatisticstaxsalary/doRefreshStatisticsTaxAll',
    method: 'POST',
    params
  });
}
/**
 * 本期薪资申报-删除单条
 * @param {*} id 
 * @returns 
 */
export async function deleteCuerrentSalary(id) {
  return request({
    url: '/yifu-salary/method/tstatisticscurrentreport/' + id,
    method: 'delete',
  });
}