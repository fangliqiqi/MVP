<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog"  :close-on-click-modal="false"  width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :span='24'>
						<el-form-item label="员工姓名" prop="nickname">
							<page-select
								ref="pageSelectRef"
								v-model="state.ruleForm.nickname"
								:request="request"
								value-key="nickname"
								title="nickname"
								search="nickname"
								placeholder="请选择员工"
								:options="state.userOptions"
								@change="onChangeEmp"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="所在部门" prop="deptName">
							<el-input v-model="state.ruleForm.deptName" placeholder="所在部门" disabled ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="社保户" prop="name">
              <page-select
                ref="pageSelectRef"
                v-model="state.ruleForm.name"
                :request="requestHouseList"
                value-key="id"
								title="name"
								search="name"
                placeholder="请选择户信息"
								:options="state.houseOptions"
								@change="onChangeHoueses"
              />
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

<script setup name="addSocialHandlePermission">

import { getUserList} from '/@/api/permission/contractPermission';
import { addSocialFundPerssion,getHuConfigList } from '/@/api/permission/socialHandlePermission';
import PageSelect from '/@/components/PageSelect/index.vue';
import { ElMessage } from 'element-plus';
import { debounce_Input } from '/@/utils/utils';
const formRef = ref(null);
const pageSelectRef = ref(null);
const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	loading: false,
	title: '社保权限新增',
	ruleForm: {
		type:'',
		status:"0",  // 0 启用 1禁用
	},
	userOptions: [],
	houseOptions: [],
	houseNameType:'社保户',  
});
const rules = {
	nickname: [{ required: true, message: '请输入员工姓名' ,trigger: 'change'}],
	deptName: [{ required: true, message: '所在部门不能为空',trigger: 'change'}],
	name: [{ required: true, message: '请输入户信息',trigger: 'change'  }],
};
// 打开弹窗
const openDialog = async (row) => {
  state.isShowDialog = true;
	state.loading = false;
};

// 获取员工列表
const request = async (params) => {
	try {
		const res = await getUserList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		} else {
			ElMessage.error(res.msg);
		}
	} catch (e) {
		console.log('get exception:', e);
	}
	return {
		current: 1,
		total: 0,
		data: [],
	};
};
// 选择员工
const onChangeEmp = (value) =>{
			state.ruleForm.userId = value.userId
			state.ruleForm.userName = value.nickname
			state.ruleForm.userDeptName = value.deptName
			state.ruleForm.deptName = value.deptName
			state.userOptions = [value]
}
// 选择户信息
const onChangeHoueses = (value) =>{
	state.ruleForm.socialHousehold = value.name
	state.houseOptions = [value]
}

// 获取户列表
const requestHouseList = async (params) => {
	try {
			params = Object.assign({},{type:0},params)
		const res = await getHuConfigList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		} else {
			ElMessage.error(res.msg);
		}
	} catch (e) {
		console.log('get exception:', e);
	}
	return {
		current: 1,
		total: 0,
		data: [],
	};
};

// 关闭弹窗
const closeDialog = () => {
	formRef.value&&formRef.value.resetFields();
	state.ruleForm = {};
	state.isShowDialog = false;
	state.id = null;
	state.loading = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};

const emits = defineEmits(['ok']);
// 新增
const onSubmit = () => {
	if (formRef.value){
		formRef.value.validate((valid) => {
			if (valid) {
				state.loading = true;
				let {deptName,flag,name,nickname,type,...otherkey} = state.ruleForm
				let obj = {
					flag:0,
					houseNameType:0,
					authType:1
				}
				console.log(state.ruleForm)

				let newData = Object.assign({},obj,otherkey)	
        addSocialFundPerssion(newData).then(
          (res) => {
            if (res && res.code == 200) {
              ElMessage.success('新增社保办理权限成功');
              emits('ok');
              closeDialog(); // 关闭弹窗
            } else {
              ElMessage.error(res.msg || '新增社保办理权限失败');
            }
          },
          () => {
            ElMessage.error('新增社保办理权限失败');
          }
        ).finally(() => {
          state.loading = false;
        });
			}
		});
  }
};


// 暴露变量
defineExpose({
	openDialog,
});

</script>
