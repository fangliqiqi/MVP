<template>
	<el-select placeholder="请选择" class="input" :model-value="state.select" filterable @change="change" :clearable="props.clearable">
		<el-option v-for="item in state.projects" :label="item.projectName" :value="item.deptNo" :key="item.deptNo"></el-option>
	</el-select>
</template>

<script setup name="ProjectSelect">
import { deptList } from '/@/api/insurance/custserve.js';

const props = defineProps({ 
	// modelValue: [String,Array], 
	modelValue:{
		type: [String,Array],
		default: ''
	},
	clearable: {
		 type: Boolean, 
		 default: true 
	} 
});
const emit = defineEmits(['update:modelValue']);

const state = reactive({
	projects: [],
	select: null,
});

watchEffect(() => {
	state.select = props.modelValue;
});

// 选中改变
const change = (val) => {
	emit('update:modelValue', val);
};

// if 后会重新执行，这块要不要缓存
onMounted(async () => {
	try {
		const data = await deptList();
		if (data.code === 200) {
			state.projects = data.data || [];
		}
	} catch {}
});
</script>
