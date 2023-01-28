<template>
	<div class="system-add-role-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="760px" destroy-on-close	@close="onCancel">
			<el-form :model="state.ruleForm" ref="ruleForm" :rules="rules" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="24" >
						<el-form-item label="角色名称" prop="roleName">
							<el-input v-model="state.ruleForm.roleName" placeholder="请输入角色名称" maxlength="64" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="24" >
						<el-form-item label="角色标识" prop="roleCode">
							<el-input v-model="state.ruleForm.roleCode" :disabled="state.ruleForm.roleId?true:false" maxlength="64"  placeholder="请输入角色标识" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
						<el-form-item label="角色描述" prop="roleDesc">
							<el-input 
								v-model="state.ruleForm.roleDesc" 
								type="textarea" 
								show-word-limit  
								:autosize="{minRows: 2, maxRows: 6}"
								maxlength="255"
								placeholder="请输入角色描述" 
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading="isShowLoading" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="systemAddRole">
import {addRole,updateRole} from '@/api/role'
import { ElMessage } from 'element-plus';

const ruleForm = ref(null)

const state = reactive({
	isShowDialog: false,
	title:'新增角色',
	ruleForm: {
		roleName: '', // 角色名称
		roleCode: '', // 角色标识
		roleDesc: '', // 角色描述
		createTime:''
	},
});

// 表单校验
const rules = reactive({
	roleName: [
		{ required: true, message: '请输入角色名称', trigger: 'blur' },
		{ max: 64, message: '长度在64个字符以内', trigger: 'blur' },
	],
	roleCode: [
		{ required: true, message: '请输入角色标识', trigger: 'blur' },
		{ max: 64, message: '长度在64个字符以内', trigger: 'blur' },
	],
	roleDesc: [
		{ max: 255, message: '长度在 255个字符以内', trigger: 'blur' },
	]
})

// 打开弹窗
const openDialog = (row) => {
	state.isShowDialog = true;
	state.ruleForm = row?row:{};
	state.title = row?'编辑角色':'新增角色'
};

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
	state.ruleForm = {};
	ruleForm.value.resetFields();
};

// 取消
const onCancel = () => {
	closeDialog();
};

const emits = defineEmits([
	'ok',
]);
const isShowLoading = ref(false)
// 新增
const onSubmit = () => {
	ruleForm.value.validate(valid => {
		if (valid) {
			isShowLoading.value = true
			if(state.ruleForm.roleId){
				// 编辑
				updateRole(state.ruleForm).then(res => {
					if (res.code === 200) {
						ElMessage.success('角色编辑成功');
						closeDialog();
						// 新增成功后，重新查询
						emits('ok');
						
					}else{
						ElMessage.error(res.msg);
					}
				}).catch(()=>{
					ElMessage.error('角色编辑失败');
				}).finally(()=>{
					isShowLoading.value = false
				})
			}else{
				addRole(state.ruleForm).then(res => {
					if (res.code === 200) {
						ElMessage.success('角色新增成功');
						closeDialog();
						// 新增成功后，重新查询
						emits('ok');
					}else{
						ElMessage.error(res.msg);
					}
				}).catch(()=>{
					ElMessage.error('角色新增失败');
				}).finally(()=>{
					isShowLoading.value = false
				})
			}
		}
	});
};


// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style scoped lang="scss" src="./css/addRole.scss">

</style>
