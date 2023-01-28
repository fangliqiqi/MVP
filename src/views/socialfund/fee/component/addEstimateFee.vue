<template>
	<el-dialog title="按缴纳月重新生成" v-model="state.isShowDialog" width="576px" @close="closeDialog" :close-on-click-modal="false">
		<el-form ref="formRef" :model="state.ruleForm" :rules="state.rules" size="default" label-width="110px" :validate-on-rule-change="false">
			<el-row>
				<el-col class="mb20">
					<el-form-item label="生成方式" prop="type">
						<el-radio-group v-model="state.ruleForm.type">
							<el-radio label="0">按个人</el-radio>
							<el-radio label="1">按项目</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col class="mb20" v-if="state.ruleForm.type == 1">
					<el-form-item label="客户名称" prop="customerId">
						<page-select
							ref="customerPageSelectRef"
							v-model="state.ruleForm.customerId"
							:request="requestCustomer"
							value-key="id"
							@change="onChangeCustomer"
							title="name"
							search="name"
							placeholder="请选择"
						/>
					</el-form-item>
				</el-col>

				<el-col class="mb20" v-if="state.ruleForm.type == 1">
					<el-form-item label="项目名称" prop="settleDomainIds">
						<page-select
							ref="settleDomainRef"
							v-model="state.ruleForm.settleDomainIds"
							:request="requestSettle"
							:ext="state.ext"
							value-key="id"
							title="departName"
							search="departName"
							placeholder="请选择，可多选"
							manual
							multiple
						/>
					</el-form-item>
				</el-col>

				<el-col class="mb20" v-if="state.ruleForm.type == 0">
					<el-form-item label="身份证号" prop="empIdCard">
						<el-input v-model="state.ruleForm.empIdCard" placeholder="请输入" maxlength="18" />
					</el-form-item>
				</el-col>

				<el-col class="mb20">
					<el-form-item label="缴纳月份" prop="payMonths">
						<el-select v-model="state.ruleForm.payMonths" style="width: 100%" multiple placeholder="请选择，可多选" clearable>
							<el-option v-for="(label, value) in state.months" :key="value" :value="value" :label="label"> {{ label }} </el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog" size="default">取 消</el-button>
				<el-button :loading="isLoading" type="primary" @click="onSubmit" size="default">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup name="addEstimateFee">
import { getCustomerList, getSettleDomainList, createForecastlibary } from '/@/api/socialfund/fee';
import PageSelect from '/@/components/PageSelect/index.vue';
import moment from 'moment';
import { ElMessage } from 'element-plus';

const formRef = ref(null);
const isLoading = ref(false)
const settleDomainRef = ref(null);
const customerPageSelectRef = ref(null);

const state = reactive({
	isShowDialog: false,
	ruleForm: {},
	data: null,
	rules: {
		type: [{ required: true, message: '请选择生成方式' }],
		customerId: [{ required: true, message: '请选择客户名称' }],
		settleDomainIds: [{ required: true, message: '请选择项目名称，可多选' }],
		payMonths: [{ required: true, message: '请选择缴纳月份，可多选' }],
		empIdCard: [{ required: true, message: '请输入身份证号' }],
	},
	ext: {},
	months: {}, // 缴纳月的字典
});

watch(
	() => state.ruleForm.type,
	(va) => {
		if(va==0 || va ==1){
			state.ruleForm.customerId=null
			state.ruleForm.payMonths=null
			state.ruleForm.settleDomainIds=null
			state.ruleForm.empIdCard=null
		}
	}
);
	
/**
 * 自动生成缴纳月
 */
const generateMonths = (mix) => {
	let target = {};
	for (let i = 0 - mix; i < mix + 1; i++) {
		let t = null;
		if (i < 0) {
			// 之前
			t = moment().subtract(Math.abs(i), 'months');
		} else {
			t = moment().add(i, 'months');
		}
		const key = t.format('YYYYMM');
		const value = t.format('YYYY年MM月');
		target[key] = value;
	}
	state.months = target;
};

const onChangeCustomer = (selected) => {
	if(state.ruleForm.customerId){
			state.ruleForm.settleDomainIds=null
	}
	state.ext = {
		customerId: selected.id,
	};
	nextTick(() => {
		if (settleDomainRef.value) settleDomainRef.value.refresh();
	});
};
/**
 * 客户分页列表
 */
const requestCustomer = async (params) => {
	try {
		const res = await getCustomerList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
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

const requestSettle = async (params) => {
	try {
		// console.log('获取结算主体信息：', params);
		const p = Object.assign({},params,{flag:'1'})
		const res = await getSettleDomainList(p);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
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

onMounted(() => {
	generateMonths(6); // 前后6个月
});

const onSubmit = () => {
	if (formRef.value) {
		formRef.value.validate((valid) => {
			if (valid) {
				// 校验通过
				let data = {};
				if (state.ruleForm.type == '0') {
					// 按个人
					data = {
						empIdCard: state.ruleForm.empIdCard,
						payMonths: state.ruleForm.payMonths.join(','),
					};
				} else if (state.ruleForm.type == '1') {
					// 按项目
					data = {
						payMonths: state.ruleForm.payMonths.join(','),
						settleDomainIds: state.ruleForm.settleDomainIds.map((item) => item.id).join(','),
					};
				}
				isLoading.value=true
				createForecastlibary(data).then(
					(res) => {
						if (res && res.code == 200) {
							ElMessage.success('生成成功');
							emits('ok');
							closeDialog();
						} else {
							ElMessage.error(res.msg || '生成失败');
						}
					},
					(error) => {
						ElMessage.error((error && error.msg) || '生成失败');
					}
				).finally(()=>{
						isLoading.value=false
					});
			}
		});
	}
};

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
	state.ruleForm = {};
};

// 打开弹窗
const openDialog = async (data) => {
	// console.log(data)
	state.data = data;
	state.ruleForm = {
		type: '0',
	};
	state.isShowDialog = true;

	nextTick(() => {
		setTimeout(() => {
			if (formRef.value) formRef.value.clearValidate();
		}, 100);
	});
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
	isLoading,
	
});
</script>

