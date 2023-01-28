<template>
	<div>
		<el-form ref="formRef" size="default" label-width="160px">
			<div class="title">
				<span>基本信息</span>
			</div>
			<el-row style="margin-top: 20px">
				<el-col :span="item.span || span" v-for="(item, index) in basicParams" :key="index">
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
			<div class="title">
				<span>当前购买明细</span>
			</div>
			<div style="padding-left:30px">
				<table class="table" aria-describedby="social_detail">
					<tr v-for="(t, key) in SOCIAIFUND_SOCIAL_TABLE" :key="key">
						<td v-for="(item, i) in t" :key="i" :rowspan="item.rowspan || '1'" :colspan="item.colspan || '1'">
							{{ item.label || translateData(item, formData, state.dictValues) }}
						</td>
					</tr>
				</table>
			</div>
			
			<div v-if="!dispatch" class="title" style="margin-top: 20px">
				<span>项目信息</span>
			</div>
			<el-row v-if="!dispatch" style="margin-top: 20px">
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
			<div v-if="!dispatch" class="title">
				<span>合同信息</span>
			</div>
			<el-row v-if="!dispatch" style="margin-top: 20px">
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
import { SOCIAIFUND_SOCIAL_INFO, SOCIAIFUND_SOCIAL_TABLE, SOCIAIFUND_PROJECT_INFO, SOCIAIFUND_CONTRACT_INFO } from '/@/utils/header.js';
import { getDictByItemTypes } from '/@/utils/utils';
import { EMPTY_PLACEHOLDER } from '/@/utils/utils';
import { translateData } from '/@/utils/translate';
/**
 * add by hfcai on 2022/8/2, 添加控制区分社保公积金查询和派单模块
 *
 * 将办理状态、停缴日期改为：派单类型
 */

const props = defineProps({
	formData: {
		//社保信息
		type: Object,
		default: () => ({}),
	},
	projectData: {
		//项目信息
		type: Object,
		default: () => ({}),
	},
	contractData: {
		//合同信息
		type: Object,
		default: () => ({}),
	},
	span: {
		type: Number,
		default: 6,
	},
	isDispatch: Boolean, // 是否是派单类型， add by hfcai
});

const dispatch = computed(() => {
	return props.isDispatch;
}); // 是否是派单模块

/**
 * add by hfcai,作为基本信息的过滤
 */
const basicParams = computed(() => {
	let target = SOCIAIFUND_SOCIAL_INFO;
	if (props.isDispatch) {
		target = SOCIAIFUND_SOCIAL_INFO.map((item) => {
			if (item.key === 'socialStatus' || item.key === 'socialReduceDate') {
				return null;
			}
			const target = { ...item };

			if (item.key === 'firstBuyMonthSocial') {
				target.key = 'firstBuyMonth'; // 首次购买月份
			}

			if (item.key === 'latestCardinality') {
				//  补缴采用最新基数
				target.key = 'insuranceIsLatestCardinality';
			}

			return target;
		}).filter((item) => !!item);
		target.unshift({
			label: '派单类型',
			key: 'dispatchType',
			default: '派增',
		});
	}

	return target;
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
	const datas = [...SOCIAIFUND_CONTRACT_INFO, ...SOCIAIFUND_PROJECT_INFO, ...SOCIAIFUND_SOCIAL_INFO];
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

<style scoped lang="scss" src="./css/detailSocial.scss">
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
