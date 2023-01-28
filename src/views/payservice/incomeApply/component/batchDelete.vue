<template>
	<div class="archives-add-electronic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="140px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="本期是否申报"  prop="isDeclare">
								<el-radio-group v-model="state.ruleForm.isDeclare">
									<el-radio  label="0">是</el-radio>
									<el-radio  label="1">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="不申报原因" prop="undeclareReason" 
						 :rules="{
								required:state.ruleForm.isDeclare== 1 ? true : false,
								message: '请输入不申报原因',
						}" 
						>
							<el-input v-model="state.ruleForm.undeclareReason" placeholder="请输入" show-word-limit maxlength="200"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading='isShowLoading' size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="batchDelete">

import { deleteApply } from '/@/api/payservice/apply';

import { ElMessage } from 'element-plus';
const formRef = ref(null);
const isShowLoading = ref(false);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '批量删除',
	ruleForm: {
		undeclareReason: null,
		isDeclare:'0',
		id:null
	},
	fileList: [],
	literatureTypesDataSource: {},
	options: [],

});
watch(()=>state.ruleForm.isDeclare,(value)=>{
	
		if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.ruleForm.undeclareReason=null
},
{
	immediate:true
})


const rules = {
	// undeclareReason: [{ required: true, message: '请输入不申报原因' }],
	isDeclare: [{ required: true, message: '请选择是否申报' }],
};
// 打开弹窗
const openDialog = async (data) => {
		// 新增
		state.title = '删除';
		state.ruleForm = {
			undeclareReason: null,
			isDeclare:'0',
			id:data.id,
		};
		setTimeout(() => {
			if (formRef.value) {
				formRef.value.clearValidate();
			}
		}, 100);
	  state.isShowDialog = true;
  }
// 关闭弹窗
const closeDialog = () => {
	state.ruleForm = {};
	state.isShowDialog = false;
	if (formRef.value) {
		formRef.value.clearValidate();
	}
};
// 取消
const onCancel = () => {
	closeDialog();
};

//确认删除
const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
					// 批量删除操作
						isShowLoading.value= true;
					deleteApply(state.ruleForm)
						.then(
							(res) => {
								if (res && res.code == 200) {
									emits('ok');
									closeDialog(); // 关闭弹窗
									ElMessage.success('保存成功');
								} else {
									ElMessage.error(res.msg || '删除失败');
								}
							},
							() => {
								ElMessage.error('删除失败');
							}
						)
						.finally((res) => {
								isShowLoading.value= false;
						});

				}
		});
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>
<style lang="scss" scoped src="./css/comm.scss">
</style>
