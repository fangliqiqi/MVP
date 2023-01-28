<template>
	<div class="check-archives-dialog">
		<el-dialog title="人员项目档案新增" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="90px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="姓名" prop="empName">
							<el-input v-model="state.ruleForm.empName" placeholder="请输入人员姓名" maxlength="20" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="身份证号" prop="empIdcard">
							<el-input v-model="state.ruleForm.empIdcard" placeholder="请输入身份证号" maxlength="20" @keyup="keyup" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="项目编码" prop="deptNo">
							<el-input v-model="state.ruleForm.deptNo" placeholder="请输入项目编码" maxlength="20" clearable></el-input>
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

<script setup name="addSubjectCheckInfo">
import { checkProject } from '/@/api/subject';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { md5 } from '/@/utils/utils';
import { reEmpInfo } from '/@/api/subject';

const router = useRouter();
const formRef = ref(null);



const state = reactive({
	isShowDialog: false,
	loading: false,
	ruleForm: {
		empIdcard: null,
		empName: null,
		deptNo: null,
	},
	info: null,
});
/**
 * 身份证去除非字母、数字字符串
 */
const keyup = () => {
	state.ruleForm.empIdcard = state.ruleForm.empIdcard.replace(/[^a-zA-Z0-9]/g, '');
};

const rules = reactive({
	empName: [{ required: true, message: '请输入人员姓名', trigger: 'blur' }],
	empIdcard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
	deptNo: [{ required: true, message: '请输入项目编码', trigger: 'blur' }],
});

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.ruleForm = {
		empIdcard: null,
		empName: null,
		deptNo: null,
	};
	state.isShowDialog = false;
};

/**
 * 复项
 */
const recoveryProjectCallback = (data) => {
	ElMessageBox.confirm(`该人员已减项，是否复项？`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			try {
				const res = await reEmpInfo(data);
				if (res && res.code === 200) {
					ElMessage.success('复项成功');
						emits('ok');
					closeDialog();
				} else {
					ElMessage.error(res.msg || '复项失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				ElMessage.error(e.msg || '复项失败');
			}
		})
		.catch(() => {});
};

/**
 * 恢复档案
 */
const recoveryArchivesCallback = (data) => {
	ElMessageBox.confirm(`该人员在离职库已存在，是否'恢复档案'？`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			try {
				const res = await reEmpInfo(data);
				if (res && res.code === 200) {
					ElMessage.success('恢复档案成功');
						emits('ok');
					closeDialog();
				} else {
					ElMessage.error(res.msg || '恢复档案失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				ElMessage.error(e.msg || '恢复档案失败');
			}
		})
		.catch(() => {});
};

/**
 * 复档复项
 */
const recoveryCallback = (data) => {
	ElMessageBox.confirm(`该人员已减档减项，是否'复档复项'？`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			try {
				const res = await reEmpInfo(data);
				if (res && res.code === 200) {
					ElMessage.success('复档复项成功');
						emits('ok');
					closeDialog();
				} else {
					ElMessage.error(res.msg || '复档复项失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				ElMessage.error(e.msg || '复档复项失败');
			}
		})
		.catch(() => {});
};

const checkInfo = () => {
	state.loading = true;
	checkProject(state.ruleForm).then((res) => {
		if (res && res.code === 200) {
			// 数据校验成功，跳转新增页面
			router.push({
				path: '/archives/subject/add',
				query: {
					empIdcard: state.ruleForm.empIdcard,
					empName: state.ruleForm.empName,
					deptNo: state.ruleForm.deptNo,
					_t: md5(state.ruleForm.empIdcard + state.ruleForm.empName + state.ruleForm.deptNo),
				},
			});
			closeDialog();
		} else if (res && res.code === 2) {
			// 该人员已减档减项，是否“复档复项”
			recoveryCallback({ empId: res.data.employeeId, empProId: res.data.empProId });
		} else if (res && res.code === 3) {
			// "该人员在离职库已存在，是否“恢复档案”
			recoveryArchivesCallback({ empId: res.data.employeeId });
		} else if (res && res.code === 4) {
			// 该人员已减项，是否复项
			recoveryProjectCallback({ empProId: res.data.empProId });
		} else {
			ElMessage.error(res.msg || '数据校验不通过');
		}
	}).finally(() => {
		state.loading = false;
	});
};

const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
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
