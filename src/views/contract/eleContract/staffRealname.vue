<template>
	<div class="contract-apply-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request">
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>
	</div>
</template>

<script setup name="员工实名">
import ProTable from '/@/components/ProTable/ProTable.vue';
import { getCustomerList, sendAuthMessage } from '/@/api/eleContract';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getDictByItemTypes } from '/@/utils/utils';
import { CERTIFICATION_STATUS_OPTION, ELE_USER_TYPE } from '/@/utils/dicts';

const proTableRef = ref(null);

onMounted(() => {
	loadDicts();
});

const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
			state.columns = state.columns.map((item) => {
				const target = { ...item };
				switch (item.dataIndex) {
					case 'empNatrue':
						target.valueEnum = res['emp_natrue']; // 人员类型
						break;
					case 'fileSource':
						target.valueEnum = res['EMP_SOURCE']; // 档案来源
						break;

					case 'socialStatus':
						target.valueEnum = res['social_ecurity_state']; // 社保
						break;

					case 'insuranceStatus':
						target.valueEnum = res['commercial_satte']; // 商险
						break;

					case 'fundStatus':
						target.valueEnum = res['fund_status']; // 公积金
						break;
					case 'contractStatus':
						target.valueEnum = res['personnel_state']; // 合同
						break;
				}
				return target;
			});
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

const request = async (params) => {
	try {
		const res = await getCustomerList(Object.assign({}, params, { systemFlag: 1 })); // STEM_FLAG 0企业用户 客服,1普通员工  两个id 对应员工和客服
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

const refreshList = () => {
	if (proTableRef.value) proTableRef.value.refresh();
};

const onCellClick = async (prop, item) => {
	if (prop === 'audit') {
		// 跳转审核页面

		ElMessageBox.confirm(`确定发送实名邀请`, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		}).then(() => {
			sendAuthMessage({ id: item.id }).then(
				(res) => {
					if (res && res.code === 200) {
						ElMessage.success('发送成功');
						refreshList();
						// window.open(res.data);
					} else {
						ElMessage.error(res.msg || '发送失败');
					}
				},
				(error) => {
					ElMessage.error((error && error.msg) || '发送失败');
				}
			);
		});
	}
};

const state = reactive({
	areaJson: null,
	params: {},
	cellBtns: [
		{
			text: '发送实名认证',
			prop: 'audit', // 唯一标识
			tooltip: '当前状态不可操作',
			isGray: (item) => {
				return item.realStatus == 1;
			},
		},
	],
	columns: [
		{
			dataIndex: 'name',
			title: '员工姓名',
			minWidth: 160,
			ellipsis: true,
		},
		{
			dataIndex: 'idCard',
			title: '身份证号',
			minWidth: 160,
			ellipsis: true,
		},
		{
			dataIndex: 'moblie',
			title: '手机号码',
			minWidth: 160,
			hideInSearch: true,
		},
		{
			dataIndex: 'systemFlag',
			title: '用户类型',
			hideInSearch: true,
			minWidth: 120,
			valueEnum: ELE_USER_TYPE,
		},
		{
			dataIndex: 'realStatus',
			title: '实名状态',
			minWidth: 140,
			valueEnum: CERTIFICATION_STATUS_OPTION,
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 240,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
});
</script>
