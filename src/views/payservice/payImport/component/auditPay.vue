<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :span="24">
						<el-form-item label="是否通过" prop="auditFlag">
							<el-radio-group v-model="state.ruleForm.auditFlag" >
                <el-radio  key="0" label="0">通过</el-radio>
                <el-radio  key="1" label="1">不通过</el-radio>
              </el-radio-group>
						</el-form-item>
					</el-col>
          <el-col :span="24">
						<el-form-item label="审核意见" prop="auditRemark">
							<el-input 
                v-model="state.ruleForm.auditRemark"
                type="textarea" 
                :rows="2"  
                placeholder="请输入审核意见" 
                :maxlength="200" 
                show-word-limit 
                :autosize="{ minRows: 2, maxRows: 4 }"
              >
              </el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default" :loading="state.loading">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import {payImportAudit} from '/@/api/payservice/payimport'

const formRef = ref(null);

const state = reactive({
	isShowDialog: false,
  loading: false,
	title: '审核',
	ruleForm: {
    id:null,
    auditFlag:'0',
    auditRemark:null,
  },
});


const rules = computed(()=>{
  const auditFlag = {
    auditFlag: [
      { required: true, message: '请选择是否通过', trigger: 'change' },
    ],
  };
  setTimeout(()=>{
    formRef.value.resetFields(['auditRemark']);
  },10)
  if(state.ruleForm.auditFlag == '1'){
    return {
      ...auditFlag,
      auditRemark: [
        { required: true, message: '请输入审核意见', trigger: 'change' },
      ],
    }
  }else{
    return {
      ...auditFlag,
      auditRemark: [
        { required: false, message: '请输入审核意见', trigger: 'change' },
      ],
    }
  }
})

// 打开弹窗
const openDialog = (row) => {
	if (row) {
		state.ruleForm.id= row.id;
    state.ruleForm.auditFlag= '0';
		state.isShowDialog = true;
	} 
};


// 关闭弹窗
const closeDialog = () => {
	formRef.value.resetFields();
	state.ruleForm= {};
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
      // 校验通过
      state.loading = true;
      payImportAudit(state.ruleForm).then(res => {
        if (res && res.code == 200) {
          ElMessage.success(res.msg||'审核成功');
          emits('ok');
          closeDialog();
        } else {
          state.loading = false;
          ElMessage.error(res.msg || '审核失败');
        }
      }).catch(e => {
        console.log('get exception:', e);
        state.loading = false;
        ElMessage.error('审核失败');
      }).finally(()=>{
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
