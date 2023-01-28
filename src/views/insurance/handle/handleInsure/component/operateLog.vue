<template>
	<div class="operate-log-container">
		<el-dialog title="操作日志" v-model="state.isShowDialog" :close-on-click-modal="false" width="1216px" @close="closeDialog">
			<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :showHeader="false" customEmpty manualRequest tableExpand>
				<template v-slot:expand="item">
					<!--expand -->
					<div class="diff-content" style="margin-left: 50px">
						<div>
							{{ item.updateTime }}由<span style="font-weight: bold"> {{ item.createName }}</span>
						</div>
						<div v-html="getTextInfo(item)"></div>
					</div>
				</template>
			</pro-table>
		</el-dialog>
	</div>
</template>

<script setup name="operateLog">
import { getStaffChangeLog } from '/@/api/staff';
import ProTable from '/@/components/ProTable/ProTable.vue';
import { FILTER_LOG_PARAMS } from '/@/utils/header';
import { getDictByItemTypes } from '/@/utils/utils';
import { SEX_OPTION, SALARY_STATUS_OPTION } from '/@/utils/dicts';
import { getLogDictValue, getLogDictLabel } from '/@/utils/log';

const proTableRef = ref(null);

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
	isShowDialog: false,
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
			return getLogDictLabel(item, 'staff');
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
			const label = getLogDictLabel(item, 'staff');
			let oldVal = '',
				newVal = '';
			oldVal = getLogDictValue(item, oldInfo, state.DICTS);

			if (oldVal == '' || oldVal == null || oldVal == undefined) {
				oldVal = '[空值]';
			}
			newVal = getLogDictValue(item, newInfo, state.DICTS);

			if (newVal == '' || newVal == null || newVal == undefined) {
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
		if (state.logSource && state.logSource.length) {
			const { current, size } = params;
			const beginIndex = (current - 1) * size;
			const endIndex = current * size;
			if (state.logSource.length >= beginIndex) {
				return {
					current,
					total: state.logSource.length,
					data: state.logSource.slice(beginIndex, endIndex),
				};
			}
			return {
				current: 1,
				total: state.logSource.length,
				data: state.logSource.slice(0, size),
			};
		}

		const res = await getStaffChangeLog(Object.assign({}, params, { empId: state.info.id }));
		if (res && res.code == 200 && res.data) {
			const data = res.data;
			state.logSource = data;
			return {
				current: 1,
				total: data.length,
				data: data.slice(0, params.size),
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

// 打开弹窗
const openDialog = async (data) => {
	state.info = data;
	state.isShowDialog = true;

	nextTick(() => {
		if (proTableRef.value) proTableRef.value.refresh();
	});
};

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss" scoped src="./css/operateLog.scss">

</style>
