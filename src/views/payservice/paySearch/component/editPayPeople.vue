<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :span="24">
						<el-form-item label="开户行总行" prop="bankName">
              <el-input v-model="state.ruleForm.bankName" placeholder="请输入开户行总行"  clearable maxlength="50"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="12">
						<el-form-item label="开户行省" prop="bankProvince">
              <el-select 
								v-model="state.ruleForm.bankProvince" 
								value-key="id" 
								placeholder="请选择开户行省" 
								clearable 
								filterable
								style="width: 100%"
								@change="changeBankpro">
								<el-option v-for="item in state.proList"
									:key="item.id"
									:label="item.areaName"
									:value="item.id">
								</el-option>
							</el-select>
							
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开户行市" prop="bankCity">
							<el-select 
								v-model="state.ruleForm.bankCity" 
								value-key="id" 
								placeholder="请选择开户行市" 
								clearable 
								filterable
								:disabled="!state.ruleForm.bankProvince"
								style="width: 100%"
							>
								<el-option v-for="item in cityList"
								:key="item.id"
								:label="item.areaName"
								:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
          <el-col :span="24">
						<el-form-item label="开户行支行" prop="bankSubName">
              <el-input v-model="state.ruleForm.bankSubName" placeholder="请输入开户行支行"  clearable maxlength="50"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="12">
						<el-form-item label="银行卡号" prop="bankNo">
              <el-input v-model="state.ruleForm.bankNo" placeholder="请输入银行卡号"  clearable maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="在职状态" prop="fileStatus">
							<el-select v-model="state.ruleForm.fileStatus" placeholder="请选择在职状态" style="width:100%">
								<el-option label="在职" :value="0"></el-option>
                <el-option label="离职" :value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="计税月份" prop="taxMonth">
							<el-date-picker
								v-model="state.ruleForm.taxMonth"
								style="width: 100%"
								value-format="YYYYMM"
								format="YYYYMM"
								type="month"
								placeholder="请选择计税月份"
								clearable
							/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号码" prop="empPhone">
              <el-input v-model="state.ruleForm.empPhone" placeholder="请输入手机号码"  clearable maxlength="11"></el-input>
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

<script setup name="editPayPeople">
import pageArea from '/@/components/PageArea/index.vue'
import { getDictByItemTypes } from '/@/utils/utils';
import { ElMessage } from 'element-plus';
import {getProJson,getLevelJsonById}from '/@/utils/city'
import {getpayPeopleDetail,editpayPeople} from '/@/api/payservice/paysearch'; 

const formRef = ref(null);
const pageAreaRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '编辑',
	ruleForm: {
		id: null,
		bankName: '',
		bankProvince: '',
		bankCity: '',
		bankSubName: '',
		bankNo: '',
		fileStatus: '',
		taxMonth: '',
		empPhone: '',
	},
	proList:[], //省列表
	
});

const rules = {
	bankName: [
		{ required: true, message: '请输入开户行总行', trigger: 'blur' },
	],
	bankProvince: [
		{ required: true, message: '请选择开户行省', trigger: 'change' },
	],
	bankCity: [
		{ required: true, message: '请选择开户行市', trigger: 'change' },
	],
	bankNo: [
		{ required: true, message: '请输入银行卡号', trigger: 'blur' },
		{ pattern: /^[0-9]*$/, message: '请输入正确的银行卡数字！', trigger: 'blur' },
	],
	fileStatus: [
		{ required: true, message: '请选择在职状态', trigger: 'change' },
	],
	taxMonth: [
		{ required: true, message: '请选择计税月份', trigger: 'change' },
	],
	empPhone: [
		{ required: true, message: '请输入手机号码', trigger: 'blur' },
		// { pattern: /^[0-9]*$/, message: '请输入正确的手机号码！', trigger: 'blur' },
	],
}

// 打开弹窗
const openDialog = async (row) => {
	if(row&&row.id){
		try {
			const res = await getpayPeopleDetail(row.id)
			if(res.code==200){
				state.ruleForm = res.data
				state.ruleForm.taxMonth= res.data.taxMonth||''
				state.ruleForm.fileStatus=Number(res.data.fileStatus)
				state.ruleForm.bankProvince= res.data.bankProvince?Number(res.data.bankProvince):null
				state.ruleForm.bankCity= res.data.bankCity?Number(res.data.bankCity):null
				state.id = row.id
				state.isShowDialog = true
			}else{
				ElMessage.error(res.msg||'获取详情失败')
			}
		} catch (error) {
			ElMessage.error(error.msg||'获取详情失败');
		}
			
	}
};

const changeBankpro = (val)=>{
	state.ruleForm.bankCity = ''
}
const cityList = computed(()=>{
	if(state.ruleForm.bankProvince){
		return getLevelJsonById(state.ruleForm.bankProvince)
	}else{
		return []
	}
})

// 关闭弹窗
const closeDialog = () => {
	setTimeout(() => {
		formRef.value.resetFields();
	}, 300);
	
	state.ruleForm= {
		id: null,
		bankName: '',
		bankProvince: '',
		bankCity: '',
		bankSubName: '',
		bankNo: '',
		fileStatus: '',
		taxMonth: '',
		empPhone: '',
	}
	state.isShowDialog = false;
	
};
// 取消
const onCancel = () => {
	closeDialog();
};

const emits = defineEmits(['ok']);
const isShowLoading = ref(false)
// 保存
const onSubmit = () => {
		formRef.value.validate((valid) => {
			if (valid) {
				isShowLoading.value = true
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					editpayPeople(state.ruleForm).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('编辑成功');
								emits('ok');
								closeDialog();
							} else {
								ElMessage.error(res.msg || '编辑失败');
							}
						},
						() => {
							ElMessage.error('编辑失败');
						}
					).catch().finally(()=>{
							isShowLoading.value = false
					});
				}
			}
		});
};


onMounted(()=>{
	state.proList = getProJson()
})

// 暴露变量
defineExpose({
	openDialog,
});

</script>
<style lang="scss" scoped>
	
</style>
