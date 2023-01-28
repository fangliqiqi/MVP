<template>
	<div class="pro-form-container">
		<el-form ref="formRef" :model="formData" :label-width="props.labelWidth || 90" @submit.prevent size="default" :rules="props.rules">
			<slot name="header"></slot>
			<template v-if="props.divide">
             {{JSON.stringify(data)}}
				<!--当前时分组，数组嵌套数组对象, {name:'',data:[]}-->
				<div v-for="info in data" :key="`divider-info-${info.name}`">
					<slot :name="info.name"></slot>
					<el-row>
						<!--单个配置对象，{prop:'name',}-->
						<form-item v-for="item in info.data" :key="`divider-item-${item.prop}`" :label="item.label" :type="item.dataType" :span="span" />
					</el-row>
				</div>
			</template>

			<template v-else>
				<el-row>
					<!--单个配置对象，{prop:'name',}-->
					<form-item v-for="item in info" :key="`divider-item-${item.prop}`" :label="item.label" :type="item.dataType" :span="span" />
				</el-row>
			</template>
			<slot name="footer"></slot>
		</el-form>
	</div>
</template>

<script setup name="ProForm">
import FormItem from './Item.vue';

const props = defineProps({
	data: Array, // 配置form表格数组
	num: Number, // 单行显示form-item个数
	divide: Boolean, // 是否分组，分组的话，可提供模块化插入
	rules: Object, // 检验规则
});

const formRef = ref(null); // form的ref
const state = reactive({
	defaultSpan: 6,
	formData: {},
    data:[],
});

watch(
    ()=>props.data,
    (newVal,oldVal) => {

    }
)

const span = computed(() => {
	if (props.num) {
		return 24 / props.num;
	}
	return state.defaultSpan;
});


onMounted(()=>{
    
})

const data = computed(() => {
	if (props.data) {
		return props.data;
	}
	return [];
});

// 暴露变量
defineExpose({});
</script>

