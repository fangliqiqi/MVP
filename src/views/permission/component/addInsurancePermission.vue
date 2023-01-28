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
								:options="state.options"
								@change="onChangeEmp"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="所在部门" prop="organName">
							<el-input v-model="state.ruleForm.organName" placeholder="所在部门" disabled ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="办理地" prop="province">
              <page-area 
                ref="pageAreaRef"
                :address="state.address"
                @current-change="changeAddress"
                @clear="clearAddress"
								:hasTown="false"
                style="width:100%"
              ></page-area>
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

<script setup name="addInsurancePermission">
import PageSelect from '/@/components/PageSelect/index.vue';
import pageArea from '/@/components/PageArea/index.vue'
import { ElMessage } from 'element-plus';
import { getUserList,} from '/@/api/permission/contractPermission';
import { addInsurancePer } from '/@/api/permission/insurancePermission';

const formRef = ref(null);
const pageSelectRef = ref(null);
const pageAreaRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	loading: false,
	title: '商险办理权限新增',
	address:null,
	options: [],
	ruleForm: {
		userId:null,
		userName:null,
		organName:null,
		province:null,
		city:null,
		status:0,
	},
});

const rules = {
	userId: [
		{ required: true, message: '请选择员工', trigger: 'change' },
	],
	organName: [
		{ required: true, message: '请选择所在部门', trigger: 'change' },
	],
	province: [
		{ required: true, message: '请选择办理地', trigger: 'change' },
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


// 选择员工
const onChangeEmp = (val) =>{
	// console.log(val);
	state.ruleForm.organName = val.deptName
	state.ruleForm.userName = val.nickname
	state.options = [val]
	
}
// 缴纳地
const changeAddress = (val) => {
	state.ruleForm.province = val.pro;
	state.ruleForm.city = val.city;
  state.address = val.city||val.pro;
}
const clearAddress = (val) => {
	state.ruleForm.province = null;
	state.ruleForm.city = null;
	state.address = null;
}


// 关闭弹窗
const closeDialog = () => {
	formRef.value&&formRef.value.resetFields();
	state.ruleForm = {
		userId:null,
		userName:null,
		organName:null,
		province:null,
		city:null,
		status:0,
	};
	state.address = null;
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
					// 新增操作
        addInsurancePer(state.ruleForm).then(
          (res) => {
            if (res && res.code == 200) {
              ElMessage.success('新增商险办理权限成功');
              emits('ok');
              closeDialog(); // 关闭弹窗
            } else {
              ElMessage.error(res.msg || '新增商险办理权限失败');
            }
          },
          () => {
            ElMessage.error('新增商险办理权限失败');
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
