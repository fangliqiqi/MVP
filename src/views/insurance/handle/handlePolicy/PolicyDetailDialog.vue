<template>
	<div>
		<el-dialog title="保单详情" v-model="state.isShowDialog" width="800px" :close-on-click-modal="false" custom-class="policy-detail-dialog">
			<div v-loading="state.loading" class="policy-detail-dialog--body">
				<el-form size="default" label-width="120px" ref="formRef">
					<el-row :gutter="40">
						<el-col :span="12">
							<el-form-item label="保单号" prop="empName">
								{{ state.ruleForm.policyNo }}
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否启用" prop="enableFlag">
								{{ state.ruleForm.enableFlag }}
							</el-form-item>
						</el-col>

						<el-col :span="12">
							<el-form-item label="保险公司" prop="insuranceCompanyName">
								{{ state.ruleForm.insuranceCompanyName }}
							</el-form-item>
						</el-col>

						<el-col :span="12">
							<el-form-item label="险种" prop="insuranceTypeName">
								{{ state.ruleForm.insuranceTypeName }}
							</el-form-item>
						</el-col>

						<el-col :span="12">
							<el-form-item label="保单开始日期" prop="policyStart">
								{{ state.ruleForm.policyStart }}
							</el-form-item>
						</el-col>

						<el-col :span="12">
							<el-form-item label="保单结束日期" prop="policyEnd">
								{{ state.ruleForm.policyEnd }}
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<pro-table
					row-key="id"
					:columns="state.columns"
					:dataSource="state.ruleForm.operateList"
					:showHeader="false"
					:searchConfig="{ pagination: false }"
					v-if="state.ruleForm.operateList"
					manualRequest
					class="policy-detail-table"
				>
					<template v-slot:differenceInfo="item">
						<div class="diff-content">
							<div v-html="getTextInfo(item) || '--'"></div>
						</div>
					</template>
				</pro-table>
			</div>
		</el-dialog>
	</div>
</template>

<script setup name="PolicyDetailDialog">
import ProTable from '/@/components/ProTable/ProTable.vue';
import { getPolicyDetail } from '/@/api/insurance/policy.js';

const state = reactive({
	isShowDialog: false,

	ruleForm: {},

	columns: [
		{
			dataIndex: 'createName',
			title: '操作人',
			minWidth: 100,
		},
		{
			dataIndex: 'updateTime',
			title: '操作时间',
			minWidth: 100,
		},
		{
			dataIndex: 'differenceInfo',
			title: '操作内容',
			minWidth: 250,
			valueType: 'custom',
			scopedSlots: { customRender: 'differenceInfo' },
		},
	],
});

const getTextInfo = (val) => {
	const key = {
		enableFlag: '是否启用',
		insuranceCompanyName: '保险公司',
		insuranceTypeName: '险种',
		policyStart: '保单开始日期',
		policyEnd: '保单结束日期',
		insert: '批量导入',
	};

	const dict = {
		0: '启用',
		1: '禁用',
	};

	const differenceInfo = val.differenceInfo;
	const newInfo = JSON.parse(val.newInfo);
	const oldInfo = JSON.parse(val.oldInfo);

	return differenceInfo // 遍历差异字段
		.split(',')
		.map((item) => {
			const label = key[item];

			if (item === 'insert') {
				return `<div class='diff-item'><span style="font-weight:bold;">${label}</span></div>`;
			}

			let oldVal = oldInfo[item];
			let newVal = newInfo[item];

			if (item === 'enableFlag') {
				oldVal = dict[oldVal];
				newVal = dict[newVal];
			}

			if (oldVal == '' || oldVal == null || oldVal == undefined) {
				oldVal = '[空值]';
			}

			if (newVal == '' || newVal == null || newVal == undefined) {
				newVal = '[空值]';
			}
			return `<div class='diff-item'><span style="font-weight:bold;">"${label}"</span>：<span style="color:var(	--hro-color-text-disabeld);" class='old-value'>旧值为：${oldVal}</span>，<span class='new-val'>新值为：${newVal}</span></div>`;
		})
		.join('');
};

const openDialog = (item) => {
	state.isShowDialog = true;
	state.loading = true;

	state.ruleForm = {
		policyNo: item.policyNo,
		enableFlag: { 0: '启用', 1: '禁用' }[item.enableFlag],
		insuranceCompanyName: item.insuranceCompanyName,
		insuranceTypeName: item.insuranceTypeName,
		policyStart: item.policyStart,
		policyEnd: item.policyEnd,
		operateList: null,
	};

	getPolicyDetail(item.id)
		.then(({ code, data }) => {
			if (code === 200) {
				state.ruleForm = {
					policyNo: data.policyNo,
					enableFlag: { 0: '启用', 1: '禁用' }[data.enableFlag],
					insuranceCompanyName: data.insuranceCompanyName,
					insuranceTypeName: data.insuranceTypeName,
					policyStart: data.policyStart,
					policyEnd: data.policyEnd,
					operateList: {
						records: data.operateList,
						total: data.operateList?.length || 0,
					},
				};
			}
		})
		.finally(() => {
			state.loading = false;
		});
};

defineExpose({
	openDialog,
});
</script>

<style lang="scss">
@import './css/dialog.scss';
</style>

<style lang="scss" scoped>
.policy-detail-dialog--body {
	::v-deep(.el-form-item--default) {
		margin-bottom: 5px;
	}

	::v-deep(.policy-detail-table.arch-pro-layout) {
		overflow: hidden;
		max-height: calc(90vh - 111px - 60px - 111px);
		height: auto;
		margin-top: 12px;

		.arch-pro-content-container {
			height: 100%;
			min-height: 0 !important;
			margin: 0 !important;
			padding: 0 !important;
			overflow: hidden;

			.options-btn-container,
			.table-footer {
				display: none;
			}

			.el-table__body-wrapper {
				max-height: calc(90vh - 111px - 60px - 111px - 46px);
				overflow-y: auto;

				.el-scrollbar__bar.is-horizontal {
					display: none;
				}
			}
		}
	}
}
</style>
