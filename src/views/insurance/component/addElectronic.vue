<template>
	<div class="insurance-add-electronic-container">
		<el-dialog title="电子保单导入" v-model="state.isShowDialog"  :close-on-click-modal="false" width="538px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="70px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="备注" prop="remark">
							<el-input
								v-model="state.ruleForm.remark"
								placeholder="请输入"
								maxlength="50"
								clearable
								:rows="2"
								type="textarea"
								show-word-limit
							></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="附件" prop="files">
							<el-upload
								class="uploadList"
								style="max-width: 100%"
								v-model:file-list="state.files"
								:on-remove="handleRemove"
								:on-exceed="handleExceed"
								:on-change="handleChange"
								:auto-upload="false"
								:multiple="true"
								ref="uploadRef"
								accept=".pdf,.png,.jpg,.doc,.docx,.xls,.xlsx,.rar,.zip"
							>
								<el-button>点击上传</el-button>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="demo-progress" v-show="state.progress">
				<el-progress type="circle" :percentage="state.percentage" color="var(--el-color-primary)" />
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default" :loading="state.loading">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="addElectronic">
import { uploadInsuranceEnclosure } from '/@/api/insurance/electronic.js';
import { ElMessage } from 'element-plus';
const formRef = ref(null);
const uploadRef = ref(null);

const emits = defineEmits(['ok']);

const state = reactive({
	isShowDialog: false,
	ruleForm: {
		remark: null,
		files: null,
	},
	fileList: [],
	loading: false,
	progress: false,
	percentage: 0,
});

const rules = {
	files: [{ required: true, message: '请选择需要上传的附件' }],
};

// 打开弹窗
const openDialog = async (data) => {
	state.loading = false;
	state.ruleForm = {
		remark: null,
		files: null,
	};
	setTimeout(() => {
		if (formRef.value) {
			formRef.value.clearValidate();
		}
	}, 100);

	state.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	state.ruleForm = {};
	state.isShowDialog = false;
	state.fileList = [];
	state.progress = false;
	state.percentage = 0;
	formRef?.value?.clearValidate();
	uploadRef?.value?.clearFiles();
};
// 取消
const onCancel = () => {
	closeDialog();
};

// 新增
const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
				state.progress = true;
				state.loading = true;
				// 校验通过，开始上传
				uploadFile();
			}
		});
};

const uploadFile = async () => {
	const file = (state.fileList || []).shift(); // 返回第一个元素
	if (file) {
		try {
			const formData = new FormData();
			formData.append('file', file.raw);
			formData.append('remark', state.ruleForm.remark || '');
			formData.append('filePath', ''); // 暂时不传
			const responds = await uploadInsuranceEnclosure(formData, (progressEvent) => {
				if (state.fileListLength == 1) {
					state.percentage = ((progressEvent.loaded / progressEvent.total) * 98) | 0;
				}
			});
			if (responds.code === 200) {
				uploadRef?.value?.handleRemove(file);
			} else {
				ElMessage.error(responds.msg);
			}
			state.percentage = ((state.fileListLength - state.fileList.length) / state.fileListLength).toFixed(2) * 100;
		} finally {
			uploadFile();
		}
	} else {
		state.loading = false;
		state.progress = false;
		state.percentage = 0;
		ElMessage.success('上传完成！');
		emits('ok');
		closeDialog();
	}
};

let timeout = null;

const handleChange = (file, files) => {
	if (file.raw.size > 1024 * 1024 * 50) {
		uploadRef?.value?.handleRemove(file);

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			ElMessage.error('文件大小不能超过50M！');
		});

		return false;
	}
	state.ruleForm.files = files;
	state.fileList.push(file);
	state.fileListLength = state.fileList.length;
};

// 删除
const handleRemove = (file) => {};

// 超限
const handleExceed = () => {
	ElMessage.error(`文件数量最多上传15个`);
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>
<style lang="scss" scoped>
.insurance-add-electronic-container {
	.mb20 {
		margin-bottom: 0px !important;
	}
	.demo-progress {
		text-align: center;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba($color: #fff, $alpha: 0.7);
		transition: all 0.3s;
	}
}
</style>

<style lang="scss">
 @import './css/addElectronic.scss'
</style>
