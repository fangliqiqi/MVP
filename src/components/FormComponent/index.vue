<template>
	<div class="form-component-container" style="width: 100%">
		<template v-if="props.type === 'select'">
			<el-select
				v-model="state.val"
				:placeholder="props.placeholder || '请选择'"
				:disabled="isDisabled"
				:multiple="props.multiple || false"
				clearable
				@change="onChange"
				style="width: 100%"
			>
				<!-- 下拉选择-->
				<template v-if="props.options">
					<el-option v-for="(item, key) in options" :key="`select_${key}`" :value="item.value ?? key" :label="item.label ?? item" />
				</template>
				<slot></slot>
			</el-select>
		</template>

		<template v-else-if="props.type === 'tree-select'">
			<!-- 树状选择-->
			<el-tree-select
				v-model="state.val"
				style="width: 100%"
				:placeholder="props.placeholder || '请选择'"
				:props="props.props"
				:data="props.options"
				@current-change="changeIdAddress"
				@clear="clear"
				:node-key="props.nodeKey ?? 'id'"
				clearable
				:check-strictly="props.checkStrictly || true"
				@change="onChange"
			/>
		</template>

		<template v-else-if="props.type === 'page-select'">
			<!--分页下拉选择-->
			<page-select
				v-model="state.val"
				:request="props.request"
				:value-key="props.valueKey"
				:title="props.title"
				:disabled="isDisabled"
				:search="props.search"
				:options="state.pageOptions"
				:ext="props.ext || {}"
				:placeholder="props.placeholder || '请选择'"
				@change="onChange"
			/>
		</template>

		<template v-else-if="props.type === 'date'">
			<!--日期选择器-->
			<el-date-picker
				v-model="state.val"
				:type="props.dateType ?? 'date'"
				:format="props.dateFormat ?? 'YYYY-MM-DD'"
				clearable
				:disabled="isDisabled"
				:disabled-date="props.disabledDate"
				:placeholder="props.placeholder || '请选择'"
				:value-format="props.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
				style="width: 100%"
				@change="onChange"
			/>
		</template>

		<template v-else-if="props.type === 'unit-input'">
			<!--带单位的输入框-->
			<el-input
				v-model="state.val"
				:placeholder="props.placeholder || '请输入'"
				@keyup="oninput"
				:disabled="isDisabled"
				clearable
				style="width: 100%"
				:maxlength="props.maxLength ?? 20"
				@change="onChange"
			>
				<template v-if="props.unit" #append> {{ props.unit }}</template>
			</el-input>
		</template>

		<template v-else-if="props.type === 'radio'">
			<el-radio-group v-model="state.val" style="width: 100%" :disabled="isDisabled">
				<el-radio v-for="(item, key) in props.options" :key="item.value ?? key" :label="item.value ?? key">{{ item.label ?? item }}</el-radio>
			</el-radio-group>
		</template>

		<template v-else-if="props.type === 'textarea'">
			<el-input
				v-model="state.val"
				:rows="3"
				type="textarea"
				clearable
				:placeholder="props.placeholder || '请输入'"
				:disabled="isDisabled"
				style="width: 100%"
				show-word-limit
				:maxlength="props.maxLength ?? 200"
				@input="onChange"
			/>
		</template>

		<template v-else-if="props.type === 'number'">
			<el-input
				v-model="state.val"
				@keyup="oninput"
				clearable
				:placeholder="props.placeholder || '请输入'"
				:disabled="isDisabled"
				style="width: 100%"
				:maxlength="props.maxLength ?? 200"
				@input="onChange"
			/>
		</template>

		<template v-else>
			<!--input輸入框-->
			<el-input
				v-model="state.val"
				:placeholder="props.placeholder || '请输入'"
				:disabled="isDisabled"
				clearable
				style="width: 100%"
				:maxlength="props.maxLength ?? 20"
				@input="onChange"
			></el-input>
		</template>
	</div>
</template>
<script setup name="cardinalConfigDetail">
import PageSelect from '/@/components/PageSelect/index.vue';

const props = defineProps({
	placeholder: String, // placeholder文本
	clearable: Boolean, // 是否可清空
	modelValue: [String, Array, Object, Number], // v-model 配置
	type: String, // 组件类型，默认input[设置后不做修改]， select
	disabled: [Boolean, Function],
	options: [Object, Array], // 默认是select的传入选项或者是tree-select的预选项
	multiple: Boolean,
	nodeKey: String,
	checkStrictly: Boolean,
	props: Object, // 配置 el-tree-select
	onLoad: Function,
	request: Function, // page-select分页请求接口
	valueKey: String, // page-select选中对象的唯一属性值
	title: String, // page-select 显示值字段
	search: String, // 搜索字段参数
	ext: Object, // page-select 额外搜索条件
	dateType: String, // 日期选择器格式，默认：date，支持：year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange
	dateFormat: String, // 日期选择器	显示在输入框中的格式，默认YYYY-MM-DD
	unit: String, // unit-input 单位名
	maxLength: Number,
	valueFormat: String, // 日期格式value格式化
	disabledDate: Function,
	valueType: String, // unit-input
});

const state = reactive({
	val: null,
	pageOptions: null,
});

const emits = defineEmits(['change', 'clear', 'update:modelValue', 'currentChange', 'clear', 'onChange']);

const onChange = (val) => {
	emits('onChange', val);
};

// 下面那个watch不生效 用这个代替
watchEffect(() => {
	state.val = props.modelValue;
});

watch(
	() => state.val,
	(data) => {
		emits('update:modelValue', data)
	}
);

watch(
	() => props.modelValue,
	(data) => (state.val = data)
);

watch(
	() => props.options,
	(data) => {
		state.pageOptions = data;
	}
);

const oninput = (isNumber) => {
	if ((props.type != 'number' && props.valueType != 'number') || state.val == null || state.val == undefined) {
		return;
	}
	let value = state.val.replace(/[^0-9.]/g, '');
	if (value != '' && value != '.') {
		if (value.indexOf('.') === 0) {
			value = value.slice(1);
		}

		if (value.lastIndexOf('.') === value.length - 1 && value.indexOf('.') !== value.lastIndexOf('.')) {
			value = value.slice(0, value.length - 1);
		}
		if (value.indexOf('.') > -1) {
			state.val = value.slice(0, value.indexOf('.') + 3);
		} else {
			state.val = value;
		}
	} else {
		state.val = '';
	}
};

const isDisabled = computed(() => {
	if (typeof props.disabled === 'function') {
		return props.disabled();
	}
	return props.disabled;
});
const changeIdAddress = (val, node) => {
	emits('currentChange', val, node);
};

const clear = () => {
	emits('clear');
};
</script>

