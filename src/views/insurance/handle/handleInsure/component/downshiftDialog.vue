<template>
	<div class="downshift-archives-dialog">
		<el-dialog title="减档" v-model="state.isShowDialog" :close-on-click-modal="false" width="576px" @close="closeDialog">
			<div class="tips">
				<el-icon><InfoFilled /></el-icon> <span style="vertical-align: text-bottom">减档后，档案将流转到“离职库”</span>
			</div>
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="90px">
				<el-row style="margin-top: 40px">
					<el-col class="mb20">
						<el-form-item label="减档原因" prop="leaveReason">
							<el-select v-model="state.ruleForm.leaveReason" placeholder="请选择减档原因" style="width: 100%">
								<el-option v-for="(item, key) in state.DICTS['downshift_reason']" :label="item" :value="key" :key="key"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="减档备注" prop="leaveRemark">
							<el-input v-model="state.ruleForm.leaveRemark" type="textarea" placeholder="请输入减档备注" maxlength="200" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item> </el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="downShiftDialog">
import { ElMessage } from 'element-plus';
import { minusStaff } from '/@/api/staff';
import { useRoute, useRouter } from 'vue-router';
import { InfoFilled } from '@element-plus/icons-vue';
import { getDictByItemTypes } from '/@/utils/utils';

const router = useRouter();
const formRef = ref(null);
const state = reactive({
	isShowDialog: false,
	ruleForm: {},
	info: null,
	DICTS: {},
	dictKeys: ['downshift_reason'], // 减档原因
});

const rules = reactive({
	leaveReason: [{ required: true, message: '请选择减档原因', trigger: 'blur' }],
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
		if (res) {
			state.DICTS = res;
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
};

const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate(async (valid) => {
			if (valid) {
				// 表单校验通过
				try {
					const res = await minusStaff(state.ruleForm);
					if (res && res.code === 200) {
						// 减档成功
						ElMessage.success('减档成功');
						emits('ok');
						closeDialog();
					} else {
						ElMessage.error(res.msg || '减档失败，请联系管理员');
					}
				} catch (e) {
					console.log('get exception:', e);
					ElMessage.error('减档失败，请联系管理员');
				}
			}
		});
};

// 打开弹窗
const openDialog = async (data) => {
	state.info = data;
	state.ruleForm = {
		id: data.id,
	};
	state.isShowDialog = true;
};

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/downshiftDialog.scss">

</style>
