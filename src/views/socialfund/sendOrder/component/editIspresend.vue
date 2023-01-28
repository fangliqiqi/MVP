<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="576px" :close-on-click-modal="false" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :soan="24">
						<el-form-item label="取消原因" prop="cancelRemark">
							<el-input type="textarea"  v-model="state.ruleForm.cancelRemark" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入取消原因" show-word-limit maxlength="200" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading="state.loading" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="editIspresend">
import { editPreBydispatchFlag} from '/@/api/socialfund/presendorder';
import { ElMessage } from 'element-plus';


const formRef = ref(null);

const state = reactive({
	isShowDialog: false,
	loading: false,
	id: null, // 编辑时存在
	title: '取消派单',
	ruleForm: {
		id:'',
    dispatchFlag: '',
    cancelRemark: '',
	},
});

const rules = {
	cancelRemark: [
    { required: true, message: '请输入取消原因', trigger: 'blur' },
  ],
}


// 打开弹窗
const openDialog = async (row) => {
	if (row && row.id) {
		state.ruleForm.id = row.id;
    state.ruleForm.dispatchFlag = '1';
    state.isShowDialog = true;
	} 
};


// 关闭弹窗
const closeDialog = () => {
	formRef.value.resetFields();
	formRef.value.clearValidate()
	state.ruleForm= {}
	state.isShowDialog = false;
	state.loading = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};

const emits = defineEmits(['ok']);

// 保存
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // console.log(state.ruleForm);
			state.loading = true;
      editPreBydispatchFlag(state.ruleForm).then(
        (res) => {
          if (res && res.code == 200) {
            ElMessage.success('取消派单成功');
            emits('ok');
            closeDialog();
          } else {
            ElMessage.error(res.msg || '取消派单失败');
          }
        },
        () => {
          ElMessage.error('取消派单失败');
        }).finally(() => {
					state.loading = false;
				});
      } 
  });
};


// 暴露变量
defineExpose({
	openDialog,
});

</script>
<style lang="scss" scoped>


</style>
<style>
	/* .uploadList .el-upload-list__item.is-success:focus:not(:hover){
  	display: none !important;
	} */
@import './css/editIspresend.scss'
</style>