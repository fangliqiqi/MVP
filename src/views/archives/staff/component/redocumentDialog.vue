<template>
	<div class="redocument-dialog">
		<el-dialog title="复档" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-row>
				<el-col v-for="item in state.header" :key="item.key" :span="8" class="info">
					<span class="info-label" v-html="item.label"></span>
					<span class="info-value">{{ (state.info && state.info[item.key]) || EMPTY_PLACEHOLDER }}</span>
				</el-col>
			</el-row>

			<pro-table
				ref="proRef"
				row-key="id"
				:columns="columns"
				:request="request"
				:multi="true"
				:showHeader="false"
				customEmpty
				manualRequest
				:searchConfig="state.searchConfig"
				@selectionChange="selectionChange"
			>
				<template #protableTitle>
					<span>请选择复职项目</span>
				</template>
				<template #empty>
					<div>暂无数据</div>
				</template>
			</pro-table>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default" :loading="state.loading">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="redocument">
import { ElMessage } from 'element-plus';
import { restoreStaff } from '/@/api/staff';
import { getProjectListByStaffId } from '/@/api/subject';
import { EMPTY_PLACEHOLDER } from '/@/utils/utils';
import ProTable from '/@/components/ProTable/ProTable.vue';

const proRef = ref(null);
const formRef = ref(null);
const state = reactive({
	isShowDialog: false,
	loading: false,
	ruleForm: {},
	info: null,
	DICTS: {},
	dictKeys: ['downshift_reason'], // 减档原因
	header: [
		{
			key: 'empCode',
			label: '员工主码',
		},
		{
			key: 'empName',
			label: '员工姓名',
		},
		{
			key: 'empIdcard',
			label: '身份证号',
		},
	],
	searchConfig: {
		pagination: false,
	},
	selectionChangeList: [],
});

const selectionChange = (selection) => {
	state.selectionChangeList = selection;
};

const columns = reactive([
	{
		dataIndex: 'unitName',
		title: '客户名称',
		minWidth: 160,
		ellipsis: true,
	},
	{
		dataIndex: 'deptNo',
		title: '项目编码',
		minWidth: 140,
	},
	{
		dataIndex: 'deptName',
		title: '项目名称',
		minWidth: 160,
		ellipsis: true,
	},
]);

const request = async (params) => {
	try {
		console.log('get id:', state.info.id);
		const res = await getProjectListByStaffId({ empId: state.info.id });
		if (res && res.code == 200 && res.data) {
			const data = res.data || [];
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
	state.ruleForm = {};
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
	state.loading = false;
};

const onSubmit = async () => {
	const data = { id: state.info.id };
	if (state.selectionChangeList && state.selectionChangeList.length) {
		// ElMessage.error('请先选择待复档项目');
		// return;
		const ids = state.selectionChangeList.reduce((str, v1) => {
			return str ? `${str},${v1.id}` : `${v1.id}`;
		}, '');
		data.projectIds = ids;
	}

	try {
		state.loading = true;
		const res = await restoreStaff(data);
		if (res && res.code === 200) {
			ElMessage.success('项目复档成功');
			emits('ok');
			closeDialog();
		} else {
			ElMessage.error(res.msg || '项目复档失败');
			state.loading = false;
		}
	} catch (e) {
		console.log('get exception:', e);
		ElMessage.error('项目复档失败');
		state.loading = false;
	}
};

// 打开弹窗
const openDialog = async (data) => {
	state.info = data;
	state.ruleForm = {
		id: data.id,
	};

	state.isShowDialog = true;

	nextTick(() => {
		if (proRef.value) proRef.value.refresh();
	});
};

// 暴露变量
defineExpose({
	openDialog,
});
const emits = defineEmits(['ok']);
</script>

<style lang="scss" scoped src="./css/redocumentDialog.scss">
</style>
