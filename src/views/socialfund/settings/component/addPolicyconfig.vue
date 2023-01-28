<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="政策适应范围" prop="target">
						<el-radio-group v-model="state.ruleForm.target" >
							<el-radio 
								v-for="(item,key) in state.dictOptions.policy_config_scope" 
								:key="key" 
								:label="key">
							{{item}}
							</el-radio>
						</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12" >
						<el-form-item label="政策适应年份" prop="year">
							 <el-date-picker
								v-model="state.ruleForm.year"
								type="year"
								format="YYYY"
								value-format="YYYY"
								placeholder="适应年份"
								style="width: 100%;"
								@change="changeYear"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="12" >
						<el-form-item label="生效月份" prop="startMonth">
							 <el-date-picker
									v-model="state.month"
									type="monthrange"
									start-placeholder="开始月份"
									end-placeholder="结束月份"
									value-format="YYYYMM"
									format="YYYYMM"
									style="width: 100%;"
									@change="changeMonth"
									popper-class="month-picker"
									:default-value="defaultValue"
									:disabled="!state.ruleForm.year"
								/>
						</el-form-item>
					</el-col>
					
          <el-col :span="12">
						<el-form-item label="社保缴纳地" prop="province">
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
					<el-col :span="12">
						<el-form-item label="养老" prop="pension">
							<el-select v-model="state.ruleForm.pension" placeholder="请选择" style="width:100%">
								<el-option 
									v-for="(item,key) in state.dictOptions.policy_config_status"
									:key="key"
									:label="item"
									:value="key"
								>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="医疗" prop="medical">
							<el-select v-model="state.ruleForm.medical" placeholder="请选择" style="width:100%">
								<el-option 
									v-for="(item,key) in state.dictOptions.policy_config_status"
									:key="key"
									:label="item"
									:value="key"
								>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="生育" prop="bear">
							<el-select v-model="state.ruleForm.bear" placeholder="请选择" style="width:100%">
								<el-option 
									v-for="(item,key) in state.dictOptions.policy_config_status"
									:key="key"
									:label="item"
									:value="key"
								>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="失业" prop="unemployed">
							<el-select v-model="state.ruleForm.unemployed" placeholder="请选择" style="width:100%">
								<el-option 
									v-for="(item,key) in state.dictOptions.policy_config_status"
									:key="key"
									:label="item"
									:value="key"
								>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="工伤" prop="injury">
							<el-select v-model="state.ruleForm.injury" placeholder="请选择" style="width:100%">
								<el-option 
									v-for="(item,key) in state.dictOptions.policy_config_status"
									:key="key"
									:label="item"
									:value="key"
								>
								</el-option>
							</el-select>
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

<script setup name="addPolicyconfig">
import pageArea from '/@/components/PageArea/index.vue'
import { getDictByItemTypes } from '/@/utils/utils';
import {addPolicyConfig,editPolicyConfig,getPolicyConfigdetail} from '@/api/socialfund/socialfundSet'
import { ElMessage } from 'element-plus';

const formRef = ref(null);
const pageAreaRef = ref(null);

const state = reactive({
	isShowDialog: false,
	loading: false,
	id: null, // 编辑时存在
	title: '新增政策配置',
	ruleForm: {
		target: '',
		year: '',
		startMonth: '',
		endMonth: '',
		province: '',
		city:'',
		pension: '',
		medical: '',
		bear: '',
		unemployed: '',
		injury: '',
	},
	address:null,
	month:null,
	dictKeys:[   //字典
		'policy_config_scope',//适应范围
		'policy_config_status',//减免政策
		'hu_config_type'//配置状态
	],
	dictOptions:{ 
		policy_config_scope:null,
		policy_config_status:null,
		hu_config_type:null
	}
});

const rules = {
	target: [
		{ required: true, message: '请选择适应范围', trigger: 'blur' },
	],
	year: [
		{ required: true, message: '请选择适应年份', trigger: 'blur' },
	],
	startMonth: [
		{ required: true, message: '请选择生效月份', trigger: 'change' },
	],
	province: [
		{ required: true, message: '请选择社保缴纳地', trigger: 'change' },
	],
	pension: [
		{ required: true, message: '请选择养老', trigger: 'change' },
	],
	medical: [
		{ required: true, message: '请选择医疗', trigger: 'change' },
	],
	bear: [
		{ required: true, message: '请选择生育', trigger: 'change' },
	],
	unemployed: [
		{ required: true, message: '请选择失业', trigger: 'change' },
	],
	injury: [
		{ required: true, message: '请选择工伤', trigger: 'change' },
	],
}
// 打开弹窗
const openDialog = async (row) => {
	if (row && row.id) {
		const res = await getPolicyConfigdetail(row.id);
		if(res.code==200){
			// 编辑
			state.title = '政策配置编辑';
			state.id = row.id;
			
			state.ruleForm =res.data;
			state.address = res.data.city||res.data.province;
			state.address = state.address?Number(state.address):null;
			state.month = [res.data.startMonth,res.data.endMonth];
			state.ruleForm.target = res.data.target.toString()
			state.isShowDialog = true;
		}else{
			ElMessage.error(res.msg||"获取政策配置详情失败");
		}
	} else {
		// 新增
		state.title = '政策配置新增';
		state.id = null;
		state.isShowDialog = true;
	}
};
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

// 选择年份
const changeYear = (val) => {
	state.month = null
	state.ruleForm.startMonth = null;
	state.ruleForm.endMonth = null;
}

// 选择月份
const changeMonth = (val) => {
	if(val){
		state.ruleForm.startMonth = val[0];
		state.ruleForm.endMonth = val[1];
	}else{
		state.ruleForm.startMonth = null;
		state.ruleForm.endMonth = null;
	}
}
// 根据年份来设置默认月份
const defaultValue = computed(()=>{
	if(state.ruleForm.year){
		return [new Date(state.ruleForm.year), new Date(state.ruleForm.year)]
	}
})



// 关闭弹窗
const closeDialog = () => {
	formRef.value&&formRef.value.resetFields();
	// formRef.value.clearValidate()
	state.ruleForm= {
		target: '',
		year: '',
		startMonth: '',
		endMonth: '',
		province: '',
		city:'',
		pension: '',
		medical: '',
		bear: '',
		unemployed: '',
		injury: '',
	}
	state.address = null;
	state.month = null;
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
				state.loading = true;
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					editPolicyConfig(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('编辑政策配置成功');
								emits('ok');
								closeDialog();
							} else {
								ElMessage.error(res.msg || '编辑政策配置失败');
							}
						},
						() => {
							ElMessage.error('编辑政策配置失败');
						}
					).finally(() => {
						state.loading = false;
					});
				} else {
					// 新增操作
					addPolicyConfig(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('新增政策配置成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '新增政策配置失败');
							}
						},
						(e) => {
							const msg = (e && e.msg) ||'新增政策配置失败';
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
		console.log(res);
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
	::v-deep(.el-range-editor.is-disabled input) {
		border-top: 1px solid var(--el-disabled-border-color) !important;
		border-bottom: 1px solid var(--el-disabled-border-color) !important; 
	}
</style>
<style lang="scss">
.month-picker .el-date-range-picker{
	width:323px;
	.el-picker-panel__icon-btn{
		display: none;
	}
}
.month-picker .el-date-range-picker .el-picker-panel__body{
		width:100% !important;
		min-width: 100%;
}
.month-picker .el-date-range-picker__content{
	width: 100% !important;
}
.month-picker .el-date-range-picker .el-picker-panel__body .is-right{
	display: none !important;
}
</style>