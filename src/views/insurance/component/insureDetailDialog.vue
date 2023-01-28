<script setup name="insureDetailDialog">
const router = useRouter();

// 打开弹窗
const openDialog = async (data) => {
	router.push({ name: 'insurance-detail', params: { id: data.id } });
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>
<template>
	
</template>
