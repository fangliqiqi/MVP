import request from '@/utils/request';
/**
 * 专项扣除-列表
 * @param {*} params 
 * @returns 
 */
export async function getSpeciaDecutionList(params) {
  return request({
    url: '/yifu-salary/method/tspecialdeducationsum/page',
    method: 'GET',
    params,
  });
}

/**
 * 专项扣除-删除单条
 * @param {*} id 
 * @returns 
 */
export async function deleteSpeciaDecution(id) {
  return request({
    url: '/yifu-salary/method/tspecialdeducationsum/' + id,
    method: 'delete',
  });
}
/**
 * 专项扣除-批量删除本月全部扣除专项
 * @param {*} params 
 * @returns 
 */
export async function deleteBatchSpeciaDecution(params) {
  return request({
    url: '/yifu-salary/method/tspecialdeducationsum/doDeleteTSumSpecialDeducationAll',
    method: 'POST',
    params
  });
}
/**
 * 专项扣除-上传导入
 * @param {*} data 
 * @returns 
 */
export async function speciaDecutionUploadSds(data) {
  return request({
    url: '/yifu-salary/method/tspecialdeducationsum/uploadSds',
    method: 'POST',
    data
  });
}
/**
 * 专项扣除-详情查询
 * @param {*} id 
 * @returns 
 */
export async function findSpeciaDecution(id) {
  return request({
    url: '/yifu-salary/method/tspecialdeducationsum/' + id,
    method: 'GET',
  });
}
/**
 * 专项扣除-批量删除查询条数
 * @param {*} params 
 * @returns 
 */
export async function findSpeciaDecutionTotalNum(params) {
  return request({
    url: '/yifu-salary/method/tspecialdeducationsum/getCountOfDeclareTitle',
    method: 'GET',
    params
  });
}