<template>
	<div>
		<el-form ref="formRef" size="default" label-width="80px">
			<el-row style="margin-top: 20px">
				<el-col :span="6">
					<el-form-item label="下单人">{{ state.createName || '--' }}</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="订单日期">{{ state.createTime || '--' }}</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="项目编码">{{ state.deptNo || '--' }}</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="项目名称">{{ state.deptName || '--' }}</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="订单号">{{ state.orderNo || '--' }}</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="客户单位">{{ state.customerName || '--' }}</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="订单状态">{{ state.orderStatusDict[state.orderStatus] || '--' }}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="订单内容">{{ state.orderContent || '--' }}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="原始单据" class="file">
						<template v-if="state.orderEnclosure && state.orderEnclosure.length">
							<p v-for="en in state.orderEnclosure" :key="en.id">
								<a @click="onItemClick(en)">{{ en.enclosureName }}</a>
							</p>
						</template>
						<template v-else>--</template>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="title">
			<span>回复记录</span>
			<div class="college-container" @click="triggerCollapse" style="color: var(--el-color-primary); font-weight: 600">
				{{ collapseText }}
				<em :class="`iconfont icon-ic-arrow-down ${state.collapse ? 'isCollapse' : ''}`"> </em>
			</div>
		</div>
		<div class="flowlist" v-if="state.collapse">
			<ReplyRecord :orderNo="state.orderNo" @onActionUpdate="onActionUpdate"></ReplyRecord>
		</div>
	</div>
</template>

<script setup name="OrderInfo">
import ReplyRecord from './ReplyRecord.vue';
import { ElMessage } from 'element-plus';
import { getDetailById, getEnclosureUrl } from '/@/api/order.js';

const props = defineProps({ id: null });
const emits = defineEmits(['fetchOrder', 'onActionUpdate']);

const store = useStore();

const onActionUpdate = () => {
	emits('onActionUpdate');
};

const state = reactive({
	createName: null,
	createTime: null,
	customerName: null,
	deptName: null,
	deptNo: null,
	orderContent: null,
	orderEnclosure: [],
	orderNo: null,
	orderStatus: null,

	collapse: false, //折叠状态
	orderStatusDict: { 0: '待处理', 1: '处理中', 2: '已办结' },
});

const fetchData = () => {
	getDetailById(props.id)
		.then((res) => {
			if (res.code === 200) {
				const data = res.data || {};
				state.createName = data.createName;
				state.createTime = data.createTime;
				state.customerName = data.customerName;
				state.deptName = data.deptName;
				state.deptNo = data.deptNo;
				state.orderContent = data.orderContent;
				state.orderEnclosure = data.orderEnclosure;
				state.orderNo = data.orderNo;
				state.orderStatus = data.orderStatus;
			} else {
				state.orderNo = null;
			}
		})
		.catch(() => {
			state.orderNo = null;
		});
};

watchEffect(() => {
	if (!props.id) {
		return;
	}
	fetchData();
});

watchEffect(() => {
	emits('fetchOrder', state.orderNo);
});

watch(
	() => store.state.order.updateTime,
	() => {
		if (state.orderStatus == 0) {
			// 如果是待处理的，操作后更新一下
			fetchData();
		}
	}
);

const triggerCollapse = () => {
	state.collapse = !state.collapse;
};
const collapseText = computed(() => {
	return state.collapse ? '收起' : '展开';
});

const onItemClick = (item) => {
	ElMessage.warning('正在下载');
	getEnclosureUrl(item.id).then((res) => {
		const path = (res.data || '').replace(/(http:|https:)/, location.protocol);
		window.open(path, '_blank');
	});
};
</script>

<style scoped lang="scss" src="./css/OrderInfo.scss"></style>
<style>
.flowlist .el-timeline-item__node--large {
	width: 22px !important;
	height: 22px !important;
	left: -6px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.flowlist .el-timeline-item .el-timeline-item__icon {
	font-size: 14px;
}

.file .el-form-item__content {
	display: block;
}
</style>
