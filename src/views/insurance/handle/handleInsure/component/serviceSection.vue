<template>
	<div class="service-info section-container">
		<div class="title">
			<span>整体服务概览</span>
		</div>

		<!--部分字典信息-->
		<el-row>
			<el-col v-for="item in state.params" :key="`basicInfo_${item}`" class="basic-info-item" :span="getColNumber(item)">
				<span class="desc-title" v-html="getStaffTitle(item)"> </span>
				<div class="desc-content">
					<el-tooltip placement="top-start" effect="dark" popper-class="detail-tooltip-popper">
						<template #content>
							<div class="detail-tooltip-container">
								<span v-html="getStaffValue(item)"> </span>
							</div>
						</template>
						<span>{{ getStaffValue(item) }} </span>
					</el-tooltip>
				</div>
			</el-col>
		</el-row>

		<!--项目列表信息-->
		<template v-if="showProject">
			<el-tabs v-model="state.attachActiveTab" :class="`project-tabs ${currentIsReduce ? 'reduce-tabs' : ''}`" style="margin-top: 16px">
				<el-tab-pane v-for="item in props.projects" :key="`project_tab_${item.id}`" :name="item.id">
					<template #label>
						<div :class="`pro-custom-tab ${item.projectStatus == 1 ? 'is-reduce' : ''}`">
							<span>
								{{ item.deptName }}
							</span>
						</div>
					</template>
					<!--项目详情-->
					<staff-project :info="item"></staff-project>
				</el-tab-pane>
			</el-tabs>
		</template>
	</div>
</template>

<script setup name="serviceSection">
import ProTable from '/@/components/ProTable/ProTable.vue';
import staffProject from './staffProject.vue';
//  字典设置的已减项为3,若修改需要同步修改

const props = defineProps({
	getStaffTitle: Function,
	getStaffValue: Function,
	getColNumber: Function,
	projects: Array,
});

const currentIsReduce = computed(() => {
	if (props.projects && props.projects.length) {
		const target = props.projects.find((item) => item.id === state.attachActiveTab);
		if (target && target.projectStatus == 1) {
			return true;
		}
	}
	return false;
});

onMounted(() => {
	if (props.projects && props.projects.length) {
		state.attachActiveTab = props.projects[0].id;
	}
});

watch(
	() => props.projects,
	(newVal, oldVal) => {
		if (newVal && newVal.length) {
			state.attachActiveTab = props.projects[0].id;
		} else {
			state.attachActiveTab = null;
		}
	}
);

const showProject = computed(() => {
	if (props.projects && props.projects.length) {
		return true;
	}
	return false;
});

const state = reactive({
	params: ['contractStatus', 'socialStatus', 'fundStatus', 'insuranceStatus', 'salaryStatus'],
	attachActiveTab: null,
});
</script>
<style lang="scss" scoped src="./css/serviceSection.scss">

</style>
