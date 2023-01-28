<template>
	<div>
		<el-form ref="formRef" size="default" label-width="130px">
			<div class="title">
				<span>基本信息</span>
			</div>
			<el-row style="margin-top: 20px">
				<el-col :span="item.span || span" v-for="(item, index) in DISPATCH_REDUCE_SOCIALFUND_INFO" :key="index">
					<el-form-item :label="item.label">
						<el-tooltip placement="top" :popper-class="`tooltip_${item.span || 6}`" v-if="item.tooltip">
							<template #content> {{ translateData(item, formData, state.dictValues) }}</template>
							<span :class="`tooltip1_${item.span || 6}`">{{ translateData(item, formData, state.dictValues) }}</span>
						</el-tooltip>
						<div v-else-if="item.checkbox" class="checkbox">
							<el-checkbox :model-value="formData[c.key] == 0 ? true : false" v-for="c in item.checkbox" :key="c.key" :label="c.label"></el-checkbox>
						</div>
						<span v-else>{{ translateData(item, formData, state.dictValues) }}</span>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup name="detailReduceSocialOrFund">
import { DISPATCH_REDUCE_SOCIALFUND_INFO, SOCIAIFUND_SOCIAL_TABLE } from '/@/utils/header.js';
import { getDictByItemTypes } from '/@/utils/utils';
import { EMPTY_PLACEHOLDER } from '/@/utils/utils';
import { translateData } from '/@/utils/translate';

const props = defineProps({
	formData: {
		//社保信息
		type: Object,
		default: () => ({}),
	},
	span: {
		type: Number,
		default: 6,
	},
});

const { formData, projectData, contractData, span } = toRefs(props);

const state = reactive({
	dictValues: {}, //字典值
});

// 获取字典数据
const loadInfo = async () => {
	const dictKey = [];

	for (let s in SOCIAIFUND_SOCIAL_TABLE) {
		for (let i in SOCIAIFUND_SOCIAL_TABLE[s]) {
			if (SOCIAIFUND_SOCIAL_TABLE[s][i].dict) {
				dictKey.push(SOCIAIFUND_SOCIAL_TABLE[s][i].dict);
			}
		}
	}
	const datas = [...DISPATCH_REDUCE_SOCIALFUND_INFO];
	// // 获取字典数据
	datas.forEach((item) => {
		if (item.dict) {
			dictKey.push(item.dict);
		}
	});
	const res = await getDictByItemTypes([...new Set(dictKey)]);
	state.dictValues = res || {};
};

onMounted(async () => {
	loadInfo();
});
</script>

<style scoped lang="scss" src="./css/detailReduceSocialOrFund.scss">
</style>
<style>
.checkbox .el-checkbox {
	cursor: default;
}
.checkbox .el-checkbox__input {
	cursor: default !important;
}
.checkbox .el-checkbox__inner:hover {
	border: var(--el-checkbox-input-border);
}
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
