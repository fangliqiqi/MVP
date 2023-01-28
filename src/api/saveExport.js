import request from '@/utils/request';


/**
 *获取 自定义导出帅筛选的数据
 * @export
 * @param {*} params 用于区分不同的导出：暂定用权限编码
 * @return {*} 
 */
export async function getExportHeads(params) {
  return request({
    url: '/yifu-archives/method/lexcelheadforio/getOwnList/'+params,
    method: 'GET',
  });
}

/**
 *保存自定义导出的表头
 * @export
 * @param {*} params  maxMun 最大数据 
 * @param {*} data  excelHeadText: string; //表头数组字符串 
 *                  name: string; //表头名称  
 *                  remark: string; //备注 
 *                  useCode: string; //权限编码
 * @return {*} 
 */
export async function saveExportHead(params,data) {
  return request({
    url: '/yifu-archives/method/lexcelheadforio',
    method: 'POST',
    params,
    data
  });
}


/**
 *
 *删除自定义导出的表头
 * @export
 * @param {*} params id 
 * @return {*} 
 */
export async function deleteExportHead(params) {
  return request({
    url: '/yifu-archives/method/lexcelheadforio/'+params,
    method: 'DELETE',
  });
}
