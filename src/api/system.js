import request from '@/utils/request';

/**
 * 上传附件-企业logo
 * @returns {*}
 */
 export function uploadFile(url,data,params, headers) {
    return request({
      url,
      method:'post',
      data,
      params,
      headers,
      timeout: 60000*15, // 超时时间
    })
  }