<template>
	<div class="invite-container">
		<el-dialog :title="t" v-model="state.isShowDialog" width="816px" :close-on-click-modal="false" @close="closeDialog">
			<pro-table ref="proRef" row-key="id" :columns="state.columns" :request="request" :showHeader="false" customEmpty manualRequest>
				<template #empty>
					<div>暂无数据</div>
				</template>

				<template v-slot:option="item">
					<el-radio v-model="state.checked.id" :label="item.id" @click="change(item)" size="small">{{ '' }}</el-radio>
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
import { getCompanyInfoList, inviteGroup, getAllDepart, removeEmp } from '/@/api/eleContract';

const props = defineProps({
	title: String,
	type: String, // invite:邀请 remove:移出
});

const t = computed(() => {
	return props.title || '邀请加入';
});

const proRef = ref(null);

const state = reactive({
	isShowDialog: false,
	loading: false,
	info: null,
	checked: {}, // 选中的
	dataSource: [],
	columns: [
		{
			dataIndex: 'option',
			title: '',
			scopedSlots: {
				customRender: 'option',
			},
			width: 40,
		},
		{
			dataIndex: 'companyName',
			title: '企业名称',
			minWidth: 180,
		},
		{
			dataIndex: 'managerName',
			title: '管理员',
			minWidth: 100,
		},
	],
});

const change = (item) => {
	// console.log('get change:', item);
	state.checked = item;
};

const request = async (params) => {
	try {
		if (props.type === 'invite') {
			const res = await getCompanyInfoList(params);
			if (res && res.code == 200 && res.data) {
				return {
					current: res.data.current,
					total: res.data.total,
					data: res.data.records,
				};
			}
		} else if (props.type === 'remove') {
			const res = await getAllDepart({ id: state.info.id });
			if (res && res.code == 200 && res.data) {
				state.dataSource = res.data;
				return {
					current: 1,
					total: res.data.length,
					data: res.data,
				};
			}
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
	// console.log('get checked:', state.checked);
	if (!state.checked || !state.checked.id) {
		ElMessage.error('请先选择企业');
		return;
	}

	if (props.type === 'invite') {
		// 邀请加入

		const data = [{ id: state.info.id, companyInfoId: state.checked.id }];
		state.loading = true;
		inviteGroup(data).then(
			(res) => {
				if (res && res.code === 200) {
					ElMessage.success('邀请成员加入企业成功!');
					closeDialog();
					emits('ok');
					window.open(res.data);
				} else {
					ElMessage.error(res.msg || '邀请失败');
				}
			},
			(error) => {
				ElMessage.error((error && error.msg) || '邀请失败');
			}
		).finally(() => {
			state.loading = false;
		});
	} else if (props.type === 'remove') {
		// 移出组织
		const params = {
			id: state.info.id,
			companyUnionIds:state.checked.id,
			unionIds: state.dataSource
				.filter((item) => item.id !== state.checked.id)
				.map((item) => item.id)
				.join(','),
		};
		state.loading = true;
		removeEmp(params).then(
			(res) => {
				if (res && res.code === 200) {
					ElMessage.success('移出成功!');
					closeDialog();
					emits('ok');
				} else {
					ElMessage.error(res.msg || '移出失败');
				}
			},
			(error) => {
				ElMessage.error((error && error.msg) || '移出失败');
			}
		).finally(() => {
			state.loading = false;
		});
	}
};

// 打开弹窗
const openDialog = async (item) => {
	state.info = item;
	state.isShowDialog = true;
	state.checked = {};
	state.dataSource = [];
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

<style lang="scss" scoped src="./css/inviteDialog.scss"></style>
