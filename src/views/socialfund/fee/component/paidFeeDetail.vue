<template>
	<el-dialog title="实缴费用详情" v-model="state.isShowDialog" width="1216px" @close="closeDialog" :close-on-click-modal="false">
		<div class="pre-fee-content-container">
			<div class="basic-container section-container">
				<div class="name">{{ state.detail.empName }}</div>

				<el-row style="margin-top: 24px">
					<el-col v-for="item in basicConfig" :key="`basicInfo_${item}`" class="basic-info-item" :span="item.span || 8">
						<template v-if="item.dataIndex">
							<span class="desc-title" v-html="item.title"></span>
							<div class="desc-content">
								<template v-if="item.tooltip">
									<el-tooltip placement="top-start" effect="dark" popper-class="detail-tooltip-popper">
										<template #content>
											<div class="detail-tooltip-container">
												<span v-html="getValue(item.dataIndex)"> </span>
											</div>
										</template>
										<span>{{ getValue(item.dataIndex) }} </span>
									</el-tooltip>
								</template>
								<template v-else>
									<span>{{ getValue(item.dataIndex) }} </span>
								</template>
							</div>
						</template>
					</el-col>
				</el-row>
			</div>

			<div class="section-container">
				<div class="title"><span>社保与公积金明细</span></div>

				<el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
					<el-table-column prop="id" label="" width="140" />
					<el-table-column prop="name" label="类型" />

					<template v-if="state.detail.unitSocialSum !== null && state.detail.personalSocialSum !== null">
						<el-table-column prop="pension" label="养老保险" />
						<el-table-column prop="medical" label="医疗保险" />
						<el-table-column prop="unemployment" label="失业保险" />
						<el-table-column prop="injury" label="工伤保险" />
						<el-table-column prop="birth" label="生育保险" />
						<el-table-column prop="bigailmen" label="大病救助" />
						<el-table-column prop="accrual" label="补缴利息" />
						<el-table-column prop="socialSum" label="社保总计" />
						<el-table-column prop="card" label="社保卡费" />
					</template>

					<template v-if="state.detail.unitProvidentSum !== null && state.detail.personalProvidentSum !== null">
						<el-table-column prop="fund" label="住房公积金" />
					</template>
				</el-table>

				<el-row>
					<el-col class="basic-info-item" :span="12">
						<span style="color: var(--hro-text-gray-color)">单位 </span>
						<div class="desc-content">
							<el-tooltip placement="top-start" effect="dark" popper-class="detail-tooltip-popper">
								<template #content>
									<div class="detail-tooltip-container">
										<span v-html="state.detail.unitName"> </span>
									</div>
								</template>
								<span>{{ state.detail.unitName || EMPTY_PLACEHOLDER }} </span>
							</el-tooltip>
						</div>
					</el-col>

					<el-col class="basic-info-item" :span="12">
						<span style="color: var(--hro-text-gray-color)">项目名称 </span>
						<div class="desc-content">
							<el-tooltip placement="top-start" effect="dark" popper-class="detail-tooltip-popper">
								<template #content>
									<div class="detail-tooltip-container">
										<span v-html="state.detail.settleDomainName"> </span>
									</div>
								</template>
								<span>{{ state.detail.settleDomainName || EMPTY_PLACEHOLDER }} </span>
							</el-tooltip>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</el-dialog>
</template>
<script setup name="estimateFeeDetail">
import { ElMessage } from 'element-plus';
import { getPaidFee } from '/@/api/socialfund/fee';
import { EMPTY_PLACEHOLDER } from '/@/utils/utils';

const state = reactive({
	isShowDialog: false,
	data: {},
	detail: {},
	basicConfig: [
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
		},
		{
			dataIndex: 'socialSecurityNo',
			title: '社保编码',
		},
		{
			dataIndex: 'providentNo',
			title: '公积金编号',
		},
		{
			dataIndex: 'empNo',
			title: '员工编码',
		},
		{
			dataIndex: 'socialHousehold',
			title: '社保户',
			tooltip: true,
		},
		{
			dataIndex: 'providentHousehold',
			title: '公积金户',
			tooltip: true,
		},
	],
});

const basicConfig = computed(() => {
	if(state.detail['socialHousehold']) {
		const social = [
			{
				dataIndex: 'socialPayAddr',
				title: '社保缴纳地',
			},
			{
				dataIndex: 'socialPayMonth',
				title: '社保缴纳月份',
			},
			{
				dataIndex: 'socialCreateMonth',
				title: '社保生成月份',
			},
		]
		return state.basicConfig.concat(social);
	} else if(state.detail['providentHousehold']){
		const provident = [
			{
				dataIndex: 'providentPayAddr',
				title: '公积金缴纳地',
			},
			{
				dataIndex: 'providentPayMonth',
				title: '公积金缴纳月份',
			},
			{
				dataIndex: 'providentCreateMonth',
				title: '公积金生成月份',
			},
		]
		return state.basicConfig.concat(provident);
	} 
});

const getValue = (prop) => {
	return state.detail[prop] || EMPTY_PLACEHOLDER;
};

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
	// console.log('get columnIndex:', columnIndex, ',and rowIndex：', rowIndex);
	if (columnIndex === 0) {
		if (rowIndex % 3 === 0) {
			return {
				rowspan: 3,
				colspan: 1,
			};
		} else {
			return {
				rowspan: 0,
				colspan: 0,
			};
		}
	}
};

const tableData = computed(() => {
	return [
		{
			id: '单位',
			name: '单位基数',
			pension: state.detail.unitPensionSet ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.unitMedicalSet ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.unitUnemploymentSet ?? EMPTY_PLACEHOLDER, // 失业
			injury: state.detail.unitInjurySet ?? EMPTY_PLACEHOLDER, //工伤
			birth: state.detail.unitBirthSet ?? EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.unitBigmailmentSet ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.unitProvidentSet ?? EMPTY_PLACEHOLDER, // 住房公积金
			accrual: EMPTY_PLACEHOLDER,
			card: EMPTY_PLACEHOLDER,
		},
		{
			name: '单位比例',
			pension: state.detail.unitPensionPer ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.unitMedicalPer ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.unitUnemploymentPer ?? EMPTY_PLACEHOLDER, // 失业
			injury: state.detail.unitInjuryPer ?? EMPTY_PLACEHOLDER, //工伤
			birth: state.detail.unitBirthPer ?? EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.unitBigmailmentPer ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.providentPercent ?? EMPTY_PLACEHOLDER, // 住房公积金
			accrual: EMPTY_PLACEHOLDER,
			card: EMPTY_PLACEHOLDER,
		},
		{
			name: '单位金额',
			pension: state.detail.unitPensionMoney ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.unitMedicalMoney ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.unitUnemploymentMoney ?? EMPTY_PLACEHOLDER, // 失业
			injury: state.detail.unitInjuryMoney ?? EMPTY_PLACEHOLDER, //工伤
			birth: state.detail.unitBirthMoney ?? EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.unitBigmailmentMoney ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: state.detail.unitSocialSum ?? EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.unitProvidentSum ?? EMPTY_PLACEHOLDER, // 住房公积金
			accrual: state.detail.companyAccrual ?? EMPTY_PLACEHOLDER,
			card: EMPTY_PLACEHOLDER,
		},
		{
			id: '个人',
			name: '个人基数',
			pension: state.detail.personalPensionSet ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.personalMedicalSet ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.personalUnemploymentSet ?? EMPTY_PLACEHOLDER, // 失业
			injury: EMPTY_PLACEHOLDER, //工伤
			birth: EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.personalBigmailmentSet ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.personalProidentSet ?? EMPTY_PLACEHOLDER, // 住房公积金
			accrual: EMPTY_PLACEHOLDER,
			card: EMPTY_PLACEHOLDER,
		},
		{
			name: '个人比例',
			pension: state.detail.personalPensionPer ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.personalMedicalPer ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.personalUnemploymentPer ?? EMPTY_PLACEHOLDER, // 失业
			injury: EMPTY_PLACEHOLDER, //工伤
			birth: EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.personalBigmailmentPer ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.providentPercent ?? EMPTY_PLACEHOLDER, // 住房公积金
			accrual: EMPTY_PLACEHOLDER,
			card: EMPTY_PLACEHOLDER,
		},
		{
			name: '个人金额',
			pension: state.detail.personalPensionMoney ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.personalMedicalMoney ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.personalUnemploymentMoney ?? EMPTY_PLACEHOLDER, // 失业
			injury: EMPTY_PLACEHOLDER, //工伤
			birth: EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.personalBigmailmentMoney ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: state.detail.socialSecurityPersonalSum ?? EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.personalProvidentSum ?? EMPTY_PLACEHOLDER, // 住房公积金
			accrual: state.detail.personalAccrual ?? EMPTY_PLACEHOLDER,
			card: EMPTY_PLACEHOLDER,
		},
	];
});

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
};

// 打开弹窗
const openDialog = async (data) => {
	state.data = data || {};
	await getDetail(data);
	state.isShowDialog = true;
};

const getDetail = async (data) => {
	try {
		const res = await getPaidFee(data.id);
		if (res && res.code == 200) {
			state.detail = res.data;
		} else {
			ElMessage.error(res.msg || '获取预估费用详情失败');
			closeDialog();
		}
	} catch (e) {
		console.log('get exception:', e);
		ElMessage.error('获取预估费用失败');
		closeDialog();
	}
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/paidFeeDetail.scss">
</style>
