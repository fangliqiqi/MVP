import request from '@/utils/request';

/**
 * 获取预派单列表
 * @param {*} params
 * @returns
 */
export async function getpresendorderList(params) {
	return request({
		url:'/yifu-social/method/tpredispatchinfo/page',
		method: 'get',
		params,
	});
}
