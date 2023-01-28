<template>
	<el-dialog title="详情" v-model="state.isShowDialog"  :close-on-click-modal="false" width="538px" @close="state.isShowDialog = false">
		<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="70px">
			<el-row>
				<el-col class="mb20">
					<el-form-item label="回复内容" class="reply">
						<div class="text">
							{{ state.remark || '--' }}
						</div>
					</el-form-item>
				</el-col>

				<el-col class="mb20">
					<el-form-item label="附件" class="file">
						<template v-if="state.fileList && state.fileList.length">
							<p v-for="en in state.fileList" :key="en.id">
								<a @click="onItemClick(en)">{{ en.enclosureName }}</a>
							</p>
						</template>
						<template v-else>--</template>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="state.isShowDialog = false" size="default">关 闭</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup name="ReplyFileDetail">
import { ElMessage } from 'element-plus';
import { getEnclosureUrl } from '/@/api/order.js';

const state = reactive({
	isShowDialog: false,
	fileList: [],
	remark: '',
});

// 打开弹窗
const openDialog = async (data) => {
	state.isShowDialog = true;
	state.fileList = data.orderReplyEnclosure;
	state.remark = data.replyContent;
};

const onItemClick = (item) => {
	ElMessage.warning('正在下载');
	getEnclosureUrl(item.id).then((res) => {
		const path = (res.data || '').replace(/(http:|https:)/, location.protocol);
		window.open(path, '_blank');
	});
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/ReplyFileDetail.scss">
</style>
