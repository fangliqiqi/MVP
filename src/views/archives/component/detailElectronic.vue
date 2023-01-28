<template>
	<div class="electronic-detail-container">
		<el-dialog title="电子档案详情" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-row>
				<el-col v-for="item in state.header" :key="item.dataIndex" :span="24" class="item-container">
					<span class="desc-title">{{ item.title }}</span>
					<span class="desc-content"> {{ state.info[item.dataIndex] || EMPTY_PLACEHOLDER }}</span>
				</el-col>

				<!--文件-->
				<el-col :span="24" class="item-container">
					<span class="desc-title">附件</span>
					<span class="desc-content">
						<div v-if="state.fileList && state.fileList.length">
							<div v-for="item in state.fileList" :key="item.url" class="attach-file">
								<el-tooltip placement="top" >
									<template #content>
										{{ item.name }}
									</template>
									<a :href="item.url"  :download="item.name" target="_blank"> {{ item.name }}</a>
								</el-tooltip>
							</div>
						</div>
						<span v-else>{{ EMPTY_PLACEHOLDER }}</span>
					</span>
				</el-col>
			</el-row>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">关 闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="electronic-detail-dialog">
import { EMPTY_PLACEHOLDER } from '/@/utils/utils';
import { getFile } from '/@/api/file';
import{ElMessage} from 'element-plus';

const state = reactive({
	isShowDialog: false,
	info: null,
	header: [
		{
			dataIndex: 'empName',
			title: '员工姓名',
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
		},
		{
			dataIndex: 'dataType',
			title: '资料类型',
		},
	],
	fileList: [],
});

const getAttachInfo = async (id) => {
	try {
		const res1 = await getFile(id);
		if (res1 && res1.code === 200) {
			state.fileList = res1.data.map((item) => {
				item.name = item.attaName;
				item.uid = item.id;
				item.url = item.attaUrl;
				return item;
			});
		} else {
			state.fileList = [];
			ElMessage.error(res1.msg || '获取附件失败');
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
};

// 打开弹窗
const openDialog = async (data) => {
	state.info = data;
	getAttachInfo(data.id);
	state.isShowDialog = true;
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/detailElectronic.scss"></style>
