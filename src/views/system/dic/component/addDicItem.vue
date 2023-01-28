<template>
	<div class="system-add-dic-item-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="550px" @close="closeDialog">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="100px">
				<el-row>
					<el-col class="mb20">
						<el-form-item label="字典编码" prop="type">
							<el-input v-model="state.ruleForm.type" placeholder="请输入字典编码" maxlength="100" disabled></el-input>
						</el-form-item>
					</el-col>

					<!--父级字典值-->
					<el-col class="mb20" v-if="state.modal.parentItemType">
						<el-form-item label="父级字典值" prop="parentId">
							<page-select
								ref="pageSelectRef"
								v-model="state.ruleForm.parentId"
								placeholder="请选择父级字典值"
								:request="request"
								value-key="value"
								title="label"
								search="label"
								:options="state.options"
							>
							</page-select>
							<!-- <el-input v-model="state.ruleForm.type" placeholder="请输入父级字典值" maxlength="100" disabled></el-input> -->
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="数据值" prop="value">
							<el-input v-model.trim="state.ruleForm.value" type="number" placeholder="请输入数据值" maxlength="100" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="标签名" prop="label">
							<el-input v-model="state.ruleForm.label" placeholder="请输入标签名" maxlength="100" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="描述" prop="description">
							<el-input v-model="state.ruleForm.description" placeholder="请输入描述" maxlength="100" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col class="mb20">
						<el-form-item label="备注信息" prop="remark">
							<el-input v-model="state.ruleForm.remark" type="textarea" placeholder="请输入备注信息" maxlength="255"></el-input>
						</el-form-item>
					</el-col>
					<el-col class="mb20">
						<el-form-item label="排序" prop="sortOrder">
							<el-input-number v-model="state.ruleForm.sortOrder" placeholder="请输入排序" clearable :min="0"></el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" :loading="isShowLoading" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="systemAddDicItem">
import { getDicItemInfo, addDicItem, updateDicItem, getDicItemPage } from '/@/api/dict';
import { ElMessage } from 'element-plus';
import PageSelect from '/@/components/PageSelect/index.vue';

const formRef = ref(null);
const pageSelectRef = ref(null);

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	item: null,
	title: '新增字典值',
	ruleForm: {
		type: '', // 字典编码
		value: '', // 字典值
		label: '', // 字典文本
		remark: '', // 备注信息
		sortOrder: null, // 排序
		description: '', // 描述
		parentId: '',
	},
	options: [],
	modal: null,
	ext: {},
});

const rules = {
	type: [{ required: true, message: '请输入字典编码', trigger: 'blur' }],
	value: [{ required: true, message: '请输入数据值', trigger: 'blur' }],
	label: [{ required: true, message: '请输入标签名', trigger: 'blur' }],
	sortOrder: [{ required: true, message: '请输入排序', trigger: 'blur' }],
	parentId: [{ required: true, message: '请选择父级字典值', trigger: 'blur' }],
};

// 打开弹窗
const openDialog = async (data) => {
	state.item = data.item;
	state.modal = data.modal;

	state.ext = { type: data.modal.parentItemType };
	if (data.item && data.item.id) {
		// 编辑
		state.title = '编辑字典';
		state.id = data.item.id;
		state.options = [{ value: data.item.parentId, label: data.item.parentLabelOfValue }];
		await getDetail(data.item.id);
	} else {
		// 新增
		state.title = '新增字典';
		state.id = null;
		state.ruleForm = {
			type: data.item.type,
			dictId: data.item.dictId,
		};
	}
	state.isShowDialog = true;
};

const getDetail = async (id) => {
	try {
		const res = await getDicItemInfo(id);
		if (res && res.code === 200) {
			state.ruleForm = { ...res.data };
		} else {
			ElMessage.error(res.msg || '获取字典详情失败');
		}
	} catch (e) {
		console.log('get exception:', e);
		closeDialog();
		ElMessage.error('获取字典详情失败');
	}
};

const request = async (params) => {
	try {
		const p = Object.assign({},params,state.ext);
		console.log('发起父级字典值请求：',p)
		const res = await getDicItemPage(p);
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

// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
const isShowLoading = ref(false)
// 新增
const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
				isShowLoading.value = true
				const params = { ...state.ruleForm };

				delete params.parentLabelOfValue;
				// 校验通过
				if (state.id !== null && state.id !== undefined) {
					// 编辑操作
					updateDicItem(params).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('编辑字典成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '编辑字典失败');
							}
						},
						() => {
							ElMessage.error('编辑字典失败');
						}
					).finally(()=>{
						isShowLoading.value = false
					});
				} else {
					// 新增操作
					addDicItem(params).then(
						(res) => {
							if (res && res.code == 200) {
								ElMessage.success('新增字典成功');
								emits('ok');
								closeDialog(); // 关闭弹窗
							} else {
								ElMessage.error(res.msg || '新增字典失败');
							}
						},
						() => {
							ElMessage.error('新增字典失败');
						}
					).finally(()=>{
						isShowLoading.value = false
					});
				}
			}
		});
};
const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/addDicItem.scss">
</style>
