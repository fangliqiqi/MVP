<template>
	<div>
		<el-form ref="formRef" size="default" label-width="160px">
			<div class="title">
				<span>基本信息</span>
			</div>
			<el-row style="margin-top: 20px">
				<el-col :span="item.span || props.span" v-for="(item, index) in SOCIAIFUND_BASIC_INFO" :key="index">
					<el-form-item :label="item.label">
						<el-tooltip placement="top" :popper-class="`tooltip_${item.span || 6}`" v-if="item.tooltip">
							<template #content> {{ translateData(item, props.formData, state.dictValues) }}</template>
							<span :class="`tooltip1_${item.span || 6}`">{{ translateData(item, props.formData, state.dictValues) }}</span>
						</el-tooltip>
						<span v-else>{{ translateData(item, props.formData, state.dictValues) }}</span>
					</el-form-item>
				</el-col>
			</el-row>

			<div v-if="dispatch" class="title" style="margin-top: 20px">
				<span>项目信息</span>
			</div>
			<el-row v-if="dispatch" style="margin-top: 20px">
				<el-col :span="item.span || span" v-for="(item, index) in SOCIAIFUND_PROJECT_INFO" :key="index">
					<el-form-item :label="item.label">
						<el-tooltip placement="top" :popper-class="`tooltip_${item.span || 6}`" v-if="item.tooltip">
							<template #content> {{ translateData(item, projectData, state.dictValues) }}</template>
							<span :class="`tooltip1_${item.span || 6}`">{{ translateData(item, projectData, state.dictValues) }}</span>
						</el-tooltip>
						<span v-else>{{ translateData(item, projectData, state.dictValues) }}</span>
					</el-form-item>
				</el-col>
			</el-row>
			<div v-if="dispatch" class="title">
				<span>合同信息</span>
			</div>
			<el-row v-if="dispatch" style="margin-top: 20px">
				<el-col :span="item.span || span" v-for="(item, index) in SOCIAIFUND_CONTRACT_INFO" :key="index">
					<el-form-item :label="item.label">
						<el-tooltip placement="top" :popper-class="`tooltip_${item.span || 6}`" v-if="item.tooltip">
							<template #content> {{ translateData(item, contractData, state.dictValues) }}</template>
							<span :class="`tooltip1_${item.span || 6}`">{{ translateData(item, contractData, state.dictValues) }}</span>
						</el-tooltip>
						<span v-else>{{ translateData(item, contractData, state.dictValues) }}</span>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup name="detailArchives">
import { SOCIAIFUND_BASIC_INFO, SOCIAIFUND_PROJECT_INFO, SOCIAIFUND_CONTRACT_INFO } from '/@/utils/header.js';
import { getDictByItemTypes } from '/@/utils/utils';
import { translateData } from '/@/utils/translate';

import moment from 'moment';
/**
 * add by hfcai on 2022/8/2
 *
 * 派单模块新增合同、项目部分，设备公积金部分不显示，通过isDispatch控制
 */

const props = defineProps({
	formData: {
		type: Object,
		default: () => ({}),
	},
	span: {
		type: Number,
		default: 6,
	},
	projectData: Object,
	contractData: Object,
	isDispatch: Boolean, // 是否是派单类型， add by hfcai
});

const dispatch = computed(() => {
	return props.isDispatch;
}); // 是否是派单模块

const state = reactive({
	dictValues: {}, //字典值
});

// 获取字典数据
const loadInfo = async () => {
	const dictKey = [];
	// 获取字典数据

	const array = [...SOCIAIFUND_BASIC_INFO, ...SOCIAIFUND_PROJECT_INFO, ...SOCIAIFUND_CONTRACT_INFO];
	array.forEach((item) => {
		if (item.dict) {
			dictKey.push(item.dict);
		}
	});
	const res = await getDictByItemTypes(dictKey);
	state.dictValues = res || {};
};

onMounted(async () => {
	loadInfo();
});
</script>

<style scoped lang="scss" src="./css/detailArchives.scss">
</style>
<style>
.tooltip1_6 {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: inline-block;
}
.tooltip_6 {
	max-width: calc((100vw - 200px) / 6);
}
.tooltip_12 {
	max-width: calc((100vw - 200px) / 3);
}
</style>
