<template>
	<el-dialog
		v-model="state.isShowDialog"
		width="750px"
		:close-on-click-modal="false"
		@close="closeDialog"
		custom-class="policy-edit-dialog"
		title="保单编辑"
	>
		<el-form size="default" label-width="120px" :rules="rules" ref="formRef" :model="state.ruleForm" v-loading="state.loading">
			<el-row :gutter="40">
				<el-col :span="12">
					<el-form-item label="保单号" prop="policyNo">
						{{ state.ruleForm.policyNo }}
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="是否启用" prop="enableFlag">
						<el-select placeholder="请选择是否启用" class="input" v-model="state.ruleForm.enableFlag">
							<el-option label="启用" :value="0"></el-option>
							<el-option label="禁用" :value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="保险公司" prop="insuranceCompanyName">
						<el-select
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
						<el-select placeholder="请选择险种" class="input" v-model="state.ruleForm.insuranceTypeName">
							<el-option v-for="item in state.typeList" :key="item.id" :label="item.name" :value="item.name"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="保单开始日期" prop="policyStart">
						<el-date-picker
							type="date"
							placeholder="请选择保单开始日期"
							class="input"
							v-model="state.ruleForm.policyStart"
							format="YYYY-MM-DD"
							value-format="YYYY-MM-DD"
							@change="formRef?.validateField(['policyEnd'])"
						/>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="保单结束日期" prop="policyEnd">
						<el-date-picker
							type="date"
							placeholder="请选择保单结束日期"
							class="input"
							v-model="state.ruleForm.policyEnd"
							format="YYYY-MM-DD"
							value-format="YYYY-MM-DD"
							@change="formRef?.validateField(['policyStart'])"
						/>
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

<script setup name="PolicyEditDialog">
import { insurancePolicyUpdate } from '/@/api/insurance/policy.js';
import { insuranceCompanyList, insuranceTypeList } from '/@/api/insurance/company.js';
import moment from 'moment';

const message = getCurrentInstance()?.appContext.config.globalProperties.$message;

const formRef = ref(null);

const emits = defineEmits(['ok']);

const state = reactive({
	isShowDialog: false,
	loading: false,
	submiting: false,
	ruleForm: {},

	companyList: [], // 保险公司列表
	typeList: [], // 险种列表
});

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
	state.companyList = []; // 保险公司列表
	state.typeList = []; // 险种列表
	formRef.value && formRef.value.clearValidate();
};

const onSubmit = () => {
	formRef.value &&
		formRef.value.validate(async (isValid) => {
			if (isValid) {
				const params = state.ruleForm;

				state.submiting = true;
				try {
					const res = await insurancePolicyUpdate(params);
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

// 动态表单校验规则
const rules = computed(() => {
	return {
		enableFlag: [{ required: true, message: '请选择是否启用', trigger: 'change' }],
		insuranceCompanyName: [{ required: true, message: '请选择保险公司', trigger: 'change' }],
		insuranceTypeName: [{ required: true, message: '请选择险种', trigger: 'change' }],
		policyStart: [
			{ required: true, message: '请选择开始日期', trigger: 'change' },
			{
				validator: (_, value, callback) => {
					if (moment(value).isSameOrAfter(state.ruleForm.policyEnd)) {
						callback(new Error('开始日期应该在结束日期之前'));
					} else {
						callback();
					}
				},
				trigger: 'change',
			},
		],
		policyEnd: [
			{ required: true, message: '请选择结束日期', trigger: 'change' },
			{
				validator: (_, value, callback) => {
					if (moment(value).isSameOrBefore(state.ruleForm.policyStart)) {
						callback(new Error('结束日期应该在开始日期之后'));
					} else {
						callback();
					}
				},
				trigger: 'change',
			},
		],
	};
});

// 打开弹窗
const openDialog = async (data) => {
	state.isShowDialog = true;
	state.ruleForm = JSON.parse(JSON.stringify(data));

	// 获取保险公司列表
	const company = await insuranceCompanyList();

	if (company.code === 200) {
		state.companyList = company.data || [];
	}
	const selectCompanyId = findSelectCompanyId(data.insuranceCompanyName);
	if (selectCompanyId) {
		// 险种
		const type = await insuranceTypeList({ insuranceCompanyId: selectCompanyId });
		if (type.code === 200) {
			state.typeList = type.data || [];
		}
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
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped>
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
@import './css/dialog.scss';
</style>
