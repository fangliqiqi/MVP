<template>
	<div>
		<el-tree-select
			:model-value="address"
			ref="treeSelect"
			style="width: 100%"
			placeholder="请选择"
			:props="areaProps"
			:data="state.areaJson"
			:disabled="props.disabled"
			@current-change="changeFileAddress"
			@clear="clearFileAddress"
			node-key="id"
			:load="loadArea"
			:check-strictly="props.checkStrictly"
			clearable
			filterable
			:filter-method="filterMethod"
		/>
	</div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { getAreaJson, getCityLevelJson, loadNode } from '/@/utils/city';

const treeSelect = ref(null);

const props = defineProps({
	placeholder: {
		type: String,
		default: '请选择',
	},
	areaProps: {
		type: Object,
		default: () => ({
			label: 'areaName',
			isLeaf: 'isLeaf',
			children: 'children',
			disabled: 'disabled',
		}),
	},
	hasTown: {
		//是否数据中包含镇级数据
		type: Boolean,
		default: true,
	},
	address: {
		//地址显示
		type: Number,
		default: null,
	},
	disabled: {
		type: Boolean,
		default: false,
	},

	// 当属性 check-strictly=true 时，任何节点都可以被选择，否则只有子节点可被选择。
	checkStrictly: {
		type: Boolean,
		default: true,
	},
});

const state = reactive({
	areaJson: [],
	address: null,
});

const { areaProps, address } = toRefs(props);
const emits = defineEmits(['current-change', 'clear']);

// 省市区选择
const changeFileAddress = (val, node) => {
	const values = [val.id];
	const names = [val.areaName];
	if (node.parent && node.parent.level != 0) {
		// 获取市或者省
		values.unshift(node.parent.data.id);
		names.unshift(node.parent.data.areaName);
		if (node.parent.parent && node.parent.parent.level != 0) {
			// 获取省
			values.unshift(node.parent.parent.data.id);
			names.unshift(node.parent.parent.data.areaName);
		}
	}
	const area = {
		pro: null,
		city: null,
		town: null,
	};

	area.pro = values[0] || null;
	area.proName = names[0] || null;
	if (values.length > 1) area.city = values[1] || null;
	if (values.length > 2) area.town = values[2] || null;

	if (names.length > 1) area.cityName = names[1] || null;
	if (names.length > 2) area.townName = names[2] || null;

	emits('current-change', area, val.label);
};

// 清除省市区
const clearFileAddress = () => {
	const area = {
		pro: null,
		city: null,
		town: null,
	};
	initParams();
	emits('clear', area);
};

// 加载省市区
const loadArea = (node, resolve) => {
	const level = node.level;
	const isLeaf = node.isLeaf;

	if (level === 0) {
		const data = loadNode(0);
		resolve(data);
	} else if (isLeaf) {
		return resolve([]);
	} else {
		return resolve(loadNode(node.data.id));
	}
	return resolve([]);
};

const data = state.areaJson;

const filterMethod = (value) => {
	if (!value) {
		initParams();
	}
};

const initParams = () => {
	if (!props.hasTown) {
		const json = getCityLevelJson();
		state.areaJson = json;
		return;
	}
	const json = getAreaJson();
	state.areaJson = json;
};

onMounted(() => {
	initParams();
});

defineExpose({
	initParams,
});
</script>
