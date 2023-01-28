<template>
	<div class="operate-log-container">
    <pro-table v-if="props.logSource.length>0" ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :showHeader="false" 
								customEmpty  tableExpand :searchConfig="state.searchConfig">
				<template v-slot:expand="item">
					<div class="diff-content" style="margin-left: 50px">
						<div>
							{{ item.updateTime }}由<span style="font-weight: bold"> {{ item.createName }}</span>
						</div>
						<div v-html="getTextInfo(item)"></div>
					</div>
				</template>
			</pro-table>
			<empty-view v-else></empty-view>
	</div>
</template>

<script setup name="detailRecord">
import ProTable from '/@/components/ProTable/ProTable.vue';
import EmptyView from '/@/components/EmptyView/index.vue';
import { FILTER_LOG_PARAMS,SOCIAIFUND_BASIC_TRANSLATE} from '/@/utils/header';
import { getDictByItemTypes } from '/@/utils/utils';
import { SEX_OPTION, SALARY_STATUS_OPTION } from '/@/utils/dicts';
import { getRecordLabel, getRecordValue } from '/@/utils/log';

const proTableRef = ref(null);

const props = defineProps({
	logSource: {
		type: Array,
		default: () => [],
	},
});

const state = reactive({
	dictKeys: [
		'emp_natrue',
		'emp_married',
		'emp_national',
		'emp_political',
		'emp_registype',
		'education',
		'commercial_satte',
		'social_ecurity_state',
		'fund_status',
		'personnel_state',
		'EMP_SOURCE',
		'social_reduce_reason',
		'project_emp_source',
	],
	DICTS: {
		collegeDict: {
			0: '否',
			1: '是',
		},
		fileStatusEnmu: {
			0: '草稿',
			1: '已审核',
		},
		salaryStatusOption: SALARY_STATUS_OPTION,
		sexOption: SEX_OPTION,
	},
	searchConfig:{
		pagination:false
	},
	columns: [
		{
			dataIndex: 'createName',
			title: '操作人',
			minWidth: 160,
		},
		{
			dataIndex: 'updateTime',
			title: '操作时间',
			minWidth: 160,
		},
		{
			dataIndex: 'differenceInfo',
			title: '操作内容',
			minWidth: 160,
			tooltip: true,
			formatter: (row) => {
				if (row.differenceInfo) {
					return getDiffText(row.differenceInfo);
				}
			},
		},
	],
	logSource: [],
});


const getDiffText = (val) => {
	const a = val.split(',');
	return a
		.filter((t) => !FILTER_LOG_PARAMS.includes(t))
		.map((item) => {
			return getRecordLabel(item, SOCIAIFUND_BASIC_TRANSLATE);
		})
		.join(',')
		.replace(/&emsp;/g, '');
};

const getTextInfo = (val) => {
	const differenceInfo = val.differenceInfo;
	const newInfo = JSON.parse(val.newInfo);
	const oldInfo = JSON.parse(val.oldInfo);
	const a = differenceInfo.split(',');
	return a
		.filter((t) => !FILTER_LOG_PARAMS.includes(t))
		.map((item) => {
			let div = "<div class='diff-item'>";
			const label = getRecordLabel(item, SOCIAIFUND_BASIC_TRANSLATE);
			let oldVal = '',
				newVal = '';
			oldVal = getRecordValue(item, oldInfo,SOCIAIFUND_BASIC_TRANSLATE);
			if ((oldVal == '' || oldVal == null || oldVal == undefined)&&oldVal!=0) {
				oldVal = '[空值]';
			}
			newVal = getRecordValue(item, newInfo, SOCIAIFUND_BASIC_TRANSLATE);

			if ((newVal == '' || newVal == null || newVal == undefined)&&newVal!=0) {
				newVal = '[空值]';
			}
			div += `<span>修改了</span><span style="font-weight:bold;">${label}</span>：<span style="color:var(	--hro-color-text-disabeld);" class='old-value'>${oldVal}</span>  ->  <span class='new-val'>${newVal}</span>`;
			div += '</div>';
			return div;
		})
		.join('');
};

const request = async (params) => {
	try {
		if (props.logSource && props.logSource.length) {
			const { current, size } = params;
			const beginIndex = (current - 1) * size;
			const endIndex = current * size;
			if (props.logSource.length >= beginIndex) {
				return {
					current,
					total: props.logSource.length,
					data: props.logSource.slice(beginIndex, endIndex),
				};
			}
			return {
				current: 1,
				total: props.logSource.length,
				data: props.logSource.slice(0, size),
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

onMounted(() => {
	loadDicts();
});

/**
 * 加载字典值
 */
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = Object.assign({}, state.DICTS, res);
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};


</script>

<style lang="scss" scoped src="./css/detailRecord.scss">
</style>
