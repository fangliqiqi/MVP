import { Local, Session } from '/@/utils/storage';
import { login, logout } from '/@/api/login';
import { encryption } from '/@/utils/utils';
// import { resetRoute } from '/@/router/index';

const userInfosModule = {
	namespaced: true,
	state: {
		userInfos: {},
		token: {},
		permission: [],
	},
	mutations: {
		// 设置字段值
		setFieldsVal(state, payload) {
			state[payload.field] = payload.val;
		},
		// 设置用户信息
		getUserInfos(state, data) {
			state.userInfos = data;
		},
		// 设置token
		setToken(state, data) {
			state.token = data;
		},
	},
	actions: {
		// 登录操作
		async login({ commit }, info) {
			const user = encryption({
				data: info,
				// key: 'thanks,pig4cloud',
				key: 'thanks,yifucloud',
				param: ['password'],
			});
			const res = await login({ username: user.username, password: user.password });
			if (res.code === 200) {
				const token = res.data.oauth2AccessToken;
				Local.set('access_token', token.access_token);
				Local.set('token_type', token.token_type);

				//用户信息
				const user = res.data.user;
				// console.log('用户信息', user);
				const userObj = {
					deptName: user.deptName,
					username: user.username,
					phone: user.phone,
					nickName: user.nickname,
					id: user.id,
					avatar: user.avatar,
					roles: ['common'],
				};

				Local.set('user_info', userObj);
				// console.log('用户信息', userObj);
				const permission = user.authorities && user.authorities.map((item) => item.authority);
				Local.set('user_permission', permission);
				Local.set('user_roles', ['common']);
				commit('setFieldsVal', { field: 'userInfos', val: userObj });
				commit('setFieldsVal', { field: 'permission', val: permission });
				commit('setToken', token.access_token);
				commit('getUserInfos', userObj);

				return Promise.resolve();
			} else {
				return Promise.reject(res.msg);
			}
		},
		// 退出
		async logout({ commit, state }) {
			return new Promise((resolve) => {
				logout()
					.then(() => {
						resolve();
					})
					.catch(() => {
						resolve();
					})
					.finally(() => {
						commit('getUserInfos', {});
						commit('setToken', {});
						Local.clear();
						Session.clear(); // 退出登录后需要清除所有缓存信息
						resolve();
					});
			});
		},
		async setUserInfos({ commit }, data) {
			// console.log('[ data ] >', data)
			if (data) {
				commit('getUserInfos', data);
			} else {
				commit('getUserInfos', Local.get('user_info'));
			}
		},
	},
};

export default userInfosModule;
