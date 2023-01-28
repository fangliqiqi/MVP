<template>
	<div class="contract-apply-container">
		<pro-table ref="proTableRef" row-key="id" :columns="state.columns" :request="request" :btn="state.btn">
			<template v-slot:option="item">
				<pro-buttons :array="state.cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<!--新增-->
		<account-cer-dialog ref="accountCerDialogRef" @ok="refreshList"></account-cer-dialog>
		<!--邀请加入-->
		<invite-dialog title="邀请加入组织" type="invite" ref="inviteDialogRef" @ok="refreshList"></invite-dialog>
		<!--移出组织-->
		<invite-dialog title="移出组织" type="remove" ref="removeGroupDialogRef" @ok="refreshList"></invite-dialog>
		<!--授权印章-->
		<seal-list-dialog title="印章列表" type="auth" ref="sealRef" @ok="refreshList"></seal-list-dialog>
		<!--取消授权印章-->
		<seal-list-dialog title="已授权印章列表" type="noauth" ref="cancelSealRef" @ok="refreshList"></seal-list-dialog>
	</div>
</template>

<script setup name="客服账号">
import ProTable from '/@/components/ProTable/ProTable.vue';
import { getCustomerList, sendAuthMessage, getSealId } from '/@/api/eleContract';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { CERTIFICATION_STATUS_OPTION, ELE_USER_TYPE } from '/@/utils/dicts';
import { getDictByItemTypes } from '/@/utils/utils';
import accountCerDialog from './component/accountCerDialog.vue';
import inviteDialog from './component/inviteDialog.vue';
import sealListDialog from './component/sealListDialog.vue';

const accountCerDialogRef = ref(null);
const proTableRef = ref(null);
const inviteDialogRef = ref(null);
const removeGroupDialogRef = ref(null);
const sealRef = ref(null);
const cancelSealRef = ref(null);

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
		const res = await getCustomerList(Object.assign({}, params, { systemFlag: 0 })); // STEM_FLAG 0企业用户 客服,1普通员工  两个id 对应员工和客服
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
	if (proTableRef.value) proTableRef.value.doSearch();
};

const onCellClick = async (prop, item) => {
	switch (prop) {
		case 'real':
			// 发送实名邀请
			ElMessageBox.confirm(`确定发送实名邀请`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				sendAuthMessage({ id: item.id }).then(
					(res) => {
						if (res && res.code === 200) {
							ElMessage.success('发送成功，请继续完成实名认证');
							refreshList();
							window.open(res.data);
						} else {
							ElMessage.error(res.msg || '发送失败');
						}
					},
					(error) => {
						ElMessage.error((error && error.msg) || '发送失败');
					}
				);
			});

			break;
		case 'invite':
			// 邀请加入
			if (inviteDialogRef.value) inviteDialogRef.value.openDialog(item);
			break;

		case 'seal':
			// 授权印章
			getSealId({ personAccountId: item.id }).then(
				(res) => {
					if (res && res.code === 200) {
						// 拥有印章权限
						const sealIds = res.data.map((item) => {
							return item.sealId;
						});
						if (sealRef.value) sealRef.value.openDialog(item, sealIds);
					} else {
						ElMessage.error(res.msg || '获取印章权限失败');
					}
				},
				(error) => {
					ElMessage.error((error && error.msg) || '获取印章权限失败');
				}
			);

			break;

		case 'cacelSeal':
			// 取消授权印章
			getSealId({ personAccountId: item.id }).then(
				(res) => {
					if (res && res.code === 200) {
						// 拥有印章权限
						const sealIds = res.data.map((item) => {
							return item.sealId;
						});
						if (cancelSealRef.value) cancelSealRef.value.openDialog(item, sealIds);
					} else {
						ElMessage.error(res.msg || '获取印章权限失败');
					}
				},
				(error) => {
					ElMessage.error((error && error.msg) || '获取印章权限失败');
				}
			);
			break;

		case 'removeOrg':
			// 移出组织
			if (removeGroupDialogRef.value) removeGroupDialogRef.value.openDialog(item);
			break;
	}
};

const certificationAccount = () => {
	if (accountCerDialogRef.value) accountCerDialogRef.value.openDialog();
};

const state = reactive({
	cellBtns: [
		{
			text: '发送实名',
			prop: 'real', // 唯一标识
			tooltip: '当前状态不可操作',
			isGray: (item) => {
				return item.realStatus == 1;
			},
		},
		{
			text: '邀请加入',
			prop: 'invite', // 唯一标识
			tooltip: '当前状态不可操作',
			isGray: (item) => {
				return item.realStatus != 1;
			},
		},
		{
			text: '移出组织',
			prop: 'removeOrg', // 唯一标识
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !record.companyInfoId;
			},
		},
		{
			text: '授权印章',
			prop: 'seal', // 唯一标识
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !((record.companyInfoId && !record.sealId) || record.sealId);
			},
		},

		{
			text: '取消授权印章',
			prop: 'cacelSeal', // 唯一标识
			tooltip: '当前状态不可操作',
			isGray: (record) => {
				return !record.sealId;
			},
		},
	],
	btn: [
		{
			label: '新增',
			onClick: certificationAccount,
			permission: ['demo_fddpersonaccount_add'],
			icon: 'icon-ic_edit_add',
		},
	],
	columns: [
		{
			dataIndex: 'name',
			title: '客服姓名',
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
			hideInSearch: true,
			minWidth: 160,
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
			dataIndex: 'companyName',
			title: '组织',
			minWidth: 180,
			ellipsis: true,
			hideInSearch: true,
		},
		{
			dataIndex: 'sealName',
			title: '印章',
			minWidth: 160,
			ellipsis: true,
			hideInSearch: true,
		},
		{
			dataIndex: 'option',
			title: '操作',
			key: 'option',
			width: 360,
			hideInSearch: true,
			fixed: 'right',
			scopedSlots: {
				customRender: 'option',
			},
		},
	],
});
</script>
