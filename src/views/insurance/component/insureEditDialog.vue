<template>
	<!-- 商业保险详情 -->
	<el-dialog v-model="state.isShowDialog" width="750px" :close-on-click-modal="false" @close="closeDialog" custom-class="insure-edit-dialog">
		<template #header>
			<div class="dialog-header">
				<div class="header-title">
					<span class="name">{{ state.ruleForm.empName || '--' }}</span>
					<span class="id" v-if="state.ruleForm.empIdcardNo">({{ state.ruleForm.empIdcardNo }})</span>
				</div>
			</div>
		</template>

		<el-form
			size="default"
			label-width="120px"
			:rules="rules"
			ref="formRef"
			:model="state.ruleForm"
			v-loading="state.loading"
			:validate-on-rule-change="false"
		>
			<el-row :gutter="40">
				<el-col :span="12">
					<el-form-item label="姓名" prop="empName">
						<el-input placeholder="请输入姓名" class="input" v-model.trim="state.ruleForm.empName" :maxlength="20" />
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="身份证号" prop="empIdcardNo">
						<el-input placeholder="请输入身份证号" class="input" v-model.trim="state.ruleForm.empIdcardNo" :maxlength="18" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="保单开始日期" prop="policyStart">
						<el-date-picker
							:disabled="isChangeType || isBatchType"
							type="date"
							placeholder="请选择保单开始日期"
							class="input"
							v-model="state.ruleForm.policyStart"
							format="YYYY-MM-DD"
							value-format="YYYY-MM-DD"
						/>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="保单结束日期" prop="policyEnd">
						<el-date-picker
							:disabled="isChangeType || isBatchType"
							type="date"
							placeholder="请选择保单结束日期"
							class="input"
							v-model="state.ruleForm.policyEnd"
							format="YYYY-MM-DD"
							value-format="YYYY-MM-DD"
						/>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="岗位" prop="post">
						<el-input placeholder="请输入岗位名称" class="input" v-model.trim="state.ruleForm.post" :maxlength="32"> </el-input>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="保险公司" prop="insuranceCompanyName">
						<el-select
							:disabled="isChangeType || isBatchType"
							placeholder="请选择保险公司"
							class="input"
							v-model="state.ruleForm.insuranceCompanyName"
							filterable
							@change="insuranceCompanyChange"
						>
							<el-option v-for="item in state.companyList" :key="item.id" :label="item.companyName" :value="item.companyName"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="险种" prop="insuranceTypeName">
						<el-select
							:disabled="isChangeType || isBatchType"
							placeholder="请选择险种"
							class="input"
							v-model="state.ruleForm.insuranceTypeName"
							@change="insuranceTypeChange"
						>
							<el-option v-for="item in state.typeList" :key="item.id" :label="item.name" :value="item.name"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="购买标准（元）" prop="buyStandard" class="cn_">
						<el-select :disabled="isChangeType" placeholder="请选择购买标准" class="input" v-model="state.ruleForm.buyStandard">
							<el-option v-for="item in state.standardList" :key="item.id" :label="item.buyStandard" :value="item.buyStandard"></el-option
						></el-select>
					</el-form-item>
				</el-col>

				<el-col :span="18">
					<el-form-item label="商险购买地" class="union" prop="insuranceAddress">
						<area-union-select :disabled="isChangeType" v-model="state.ruleForm.insuranceAddress" />
					</el-form-item>
				</el-col>
				<el-col :span="18">
					<el-form-item label="商险办理地" class="union" prop="insuranceHandleAddress">
						<area-union-select :disabled="isChangeType" v-model="state.ruleForm.insuranceHandleAddress" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog" size="default">取 消</el-button>
				<el-button type="primary" @click="onSubmit" size="default" :loading="state.submiting">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup name="insureEditDialog">
import AreaUnionSelect from './AreaUnionSelect.vue';
import { getInsuranceDetail, editInsurance } from '/@/api/insurance/custserve.js';
import { areaJson } from '/@/utils/city.js';
import { insuranceCompanyList, insuranceTypeList, insuranceTypeStandardList } from '/@/api/insurance/company.js';

const message = getCurrentInstance()?.appContext.config.globalProperties.$message;

const formRef = ref(null);

const emits = defineEmits(['ok']);

const areaRule = (rule, value, callback) => {
	if (value.length === 0) {
		callback(new Error('地区不能为空'));
	} else if (value.length === 1) {
		callback(new Error('请选择城市'));
	} else {
		callback();
	}
};

const state = reactive({
	isShowDialog: false,
	loading: false,
	submiting: false,
	ruleForm: {
		policyStart: null,
		policyEnd: null,
		post: null,
		insuranceTypeName: null,
		insuranceTypeId: null, // 险种id
		insuranceCompanyName: null,
		buyStandard: null,
		insuranceAddress: null, // 商险购买地
		insuranceHandleAddress: null, // 商险办理地
		insuranceProvince: null, // 商险购买地省code
		insuranceCity: null, // 商险购买地市code
		insuranceHandleProvince: null, // 商险办理省code
		insuranceHandleCity: null, // 商险办理城市code
	},

	companyList: [], // 保险公司列表
	typeList: [], // 险种列表
	standardList: [], // 购买标准列表
});

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
	state.companyList = []; // 保险公司列表
	state.typeList = []; // 险种列表
	state.standardList = []; // 购买标准列表
	formRef.value && formRef.value.clearValidate();
};

const onSubmit = () => {
	formRef.value &&
		formRef.value.validate(async (isValid) => {
			if (isValid) {
				const params = state.ruleForm;

				// 取值
				params.insuranceProvince = params.insuranceAddress[0];
				params.insuranceCity = params.insuranceAddress[1];
				params.insuranceHandleProvince = params.insuranceHandleAddress[0];
				params.insuranceHandleCity = params.insuranceHandleAddress[1];
				params.insuranceProvinceName = areaJson[params.insuranceProvince]?.areaName;
				params.insuranceCityName = areaJson[params.insuranceCity]?.areaName;
				params.insuranceHandleProvinceName = areaJson[params.insuranceHandleProvince]?.areaName;
				params.insuranceHandleCityName = areaJson[params.insuranceHandleCity]?.areaName;

				state.submiting = true;
				try {
					const res = await editInsurance(params);
					if (res && res.code === 200) {
						message.success('操作成功');
						emits('ok');
						setTimeout(() => {
							closeDialog();
						}, 500);
					} else {
						message.error(res.msg || '操作失败');
					}
				} catch (e) {
					message.error(e.msg || '操作失败');
				}

				state.submiting = false;
			}
		});
};

// 查找选中的保险公司id
const findSelectCompanyId = (name) => {
	const _company = (state.companyList || []).find((item) => item.companyName === name);

	return _company && _company.id;
};

// 是否是替换类型
const isChangeType = computed(() => {
	return state?.ruleForm?.buyType == 4;
});

// 是否是批增类型
const isBatchType = computed(() => {
	return state?.ruleForm?.buyType == 3;
});

// 动态表单校验规则
const rules = computed(() => {
	if (isChangeType.value) {
		return {
			empName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
			empIdcardNo: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
			post: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
		};
	}

	if (isBatchType.value) {
		return {
			empName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
			empIdcardNo: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
			post: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
			buyStandard: [{ required: true, message: '请选择购买标准', trigger: 'blur' }],
			insuranceAddress: [
				{ required: true, message: '请选择商险购买地' },
				{
					validator: areaRule,
				},
			],
			insuranceHandleAddress: [
				{ required: true, message: '请选择商险办理地' },
				{
					validator: areaRule,
				},
			],
		};
	}

	return {
		empName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
		empIdcardNo: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
		policyStart: [{ required: true, message: '请选择保单开始日期', trigger: 'blur' }],
		policyEnd: [{ required: true, message: '请选择保单结束日期', trigger: 'blur' }],
		post: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
		insuranceTypeName: [{ required: true, message: '请选择险种', trigger: 'blur' }],
		insuranceCompanyName: [{ required: true, message: '请选择保险公司', trigger: 'blur' }],
		buyStandard: [{ required: true, message: '请选择购买标准', trigger: 'blur' }],
		insuranceAddress: [
			{ required: true, message: '请选择商险购买地' },
			{
				validator: areaRule,
			},
		],
		insuranceHandleAddress: [
			{ required: true, message: '请选择商险办理地' },
			{
				validator: areaRule,
			},
		],
	};
});

// 打开弹窗
const openDialog = async (data) => {
	state.ruleForm = data;
	state.loading = true;
	state.isShowDialog = true;
	try {
		const detailRes = await getInsuranceDetail(data.id);
		if (detailRes.code === 200) {
			const _data = detailRes.data || {};
			state.ruleForm = _data;

			// 获取保险公司列表
			const company = await insuranceCompanyList();
			if (company.code === 200) {
				state.companyList = company.data || [];
			}

			const selectCompanyId = findSelectCompanyId(_data.insuranceCompanyName);
			if (selectCompanyId) {
				const type = await insuranceTypeList({ insuranceCompanyId: selectCompanyId });
				if (type.code === 200) {
					state.typeList = type.data || [];
				}
			}

			// 根据类型id查找标准
			const standard = await insuranceTypeStandardList(_data.insuranceTypeId);
			if (standard.code === 200) {
				state.standardList = standard.data || [];
			}

			if (_data.insuranceProvince && _data.insuranceCity) {
				state.ruleForm.insuranceAddress = [_data.insuranceProvince, _data.insuranceCity]; // 商险购买地
			}

			if (_data.insuranceHandleProvince && _data.insuranceHandleCity) {
				state.ruleForm.insuranceHandleAddress = [_data.insuranceHandleProvince, _data.insuranceHandleCity]; // 商险办理地
			}
		}
	} finally {
		state.loading = false;
	}
};

// 保险公司改变监听
const insuranceCompanyChange = async (item) => {
	// 赋值保险公司名称和id
	try {
		const selectCompanyId = findSelectCompanyId(item);
		const type = await insuranceTypeList({ insuranceCompanyId: selectCompanyId });
		if (type.code === 200) {
			state.typeList = type.data || [];
		} else {
			state.typeList = [];
		}
	} catch {}

	state.ruleForm.insuranceTypeName = null;
	state.ruleForm.insuranceTypeId = null;
	state.ruleForm.buyStandard = null;
	state.standardList = [];
};

// 险种改变监听
const insuranceTypeChange = async (name) => {
	// 赋值险种名称和id
	let _type = null;
	try {
		_type = (state.typeList || []).find((item) => item.name === name);

		const standard = await insuranceTypeStandardList(_type && _type.id);
		if (standard.code === 200) {
			state.standardList = standard.data || [];
		} else {
			state.standardList = [];
		}
	} catch {}

	state.ruleForm.insuranceTypeId = _type && _type.id;
	state.ruleForm.buyStandard = null;
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped>
.dialog-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	.header-title {
		.name {
			font-size: 18px;
			font-weight: 400;
			color: #303133;
			line-height: 26px;
		}
		.id {
			margin-left: 10px;
			line-height: 17px;
			font-size: 12px;
			font-weight: 400;
			color: #606266;
		}
	}
}
::v-deep {
	.input {
		width: 100%;
		max-width: 242px;
	}

	.union {
		.el-form-item {
			max-width: 242px;
		}
	}
}
</style>

<style lang="scss">
@import './css/insureEditDialog.scss'
</style>
