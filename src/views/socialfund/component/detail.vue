<template>
	<div class="edit-staff-page">
		<div class="content">
			<!--审核-->
			<div v-if="state.name === 'socialfund-order-audit'">
				<div class="title">
					<span>审核信息</span>
				</div>

				<el-form
					ref="formRef"
					:model="state.ruleForm"
					:rules="rules"
					size="default"
					label-width="90px"
					style="margin-top: 20px; margin-bottom: 20px"
					:validate-on-rule-change="false"
				>
					<el-row>
						<el-col class="mb20">
							<el-form-item label="审核状态" prop="auditStatus">
								<el-radio-group v-model="state.ruleForm.auditStatus" @change="changeStatus">
									<el-radio label="1">通过</el-radio>
									<el-radio label="2">退回</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>

						<el-col class="mb20" v-if="!isPass">
							<el-form-item label="退回原因" prop="remark">
								<el-select v-model="state.ruleForm.remark" placeholder="请选择" style="width: 100%" filterable clearable>
									<el-option v-for="(item, key) in state.refuseOptions" :label="item" :key="key" :value="item"> {{ item }}</el-option>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col class="mb20">
							<el-form-item label="审核意见" prop="auditRemark">
								<el-input
									v-model="state.ruleForm.auditRemark"
									placeholder="请输入"
									:rows="3"
									type="textarea"
									clearable
									:maxLength="150"
									show-word-limit
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>

			<!--社保办理-->
			<div v-else-if="state.name === 'socialfund-social-conduct'">
				<div class="title">
					<span>办理信息</span>
				</div>

				<el-form
					ref="formRef"
					:model="state.ruleForm"
					:rules="rules"
					size="default"
					label-width="90px"
					style="margin-top: 20px; margin-bottom: 20px"
					:validate-on-rule-change="false"
				>
					<el-row>
						<el-col class="mb20">
							<el-form-item label="办理结果" prop="handleStatus">
								<el-radio-group v-model="state.ruleForm.handleStatus" @change="changeStatus">
									<el-radio label="1">办理成功</el-radio>
									<el-radio label="2">办理失败</el-radio>
								</el-radio-group>
							</el-form-item>

							<el-form-item label="已办事项" v-if="state.type == '0'" prop="alreadySocialType">
								<div class="sociallist">
									<template v-if="!state.ruleForm.alreadySocialType || state.ruleForm.alreadySocialType.length === 0">
										{{ EMPTY_PLACEHOLDER }}
									</template>
									<template v-else>
										<span v-for="item in state.ruleForm.alreadySocialType" :key="item.key" :class="item.status">
											{{ item.label }}
										</span>
									</template>
								</div>
							</el-form-item>
							<el-form-item label="办理事项" prop="socialType">
								<el-checkbox
									v-model="state.checkAll"
									:indeterminate="state.isIndeterminate"
									@change="handleCheckAllChange"
									style="margin-right: 30px"
									v-if="state.type == 0"
									>全选</el-checkbox
								>
								<el-checkbox-group v-model="state.ruleForm.socialType" :disabled="state.type == 1" @change="handleCheckedCitiesChange">
									<el-checkbox v-for="(item, key) in state.socialTypeOptions" :key="key" :label="key">
										{{ item }}
									</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</el-col>

						<el-col v-if="state.ruleForm.handleStatus == 2" class="mb20">
							<el-form-item label="失败类型" prop="remark">
								<el-select v-model="state.ruleForm.remark" style="width: 100%">
									<el-option v-for="(item, key) in state.DICTS['social-conduct-add-reason']" :label="item" :key="key" :value="item">
										{{ item }}</el-option
									>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col class="mb20">
							<el-form-item label="办理意见" prop="auditRemark">
								<el-input
									v-model="state.ruleForm.auditRemark"
									placeholder="请输入"
									:rows="3"
									type="textarea"
									clearable
									:maxLength="150"
									show-word-limit
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>

			<!--公积金办理-->
			<div v-else-if="state.name === 'socialfund-fund-conduct'">
				<div class="title">
					<span>办理信息</span>
				</div>
				<el-form
					ref="formRef"
					:model="state.ruleForm"
					:rules="rules"
					size="default"
					label-width="90px"
					style="margin-top: 20px; margin-bottom: 20px"
					:validate-on-rule-change="false"
				>
					<el-row>
						<el-col class="mb20">
							<el-form-item label="办理结果" prop="handleStatus">
								<el-radio-group v-model="state.ruleForm.handleStatus" @change="changeStatus">
									<el-radio label="1">办理成功</el-radio>
									<el-radio label="2">办理失败</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>

						<el-col class="mb20" v-if="state.ruleForm.handleStatus == 2">
							<el-form-item label="失败类型" prop="remark">
								<el-select v-model="state.ruleForm.remark" placeholder="请选择" style="width: 100%" filterable clearable>
									<el-option v-for="(item, key) in state.DICTS['fund-conduct-add-reason']" :label="item" :key="key" :value="item">
										{{ item }}
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col class="mb20">
							<el-form-item label="办理意见" prop="auditRemark">
								<el-input
									v-model="state.ruleForm.auditRemark"
									placeholder="请输入"
									:rows="3"
									type="textarea"
									clearable
									:maxLength="150"
									show-word-limit
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>

			<el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane v-for="(item, index) in tabs" :key="index" :name="item.name" :label="item.label">
					<!--档案详情-->
					<detail-archives
						v-if="item.name == 'archives'"
						:formData="archivesData"
						:projectData="project"
						:contractData="contract"
						:isDispatch="state.isDispatch"
					></detail-archives>

					<!--社保详情-->
					<detail-social
						v-else-if="item.name == 'social'"
						:formData="socialData"
						:projectData="socialProject"
						:contractData="socialContract"
						:isDispatch="state.isDispatch"
					></detail-social>

					<!--公积金详情-->
					<detail-fund
						v-else-if="item.name == 'fund'"
						:formData="fundData"
						:projectData="fundProject"
						:contractData="fundContract"
						:isDispatch="state.isDispatch"
					></detail-fund>

					<!--派减社保公积金-->
					<detail-reduce-social-or-fund v-else-if="item.name == 'socialOrFund'" :formData="dispatch"> </detail-reduce-social-or-fund>

					<!--调基记录-->
					<detail-record v-else-if="item.name == 'record'" :logSource="logSource"></detail-record>

					<!--流程进展明细-->
					<detail-flow
						v-else-if="item.name == 'flow'"
						:formData="socialData"
						:dispatch="dispatch"
						:flowList="flowList"
						:isDispatch="state.isDispatch"
					></detail-flow>
				</el-tab-pane>
			</el-tabs>
			<div class="operation-container">
				<el-button v-if="state.name === 'socialfund-order-audit'" @click="onAudit" type="primary" style="height: 100%" :loading="state.loading"
					>审 核</el-button
				>

				<el-button
					v-if="state.name === 'socialfund-social-conduct' || state.name === 'socialfund-fund-conduct'"
					@click="onHandle"
					type="primary"
					style="height: 100%"
					:loading="state.loading"
					>办 理</el-button
				>
				<el-button @click="onCancel" style="height: 100%">关 闭</el-button>
			</div>
		</div>
	</div>
</template>

<script setup name="detail">
import { useRoute, useRouter } from 'vue-router';
import { closeCurrentTab, getDictByItemTypes, EMPTY_PLACEHOLDER } from '/@/utils/utils';
import { emitRefresh } from '/@/utils/events';
import detailArchives from './detailArchives.vue';
import detailSocial from './detailSocial.vue';
import detailFund from './detailFund.vue';
import detailRecord from './detailRecord.vue';
import detailFlow from './detailFlow.vue';
import detailReduceSocialOrFund from './detailReduceSocialOrFund.vue';
import { getsocialfundDetail } from '/@/api/socialfund/socialfundSearch';
import { getDispathchInfo, addApplyAudit, addApplyHandle } from '/@/api/socialfund/order';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const formRef = ref(null);

const activeName = ref('archives');

const tabs = computed(() => {
	let result = [
		{
			label: '员工档案',
			name: 'archives',
		},
	];
	switch (state.name) {
		case 'socialfund-social-conduct':
			// 社保办理  0:派增，1:派减
			if (state.dispatch.type == '1') {
				// 派减
				result = [
					{
						label: '社保',
						name: 'socialOrFund',
					},
				];
			} else {
				// 派增
				result.push({
					label: '社保',
					name: 'social',
				});
			}

			break;

		case 'socialfund-fund-conduct':
			// 公积金办理
			if (state.dispatch.type == '1') {
				// 派减
				result = [
					{
						label: '公积金',
						name: 'socialOrFund',
					},
				];
			} else {
				// 派增
				result.push({
					label: '公积金',
					name: 'fund',
				});
			}
			break;

		case 'socialfund-order-apply-detail':
		case 'oreder-manage-socialfund-detail':
		case 'socialfund-order-audit':
		case 'socialfund-order-detail':
			// 派单申请
			if (state.dispatch.type == '1') {
				// 派减
				result = [
					{
						label: '社保/公积金',
						name: 'socialOrFund',
					},
				];
			} else {
				// 派增

				if (state.isSocial) {
					result.push({
						label: '社保',
						name: 'social',
					});
				}

				if (state.isFund) {
					result.push({
						label: '公积金',
						name: 'fund',
					});
				}
			}

			break;

		default:
			if (state.isSocial) {
				result.push({
					label: '社保',
					name: 'social',
				});
			}

			if (state.isFund) {
				result.push({
					label: '公积金',
					name: 'fund',
				});
			}
			result.push({
				label: '调基记录',
				name: 'record',
			});
			break;
	}

	result.push({
		label: '流程进展明细',
		name: 'flow',
	});

	activeName.value = result[0].name;
	return result;
});

const state = reactive({
	archivesData: {}, //员工档案
	socialfundData: {}, //社保公积金信息,这里需要拆开以适配派单模块，可以通过多次赋值保证不影响之前逻辑 add by hfcai on 2022/8/4

	socialData: {}, // 社保信息
	fundData: {}, // 公积金信息
	logSource: [], //调基记录
	flowList: [], //流程进展明细
	socialProject: {}, //社保项目
	fundProject: {}, //公积金项目
	socialContract: {}, //社保合同
	fundContract: {}, //公积金合同
	dispatch: {}, // 派单信息【派单模块】
	name: null, // 当前route的name
	id: null, // 对于模块的id

	project: {}, // 派单模块项目
	contract: {}, // 派单模块合同
	ruleForm: {
		auditStatus: '1',
		handleStatus: '1',
	},
	refuseOptions: {},
	socialTypeOptions: {
		1: '养老',
		2: '医疗',
		3: '失业',
		4: '工伤',
		5: '生育',
		6: '大病',
	}, // 办理事项
	dictKeys: ['dispatch-audit-add-reason', 'social-conduct-add-reason', 'fund-conduct-add-reason'],
	DICTS: {},
	loading: false,
	isSocial: true, //是否显示社保 根据返回字段显示
	isFund: true,
	isDispatch: false, // 是不是派单模块
	type: null, // 0:派增 1：派减
	isIndeterminate: false, //全选框是否半选
	checkAll: false, //全选框是否选中
});

// 全选
const handleCheckAllChange = (val) => {
	state.checkAll = val;
	if (val) {
		state.ruleForm.socialType = Object.keys(state.socialTypeOptions);
	} else {
		state.ruleForm.socialType = [];
	}
	state.isIndeterminate = false;
};

// 单选
const handleCheckedCitiesChange = () => {
	state.isIndeterminate = state.ruleForm.socialType.length > 0 && state.ruleForm.socialType.length < Object.keys(state.socialTypeOptions).length;
	state.checkAll = state.ruleForm.socialType.length === Object.keys(state.socialTypeOptions).length;
};

const changeStatus = () => {
	state.ruleForm.auditRemark = null;
	state.ruleForm.remark = null;
	setTimeout(() => {
		if (formRef.value) formRef.value.clearValidate();
	}, 100);
};

const isPass = computed(() => {
	// 审核通过
	return state.ruleForm.auditStatus == '1'; //  auditStatus:1审核通过 2审核不通过
});

const rules = computed(() => {
	switch (state.name) {
		case 'socialfund-order-audit':
			// 派单审核详情
			if (state.ruleForm.auditStatus == '1') {
				// 审核通过
				return {
					auditStatus: [{ required: true, message: '请选择审核状态' }],
				};
			} else if (state.ruleForm.auditStatus == '2') {
				if (state.ruleForm.remark == '999') {
					return {
						auditStatus: [{ required: true, message: '请选择审核状态' }],
						remark: [{ required: true, message: '请选择退回原因' }],
						auditRemark: [{ required: true, message: '请输入审核意见' }],
					};
				}

				return {
					auditStatus: [{ required: true, message: '请选择审核状态' }],
					remark: [{ required: true, message: '请选择退回原因' }],
				};
			}
			break;
		case 'socialfund-social-conduct':
			//  社保办理
			if (state.ruleForm.handleStatus == '1') {
				// 办理成功
				return {
					handleStatus: [{ required: true, message: '请选择办理结果' }],
					socialType: [{ required: true, message: '请选择办理事项' }],
				};
			} else if (state.ruleForm.handleStatus == '2') {
				if (state.ruleForm.remark == '999') {
					return {
						handleStatus: [{ required: true, message: '请选择办理结果' }],
						socialType: [{ required: true, message: '请选择办理事项' }],
						remark: [{ required: true, message: '请选择失败类型' }],
						auditRemark: [{ required: true, message: '请选择办理意见' }],
					};
				}

				return {
					handleStatus: [{ required: true, message: '请选择办理结果' }],
					socialType: [{ required: true, message: '请选择办理事项' }],
					remark: [{ required: true, message: '请选择失败类型' }],
				};
			}
			break;
		case 'socialfund-fund-conduct':
			// 公积金办理
			if (state.ruleForm.handleStatus == '1') {
				// 办理成功
				return {
					handleStatus: [{ required: true, message: '请选择办理结果' }],
				};
			} else if (state.ruleForm.handleStatus == '2') {
				if (state.ruleForm.remark == '999') {
					return {
						handleStatus: [{ required: true, message: '请选择办理结果' }],
						remark: [{ required: true, message: '请选择失败类型' }],
						auditRemark: [{ required: true, message: '请选择办理意见' }],
					};
				}

				return {
					handleStatus: [{ required: true, message: '请选择办理结果' }],
					remark: [{ required: true, message: '请选择失败类型' }],
				};
			}
			break;
	}

	return {};
});

const {
	archivesData,
	socialData,
	socialfundData,
	fundData,
	logSource,
	flowList,
	socialContract,
	socialProject,
	fundProject,
	fundContract,
	project,
	contract,
	dispatch,
} = toRefs(state);

const handleClick = (tab, event) => {
	// console.log(tab.paneName)
};

// 关闭
const onCancel = () => {
	let path = '/socialfund/socialfundSearch';
	if (state.name === 'socialfund-order-apply-detail') {
		// 派单申请列表
		path = '/socialfund/sendOrder/orderApply';
	} else if (state.name === 'socialfund-order-audit') {
		// 审核页面
		path = '/socialfund/sendOrder/orderAudit';
		emitRefresh(proxy, '/socialfund/sendOrder/orderAudit');
	} else if (state.name === 'socialfund-social-conduct') {
		// 社保办理
		path = '/socialfund/sendOrder/socialConduct';
		emitRefresh(proxy, '/socialfund/sendOrder/socialConduct');
	} else if (state.name === 'socialfund-fund-conduct') {
		// 公积金办理
		path = '/socialfund/sendOrder/fundConduct';
		emitRefresh(proxy, '/socialfund/sendOrder/fundConduct');
	} else if (state.name === 'socialfund-order-detail') {
		// 派单查询
		path = '/socialfund/sendOrder/order';
		emitRefresh(proxy, '/socialfund/sendOrder/order');
	} else if (state.name === 'oreder-manage-socialfund-detail') {
		//订单详情中的详情 从详情页来，到详情页去
		router.back();
		closeCurrentTab(route, proxy); // 关闭当前页
		return;
	}
	router.push({
		path,
		query: {},
	});
	closeCurrentTab(route, proxy); // 关闭当前页
};

// 获取详情
const getDetail = async (id) => {
	try {
		let res = await getsocialfundDetail({ id: id });
		if (res.code == 200) {
			state.archivesData = res.data.employeeInfo;
			// 如果社保信息 是否可补缴canoverPlay=1 （因为后台返回数据的问题，测试要求前端做个处理）
			// 则补缴期限overpayNumber 是否当月haveThisMonth 最新政策latestCardinality  补缴险种 补缴政策payPolicy 值均为空
			const arrOne = ['overpayNumber', 'haveThisMonth', 'latestCardinality', 'payPolicy'];
			const arrtwo = ['insurancePension', 'insuranceMedical', 'insuranceUnemployment', 'insuranceInjury', 'insuranceBirth', 'insuranceBigailment'];
			if (res.data.socialFundInfo.canOverpay == '1') {
				arrOne.map((item) => {
					res.data.socialFundInfo[item] = '';
				});
				arrtwo.map((item) => {
					res.data.socialFundInfo[item] = '1';
				});
			}
			// 公积金逻辑同上 canOverpayFund = 1
			const fundArr = ['overpayNumberFund', 'haveThisMonthFund', 'latestCardinalityFund', 'payPolicyFund'];
			if (res.data.socialFundInfo.canOverpayFund == '1') {
				fundArr.map((item) => {
					res.data.socialFundInfo[item] = '';
				});
			}
			// 如果大病是否补缴为否,则大病周期和缴纳方式为空
			if (res.data.socialFundInfo.isIllness == '1') {
				res.data.socialFundInfo.collectType = '';
				res.data.socialFundInfo.valueType = '';
			}
			// state.socialfundData = res.data.socialFundInfo;

			/**
			 * 重复赋值保证和派单兼容 add by hfcai
			 */
			state.socialData = res.data.socialFundInfo; // 社保信息
			state.fundData = res.data.socialFundInfo; // 公积金信息

			state.socialProject = res.data.socialProject;
			state.socialContract = res.data.socialContract;
			state.fundProject = res.data.fundProject;
			state.fundContract = res.data.fundContract;
			state.logSource = res.data.logList;
			state.flowList = res.data.auditList;

			state.isSocial = res.data.socialFundInfo.socialHousehold ? true : false;
			state.isFund = res.data.socialFundInfo.providentHousehold ? true : false;

			if (state.isSocial) {
				state.archivesData.educationName = res.data.socialContract && res.data.socialContract.educationName;
			} else {
				state.archivesData.educationName = res.data.fundContract && res.data.fundContract.educationName;
			}
			state.isDispatch = false;
		} else {
			ElMessage.error(res.msg || '获取详情失败');
		}
	} catch (error) {
		console.log(error);
		ElMessage.error('获取详情失败');
		onCancel();
	}
};

/**
 * 获取派单申请详情
 */
const getOrderApplyDetail = async (id) => {
	try {
		let res = await getDispathchInfo(id);
		// console.log(res.data);
		if (res.code == 200) {
			state.archivesData = res.data.employee||{};
			if(!res.data.employee){
				ElMessage.error('获取档案信息失败');
			}
			state.archivesData.educationName = res.data.dispatch && res.data.dispatch.educationName;
			const arrOne = ['overpayNumber', 'haveThisMonth', 'latestCardinality', 'payPolicy'];
			const arrtwo = ['insurancePension', 'insuranceMedical', 'insuranceUnemployment', 'insuranceInjury', 'insuranceBirth', 'insuranceBigailment'];
			if (res.data.social && res.data.social.canOverpay == '1') {
				arrOne.map((item) => {
					res.data.social[item] = '';
				});
				arrtwo.map((item) => {
					res.data.social[item] = '1';
				});
			}
			// 公积金逻辑同上 canOverpayFund = 1
			const fundArr = ['overpayNumberFund', 'haveThisMonthFund', 'latestCardinalityFund', 'payPolicyFund'];
			if (res.data.fund && res.data.fund.canOverpay == '1') {
				fundArr.map((item) => {
					res.data.fund[item] = '';
				});
			}
			// 如果大病是否补缴为否,则大病周期和缴纳方式为空
			if (res.data.social && res.data.social.isIllness == '1') {
				res.data.social.collectType = '';
				res.data.social.valueType = '';
			}

			state.socialData = res.data.social; // 社保信息
			state.fundData = res.data.fund; // 公积金信息

			state.project = res.data.project;
			state.contract = res.data.contract;
			state.dispatch = res.data.dispatch; // 派单信息
			state.flowList = res.data.audits;

			if (res.data.dispatch) {
				state.dispatch.socialHousehold = res.data.social && res.data.social.socialHousehold; // 派单流转使用
				state.dispatch.providentHousehold = res.data.fund && res.data.fund.providentHousehold;

				state.dispatch.pensionHandle = res.data.social && res.data.social.pensionHandle;
				state.dispatch.medicalHandle = res.data.social && res.data.social.medicalHandle;
				state.dispatch.unemployHandle = res.data.social && res.data.social.unemployHandle;
				state.dispatch.workInjuryHandle = res.data.social && res.data.social.workInjuryHandle;
				state.dispatch.birthHandle = res.data.social && res.data.social.birthHandle;
				state.dispatch.bigailmentHandle = res.data.social && res.data.social.bigailmentHandle;
			}

			state.isSocial = res.data.social && res.data.social.socialHousehold ? true : false; // 是否有社保
			state.isFund = res.data.fund && res.data.fund.providentHousehold ? true : false; // 是否有公积金
			state.isDispatch = true;
			state.type = state.dispatch && state.dispatch.type; // 0 :派增 1：派减

			// '养老',
			// 	2: '医疗',
			// 	3: '失业',
			// 	4: '工伤',
			// 	5: '生育',
			// 	6: '大病',
			// }, // 办理事项
			const dict = [
				{ label: '养老', key: 'pensionHandle', status: 'wait', value: 1 },
				{ label: '医疗', key: 'medicalHandle', status: 'wait', value: 2 },
				{ label: '失业', key: 'unemployHandle', status: 'wait', value: 3 },
				{ label: '工伤', key: 'workInjuryHandle', status: 'wait', value: 4 },
				{ label: '生育', key: 'birthHandle', status: 'wait', value: 5 },
				{ label: '大病', key: 'bigailmentHandle', status: 'wait', value: 6 },
			];
			if (state.type == 0 && res.data.social) {
				// 派增
				const need = {};
				dict.forEach((item, index) => {
					if (res.data.social[item.key] == 1) {
						item.status = 'succee';
					} else if (res.data.social[item.key] == 0) {
						// 待办理
						need[index + 1] = item.label;
					} else if (res.data.social[item.key] == 2) {
						item.status = 'fail';
					}
				});

				state.ruleForm.alreadySocialType = dict.filter((item) => item.status !== 'wait');
				state.socialTypeOptions = need;
				state.ruleForm.socialType = Object.keys(need);
				state.checkAll = state.ruleForm.socialType.length != 0;
				// 派增，显示已派增
			} else if (state.type == 1 && res.data.social) {
				// 派减
				const target = [];
				const strArraryStatus = res.data.dispatch&&res.data.dispatch.dispatchItem ? res.data.dispatch.dispatchItem.split('、').filter((e) => e != '') : [];
				dict.forEach((item, index) => {
					strArraryStatus.forEach((chileItem, chileIndex) => {
						if (item.label == strArraryStatus[chileIndex]) {
							target.push(item.value + '');
						}
					});
					// if (res.data.social[item.key] == 1) {
					// 	target.push(index + 1 + '');
					// }
				});
				state.ruleForm.socialType = target;
			}

			nextTick(() => {
				if (formRef.value) formRef.value.clearValidate();
			});
		} else {
			ElMessage.error(res.msg || '获取详情失败');
		}
	} catch (error) {
		console.log(error);
		ElMessage.error('获取详情失败');
		onCancel();
	}
};

onMounted(() => {
	// 初始化数据
	const name = route.name; // 当前页面的name
	const id = route.params.id;
	state.name = name;

	state.id = id;
	if (!id) {
		ElMessage.warning('访问路由不合法');
		onCancel();
		return;
	}

	switch (name) {
		case 'socialfund-order-apply-detail':
		case 'oreder-manage-socialfund-detail':
		case 'socialfund-order-audit':
		case 'fund-conduct-add-reason':
		case 'socialfund-social-conduct':
		case 'socialfund-fund-conduct':
		case 'socialfund-order-detail':
			getOrderApplyDetail(id);
			if (name !== 'socialfund-order-apply-detail') {
				loadDict();
			}
			// console.log('派单');
			state.isDispatch = true;
			break;
		default:
			// console.log('详情');
			getDetail(id);
			state.isDispatch = false;
			break;
	}
});

const loadDict = async () => {
	if (state.dictKeys && state.dictKeys.length) {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
			state.refuseOptions = res['dispatch-audit-add-reason'];
		}
	}
};

const onHandle = () => {
	if (formRef.value) {
		formRef.value.validate((valid) => {
			if (valid) {
				state.loading = true;
				let remark = state.ruleForm.auditRemark?state.ruleForm.remark+'-':state.ruleForm.remark;
				let handleRemark = state.ruleForm.auditRemark?state.ruleForm.auditRemark:'';
				let params = {
					typeSub: '1',
					handleStatus: state.ruleForm.handleStatus,
					handleRemark: state.ruleForm.handleStatus == 1?
											state.ruleForm.auditRemark:
											remark+handleRemark,
				};

				if (state.name == 'socialfund-social-conduct') {
					params.typeSub = '0';
					// 社保办理
					params.socialType = state.ruleForm.socialType.join(',');
				} else if (state.name === 'socialfund-fund-conduct') {
					// 公积金办理
					params.typeSub = '1';
				}
			
				addApplyHandle(params,[state.id])
					.then(
						(res) => {
							if (res && res.code == 200 && (!res.data || res.data.length === 0)) {
								ElMessage.success('办理成功');
								onCancel();
							} else if (res.data) {
								ElMessage.error((res.data && res.data.length && res.data[0].message) || '办理失败');
							} else {
								ElMessage.error(res.msg || '办理失败');
							}
						},
						(error) => {
							ElMessage.error((error && error.msg) || '办理失败');
						}
					)
					.finally((res) => {
						state.loading = false;
					});
			}
		});
	}
};

/**
 * 派单审核
 */
const onAudit = () => {
	if (formRef.value) {
		formRef.value.validate((valid) => {
			if (valid) {
				state.loading = true;
				let remark = state.ruleForm.auditRemark?state.ruleForm.remark+'-':state.ruleForm.remark;
				let auditRemark = state.ruleForm.auditRemark?state.ruleForm.auditRemark:'';
				// 校验通过
				const params = {
					// ids: state.id,
					auditStatus: state.ruleForm.auditStatus,
					auditRemark: state.ruleForm.auditStatus == 1 ?
											state.ruleForm.auditRemark:
											remark+auditRemark,
				};
				// console.log(params);
				addApplyAudit(params,[state.id])
					.then(
						(res) => {
							if (res && res.code == 200 && (!res.data || res.data.length === 0)) {
								// 审核成功
								ElMessage.success('审核成功');
								onCancel();
							} else if (res && res.code == 200) {
								ElMessage.error((res.data && res.data.length && res.data[0].message) || '审核失败');
							} else {
								ElMessage.error(res.msg || '审核失败');
							}
						},
						(error) => {
							ElMessage.error((error && error.msg) || '审核失败');
						}
					)
					.finally((res) => {
						state.loading = false;
					});
			}
		});
	}
};
</script>

<style lang="scss" scoped src="./css/detail.scss">
</style>
