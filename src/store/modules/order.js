import { handleOrder } from '/@/api/order.js';

const orderModule = {
	namespaced: true,
	state: {
		updateTime: null,
	},

	getters: {
		isChangeState: () => state.updateTime,
	},

	mutations: {
		updateState(state, data) {
			state.updateTime = data;
			console.log('更新一下时间', data);
		},
	},
	actions: {
		// 修改办理状态为办理中
		async updateOrderStateToDo({ commit }, id) {
			await handleOrder({ id, status: 1 });
			commit('updateState', new Date());
		},
	},
};

export default orderModule;
