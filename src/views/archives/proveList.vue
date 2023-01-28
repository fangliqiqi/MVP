<template>
	<div class="system-dict-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="columns"
			:request="request"
			:btn="btn"
			:searchConfig="searchConfig"
			:multi="true"
			@selectionChange="selectionChange"
		>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!--详情-->
		<table-detail ref="tableDetailRef" labelWidth="130px" :dictData="state.dict"></table-detail>
	</div>
</template>

<script setup name="证明开具记录">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { getDictByItemTypes } from '/@/utils/utils.js';
import { PROVE_HEADER_EXPORT } from '/@/utils/header';
import { exportExcel } from '/@/utils/xlsx';
import {exportExcelSheet} from '/@/utils/excel';
import TableDetail from '/@/components/TableDetail/index.vue';
import { ElMessage } from 'element-plus';
import { getProveList, getProveDetail, exportProveList } from '/@/api/prove';
import moment from 'moment';

const proTableRef = ref(null);
const tableDetailRef = ref(null);

// 批量导出
const handleBatchExport = () => {
	if (state.selectOptions.length > 0) {
		const ids = [];
		state.selectOptions.map((item) => {
			ids.push(item.id);
		});
		state.params = {
			// ids: ids.join(','),
			idList: ids,
		};
	} else {
		state.params = proTableRef.value.getParams();
		delete state.params.size;
		delete state.params.current;
	}
	state.btn.find((item) => item.label === '批量导出').loading = true;
	exportProveList(state.params).then((res) => {
		if(res.code==200){
			exportExcelSheet(
				PROVE_HEADER_EXPORT,
				res.data.map((item) => {
					return {
						empName: item.empName,
						empIdcard: item.empIdcard,
						projectName: item.projectName,
						projectCode: item.projectCode,
						type: state.dict.prove_type[item.type] || '',
						opener: item.opener || item.createName,
						openTime: item.openTime.substring(0, 10) || '',
					};
				}),
				`证明开具记录批量导出${moment().format('YYYYMMDD')}`,
			);
			ElMessage.success('导出成功');
		}else{
			ElMessage.error(res.msg);
		}
	}).catch((err) => {
		ElMessage.error('导出失败');
	}).finally(() => {
		state.btn.find((item) => item.label === '批量导出').loading = false;
	});
};

// 多选
const selectionChange = (res) => {
	state.selectOptions = res;
};

const state = reactive({
	searchConfig: {
		labelWidth: 110,
		option: {
			extBtn: 'extBtns',
		},
	},
	columns: [
		{
			dataIndex: 'empName',
			title: '员工姓名',
			minWidth: 180,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			minWidth: 200,
		},

		{
			dataIndex: 'projectName',
			title: '所在项目名称',
			minWidth: 160,
			tooltip: true,
		},
		{
			dataIndex: 'projectCode',
			title: '所在项目编码',
			hideInSearch: true,
			minWidth: 140,
		},
		{
			dataIndex: 'type',
			title: '证明类型',
			minWidth: 160,
			// formatter: (val) => {
			// 	return state.dict.prove_type[val.type] || val.type || '--';
			// },
			valueEnum: {
				0: '在职证明',
				1: '离职证明',
				2: '劳动合同终止（解除）证明书',
				3: '调档函',
				4: '代缴证明',
			},
			tooltip: true,
		},
		{
			dataIndex: 'createName',
			title: '开具人',
			minWidth: 140,
		},

		{
			dataIndex: 'createTime',
			title: '开具时间',
			minWidth: 180,
			valueType: 'dateTimeRange',
			searchIndex: 'createTimes',
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			minWidth: 100,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],

	btn: [
		{
			label: '批量导出',
			permission: ['prove_batch_export'],
			onClick: handleBatchExport,
			icon: 'icon-ic_edit_export',
			loading:false,
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: ['demo_tcertrecord_get'], // 权限标识
		},
	],
	detailConf: {
		0: [
			{ label: '员工姓名', key: 'empName' },
			{ label: '身份证号', key: 'empIdcard' },
			{ label: '项目名称', key: 'projectName', tooltip: true },
			{ label: '就职岗位', key: 'post', tooltip: true },
			{ label: '合同开始时间', key: 'firstContractTime', date: 'YYYY-MM-DD' },
			{ label: '合同结束时间', key: 'contractEnd', date: 'YYYY-MM-DD' },
			{ label: '印章名称', key: 'seal',tooltip:true},
			{ label: '开具证明当天时间', key: 'openTime', date: 'YYYY-MM-DD' },
			{ label: '开具人', key: 'createName' },
			{ label: '开具时间', key: 'createTime' },
		],
		1: [
			{ label: '员工姓名', key: 'empName' },
			{ label: '身份证号', key: 'empIdcard' },
			{ label: '项目名称', key: 'projectName', tooltip: true },
			{ label: '就职岗位', key: 'post', tooltip: true },
			{ label: '派减离职时间', key: 'leaveTime', date: 'YYYY-MM-DD' },
			{ label: '派减离职原因', key: 'leaveReason', tooltip: true },
			{ label: '印章名称', key: 'seal',tooltip:true },
			{ label: '开具证明当天时间', key: 'openTime', date: 'YYYY-MM-DD' },
			{ label: '开具人', key: 'createName' },
			{ label: '开具时间', key: 'createTime' },
		],
		2: [
			{ label: '员工姓名', key: 'empName' },
			{ label: '身份证号', key: 'empIdcard' },
			{ label: '来我单位时间', key: 'entryTime', date: 'YYYY-MM-DD' },
			{ label: '签订合同时间', key: 'firstContractTime', date: 'YYYY-MM-DD' },
			{ label: '派单离职原因', key: 'leaveReason', tooltip: true },
			{ label: '性别', key: 'sex', dict: 'prove_peo_sex' },
			{ label: '印章名称', key: 'seal',tooltip:true},
			{ label: '开具证明当天时间', key: 'openTime', date: 'YYYY-MM-DD' },
			{ label: '开具人', key: 'createName' },
			{ label: '开具时间', key: 'createTime' },
		],
		3: [
			{ label: '介绍单位', key: 'introductionUnit', size: 24, tooltip: true },
			{ label: '员工姓名', key: 'empName' },
			{ label: '身份证号', key: 'empIdcard' },
			{ label: '印章名称', key: 'seal',tooltip:true },
			{ label: '开具证明当天时间', key: 'openTime', date: 'YYYY-MM-DD' },
			{ label: '开具人', key: 'createName' },
			{ label: '开具时间', key: 'createTime' },
		],
		4: [
			{ label: '员工姓名', key: 'empName' },
			{ label: '身份证号', key: 'empIdcard' },
			{ label: '参保开始时间', key: 'socialTime', date: 'YYYY-MM-DD' },
			{ label: '项目名称', key: 'projectName', tooltip: true },
			{ label: '印章名称', key: 'seal',tooltip:true},
			{ label: '开具证明当天时间', key: 'openTime', date: 'YYYY-MM-DD' },
			{ label: '开具人', key: 'createName' },
			{ label: '开具时间', key: 'createTime' },
		],
	},
	selectOptions: [], //多选数据
	params: {}, //导出请求数据
	dict: {
		prove_type: null,
		prove_peo_sex: null,
	}, //字典数据
});

// const proPeoSex = computed(() => {
// 	if (state.dict.prove_peo_sex) {
// 		return state.dict.prove_peo_sex;
// 	}
// });

const { columns, cellBtns, btn, searchConfig } = toRefs(state);

const request = async (params) => {
	try {
		const res = await getProveList(params);
		if (res && res.code == 200 && res.data) {
			return {
				current: res.data.current,
				total: res.data.total,
				data: res.data.records.map((item, i) => {
					return {
						...item,
						index: (params.current - 1) * params.size + i + 1,
					};
				}),
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

const onCellClick = async (prop, item) => {
	if (prop === 'detail') {
		// 详情
		const res = await getProveDetail(item.id);
		try {
			if (res.code == 200) {
				const data = res.data;
				const title = state.dict.prove_type[data.type] + '详情';
				tableDetailRef.value.openDialog(data, state.detailConf[data.type], title);
			} else {
				ElMessage.error(res.msg || '获取证明开具详情失败');
			}
		} catch (error) {
			ElMessage.error('获取证明开具详情失败');
		}
	}
};

onMounted(() => {
	// 请求字典数据
	getDictByItemTypes(['prove_type', 'prove_peo_sex']).then((res) => {
		state.dict = res;
	});
});
</script>

