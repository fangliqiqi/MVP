<template>
	<div class="check-archives-dialog">
		<el-dialog title="人员档案新增" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="90px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="姓名" prop="empName">
							<el-input v-model="state.ruleForm.empName" placeholder="请输入人员姓名" maxlength="20" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="身份证号" prop="empIdCard">
							<el-input v-model="state.ruleForm.empIdCard" @keyup="keyup" placeholder="请输入身份证号" maxlength="20" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">取 消</el-button>
					<el-button type="primary" :loading="state.loading" @click="onSubmit" size="default" >确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="checkArchivesDialog">
import { ElMessage, ElMessageBox } from 'element-plus';
import { checkStaffInfo, restoreStaff } from '/@/api/staff';
import { useRouter } from 'vue-router';
import { md5 } from '/@/utils/utils';

const router = useRouter();
const formRef = ref(null);
const state = reactive({
	isShowDialog: false,
	ruleForm: {
		// empIdCard: '342622199204043590',
		// empName: '蔡海飞',
		empIdCard: null,
		empName: null,
	},
	info: null,
	loading: false,
});

/**
 * 身份证去除非字母、数字字符串
 */
const keyup = () => {
	state.ruleForm.empIdCard = state.ruleForm.empIdCard.replace(/[^a-zA-Z0-9]/g, '');
};

const rules = reactive({
	empName: [{ required: true, message: '请输入人员姓名', trigger: 'blur' }],
	empIdCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
});

// 关闭弹窗
const closeDialog = () => {
	state.ruleForm = {};
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;

	state.loading = false;
};

/**
 * 校验成功回调
 */
const checkSuccess = () => {
	router.push({
		path: '/archives/staff/online/add',
		query: {
			empIdcard: state.ruleForm.empIdCard,
			empName: state.ruleForm.empName,
			_t: md5(state.ruleForm.empIdCard + state.ruleForm.empName),
		},
	});
	closeDialog();
};

/**
 * 恢复档案
 */
const recoveryCallback = (id) => {
	ElMessageBox.confirm(`该人员在离职库已存在，是否'恢复档案'？`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			try {
				const res = await restoreStaff({ id });
				if (res && res.code === 200) {
					ElMessage.success('恢复档案成功');
					emits('ok');
					closeDialog();
				} else {
					ElMessage.error(res.msg || '恢复档案失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				ElMessage.error('恢复档案失败');
			}
		})
		.catch(() => {});
};

const checkInfo = () => {
	state.loading = true;
	checkStaffInfo(state.ruleForm)
		.then((res) => {
			if (res && res.code === 200) {
				// 数据校验成功，跳转新增页面
				checkSuccess();
			} else if (res && res.code === 2) {
				//  该人员在离职库已存在，是否'恢复档案'?
				recoveryCallback(res.data.id);
			} else {
				ElMessage.error(res.msg || '数据校验不通过');
			}
		})
		.finally(() => {
			state.loading = false;
		});
};

const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {

				// 表单校验通过
				checkInfo();
			}
		});
};

// 打开弹窗
const openDialog = async (data) => {
	state.info = data;
	state.isShowDialog = true;
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>
