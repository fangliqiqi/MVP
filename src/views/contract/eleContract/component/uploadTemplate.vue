<template>
	<div class="upload-template-container">
		<el-dialog title="模板上传" v-model="state.isShowDialog" width="576px" :close-on-click-modal="false" @close="closeDialog" v-loading="state.loading">
			<el-upload
				class="upload-demo"
				drag
				:action="`/yifu-archives/method/fddcontracttemplate/upload?id=${state.info.id}`"
				accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,pplication/x-pdf"
				:show-file-list="false"
				:on-success="onSuccess"
				:on-error="onError"
				:headers="state.headers"
				:on-change="onFileChange"
				:before-upload="beforeUpload"
			>
				<el-icon class="el-icon--upload"><upload-filled /></el-icon>
				<div class="el-upload__text">拖拽或 <em>点击上传</em></div>
				<template #tip>
					<div class="el-upload__tip">支持上传PDF、DOC、DOCX格式文档，且大小不得超过5Mb.</div>
				</template>
			</el-upload>

			<!-- <template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template> -->
		</el-dialog>
	</div>
</template>

<script setup name="uploadTemplateDialog">
import { UploadFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { Local } from '/@/utils/storage';

const state = reactive({
	isShowDialog: false,
	limitZipSize: 5,
	loading: false,
	info: {},
	headers: {
		Authorization: `${Local.get('token_type')} ${Local.get('access_token')}`,
	},
	file: null,
});

// 上传文件之前
const beforeUpload = (file) => {
	let size10M = file.size / 1024 / 1024 < state.limitZipSize;
	if (!size10M) {
		ElMessage.erro(`上传文件大小不能超过 ${state.limitZipSize}MB!`);
		return false;
	}
	state.loading = true;
};

const onFileChange = (file, files) => {
	let name = file.name;
	if (!/\.(zip|ZIP|pdf|PDF|doc|DOC|docx|DOCX)$/.test(name)) {
		ElMessage.error('上传文件必须为PDF、DOC、DOCX格式文档');
		state.file = null;
		return false;
	}
	state.file = file;
};

const onError = (error) => {
	ElMessage.error('模板上传失败，请稍后重试');
	state.loading = false;
};

const onSuccess = (response, uploadFile, uploadFiles) => {
	if (response && response.code === 200) {
		ElMessage.success('模板上传成功');
		emits('ok');
		closeDialog();
	} else {
		ElMessage.error(response.msg || '模板上传失败');
	}
	state.loading = false;
};

const onSubmit = () => {};

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
};

// 打开弹窗
const openDialog = async (data) => {
	state.loading = false;
	state.info = data;
	state.file = null;
	state.isShowDialog = true;
};
const emits = defineEmits(['ok']);

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/uploadTemplate.scss">
</style>
