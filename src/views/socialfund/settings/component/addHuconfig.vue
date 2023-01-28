<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="账户性质" prop="type">
							<el-select 
								v-model="state.ruleForm.type"
								style="width:100%"
								:disabled="state.id?true:false"
							>
								<el-option 
									v-for="(item,key) in state.dictOptions['nature_account']"
								 	:key="key"
									:label="item" 
									:value="key"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" >
						<el-form-item label="户名" prop="name">
							<el-input  v-model="state.ruleForm.name" placeholder="请输入户名" :disabled="state.id?true:false" maxlength="50"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="12">
						<el-form-item label="缴纳地" prop="province">
              <page-area 
                ref="pageAreaRef"
                :address="state.address"
                @current-change="changeAddress"
                @clear="clearAddress"
								:disabled="state.id?true:false"
                style="width:100%"
              ></page-area>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属机构" prop="organId">
							<el-select 
								v-model="state.ruleForm.organId"
								style="width:100%"
								placeholder="请选择所属机构"
							>
								<el-option 
									v-for="(item,key) in state.dictOptions['dept_config_type']"
								 	:key="key"
									:label="item" 
									:value="key"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" >
						<el-form-item label="审核人" prop="auditUser">
							<page-select
								ref="pageSelectRef"
								v-model="state.ruleForm.auditUserName"
								:request="request"
								value-key="nickname"
								title="nickname"
								search="nickname"
								placeholder="请选择审核人"
								@change="onChangeAuditUser"
								:options="state.auditUserOptions"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="12" >
						<el-form-item label="办理人" prop="handleUser">
							<page-select
								ref="pageSelectRef"
								v-model="state.ruleForm.handleUserName"
								:request="requestHandle"
								value-key="nickname"
								title="nickname"
								search="nickname"
								placeholder="请选择办理人"
								:options="state.handleUserOptions" 
								@change="onChangeHandleUser"
							/>
						</el-form-item>
					</el-col>
					<el-col :md="24" :lg="24"  :xl="24">
						<el-form-item label="备注" prop="rmark">
							<el-input type="textarea"  v-model="state.ruleForm.rmark" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入备注" show-word-limit maxlength="200" clearable></el-input>
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

<script setup name="addHuconfig">
import pageArea from '/@/components/PageArea/index.vue'
import { getDictByItemTypes } from '/@/utils/utils';
import {addHuConfig,editHuConfig} from '@/api/socialfund/socialfundSet'
import { ElMessage } from 'element-plus';
import PageSelect from '/@/components/PageSelect/index.vue';
import { getUserList} from '/@/api/permission/contractPermission';
const formRef = ref(null);
const pageAreaRef = ref(null);

const state = reactive({
	isShowDialog: false,
	loading: false,
	id: null, // 编辑时存在
	title: '户新增',
	ruleForm: {
		type: '',
		name: '',
		province:'',
		city:'',
		town:'',
		organId: '',
		rmark: '',

		auditUser:'',
		handleUser:'',
		auditUserName:'',
		handleUserName:'',
	
	},
	handleUserOptions:[],
	auditUserOptions:[],
	
	address:null, //地址回显
	dictKeys:[   //字典
		'nature_account',//账户性质
		'dept_config_type',//机构
	],
	dictOptions:{ 
		nature_account:null,
		dept_config_type:null,
	}
});
const rules = {
		type: [{ required: true, message: '请选择账户性质', trigger: 'change' }],
		name: [{ required: true, message: '请输入户名', trigger: 'blur' }],
		province:[{ required: true, message: '请选择缴纳地', trigger: 'change' }],
		organId: [{ required: true, message: '请选择所属机构', trigger: 'change' }],
		auditUser: [{ required: true, message: '请选择审核人', trigger: 'change' }],
		handleUser: [{ required: true, message: '请选择办理人', trigger: 'change' }],
}


// 缴纳地
const changeAddress = (val,label) => {
	state.ruleForm.province = val.pro;
	state.ruleForm.city = val.city;
	state.ruleForm.town = val.town;
	// state.address = label;
	state.address = val.town||val.city||val.pro;
}
const clearAddress = (val) => {
	state.ruleForm.province = null;
	state.ruleForm.city = null;
	state.ruleForm.town = null;
	state.address = null;
}
// 获取办理人人列表
const requestHandle = async (params) => {
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
// 打开弹窗
const openDialog = async (row) => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	if (row && row.id) {
			// 编辑
			state.title = '户编辑';
			state.id = row.id;
			state.ruleForm = row;
			state.address = row.town||row.city||row.province ;
			state.address = state.address?Number(state.address):null
			state.isShowDialog = true;
			state.auditUserOptions = [{nickname: row.auditUserName}];
			state.handleUserOptions = [{nickname: row.handleUserName}];
	} else {
		// 新增
		setTimeout(()=>{
			pageAreaRef.value.initParams();
		},50)
		state.title = '户新增';
		state.id = null;
		state.address = null;
		state.isShowDialog = true;
	}
};
// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.ruleForm= {
		type: '',
		name: '',
		province:'',
		city:'',
		town:'',
		organId: '',
		rmark: '',
	};
	state.address = null;
	state.isShowDialog = false;
	state.loading = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};

const emits = defineEmits(['ok']);
// 获取审核人列表
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

// 选择审核人
const onChangeAuditUser = (value) =>{
		state.ruleForm.auditUser=value.userId
		state.ruleForm.auditUserName=value.nickname
		state.ruleForm.auditUserDeptName=value.deptName
}
// 选择办理人
const onChangeHandleUser = (value) =>{
		state.ruleForm.handleUser=value.userId
		state.ruleForm.handleUserName=value.nickname
		state.ruleForm.handleUserDeptName=value.deptName
}
// 保存
const onSubmit = () => {
		formRef.value.validate((valid) => {
			if (valid) {
				if(state.ruleForm.type==0&&!state.ruleForm.city){
					ElMessage.error('社保户请选择省以下缴纳地！');
					return;
				}
				state.loading = true;
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					editHuConfig(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('编辑户配置成功');
								emits('ok');
								closeDialog();
							} else {
								ElMessage.error(res.msg || '编辑户配置失败');
							}
						},
						() => {
							ElMessage.error('编辑户配置失败');
						}
					).finally(() => {
						state.loading = false;
					});
				} else {
					// 新增操作
					addHuConfig(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('新增户配置成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '新增户配置失败');
							}
						},
						(e) => {
							const msg = (e && e.msg) ||'新增户配置失败';
							ElMessage.error(msg);
						}
					).finally(() => {
						state.loading = false;
					});
				}
			}
		});
};
// 字典获取
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.dictOptions = res
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

onMounted(()=>{

	loadDicts()
})

// 暴露变量
defineExpose({
	openDialog,
});

</script>
<style lang="scss" scoped>


</style>
