<template>
	<span ref="elRef">
		<el-tooltip :content="props.content" :placement="props.placement" :disabled="disabled">
			{{ props.content }}
		</el-tooltip>
	</span>
</template>

<script setup name="TooltipText">
const elRef = ref(null);
const props = defineProps({ content: '', placement: { type: String, default: 'top' }, parentPadding: { type: Number, default: 12 } });
const disabled = ref(true);

onMounted(async () => {
	await nextTick();

	disabled.value = width(elRef.value) < width(elRef.value?.parentNode, props.parentPadding);
});

onUpdated(async () => {
	await nextTick();

	disabled.value = width(elRef.value) < width(elRef.value?.parentNode, props.parentPadding);
});

const width = (el, offset) => {
	return (el?.clientWidth || el?.offsetWidth) - (offset || 0) || 0;
};
</script>
