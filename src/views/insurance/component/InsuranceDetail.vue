<template>
	<!-- 商业保险详情 -->
	<div class="insurance-detail-body">
		<div class="insure-info">
			<div class="type-title">商险派单</div>
			<el-form size="default" label-width="140px" v-loading="state.loading">
				<el-row :gutter="0">
					<el-col :span="8">
						<el-form-item label="派单类型">
							<tooltip-text :content="fromatDictValue('distributeType', 'distributeType')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="创建人">
							<tooltip-text :content="formatEmptyValue('createName')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="创建时间">
							<tooltip-text :content="formatEmptyValue('createTime')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="派单状态">
							<tooltip-text
								:content="fromatDictValue('distributeStatus', state.info['distributeType'] == 5 ? 'reduceHandleStatus' : 'buyHandleStatus')"
							/>
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="保单是否有效">
							<tooltip-text :content="fromatDictValue('isEffect', 'isEffect')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="出险状态">
							<tooltip-text :content="fromatDictValue('isUse', 'isUse')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="保单是否过期">
							<tooltip-text :content="fromatDictValue('isOverdue', 'isOverdue')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="姓名">
							<tooltip-text :content="formatEmptyValue('empName')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="身份证号">
							<tooltip-text :content="formatEmptyValue('empIdcardNo')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="岗位">
							<tooltip-text :content="formatEmptyValue('post')" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="投保类型">
							<tooltip-text :content="fromatDictValue('buyType', 'buyType')" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="保险公司">
							<tooltip-text :content="formatEmptyValue('insuranceCompanyName')" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="险种">
							<tooltip-text :content="formatEmptyValue('insuranceTypeName')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="购买标准（元）" class="cn_">
							<tooltip-text :content="formatEmptyValue('buyStandard')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="身故或残疾（万元）" class="cn_">
							<tooltip-text :content="formatEmptyValue('dieDisableQuota')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="医疗额度（万元）" class="cn_">
							<tooltip-text :content="formatEmptyValue('medicalQuota')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="计费方式">
							<tooltip-text :content="fromatDictValue('billingType', 'billType')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="购买周期">
							<tooltip-text :content="formatEmptyValue('buyCycle')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="险种费率">
							<tooltip-text :content="formatEmptyValue('rate')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="保单号">
							<tooltip-text :content="formatEmptyValue('policyNo')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="发票号">
							<tooltip-text :content="formatEmptyValue('invoiceNo')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="保单开始日期">
							<tooltip-text :content="formatEmptyValue('policyStart')" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="保单结束日期">
							<tooltip-text :content="formatEmptyValue('policyEnd')" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="保单生效日期">
							<tooltip-text :content="formatEmptyValue('policyEffect')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="商险购买地">
							<tooltip-text :content="formatEmptyValue(['insuranceProvinceName', 'insuranceCityName'])" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="商险办理地">
							<tooltip-text :content="formatEmptyValue(['insuranceHandleProvinceName', 'insuranceHandleCityName'])" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="预估保费（元）" class="cn_">
							<tooltip-text :content="formatEmptyValue('estimatePremium')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="实际保费（元）" class="cn_">
							<tooltip-text :content="formatEmptyValue('actualPremium')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="项目名称">
							<tooltip-text :content="formatEmptyValue('projectName')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="项目编码">
							<tooltip-text :content="formatEmptyValue('deptNo')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="封面抬头">
							<tooltip-text :content="formatEmptyValue('invoiceTitle')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="结算方式">
							<tooltip-text :content="fromatDictValue('settleType', 'settleType')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="结算月份">
							<tooltip-text :content="formatEmptyValue('settleMonth')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="实缴结算状态">
							<tooltip-text :content="formatEmptyValue('actualSettleStatus')" />
						</el-form-item>
					</el-col>

					<el-col :span="8" v-if="state.info['settleType'] == 0">
						<el-form-item label="预估结算状态">
							<tooltip-text :content="formatEmptyValue('estimateSettleStatus')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="费用类型">
							<tooltip-text :content="fromatDictValue('premiumType', 'premiumType')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="投保状态">
							<tooltip-text :content="fromatDictValue('buyHandleStatus', 'buyHandleStatus')" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="备注">
							<tooltip-text :content="formatEmptyValue('remark')" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="附件">{{ formatEmptyValue('enclosure') }}</el-form-item>
					</el-col>
				</el-row>

				<!-- 派单类型为替换或者有被替换信息时 -->
				<el-row v-if="state.info['distributeType'] == 4 || (state.info['coverEmpName'] && state.info['coverEmpIdcardNo'])">
					<el-col :span="8">
						<el-form-item label="被替换人姓名">
							<tooltip-text :content="formatEmptyValue('coverEmpName')" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="被替换人身份证号">
							<tooltip-text :content="formatEmptyValue('coverEmpIdcardNo')" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="被替换人所在项目">
							<tooltip-text :content="formatEmptyValue('coverProjectName')" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="被替换人封面抬头">
							<tooltip-text :content="formatEmptyValue('coverInvoiceTitle')" />
						</el-form-item>
					</el-col>
				</el-row>

				<!-- 派单类型为减员 -->
				<el-row v-if="state.info['distributeType'] == 5">
					<el-col :span="8">
						<el-form-item label="退费金额（元）" class="cn_">
							<tooltip-text :content="formatEmptyValue('surrender')" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="退费结算状态">
							<tooltip-text :content="formatEmptyValue('surrenderSettleStatus')" />
						</el-form-item>
					</el-col>
				</el-row>

				<!-- 有替换数据时 -->
				<el-row v-if="state.info['replaceEmpName'] && state.info['replaceEmpIdcardNo']">
					<el-col :span="24"> <el-divider content-position="left">替换为</el-divider></el-col>
					<el-col :span="8">
						<el-form-item label="姓名">
							<tooltip-text :content="formatEmptyValue('replaceEmpName')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="身份证号">
							<tooltip-text :content="formatEmptyValue('replaceEmpIdcardNo')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="所在项目">
							<tooltip-text :content="formatEmptyValue('replaceProjectName')" />
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="封面抬头">
							<tooltip-text :content="formatEmptyValue('replaceInvoiceTitle')" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :span="24" v-if="state.changeHistoryList">
						<div class="type-title" style="margin-top: 12px">变更历史</div>
						<el-table :data="state.changeHistoryList" style="width: 100%" :header-cell-style="{ 'background-color': '#f7f9fc', color: '#313840' }">
							<el-table-column prop="createName" label="操作人" width="150" />
							<el-table-column prop="createTime" label="操作时间" width="220" />
							<el-table-column label="操作内容" width="480">
								<template #default="scope">
									<div v-html="getTextInfo(scope.row) || '--'"></div>
								</template>
							</el-table-column>
							<el-table-column prop="remark" label="变更原因" />
						</el-table>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="insure-process" v-loading="!state.activities">
			<div class="type-title">流程详情</div>

			<el-timeline v-if="state.activities && state.activities.length">
				<el-timeline-item v-for="item in state.activities" :key="item.id" :icon="Select" color="#58bd7d">
					<h4 class="h4">{{ item.operateDesc }}</h4>
					<p class="p" v-if="item.createName">
						<span class="key">操作人：</span><span class="value">{{ item.createName }}</span>
					</p>
					<p class="p" v-if="item.createTime">
						<span class="key">操作时间：</span><span class="value">{{ item.createTime }}</span>
					</p>
					<p class="p" v-if="item.remark">
						<span class="key">审核意见：</span><span class="value">{{ item.remark }}</span>
					</p>
				</el-timeline-item>
			</el-timeline>
			<el-empty v-else-if="state.activities && state.activities.length == 0" description="暂无流程信息" />
		</div>
	</div>
</template>

<script setup name="InsuranceDetail">
import { getInsuranceDetail, operate } from '/@/api/insurance/custserve.js';
import dict from './dict.js';
import { ElMessage } from 'element-plus';
import { Select } from '@element-plus/icons-vue';
import TooltipText from '/@/components/TooltipText/index.vue';

const route = useRoute();

const state = reactive({
	loading: false,
	info: {},
	activities: null,
	changeHistoryList: null,
});

onMounted(() => {
	if (!route.params.id) {
		// 数据合法性校验不通过
		ElMessage.error('数据合法性校验不通过');
		return;
	}

	state.loading = true;

	getInsuranceDetail(route.params.id)
		.then((res) => {
			state.info = res.data || {};
			state.changeHistoryList = res.data?.operateList || [];
		})
		.finally(() => {
			state.loading = false;
		});

	operate(route.params.id).then((res) => {
		state.activities = res.data || [];
	});
});

const getTextInfo = (val) => {
	const key = {
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		buyType: '保单类型',
	};

	const differenceInfo = val.differenceInfo;
	const newInfo = JSON.parse(val.newInfo);
	const oldInfo = JSON.parse(val.oldInfo);

	return differenceInfo // 遍历差异字段
		.split(',')
		.map((item) => {
			const label = key[item];
			let oldVal = oldInfo[item];
			let newVal = newInfo[item];

			if (item === 'buyType') {
				oldVal = dict['buyType'][oldVal];
				newVal = dict['buyType'][newVal];
			}

			if (oldVal == '' || oldVal == null || oldVal == undefined) {
				oldVal = '[空值]';
			}

			if (newVal == '' || newVal == null || newVal == undefined) {
				newVal = '[空值]';
			}
			return `<div class='diff-item'><span style="font-weight:bold;">"${label}"</span>：<span style="color:var(	--hro-color-text-disabeld);" class='old-value'>旧值为：${oldVal}</span>，<span class='new-val'>新值为：${newVal}</span></div>`;
		})
		.join('');
};

const fromatDictValue = (key, dictKey) => {
	const dValue = dict[dictKey];
	const fValue = formatEmptyValue(key);
	return dValue[fValue] || '--';
};

const formatEmptyValue = (key) => {
	if (Array.isArray(key)) {
		return (
			key.reduce((str, val) => {
				if (str) {
					const _Val = state.info[val] ?? '';
					if (`${_Val}`) {
						return `${str}/${_Val}`;
					} else {
						return `${str}`;
					}
				} else {
					if (state.info[val] === 0) {
						return '0';
					}
					return `${state.info[val] || ''}`;
				}
			}, '') || '--'
		);
	}
	if (state.info[key] === 0) {
		return '0';
	}

	return state.info[key] || '--';
};
</script>

<style lang="scss" scoped src="./css/InsuranceDetail.scss"></style>
<style lang="scss">
@import './css/InsuranceDetail2.scss';
</style>
