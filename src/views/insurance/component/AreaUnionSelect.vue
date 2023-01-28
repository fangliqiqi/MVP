<template>
	<div class="area-union-select">
		<el-form-item class="select-item">
			<el-select :disabled="disabled" placeholder="省份" class="input" :model-value="state.formData.pro" filterable @change="pChange">
				<el-option v-for="item in state.provinces" :label="item.areaName" :value="item.id" :key="item.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item class="select-item">
			<el-select :disabled="disabled" placeholder="城市" class="input" :model-value="state.formData.city" filterable @change="cChange">
				<el-option v-for="item in citys" :label="item.areaName" :value="item.id" :key="item.id"></el-option>
			</el-select>
		</el-form-item>
	</div>
</template>

<script setup name="AreaUnionSelect">
import { loadNode } from '/@/utils/city';
import { formItemContextKey } from 'element-plus';

const props = defineProps({ modelValue: Array, validateEvent: Boolean, disabled: Boolean });
const emit = defineEmits(['update:modelValue']);

const formItem = inject(formItemContextKey, null);

const state = reactive({
	provinces: [],
	formData: {
		pro: null,
		city: null,
	},
});

watchEffect(() => {
	state.formData.pro = props.modelValue ? props.modelValue[0] : null;
	state.formData.city = props.modelValue ? props.modelValue[1] : null;
});

const citys = computed(() => {
	return loadNode(state.formData.pro) || [];
});

// 省选中改变
const pChange = (val) => {
	emit('update:modelValue', [val]);
};

// 市选中改变
const cChange = (val) => {
	emit('update:modelValue', [state.formData.pro, val]);

	if (formItem && formItem.validate) {
		formItem.validate.call(formItem, 'change');
	}
};

onMounted(() => {
	state.provinces = loadNode(0);
});
</script>

<style lang="scss" scoped src="./css/AreaUnionSelect.scss">

</style>
