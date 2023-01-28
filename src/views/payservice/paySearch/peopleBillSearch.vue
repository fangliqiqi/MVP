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
			@onReset="onReset"
		>
			<template v-slot:salaryMonth="item">
				<el-date-picker
					v-model="state.params.salaryMonth"
					type="monthrange"
					:key="'arch_search_props_' + item.dateIndex + '_' + 'oIndex'"
					start-placeholder="开始月份"
					end-placeholder="结束月份"
					value-format="YYYYMM"
					format="YYYYMM"
					style="width: 100%;"
					@change="changeMonth"
					popper-class="month-picker"
					:unlink-panels="true"
					:clearable="false"
					:shortcuts="shortcuts"
				/>
			</template>
			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!--工资条配置-->
		<config-pay-project-vue ref="configPayProjectRef" @ok="refresh"></config-pay-project-vue>
	</div>
</template>

<script setup name="员工报账查询">
import { reactive, ref, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import configPayProjectVue from './component/configPayProject.vue';
import { PEOPLE_BILL_EXPORT_HEADER, AWARD_APPLY_HEADER } from '/@/utils/header';
import { exportExcel } from '/@/utils/xlsx';
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import { getDictByItemTypes } from '/@/utils/utils';
import { getpeoBillList, exportpeoBill } from '/@/api/payservice/paysearch';
import moment from 'moment';

const proTableRef = ref(null);
const configPayProjectRef = ref(null);
const router = useRouter();
const route = useRoute();
const isShowLoading = ref(false)

// 批量导出
const handleBatchExport = () => {
	isShowLoading.value = true
	let searchParams = Object.assign({}, proTableRef.value.getParams());
	delete searchParams.size;
	delete searchParams.current;
	const data = {
		...searchParams,
		salaryMonthStart:state.params.salaryMonth[0],
		salaryMonthEnd:state.params.salaryMonth[1],
		exportFields: PEOPLE_BILL_EXPORT_HEADER.map((item) => item.dataIndex),
	};
	const idList = state.selectOptions.map((t) => t.id);
	if (idList && idList.length) {
		data.idList = idList;
	}
	// console.log(data);
	
	exportpeoBill(data)
		.then((res) => {
			if (res.code == 200) {
				ElMessage.success('导出成功');
			} else {
				ElMessage.error(res.msg || '导出失败');
			}
		})
		.catch((err) => {
			ElMessage.error(err.msg || '导出失败');
		}).finally(()=>{
			isShowLoading.value = false
		});
};


// 选择月份
const changeMonth = (val) => {
	
}

const shortcuts = computed(()=>{
	// 从今年一直到2010年
	const year = new Date().getFullYear()
	let arr = []
	for(let i=year;i>=2010;i--){
		arr.push({
			text: i+'年',
			value:[i+'01',i+'12']
		})
	}
	return arr
})


// 重置
const onReset = () => {
	state.params.salaryMonth = [moment().format('YYYYMM'),moment().format('YYYYMM')];
}


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
			minWidth: 160,
		},
		{
			dataIndex: 'empIdcard',
			title: '身份证号',
			minWidth: 200,
		},
		{
			dataIndex: 'empPhone',
			title: '手机号码',
			minWidth: 160,
			hideInSearch: true,
		},
		{
			dataIndex: 'bankNo',
			title: '银行卡号',
			minWidth: 200,
			hideInSearch: true,
			tooltip: true,
		},
		{
			dataIndex: 'bankName',
			title: '开户行总行',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'bankProvince',
			title: '开户行省',
			hideInSearch: true,
			minWidth: 150,
			valueType: 'addRess',
			params: {
				pro: 'bankProvince',
			},
		},
		{
			dataIndex: 'bankCity',
			title: '开户行市',
			hideInSearch: true,
			minWidth: 140,
			valueType: 'addRess',
			params: {
				city: 'bankCity',
			},
		},
		{
			dataIndex: 'bankSubName',
			title: '开户行支行',
			hideInSearch: true,
			minWidth: 200,
			tooltip: true,
		},
		{
			dataIndex: 'salaryMonth',
				title: '薪酬月份',
				hideInTable: true,
				// valueType:'date',
				// selectType:'month',
				// format:'YYYYMM',
				// valueFormat:'YYYYMM',
				// minWidth: 160,
				valueType: 'custom',
				scopedSlots:{
					customRender:'salaryMonth'
				}
		},
		{
			dataIndex: 'formType',
			title: '表单类型',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'salaryMonth',
			title: '薪酬月份',
			hideInSearch: true,
			minWidth: 160,
		},
		{
			dataIndex: 'relaySalary',
			title: '应发薪酬',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				// console.log(row);
				if (row.formType == '3') {
					return row.relaySalaryUnit;
				} else {
					return row.relaySalary;
				}
			},
		},
		{
			dataIndex: 'salaryTax',
			title: '个税金额',
			hideInSearch: true,
			minWidth: 160,
			formatter: (row) => {
				return Number(row.salaryTax) + Number(row.salaryTaxUnit);
			},
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
			permission: ['salary_tsalaryaccount-export'],
			onClick: handleBatchExport,
			loading:isShowLoading,
			icon: 'icon-ic_edit_export',
		},
	],
	cellBtns: [
		{
			text: '详情',
			prop: 'detail', // 唯一标识
			permission: [], // 权限标识
		},
	],
	selectOptions: [], //多选数据
	params: {
		salaryMonth: [moment().format('YYYYMM'),moment().format('YYYYMM')],
	}, //导出请求数据
	clearArr:false,
	dictKeys: ['form_type'],
});

const { columns, cellBtns, btn, searchConfig } = toRefs(state);


const request = async (params) => {
	try {
		const p = {
			...params,
			salaryMonthStart: state.params.salaryMonth[0],
			salaryMonthEnd: state.params.salaryMonth[1],
		};
		const res = await getpeoBillList(p);
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
// 页面刷新
const refresh = () => {
	proTableRef.value.refresh();
};

const onCellClick = async (prop, item) => {
	if (prop === 'detail') {
		// console.log('详情');
		router.push({
			name: 'payservice-bill-detail',
			params: {
				id: item.salaryFormId,
				dataId: item.id,
			},
		});
	}
};

// 字典获取
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			// 列表赋值
			state.columns.map((item) => {
				switch (item.dataIndex) {
					case 'formType':
						item.valueEnum = res['form_type'];
						break;
				}
				return item;
			});
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

onMounted(() => {
	loadDicts();
});
</script>
<style lang="scss" scoped>
.module-download {
	a {
		text-decoration: none;
		color: var(--el-button-text-color);
	}
}
</style>
<style lang="scss">
 @import './css/peopleBillSearch.scss'
</style>
