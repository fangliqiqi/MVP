<template>
	<div class="system-dict-container">
		<pro-table
			ref="proTableRef"
			row-key="id"
			:columns="columns"
			:request="request"
			:btn="btn"
			:searchConfig="searchConfig"
			:initParams="initParams"
			@onReset="onReset"
		>
			<template #extBtns>
				<el-upload
					class="upload-demo"
					action="/yifu-archives/method/telecemployeeinfo/importZip"
					:on-change="onFileChange"
					:show-file-list="false"
					:headers="headers"
					accept="application/zip"
					:on-success="onSuccess"
					:on-error="onError"
					:before-upload="beforeUpload"
				>
					<el-button type="default" size="default"> <svg-icon name="iconfont employee_batch_import" />批量导入</el-button>
				</el-upload>
			</template>

			<template v-slot:option="item">
				<pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
			</template>
		</pro-table>

		<add-electronic ref="addElectronicRef" @ok="refreshList" />

		<!--详情-->
		<detail-electronic ref="attachDetailRef"></detail-electronic>
	</div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import { getElectronicPage, delElectronic, getElectronic } from '/@/api/electronic';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus';
import addElectronic from './component/addElectronic.vue';
import detailElectronic from './component/detailElectronic.vue';
import { EMPTY_PLACEHOLDER } from '/@/utils/utils';
import { useRoute } from 'vue-router';

import SvgIcon from '/@/components/svgIcon/index.vue';
import { Local } from '/@/utils/storage';
import { getDictByItemTypes } from '/@/utils/utils.js';

export default {
	name: '电子档案',
	components: {
		ProTable,
		ProButtons,
		detailElectronic,
		addElectronic,
		SvgIcon,
	},
	setup() {
		const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
		const { proxy } = getCurrentInstance();
		const proTableRef = ref(null);
		const addElectronicRef = ref(null);
		const attachDetailRef = ref(null);
		let loading = null;
		const route = useRoute();

		const handleAddClick = () => {
			if (addElectronicRef.value) {
				addElectronicRef.value.openDialog();
			}
		};

		const refreshList = () => {
			if (proTableRef.value) proTableRef.value.refresh();
		};

		const isGray = (item) => {
			return item.systemFlag === '0';
		};

		// 上传文件之前
		const beforeUpload = (file) => {
			let size10M = file.size / 1024 / 1024 < state.limitZipSize;
			if (!size10M) {
				ElMessage.erro(`上传文件大小不能超过 ${state.limitZipSize}MB!`);
				return false;
			}
			loading = ElLoading.service({
				lock: true,
				text: '上传中...',
				background: 'rgba(0, 0, 0, 0.7)',
				'custom-class': 'dept-global-loading',
			});
		};

		const onFileChange = (file, files) => {
			let name = file.name;
			if (!/\.(zip|ZIP)$/.test(name)) {
				ElMessage.error('上传文件必须为zip格式压缩包');
				state.zipFile = null;
				return false;
			}
			state.zipFile = file;
		};

		/**
		 * 文件上传成功
		 */
		const onSuccess = (response, uploadFile, uploadFiles) => {
			console.log('get onSuccess:', response);
			if (response && response.code === 200) {
				ElMessage.success('批量导入成功');
				refreshList();
			} else {
				ElMessage.error(response.msg || '批量导入失败');
			}
			if (loading) loading.close();
		};

		const onError = (error) => {
			// console.log('get onError:', error);
			setTimeout(() => {
				if (loading) loading.close();
				ElMessage.error('批量导入失败');
			}, 200);
		};

		const state = reactive({
			jumped: false,
			zipFile: null, //压缩文件
			limitZipSize: 50, // 限制批量导入最大压缩包，单位m
			headers: {
				Authorization: `${Local.get('token_type')} ${Local.get('access_token')}`,
			},
			literatureTypesDataSource: {},
			literatureTypes: null,

			detailConf: {},
			searchConfig: {
				option: {
					extBtn: 'extBtns',
				},
			},
			columns: [
				{
					dataIndex: 'empNo',
					title: '员工编码',
					minWidth: 140,
					ellipsis: true,
				},
				{
					dataIndex: 'empName',
					title: '员工姓名',
					minWidth: 110,
					ellipsis: true,
				},
				{
					dataIndex: 'empIdcard',
					title: '身份证号',
					minWidth: 180,
				},
				{
					dataIndex: 'unitName',
					title: '单位名称',
					minWidth: 180,
					ellipsis: true,
				},
				{
					dataIndex: 'deptName',
					title: '项目名称',
					minWidth: 180,
					ellipsis: true,
				},
				{
					dataIndex: 'deptNo',
					title: '项目编码',
					minWidth: 110,
					ellipsis: true,
				},
				{
					dataIndex: 'dataType',
					title: '资料类型',
					minWidth: 140,
					ellipsis: true,
				},
				{
					dataIndex: 'option',
					title: '操作',
					key: 'option',
					width: 200,
					hideInSearch: true,
					fixed: 'right',
					scopedSlots: {
						customRender: 'option',
					},
				},
			],
			btn: [
				{
					label: '新增',
					onClick: handleAddClick,
					permission: ['archives_telecemployeeinfo_add'],
					icon: 'icon-ic_edit_add',
				},
			],
			cellBtns: [
				{
					text: '详情',
					prop: 'detail', // 唯一标识
					permission: ['electronic_detail'], // 权限标识
					isGray: isGray,
				},
				{
					text: '编辑',
					prop: 'edit', // 唯一标识
					permission: ['archives_telecemployeeinfo_edit'], // 权限标识
					tooltip: '当前档案不可编辑',
					isGray: isGray,
				},
				{
					text: '删除',
					prop: 'delete', // 唯一标识
					permission: ['archives_telecemployeeinfo_del'], // 权限标识
					tooltip: '当前档案不可删除',
					isGray: isGray,
				},
			],
			initParams: {
				empIdcard: route.query.empIdcard ? route.query.empIdcard : '',
			},
		});

		const request = async (params) => {
			try {
				const res = await getElectronicPage(params);
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

		const deleteCell = (item) => {
			ElMessageBox.confirm(`是否确定删除？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					try {
						const res = await delElectronic(item.id);
						if (res && res.code === 200) {
							message.success('删除成功');
							refreshList();
						} else {
							message.error(res.msg || '删除失败');
						}
					} catch (e) {
						message.error('删除失败');
					}
				})
				.catch(() => {});
		};

		const onCellClick = async (prop, item) => {
			if (prop === 'delete') {
				// 删除操作
				deleteCell(item);
			} else if (prop === 'edit') {
				// 编辑操作
				if (addElectronicRef.value) {
					addElectronicRef.value.openDialog(item);
				}
			} else if (prop === 'detail') {
				// 显示详情
				getElectronic(item.id).then(
					(res) => {
						if (res && res.code === 200) {
							// 获取电子档案详情
							const detail = res.data;
							detail.dataType = state.literatureTypesDataSource[detail.dataType] || EMPTY_PLACEHOLDER;
							if (attachDetailRef.value) attachDetailRef.value.openDialog(res.data);
						} else {
							ElMessage.error(res.msg || '获取电子档案详情失败');
						}
					},
					(error) => {
						ElMessage.error((error && error.msg) || '获取电子档案详情失败');
					}
				);
			}
		};

		const getLabelFromDict = (value, dicts) => {
			const d = dicts ? dicts[value] : value;
			if (d) {
				return d.label || '--';
			}
			return value || '--';
		};

		onMounted(() => {
			// 请求字典数据
			getDictByItemTypes('literature_types').then((res) => {
				state.literatureTypesDataSource = res;
				state.columns = state.columns.map((item) => {
					const target = { ...item };
					if (item.dataIndex === 'dataType') {
						target.valueEnum = res;
					}
					return target;
				});
			});
		});
		const onReset = () => {
			state.initParams = {};
		};

		return {
			...toRefs(state),
			request,
			onCellClick,
			proTableRef,
			addElectronicRef,
			attachDetailRef,
			refreshList,
			getLabelFromDict,
			onFileChange,
			beforeUpload,
			onSuccess,
			onError,
			onReset,
		};
	},
};
</script>

<style lang="scss" scoped src="./css/electronic.scss">

</style>
