<template>
	<div class="system-dict-container">
		<pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :multi="true"
			:searchConfig="searchConfig" @selectionChange="selectionChange" @onReset="onReset">
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
		<!--批量导出  -->
		<export-excel-dialog ref="exportExcelRef" :heads="exportFig.header" :title="exportFig.title" />
	</div>
</template>

<script setup name="合同查询">
import { reactive, ref, toRefs } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import { CONTRACT_EXPORT_HEADER, CONTRACT_EXPORT_HEADER_HISTORY } from '/@/utils/header';
import { getDictByItemTypes } from '/@/utils/utils';
import { getAreaJson, loadNode, idToArea } from '/@/utils/city';
import { getContractSearchList, exportContract, exportContractHistory } from '/@/api/contract';
import { useRouter } from 'vue-router';
const proTableRef = ref(null);
const router = useRouter();
const exportExcelRef = ref(null);
const exportExcelRef_HeBinExportRef = ref(null);

const  exportFig = reactive({
  header: [],
  title: '员工合同导出',
});
// 批量导出
const handleBatchExport = () => {
	exportFig.header = CONTRACT_EXPORT_HEADER
	exportFig.title = '员工合同导出'
	exportExcel(exportContract)
};
// 合并导出
const handleBatchExportHistory = () => {
	exportFig.header = CONTRACT_EXPORT_HEADER_HISTORY
	exportFig.title = '员工合同【合并历史】导出'
	exportExcel(exportContractHistory)
}


//导出操作
const exportExcel = (exportUrl) => {

	let searchParams = Object.assign({}, proTableRef.value.getParams(), state.params);
	delete searchParams.size;
	delete searchParams.current;
	
	exportExcelRef.value &&
		exportExcelRef.value.openDialog((params, exportFile) => {
			const data = {
				...searchParams,
				exportFields: params.map((item) => item.dataIndex),
			};
			const idList = state.selectionChangeList.map((t) => t.id);
			if (idList && idList.length) {
				data.idList = idList;
			}
			delete data.startEndTime;
			exportUrl({}, data).then((res) => {
				if (res.code && res.code !== 200) {
					ElMessageBox.error(res.msg);
				}
				exportFile(true);
			});
		});
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
			dataIndex: 'type',
			title: '审核类型',
			hideInSearch: false,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'applyNo',
			title: '申请编号',
			minWidth: 180,
		},
		{
			dataIndex: 'empNo',
			title: '员工编码',
			minWidth: 180,
		},
		{
			dataIndex: 'empName',
			title: '员工姓名',
			minWidth: 160,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			minWidth: 200,
		},
		{
			dataIndex: 'contractStart',
			title: '合同起始日期',
			hideInSearch: true,
			minWidth: 160,
			dateFormat: 'YYYY-MM-DD',
		},
		{
			dataIndex: 'contractEnd',
			title: '合同截止日期',
			hideInSearch: true,
			minWidth: 160,
			dateFormat: 'YYYY-MM-DD',
		},
		{
			dataIndex: 'fileAddress',
			title: '档案所在地',
			minWidth: 200,
			hideInSearch: true,
			tooltip: true,
			formatter: (row) => {
				return idToArea({ province: row.fileProvince, city: row.fileCity, town: row.fileTown });
			},
		},

		{
			dataIndex: 'subjectDepart',
			title: '项目名称',
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'deptNo',
			title: '项目编码',
			minWidth: 160,
		},
		{
			dataIndex: 'empNatrue',
			title: '员工类型',
			minWidth: 160,
		},
		{
			dataIndex: 'archivesLocation',
			title: '档案所在地',
			minWidth: 200,
			valueType: 'addRess',
			tooltip: true,
			hideInTable: true,
			params: {
				pro: 'fileProvince',
				city: 'fileCity',
				town: 'fileTown'
			},
		},
		{
			dataIndex: 'fddFlag',
			title: '签署方式',
			hideInTable: true,
		},
		{
			dataIndex: 'contractName',
			title: '合同类型',
			minWidth: 200,
		},
		{
			dataIndex: 'contractSubName',
			title: '业务细分',
			minWidth: 200,
		},
		{
			dataIndex: 'situation',
			title: '签订类型',
			minWidth: 200,
		},
		{
			dataIndex: 'contractType',
			title: '签订期限',
			minWidth: 200,
		},
		{
			dataIndex: 'contractParty',
			title: '合同甲方',
			minWidth: 200,
			tooltip: true
		},
		{
			dataIndex: 'subjectUnit',
			title: '客户名称',
			minWidth: 200,
			tooltip: true
		},
		{
			dataIndex: 'auditStatus',
			title: '审核状态',
			minWidth: 160,
		},
		{
			dataIndex: 'inUse',
			title: '合同状态',
			minWidth: 160,
		},
		{
			dataIndex: 'isFile',
			title: '附件状态',
			minWidth: 160,
			formatter: (row) => {
				return row.isFile === '1' ? '无' : '有';
			},
			hideInSearch: true,
		},
		{
			dataIndex: 'isAtta',
			title: '附件状态',
			minWidth: 160,
			hideInTable: true,
			valueEnum: {
				0: '有',
				1: '无'
			}
		},
		{
			dataIndex: 'isFile',
			title: '归档状态',
			minWidth: 160,
		},

		{
			dataIndex: 'createName',
			title: '创建人',
			minWidth: 180,
		},
		{
			dataIndex: 'createTime',
			title: '创建时间',
			minWidth: 180,
			searchIndex: 'startEndTime',
			startTime: 'createTimeStart',
			endTime: 'createTimeEnd',
			valueType: 'dateTimeRange',
		},

		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			minWidth: 140,
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
			permission: ['employee_export_contract'],
			onClick: handleBatchExport,
			icon: 'icon-ic_edit_export',
		},
		{
			label: '导出【合并历史】',
			permission: ['employee_export_contract_history'],
			onClick: handleBatchExportHistory,
			type: 'normal',
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: ['temployeecontractinfo_detail'], // 权限标识
		}
	],
	dictKeys: [  //字典项
		'emp_natrue',//员工类型
		'contract_sign_type',//签署方式
		'personnel_type',//合同类型
		'contract_business_type',//业务细分
		'situation_type',// 签订类型
		'employee_contract_type',//签订期限
		'contract_audit_status',//审核状态
		'contract_status',//合同状态
		'contract_file_status',//合同归档/附件状态
		'check_type'  // 审核类型
	],
	selectionChangeList: [],
	params: {},
	areaJson: null,
	areaProps: {
		label: 'areaName',
		isLeaf: 'isLeaf',
		children: 'children',
	},
});

const { columns, cellBtns, btn, searchConfig, params, areaJson, areaProps } = toRefs(state);

const selectionChange = (selection) => {
	state.selectionChangeList = selection;
};

const request = async (params) => {
	try {
		const p = Object.assign({}, params, state.params);


		delete p.fileAddress;


		const res = await getContractSearchList(p);
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
// 重置
const onReset = () => {
	state.params = {};
};


// 页面刷新
const refresh = () => {
	proTableRef.value.refresh();
}
// 点击事件
const onCellClick = async (prop, item) => {
	if (prop === 'detail') {
		router.push({
			name: 'contractSearch-detail',
			query: {
				id: item.id,
			},
		})
	}

};

// 字典获取
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		// console.log(res);
		if (res) {
			// 列表赋值
			state.columns.map(item => {
				switch (item.dataIndex) {
					case 'empNatrue':
						item.valueEnum = res['emp_natrue']; // 员工类型
						break;
					case 'isSign':
						item.valueEnum = res['contract_sign_type']; // 签署方式
						break;
					case 'contractName':                  //合同类型
						const arr = [];
						for (const i in res['personnel_type']) {
							arr.push({
								key: res['personnel_type'][i],
								value: res['personnel_type'][i]
							})
						}
						item.valueEnum = arr
						break;
					case 'contractSubName':                 // 业务细分
						const subArr = []
						for (const i in res['contract_business_type']) {
							subArr.push({
								key: res['contract_business_type'][i],
								value: res['contract_business_type'][i]
							})
						}
						item.valueEnum = subArr;
						break;
					case 'situation':                             // 签订类型
						const sitArr = []
						for (let i in res['situation_type']) {
							sitArr.push({
								key: res['situation_type'][i],
								value: res['situation_type'][i]
							})
						}
						// console.log(sitArr);
						item.valueEnum = sitArr;
						break;
					case 'contractType':
						item.valueEnum = res['employee_contract_type']; // 签订期限
						break;
					case 'auditStatus':
						item.valueEnum = res['contract_audit_status']; // 审批状态
						break;
					case 'inUse':
						item.valueEnum = res['contract_status']; // 合同状态
						break;
					case 'isFile':
						item.valueEnum = res['contract_file_status']; // 合同归档状态
						break;
					case 'type':
						item.valueEnum = res['check_type'];	// 审核类型
						break;
				}
				return item;
			})
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

onMounted(async () => {
	loadDicts();
	const json = getAreaJson();
	state.areaJson = json;
});



</script>
<style lang="scss" scoped src="./css/contractFile.scss"></style>
