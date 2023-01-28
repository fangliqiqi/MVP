<template>
	<div class="downshift-archives-dialog">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="120px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="险种" prop="name">
							<el-input v-model.trim="state.ruleForm.name" placeholder="请输入险种"
								:disabled="state.nameDisableFlag" clearable :maxlength="50"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="保险公司" prop="insuranceCompanyId">
							<el-select v-model.trim="state.ruleForm.insuranceCompanyId" filterable style="width:100%"
								:disabled="state.nameDisableFlag">
								<el-option v-for="item in state.companyList" :key="'head' + item.id" :value="item.id"
									:label="item.companyName">{{
											item.companyName
									}}
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="收款银行" prop="bankName">
							<el-input v-model.trim="state.ruleForm.bankName" placeholder="请输入收款银行" :maxlength="50"
								clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="收款银行账号" prop="bankNo">
							<el-input v-model.trim="state.ruleForm.bankNo" placeholder="请输入收款银行账号" :maxlength="50"
								clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="收款单位" prop="receiptUnitName">
							<el-input v-model.trim="state.ruleForm.receiptUnitName" placeholder="请输入收款单位" :maxlength="50" clearable>
							</el-input>
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
import { addInsuranceType, insuranceCompanyList, editInsuranceType, selectInDetail } from '/@/api/insurance/company';
import { useRoute, useRouter } from 'vue-router';
import { InfoFilled } from '@element-plus/icons-vue';
import { getDictByItemTypes } from '/@/utils/utils';

const router = useRouter();
const formRef = ref(null);
const state = reactive({
	isShowDialog: false,
	loading: false,
	ruleForm: {},
	info: null,
	DICTS: {},
	dictKeys: ['downshift_reason'], // 减档原因
	companyList: [],
	title: '',
	flag: '',
	nameDisableFlag: false
});

const rules = reactive({
	name: [{ required: true, message: '请输入险种', trigger: 'blur' }],
	insuranceCompanyId: [{ required: true, message: '请选择保险公司', trigger: 'change' }],
	bankName: [{ required: true, message: '请输入收款银行', trigger: 'blur' }],
	bankNo: [{ required: true, message: '请输入收款银行账号', trigger: 'blur' }],
	receiptUnitName: [{ required: true, message: '请输入收款单位', trigger: 'blur' }],
});

onMounted(() => {
	loadDicts();
});

/**
 * 加载字典值
 */
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		const company = await insuranceCompanyList()
		console.log('compant', company)
		if (res) {
			state.DICTS = res;
		}
		if (company) {
			state.companyList = company.data
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

/**获取 */
const getDetail = (id) => {
	selectInDetail({ id: id }).then(res => {
		if (res.data && res.data.length > 0) {
			state.nameDisableFlag = true
		}
	})
}
// 关闭弹窗
const closeDialog = () => {
	state.nameDisableFlag = false
	state.ruleForm.id && (state.ruleForm.id = '')
	if (formRef.value) {
		formRef.value.resetFields()
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
						res = await editInsuranceType(state.ruleForm);
					} else {
						res = await addInsuranceType(state.ruleForm);
					}
					if (res && res.code === 200) {
						// 减档成功
						ElMessage.success(res.msg || '操作成功');
						emits('ok');
						closeDialog();
						state.loading = false;
					} else {
						state.loading = false;
						ElMessage.error(res.msg || '操作失败');
					}
				} catch (e) {
					console.log('get exception:', e);
					state.loading = false;
					ElMessage.error('操作失败，请联系管理员');
				}
			}
		});
};

// 打开弹窗
const openDialog = async (data) => {
	state.isShowDialog = true;
	state.title = '新增险种'
	state.flag = 'add'
};

/**编辑险种 */
const editDialog = (data) => {
	state.info = data;
	state.isShowDialog = true;
	state.title = '编辑险种'
	state.flag = 'edit'
	getDetail(data.id)
	nextTick(() => {
		state.ruleForm = {
			id: data.id,
			name: data.name,
			insuranceCompanyId: data.insuranceCompanyId,
			bankName: data.bankName,
			bankNo: data.bankNo,
			receiptUnitName: data.receiptUnitName
		};
	})
}

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
	editDialog
});
</script>

<style lang="scss" scoped src="./css/downshiftDialog.scss">
</style>
