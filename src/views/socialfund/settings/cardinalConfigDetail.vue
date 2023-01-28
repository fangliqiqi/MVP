import { editContractFile } from '/@/api/contract';
<template>
	<div class="cardinal-config-detail-container">
		<div class="content">
			<div class="basic-info section-container">
				<div class="title">
					<span>基础信息</span>
				</div>

				<el-row style="margin-top: 24px">
					<el-col v-for="item in basicConfig" :key="`basicInfo_${item}`" class="basic-info-item" :span="item.span || 6">
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
				<div class="title">
					<span>比例配置</span>
					<span style="color: var(--hro-text-gray-color)">（比例配置适用于最高、最低、自定义）</span>
				</div>

				<template v-if="state.name === 'social-config-detail'">
					<!--社保-->
					<el-row style="margin-top: 24px">
						<el-col
							v-for="item in state.socialConfig.ratio"
							:key="`basicInfo_${item}`"
							class="basic-info-item"
							:span="(state.config[item] && state.config[item].span) || 6"
						>
							<template v-if="state.config[item].dataIndex">
								<span class="desc-title" v-html="state.config[item].title"> </span>
								<div class="desc-content">
									<template v-if="state.config[item].tooltip">
										<el-tooltip placement="top-start" effect="dark" popper-class="detail-tooltip-popper">
											<template #content>
												<div class="detail-tooltip-container">
													<span v-html="getValue(item)"> </span>
												</div>
											</template>
											<span>{{ getValue(item) }} </span>
										</el-tooltip>
									</template>
									<template v-else>
										<span>{{ getValue(item) }} </span>
									</template>
								</div>
							</template>
						</el-col>
					</el-row>

					<el-divider></el-divider>
					<el-row>
						<el-col v-for="item in socialillnessConfig" :key="`basicInfo_${item}`" class="basic-info-item" :span="item.span || 6">
							<template v-if="item.dataIndex">
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
				</template>

				<template v-else-if="state.name === 'fund-config-detail'">
					<div class="fund-list-container">
						<template v-if="state.info && state.info.fundProList">
							<el-row v-for="(item, index) in state.info.fundProList" :key="`fundProList-${index}`" class="fund-pro-list-item">
								<el-col :span="6" class="basic-info-item">
									<span class="desc-title"> 单位公积金比例 </span>
									<div class="desc-content">
										<span>{{ item.companyPro + '%' }} </span>
									</div>
								</el-col>

								<el-col :span="6" class="basic-info-item">
									<span class="desc-title"> 个人公积金比例 </span>
									<div class="desc-content">
										<span>{{ item.personalPro + '%' }} </span>
									</div>
								</el-col>
							</el-row>
						</template>
					</div>
				</template>
			</div>

			<div class="section-container">
				<div class="title">
					<span>补缴配置</span>
				</div>

				<el-row style="margin-top: 24px">
					<el-col v-for="item in inBackConfig" :key="`basicInfo_${item}`" class="basic-info-item" :span="item.span || 6">
						<template v-if="item.dataIndex">
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

			<div v-if="state.showLog" class="section-container">
				<div class="title">
					<span>变更日志</span>
				</div>

				<pro-table
					ref="proTableRef"
					row-key="id"
					:columns="state.logColumns"
					:request="requestLogs"
					:showHeader="false"
					customEmpty
					tableExpand
					manualRequest
				>
					<template #empty>
						<div>暂无数据</div>
					</template>
					<template v-slot:expand="item">
						<div class="diff-content" style="margin-left: 50px">
							<div>
								{{ item.updateTime }}由<span style="font-weight: bold"> {{ item.createName }}</span>
							</div>
							<div v-html="getTextInfo(item)"></div>
						</div>
					</template>
				</pro-table>
			</div>
		</div>

		<div class="operation-container">
			<el-button @click="goBack" style="height: 100%">返 回</el-button>
		</div>
	</div>
</template>

<script setup name="cardinalConfigDetail">
import { useRouter, useRoute } from 'vue-router';
import { closeCurrentTab } from '/@/utils/utils';
import { ElMessage, ElMessageBox } from 'element-plus';
import { emitRefresh } from '/@/utils/events';
import { getCardinalConfig, getConfigLog } from '/@/api/socialfund/socialfundSet';
import ProTable from '/@/components/ProTable/ProTable.vue';
import { EMPTY_PLACEHOLDER } from '/@/utils/utils';
import moment from 'moment';
import { idToArea } from '/@/utils/city';

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const proTableRef = ref(null); // 日志列表

const FILTER_LOG_PARAMS = []; // 需要过滤的字段

const getValue = (key, record) => {
	if (!key) {
		return null;
	}
	if (!record) record = state.info;
	const item = state.config[key];
	const val = record[key];
	let target = null;
	if (item.options) {
		return state.DICTS[item.options][val] ?? EMPTY_PLACEHOLDER;
	} else if (item.dateFormat) {
		return val ? moment(val).format(item.dateFormat) : EMPTY_PLACEHOLDER;
	} else if (item.unit) {
		if (val === null || val === undefined || val === '') {
			return EMPTY_PLACEHOLDER;
		}
		return val + item.unit;
	}

	switch (key) {
		case 'socialAddress':
		case 'fundAddress':
			target = idToArea({ province: record.province, city: record.city, town: record.town });
			break;

		case 'socialDepartName':
		case 'fundDepartName':
		case 'departId':
		case 'departName':
			target = record.departName ?? EMPTY_PLACEHOLDER;
			break;

		case 'applyStartDate':
			let start = record.applyStartDate ? moment(record.applyStartDate).format('YYYY-MM-DD') : null;
			let end = record.applyEndDate ? moment(record.applyEndDate).format('YYYY-MM-DD') : '永久';
			target = start + '~' + end;
			break;
		default:
			target = val ?? EMPTY_PLACEHOLDER;
			break;
	}
	return target;
};

const requestLogs = async (params) => {
	try {
		// 1：社保 2：公积金
		const res = await getConfigLog(Object.assign({}, params, { type: state.baseType, mainId: state.id }));
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		}
	} catch (e) {
		console.log('get exception:', e);
	}
	return {
		current: 1,
		total: 0,
		data: [],
	};
};

const getLogDictLabel = (item) => {
	let target = null;
	const base = state.name === 'social-config-detail' ? '社保' : '公积金';
	switch (item) {
		case 'province':
			target = base + '所在省';
			break;

		case 'city':
			target = base + '所在市';
			break;
		case 'town':
			target = base + '所在县';
			break;

		case 'departName':
		case 'departId':
			target = base + '户';
			break;
		default:
			target = state.config[item] ? state.config[item].title : '未知';
			break;
	}
	return target;
};

const getLogDictValue = (item, record) => {
	const target = getValue(item, record);
	console.log('get traget:', target);
	if (target === EMPTY_PLACEHOLDER) {
		return '[空值]';
	}
	return target;
};

const getDiffText = (val) => {
	const a = val.split(',');
	return a
		.filter((t) => !FILTER_LOG_PARAMS.includes(t))
		.map((item) => {
			return getLogDictLabel(item);
		})
		.join(',');
};

const getTextInfo = (val) => {
	const differenceInfo = val.differenceInfo;
	const newInfo = JSON.parse(val.newInfo);
	const oldInfo = JSON.parse(val.oldInfo);
	const a = differenceInfo.split(',');
	return a
		.filter((t) => !FILTER_LOG_PARAMS.includes(t))
		.map((item) => {
			let div = "<div class='diff-item'>";
			const label = getLogDictLabel(item);
			let oldVal = '',
				newVal = '';

			oldVal = getLogDictValue(item, oldInfo);

			if (oldVal == '' || oldVal == null || oldVal == undefined) {
				oldVal = '[空值]';
			}
			newVal = getLogDictValue(item, newInfo);

			if (newVal == '' || newVal == null || newVal == undefined) {
				newVal = '[空值]';
			}
			div += `<span>修改了</span><span style="font-weight:bold;">${label}</span>：<span style="color:var(	--hro-color-text-disabeld);" class='old-value'>${oldVal}</span>  ->  <span class='new-val'>${newVal}</span>`;
			div += '</div>';
			return div;
		})
		.join('');
};

const state = reactive({
	logSource: [],
	showLog: false, // 是否显示操作日志，暂时隐藏
	DICTS: {
		illnesOptions: {
			0: '是',
			1: '否',
		},
		canOverpay: {
			0: '是',
			1: '否',
		},
		insurance: {
			insurancePension: '养老',
			insuranceMedical: '医疗',
			insuranceUnemployment: '失业',
			insuranceInjury: '工伤',
			insuranceBirth: '生育',
			insuranceBigailment: '大病',
		},
		overpayNumber: {
			1: '一个月',
			2: '二个月',
			3: '三个月',
			4: '四个月',
			5: '五个月',
			6: '六个月',
			7: '七个月',
			8: '八个月',
			9: '九个月',
			10: '十个月',
			11: '十一个月',
			12: '十二个月',
		},
		haveThisMonth: {
			0: '是',
			1: '否',
		},

		insuranceIsLatestCardinality: {
			0: '最新基数',
			1: '当期基数',
		},
		fundPayType: {
			0: '市直',
			1: '省直',
		},
		collectType: {
			0: '按年',
			1: '按月',
		},
		isChargePersonal: {
			0: '立即收费',
			1: '次年起收',
		},
		collectMoth: {
			1: '一月',
			2: '二月',
			3: '三月',
			4: '四月',
			5: '五月',
			6: '六月',
			7: '七月',
			8: '八月',
			9: '九月',
			10: '十月',
			11: '十一月',
			12: '十二月',
		},
		fundPayPoint: {
			1: '四舍五入取整',
			2: '元以下舍去',
			3: '见角进元',
			4: '保留两位小数',
			5: '保留一位小数',
		},
		valueType: {
			0: '按定值',
			1: '按比例',
		},
	},

	config: {
		applyStartDate: {
			dataIndex: 'applyStartDate',
			title: '适用周期',
		},
		lowerLimit: {
			dataIndex: 'lowerLimit',
			title: '基数下限',
		},
		upperLimit: {
			dataIndex: 'upperLimit',
			title: '基数上限',
		},
		doMonth: {
			dataIndex: 'doMonth',
			title: '执行月份',
			dateFormat: 'YYYY年MM月',
		},
		unitMedicalPro: {
			dataIndex: 'unitMedicalPro',
			title: '单位医疗比例',
			unit: '%',
		},
		unitPersionPro: {
			dataIndex: 'unitPersionPro',
			title: '单位养老比例',
			unit: '%',
			push: 18,
		},
		unitUnemploymentPro: {
			dataIndex: 'unitUnemploymentPro',
			title: '单位失业比例',
			unit: '%',
		},
		unitInjuryPro: {
			dataIndex: 'unitInjuryPro',
			title: '单位工伤比例',
			unit: '%',
		},
		unitBirthPro: {
			dataIndex: 'unitBirthPro',
			title: '单位生育比例',
			unit: '%',
		},
		unitProSum: {
			dataIndex: 'unitProSum',
			title: '单位比例合计',
			unit: '%',
		},
		personalMedicalPro: {
			dataIndex: 'personalMedicalPro',
			title: '个人医疗比例',
			unit: '%',
		},
		personalPersionPro: {
			dataIndex: 'personalPersionPro',
			title: '个人养老比例',
			unit: '%',
		},
		personalUnemploymentPro: {
			dataIndex: 'personalUnemploymentPro',
			title: '个人失业比例',
			unit: '%',
		},
		personalProSum: {
			dataIndex: 'personalProSum',
			title: '个人比例合计',
			unit: '%',
		},
		canOverpay: {
			dataIndex: 'canOverpay',
			title: '是否可补缴', // 是否可以补缴： 0：是，1：否
			options: 'canOverpay',
		},
		insurance: {
			dataIndex: 'insurance',
			title: '补缴险种',
			tooltip: true,
			// options: 'insurance',
		},
		overpayNumber: {
			dataIndex: 'overpayNumber',
			title: '最大补缴期限',
			options: 'overpayNumber',
		},
		haveThisMonth: {
			dataIndex: 'haveThisMonth',
			title: '是否含起缴当月', // 是否含起缴当月： 0：是，1：否
			options: 'haveThisMonth',
		},
		insuranceIsLatestCardinality: {
			dataIndex: 'insuranceIsLatestCardinality',
			title: '补缴基数',
			options: 'insuranceIsLatestCardinality',
		},
		payPolicy: {
			dataIndex: 'payPolicy',
			title: '补缴政策',
			type: 'textarea',
			span: 12,
			tooltip: true,
		},
		fundPayType: {
			dataIndex: 'fundPayType',
			title: '公积金类型',
			options: 'fundPayType',
		},
		fundDepartName: {
			dataIndex: 'fundDepartName',
			title: '公积金户',
			tooltip: true,
		},
		socialDepartName: {
			dataIndex: 'socialDepartName',
			title: '社保户',
			tooltip: true,
		},
		socialAddress: {
			dataIndex: 'socialAddress',
			title: '社保缴纳地',
		},
		fundAddress: {
			dataIndex: 'fundAddress',
			title: '公积金缴纳地',
			tooltip: true,
		},
		fundPayPoint: {
			dataIndex: 'fundPayPoint',
			title: '单边小数点',
			options: 'fundPayPoint',
		},
		isIllness: {
			dataIndex: 'isIllness',
			title: '大病是否收费',
			options: 'illnesOptions',
		},
		collectType: {
			dataIndex: 'collectType',
			title: '大病缴纳周期',
			options: 'collectType',
		},
		isChargePersonal: {
			dataIndex: 'isChargePersonal',
			title: '收费模式', // 0：立即收费 1：次年起收
			options: 'isChargePersonal',
		},
		collectMoth: {
			dataIndex: 'collectMoth',
			title: '缴纳月份',
			options: 'collectMoth',
		},
		payCompany: {
			dataIndex: 'payCompany',
			title: '单位大病金额',
			unit: '元/年',
		},
		payPersonal: {
			dataIndex: 'payPersonal',
			title: '个人大病金额',
			unit: '元/年',
		},
		valueType: {
			dataIndex: 'valueType',
			title: '缴纳方式',
			options: 'valueType',
		},
		payCompanyPro: {
			dataIndex: 'payCompanyPro',
			title: '单位大病比例',
			type: 'unit-input',
			unit: '%',
		},
		payPersonalPro: {
			dataIndex: 'payPersonalPro',
			title: '个人大病比例',
			type: 'unit-input',
			unit: '%',
		},
		empty: {
			type: 'empty',
			span: 12,
		},
		empty18: {
			type: 'empty',
			span: 18,
		},
	},

	socialConfig: {
		basic: ['socialDepartName', 'socialAddress', 'applyStartDate', 'lowerLimit', 'upperLimit', 'doMonth'],
		ratio: [
			'unitMedicalPro',
			'unitPersionPro',
			'unitUnemploymentPro',
			'unitInjuryPro',
			'unitBirthPro',
			'unitProSum',
			'empty',
			'personalMedicalPro',
			'personalPersionPro',
			'personalUnemploymentPro',
			'personalProSum',
		],
	},
	fundConfig: {
		basic: ['fundDepartName', 'fundPayType', 'fundAddress', 'applyStartDate', 'lowerLimit', 'upperLimit', 'fundPayPoint', 'doMonth'],
	},
	id: null,
	baseType: null, // 用于请求日志用， 1：社保 2：公积金
	info: {},

	logColumns: [
		{
			dataIndex: 'createName',
			title: '操作人',
			minWidth: 80,
		},
		{
			dataIndex: 'updateTime',
			title: '操作时间',
			minWidth: 140,
		},
		{
			dataIndex: 'differenceInfo',
			title: '操作内容',
			minWidth: 160,
			tooltip: true,
			formatter: (row) => {
				if (row.differenceInfo) {
					return getDiffText(row.differenceInfo);
				}
			},
		},
	],
});

watchEffect(() => {
	// if(state.socialConfig.basic)
	
});

/**
 * 基础配置
 */
const basicConfig = computed(() => {
	if (state.name === 'social-config-detail') {
		return state.socialConfig.basic.map((item) => state.config[item]);
	} else if (state.name === 'fund-config-detail') {
		return state.fundConfig.basic.map((item) => state.config[item]);
	}
	return [];
});

/**
 * 补缴配置
 */
const inBackConfig = computed(() => {
	const target = ['canOverpay'];
	if (state.name === 'social-config-detail') {
		// 社保
		if (state.info.canOverpay == 0) {
			// 可以补缴
			target.push(...['insurance', 'overpayNumber', 'haveThisMonth', 'insuranceIsLatestCardinality', 'empty18', 'payPolicy']);
		}
	} else if (state.name === 'fund-config-detail') {
		// 公积金
		if (state.info.canOverpay == 0) {
			// 可以补缴
			target.push(...['overpayNumber', 'haveThisMonth', 'insuranceIsLatestCardinality', 'payPolicy']);
		}
	}
	return target.map((item) => state.config[item]);
});

const socialillnessConfig = computed(() => {
	/**
	 * isIllness 是否大病， 0 是 1 否
	 * collectType 大病缴纳周期， 0.年 1.月【按月不显示收费模式】
	 *
	 */
	const target = ['isIllness'];
	if (state.info.isIllness == 0) {
		// 是大病时才显示后续的填写项
		target.push('collectType');
		target.push('isChargePersonal');

		if (state.info.collectType == 0) {
			// collectType 大病缴纳周期 按年显示缴纳月份 按月显示缴纳方式  0.年 1.月
			const a = ['collectMoth', 'payCompany', 'payPersonal'];
			target.push(...a);
		} else if (state.info.collectType == 1) {
			state.config.payCompany.unit = '元/月';
			state.config.payPersonal.unit = '元/月';
			// 按月
			const b = ['valueType'];
			if (state.info.valueType == 0) {
				// 按定值
				b.push('payCompany');
				b.push('payPersonal');
			} else if (state.info.valueType == 1) {
				// 按比例
				b.push('payCompanyPro');
				b.push('payPersonalPro');
			}
			target.push(...b);
		}
	}
	return target.map((item) => state.config[item]);
});

const goBack = () => {
	try {
		// 返回上一级
		router.push({
			path: '/socialfund/settings/cardinalConfig',
			query: {},
		});
		closeCurrentTab(route, proxy); // 关闭当前页
		emitRefresh(proxy, '/socialfund/settings/cardinalConfig');
	} catch (e) {
		console.log('get exception:', e);
	}
};

onMounted(() => {
	const name = route.name;
	state.name = name;

	if (name === 'social-config-detail' || name === 'fund-config-detail') {
		if (route.params && route.params.id) {
			state.id = route.params.id;
			state.baseType = name === 'social-config-detail' ? 1 : 2;
			getDetail(route.params.id);
		} else {
			ElMessage.warning('访问路由不合法');
			goBack();
		}
	} else {
		ElMessage.warning('访问路由不合法');
		goBack();
	}
});

const getDetail = (id) => {
	getCardinalConfig(id).then(
		(res) => {
			if (res && res.code == 200) {
				state.info = res.data;

				const insurance = [];
				if (res.data.insurancePension == '0') {
					insurance.push('养老');
				}

				if (res.data.insuranceMedical == '0') {
					insurance.push('医疗');
				}

				if (res.data.insuranceUnemployment == '0') {
					insurance.push('失业');
				}
				if (res.data.insuranceInjury == '0') {
					insurance.push('工伤');
				}
				if (res.data.insuranceBirth == '0') {
					insurance.push('生育');
				}

				if (res.data.insuranceBigailment == '0') {
					insurance.push('大病');
				}

				state.info.insurance = insurance.length ? insurance.join('，') : EMPTY_PLACEHOLDER;

				nextTick(() => {
					if (proTableRef.value && state.showLog) proTableRef.value.refresh();
				});
			} else {
				ElMessage.error(res.msg || '获取基数配置详情失败');
				goBack();
			}
		},
		(error) => {
			ElMessage.error((error && error.msg) || '获取基数配置详情失败');
		}
	);
};
</script>

<style lang="scss" scoped src="./css/cardinalConfigDetail.scss">
</style>
