<template>
	<div class="downshift-archives-dialog">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="95px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="保险公司" prop="companyName">
							<el-input v-model.trim="state.ruleForm.companyName" :disabled="state.nameDisableFlag"
								placeholder="请输入保险公司" clearable :maxlength="60"></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="地址" prop="companyAddress">
							<el-input v-model.trim="state.ruleForm.companyAddress" placeholder="请输入地址" :maxlength="50"
								clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="对接人" prop="companyDocking">
							<el-input v-model.trim="state.ruleForm.companyDocking" placeholder="请输入对接人" clearable
								:maxlength="20"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="商险办理地" prop="insuranceHandleCity">
							<page-area ref="pageAreaRef" :address="state.ruleForm.insuranceHandleCity"
								@current-change="changeAddress" @clear="clearAddress" style="width: 100%"
								:check-strictly="false" :has-town="false"></page-area>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="计费方式" prop="billingType">
							<el-radio-group v-model="state.ruleForm.billingType">
								<el-radio label="0">按天</el-radio>
								<el-radio label="1">按月</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">关闭</el-button>
					<el-button type="primary" @click="onSubmit" :loading="state.loading" size="default">保存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="downShiftDialog">
import { ElMessage } from 'element-plus';
import { saveInsuranceCompany, updateInsuranceCompany, selectComDetail } from '/@/api/insurance/company';
import pageArea from '/@/components/PageArea/index.vue';

const pageAreaRef = ref(null);

const formRef = ref(null);

const state = reactive({
	isShowDialog: false,
	loading: false,
	ruleForm: {
		companyName: '',
		companyAddress: '',
		companyDocking: '',
		billingType: '1',
		insuranceHandleProvince: null, // 商险办理地省
		insuranceHandleProvinceName: null, // 商险办理地省
		insuranceHandleCity: null, // 商险办理地市
		insuranceHandleCityName: null, // 商险办理地市
	},
	title: '',
	nameDisableFlag: false,
	isEdit: false
});

const rules = reactive({
	companyName: [{ required: true, message: '请输入保险公司', trigger: 'blur' }],
	companyAddress: [{ required: true, message: '请输入地址', trigger: 'blur' }],
	companyDocking: [{ required: true, message: '请输入对接人', trigger: 'blur' }],
	billingType: [{ required: true, message: '请选择计费方式', trigger: 'change' }],
	insuranceHandleCity: [{ required: true, message: '请选择商险办理地', trigger: 'change' }],
});

/**获取是否有保单详情 */
const getDetail = (name) => {
	selectComDetail({ CompanyName: name }).then((res) => {
		if (res.data && res.data.length > 0) {
			state.nameDisableFlag = true;
		}
	});
};

// 关闭弹窗
const closeDialog = () => {
	state.nameDisableFlag = false;
	state.ruleForm && (state.ruleForm.id = '');
	if (formRef.value) {
		formRef.value.resetFields();
	}
	state.isShowDialog = false;
	state.loading = false;
};

const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate(async (valid) => {
			if (valid) {
				// 表单校验通过
				state.loading = true;
				try {
					let res = null;
					if (state.ruleForm.id) {
						/**编辑 */
						res = await updateInsuranceCompany(state.ruleForm);
					} else {
						/**新增 */
						res = await saveInsuranceCompany(state.ruleForm);
					}
					if (res && res.code === 200) {
						// 减档成功
						ElMessage.success('操作成功');
						emits('ok', state.isEdit);
						state.ruleForm.id = '';
						closeDialog();
					} else {
						ElMessage.error(res.msg || '操作失败');
					}
				} catch (e) {
					console.log('get exception:', e);
					ElMessage.error('操作失败，请联系管理员');
				} finally {
					state.loading = false;
				}
			}
		});
};

// 打开弹窗
const openDialog = async (data) => {
	state.isShowDialog = true;
	state.title = '新增保险公司';
	state.isEdit = false
};

// 编辑弹窗
const editDialog = (data) => {
	state.isShowDialog = true;
	state.isEdit = true
	state.title = '编辑保险公司';
	getDetail(data.companyName);
	nextTick(() => {
		state.ruleForm = Object.assign(state.ruleForm, data);
	});

	setTimeout(() => {
		pageAreaRef.value.initParams();
	}, 50);
};

// 缴纳地
const changeAddress = (val) => {
	if (val.city) {
		// 选中城市才更新
		state.ruleForm.insuranceHandleProvince = val.pro; // 商险办理地省
		state.ruleForm.insuranceHandleProvinceName = val.proName; // 商险办理地省
		state.ruleForm.insuranceHandleCity = val.city; // 商险办理地市
		state.ruleForm.insuranceHandleCityName = val.cityName; // 商险办理地市
	}
};
const clearAddress = () => {
	state.ruleForm.insuranceHandleProvince = null; // 商险办理地省
	state.ruleForm.insuranceHandleProvinceName = null; // 商险办理地省
	state.ruleForm.insuranceHandleCity = null; // 商险办理地市
	state.ruleForm.insuranceHandleCityName = null; // 商险办理地市
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
	editDialog,
	rules,
});
</script>

<style lang="scss" scoped src="./css/downshiftDialog.scss">

</style>
