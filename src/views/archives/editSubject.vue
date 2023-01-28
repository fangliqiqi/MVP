<template>
	<div class="edit-staff-page">
		<div class="content">
			<el-form ref="formRef" :model="state.ruleForm" :rules="state.rules" size="default" label-width="110px" :validate-on-rule-change="false">
				<div class="title">
					<span>基础信息</span>
				</div>

				<el-row style="margin-top: 24px">
					<el-col :span="state.span">
						<el-form-item label="员工主码" prop="empCode">
							<el-input v-model="state.ruleForm.empCode" placeholder="" disabled> </el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="姓名" prop="empName">
							<el-input v-model="state.ruleForm.empName" placeholder="" disabled> </el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="身份证号" prop="empIdcard">
							<el-input v-model="state.ruleForm.empIdcard" placeholder="" disabled> </el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<div class="title">
					<span>项目信息</span>
				</div>

				<el-row style="margin-top: 24px">
					<el-col :span="state.span">
						<el-form-item label="员工类型" prop="empNatrue">
							<el-select v-model="state.ruleForm.empNatrue" style="width: 100%" placeholder="请选择" clearable @change="empNatrueChange">
								<el-option v-for="(item, key) in state.DICTS['emp_natrue']" :key="key" :value="key" :label="item" />
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="客户名称" prop="unitName">
							<el-input v-model="state.ruleForm.unitName" placeholder="" disabled> </el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="项目名称" prop="deptName">
							<el-input v-model="state.ruleForm.deptName" placeholder="" disabled> </el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="项目编码" prop="deptNo">
							<el-input v-model="state.ruleForm.deptNo" placeholder="" disabled> </el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="业务类型" prop="businessTypeStr">
							<el-input v-model="state.ruleForm.businessTypeStr" placeholder="" disabled> </el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="合同类型" prop="contractType">
							<el-select v-model="state.ruleForm.contractType" style="width: 100%" placeholder="请选择" clearable>
								<el-option v-for="(item, key) in state.DICTS['personnel_type']" :key="key" :value="key" :label="item" />
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="工时制" prop="workingHours">
							<el-select v-model="state.ruleForm.workingHours" style="width: 100%" placeholder="请选择" clearable>
								<el-option v-for="(item, key) in state.DICTS['work_type']" :key="key" :value="key" :label="item" />
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="就职岗位" prop="post">
							<el-input v-model="state.ruleForm.post" style="width: 100%" placeholder="请填写" maxlength="20"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="入职日期" prop="enjoinDate">
							<el-date-picker v-model="state.ruleForm.enjoinDate" style="width: 100%" placeholder="请选择" value-format="YYYY-MM-DD"></el-date-picker>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="试用期" prop="tryPeriod">
							<el-select v-model="state.ruleForm.tryPeriod" style="width: 100%" placeholder="请选择" clearable>
								<el-option v-for="(item, key) in state.tryMonth" :key="key" :value="item" :label="item" />
							</el-select>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="state.span">
						<el-form-item label="开户行" prop="bankName">
							<el-input v-model="state.ruleForm.bankName" style="width: 100%" placeholder="请填写" maxlength="50"></el-input>
						</el-form-item>
					</el-col> -->

					<!-- <el-col :span="state.span">
						<el-form-item label="支行" prop="bankSubName">
							<el-input v-model="state.ruleForm.bankSubName" style="width: 100%" placeholder="请填写" maxlength="50"></el-input>
						</el-form-item>
					</el-col> -->

					<!-- <el-col :span="state.span">
						<el-form-item label="银行卡号" prop="bankNo">
							<el-input v-model="state.ruleForm.bankNo" style="width: 100%" placeholder="请填写" maxlength="50"></el-input>
						</el-form-item>
					</el-col> -->
				</el-row>
			</el-form>
		</div>

		<div class="operation-container">
			<el-button @click="goVerifyBack" style="height: 100%">返 回</el-button>
			<el-button type="primary" :loading="state.loading" @click="onSubmit" style="height: 100%">保 存</el-button>
		</div>
	</div>
</template>

<script setup name="editSubject">
import { useRoute, useRouter } from 'vue-router';
import { md5, getDictByItemTypes, closeCurrentTab, getDictValue } from '/@/utils/utils';
import { getItemInfo, addProject, updateProject, getProjectInfo } from '/@/api/subject';
import { ElMessage, ElMessageBox } from 'element-plus';
import { emitRefresh } from '/@/utils/events';

const { proxy } = getCurrentInstance();

const route = useRoute();
const router = useRouter();
const formRef = ref(null);

const state = reactive({
	ruleForm: {
		empCode: null, // 员工主码
		empName: null, // 员工姓名
		empIdcard: null, // 身份证号码
		empNatrue: null, // 员工类型
		unitName: null, // 客户名称
		deptName: null, // 项目名称
		deptNo: null, //项目编码
		businessTypeStr: null, // 业务类型展示字符串
		businessPrimaryType: null, // 业务类型1
		businessSecondType: null, // 业务类型2
		businessThirdType: null, // 业务类型3
		contractType: null, // 合同类型
		workingHours: null, // 工时制
		post: null, // 就职岗位
		enjoinDate: null, // 入职日期
		tryPeriod: null, // 试用期
		bankName: null, // 开户行
		bankSubName: null, // 支行
		bankNo: null, //银行卡号
	},
	rules: {
		empNatrue: [{ required: true, message: '请选择员工类型' }],
		contractType: [{ required: true, message: '请选择合同类型' }],
		post: [{ required: true, message: '请输入就职岗位' }],
		workingHours: [],
		enjoinDate: [{ required: true, message: '请选择入职日期' }],
		tryPeriod: [{ required: true, message: '请选择入职日期' }],
	},
	span: 6,
	loading: false,
	DICTS: {},
	tryMonth: ['一个月', '两个月', '三个月', '四个月', '五个月', '六个月', '七个月', '八个月', '九个月', '十个月', '十一个月', '十二个月'],
});

// 工时制检验问题，只在员工类型不是2且合同类型是标准合同才是必填
watchEffect((e) => {
	if (state.ruleForm.empNatrue != 2 && state.ruleForm.contractType == 1) {
		state.rules.workingHours = [{ required: true, message: '请选择工时制' }];
	} else {
		state.rules.workingHours = [];
		setTimeout(() => {
			formRef.value.clearValidate(['workingHours']);
		}, 30);
	}
});

const formatBusinessType = (...args) => {
	// 格式化字符串拼接
	const types = [];
	args.forEach((arg) => {
		if (arg) {
			types.push(arg);
		}
	});
	return types.join('/');
};

// 员工状态更新 更新部分表单校验项
const empNatrueChange = (val) => {
	// 代理状态是非必填
	state.rules.enjoinDate = [{ required: val != 2, message: '请选择入职日期' }];
	state.rules.tryPeriod = [{ required: val != 2, message: '请选择入职日期' }];
	formRef.value.clearValidate(['enjoinDate', 'tryPeriod']);
};

// 创建项目
const createProject = () => {
	const p = route.query;
	const t = md5(p.empIdcard + p.empName + p.deptNo);
	if (p._t !== t) {
		// 数据合法性校验不通过
		ElMessage.error('数据合法性校验不通过');
		goBack();
		return;
	}

	state.ruleForm.empName = p.empName;
	state.ruleForm.empIdcard = p.empIdcard;
	state.ruleForm.deptNo = p.deptNo;

	getItemInfo({
		empIdcard: p.empIdcard,
		empNo: p.deptNo,
	}).then((res) => {
		if (res.code === 200) {
			// console.log(res.data);
			state.ruleForm.empCode = res.data.empCode;
			state.ruleForm.unitName = res.data.customerName;
			state.ruleForm.deptName = res.data.itemInfo && res.data.itemInfo.departName;

			state.ruleForm.businessPrimaryType = res.data.itemInfo && res.data.itemInfo.businessPrimaryType; // 业务类型1
			state.ruleForm.businessSecondType = res.data.itemInfo && res.data.itemInfo.businessSecondType; // 业务类型2
			state.ruleForm.businessThirdType = res.data.itemInfo && res.data.itemInfo.businessThirdType; // 业务类型3

			// 格式化字符串拼接
			state.ruleForm.businessTypeStr = `${state.ruleForm.businessPrimaryType??'--'}/${state.ruleForm.businessSecondType??'--'}/${state.ruleForm.businessThirdType??'--'}`;
		}
	});
};

const editProject = () => {
	if (!route.params.id) {
		// 数据合法性校验不通过
		ElMessage.error('数据合法性校验不通过');
		goBack();
		return;
	}

	getProjectInfo(route.params.id).then((res) => {
		if (res.code === 200) {
			const data = res.data || {};
			state.ruleForm = data;
			// state.ruleForm.businessTypeStr = formatBusinessType(
			// 	getDictValue('customer_business_parent', data.businessPrimaryType, state.DICTS),
			// 	getDictValue('customer_business_type', data.businessSecondType, state.DICTS),
			// 	getDictValue('customer_business_sub_type', data.businessThirdType, state.DICTS)
			// );
			state.ruleForm.businessTypeStr = `${state.ruleForm.businessPrimaryType??'--'}/${state.ruleForm.businessSecondType??'--'}/${state.ruleForm.businessThirdType??'--'}`;
		} else {
			ElMessage.error(res.msg || '访问错误');
		}
	});
};

// 编辑项目
onMounted(() => {
	loadDicts();
	if (route.name === 'subject-edit') {
		editProject();
	} else {
		createProject();
	}
	
});

/**
 * 加载字典值
 */
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes([
			'emp_natrue',
			'personnel_type',
			'work_type',
			'customer_business_parent',
			'customer_business_type',
			'customer_business_sub_type',
		]);
		if (res) {
			state.DICTS = res;
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

const goVerifyBack = () => {
	ElMessageBox.confirm('返回后，信息将不会保留，是否确定？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			goBack();
		})
		.catch(() => {});
};

const goBack = () => {
	try {
		// 返回上一级
		router.push({
			path: '/archives/subject',
			query: {},
		});
		closeCurrentTab(route, proxy); // 关闭当前页
		emitRefresh(proxy, '/archives/subject');
	} catch (e) {
		console.log('get exception:', e);
	}
};

const onSubmit = () => {
	// 保存
	if (formRef.value) {
		formRef.value.validate(async (valid) => {
			if (valid) {
				// 表单校验成功
				state.loading = true;
				if (state.ruleForm.id) {
					// 编辑
					try {
						const res = await updateProject(state.ruleForm);
						if (res && res.code === 200) {
							// 编辑成功
							ElMessage.success('项目档案编辑成功');
							goBack();
						} else {
							state.loading = false;
							ElMessage.success(res.msg || '编辑失败');
						}
					} catch (e) {
						console.log('get exception:', e);
						ElMessage.error('编辑失败');
						state.loading = false;
					}
				} else {
					// 新增
					try {
						const res = await addProject(state.ruleForm);
						if (res && res.code === 200) {
							// 新增成功
							ElMessage.success('项目档案添加成功');
							goBack();
						} else {
							state.loading = false;
							ElMessage.success(res.msg || '新增失败');
						}
					} catch (e) {
						console.log('get exception:', e);
						ElMessage.error('新增失败');
						state.loading = false;
					}
				}
			}
		});
	}
};
</script>

<style lang="scss" scoped src="./css/editSubject.scss">

</style>
