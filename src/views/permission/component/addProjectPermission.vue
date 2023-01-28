<template>
	<div class="system-add-dic-container"> 
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false"  width="576px"   @close="closeDialog">
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
						<el-form-item label="项目名称" prop="id">
              <page-select
                ref="pageSelectRef"
                v-model="state.ruleForm.id"
                :request="requestProName"
                value-key="id"
								title="departName"
								search="departName"
                placeholder="请选择项目"
								:options="state.proOptions"
								@change="onChangeProName"
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

<script setup name="addProjectPermission">

import { getUserList} from '/@/api/permission/contractPermission';

import { getSysUserList,addProPerssion } from '/@/api/permission/projectPermission';
import { getSettleDomainList } from '/@/api/socialfund/fee';
import PageSelect from '/@/components/PageSelect/index.vue';
import { ElMessage } from 'element-plus';
const formRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	loading: false,
	title: '项目权限新增',
	ruleForm: {
		type:1
	},
	userOptions: [],
	proOptions: [],

});

const rules = {
	nickname: [{ required: true, message: '请输入员工姓名' ,trigger: 'change'}],
	deptName: [{ required: true, message: '所在部门不能为空',trigger: 'change'}],
	id: [{ required: true, message: '请输入项目名称',trigger: 'change'  }],
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
	state.ruleForm.deptName = value.deptName
	state.ruleForm.userId = value.userId
	state.ruleForm.userLoginName = value.username
	state.userOptions = [value]
}
// 选择项目名称
const onChangeProName = (value) =>{
	state.ruleForm.settleDomainName = value.departName
	state.ruleForm.settleDomainNo = value.departNo
	state.proOptions = [value]
}

// 获取结算主体列表
const requestProName = async (params) => {
	try {
	
		const res = await getSettleDomainList(Object.assign({},params,{flag:1}));
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
				// 校验通过
				state.loading = true;
				let {deptName,id,nickname,...otherkey} = state.ruleForm
				let obj = {
					userNickName:nickname,
					userDeptName:deptName,
					settleDomainId:id
				}
				let newData = Object.assign({},obj,otherkey)	
        addProPerssion(newData).then(
          (res) => {
            if (res && res.code == 200) {
              ElMessage.success('新增项目权限成功');
              emits('ok');
              closeDialog(); // 关闭弹窗
            } else {
              ElMessage.error(res.msg || '新增项目权限失败');
            }
          },
          () => {
            ElMessage.error('新增项目权限失败');
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
