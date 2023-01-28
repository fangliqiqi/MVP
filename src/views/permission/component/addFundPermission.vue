<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false"  width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :span='24'>
						<el-form-item label="员工姓名" prop="userId">
							<page-select
								ref="pageSelectRef"
								v-model="state.ruleForm.userId"
								:request="request"
								value-key="userId"
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
						<el-form-item label="公积金户" prop="fundHousehold">
              <page-select
                ref="pageSelectRef"
                v-model="state.ruleForm.fundHousehold"
                :request="requestHu"
                value-key="name"
                title="name"
                search="name"
								:ext="{ type: 1}"
                placeholder="请选择公积金户"
                :options="state.fundHouseholdOptions"
								@change="onChangeFundHousehold"
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

<script setup name="addFundPermission">
import PageSelect from '/@/components/PageSelect/index.vue';
import { ElMessage } from 'element-plus';
import { getUserList} from '/@/api/permission/contractPermission';
import { getHuConfigList} from '/@/api/socialfund/socialfundSet';
import {addSocialFundPerssion } from '/@/api/permission/socialAndFundCheckPermission';

const formRef = ref(null);
const pageSelectRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	loading: false,
	title: '公积金办理权限新增',
	userOptions: [],
	fundHouseholdOptions: [],
	ruleForm: {
		userId: null,
		userName: null,
		userDeptName: null,
		deptName: null,
		fundHousehold: null,
		flag: 1,
		houseNameType: 1,
		status:0,
		authType: 1,
	},
});

const rules = {
	userId: [
		{ required: true, message: '请选择员工', trigger: 'change' },
	],
	deptName: [
		{ required: true, message: '请选择', trigger: 'change' },
	],
	fundHousehold: [
		{ required: true, message: '请选择公积金户', trigger: 'change' },
	],
	
};

// 打开弹窗
const openDialog = async (row) => {
  state.isShowDialog = true;
	state.loading = false;
	
};

// 获取员工列表
const request = async (params) => {
	try {
		params.fileStatus=0
		const res = await getUserList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		}else{
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
// 获取户配置列表
const requestHu = async (params) => {
	try {
		const res = await getHuConfigList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		}else{
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
const onChangeEmp = (val) =>{
	state.ruleForm.userName = val.nickname
	state.ruleForm.userDeptName = val.deptName
	state.ruleForm.deptName = val.deptName
	state.userOptions = [val]
}
// 选择公积金户
const onChangeFundHousehold = (val) =>{
	// state.ruleForm.fundHousehold = val.name
	state.fundHouseholdOptions = [val]
}

// 关闭弹窗
const closeDialog = () => {
	formRef.value&&formRef.value.resetFields();
	state.ruleForm = {
		userId: null,
		userName: null,
		userDeptName: null,
		deptName: null,
		fundHousehold: null,
		flag: 1,
		houseNameType: 1,
		status:0,
		authType: 1,
	};
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
				// console.log(state.ruleForm);
					// 新增操作
        addSocialFundPerssion(state.ruleForm).then(
          (res) => {
            if (res && res.code == 200) {
              ElMessage.success('新增公积金办理权限成功');
              emits('ok');
              closeDialog(); // 关闭弹窗
            } else {
              ElMessage.error(res.msg || '新增公积金办理权限失败');
            }
          },
          () => {
            ElMessage.error('新增公积金办理权限失败');
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
