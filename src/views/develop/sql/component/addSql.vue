<template>
	<div class="system-add-sql-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="550px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" size="default" label-width="80px" :rules="rules">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="名称" prop="name">
							<el-input placeholder="请输入名称" v-model="state.ruleForm.name" clearable />
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="jdbcUrl" prop="url">
                            <el-input v-model="state.ruleForm.url" type="textarea" placeholder="请输入备注信息" maxlength="255"></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="用户名" prop="username">
							<el-input v-model="state.ruleForm.username" placeholder="请输入用户名" maxlength="100" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="密码" prop="password">
							<el-input v-model="state.ruleForm.password" maxlength="50" placeholder="请输入密码" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="systemAddSql">
import { addDataSource, updateDataSource } from '/@/api/sql';
import { ElMessage } from 'element-plus';

const formRef = ref(null);

const state = reactive({
	isShowDialog: false,
	title: '新增数据源',
	id: null,
	ruleForm: {
		name: '',
		url: '',
		username: '',
		password: '',
	},
});

const rules = reactive({
	name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
	url: [{ required: true, message: '请输入jdbcUrl', trigger: 'blur' }],
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

// 打开弹窗
const openDialog = async (data) => {
	if (data) {
		// 编辑菜单
		state.title = '编辑数据源';
		state.id = data.id;
		state.ruleForm = data;
	} else {
		state.title = '新增数据源';
		state.id = null;
		state.ruleForm = {
			name: '',
			url: '',
			username: '',
			password: '',
		};
	}
	state.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
};

// 取消
const onCancel = () => {
	closeDialog();
};
// 新增
const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
				if (state.id !== null && state.id !== undefined) {
					// 编辑
				updateDataSource(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('编辑数据源成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '编辑数据源失败');
							}
						},
						() => {
							ElMessage.error('编辑数据源单失败');
						}
					);
				} else {
					// 新增
					addDataSource(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('新增数据源成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '新增数据源失败');
							}
						},
						() => {
							ElMessage.error('新增数据源失败');
						}
					);
				}
			}
		});
};

// 暴露变量
defineExpose({
	openDialog,
});

const emits = defineEmits(['ok']);
</script>

<style lang="scss" scoped>
.system-add-sql-container {
	.mb20 {
		margin-bottom: 0px !important;
	}
}
</style>
