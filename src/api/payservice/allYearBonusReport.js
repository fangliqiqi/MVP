import request from '@/utils/request';
/**
 * 全年一次性奖金-列表
 * @param {*} params 
 * @returns 
 */
export async function getAllYearBonusList(params) {
  return request({
    url: '/yifu-salary/method/tstatisticsbonus/page',
    method: 'GET',
    params,
  });
}

/**
 * 全年一次性奖金--导出
 * @param {*} data 
 * @returns 
 */
export async function allYearBonusExport(data) {
  return request({
    url: '/yifu-salary/method/tstatisticsbonus/export',
    method: 'POST',
    responseType: 'blob',
    data,
  });
}
/**
 *全年一次性奖金-删除单条
 * @param {*} id 
 * @returns 
 */
export async function deleteAllYearBonus(id) {
  return request({
    url: '/yifu-salary/method/tstatisticsbonus/' + id,
    method: 'delete',
  });
}
/**
 * 全年一次性奖金-批量删除
 * @param {*} data 
 * @returns 
 */
export async function batchDeleteAllYearBonus(params) {
  return request({
    url: '/yifu-salary/method/tstatisticsbonus/batchDelete',
    method: 'POST',
    params
  });
}