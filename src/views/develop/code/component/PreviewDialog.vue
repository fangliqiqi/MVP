<template>
	<div class="system-add-menu-container">
		<el-dialog title="代码预览" v-model="state.isShowDialog" style="max-width: 90%; min-width: 1200px" width="80%" height="350px">
			<el-tabs v-model="state.activeName" type="card" stretch>
				<el-tab-pane v-for="(item, index) in state.data" :key="`preview-code-${index}`" :label="item.name" :name="item.name">
					<codemirror
						v-model="item.content"
						placeholder="Code gose here..."
						:style="{ maxHeight: '500px' }"
						:autofocus="true"
						:indent-with-tab="true"
						:tabSize="2"
                        disabled
						@ready="log('ready', $event)"
						@change="log('change', $event)"
						@focus="log('focus', $event)"
						@blur="log('blur', $event)"
					/>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>

<script setup name="systemAddMenu">
import { ElMessage } from 'element-plus';
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";



const  log =  console.log;

const extensions = reactive([]) 
const state = reactive({
	isShowDialog: false,
	activeName: '',
	data: [],
});

// 打开弹窗
const openDialog = (data) => {
	if (data && Object.keys(data).length) {
		const target = [];
		for (let key in data) {
			let k = key;
			if (key.length > 9) {
				k = key.substring(9, key.length - 3);
			}
			target.push({ name: k, content: data[key] });
		}

		if (target.length) {
			state.activeName = target[0].name;
		}
		state.data = target;
	}

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
const onSubmit = () => {};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped>
.system-add-menu-container {
	.mb20 {
		margin-bottom: 10px !important;
	}
}
</style>
