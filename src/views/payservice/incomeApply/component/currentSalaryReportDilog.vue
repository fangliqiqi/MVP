<template>
	<div class="archives-add-electronic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="576px" @close="closeDialog" :close-on-click-modal="false">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="140px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="申报月份"  prop="settleMonth">
										<el-date-picker
											v-model="state.ruleForm.settleMonth"
											type="month"
											placeholder="请选择申报月份"
											style="width: 100%;"
											format="YYYYMM"
											value-format="YYYYMM"
											:disabled-date="state.pickerOptions.disabledDate"
											></el-date-picker>
						</el-form-item>
					</el-col>
					 <el-col>
							<el-form-item>
								<span class="tips" style="color:var(--el-color-danger)">由于数据量庞大，请避开正常作业时间，同时在点击 ‘确认刷新’ 按钮后系统会自动在后台运行刷新动作</span>
							</el-form-item>
          </el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading="isLoadIng" size="default">确 定 刷 新</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="currentsalaryreportdilog">
import { ElMessage } from 'element-plus';
import { cuerrentSalaryRefresh } from '/@/api/payservice/currentSalaryReport';
const formRef = ref(null);
const isLoadIng=ref(false) 
const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '手动刷新',
	ruleForm: {
		settleMonth:null
	},
	fileList: [],
	literatureTypesDataSource: {},
	options: [],
	pickerOptions:{
				disabledDate: (current) => {
					return current && current.valueOf() > Date.now();
				},
			},
});
const rules = {
	settleMonth: [{ required: true, message: '请选择月份' }],
};
// 打开弹窗
const openDialog = async (data) => {
		// 新增
		state.title = '手动刷新';
		state.ruleForm = {
			settleMonth:null
		};
		setTimeout(() => {
			if (formRef.value) {
				formRef.value.clearValidate();
			}
		}, 100);
	  state.isShowDialog = true;
  }
// 关闭弹窗
const closeDialog = () => {
	state.ruleForm = {};
	state.isShowDialog = false;
	if (formRef.value) {
		formRef.value.clearValidate();
	}
};
// 取消
const onCancel = () => {
	isLoadIng.value = false
	closeDialog();
};

//确认刷新
const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			console.log(valid)
			if (valid) {
					isLoadIng.value = true
					// 删除操作
					cuerrentSalaryRefresh(state.ruleForm)
						.then(
							(res) => {
								if (res && res.code == 200) {
									emits('ok');
									closeDialog(); // 关闭弹窗
										ElMessage.success(res.msg || '刷新成功，请稍后查看');
								} else {
									ElMessage.error(res.msg || '刷新失败');
								}
							},
							() => {
								ElMessage.error('刷新失败');
							}
						)
						.finally((res) => {
								isLoadIng.value = false
						});
				}
		});
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>
<style lang="scss" scoped src="./css/comm.scss">

</style>
