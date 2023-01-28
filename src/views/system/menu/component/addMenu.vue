<template>
	<div class="system-add-menu-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" width="600px" @close="closeDialog" :close-on-click-modal="false">
			<el-form ref="formRef" :model="state.ruleForm" size="default" label-width="80px" :rules="rules">
				<el-row>
					<el-col :span="12" class="mb20">
						<el-form-item prop="type" label="类型">
							<el-radio-group v-model="state.ruleForm.type" :disabled="state.id" @change="onChange">
								<el-radio-button :label="0">菜单</el-radio-button>
								<el-radio-button :label="1">按钮</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>

					<el-col :span="12" class="mb20">
						<el-form-item label="上级菜单" prop="parentId">
							<el-tree-select
								filterable
								placeholder="请选择上级菜单"
								v-model="state.ruleForm.parentId"
								:data="state.menuData"
								node-key="id"
								:check-strictly="state.ruleForm.type == '0'"
							/>
						</el-form-item>
					</el-col>

					<template v-if="state.ruleForm.type == '0'">
						<el-col :span="24" class="mb20">
							<el-form-item label="菜单图标" prop="icon">
								<IconSelector style="width: 100%" placeholder="请输入菜单图标" v-model="state.ruleForm.icon" type="ali" />
							</el-form-item>
						</el-col>
					</template>

					<el-col class="mb20">
						<el-form-item label="名称" prop="name">
							<el-input v-model="state.ruleForm.name" :placeholder="`请输入${name}名称`" maxlength="20" clearable></el-input>
						</el-form-item>
					</el-col>

					<template v-if="state.ruleForm.type == '0'">
						<el-col class="mb20">
							<el-form-item label="路由地址" prop="path">
								<el-input v-model="state.ruleForm.path" placeholder="请输入路由地址" maxlength="128" clearable></el-input>
							</el-form-item>
						</el-col>
					</template>
					<template v-if="state.ruleForm.type == '1'">
						<el-col class="mb20">
							<el-form-item label="权限标识" prop="permission">
								<el-input v-model="state.ruleForm.permission" maxlength="50" placeholder="请输入权限标识" clearable></el-input>
							</el-form-item>
						</el-col>
					</template>
					<el-col :span="11" class="mb20">
						<el-form-item label="排序" prop="sortOrder">
							<el-input-number v-model="state.ruleForm.sortOrder" placeholder="请输入排序" class="w100" :min="0" />
						</el-form-item>
					</el-col>

					<template v-if="state.ruleForm.type == 0">
						<el-col :span="11" :offset="2" class="mb20">
							<el-form-item prop="flag" class="tips" label-width="100px">
								<template #label>
									<div>
										数据权限
										<el-tooltip class="item" effect="dark" content="该选项控制此菜单是否可配置数据权限" placement="top">
											<svg-icon name="iconfont icon-ic-more1"></svg-icon>
										</el-tooltip>
									</div>
								</template>
								<el-radio-group v-model="state.ruleForm.flag">
									<el-radio-button :label="0">是</el-radio-button>
									<el-radio-button :label="1">否</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</template>

					<el-col :span="11" :offset="state.ruleForm.type == 0 ? 0 : 2" class="mb20">
						<el-form-item label="系统菜单" prop="systemFlag">
							<el-radio-group v-model="state.ruleForm.systemFlag" style="width: 100%" :disabled="state.id">
								<el-radio-button :label="0">是</el-radio-button>
								<el-radio-button :label="1">否</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" :loading = "isShowLoading" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="systemAddMenu">
import { setBackEndControlRefreshRoutes } from '/@/router/backEnd';
import { getMenuTree, addMenuInfo, updateMenuInfo } from '/@/api/menu';
import { ElMessage } from 'element-plus';
import IconSelector from '/@/components/iconSelector/index.vue';
// import SvgIcon from '/@/components/svgIcon/index.vue';

const formRef = ref(null);
const state = reactive({
	isShowDialog: false,
	title: '新增菜单',
	id: null,
	ruleForm: {
		parentId: -1, // 上级菜单
		type: 0, // 菜单类型
		icon: null,
		name: '', // 菜单名称
		path: '', // 路由名称
		sortOrder: 0, // 菜单排序
		permission: '', // 菜单类型为按钮时，权限标识
		flag: 1, // 0 是 1 否
		systemFlag: 1, // 0 是 1 否
	},
	isBtn: false, // 是否为按钮
	menuData: [], // 上级菜单数据
});

const name = computed(() => {
	return state.ruleForm.type == '0' ? '菜单' : '按钮';
});

const rules = reactive({
	name: [
		{
			required: true,
			validator: (rule, value, callback) => {
				if (!value) {
					callback(new Error(`请输入${name.value}名称`));
				} else {
					callback();
				}
			},
			trigger: 'blur',
		},
	],
	path: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
	type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
	flag: [{ required: true, message: '请选择是否开启数据权限', trigger: 'blur' }],
	sortOrder: [{ required: true, message: '请输入排序', trigger: 'blur' }],
	systemFlag: [{ required: true, message: '请选择是否是系统菜单', trigger: 'blur' }],
	parentId: [{ required: true, message: '请选择父级菜单', trigger: 'blur' }],
});

const onChange = (val) => {
	state.isBtn = val==1?true:false;
	state.ruleForm = {
		type: val,
		icon: null,
		name: '', // 菜单名称
		path: '', // 路由名称
		sortOrder: 0, // 菜单排序
		permission: '', // 菜单类型为按钮时，权限标识
		flag: 1, // 0 是 1 否
		systemFlag: 1,
	};
	state.menuData = changeMenuState(state.menuData);
	state.ruleForm.parentId = val === 0 ? '-1' : null; // 上级菜单

	if (formRef.value) {
		formRef.value.clearValidate();
	}
};

// 打开弹窗
const openDialog = async (data) => {
	await loadMenus();
	if (data) {
		// 编辑菜单
		state.title = '编辑菜单';
		state.id = data.menuId;
		state.ruleForm = data;
	} else {
		state.title = '新增菜单';
		state.id = null;
		state.ruleForm = {
			parentId: '-1', // 上级菜单
			type: 0, // 菜单类型
			icon: null,
			name: '', // 菜单名称
			path: '', // 路由名称
			sortOrder: 0, // 菜单排序
			permission: '', // 菜单类型为按钮时，权限标识
			flag: 1, // 0 是 1 否
			systemFlag: 1,
		};
	}
	state.menuData = changeMenuState(state.menuData);
	state.isShowDialog = true;
};

const changeMenuState = (data) => {
	return data.map((item) => {
		const target = { ...item };
		if ((state.id && item.id === state.id) || (!state.isBtn&&item.flag == '0')) {
			target.disabled = true;
		} else {
			target.disabled = false;
		}
		if (item.children) {
			target.children = changeMenuState(item.children);
		}
		return target;
	});
};

const filterMenu = (data) => {
	return data
		.map((item) => {
			const target = { ...item };
			if (item.children) {
				const children = filterMenu(item.children);
				target.children = children;
				if (!children || children.length === 0) {
					delete target.children;
				}
			}
			if (item.type === '1') {
				return null;
			}
			return target;
		})
		.filter((item) => item);
};

const loadMenus = async () => {
	try {
		const res = await getMenuTree();
		if (res && res.code == 200) {
			const data = [
				{
					id: '-1',
					keepAlive: '0',
					label: '根菜单',
					name: '根菜单',
					path: '/',
					permission: '',
					sortOrder: 0,
					type: '0',
					weight: 0,
				},
			];
			data[0].children = filterMenu(res.data || []);
			state.menuData = data;
		}
	} catch (e) {
		console.log('get exception:', e);
		const data = [
			{
				id: '-1',
				keepAlive: '0',
				label: '根菜单',
				name: '根菜单',
				path: '/',
				permission: '',
				sortOrder: 0,
				type: '0',
				weight: 0,
			},
		];
		data[0].children = [];
		state.menuData = data;
	}
};
// 关闭弹窗
const closeDialog = () => {
	if (formRef.value) {
		formRef.value.clearValidate();
	}
	state.isShowDialog = false;
};

// 取消
const onCancel = () => {
	closeDialog();
};
const isShowLoading = ref(false)
// 新增
const onSubmit = () => {
	if (formRef.value)
		formRef.value.validate((valid) => {
			if (valid) {
				isShowLoading.value = true
				if (state.id !== null && state.id !== undefined) {
					// 编辑
					updateMenuInfo(state.ruleForm)
						.then(
							(res) => {
								if (res && res.code == 200) {
									ElMessage.success('编辑菜单成功');
									emits('ok');
									closeDialog(); // 关闭弹窗
								} else {
									ElMessage.error(res.msg || '编辑菜单失败');
								}
							},
							() => {
								ElMessage.error('编辑菜单失败');
							}
						)
						.finally(() => {
							setBackEndControlRefreshRoutes(); // 刷新菜单，未进行后端接口测试
							isShowLoading.value = false
						});
				} else {
					// 新增
					addMenuInfo(state.ruleForm)
						.then(
							(res) => {
								if (res && res.code == 200) {
									ElMessage.success('新增菜单成功');
									emits('ok');
									closeDialog(); // 关闭弹窗
								} else {
									ElMessage.error(res.msg || '新增菜单失败');
								}
							},
							() => {
								ElMessage.error('新增菜单失败');
							}
						)
						.finally(() => {
							setBackEndControlRefreshRoutes(); // 刷新菜单，未进行后端接口测试
							isShowLoading.value = false
						});
				}
			}
		});
};

// 暴露变量
defineExpose({
	openDialog,
});

const emits = defineEmits(['ok']);
</script>

<style lang="scss" scoped src="./addMenu.scss">
</style>
