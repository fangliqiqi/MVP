<template>
	<el-col :span="props.span || 6" :key="prop">
		<el-form-item :label="props.label" :prop="props.dataIndex" :label-width="props.labelWidth || `${String(props.label).length * 14 + 16 + 32}px`">
			<template v-if="props.type === 'select'">
				<!--普通下拉框-->
				<el-select
					v-model="state.value"
					style="width: 100%"
					:placeholder="props.placeholder || '请选择'"
					:auto-test="props.prop"
                    @change="change"
					clearable
					filterable
				>
					<el-option
						v-for="(option, oIndex) in options"
						:key="'pro-form-item' + item.prop + '_' + oIndex"
						:label="option.label"
						:value="option.value"
					/>
				</el-select>
			</template>

			<template v-else>
				<!--默认是输入文本-->
				<el-input
					v-model="state.value"
					:placeholder="props.placeholder || '请输入'"
					:auto-test="props.prop"
					clearable
					:maxlength="props.maxlength || 20"
				/>
			</template>
		</el-form-item>
	</el-col>
</template>

<script setup>
const props = defineProps({
	prop: String,
	label: String,
	labelWidth: Number,
	type: String, //
	placeholder: String,
	options: [Array, Function],
	maxlength: Number, // 最大长度
	modelValue: [Number, String, Array],
    span:Number,
});

const emits = defineEmits(['update:modelValue']);

watch(
	() => props.modelValue,
	(newVal, oldVal) => {
		handlerModelChange(newVal);
	}
);

const state = reactive({
	value: null,
});

const change = (val) => {
    emits('update:modelValue',val); // select更新数据

}

const handlerModelChange = (val) => {
    state.value = val
};

onMounted(() => {
	handlerModelChange(props.modelValue);
});

const options = computed(async () => {
	if (props.type === 'select') {
		if (Array.isArray(props.options)) {
			return props.options;
		}
		return await props.options();
	}
});
</script>
