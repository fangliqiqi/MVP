<template>
	<el-dialog title="预估费用详情" v-model="state.isShowDialog" width="1216px" @close="closeDialog" :close-on-click-modal="false">
		<div class="pre-fee-content-container">
			<div class="basic-container section-container">
				<div class="name">{{ state.detail.empName }}</div>

				<el-row style="margin-top: 24px">
					<el-col v-for="item in state.basicConfig" :key="`basicInfo_${item}`" class="basic-info-item" :span="item.span || 8">
						<template v-if="item.dataIndex">
							<!-- {{item}} -->
							<span class="desc-title" v-html="item.title"> </span>
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
					<el-table-column prop="id" label="费用承担方" width="140" />
					<el-table-column prop="name" label="类型" />

					<template v-if="state.detail.unitSocialSum !== null && state.detail.personalSocialSum !== null">
						<el-table-column prop="pension" label="养老保险" />
						<el-table-column prop="medical" label="医疗保险" />
						<el-table-column prop="unemployment" label="失业保险" />
						<el-table-column prop="injury" label="工伤保险" />
						<el-table-column prop="birth" label="生育保险" />
						<el-table-column prop="bigailmen" label="大病救助" />
						<el-table-column prop="socialSum" label="社保总计" />
						<el-table-column prop="card" label="社保卡费" />
					</template>

					<template v-if="state.detail.unitFundSum !== null && state.detail.personalFundSum !== null">
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
										<span v-html="state.detail.deptName"> </span>
									</div>
								</template>
								<span>{{ state.detail.deptName || EMPTY_PLACEHOLDER }} </span>
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
import { getForecastInfo } from '/@/api/socialfund/fee';
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
			dataIndex: 'socialPayMonth',
			title: '社保缴纳月份',
		},
		{
			dataIndex: 'socialCreateMonth',
			title: '社保生成月份',
		},
		// { #bug 10652  列表、查询、导出、详情去除的字段：员工编码
		// 	dataIndex: 'empNo',
		// 	title: '员工编码',
		// },
		{
			dataIndex: 'providentPayMonth',
			title: '公积金缴纳月份',
		},
		{
			dataIndex: 'providentCreateMonth',
			title: '公积金生成月份',
		},
		{
			dataIndex: 'dataPush',
			title: '同步状态',
		},
		{
			dataIndex: 'createTime',
			title: '数据生成时间',
		},
	],
});

const getValue = (prop) => {
	let target = state.detail[prop];
	if (prop === 'dataPush') {
		if (target == '0') {
			target = '未同步';
		} else if (target == '1') {
			target = '已同步';
		}
	}
	return target || EMPTY_PLACEHOLDER;
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
			pension: state.detail.unitPensionBase ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.unitMedicalBase ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.unitUnemploymentBase ?? EMPTY_PLACEHOLDER, // 失业
			injury: state.detail.unitInjuryBase ?? EMPTY_PLACEHOLDER, //工伤
			birth: state.detail.unitBirthBase ?? EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.unitBigailmentBase ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.unitFundBase ?? EMPTY_PLACEHOLDER, // 住房公积金
			card: EMPTY_PLACEHOLDER,
		},
		{
			name: '单位比例',
			pension: state.detail.unitPersionPro ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.unitMedicalPro ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.unitUnemploymentPro ?? EMPTY_PLACEHOLDER, // 失业
			injury: state.detail.unitInjuryPro ?? EMPTY_PLACEHOLDER, //工伤
			birth: state.detail.unitBirthPro ?? EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.unitBigailmentPro ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.unitFundProp ?? EMPTY_PLACEHOLDER, // 住房公积金
			card: EMPTY_PLACEHOLDER,
		},
		{
			name: '单位金额',
			pension: state.detail.unitPensionFee ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.unitMedicalFee ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.unitUnemploymentFee ?? EMPTY_PLACEHOLDER, // 失业
			injury: state.detail.unitWorkInjuryFee ?? EMPTY_PLACEHOLDER, //工伤
			birth: state.detail.unitBirthFee ?? EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.unitBitailmentFee ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: state.detail.unitSocialSum ?? EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.unitFundSum ?? EMPTY_PLACEHOLDER, // 住房公积金
			card: EMPTY_PLACEHOLDER,
		},
		{
			id: '个人',
			name: '个人基数',
			pension: state.detail.personalPensionBase ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.personalMedicalBase ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.personalUnemploymentBase ?? EMPTY_PLACEHOLDER, // 失业
			injury: EMPTY_PLACEHOLDER, //工伤
			birth: EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.personalBigailmentBase ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.personalFundBase ?? EMPTY_PLACEHOLDER, // 住房公积金
			card: EMPTY_PLACEHOLDER,
		},
		{
			name: '个人比例',
			pension: state.detail.personalPersionPro ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.personalMedicalPro ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.personalUnemploymentPro ?? EMPTY_PLACEHOLDER, // 失业
			injury: EMPTY_PLACEHOLDER, //工伤
			birth: EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.personalBigailmentPro ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.personalFundProp ?? EMPTY_PLACEHOLDER, // 住房公积金
			card: EMPTY_PLACEHOLDER,
		},
		{
			name: '个人金额',
			pension: state.detail.personalPensionFee ?? EMPTY_PLACEHOLDER, // 养老
			medical: state.detail.personalMedicalFee ?? EMPTY_PLACEHOLDER, // 医疗
			unemployment: state.detail.personalUnemploymentFee ?? EMPTY_PLACEHOLDER, // 失业
			injury: EMPTY_PLACEHOLDER, //工伤
			birth: EMPTY_PLACEHOLDER, // 生育
			bigailmen: state.detail.personalBigailmentFee ?? EMPTY_PLACEHOLDER, // 大病
			socialSum: state.detail.personalSocialSum ?? EMPTY_PLACEHOLDER, // 社保总计
			fund: state.detail.personalFundSum ?? EMPTY_PLACEHOLDER, // 住房公积金
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
		const res = await getForecastInfo(data.id);
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

<style lang="scss" scoped src="./css/estimateFeeDetail.scss">

</style>
