<template>
	<div class="order-detail-page">
		<div class="content" v-if="!reloadView">
			<el-tabs v-model="activeName" type="card" class="demo-tabs">
				<el-tab-pane :name="1" label="订单信息"><OrderInfo :id="state.id" @onActionUpdate="onActionUpdate" @fetchOrder="fetchOrder" /></el-tab-pane>
				<el-tab-pane :name="2" label="社保/公积金"><SocialFund @onActionUpdate="onActionUpdate" :orderNo="state.orderNo" /></el-tab-pane>
				<el-tab-pane :name="3" label="商　险"><Insurance @onActionUpdate="onActionUpdate" :orderNo="state.orderNo" /></el-tab-pane>
				<el-tab-pane :name="4" label="薪　酬"><Salary @onActionUpdate="onActionUpdate" :orderNo="state.orderNo" /></el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script setup name="order-detail">
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import Insurance from './components/Insurance.vue';
import OrderInfo from './components/OrderInfo.vue';
import SocialFund from './components/SocialFund.vue';
import Salary from './components/Salary.vue';
import { ElMessage } from 'element-plus';
const store = useStore();
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const activeName = ref(1);

const reloadView = ref(false);

router.beforeResolve((to, from) => {
	if (
		![
			'oreder-manage-handle',
			'oreder-manage-detail',
			'insurance-detail',
			'oreder-manage-socialfund-detail',
			'oreder-manage-payservice-bill-detail',
		].includes(from.name)
	) {
		activeName.value = 1;
		reloadView.value = true;
		setTimeout(() => {
			reloadView.value = false;
		});
	}
});

// created生命周期
provide('disable', route.path.includes('detail'));

const state = reactive({ id: null, orderNo: null });

const fetchOrder = (no) => {
	state.orderNo = no;
};

onMounted(() => {
	// 初始化数据
	const id = route.params.id;
	state.id = id;
	if (!id) {
		ElMessage.warning('访问路由不合法');
		router.back();
		closeCurrentTab(route, proxy); // 关闭当前页
		return;
	}
});

const onActionUpdate = () => {
	store.dispatch('order/updateOrderStateToDo', state.id);
};
</script>

<style lang="scss" scoped  src='./css/Detail.scss'></style>

