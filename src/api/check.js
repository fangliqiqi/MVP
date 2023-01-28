import request from '@/utils/request';

/**
 *姓名+身份证的校验
 * @export
 * @param {*} params
 */
 export async function checkIdCard(data) {
	return request({
    url: '/yifu-check/method/tcheckidcard/checkSalaryIdCard',
		method: 'POST',
		data,
	});
}
