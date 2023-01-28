<template>
	<el-select placeholder="请选择" class="input" :model-value="state.select" filterable @change="change" :clearable="props.clearable">
		<el-option v-for="item in state.projects" :label="item.companyName" :value="item.companyName" :key="item.companyName"></el-option>
	</el-select>
</template>

<script setup name="CompanySelect">
import { insuranceCompanyList } from '/@/api/insurance/company.js';

const props = defineProps({ modelValue: Array, clearable: { type: Boolean, default: true } });
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
onMounted(() => {
	insuranceCompanyList().then((res) => {
		state.projects = res.data;
	});
});
</script>
