const menuListModule = {
	namespaced: true,
	state: {
		menuList: [],
	},
	mutations: {
		// 设置菜单
		getMenuList(state, data) {
			state.menuList = data;
		},
		
	},
	actions: {
		async setMenuList({ commit }, data) {
			commit('getMenuList', data);
		},
	},
};

export default menuListModule;
