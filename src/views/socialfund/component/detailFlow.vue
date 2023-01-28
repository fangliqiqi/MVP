<template>
	<div>
		<el-form ref="formRef" size="default" label-width="120px">
			<el-row style="margin-top: 20px">
				<template v-if="dispatch">
					<!--派单模板-->

					<el-col :span="24" v-if="props.dispatch.status != null">
						<el-form-item label="派单状态">
							{{ translateData(state.dispatchParams.status, props.dispatch, state.dictValues) }}
						</el-form-item>
					</el-col>

					<el-col :span="24" v-if="props.dispatch.socialHousehold">
						<el-form-item label="社保办理状态">
							{{ translateData(state.dispatchParams.socialHandleStatus, props.dispatch, state.dictValues) }}
						</el-form-item>
					</el-col>
					<el-form-item label="" v-if="props.dispatch.socialHousehold">
						<div class="sociallist">
							<span v-for="item in spanList" :key="item.key" :class="item.status">
								{{ item.label }}
							</span>
						</div>
					</el-form-item>
					<el-col :span="24" v-if="props.dispatch.providentHousehold">
						<el-form-item label="公积金办理状态">
							{{ translateData(state.dispatchParams.fundHandleStatus, props.dispatch, state.dictValues) }}
						</el-form-item>
					</el-col>
				</template>

				<template v-else>
					<!--社保公积金模块-->

					<el-col :span="24" v-if="props.formData.socialHousehold">
						<el-form-item label="社保状态">
							{{ translateData(SOCIAIFUND_SOCIAL_INFO[0], props.formData, state.dictValues) }}
						</el-form-item>
					</el-col>
					<el-form-item label="" v-if="props.formData.socialHousehold">
						<div class="sociallist">
							<span v-for="item in spanList" :key="item.key" :class="item.status">
								{{ item.label }}
							</span>
						</div>
					</el-form-item>
					<el-col :span="24" v-if="props.formData.providentHousehold">
						<el-form-item label="公积金状态">
							{{ translateData(SOCIAIFUND_FUND_INFO[0], props.formData, state.dictValues) }}
						</el-form-item>
					</el-col>
				</template>
			</el-row>
		</el-form>
		<div class="title">
			<span>进展明细</span>
			<div class="college-container" @click="triggerCollapse" style="color: var(--el-color-primary); font-weight: 600">
				{{ collapseText }}
				<em :class="`iconfont icon-ic-arrow-down ${state.collapse ? 'isCollapse' : ''}`"> </em>
			</div>
		</div>
		<div class="flowlist" v-if="state.collapse">
			<el-timeline v-if="flowList.length > 0" style="padding-left: 18px; margin-top: 20px">
				<el-timeline-item v-for="(item, index) in flowList" :key="index" :color="item.color" size="large" :icon="item.icon">
					<!-- #f18834 -->
					<div class="check_content">
						<p>{{ item.title }}</p>
						<span><em>操作人：</em>{{ item.auditUser }} {{ item.organName }}</span>
						<span><em>操作时间：</em>{{ item.auditTime }}</span>
					</div>
				</el-timeline-item>
			</el-timeline>
			<empty-view v-else></empty-view>
		</div>
	</div>
</template>

<script setup name="detailArchives">
import { SOCIAIFUND_SOCIAL_INFO, SOCIAIFUND_FUND_INFO, SOCIAIFUND_FUND_TABLE } from '/@/utils/header.js';
import { getDictByItemTypes, EMPTY_PLACEHOLDER } from '/@/utils/utils';
import EmptyView from '/@/components/EmptyView/index.vue';
import { translateData } from '/@/utils/translate';
import { Select, CloseBold, SemiSelect } from '@element-plus/icons-vue';

const icons = reactive({
	select: Select,
	closeBold: CloseBold,
	semiSelect: SemiSelect,
});

const props = defineProps({
	formData: {
		type: Object,
		default: () => {},
	},
	dispatch: Object, // 派单信息
	flowList: {
		type: Array,
		default: () => [],
	},

	isDispatch: Boolean, // 是否是派单类型， add by hfcai
});

const dispatch = computed(() => {
	return props.isDispatch;
}); // 是否是派单模块

const state = reactive({
	dictValues: {}, //字典值
	dictKeys: [
		'social_handle_status', //社保办理状态
		'fund_handle_status', //公积金办理状态
		'dispatch-audit-status',
		'fund-conduct-status',
		'social-conduct-status',
	],

	dispatchParams: {
		// 派单模块使用
		status: { label: '派单状态', key: 'status', dict: 'dispatch-audit-status' },
		socialHandleStatus: { label: '社保办理状态', key: 'socialHandleStatus', dict: 'social-conduct-status' },
		fundHandleStatus: { label: '公积金办理状态', key: 'fundHandleStatus', dict: 'fund-conduct-status' },
	},

	collapse: true, //折叠状态
});
// 六险状态
const spanList = computed(() => {
	const list = [
		{ label: '养老', key: 'pensionHandle', status: 'wait' },
		{ label: '医疗', key: 'medicalHandle', status: 'wait' },
		{ label: '失业', key: 'unemployHandle', status: 'wait' },
		{ label: '工伤', key: 'workInjuryHandle', status: 'wait' },
		{ label: '生育', key: 'birthHandle', status: 'wait' },
		{ label: '大病', key: 'bigailmentHandle', status: 'wait' },
	];

	if (props.isDispatch) {
		// 派单模块
		list.map((item) => {
			item.status = props.dispatch[item.key] == 1 ? 'succee' : props.formData[item.key] == 2 ? 'fail' : 'wait';
			return item;
		});
	} else {
		list.map((item) => {
			item.status = props.formData[item.key] == 1 ? 'succee' : props.formData[item.key] == 2 ? 'fail' : 'wait';
			return item;
		});
	}
	return list;
});

// 审核流程列表
const flowList = computed(() => {
	props.flowList.map((item) => {
		// 0 待审核  1 审核通过 2 审核不通过 3 办理成功  4  办理失败  5 部分办理失败 6派减
		// 在使用组件事，会有警告问题，使用markRaw 包裹起来即可
		if (item.auditStatus == 0 || item.auditStatus == 5) {
			item.color = '#f18834';
			item.icon = markRaw(SemiSelect);
		} else if (item.auditStatus == 1 || item.auditStatus == 3 || item.auditStatus == 6) {
			item.color = '#58BD7D';
			item.icon = markRaw(Select);
		} else {
			item.color = '#E84E4E';
			item.icon = markRaw(CloseBold);
		}
		return item;
	});
	// console.log(props.flowList);
	return props.flowList;
});

const triggerCollapse = () => {
	state.collapse = !state.collapse;
};
const collapseText = computed(() => {
	return state.collapse ? '收起' : '展开';
});

// 获取字典数据
const loadInfo = async () => {
	const res = await getDictByItemTypes(state.dictKeys);
	state.dictValues = res || {};
};

//数据转换
onMounted(async () => {
	loadInfo();
});
</script>

<style scoped lang="scss" src="./css/detailFlow.scss">
</style>
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
</style>
