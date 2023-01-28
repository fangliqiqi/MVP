<template>
	<div class="system-add-dic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="110px">
				<el-row>
					<el-col :span="18">
						<el-form-item label="反馈原因" prop="reasonType">
							<el-select 
								v-model="state.ruleForm.reasonType" 
								value-key="id" 
								placeholder="请选择反馈原因" 
								clearable 
								filterable
								style="width: 100%"
							>
								<el-option v-for="(item,key) in feedBackList"
								:key="key"
								:label="item"
								:value="key">
								</el-option>
							</el-select>
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

<script setup name="feedback">
import { getDictByItemTypes } from '/@/utils/utils';
import { ElMessage } from 'element-plus';
import { salaryNotsocialFeedback,minSalaryFeedback} from '/@/api/payservice/message';

const formRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '',
	type:'',//是工资无社保好事最低工资
	ruleForm: {},
	dictKeys:[
		'salary_nosocial_feedback',//有工资无社保反馈原因
		'minsalary_feedback',//最低工资反馈原因
	],
	dictValues: {},
});

const rules = {
	reasonType:[
		{ required: true, message: '请选择反馈原因', trigger: 'change' },
	],
}


// 打开弹窗
const openDialog = (row,type) => {
	// console.log(`output->row`,row)
	if(row){
		state.isShowDialog = true
		state.type = type
		const minTitle = type==='minSalary'?'最低工资原因反馈':'原因反馈'
		state.title = type==='notSocial'?'有工资无社保原因反馈':minTitle
		state.id = row.id
	}
  
};
// 反馈原因列表
const feedBackList = computed(() => {
	if(state.type=='notSocial'){
		return state.dictValues['salary_nosocial_feedback'] || [];
	}else if(state.type=='minSalary'){
		return state.dictValues['minsalary_feedback'] || [];
	}
});

// 关闭弹窗
const closeDialog = () => {
	formRef.value.resetFields();
	state.ruleForm= {}
	state.id = null
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
  formRef.value.validate( async (valid) => {
    if (valid) {
			isShowLoading.value = true
			// console.log(`output->state.id`,state.id)
      if (state.id !== null && state.id !== undefined) {
				const data = {
					id: state.id,
					reasonType: state.ruleForm.reasonType,
					feedBack:feedBackList.value[state.ruleForm.reasonType]
				}
				try {
					const res = state.type=='notSocial'?await salaryNotsocialFeedback(data):await minSalaryFeedback(data)
					isShowLoading.value = false
					if (res.code === 200) {
						 ElMessage.success('反馈成功');
              emits('ok');
              closeDialog();
					} else {
						ElMessage.error(res.msg || '反馈失败');
					}
				} catch (error) {
					isShowLoading.value = false
					ElMessage.error('反馈失败');
				}
      } 
    }
  });
};

onMounted(() => {   
	// 请求字典数据
	getDictByItemTypes(state.dictKeys).then((res) => {
		if(res){
			state.dictValues = res
		}
	});
});

// 暴露变量
defineExpose({
	openDialog,
});

</script>
<style lang="scss" scoped>
	
</style>
