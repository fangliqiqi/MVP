<template>
	<div class="cardinal-config-detail-container">
		<div class="content">
			<el-form
				ref="formRef"
				:key="state.formKey"
				:model="state.ruleForm"
				:rules="rules"
				size="default"
				label-width="128px"
				:validate-on-rule-change="false"
			>
				<div v-if="basicConfig && basicConfig.length">
					<div class="title">
						<span>基础配置</span>
					</div>
					<el-row style="margin-top: 24px">
						<el-col v-for="item in basicConfig" :key="item.dataIndex" :span="item.span || 6">
							<el-form-item :label="item.title" :prop="item.dataIndex" v-if="item.type !== 'button'" >
								<form-component
									v-model="state.ruleForm[item.dataIndex]"
									:disabled="item.disabled"
									@current-change="changeAddress"
									@on-change="(val) => onChange(item, val)"
									:options="item.options ? state.DICTS[item.options] : []"
									:onLoad="item.onLoad || null"
									:type="item.type"
									:props="item.props"
									:request="item.request"
									:value-key="item.valueKey"
									:search="item.search"
									:placeholder="item.placeholder"
									:title="item.titleKey"
									:date-type="item.dateType"
									:date-format="item.dateFormat"
									:ext="item.ext"
									:value-format="item.valueFormat"
									:disabled-date="item.disabledDate"
									:value-type="item.valueType"
									:max-length="item.maxLength"
								>
								</form-component>
							</el-form-item>
							<!-- 添加一个按钮 带出最近配置-->
							<el-button 
								v-else
								type="primary" 
								size="default"  
								style="margin-left:20px"
								:loading="item.loading"
								:disabled="newDisabled"
								@click="getNewCondig(item)"
							>{{item.title}}</el-button>
						</el-col>
					</el-row>
				</div>

				<template v-if="state.name === 'social-config-add' || state.name === 'social-config-edit'">
					<!--社保-->
					<div class="title">
						<span>比例配置</span>
						<span style="color: var(--hro-text-gray-color)">（比例配置适用于最高、最低、自定义）</span>
					</div>
					<el-row style="margin-top: 24px">
						<el-col v-for="item in state.socialConfig.ratio" :key="item.dataIndex" :span="item.span || 6">
							<template v-if="item.type === 'divider'">
								<el-divider></el-divider>
							</template>

							<el-form-item v-else-if="item.type !== 'empty'" :label="item.title" :prop="item.dataIndex">
								<form-component
									v-model="state.ruleForm[item.dataIndex]"
									:disabled="item.disabled"
									@current-change="changeAddress"
									:options="item.options ? state.DICTS[item.options] : []"
									:onLoad="item.onLoad || null"
									:type="item.type"
									:props="item.props"
									:request="item.request"
									:value-key="item.valueKey"
									:placeholder="item.placeholder"
									:search="item.search"
									:title="item.titleKey"
									:date-type="item.dateType"
									:date-format="item.dateFormat"
									:unit="item.unit"
									:value-type="item.valueType"
									:maxLength="item.maxLength"
									@on-change="(val) => onChange(item, val)"
								>
								</form-component>
							</el-form-item>
						</el-col>

						<!--大病模块配置-->
						<el-col v-for="item in socialillnessConfig" :key="item.dataIndex" :span="item.span || 6" :offset="item.offset || 0">
							<el-form-item :label="item.title" :prop="item.dataIndex">
								<form-component
									v-model="state.ruleForm[item.dataIndex]"
									:disabled="item.disabled"
									@current-change="changeAddress"
									:options="item.options ? state.DICTS[item.options] : []"
									:onLoad="item.onLoad || null"
									:type="item.type"
									:props="item.props"
									:placeholder="item.placeholder"
									:request="item.request"
									:value-key="item.valueKey"
									:search="item.search"
									:title="item.titleKey"
									:date-type="item.dateType"
									:date-format="item.dateFormat"
									:unit="item.unit"
									:maxLength="item.maxLength"
									:value-type="item.valueType"
									@on-change="(val) => onChange(item, val)"
								>
								</form-component>
							</el-form-item>
						</el-col>
					</el-row>
				</template>

				<template v-else-if="state.name === 'fund-config-add' || state.name === 'fund-config-edit'">
					<!--公積金-->
					<div class="title" style="position: relative">
						<span>比例配置</span>
						<span style="color: var(--hro-text-gray-color)">（比例配置适用于最高、最低、自定义）</span>
					</div>

					<div class="fund-list-container">
						<el-button type="primary" @click="addFormList" class="fund-add-btn">
							<svg-icon :name="`iconfont icon-ic_edit_add`" />新增比例配置
						</el-button>

						<el-row v-for="(item, index) in state.ruleForm.fundProList" :key="`fundProList-${index}`" class="fund-pro-list-item">
							<el-col :span="6">
								<el-form-item label="单位公积金比例" :prop="`fundProList.${index}.companyPro`" :rules="state.fundPayCompanyRule">
									<form-component
										type="unit-input"
										unit="%"
										v-model="state.ruleForm.fundProList[index].companyPro"
										:maxLength="item.maxLength"
										:value-type="item.valueType"
									/>
								</el-form-item>
							</el-col>

							<el-col :span="6">
								<el-form-item label="个人公积金比例" :prop="`fundProList.${index}.personalPro`" :rules="state.fundPayPersonalRule">
									<form-component
										type="unit-input"
										unit="%"
										v-model="state.ruleForm.fundProList[index].personalPro"
										:maxLength="item.maxLength"
										:value-type="item.valueType"
									/>
								</el-form-item>
							</el-col>

							<el-col v-if="index > 0" :span="12" style="position: relative">
								<div style="position: absolute; right: 20px"><svg-icon :name="`iconfont icon-ic_edit_delete`" @click="deleteFormList(index)" /></div>
							</el-col>
						</el-row>
					</div>
				</template>

				<div v-if="inBackConfig && inBackConfig.length">
					<div class="title">
						<span>补缴配置</span>
					</div>
					<el-row style="margin-top: 24px">
						<el-col v-for="item in inBackConfig" :key="item.dataIndex" :span="item.span || 6" :offset="item.offset || 0">
							<template v-if="item.type === 'divider'">
								<el-divider></el-divider>
							</template>
							<el-form-item v-else-if="item.type !== 'empty'" :label="item.title" :prop="item.dataIndex">
								<form-component
									v-model="state.ruleForm[item.dataIndex]"
									:disabled="item.disabled"
									@current-change="changeAddress"
									:options="item.options ? state.DICTS[item.options] : []"
									:onLoad="item.onLoad || null"
									:type="item.type"
									:props="item.props"
									:request="item.request"
									:value-key="item.valueKey"
									:search="item.search"
									:title="item.titleKey"
									:date-type="item.dateType"
									:date-format="item.dateFormat"
									:multiple="item.multiple"
									:maxLength="item.maxLength"
									:value-type="item.valueType"
								>
								</form-component>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-form>
		</div>

		<div class="operation-container">
			<el-button @click="goVerifyBack" size="default" style="height: 100%">返 回</el-button>
			<el-button type="primary" size="default" @click="onSubmit" :loading="state.loading" style="height: 100%">保 存</el-button>
		</div>
	</div>
</template>

<script setup name="cardinalConfigDetail">
/**
 * tips: 2022/7/20 18:30 测试反馈去除编辑功能，当前编辑还存在数据带入问题未解决，若需要放开需考虑改内容时间成本
 */
import { getDictByItemTypes, EMPTY_PLACEHOLDER, getDictValue as getValue, closeCurrentTab } from '/@/utils/utils';
import { loadNode, idToArea, getAreaJson } from '/@/utils/city';
import { getHuConfigList, getCardinalConfig, addCardinalConfig, updateCardinalConfig ,getNewConfig} from '/@/api/socialfund/socialfundSet';
import FormComponent from '/@/components/FormComponent/index.vue';
import SvgIcon from '/@/components/svgIcon/index.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { emitRefresh } from '/@/utils/events';
import moment from 'moment';
import { diffRangeDate } from '/@/utils/formatTime';

const { proxy } = getCurrentInstance();

const router = useRouter();
const route = useRoute();
const formRef = ref(null);

const addFormList = (index) => {
	state.ruleForm.fundProList.push({
		companyPro: null,
		personalPro: null,
	});
};
const deleteFormList = (index) => {
	state.ruleForm.fundProList.splice(index, 1);
};

// 
const onChange = (item, val) => {
	//清空配置
	if(item.dataIndex === 'departId'&&!val){
		//重置检验规则
		formRef.value.resetFields();
		setDefalut()
	}

	if (item.dataIndex === 'departId') {
	
		state.ruleForm.departName = val.name;
		// 需要带出社保缴纳地
		state.ruleForm.province = val.province;
		state.ruleForm.city = val.city;
		state.ruleForm.town = val.town;
		state.ruleForm.address = idToArea({ province: val.province, city: val.city, town: val.town });
	} else if (item.dataIndex === 'applyStartDate') {
		// 选择起始月份，带出执行月份
		state.ruleForm.doMonth = moment(val).format('YYYYMM');
	} else if (item.dataIndex === 'upperLimit') {
		nextTick(() => {
			if (formRef.value) {
				formRef.value.validateField(['lowerLimit']);
			}
		});
	} else if (item.dataIndex === 'lowerLimit') {
		nextTick(() => {
			if (formRef.value) {
				formRef.value.validateField(['upperLimit']);
			}
		});
	}
};

const loadArea = (node, resolve) => {
	const level = node.level;
	const isLeaf = node.isLeaf;
	if (level === 0) {
		const data = loadNode(0);
		resolve(data);
	} else if (isLeaf) {
		return resolve([]);
	} else {
		return resolve(loadNode(node.data.id));
	}

	return resolve([]);
};
// 最近配置按钮禁用
const newDisabled  = computed(()=>{
	return state.ruleForm.departName?false:true;
})

// 带出最近配置
const getNewCondig = (item)=>{
	const data = {
		houseHoldName:state.ruleForm.departName,
		type:item.query.type
	}
	item.loading = true;
	getNewConfig(data).then(res=>{
		if(res.code==200&&res.data){
			state.ruleForm = res.data;
			
			delete state.ruleForm.id;
			delete state.ruleForm.createTime;
			delete state.ruleForm.updateTime;
			delete state.ruleForm.createBy;
			delete state.ruleForm.updateBy;
			delete state.ruleForm.createName;
			
			if(state.ruleForm.fundProList&&state.ruleForm.fundProList.length>0){
				state.ruleForm.fundProList.map(f=>{
					delete f.id;
					delete f.createTime;
					delete f.updateTime;
					delete f.createBy;
					delete f.updateBy;
					delete f.createName;
					delete f.sysBaseSetId;
				})
			}
			state.ruleForm.collectMoth = res.data.collectMoth?res.data.collectMoth.toString():''
			state.ruleForm.overpayNumber = res.data.overpayNumber?res.data.overpayNumber.toString():''
			// 如果是公积金 才带出
			state.ruleForm.fundPayType =  state.name === 'fund-config-add'?res.data.fundPayType.toString():'' // 公积金类型
			state.ruleForm.fundPayPoint = res.data.fundPayPoint?res.data.fundPayPoint.toString():''; // 公积金单边小数点
			state.ruleForm.address = idToArea({ province: res.data.province, city: res.data.city, town: res.data.town });
			state.ruleForm.insurance = [];
			if(res.data.insurancePension == 0){
				state.ruleForm.insurance.push('insurancePension')
			}
			if(res.data.insuranceMedical == 0){
				state.ruleForm.insurance.push('insuranceMedical')
			}
			if(res.data.insuranceUnemployment == 0){
				state.ruleForm.insurance.push('insuranceUnemployment')
			}
			if(res.data.insuranceInjury == 0){
				state.ruleForm.insurance.push('insuranceInjury')
			}
			if(res.data.insuranceBirth == 0){
				state.ruleForm.insurance.push('insuranceBirth')
			}
			if(res.data.insuranceBigailment == 0){
				state.ruleForm.insurance.push('insuranceBigailment')
			}
		}else{
			ElMessage.error(res.msg||'无最新配置,请手动添加数据');
		}
	}).catch(err=>{
		console.log('get exception:', err);
		ElMessage.error('获取最新配置失败');
	}).finally(()=>{
		item.loading = false;
	})
};

const requestHu = async (params) => {
	try {
		const res = await getHuConfigList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		} else {
			ElMessage.error(res.msg);
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

const goVerifyBack = () => {
	ElMessageBox.confirm('返回后，信息将不会保留，是否确定？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			goBack();
		})
		.catch(() => {});
};

const goBack = () => {
	state.loading = false;
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

/**
 * 基数上限校验
 */
const validateUpperLimit = (rule, value, callback) => {
	try {
		if (!value) {
			callback();
			return false;
		}
		if (!new RegExp(/((^[1-9]\d*)|^0)(\.\d{1,2})?$/).test(value)) {
			// 数字验证
			callback(new Error('基数上限大于0，且最多不可超过两位小数！'));
			return false;
		}

		if (state.ruleForm.lowerLimit) {
			let lowerLimit = state.ruleForm.lowerLimit * 1;
			if (value * 1 <= lowerLimit && lowerLimit >= 0) {
				callback('基数上限需大于基数下限！');
				return false;
			}
		}

		callback();
	} catch (exception) {
		console.log('get exception:', exception);
	}
};

/**
 *
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const validateLowerLimit = (rule, value, callback) => {
	try {
		if (!value) {
			callback();
			return false;
		}
		if (!new RegExp(/((^[1-9]\d*)|^0)(\.\d{1,2})?$/).test(value)) {
			// 数字验证
			callback(new Error('基数下限大于0，且最多不可超过两位小数！'));
			return false;
		}
		if (state.ruleForm.upperLimit) {
			let upperLimit = state.ruleForm.upperLimit * 1;
			if (value * 1 >= upperLimit && upperLimit >= 0) {
				callback('基数下限需小于基数上限！');
				return false;
			}
		}

		callback();
	} catch (exception) {
		console.log('get exception:', exception);
	}
};

/**
 * 比例验证
 */
const validateSocialPro = (rule, value, callback) => {
	if (!value) {
		callback();
		return false;
	}

	try {
		if (Number(value) < 0 || Number(value) > 100) {
			// (0-100)验证百分比
			callback(new Error('0~100内两位小数！'));
			return false;
		}
	} catch (e) {
		console.log('get excption');
		callback(new Error('数据不合法！'));
		return false;
	}
	callback();
	return true;
};

const state = reactive({
	name: null,
	loading: false,
	dictKeys: [], // 字典項
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
		// valueType: {
		// 	'0': '按定值',
		// 	'1': '按比例',
		// },
		valueTypesss: {
			'0': '按定值',
			'1': '按比例',
		},
		fundPayPoint: {
			1: '四舍五入取整',
			2: '元以下舍去',
			3: '见角进元',
			4: '保留两位小数',
			5: '保留一位小数',
		},
		address: getAreaJson(),
	},
	ruleForm: {
		baseType: null, // 	0.社保 1.公积金
		isIllness: 0,
	},
	formKey: 'init',
	socialConfig: {
		basic: [
			{
				dataIndex: 'departId',
				title: '社保户',
				type: 'page-select',
				request: requestHu,
				valueKey: 'id', // page-select选中对象的唯一属性值
				titleKey: 'name', // page-select 显示值字段
				search: 'name', // 搜索字段参数
				ext: {
					type: 0, // 1 公积金，0 社保
					delFlag: 0,
				},
			},
			{
				type: 'button',
				span: 18,
				title:'带出最近配置',
				query: {
					type: 0, // 1 公积金，0 社保
				},
				loading:false
			},
			{
				dataIndex: 'address',
				title: '社保缴纳地',
				placeholder: '请选择',
				disabled: true,
			},
			{
				dataIndex: 'applyStartDate',
				title: '适用起始月份',
				type: 'date',
				dateType: 'month',
				dateFormat: 'YYYY年MM月',
				disabledDate: (date) => {
					const current = moment(moment().format('YYYY-MM'));
					const select = moment(moment(date).format('YYYY-MM'));
					const diff = select.diff(current, 'month', true);
					return !(diff == 0 || diff == 1);
				},
			},
			{
				dataIndex: 'lowerLimit',
				title: '基数下限',
				type: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'upperLimit',
				title: '基数上限',
				type: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'doMonth',
				title: '执行月份',
				type: 'date',
				dateType: 'month',
				disabled: () => {
					return !state.ruleForm.applyStartDate;
				},
				disabledDate: (date) => {
					const start = state.ruleForm.applyStartDate;
					if (start && !moment(date).isAfter(moment(start))) {
						return false;
					}
					return true;
				},
				dateFormat: 'YYYY年MM月',
				valueFormat: 'YYYYMM',
			},
		],
		ratio: [
			{
				dataIndex: 'unitMedicalPro',
				title: '单位医疗比例',
				type: 'unit-input',
				unit: '%',
				valueType: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'unitPersionPro',
				title: '单位养老比例',
				type: 'unit-input',
				unit: '%',
				valueType: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'unitUnemploymentPro',
				title: '单位失业比例',
				type: 'unit-input',
				unit: '%',
				valueType: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'unitInjuryPro',
				title: '单位工伤比例',
				type: 'unit-input',
				unit: '%',
				valueType: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'unitBirthPro',
				title: '单位生育比例',
				type: 'unit-input',
				unit: '%',
				valueType: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'unitProSum',
				title: '单位比例合计',
				type: 'unit-input',
				unit: '%',
				disabled: true,
			},
			{
				type: 'empty',
				span: 12,
			},

			{
				dataIndex: 'personalMedicalPro',
				title: '个人医疗比例',
				type: 'unit-input',
				unit: '%',
				valueType: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'personalPersionPro',
				title: '个人养老比例',
				type: 'unit-input',
				unit: '%',
				valueType: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'personalUnemploymentPro',
				title: '个人失业比例',
				type: 'unit-input',
				unit: '%',
				valueType: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'personalProSum',
				title: '个人比例合计',
				type: 'unit-input',
				unit: '%',
				disabled: true,
				valueType: 'number',
				maxLength: 12,
			},
			{
				type: 'divider',
				span: 24,
			},
		],
	},

	socialRules: {
		departId: [{ required: true, message: '请选择社保户' }],
		address: [{ required: true, message: '请选择社保缴纳地' }],
		upperLimit: [
			{ required: true, message: '请输入基数上限' },
			{
				validator: validateUpperLimit,
			},
		],
		lowerLimit: [
			{ required: true, message: '请输入基数下限' },
			{
				validator: validateLowerLimit,
			},
		],
		applyStartDate: [{ required: true, message: '请选择适用起始月份' }],
		unitMedicalPro: [
			{ required: true, message: '请输入单位医疗比例' },
			{
				validator: validateSocialPro,
			},
		],
		unitPersionPro: [
			{ required: true, message: '请输入单位养老比例' },
			{
				validator: validateSocialPro,
			},
		],
		unitUnemploymentPro: [
			{ required: true, message: '请输入单位失业比例' },
			{
				validator: validateSocialPro,
			},
		],
		unitBirthPro: [
			{ required: true, message: '请输入单位生育比例' },
			{
				validator: validateSocialPro,
			},
		],
		unitInjuryPro: [
			{ required: true, message: '请输入单位工伤比例' },
			{
				validator: validateSocialPro,
			},
		],
		personalMedicalPro: [
			{ required: true, message: '请输入个人医疗比例' },
			{
				validator: validateSocialPro,
			},
		],
		personalPersionPro: [
			{ required: true, message: '请输入个人养老比例' },
			{
				validator: validateSocialPro,
			},
		],
		personalUnemploymentPro: [
			{ required: true, message: '请输入个人失业比例' },
			{
				validator: validateSocialPro,
			},
		],
		isIllness: [{ required: true, message: '请选择大病是否收费' }],
		collectType: [{ required: true, message: '请选择大病缴纳周期' }],
		isChargePersonal: [{ required: true, message: '请选择收费模式' }],
		collectMoth: [{ required: true, message: '请选择缴费月份' }],
		payCompany: [{ required: true, message: '请输入单位大病金额' }],
		payPersonal: [{ required: true, message: '请输入个人大病金额' }],
		valueType: [{ required: true, message: '请选择缴纳方式' }],
		payCompanyPro: [
			{ required: true, message: '请输入单位大病比例' },
			{
				validator: validateSocialPro,
			},
		],
		payPersonalPro: [
			{ required: true, message: '请输入个人大病比例' },
			{
				validator: validateSocialPro,
			},
		],
		doMonth: [{ required: true, message: '请选择执行月份' }],
		canOverpay: [{ required: true, message: '请选择是否可补缴' }],
		overpayNumber: [{ required: true, message: '请选择最大补缴期限' }],
		haveThisMonth: [{ required: true, message: '请选择是否含期缴当月' }],
		insuranceIsLatestCardinality: [{ required: true, message: '请选择补缴基数' }],
		payPolicy: [{ required: true, message: '请输入补缴政策' }],
		insurance: [{ required: true, message: '请选择补缴险种' }],
	},

	fundPayCompanyRule: [
		{ required: true, message: '请输入单位公积金比例' },
		{
			validator: validateSocialPro,
		},
	],
	fundPayPersonalRule: [
		{ required: true, message: '请输入个人公积金比例' },
		{
			validator: validateSocialPro,
		},
	],
	fundConfig: {
		basic: [
			{
				dataIndex: 'departId',
				title: '公积金户',
				type: 'page-select',
				request: requestHu,
				valueKey: 'id', // page-select选中对象的唯一属性值
				titleKey: 'name', // page-select 显示值字段
				search: 'name', // 搜索字段参数
				ext: {
					type: 1, // 1 公积金，0 社保
					delFlag: 0,
				},
			},
			{
				type: 'button',
				span: 18,
				title:'带出最近配置',
				query: {
					type: 1, // 1 公积金，0 社保
				},
				loading:false
			},
			{
				dataIndex: 'fundPayType',
				title: '公积金类型',
				type: 'select',
				options: 'fundPayType',
			},
			{
				dataIndex: 'address',
				title: '公积金缴纳地',
				placeholder: '请选择',
				disabled: true,
			},
			{
				dataIndex: 'applyStartDate',
				title: '适用起始月份',
				type: 'date',
				dateType: 'month',
				dateFormat: 'YYYY年MM月',
				disabledDate: (date) => {
					const current = moment(moment().format('YYYY-MM'));
					const select = moment(moment(date).format('YYYY-MM'));
					const diff = select.diff(current, 'month', true);
					if (diff == 0 || diff == 1) {
						return false;
					}
					return true;
				},
			},
			{
				dataIndex: 'lowerLimit',
				title: '基数下限',
				type: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'upperLimit',
				title: '基数上限',
				type: 'number',
				maxLength: 12,
			},
			{
				dataIndex: 'fundPayPoint',
				title: '单边小数点',
				type: 'select',
				options: 'fundPayPoint',
			},
			{
				dataIndex: 'doMonth',
				title: '执行月份',
				type: 'date',
				dateType: 'month',
				dateFormat: 'YYYY年MM月',
				valueFormat: 'YYYYMM',
				disabled: () => {
					return !state.ruleForm.applyStartDate;
				},
				disabledDate: (date) => {
					const start = state.ruleForm.applyStartDate;
					if (start && !moment(date).isAfter(moment(start))) {
						return false;
					}
					return true;
				},
			},
		],
	},
	fundRules: {
		departId: [{ required: true, message: '请选择公积金户' }],
		address: [{ required: true, message: '请选择公积金缴纳地' }],
		fundPayType: [{ required: true, message: '请选择公积金类型' }],
		applyStartDate: [{ required: true, message: '请选择适用起始月份' }],
		upperLimit: [
			{ required: true, message: '请输入基数上限' },
			{
				validator: validateUpperLimit,
			},
		],
		lowerLimit: [
			{ required: true, message: '请输入基数下限' },
			{
				validator: validateLowerLimit,
			},
		],
		fundPayPoint: [{ required: true, message: '请输入单边小数点' }],
		canOverpay: [{ required: true, message: '请选择是否可补缴' }],
		overpayNumber: [{ required: true, message: '请选择最大补缴期限' }],
		haveThisMonth: [{ required: true, message: '请选择是否含期缴当月' }],
		insuranceIsLatestCardinality: [{ required: true, message: '请选择补缴基数' }],
		payPolicy: [{ required: true, message: '请输入补缴政策' }],
		doMonth: [{ required: true, message: '请选择执行月份' }],

		payCompanyPro: [
			{ required: true, message: '请输入单位大病比例' },
			{
				validator: validateSocialPro,
			},
		],
		payPersonalPro: [
			{ required: true, message: '请输入个人大病比例' },
			{
				validator: validateSocialPro,
			},
		],
	},
	id: null,
	span: 6,
});

/**
 * 社保单位比例计算
 */
watch(
	() => [
		state.ruleForm.unitMedicalPro,
		state.ruleForm.unitInjuryPro,
		state.ruleForm.unitPersionPro,
		state.ruleForm.unitUnemploymentPro,
		state.ruleForm.unitBirthPro,
	],
	(data) => {
		const target = data.reduce((pre, current) => {
			try {
				if (current === null || current === undefined || current === '') {
					return pre;
				}
				return Number(current) * 100 + pre;
			} catch (e) {
				console.log('get exception');
				return 0;
			}
		}, 0);
		state.ruleForm.unitProSum = (target / 100).toFixed(2) + '';
	}
);

/**
 * 社保个人比例计算
 *
 */
watch(
	() => [state.ruleForm.personalPersionPro, state.ruleForm.personalMedicalPro, state.ruleForm.personalUnemploymentPro],
	(data) => {
		const target =
			data.reduce((pre, current) => {
				try {
					if (current === null || current === undefined || current === '') {
						return pre;
					}
					return Number(current) * 100 + pre;
				} catch (e) {
					console.log('get exception');
					return 0;
				}
			}, 0) / 100;
		state.ruleForm.personalProSum = target.toFixed(2) + '';
	}
);

const onSubmit = () => {
	// console.log('get ruleForm:', state.ruleForm);
	if (formRef.value) {
		formRef.value.validate(async (valid) => {
			if (valid) {
				
				const data = JSON.parse(JSON.stringify(state.ruleForm));
				if (data.address) {
					delete data.address;
				}
				
				if (state.name === 'social-config-add' || state.name === 'social-config-edit') {

					// 新增、编辑社保信息
					submitSocial(data);
				} else {
					// 新增、编辑公积金信息
					submitFund(data);
				}
			} else {
				ElMessage.warning('请检查你的填写项是否完整');
			}
		});
	}
};

/**
 * 新增、编辑社保信息
 */
const submitSocial = (data) => {
	const insurance = data.insurance;
	if (insurance && insurance.length) {
		data.insurancePension = insurance.indexOf('insurancePension') != -1 ? 0 : 1; // 补缴险种（养老）
		data.insuranceMedical = insurance.indexOf('insuranceMedical') != -1 ? 0 : 1; // 补缴险种（医疗）
		data.insuranceUnemployment = insurance.indexOf('insuranceUnemployment') != -1 ? 0 : 1; // 补缴险种（失业）
		data.insuranceInjury = insurance.indexOf('insuranceInjury') != -1 ? 0 : 1; // 补缴险种（工伤）
		data.insuranceBirth = insurance.indexOf('insuranceBirth') != -1 ? 0 : 1; // 补缴险种（生育）
		data.insuranceBigailment = insurance.indexOf('insuranceBigailment') != -1 ? 0 : 1; // 补缴险种（大病）
	}

	delete data.insurance;
	state.loading = true;
	if (data.id) {
		// 编辑
		updateCardinalConfig(data).then(
			(res) => {
				console.log('get edit  res:', res);
				if (res && res.code == 200) {
					ElMessage.success('编辑成功');
					goBack();
				} else {
					ElMessage.error(res.msg || '编辑失败');
				}
			},
			(error) => {
				console.log('get error:', error);
				ElMessage.error((error && error.msg) || '编辑失败');
			}
		).finally(() => {
			state.loading = false;
		});
	} else {
		// 新增
		addCardinalConfig(data).then(
			(res) => {
				if (res && res.code == 200) {
					ElMessage.success('新增成功');
					goBack();
				} else {
					ElMessage.error(res.msg || '新增失败');
				}
			},
			(error) => {
				ElMessage.error((error && error.msg) || '新增失败');
			}
		).finally(() => {
			state.loading = false;
		});
	}
};

/**
 * 新增、编辑公积金信息
 */
const submitFund = (data) => {
	state.loading = true;
	if (data.id) {
		// 编辑公积金
		updateCardinalConfig(data).then(
			(res) => {
				if (res && res.code == 200) {
					ElMessage.success('编辑成功');
					goBack();
				} else {
					ElMessage.error(res.msg || '编辑失败');
				}
			},
			(error) => {
				ElMessage.error((error && error.msg) || '编辑失败');
			}
		).finally(() => {
			state.loading = false;
		});
	} else {
		// 新增公积金
		addCardinalConfig(data).then(
			(res) => {
				if (res && res.code == 200) {
					ElMessage.success('新增成功');
					goBack();
				} else {
					ElMessage.error(res.msg || '新增失败');
				}
			},
			(error) => {
				ElMessage.error((error && error.msg) || '新增失败');
			}
		).finally(() => {
			state.loading = false;
		});
	}
};

/**
 * 基础配置
 */
const basicConfig = computed(() => {
	if (state.name === 'social-config-add' || state.name === 'social-config-edit') {
		return state.socialConfig.basic;
	} else if (state.name === 'fund-config-add' || state.name === 'fund-config-edit') {
		return state.fundConfig.basic;
	}
	return [];
});

/**
 * 补缴配置
 */
const inBackConfig = computed(() => {
	if (state.name === 'social-config-add' || state.name === 'social-config-edit') {
		// 社保
		const target = [
			{
				dataIndex: 'canOverpay',
				title: '是否可补缴', // 是否可以补缴： 0：是，1：否
				type: 'radio',
				options: 'canOverpay',
			},
		];

		if (state.ruleForm.canOverpay == 0) {
			// 可以补缴
			const a = [
				{
					dataIndex: 'insurance',
					title: '补缴险种',
					type: 'select',
					palceholder: '请选择，可多选',
					multiple: true,
					options: 'insurance',
				},
				{
					dataIndex: 'overpayNumber',
					title: '最大补缴期限',
					type: 'select',
					options: 'overpayNumber',
				},
				{
					dataIndex: 'haveThisMonth',
					title: '是否含起缴当月', // 是否含起缴当月： 0：是，1：否
					type: 'select',
					options: 'haveThisMonth',
				},
				{
					dataIndex: 'insuranceIsLatestCardinality',
					title: '补缴基数',
					type: 'select',
					options: 'insuranceIsLatestCardinality',
				},
				{
					type: 'empty',
					span: 18,
				},
				{
					dataIndex: 'payPolicy',
					title: '补缴政策',
					type: 'textarea',
					span: 12,
				},
			];
			target.push(...a);
		}
		return target;
	} else if (state.name === 'fund-config-add' || state.name === 'fund-config-edit') {
		// 公积金
		const target = [
			{
				dataIndex: 'canOverpay',
				title: '是否可补缴', // 是否可以补缴： 0：是，1：否
				type: 'radio',
				options: 'canOverpay',
			},
		];

		if (state.ruleForm.canOverpay == 0) {
			// 可以补缴
			const a = [
				{
					dataIndex: 'overpayNumber',
					title: '最大补缴期限',
					type: 'select',
					options: 'overpayNumber',
				},
				{
					dataIndex: 'haveThisMonth',
					title: '是否含起缴当月', // 是否含起缴当月： 0：是，1：否
					type: 'select',
					options: 'haveThisMonth',
				},
				{
					dataIndex: 'insuranceIsLatestCardinality',
					title: '补缴基数',
					type: 'select',
					options: 'insuranceIsLatestCardinality',
				},
				{
					dataIndex: 'payPolicy',
					title: '补缴政策',
					type: 'textarea',
					span: 12,
				},
			];
			target.push(...a);
		}

		return target;
	}
	return [];
});

const socialillnessConfig = computed(() => {
	/**
	 * isIllness 是否大病， 0 是 1 否
	 * collectType 大病缴纳周期， 0.年 1.月【按月不显示收费模式】
	 *
	 */
	const target = [
		{
			dataIndex: 'isIllness',
			title: '大病是否收费',
			type: 'radio',
			options: 'illnesOptions',
		},
	];

	if (state.ruleForm.isIllness == 0) {
		// 是大病时才显示后续的填写项
		target.push({
			dataIndex: 'collectType',
			title: '大病缴纳周期',
			type: 'radio',
			options: 'collectType',
		});

		if (state.ruleForm.collectType == 0) {
			target.push({
				dataIndex: 'isChargePersonal',
				title: '收费模式', // 0：立即收费 1：次年起收
				type: 'select',
				options: 'isChargePersonal',
			});
			// collectType 大病缴纳周期 按年显示缴纳月份 按月显示缴纳方式  0.年 1.月
			const a = [
				{
					dataIndex: 'collectMoth',
					title: '缴纳月份',
					type: 'select',
					options: 'collectMoth',
				},
				{
					dataIndex: 'payCompany',
					title: '单位大病金额',
					type: 'unit-input',
					unit: '元/年',
					maxLength: 12,
					valueType: 'number',
				},
				{
					dataIndex: 'payPersonal',
					title: '个人大病金额',
					type: 'unit-input',
					unit: '元/年',
					maxLength: 12,
					valueType: 'number',
				},
			];

			target.push(...a);
		} else if (state.ruleForm.collectType == 1) {
			// 按月
			const b = [
				{
					dataIndex: 'valueType',
					title: '缴纳方式',
					type: 'radio',
					options: 'valueTypesss',
				},
			];
			if (state.ruleForm.valueType == 0) {
				// 按定值
				b.push({
					dataIndex: 'payCompany',
					title: '单位大病金额',
					type: 'unit-input',
					maxLength: 12,
					valueType: 'number',
					unit: '元/月',
				});

				b.push({
					dataIndex: 'payPersonal',
					title: '个人大病金额',
					type: 'unit-input',
					valueType: 'number',
					maxLength: 12,
					unit: '元/月',
				});
			} else if (state.ruleForm.valueType == 1) {
				// 按比例
				b.push({
					dataIndex: 'payCompanyPro',
					title: '单位大病比例',
					type: 'unit-input',
					unit: '%',
					maxLength: 12,
					valueType: 'number',
				});

				b.push({
					dataIndex: 'payPersonalPro',
					title: '个人大病比例',
					type: 'unit-input',
					unit: '%',
					maxLength: 12,
					valueType: 'number',
				});
			}
			target.push(...b);
		}
	}
	return target;
});

const changeAddress = (val, node) => {

	// 获取档案所在地
	const values = [val.id];
	if (node.parent && node.parent.level != 0) {
		// 获取市或者省
		values.unshift(node.parent.data.id);
		if (node.parent.parent && node.parent.parent.level != 0) {
			// 获取省
			values.unshift(node.parent.parent.data.id);
		}
	}

	let pro = null;
	let city = null;
	let town = null;
	pro = values[0] || null;
	if (values.length > 1) city = values[1] || null;
	if (values.length > 2) town = values[2] || null;
	state.ruleForm.province = pro;
	state.ruleForm.city = city;
	state.ruleForm.town = town;
};

const clearAddress = () => {
	state.ruleForm.province = null;
	state.ruleForm.city = null;
	state.ruleForm.town = null;
};

/**
 * 校验规则
 */
const rules = computed(() => {
	if (state.name === 'social-config-add' || state.name === 'social-config-edit') {
		return state.socialRules;
	} else {
		return state.fundRules;
	}
});

/**
 * 加载字典值
 */
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

onMounted(() => {
	setDefalut()
	// const name = route.name;
	// state.name = name;
	// state.ruleForm.baseType = '0'; // 	0.社保 1.公积金
	// state.ruleForm.isIllness = 0; // 是否大病
	// state.ruleForm.collectType = 0;
	// state.ruleForm.canOverpay = 0; // 是否补缴
	// if (name === 'social-config-add') {
	// 	nextTick(() => {
	// 		state.ruleForm = {
	// 			baseType: '0',
	// 			isIllness: '0',
	// 			collectType: '0',
	// 			collectMoth: '1',

	// 			isChargePersonal: '0',
	// 			canOverpay: '0',
	// 			insurance: ['insurancePension', 'insuranceMedical', 'insuranceUnemployment', 'insuranceInjury', 'insuranceBirth', 'insuranceBigailment'],
	// 			overpayNumber: '1',
	// 			insuranceIsLatestCardinality: '0',
	// 			haveThisMonth: '0',
	// 		};
	// 	});
	// } else if (name === 'fund-config-add') {
	// 	state.ruleForm.baseType = 1; // 公积金
	// 	state.ruleForm.canOverpay = 0; // 是否补缴

	// 	nextTick(() => {
	// 		state.ruleForm = {
	// 			baseType: '1',
	// 			fundProList: [
	// 				{
	// 					companyPro: '0',
	// 					personalPro: '0',
	// 				},
	// 			],
	// 			canOverpay: '0',
	// 			overpayNumber: '1',
	// 			insuranceIsLatestCardinality: '0',
	// 			haveThisMonth: '0',
	// 			fundPayType: '0',
	// 		};
	// 	});
	// } else if (name === 'social-config-edit' || name === 'fund-config-edit') {
	// 	if (route.params && route.params.id) {
	// 		// 编辑页面
	// 		state.id = route.params.id;
	// 		getDetail(route.params.id);
	// 	} else {
	// 		ElMessage.warning('访问路由不合法');
	// 		goBack();
	// 	}
	// } else {
	// 	ElMessage.warning('访问路由不合法');
	// 	goBack();
	// }

});

// 默认的配置
const setDefalut = ()=>{
	const name = route.name;
	state.name = name;
	state.ruleForm.baseType = '0'; // 	0.社保 1.公积金
	state.ruleForm.isIllness = 0; // 是否大病
	state.ruleForm.collectType = 0;
	state.ruleForm.canOverpay = 0; // 是否补缴
	if (name === 'social-config-add') {
		nextTick(() => {
			state.ruleForm = {
				baseType: '0',
				isIllness: '0',
				collectType: '0',
				collectMoth: '1',

				isChargePersonal: '0',
				canOverpay: '0',
				insurance: ['insurancePension', 'insuranceMedical', 'insuranceUnemployment', 'insuranceInjury', 'insuranceBirth', 'insuranceBigailment'],
				overpayNumber: '1',
				insuranceIsLatestCardinality: '0',
				haveThisMonth: '0',
			};
		});
	} else if (name === 'fund-config-add') {
		state.ruleForm.baseType = 1; // 公积金
		state.ruleForm.canOverpay = 0; // 是否补缴

		nextTick(() => {
			state.ruleForm = {
				baseType: '1',
				fundProList: [
					{
						companyPro: '0',
						personalPro: '0',
					},
				],
				canOverpay: '0',
				overpayNumber: '1',
				insuranceIsLatestCardinality: '0',
				haveThisMonth: '0',
				fundPayType: '0',
			};
		});
	} else if (name === 'social-config-edit' || name === 'fund-config-edit') {
		if (route.params && route.params.id) {
			// 编辑页面
			state.id = route.params.id;
			getDetail(route.params.id);
		} else {
			ElMessage.warning('访问路由不合法');
			goBack();
		}
	} else {
		ElMessage.warning('访问路由不合法');
		goBack();
	}
}



const getDetail = (id) => {
	getCardinalConfig(id).then(
		(res) => {
			if (res && res.code == 200) {
				state.ruleForm = res.data;
				handleDetail(res.data);
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

const handleDetail = (detail) => {
	// 页面数据填充处理

	state.ruleForm.address = detail.town ?? detail.city ?? detail.province;
	state.DICTS.departId = [{ id: detail.departId, name: detail.departName }];
	if (state.name === 'social-config-edit'){
		// 社保
		state.socialConfig.basic = state.socialConfig.basic.map((item) => {
			const target = { ...item };
			if (target.dataIndex === 'departId') {
				target.options = 'departId';
			}
			return target;
		});
	} else if (state.name === 'fund-config-edit') {
		// 公积金
		state.ruleForm.fundPayType += '';
		state.ruleForm.fundPayPoint += '';
		state.ruleForm.overpayNumber += '';
		state.ruleForm.haveThisMonth += '';
		state.ruleForm.insuranceIsLatestCardinality += '';

		state.fundConfig.basic = state.fundConfig.basic.map((item) => {
			const target = { ...item };
			if (target.dataIndex === 'departId') {
				target.options = 'departId';
			}
			return target;
		});
	}

	nextTick(() => {
		state.formKey = 'social-update' + state.ruleForm.canOverpay;
	});
};
</script>

<style lang="scss" scoped src="./css/addCardinalConfig.scss">
</style>
