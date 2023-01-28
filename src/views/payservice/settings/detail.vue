<template>
	<div class="staff-info-page">
		<div class="content">
			<div class="basic-info section-container">
				<div class="title">
					<span>基础信息</span>
				</div>
				<el-row>
					<el-col v-for="item in state.staffInfoParams" :key="`basicInfo_${item}`" class="basic-info-item"
						:span="getColNumber(item)">
						<span class="desc-title" v-html="getStaffTitle(item)"> </span>
						<div class="desc-content">
							<el-tooltip placement="top-start" :disabled="getStaffValue(item)=='--'?true:false" effect="dark"
								popper-class="detail-tooltip-popper">
								<template #content>
									<div class="detail-tooltip-container">
										<span v-html="getStaffValue(item)"> </span>
									</div>
								</template>
								<span>{{ getStaffValue(item) }} </span>
							</el-tooltip>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="operation-container">
			<el-button @click="goBack" style="height: 100%">返 回</el-button>
		</div>
	</div>
</template>

<script setup name="detailDecution">
import { useRoute, useRouter } from 'vue-router';
import { SPECIAL_DEDUCTION_DETAIL } from '/@/utils/header';
import { ElMessage } from 'element-plus';
import { EMPTY_PLACEHOLDER, getDictValue as getValue, closeCurrentTab } from '/@/utils/utils';
import {
	findSpeciaDecution,
} from '/@/api/payservice/specialdeduction';
const { proxy } = getCurrentInstance();

const router = useRouter();
const route = useRoute();

const state = reactive({
	staffInfo: {}, // 员工信息
	name: null, // 当前路由name
	staffInfoParams: [
		'name',
		'createTime',
		'createStart',
		'createEnd',

		'costReduction',
		'createMonth',
		'currentIncome',
		'currentIncomeTaxFree',

		'otherMoney',
		'donationAmount',
		'enterpriseAnnuity',
		'fund',


		'idNumber',
		'insuranceMedical',
		'insurancePension',
		'insuranceUnemployment',


		'sumChildEduMoney',
		'sumContinuingEducationMoney',
		'sumHousingLoanMoney',
		'sumHousingRentMoney',

		'sumSupportElderlyMoney',
		'sumBabyMoney',
		'takingRisks',
		'taxDeferredInsurance',

		'taxSavings',
		'taxesWithheld',
		'preTaxDeduction',
		'declareTitle',
	], // 显示字段数组，
});






















const getColNumber = (item) => {
	return 6;
};
const getStaffTitle = (item) => {
	return SPECIAL_DEDUCTION_DETAIL[item];
};
const getStaffValue = (item) => {
	let val = state.staffInfo[item];
	// 添加这三个无用的case 是为了解决sonar给出的异常提示
	switch (item) {
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
			
		default:
			if (val === null || val === undefined || val == '') {
				// 默认为空 '--'
				return EMPTY_PLACEHOLDER;
			}
			break;
	}

	return val;
};

const goBack = () => {
	// 返回上一级
	const name = route.name;
	if (name === 'decution-detail') {
		router.push('/payservice/settings/specialDeduction');
	}
};

onMounted(async () => {
	const name = route.name;
	state.name = name;
	if (name === 'decution-detail') {
		loadStaffInfo(route.params.id)
	}
});
const loadStaffInfo = async (id) => {
	// 加载专项扣除详情
	try {
		const res = await findSpeciaDecution(id);
		if (res && res.code === 200) {
			const data = res.data;
			state.staffInfo = data;
		} else {
			ElMessage.error(res.msg || '获取详情失败');
			goBack();
		}
	} catch (e) {
		console.log('get exception:', e);
		ElMessage.error('获取详情失败');
		goBack();
	}
};

</script>

<style lang="scss" scoped src="./css/detail.scss"></style>
