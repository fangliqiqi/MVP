<template>
	<div class="archives-add-electronic-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="140px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="申报单位" prop="declareTitle">
							<el-input v-model="state.ruleForm.declareTitle" placeholder="请输入" autocomplete="off" ></el-input>
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

<script setup name="batchDelete">
import { ElMessage,ElMessageBox } from 'element-plus';
import {
	deleteBatchSpeciaDecution,
	findSpeciaDecutionTotalNum
} from '/@/api/payservice/specialdeduction';
const formRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '删除本月数据',
	ruleForm: {
		declareTitle: null,
	},
	fileList: [],
	literatureTypesDataSource: {},
	options: [],
});

const rules = {
	declareTitle: [{ required: true, message: '请输入申报单位' }],
};
// 打开弹窗
const openDialog = async (data) => {
		// 新增
		state.title = '删除本月数据';
		state.ruleForm = {
			declareTitle: null,
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
const isShowLoading = ref(false)
//确认查询
const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
		
			if (valid) {
				isShowLoading.value = true;
					// 批量删除操作
					findSpeciaDecutionTotalNum(state.ruleForm)
						.then(
							(res) => {
								if (res && res.code == 200) {
									if(res.data!='0' && res.data){
 												 deleteCell(res.data)
									}else{
												ElMessage.error('未查询到当月可删除数据');
									}
								} else {
									ElMessage.error(res.msg || '未查询到当月可删除数据');
								}
							},
							() => {
								ElMessage.error('未查询到当月可删除数据');
							}
						)
						.finally((res) => {
							isShowLoading.value = false
						});

				}
		});
};
/**
 * 批量删除
 */
const deleteCell = (item) => {
  const num=item
	const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
        <span style="font-size:14px;font-weight:400"><strong>[${state.ruleForm.declareTitle}]</strong> 共计<strong> ${num} </strong>数据，确认是否全部删除？</span> <br/> 
				<span style="color:red;font-size:14px;font-weight:400">删除后，专项扣除信息将从系统消失，请谨慎操作！</span></p>`;
	ElMessageBox.confirm(text, {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		dangerouslyUseHTMLString: true,
	})
		.then(async () => {
			try {
				const res = await deleteBatchSpeciaDecution(state.ruleForm);
				if (res && res.code === 200) {
					ElMessage.success('删除成功');
					emits('ok');
					closeDialog(); // 关闭弹窗
				} else {
					ElMessage.error(res.msg || '删除失败');
				}
			} catch (e) {
				console.log('get exception:', e);
				ElMessage.error((e && e.msg) || '删除失败');
			}
		})
		.catch(() => {});
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>
<style lang="scss" scoped src="./css/comm.scss">
</style>
