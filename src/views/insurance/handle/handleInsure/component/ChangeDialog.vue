<template>
	<div class="information-change">
		<el-dialog
			title="参保信息变更"
			v-if="state.isShowDialog"
			v-model="state.isShowDialog"
			width="750px"
			:close-on-click-modal="false"
			@close="closeDialog"
		>
			<el-form size="default" ref="formRef" :rules="rules" :model="state.ruleForm" label-width="100px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="姓名">
							<el-input v-model="state.ruleForm.empName" disabled />
						</el-form-item>
						<el-form-item label="保险公司">
							<el-input v-model="state.ruleForm.insuranceCompanyName" disabled />
						</el-form-item>
						<el-form-item label="保单开始时间">
							<el-date-picker
								style="width: 100%"
								type="date"
								placeholder="请选择保单开始日期"
								class="input"
								v-model="state.ruleForm.policyStart"
								format="YYYY-MM-DD"
								value-format="YYYY-MM-DD"
							/>
						</el-form-item>
						<el-form-item label="保单类型">
							<el-select
								:disabled="state.ruleForm.buyType == 4"
								v-model="state.ruleForm.buyType"
								clearable
								placeholder="请选择保单类型"
								style="width: 100%"
							>
								<el-option v-for="(item, key) in buyType" :key="parkey" :disabled="key == 4" :label="item" :value="parseInt(key)" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号">
							<el-input v-model="state.ruleForm.empIdcardNo" disabled />
						</el-form-item>
						<el-form-item label="险种">
							<el-input v-model="state.ruleForm.insuranceTypeName" disabled />
						</el-form-item>
						<el-form-item label="保单结束时间" prop="policyEnd">
							<el-date-picker
								style="width: 100%"
								type="date"
								placeholder="请选择保单结束日期"
								class="input"
								v-model="state.ruleForm.policyEnd"
								format="YYYY-MM-DD"
								value-format="YYYY-MM-DD"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="变更原因" prop="reason">
							<el-input type="textarea" v-model="state.ruleForm.reason" maxlength="50" show-word-limit placeholder="请输入变更原因" />
						</el-form-item>
						<el-form-item label="温馨提示">
							<span style="color: #313840">起止保时间变动，不会触发“预估保费”变化</span>
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
	</div>
</template>

<script setup name="informationChangeDialog">
import { buyType } from '../../../component/dict.js';
import { updateInsuranceInsuredById } from '/@/api/insurance/handle.js';
import { ElMessage } from 'element-plus';

const emits = defineEmits(['ok']);

const formRef = ref(null);
const state = reactive({
	isShowDialog: false,
	submiting: false,
	ruleForm: {
		policyStart: null,
		policyEnd: null,
		reason: null,
	},
});

const validatePolicyEnd = (rule, value, callback) => {
	let dataStart = new Date(state.ruleForm.policyStart).getTime();
	let dataEnd = new Date(value).getTime();
	if (dataStart == 0 || dataEnd == 0) {
		callback();
	} else if (dataEnd <= dataStart) {
		callback(new Error('保单结束时间需要大于开始时间'));
	} else {
		callback();
	}
};

const rules = {
	reason: [{ required: true, message: '请输入变更原因', trigger: 'blur' }],
	policyEnd: [{ required: false, validator: validatePolicyEnd, trigger: 'change' }],
};
const closeDialog = () => {
	state.isShowDialog = false;
};

const openDialog = (data) => {
	state.isShowDialog = true;
	if (data) {
		state.ruleForm = {
			id: data.id,
			policyStart: data.policyStart,
			policyEnd: data.policyEnd,
			empName: data.empName,
			insuranceCompanyName: data.insuranceCompanyName,
			empIdcardNo: data.empIdcardNo,
			insuranceTypeName: data.insuranceTypeName,
			buyType: data.buyType,
			reason: null,
		};
	}
};

const onSubmit = () => {
	formRef.value?.validate(async (valid) => {
		if (valid) {
			const { policyStart, policyEnd, buyType } = state.ruleForm;
			if (policyStart || policyEnd || buyType) {
				state.submiting = true;
				try {
					const res = await updateInsuranceInsuredById(state.ruleForm);
					if (res.code == 200) {
						closeDialog();
						emits('ok');
						ElMessage.success('信息变更成功');
					} else {
						ElMessage.error(res.msg);
					}
				} finally {
					state.submiting = false;
				}
			} else {
				ElMessage.warning('保单开始时间、结束时间、保单类型至少填写一个')
			}
		}
	});
};

defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped></style>
