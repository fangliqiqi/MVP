<template>
	<div class="system-add-user-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="769px" 	@close="onCancel" :close-on-click-modal="false">
			<el-form  :model="state.ruleForm" ref="ruleForm" :rules="rules" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="姓名" prop="nickname">
							<el-input v-model="state.ruleForm.nickname" disabled ></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="用户名" prop="username">
							<el-input v-model="state.ruleForm.username" disabled ></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="所属部门" prop="deptId">
							<el-tree-select 
								placeholder="请选择所属部门"
								v-model="state.ruleForm.deptId" 
								:data="state.deptData" 
								disabled
								check-strictly
								clearable
								filterable
								class="w100"
							/>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="state.ruleForm.phone" placeholder="请输入手机号" disabled clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="state.ruleForm.email" placeholder="请输入邮箱" disabled clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<el-form-item label="角色" prop="roleList">
							<el-select v-model="state.ruleForm.roleList" 
								placeholder="请选择" 
								multiple 
								clearable
								filterable
								collapse-tags
      					collapse-tags-tooltip 
								class="w100">
								<el-option v-for="item in state.roleLists" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="职务" prop="post">
							<el-select v-model="state.ruleForm.post" placeholder="请选择"  clearable class="w100">
								<el-option v-for="item in state.postTypeOptions" :key="item.id" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="用户组" prop="userGroup">
							<el-select v-model="state.ruleForm.userGroup" placeholder="请选择"  clearable class="w100">
								<el-option v-for="item in state.userGroupOptions" :key="item.id" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="状态" prop="lockFlag">
						<el-radio-group v-model="state.ruleForm.lockFlag">
							<el-radio label="0" >有效</el-radio>
							<el-radio label="9" >锁定</el-radio>
						</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" :loading="isShowLoading" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="systemEditUser">
import {updateUser} from '@/api/user'
import {getRoleList} from '@/api/role'
import {getDeptList} from '@/api/dept'
import { ElMessage } from 'element-plus';

const state = reactive({
	isShowDialog: false,
	title:'编辑用户',
	ruleForm: {
		username: '', // 账户名称
		deptId:'', // 部门
		phone: '', // 手机号
		roleList:[], // 角色
		email: '', // 邮箱
		post: '', // 职务
		group: '', // 用户组
		lockFlag:'1', // 用户状态
	},
	deptData:[],
	userGroupOptions:[],
	postTypeOptions:[],
	roleLists:[],
});
// 表单绑定
const ruleForm = ref(null);
// 表单校验
const rules = reactive({
		userGroup: [
			{ required: true, message: '请选择用户组', trigger: 'blur' },
		],
		roleList:[
			{ required: true, message: '请选择角色', trigger: 'blur' },
		],
		lockFlag:[
			{ required: true, message: '请选择用户状态', trigger: 'blur' },
		],
		post:[
			{ required: true, message: '请选择职务', trigger: 'blur' },
		]
});

// 打开弹窗
const openDialog = (row,data) => {
	state.ruleForm = row;
	state.ruleForm.roleList = state.ruleForm.roleList.map(item => {
		return item.roleId||item;
	});
	state.userGroupOptions = data.userGroupOptions;
	state.postTypeOptions = data.postTypeOptions;
	state.isShowDialog = true;
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

// 子组件事件
const emit = defineEmits(['ok'])
const isShowLoading  = ref(false)
// 保存
const onSubmit = () => {
	ruleForm.value.validate((valid) => {
		if (valid) {
			isShowLoading.value = true
			let data = {}
			data = state.ruleForm
			data.role = state.ruleForm.roleList.map(item=>{
				return item.roleId||item
			})
			updateUser(data).then(res => {
				if (res.code === 200) {
					closeDialog();
					emit('ok')
					ElMessage.success('编辑用户成功');
				}else{
					ElMessage.error(res.msg)
				}
			}).catch().finally(()=>{
				isShowLoading.value = false
			})
		}
	});
};

// 翻译部门树
const transformDept = (data) => {
	let result = [];
	data.forEach(item => {
		let obj = {};
		obj.label = item.name;
		obj.value = item.id;
		if (item.children) {
			obj.children = transformDept(item.children);
		}
		result.push(obj);
	});
	return result;
};

// 初始数据
const initConfigData = () => {
	// 获取角色
	getRoleList().then(res => {
		if (res.code === 200) {
			state.roleLists = res.data;
		}else{
			state.roleLists = []
			ElMessage.error(res.msg);
		}
	})
	// 获取部门
	getDeptList().then(res => {
		if (res.code === 200) {
			state.deptData =transformDept(res.data);
			console.log(state.deptData);
		}else{
			state.deptData = []
			ElMessage.error(res.msg);
		}
	})
}

// 页面加载时
onMounted(() => {
	initConfigData()
});

// 暴露变量
defineExpose({
	openDialog,
});

</script>

