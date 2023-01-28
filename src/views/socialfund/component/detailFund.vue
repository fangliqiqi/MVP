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
							<template #content> {{ translateData(item, props.formData, state.dictValues) }}</template>
							<span :class="`tooltip1_${item.span || 6}`">{{ translateData(item, props.formData, state.dictValues) }}</span>
						</el-tooltip>
						<span v-else>{{ translateData(item, props.formData, state.dictValues) }}</span>
					</el-form-item>
				</el-col>
			</el-row>
			<div class="title">
				<span>当前购买明细</span>
			</div>
			<div style="padding-left:30px">
				<table class="table" aria-describedby="fund_detail">
					<tr v-for="(t, key) in fundTableParams" :key="key">
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
import { SOCIAIFUND_FUND_INFO, SOCIAIFUND_FUND_TABLE, SOCIAIFUND_PROJECT_INFO, SOCIAIFUND_CONTRACT_INFO } from '/@/utils/header.js';
import { getDictByItemTypes, EMPTY_PLACEHOLDER } from '/@/utils/utils';
import { translateData } from '/@/utils/translate';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();




/**
 * add by hfcai on 2022/8/2, 添加控制区分社保公积金查询和派单模块
 *
 * 将办理状态、停缴日期改为：派单类型
 */

const props = defineProps({
	formData: {
		type: Object,
		default: () => ({}),
	},
	projectData: {
		type: Object,
		default: () => ({}),
	},
	contractData: {
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

const state = reactive({
	formData: {}, //数据
	dictValues: {}, //字典值
	span: 6, //列数
});

/**
 * add by hfcai,作为基本信息的过滤
 */
const basicParams = computed(() => {
	let target = SOCIAIFUND_FUND_INFO;
	if (props.isDispatch) {
		target = SOCIAIFUND_FUND_INFO.filter((item) => item.key !== 'fundStatus' && item.key !== 'fundReduceDate');

		target = SOCIAIFUND_FUND_INFO.map((item) => {
			let target = { ...item };
			switch (item.key) {
				case 'fundStatus':
				case 'fundReduceDate':
					target = null;
					break;
				case 'firstBuyMothFund':
					// 首次购买月份
					target.key = 'firstBuyMonth';
					break;
				case 'upperLimitFund':
					// 上限
					target.key = 'upperLimit';
					break;
				case 'lowerLimitFund':
					// 下限
					target.key = 'lowerLimit';
					break;

				case 'overpayNumberFund':
					// 补缴期限
					target.key = 'overpayNumber';
					break;
				case 'haveThisMonthFund':
					// 是否含当月
					target.key = 'haveThisMonth';
					break;
				case 'latestCardinalityFund':
					// 补缴采用最新基数
					target.key = 'insuranceIsLatestCardinality';
					break;
				case 'payPolicyFund':
					// 公积金补缴政策
					target.key = 'payPolicy';
					break;
				case 'trustRemarkFund':
					// 委托备注
					target.key = 'trustRemark';
					break;
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

const fundTableParams = computed(() => {
	let target = JSON.parse(JSON.stringify(SOCIAIFUND_FUND_TABLE));
	if (!props.isDispatch) {
		// 派单模块
		target.gjijin = [
			{ label: '公积金' },
			{ label: '', key: 'unitProvidengCardinal' },
			{ label: '', key: 'unitProvidentPer' },
			{ label: '', key: 'unitFundSum' },
			{ label: '', key: 'personalProvidentCardinal' },
			{ label: '', key: 'personalProvidentPer' },
			{ label: '', key: 'personalFundSum' },
			{
				label: '',
				key: '',
				formatter: function (row) {
					const unitFundSum = row.unitFundSum ? row.unitFundSum : 0;
					const personalFundSum = row.personalFundSum ? row.personalFundSum : 0;
					return unitFundSum + personalFundSum > 0 ? (unitFundSum + personalFundSum).toFixed(2) : 0;
				},
			},
		];

		target.add = [
			{ label: '汇总' },
			{ label: EMPTY_PLACEHOLDER },
			{ label: EMPTY_PLACEHOLDER },
			{ label: '', key: 'unitFundSum' },
			{ label: EMPTY_PLACEHOLDER },
			{ label: EMPTY_PLACEHOLDER },
			{ label: '', key: 'personalFundSum' },
			{
				label: '',
				key: '',
				formatter: function (row) {
					const unitFundSum = row.unitFundSum ? row.unitFundSum : 0;
					const personalFundSum = row.personalFundSum ? row.personalFundSum : 0;
					return unitFundSum + personalFundSum > 0 ? (unitFundSum + personalFundSum).toFixed(2) : 0;
				},
			},
		];
		return target;
	}else{
		return  SOCIAIFUND_FUND_TABLE;
	}
});


// 获取字典数据
const loadInfo = async () => {
	const dictKey = [];

	for (let s in SOCIAIFUND_FUND_TABLE) {
		for (let i in SOCIAIFUND_FUND_TABLE[s]) {
			if (SOCIAIFUND_FUND_TABLE[s][i].dict) {
				dictKey.push(SOCIAIFUND_FUND_TABLE[s][i].dict);
			}
		}
	}
	const datas = [...SOCIAIFUND_FUND_INFO, ...SOCIAIFUND_PROJECT_INFO, ...SOCIAIFUND_CONTRACT_INFO];
	datas.forEach((item) => {
		if (item.dict) {
			dictKey.push(item.dict);
		}
	});
	const res = await getDictByItemTypes(dictKey);
	state.dictValues = res || {};
};

//数据转换

onMounted(async () => {
	loadInfo();
});
</script>

<style scoped lang="scss" src="./css/detailFund.scss">
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
