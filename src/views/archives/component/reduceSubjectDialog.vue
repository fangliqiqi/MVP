<template>
	<!-- 项目档案减项 -->
	<div class="downshift-archives-dialog">
		<el-dialog title="减项" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="90px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="姓名">
							{{ state.ruleForm.empName }}
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="身份证号">
							{{ state.ruleForm.empIdcard }}
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="项目名称">
							{{ state.ruleForm.deptName }}
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="项目编码">
							{{ state.ruleForm.deptNo }}
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<div class="line"></div>
					</el-col>

					<el-col :span="12">
						<el-form-item label="减项原因" prop="leaveReason">
							<el-select placeholder="请选择" v-model="state.ruleForm.leaveReason" style="width: 100%">
								<el-option
									v-for="(label, value) in state.leaveReasonDataSource"
									:key="'leaveReasonDataSource' + value"
									:label="label"
									:value="value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="同步减档" prop="isLeaveEmployee">
							<el-select placeholder="请选择" v-model="state.ruleForm.isLeaveEmployee" style="width: 100%">
								<el-option value="1" label="是"></el-option>
								<el-option value="0" label="否"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="减项备注" prop="leaveRemark">
							<el-input type="textarea" v-model="state.ruleForm.leaveRemark" placeholder="请输入减项备注" maxlength="200" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="">
							<div class="tips">
								<el-icon><InfoFilled /></el-icon>
								<span style="vertical-align: text-bottom">减项后，人员将无法在该项目下开展任何服务，请谨慎操作！</span>
							</div>
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

<script setup name="reduceSubjectDialog">
import { ElMessage } from 'element-plus';
import { InfoFilled } from '@element-plus/icons-vue';
import { getDictByItemTypes } from '/@/utils/utils.js';
import { deleteEmpProject } from '/@/api/subject.js';

const formRef = ref(null);

const emits = defineEmits(['ok']);

const state = reactive({
	isShowDialog: false,
	loading: false,
	leaveReasonDataSource: {},
	ruleForm: {
		empId: null,
		id: null,
		empName: null,
		empIdcard: null,
		deptName: null,
		deptNo: null,
		leaveReason: null,
		leaveRemark: null,
		isLeaveEmployee: null,
	},
	info: null,
});

const rules = reactive({
	leaveReason: [{ required: true, message: '请选择减项原因', trigger: 'change' }],
	isLeaveEmployee: [{ required: true, message: '请选择是否同步减档', trigger: 'change' }],
});

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
};

const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
				state.loading = true;
				deleteEmpProject(state.ruleForm).then((res) => {
					if (res.code === 200) {
						if (state.ruleForm.isLeaveEmployee === 1) {
							ElMessage.success('减项减档成功');
						} else {
							ElMessage.success(res.msg || '减项成功，项目状态已更新为“已减项”');
						}
						emits('ok');
						closeDialog();
					} else {
						ElMessage.error(res.msg);
					}
				}).finally(() => {
					state.loading = false;
				});
			}
		});
};

// 打开弹窗
const openDialog = async (data) => {
	state.ruleForm = data;
	state.ruleForm.leaveReason = null;
	state.ruleForm.leaveRemark = null;
	state.ruleForm.isLeaveEmployee = null;
	// state.ruleForm = {
	// 	empId: data.empId,
	// 	id: data.id,
	// 	empName: data.empName,
	// 	empIdcard: data.empIdcard,
	// 	deptName: data.deptName,
	// 	deptNo: data.deptNo,
	// 	leaveReason: null,
	// 	leaveRemark: null,
	// 	isLeaveEmployee: null,
	// };
	state.isShowDialog = true;

	if (!state.leaveReasonDataSource || Object.keys(state.leaveReasonDataSource).length === 0) {
		getDictByItemTypes('social_reduce_reason').then((res) => {
			// console.log('获取减项原因：', res);
			state.leaveReasonDataSource = res;
		});
	}
};

onMounted(() => {
	getDictByItemTypes('social_reduce_reason').then((res) => {
		// console.log('获取减项原因：', res);
		state.leaveReasonDataSource = res;
	});
});

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/reduceSubjectDialog.scss">
</style>
