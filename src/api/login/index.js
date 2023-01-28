import request,{AUTH_PREFIX} from '/@/utils/request';


/**
 * 用户登录
 * @param params 要传的参数值
 * @returns 返回接口数据
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 */

export async function login(params) {
	return request({
		url: AUTH_PREFIX + '/yifu-auth/method/login',
		method: 'post',
		params,
		headers: {
			// Authorization: 'Basic cGlnOnBpZw==',
			Authorization:'Basic eWlmdS1tdnA6eWlmdS1tdnA='
		},
	});
}


export async function logout(){
	return request({
		url: AUTH_PREFIX +  '/yifu-auth/method/logout',
		method: 'delete',
		headers: {
			Referer:'/login'
		}
	});
}

// 修改密码
export async function updatePassword(data) {
	return request({
		url: '/yifu-upms/method/user/updatePassword',
		method: 'POST',
		data,
	});
}
