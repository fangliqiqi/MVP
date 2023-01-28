<template>
	<div class="archives-withdrawn-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="columns"
			:request="request"
			:btn="btn"
			:multi="true"
			:searchConfig="searchConfig"
			@selectionChange="selectionChange"
			@onReset="onReset"
		>
			<template v-slot:fileAddress="item">
				<el-tree-select
					v-model="params.fileAddress"
					:key="'arch_search_props_' + item.dateIndex + '_' + 'oIndex'"
					style="width: 100%"
					placeholder="请选择"
					:props="areaProps"
					@current-change="changeFileAddress"
					@clear="clearFileAddress"
					node-key="id"
					:load="loadArea"
					check-strictly
					lazy
					clearable
				/>
			</template>

			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<redocument-dialog ref="redocumentDialog" @ok="refreshList"></redocument-dialog>
		<export-excel-dialog ref="exportExcelRef" :heads="STAFF_WITHDRAWN_EXPORT__HEADER" title="员工档案导出" />
	</div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, onUnmounted } from 'vue';
import { getWithDrawnList, exportLeaveStaffList } from '/@/api/staff';

import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox } from 'element-plus';
import RedocumentDialog from './component/redocumentDialog.vue';
import { useRouter, useRoute } from 'vue-router';
import { STAFF_WITHDRAWN_EXPORT__HEADER } from '/@/utils/header';
import { loadNode, idToArea } from '/@/utils/city';
import { getDictByItemTypes } from '/@/utils/utils';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import { onRefresh, offRefresh } from '/@/utils/events';

export default {
	name: '离职库',
	components: {
		ProTable,
		ProButtons,
		RedocumentDialog,
		ExportExcelDialog,
	},
	setup() {
		const router = useRouter();
		const route = useRoute();
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const proTableRef = ref(null);
		const redocumentDialog = ref(null);
		const exportExcelRef = ref(null);
		const { proxy } = getCurrentInstance();
		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};
		const onReset = () => {
			state.params = {};
		};

		// 批量导出
		const handleBatchExport = () => {
			let searchParams = Object.assign({}, proTableRef.value.getParams(), state.params);
			delete searchParams.size;
			delete searchParams.current;
			delete searchParams.startEndTime;
			
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

					exportLeaveStaffList({}, data).then((res) => {
						if (res.code && res.code !== 200) {
							ElMessageBox.error(res.msg);
						}

						exportFile(true);
					});
				});
		};

		const selectionChange = (selection) => {
			console.log('get selectionChange:', selection);
			state.selectionChangeList = selection;
		};

		const state = reactive({
			selectionChangeList: [], // 列表多选选中的内容
			searchConfig: {
				labelWidth: 110,
			},
			columns: [
				{
					dataIndex: 'empCode',
					title: '员工主码',
					minWidth: 140,
					tooltip: true,
					fixed: 'left',
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
					dataIndex: 'empPhone',
					title: '手机号码',
					minWidth: 140,
				},
				{
					dataIndex: 'fileAddress',
					title: '档案所在地',
					hideInSearch: true,
					minWidth: 180,
					ellipsis: true,
					formatter: (row) => {
						return idToArea({ province: row.fileProvince, city: row.fileCity, town: row.fileTown });
					},
				},
				{
					dataIndex: 'unitName',
					title: '单位名称',
					minWidth: 140,
					ellipsis: true,
				},
				{
					dataIndex: 'deptName',
					title: '项目名称',
					minWidth: 140,
					ellipsis: true,
				},
				{
					dataIndex: 'deptNo',
					title: '项目编码',
					minWidth: 140,
					ellipsis: true,
				},
				// {
				// 	dataIndex: 'businessThirdType',
				// 	title: '业务类型',
				// 	minWidth: 140,
				// 	ellipsis: true,
				// },
				{
					dataIndex: 'empNatrue',
					searchIndex: 'empNatureArray',
					title: '员工类型',
					minWidth: 180,
					multiple: true,
				},
				{
					dataIndex: 'fileAddress',
					title: '档案所在地',
					hideInTable: true,
					valueType: 'custom',
					scopedSlots: {
						customRender: 'fileAddress',
					},
				},

				{
					dataIndex: 'leaveTime',
					title: '减档时间',
					minWidth: 180,
					searchIndex: 'startEndTime',
					startTime: 'leaveTimeStart',
					endTime: 'leaveTimeEnd',
					valueType: 'dateTimeRange',
					ellipsis: true,
				},
				{
					dataIndex: 'leaveUserName',
					title: '减档人',
					minWidth: 160,
				},

				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 160,
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
					onClick: handleBatchExport,
					permission: ['employee_export_employee_leave'],
					icon: 'icon-ic_edit_export',
				},
			],
			cellBtns: [
				{
					text: '详情',
					prop: 'detail', // 唯一标识
					permission: ['hro:archives-online-detail'], // 权限标识
				},

				{
					text: '复档',
					prop: 'redocument', // 唯一标识
					permission: ['temployeeinfo_restore'], // 权限标识
				},
			],
			DICTS: {},
			dictKeys: [
				'emp_natrue',
				'emp_married',
				'emp_national',
				'emp_political',
				'emp_registype',
				'education',
				'EMP_SOURCE',
				'social_ecurity_state',
				'commercial_satte',
				'personnel_state',
				'fund_status',
			],
			params: {},
			areaProps: {
				label: 'areaName',
				isLeaf: 'isLeaf',
				children: 'children',
			},
		});

		const request = async (params) => {
			try {
				const p = Object.assign({}, params, state.params, { fileStatus: '1' });
				delete p.fileAddress;
				const res = await getWithDrawnList(p); // fileStatus 0 正常 1 已减档
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

		const loadArea = (node, resolve) => {
			const level = node.level;
			const isLeaf = node.isLeaf;
			if (level === 0) {
				const data = loadNode(0);
				resolve(data);
			} else if (isLeaf) {
				return resolve([]);
			} else {
				return resolve(loadNode(node.data.id));
			}

			return resolve([]);
		};
		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'detail':
					router.push({ name: 'withdrawn-detail', params: { id: item.id } });
					break;

				case 'redocument':
					// 复档
					if (redocumentDialog.value) redocumentDialog.value.openDialog(item);
					break;
			}
		};

		const changeFileAddress = (val, node) => {
			// 获取档案所在地
			const values = [val.id];
			if (node.parent && node.parent.level != 0) {
				// 获取市或者省
				values.unshift(node.parent.data.id);
				if (node.parent.parent && node.parent.parent.level != 0) {
					// 获取省
					values.unshift(node.parent.parent.data.id);
				}
			}
			state.params.fileProvince = values[0] || null;
			state.params.fileCity = values[1] || null;
			state.params.fileTown = values[2] || null;
		};

		const clearFileAddress = () => {
			state.params.fileProvince = null;
			state.params.fileCity = null;
			state.params.fileTown = null;
		};

		const loadDicts = async () => {
			try {
				const res = await getDictByItemTypes(state.dictKeys);
				if (res) {
					state.DICTS = res;
					state.columns = state.columns.map((item) => {
						const target = { ...item };
						switch (item.dataIndex) {
							case 'empNatrue':
								target.valueEnum = res['emp_natrue'];
								break;
						}
						return target;
					});
				}
			} catch (e) {
				console.log('get exception:', e);
			}
		};

		const listener = () => {
			onRefresh(proxy, route.path, () => {
				refreshList();
			});
		};

		onMounted(() => {
			loadDicts();
			listener();
		});

		onUnmounted(() => {
			offRefresh(proxy);
		});

		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			refreshList,
			changeFileAddress,
			loadArea,
			clearFileAddress,
			redocumentDialog,
			exportExcelRef,
			STAFF_WITHDRAWN_EXPORT__HEADER,
			selectionChange,
			onReset,
		};
	},
};
</script>
