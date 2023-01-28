<template>
	<div class="system-add-config-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="880px">
			<el-form :model="state.ruleForm" size="default" label-width="80px">
				<el-row>
					<el-col :span="type === 0 ? 12 : 24" class="mb20">
						<el-form-item :prop="state.ruleForm.tableName" label="表名称">
							<el-input v-model="state.ruleForm.tableName" placeholder="请输入表名称" disabled />
						</el-form-item>
					</el-col>

					<el-col :span="12" class="mb20">
						<el-form-item label="包名" :prop="state.ruleForm.packageName">
							<el-input v-model="state.ruleForm.packageName" placeholder="可以为空，加载系统默认配置" />
						</el-form-item>
					</el-col>

					<el-col :span="12" class="mb20">
						<el-form-item label="作者" :prop="state.ruleForm.author">
							<el-input v-model="state.ruleForm.author" placeholder="可以为空，加载系统默认配置" />
						</el-form-item>
					</el-col>

					<el-col :span="12" class="mb20">
						<el-form-item label="模块" :prop="state.ruleForm.moduleName">
							<el-input v-model="state.ruleForm.moduleName" placeholder="可以为空，加载系统默认配置" clearable></el-input>
						</el-form-item>
					</el-col>

					<template v-if="state.type === 0">
						<el-col :span="12" class="mb20">
							<el-form-item label="表前缀" :prop="state.ruleForm.tablePrefix">
								<el-input v-model="state.ruleForm.tablePrefix" placeholder="可以为空，加载系统默认配置" clearable></el-input>
							</el-form-item>
						</el-col>
					</template>

					<el-col :span="12" class="mb20">
						<el-form-item label="注释" :prop="state.ruleForm.comments">
							<el-input v-model="state.ruleForm.comments" placeholder="可以为空，加载系统默认配置" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-form-item label="前端风格" :prop="state.ruleForm.style">
						<el-radio-group v-model="state.ruleForm.style" style="width: 100%">
							<el-radio-button :label="1">原生ELEMENT</el-radio-button>
							<el-radio-button :label="0">数据驱动AVUE</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onDownload" size="default">生 成</el-button>
					<template v-if="state.type === 0">
						<el-button type="primary" @click="onSubmit" size="default">预 览</el-button>
					</template>
				</span>
			</template>
		</el-dialog>

		<preview-dialog ref="previewDialog"></preview-dialog>
	</div>
</template>

<script setup name="systemAddConfig">
import PreviewDialog from './PreviewDialog.vue';
import { generatorPreview, generatorCode } from '/@/api/code';
import { ElMessage } from 'element-plus';

const previewDialog = ref(null);

const store = useStore();
const state = reactive({
	isShowDialog: false,
	title: '生成配置',
	type: 0, // 0:单个生成配置，1:批量生成配置
	ruleForm: {
		$style: '数据驱动AVUE',
		tableName: '',
		packageName: '',
		author: '',
		moduleName: '',
		tablePrefix: '',
		comments: '',
		style: 0, // 1：原生element,2:数据驱动AVUE
	},
	ext:{}
});

// 打开弹窗
const openDialog = (data, type,ext) => {
	state.type = type;
	state.ext = ext

	state.ruleForm = {
		$style: '数据驱动AVUE',
		tableName: data.tableName,
		packageName: '',
		author: '',
		moduleName: '',
		tablePrefix: '',
		comments: '',
		style: 0, // 1：原生element,2:数据驱动AVUE
	};
	state.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
};

// 取消
const onCancel = () => {
	closeDialog();
};
// 新增
const onSubmit = () => {
	const params = state.ruleForm;
	params.$style = state.ruleForm.style == 0 ? '数据驱动AVUE' : '原生ELEMENT';
	generatorPreview(Object.assign({},state.ruleForm,state.ext)).then(
		(res) => {
			if (res && res.code == 200) {
				previewDialog.value.openDialog(res.data);
			} else {
				ElMessage.error(res.msg || '预览生成失败');
			}
		},
		() => {
			ElMessage.error('预览生成失败');
		}
	);
};

const onDownload = () => {
	const params = state.ruleForm;
	params.$style = state.ruleForm.style == 0 ? '数据驱动AVUE' : '原生ELEMENT';
    generatorCode(Object.assign({},state.ruleForm,state.ext)).then(
		(res) => {
			if (res && res.code == 200) {
				ElMessage.success('生成代码成功')
			} else {
				ElMessage.error(res.msg || '生成代码失败');
			}
		},
		() => {
			ElMessage.error('生成代码失败');
		}
	);



};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped>
.system-add-config-container {
	.mb20 {
		margin-bottom: 10px !important;
	}
}
</style>
