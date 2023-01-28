<template>
	<div class="invite-container">
		<el-dialog :title="t" v-model="state.isShowDialog" width="816px" :close-on-click-modal="false" @close="closeDialog">
			<pro-table
				ref="proRef"
				row-key="id"
				:columns="state.columns"
				:request="request"
				:showHeader="false"
				customEmpty
				manualRequest
				multi
				@selectionChange="selectionChange"
				:searchConfig="state.searchConfig"
			>
				<template #empty>
					<div>暂无数据</div>
				</template>
			</pro-table>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading="state.loading" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="accountCerDialog">
import ProTable from '/@/components/ProTable/ProTable.vue';
import { ElMessage } from 'element-plus';
import { inviteGroup, removeEmp, sealAuth, cancelSealAuth, getSealList } from '/@/api/eleContract';
import { SEAL_STATUS_OPTIONS } from '/@/utils/dicts';

const props = defineProps({
	title: String,
	type: String, // auth:去授权 noauth:取消授权
});

const t = computed(() => {
	return props.title || '授权印章';
});

const proRef = ref(null);

const state = reactive({
	isShowDialog: false,
	loading: false,
	searchConfig: {
		pagination: false,
	},
	info: null,
	columns: [
		{
			dataIndex: 'sealName',
			title: '印章名称',
			minWidth: 180,
			ellipsis: true,
		},
		{
			dataIndex: 'status',
			title: '印章状态',
			minWidth: 100,
			valueEnum: SEAL_STATUS_OPTIONS,
		},
		{
			dataIndex: 'createTime',
			title: '创建时间',
			minWidth: 140,
		},
	],
	selectionChangeList: [], // 选中项
	sealIds: [],
});

const selectionChange = (selection) => {
	state.selectionChangeList = selection;
};

const request = async (params) => {
	try {
		const res = await getSealList(params);
		if (res && res.code == 200 && res.data) {
			let data = null;
			if (props.type === 'auth') {
				// 授权印章
				data = res.data.filter((item) => !state.sealIds.includes(item.sealId));
			} else if (props.type === 'noauth') {
				data = res.data.filter((item) => state.sealIds.includes(item.sealId));
			}
			return {
				current: 1,
				total: data.length,
				data,
			};
		}
	} catch (e) {
		console.log('get exception:', e);
	}
	return {
		current: 1,
		total: 0,
		data: [],
	};
};

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
	state.loading = false;
};

const onSubmit = () => {
	const data = state.selectionChangeList.filter((item) => !state.sealIds.includes(item.id));
	if (!data || data.length === 0) {
		ElMessage.error('请先选择印章');
		return;
	}
	state.loading = true;
	if (props.type === 'auth') {
		// 授权印章
		sealAuth({ id: data.map((item) => item.id).join(','), fddPersonAccountId: state.info.id }).then(
			(res) => {
				if (res && res.code === 200) {
					ElMessage.success(res.msg || '授权成功!');
					closeDialog();
					emits('ok');
				} else {
					ElMessage.error(res.msg || '授权失败');
				}
			},
			(error) => {
				ElMessage.error((error && error.msg) || '授权失败');
			}
		).finally(() => {
			state.loading = false;
		});
	} else if (props.type === 'noauth') {
		// 取消授权印章

		cancelSealAuth({
			id: data.map((item) => item.id).join(','),
			fddPersonAccountId: state.info.id,
		}).then(
			(res) => {
				if (res && res.code === 200) {
					ElMessage.success(res.msg || '取消授权印章成功!');
					closeDialog();
					emits('ok');
				} else {
					ElMessage.error(res.msg || '取消授权印章失败');
				}
			},
			(error) => {
				ElMessage.error((error && error.msg) || '取消授权印章失败');
			}
		).finally(() => {
			state.loading = false;
		});
	}
};

// 打开弹窗
const openDialog = async (item, sealIds) => {
	state.info = item;
	state.isShowDialog = true;
	state.sealIds = sealIds;
	nextTick(() => {
		if (proRef.value) proRef.value.refresh();
	});
};

const emits = defineEmits(['ok']);

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/sealListDialog.scss">

</style>
