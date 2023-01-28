import request from '@/utils/request';

/**
 *附件上传
 * @export
 * @param {*} params
 */
 export async function uploadFile(data) {
	return request({
		url: '/yifu-archives/method/fileUpload/ossUploadFile',
		method: 'POST',
		data,
	});
}

/**
 *获取附件
 * @export
 * @param {*} params
 */
 export async function getFile(id) {
	return request({
		url: '/yifu-archives/method/fileUpload/ossFileUrl/'+id,
		method: 'get',
	});
}

/**
 *附件删除
 * @export
 * @param {*} params
 */
 export async function deleteFile(id) {
	return request({
		url: '/yifu-archives/method/fileUpload/ossFileDelete/'+id,
		method: 'DELETE',
	});
}
