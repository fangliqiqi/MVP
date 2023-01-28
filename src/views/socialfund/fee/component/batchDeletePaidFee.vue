<template>
	<el-dialog title="批量删除" v-model="state.isShowDialog" width="576px" @close="closeDialog" :close-on-click-modal="false">
		<el-form ref="formRef" :model="state.ruleForm" size="default" label-width="110px">
			<el-row>
				<el-col class="mb20">
					<el-form-item label="社保户" prop="socialHouseId">
						<page-select
							ref="pageSelectRef"
							v-model="state.ruleForm.socialHouseId"
							:request="requestHu"
							:ext="{ type: 0, delFlag: 0 }"
							value-key="id"
							title="name"
							search="name"
							placeholder="请选择或输入社保户"
							@change="onChangeEmp"
						/>
					</el-form-item>
				</el-col>

				<el-col class="mb20">
					<el-form-item label="公积金户" prop="fundHouseId">
						<page-select
							ref="pageSelectRef"
							v-model="state.ruleForm.fundHouseId"
							:request="requestHu"
							value-key="id"
							title="name"
							search="name"
							:ext="{ type: 1, delFlag: 0 }"
							placeholder="请选择或输入公积金户"
							:options="state.options"
							@change="onChangeEmp"
						/>
					</el-form-item>
				</el-col>

				<el-col class="mb20">
					<el-form-item label="身份证号" prop="empIdCard">
						<el-input style="width: 100%" maxlength="18" placeholder="请输入" v-model.trim="state.ruleForm.empIdCard" />
					</el-form-item>
				</el-col>

				<el-col class="mb20">
					<el-form-item label="生成月份" prop="socialCreateMonth">
						<el-date-picker
							style="width: 100%"
							placeholder="请选择"
							v-model="state.ruleForm.socialCreateMonth"
							value-format="YYYYMM"
							format="YYYY年MM月"
							type="month"
						/>
					</el-form-item>
				</el-col>

				<el-col class="mb20">
					<el-form-item label="缴纳月份" prop="socialPayMonth">
						<el-date-picker
							style="width: 100%"
							placeholder="请选择"
							v-model="state.ruleForm.socialPayMonth"
							value-format="YYYYMM"
							format="YYYY年MM月"
							type="month"
						/>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog" size="default">取 消</el-button>
				<el-button type="primary" @click="onSubmit" :loading="state.loading" size="default">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup name="batchDeletePaidFee">
import { removeBatchByIdsAndType } from '/@/api/socialfund/fee';
import { getHuConfigList } from '/@/api/socialfund/socialfundSet';
import PageSelect from '/@/components/PageSelect/index.vue';
import moment from 'moment';
import { ElMessage } from 'element-plus';

const formRef = ref(null);
const settleDomainRef = ref(null);
const customerPageSelectRef = ref(null);

const state = reactive({
	isShowDialog: false,
	loading: false,
	ruleForm: {},
	data: null,
	ext: {},
});

const requestHu = async (params) => {
	try {
		const res = await getHuConfigList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		} else {
			ElMessage.error(res.msg);
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

const onChangeEmp = (val) => {
	
};

const onSubmit = () => {
	const { empIdCard, socialHouseId, fundHouseId, socialCreateMonth, socialPayMonth } = state.ruleForm;
	if (!empIdCard && !socialHouseId && !fundHouseId && !socialCreateMonth && !socialPayMonth) {
		ElMessage.warning('请输入或选择至少一个筛选项');
		return;
	}

	// console.log('get ruleForm:', state.ruleForm);
	state.loading = true;
	removeBatchByIdsAndType(state.ruleForm).then(
		(res) => {
			if (res && res.code == 200) {
				ElMessage.success(res.msg || '批量删除成功');
				emits('ok');
				closeDialog();
			} else {
				ElMessage.error(res.msg || '批量删除出错');
			}
		},
		(error) => {
			ElMessage.error((error && error.msg) || '批量删除出错');
		}
	).finally(() => {
		state.loading = false;
	});
};

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
	state.loading = false;
	state.ruleForm = {};
};

// 打开弹窗
const openDialog = async (data) => {
	state.data = data;
	state.isShowDialog = true;
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>

