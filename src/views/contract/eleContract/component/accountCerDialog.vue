<template>
	<div class="account-cer-container">
		<el-dialog title="新增" v-model="state.isShowDialog"   width="576px" :close-on-click-modal="false" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="90px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="客服姓名" prop="name">
							<el-input v-model="state.ruleForm.name" placeholder="请输入客服姓名" maxlength="20" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="身份证号" prop="idCard">
							<el-input v-model="state.ruleForm.idCard" @keyup="keyup" placeholder="请输入身份证号" maxlength="20" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="手机号码" prop="moblie">
							<el-input v-model="state.ruleForm.moblie" placeholder="请输入手机号码" maxlength="11" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading="state.loading" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="accountCerDialog">
import { ElMessage } from 'element-plus';
import { addCertification } from '/@/api/eleContract';
import { useRouter } from 'vue-router';
const router = useRouter();
const formRef = ref(null);
const state = reactive({
	isShowDialog: false,
	loading: false,
	ruleForm: {
		name: '',
		moblie: '',
		idCard: '',
	},
});

/**
 * 身份证去除非字母、数字字符串
 */
const keyup = () => {
	state.ruleForm.idCard = state.ruleForm.idCard.replace(/[^a-zA-Z0-9]/g, '');
};

const rules = reactive({
	name: [{ required: true, message: '请输入客服姓名', trigger: 'blur' }],
	idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
	moblie: [
		{
			required: true,
			trigger: 'blur',
			validator: (rule, value, callback) => {
				if (!value) {
					callback(new Error('请输入手机号码'));
				} else if (value && value.trim().length === 11) {
					callback();
				} else {
					callback(new Error('请输入正确的手机号码格式'));
				}
			},
		},
	],
});

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
	state.loading = false;
};

const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
				// 表单校验通过
				state.loading = true;
				addCertification(Object.assign({}, state.ruleForm, { systemFlag: 0 })).then(
					(res) => {
						if (res && res.code === 200) {
							ElMessage.success('添加成功');
							emits('ok');
							closeDialog();
						} else {
							ElMessage.error(res.msg || '添加失败');
						}
					},
					(error) => {
						ElMessage.error((error && error.msg) || '添加失败');
					}
				).finally(() => {
					state.loading = false;
				});
			}
		});
};

// 打开弹窗
const openDialog = async () => {
	state.ruleForm = {
		name: '',
		moblie: '',
		idCard: '',
	};
	state.isShowDialog = true;
};

const emits = defineEmits(['ok']);

// 暴露变量
defineExpose({
	openDialog,
});
</script>

