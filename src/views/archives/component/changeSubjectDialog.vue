<template>
	<!-- 项目档案划转 -->
	<div class="downshift-archives-dialog">
		<el-dialog title="员工档案划转" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="135px">
				<el-row>
					<el-col :span="24">
						<div class="line" style="margin-bottom: 16px">划转前</div>
					</el-col>

					<el-col :span="12">
						<el-form-item label="姓 名">
							{{ state.ruleForm.empName }}
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="身份证号">
							{{ state.ruleForm.empIdcard }}
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="原单位名称">
							{{ state.ruleForm.oldDept }}
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="原项目名称">
							{{ state.ruleForm.oldSettle }}
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<div class="line" style="margin-bottom: 40px">划转后</div>
					</el-col>

					<el-col :span="12">
						<el-form-item label="单位名称" prop="unitId">
							<el-select placeholder="请选择" v-model="state.ruleForm.unitId" style="width: 100%" filterable @change="newUnitChange">
								<el-option v-for="item in state.allUintList" :key="item.id" :value="item.id" :label="item.customerName" />
							</el-select>

						</el-form-item>
							<!-- <el-form-item label="单位名称" prop="unitId">
								<page-select
									ref="customerPageSelectRef"
									v-model="state.ruleForm.unitId"
									:request="requestCustomer"
									value-key="id"
									@change="onChangeCustomer"
									title="name"
									search="name"
									placeholder="请选择"
								/>
						</el-form-item> -->
					</el-col>

					<el-col :span="12">
						<el-form-item label="项目名称" prop="deptId">
							<el-select placeholder="请选择" 
								v-model="state.ruleForm.deptId" 
								style="width: 100%" 
								:disabled="!state.ruleForm.unitId"
								filterable 
								@change="newDepChange"
							>
								<el-option v-for="item in currentDeptList" :key="item.id" :value="String(item.id)" :label="item.departName" />
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<div class="tips">
							<el-icon><InfoFilled /></el-icon>
							<span style="vertical-align: text-bottom"
								>已产生未结算的费用如要划转，请至EKP系统进行调整。</span>
						</div>
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
	</div>
</template>

<script setup name="changeSubjectDialog">
import { ElMessage } from 'element-plus';
import PageSelect from '/@/components/PageSelect/index.vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { getAllDept, getAllUint, empProArcChange,getUnitPage } from '/@/api/tempchange.js';

const formRef = ref(null);
const customerPageSelectRef = ref(null);
const emits = defineEmits(['ok']);

const state = reactive({
	isShowDialog: false,
	loading: false,
	leaveReasonDataSource: {},
	ruleForm: {
		empName: null,
		empIdcard: null,
		oldDept: null,
		oldSettle: null,

		newDept: null,
		unitId: null,
		unitNo: null,

		newSettle: null,
		deptId: null,
		deptNo: null,

		unsettleDeal: '0',
		changeStartMonth: null,
	},
	allDeptList: [],
	allUintList: [],
});

const currentDeptList = computed(() => {
	if (state.ruleForm.unitId !== null && state.ruleForm.unitId !== undefined) {
		// return state.allDeptList.filter((item) => item.customerId == state.ruleForm.unitId);
		return state.allDeptList.filter((item) => item.customerName == state.ruleForm.newDept);
	}
	return [];
});

const rules = reactive({
	unitId: [{ required: true, message: '请选择单位名称', trigger: 'change' }],
	deptId: [{ required: true, message: '请选择项目名称', trigger: 'change' }],
	// unsettleDeal: [{ required: true, message: '请选择已产生未结算费用是否划转', trigger: 'change' }],
});

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		setTimeout(() => {
			formRef.value.clearValidate();
		}, 10);
		
		state.ruleForm = {
			empName: null,
			empIdcard: null,
			oldDept: null,
			oldSettle: null,

			newDept: null,
			unitId: null,
			unitNo: null,

			newSettle: null,
			deptId: null,
			deptNo: null,

			unsettleDeal:'0',
			changeStartMonth: null,
		};
	}
	state.isShowDialog = false;
};

// 已产生未结算费用
const unsettleDealChange = () => {
	rules.changeStartMonth = [{ required: state.ruleForm.unsettleDeal == '1', message: '请选择划转起始月', trigger: 'change' }];

	setTimeout(() => {
		formRef.value && formRef.value.clearValidate(['changeStartMonth']);
	}, 30);
};


// 划转起始月禁选大约当前月
const disabledDate = (currentDate) => {
	return currentDate.getTime() > new Date().getTime();
};

const newUnitChange = (unitid) => {
	state.ruleForm.deptId = null
	const unit = (state.allUintList || []).find((item) => item.id === unitid);
	state.ruleForm.deptId = null;
	state.ruleForm.newDept = unit.customerName;
	state.ruleForm.unitId = unit.id;
	state.ruleForm.unitNo = unit.customerCode;
};

const newDepChange = (id) => {
	const dep = (state.allDeptList || []).find((item) => item.id === id);
	state.ruleForm.newSettle = dep.departName;
	state.ruleForm.deptId = dep.id;
	state.ruleForm.deptNo = dep.departNo;
};

const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
				state.loading = true;
				state.ruleForm.unsettleDeal = '0';
				// console.log(state.ruleForm);
				empProArcChange(state.ruleForm).then((res) => {
					if (res.code === 200) {
						ElMessage.success('划转成功！');
						emits('ok');
						closeDialog();
					} else {
						ElMessage.error(res.msg);
					}
				}).finally(() => {
					state.loading = false;
				});
			}
		});
};

/**
 * 客户分页列表
 */
// const requestCustomer = async (params) => {
// 	try {
// 		const res = await getUnitPage(params);
// 		if (res && res.code == 200 && res.data) {
// 			return {
// 				current: res.data.current,
// 				total: res.data.total,
// 				data: res.data.records,
// 			};
// 		}
// 	} catch (e) {
// 		console.log('get exception:', e);
// 	}
// 	return {
// 		current: 1,
// 		total: 0,
// 		data: [],
// 	};
// };
// const onChangeCustomer = (selected) => {
// 	// console.log(selected);
// 	state.ruleForm.deptId = '';

// };

// 打开弹窗
const openDialog = async (data) => {
	state.ruleForm = {
		empName: data.empName,
		empIdcard: data.empIdcard,
		oldDept: data.unitName,
		oldSettle: data.deptName,

		newDept: null,
		unitId: null,
		unitNo: null,

		newSettle: null,
		deptId: null,
		deptNo: null,

		unsettleDeal: '0',
		changeStartMonth: null,
	};
	state.isShowDialog = true;

	getAllDept().then((res) => {
		if (res.code === 200) {
			state.allDeptList = res.data;
		}
	});

	getAllUint().then((res) => {
		if (res.code === 200) {
			state.allUintList = res.data;
		}
	});
	
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/changeSubjectDialog.scss">
</style>
