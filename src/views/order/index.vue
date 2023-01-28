<template>
	<div>
		<pro-table
			row-key="id"
			ref="proRef"
			:columns="columns"
			:request="request"
			:btn="btn"
			multi
			:searchConfig="searchConfig"
			@selectionChange="selectionChange"
		>
			<template v-slot:orderStatus="item">
				{{ typeOptions[item.orderStatus] }}
			</template>
			<template v-slot:option="item">
				<pro-buttons ref="proButtons" :array="cellBtns" :model="item" @onClick="onCellClick" />
			</template>
		</pro-table>
	</div>
</template>

<script>
import { reactive, ref, toRefs, defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getOrderList, exportOrderList, handleOrder } from '/@/api/order';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
// import { exportExcel } from '/@/utils/xlsx';
import { exportExcelSheet } from '/@/utils/excel';
import ExportExcelDialog from '/@/components/ExportExcel/index.vue';
import { ORDER_EXPORT_HEADER } from '/@/utils/header';
import moment from 'moment';
export default defineComponent({
	name: '订单管理',
	components: {
		ProTable,
		ProButtons,
		ExportExcelDialog,
	},
	setup() {
		const router = useRouter();
		const proRef = ref(null);
		const detailLogRef = ref(null);
		const exportExcelRef = ref(null);
		const typeOptions = { 0: '待处理', 1: '处理中', 2: '已办结' };

		const handleBatchExport = () => {
			isShowLoading.value= true
			if (state.selectionChangeList.length > 0) {
				const ids = [];
				state.selectionChangeList.map((item) => {
					ids.push(item.id);
				});
				state.params = {
					idList: ids,
				};
			} else {
				state.params = proRef.value.getParams();
				delete state.params.size;
				delete state.params.current;
			}
			exportOrderList(state.params).then((res) => {
				exportExcelSheet(
					ORDER_EXPORT_HEADER,
					res.data.map((item) => {
						return {
							orderNo: item.orderNo,
							createTime: item.createTime,
							createName: item.createName,
							customerName: item.customerName,
							deptName: item.deptName,
							deptNo: item.deptNo,
							orderStatus: typeOptions[item.orderStatus],
						};
					}),
					`订单列表导出${moment().format('YYYYMMDD')}`
					// {
					// 	fileName: ,
					// 	type: {
					// 		bookType: 'xlsx',
					// 		bookSST: true,
					// 		type: 'binary',
					// 		cellStyles: true,
					// 	},
					// }
				);
				ElMessage.success('导出成功');
			}).finally(()=>{
				isShowLoading.value= false
			});
		};
		const isShowLoading = ref(false)
		const state = reactive({
			selectionChangeList: [],
			ORDER_EXPORT_HEADER: ORDER_EXPORT_HEADER,
			searchConfig: {
				labelWidth: 110,
				option: {
					extBtn: 'extBtns',
				},
			},
			btn: [
				{
					label: '批量导出',
					// type: 'default',
					onClick: handleBatchExport,
					loading:isShowLoading,
					permission: ['order:order_getOrderList'],
					icon: 'icon-ic_edit_export',
				},
			],
			columns: [
				{
					dataIndex: 'orderNo',
					title: '订单号',
					minWidth: '80px',
				},
				{
					dataIndex: 'createTime',
					title: '订单日期',
					searchIndex: 'startEndTime',
					startTime: 'startDate',
					endTime: 'endDate',
					valueType: 'dateTimeRange',
					selectType: 'daterange',
					format: 'YYYY-MM-DD',
					minWidth: 100,
				},
				{
					dataIndex: 'createName',
					title: '下单人',
				},
				{
					dataIndex: 'customerName',
					title: '客户名称',
					tooltip:true,
					minWidth:200,
					
				},
				{
					dataIndex: 'deptName',
					title: '项目名称',
					minWidth:200,
					tooltip:true,
				},
				{
					dataIndex: 'deptNo',
					title: '项目编码',
				},
				{
					dataIndex: 'orderStatus',
					title: '订单状态',
					scopedSlots: { customRender: 'orderStatus' },
					valueType: 'select',
					valueEnum: typeOptions,
				},
				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 200,
					fixed: 'right',
					hideInSearch: true,
					scopedSlots: {
						customRender: 'option',
					},
				},
			],
			cellBtns: [
				{
					text: '办理',
					prop: 'manage', // 唯一标识
					permission: ['order:order_manage'], // 权限标识
					isGray: (item) => {
						return item.orderStatus == '2';
					},
				},
				{
					text: '详情',
					prop: 'detail', // 唯一标识
					permission: ['order:order_detail'], // 权限标识
				},
				{
					text: '办结',
					prop: 'conclude', // 唯一标识
					permission: ['order:order_conclude'], // 权限标识
					isGray: (item) => {
						return item.orderStatus == '2';
					},
				},
			],
		});
		const request = async (params) => {
			try {
				let res = await getOrderList(params);
				if (res && res.code == 200 && res.data) {
					return {
						current: res.data.current,
						total: res.data.total,
						data: res.data.records,
					};
				}
			} catch (e) {
				console.log(e);
			}
		};
		const onCellClick = async (prop, item) => {
			switch (prop) {
				case 'manage':
					router.push({
						name: 'oreder-manage-handle',
						params: {
							id: item.id,
						},
					});
					break;

				case 'detail':
					router.push({
						name: 'oreder-manage-detail',
						params: {
							id: item.id,
						},
					});
					break;

				case 'conclude':
					const text = `<p style="font-size:16px;font-weight:600">是否确定办结?<br/>
					<span style="color:red;font-size:14px;font-weight:400">办结后，将禁止对订单进行任何操作，仅可查看，请谨慎操作！</span></p>`;
					ElMessageBox.confirm(text, {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						dangerouslyUseHTMLString: true,
					})
						.then(async () => {
							try {
								const res = await handleOrder({ id: item.id, status: 2 });
								if (res && res.code == 200) {
									ElMessage.success('办结成功');
									proRef.value.refresh();
								} else {
									ElMessage.error(res.msg);
								}
							} catch (e) {
								console.log('get exception:', e);
							}
						})
						.catch(() => {
							// 取消
						});
					break;
			}
		};

		const selectionChange = (selection) => {
			state.selectionChangeList = selection;
		};

		return {
			...toRefs(state),
			proRef,
			request,
			typeOptions,
			onCellClick,
			detailLogRef,
			selectionChange,
			handleBatchExport,
			exportExcelRef,
		};
	},
});
</script>
