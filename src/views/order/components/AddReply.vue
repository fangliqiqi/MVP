<template>
	<div class="reply-add-electronic-container">
		<el-dialog title="添加回复" v-model="state.isShowDialog" :close-on-click-modal="false" width="538px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" size="default" label-width="72px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="回复内容" prop="remark">
							<el-input
								v-model="state.ruleForm.remark"
								placeholder="请输入"
								maxlength="200"
								clearable
								:rows="2"
								type="textarea"
								show-word-limit
								@input="state.showError = false"
							></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="附件" prop="files" style="margin-bottom: 0">
							<el-upload
								class="uploadList"
								style="max-width: 100%"
								v-model:file-list="state.files"
								:on-exceed="handleExceed"
								:on-change="handleChange"
								:auto-upload="false"
								:multiple="true"
								:limit="20"
								ref="uploadRef"
								accept=".pdf,.png,.jpg,.doc,.docx,.xls,.xlsx,.rar,.zip"
							>
								<el-button>点击上传</el-button>
							</el-upload>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item style="margin-bottom: 0">
							<div class="error-text" v-if="state.showError">回复内容或者附件至少填一项</div>
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

<script setup name="AddReply">
import { uploadReplyEnclosure } from '/@/api/order.js';
import { ElMessage } from 'element-plus';

const props = defineProps({ orderNo: null });

const formRef = ref(null);
const uploadRef = ref(null);

const emits = defineEmits(['ok']);

const state = reactive({
	isShowDialog: false,
	ruleForm: {
		remark: null,
		files: null,
	},
	loading: false,
	progress: false,
	percentage: 0,
	showError: false,
});

// 打开弹窗
const openDialog = async (data) => {
	state.loading = false;
	state.showError = false;
	state.ruleForm = {
		remark: null,
		files: null,
	};
	setTimeout(() => {
		formRef?.value?.clearValidate();
	}, 100);

	state.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	state.ruleForm = {};
	state.isShowDialog = false;
	state.progress = false;
	state.showError = false;
	state.loading = false;
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
	const hasFiles = state.ruleForm.files && state.ruleForm.files.length;
	const hasRemark = !!state.ruleForm.remark;

	state.showError = !hasFiles && !hasRemark;

	if (state.showError) {
		return;
	}

	if (hasFiles) {
		state.progress = true;
	}

	state.loading = true;
	// 校验通过，开始上传
	uploadFile();
};

const uploadFile = async () => {
	try {
		const formData = new FormData();
		state.ruleForm.files?.forEach((file) => {
			formData.append('file', file.raw);
		});
		formData.append('orderNo', props.orderNo);
		formData.append('replyContent', state.ruleForm.remark || '');
		formData.append('filePath', ''); // 暂时不传
		const responds = await uploadReplyEnclosure(formData, (progressEvent) => {
			state.percentage = ((progressEvent.loaded / progressEvent.total) * 98) | 0;
		});
		if (responds.code === 200) {
			ElMessage.success('上传完成！');
			emits('ok');
			closeDialog();
		} else {
			ElMessage.error(responds.msg);
		}
	} finally {
		state.loading = false;
		state.progress = false;
	}
};

let timeout = null;

const handleChange = (file, files) => {
	state.showError = false;
	if (file.raw.size > 1024 * 1024 * 50) {
		uploadRef?.value?.handleRemove(file);

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			ElMessage.error('文件大小不能超过50M！');
		});

		return false;
	}
	state.ruleForm.files = files;
};

// 超限
const handleExceed = () => {
	ElMessage.error(`文件数量最多上传20个`);
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>
<style lang="scss" scoped src="./css/AddReply.scss"></style>
<style lang="scss">
.reply-add-electronic-container {
	.el-upload-list {
		width: 325px;
	}
	.error-text {
		color: var(--el-color-error);
	}
}
</style>
