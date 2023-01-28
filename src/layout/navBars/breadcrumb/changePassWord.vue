<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :span="24">
						<el-form-item label="旧密码" prop="oldPassword">
              <el-input 
                v-model.trim="state.ruleForm.oldPassword"
                type="password" 
                placeholder="请输入旧密码" 
                :maxlength="20"
                show-password
              >
              </el-input>
						</el-form-item>
					</el-col>
          <el-col :span="24">
            <el-form-item label="新密码" prop="newPassword">
              <el-input 
                v-model.trim="state.ruleForm.newPassword" 
                type="password" 
                placeholder="请输入新密码" 
                :maxlength="20" 
                show-password
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="verifynewPassword">
              <el-input 
                v-model.trim="state.ruleForm.verifynewPassword" 
                type="password" 
                placeholder="请再次输入新密码" 
                :maxlength="20"
                show-password
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
import {updatePassword} from '/@/api/login/index'
import {verifyPasswordMvp} from '/@/utils/toolsValidate'

const formRef = ref(null);

const state = reactive({
	isShowDialog: false,
  loading: false,
	title: '修改密码',
	ruleForm: {
    userId: '',
    userName: '',
    oldPassword: '',
    newPassword: '',
    verifynewPassword: '',
  },
});

const rules = reactive({
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    // 旧密码不正确
    { validator: (rule, value, callback) => {
      if (verifyPasswordMvp(value)) {
        callback(new Error(verifyPasswordMvp(value)));
      } else {
        callback();
      }
    }, trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    // 新密码不正确
    { validator: (rule, value, callback) => {
      if (verifyPasswordMvp(value)) {
        callback(new Error(verifyPasswordMvp(value)));
      } else {
        callback();
      }
    }, trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === state.ruleForm.oldPassword) {
          callback(new Error('新密码不能与旧密码相同！'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    }
  ],
  verifynewPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    // 两次密码不一致
    { validator: (rule, value, callback) => {
      if (value !== state.ruleForm.newPassword) {
        callback(new Error('两次密码不一致！'));
      } else {
        callback();
      }
    }, trigger: 'blur' },
  ],
});

// 打开弹窗
const openDialog = async (row) => {
	if (row) {
		state.ruleForm.userId = row.id;
    state.ruleForm.userName = row.username;
		state.isShowDialog = true;
	} 
};


// 关闭弹窗
const closeDialog = () => {
	formRef.value.resetFields();
	state.ruleForm= {
    userId: '',
    userName: '',
    oldPassword: '',
    newPassword: '',
    verifynewPassword: '',
  };
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
      // console.log(state.ruleForm);
      const data = {
        userId: state.ruleForm.userId,
        userName: state.ruleForm.userName,
        oldPassword: state.ruleForm.oldPassword,
        newPassword: state.ruleForm.newPassword,
      }
      updatePassword(data).then(res => {
        if (res && res.code == 200) {
          ElMessage.success(res.msg||'修改成功');
          emits('ok');
          closeDialog();
        } else {
          state.loading = false;
          ElMessage.error(res.msg || '修改失败');
        }
      }).catch(e => {
        console.log('get exception:', e);
        state.loading = false;
        ElMessage.error('修改失败');
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
