<template>
	<div class="income-container">
		<div class="basic-info section-container">
			<div class="title">
				<span>个人所得税起征点</span>
			</div>

			<el-row>
				<el-col class="basic-info-item" :span="6">
					<span class="desc-title"> 个人所得税免征额</span>
					<div class="desc-content">{{ state.startPoint || EMPTY_PLACEHOLDER }}</div>
				</el-col>
			</el-row>
		</div>

		<div class="section-container">
			<div class="title">
				<span>个人所得税税率表</span>
			</div>

			<pro-table ref="proTableRef" row-key="id" :columns="state.params" :request="requestSalaryPage" :showHeader="false" customEmpty>
				<template #empty>
					<div>暂无数据</div>
				</template>
			</pro-table>
		</div>

		<div class="section-container">
			<div class="title">
				<span>全年一次性奖金(年终奖)个税税率表</span>
			</div>

			<pro-table ref="proTableYearRef" row-key="id" :columns="state.params" :request="requestYearSalaryPage" :showHeader="false" customEmpty>
				<template #empty>
					<div>暂无数据</div>
				</template>
			</pro-table>
		</div>
	</div>
</template>

<script setup name="所得税税率表">
import ProTable from '/@/components/ProTable/ProTable.vue';
import { getSalaryPage, getSalaryYearPage } from '/@/api/payservice/settings';
import { getAreaJson, loadNode, idToArea } from '/@/utils/city';
import { EMPTY_PLACEHOLDER, formatMoney } from '/@/utils/utils';
import { onRefresh, offRefresh } from '/@/utils/events';
import { ElMessage, ElMessageBox } from 'element-plus';
const proTableRef = ref(null);
const router = useRouter();
const route = useRoute();

const { proxy } = getCurrentInstance();
const refreshList = () => {
	// 列表刷新
	if (proTableRef.value) proTableRef.value.onSearch();
};

const state = reactive({
	searchConfig: {
		labelWidth: 90,
	},
	startPoint: null,
	params: [
		{
			dataIndex: 'level',
			title: '级数',
			minWidth: 220,
			tooltip: true,
			fixed: 'left',
		},
		{
			dataIndex: 'minIncome',
			title: '累计预扣预缴应纳税所得额下限',
			minWidth: 220,
			formatter: (row) => {
				return formatMoney(row.minIncome);
			},
		},
		{
			dataIndex: 'maxIncome',
			title: '累计预扣预缴应纳税所得额上限',
			minWidth: 220,
			formatter: (row) => {
				return formatMoney(row.maxIncome);
			},
		},
		{
			dataIndex: 'withholdingRate',
			title: '预扣率（%）',
			minWidth: 220,
		},
		{
			dataIndex: 'quickDeducation',
			title: '速算扣除数',
			minWidth: 220,
			formatter: (row) => {
				return formatMoney(row.quickDeducation);
			},
		},
	],
});

const listener = () => {
	onRefresh(proxy, route.path, () => {
		refreshList();
	});
};

onUnmounted(() => {
	offRefresh(proxy);
});

onMounted(() => {
	listener();
});

const requestSalaryPage = async (params) => {
	try {
		const res = await getSalaryPage(params);
		if (res && res.code == 200 && res.data) {
			if (res.data.records && res.data.records.length) {
				state.startPoint = res.data.records[0].startPoint;
			}
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		}
	} catch (e) {
		console.log('get exception:', e);
	}
	return {
		current: 1,
		total: 0,
		data: [],
	};
};

const requestYearSalaryPage = async (params) => {
	try {
		const res = await getSalaryYearPage(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records,
			};
		}
	} catch (e) {
		console.log('get exception:', e);
	}
	return {
		current: 1,
		total: 0,
		data: [],
	};
};
</script>

<style lang="scss" scoped src="./css/income.scss">

</style>
