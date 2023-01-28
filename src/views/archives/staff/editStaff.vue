<template>
	<div class="edit-staff-page">
		<div class="content">
			<el-form ref="formRef" :model="state.ruleForm" :rules="rules" size="default" label-width="128px">
				<div class="title">
					<span>基础信息</span>
				</div>

				<el-row style="margin-top: 24px">
					<el-col :span="state.span" v-if="state.isEdit">
						<el-form-item label="员工主码" prop="empCode">
							<el-input v-model="state.ruleForm.empCode" disabled />
						</el-form-item>
					</el-col>

					<el-col :span="24 - state.span" v-if="state.isEdit"> </el-col>

					<el-col :span="state.span">
						<el-form-item label="员工类型" prop="empNatrue">
							<el-select v-model="state.ruleForm.empNatrue" style="width: 100%" placeholder="请选择" filterable @change="changeType">
								<el-option v-for="(item, key) in state.DICTS['emp_natrue']" :key="key" :value="String(key)" :label="item" />
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="员工姓名" prop="empName">
							<el-input v-model="state.ruleForm.empName" placeholder="请填写" disabled> </el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="身份证号" prop="empIdcard">
							<el-input v-model="state.ruleForm.empIdcard" placeholder="请填写" disabled @change="changeIDCard"> </el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="性别" prop="empSex">
							<el-select v-model="state.ruleForm.empSex" style="width: 100%" placeholder="请选择" disabled>
								<el-option v-for="(item, key) in SEX_OPTION" :label="item" :key="key" :value="String(key)"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<!-- 身份证有效期限 -->
					<el-col :span="state.span">
						<el-form-item label="身份证期限" prop="empIdcardValid" >
							<el-select 
								v-model="state.ruleForm.empIdcardValid" 
								style="width: 100%" 
								placeholder="请选择"
								clearable
								@change="changeIDCardValid"
							>
								<el-option label="固定" :value="0"></el-option>
								<el-option label="长期" :value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="state.span">
						<el-form-item label="身份证开始日期" prop="validityStart">
							<el-date-picker 
								v-model="state.ruleForm.validityStart" 
								style="width: 100%"
								type="date"
								value-format="YYYY-MM-DD"
								placeholder="请选择"
								@change="changeValidityStart"
								>
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="state.span" v-if='state.ruleForm.empIdcardValid !=1'>
						<el-form-item label="身份证截止日期" prop="validityEnd">
							<el-date-picker 
								v-model="state.ruleForm.validityEnd"
								style="width: 100%"
								type="date" 
								placeholder="请选择" 
								value-format="YYYY-MM-DD"
								:disabled-date="disabledDate">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="state.span">
						<el-form-item label="身份证有效期" prop="validity">
							<el-date-picker
								v-model="state.ruleForm.validity"
								type="daterange"
								unlink-panels
								value-format="YYYY-MM-DD HH:mm:ss"
								range-separator="到"
								start-placeholder="开始时间"
								end-placeholder="结束时间"
								style="width: 100%"
								@change="changeValidity"
							></el-date-picker>
						</el-form-item>
					</el-col> -->

					<el-col :span="state.span">
						<el-form-item label="出生日期" prop="empBirthday">
							<el-date-picker
								value-format="YYYY-MM-DD HH:mm:ss"
								v-model="state.ruleForm.empBirthday"
								placeholder="请选择"
								style="width: 100%"
								disabled
							></el-date-picker>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="年龄" prop="empAge">
							<el-input v-model="state.ruleForm.empAge" placeholder="请填写" type="number" disabled> </el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="婚姻状况" prop="empMarriStatus">
							<el-select v-model="state.ruleForm.empMarriStatus" style="width: 100%" placeholder="请选择" clearable filterable>
								<el-option v-for="(item, key) in state.DICTS['emp_married']" :key="key" :value="String(key)" :label="item" />
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="民族" prop="empNational">
							<el-select v-model="state.ruleForm.empNational" style="width: 100%" placeholder="请选择" clearable filterable>
								<el-option v-for="(item, key) in state.DICTS['emp_national']" :key="key" :value="String(key)" :label="item" />
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="政治面貌" prop="politicalStatus">
							<el-select v-model="state.ruleForm.politicalStatus" style="width: 100%" placeholder="请选择" clearable filterable>
								<el-option v-for="(item, key) in state.DICTS['emp_political']" :key="key" :value="String(key)" :label="item" />
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="手机号码" prop="empPhone">
							<el-input v-model="state.ruleForm.empPhone" style="width: 100%" placeholder="请填写" clearable maxlength="11"> </el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="邮箱" prop="empEmail">
							<el-input v-model="state.ruleForm.empEmail" style="width: 100%" placeholder="请填写" clearable maxlength="50"> </el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="户籍所在地" prop="idAddress">
							<el-tree-select
								v-model="state.ruleForm.idAddress"
								:data="state.areaJson"
								style="width: 100%"
								placeholder="请选择"
								:props="state.areaProps"
								@current-change="changeIdAddress"
								@clear="clearIdAddress"
								node-key="id"
								clearable
								check-strictly
							/>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="户口性质" prop="empRegisType">
							<el-select v-model="state.ruleForm.empRegisType" style="width: 100%" placeholder="请选择" clearable filterable>
								<el-option v-for="(item, key) in state.DICTS['emp_registype']" :key="key" :value="String(key)" :label="item" />
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="档案所在地" prop="fileAddress">
							<el-tree-select
								v-model="state.ruleForm.fileAddress"
								:data="state.areaJson"
								style="width: 100%"
								placeholder="请选择"
								:props="state.areaProps"
								label="areaName"
								node-key="id"
								@current-change="changeFileAddress"
								@change="clearFileAddress"
								clearable
								check-strictly
							/>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="是否大专及以上" prop="isCollege">
							<el-select v-model="state.ruleForm.isCollege" style="width: 100%" placeholder="请选择" clearable filterable @change="changeCollege">
								<el-option label="是" :value="1"></el-option>
								<el-option label="否" :value="0"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="最高学历" prop="hignEducation">
							<el-select v-model="state.ruleForm.hignEducation" style="width: 100%" placeholder="请选择" clearable filterable>
								<el-option v-for="(item, key) in state.DICTS['education']" :key="key" :value="String(key)" :label="item" />
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="学校" prop="school">
							<el-input v-model="state.ruleForm.school" placeholder="请填写" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="专业" prop="major">
							<el-input v-model="state.ruleForm.major" placeholder="请填写" maxlength="50" clearable></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="入学时间" prop="admissionDate">
							<el-date-picker
								value-format="YYYY-MM-DD HH:mm:ss"
								v-model="state.ruleForm.admissionDate"
								style="width: 100%"
								placeholder="请选择"
							></el-date-picker>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="毕业时间" prop="gradutionDate">
							<el-date-picker
								value-format="YYYY-MM-DD HH:mm:ss"
								v-model="state.ruleForm.gradutionDate"
								style="width: 100%"
								placeholder="请选择"
								@change="changeGradutionDate"
							></el-date-picker>
						</el-form-item>
					</el-col>

					<el-col :span="state.span" v-if="state.isEdit">
						<el-form-item label="档案状态" prop="status">
							<el-select v-model="state.ruleForm.status" style="width: 100%" placeholder="请选择" clearable filterable disabled>
								<el-option :value="0" label="草稿"></el-option>
								<el-option :value="1" label="已审核"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="通信地址" prop="contactAddress">
							<el-input v-model="state.ruleForm.contactAddress" type="textarea" maxlength="200" placeholder="请填写"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="备注" prop="remark">
							<el-input v-model="state.ruleForm.remark" type="textarea" maxlength="200" placeholder="请填写"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<div class="title" v-if="!state.isEdit">
					<span>项目信息</span>
				</div>

				<el-row style="margin-top: 24px" v-if="!state.isEdit">
					<el-col :span="state.span">
						<el-form-item label="项目名称" prop="deptId">
							<el-select v-model="state.ruleForm.deptId" style="width: 100%" placeholder="请选择" clearable filterable>
								<el-option v-for="(item, id) in state.deptList" :key="item.id" :value="String(item.id)" :label="item.departName" />
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="state.span">
						<el-form-item label="就职岗位" prop="post">
							<el-input v-model="state.ruleForm.post" placeholder="请填写" maxlength="20"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>

		<div class="operation-container">
			<el-button @click="goVerifyBack" size="default" style="height: 100%">返 回</el-button>
			<el-button type="primary" size="default" @click="onSubmit" style="height: 100%">保 存</el-button>
		</div>
	</div>
</template>

<script setup name="editStaffPage">
import { useRoute, useRouter } from 'vue-router';
import { md5, parseIDCardInfo, getDictByItemTypes, closeCurrentTab } from '/@/utils/utils';
import { addStaffInfo, updateStaffInfo, getAllDept, getStaffInfo } from '/@/api/staff';
import { SEX_OPTION } from '/@/utils/dicts';
import { getAreaJson } from '/@/utils/city';
import { getCurrentInstance } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { emitRefresh } from '/@/utils/events';
import moment from 'moment';

const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const formRef = ref(null);

const state = reactive({
	ruleForm: {
		admissionDate: null, // 入学时间
		empAge: null, // 年龄
		empRegisType: null, //户口性质
		empBirthday: null, // 出生日期
		empEmail: null, // 邮箱
		empIdcard: null, // 身份证号码
		empMarriStatus: null, // 婚姻状态
		empName: null, // 员工姓名
		empNational: null, // 民族
		empNatrue: null, // 员工类型（字典值，0外包1派遣2代理）
		empPhone: null, // 手机电话
		empSex: null, // 性别
		fileCity: null, // 档案-市
		fileProvince: null, // 档案-省
		fileTown: null, // 档案-县
		gradutionDate: null, // 毕业时间
		hignEducation: null, // 最高学历（字典值）
		idCity: null, // 身份证-市
		idProvince: null, // 身份证-省
		idTown: null, // 身份证-县
		isCollege: null, // 是否大专及以上（0否1是）
		major: null, //  专业
		politicalStatus: null, // 政治面貌
		remark: null, // 备注
		school: null, // 学校
		validityEnd: null, // 身份证有效期截止
		validityStart: null, // 身份证有效期开始
		post: null, // 就职岗位
	},
	isEdit: false, // 是否是编辑页面
	span: 6,
	SEX_OPTION,
	dictKeys: ['emp_natrue', 'emp_married', 'emp_national', 'emp_political', 'emp_registype', 'education'],
	DICTS: {},
	areaJson: [],
	areaProps: {
		label: 'areaName',
	},
	deptList: null, // 所有项目信息
});

const validatePhone = (rule, value, callback) => {
	if (value && value.trim().length === 11) {
		callback();
	} else {
		callback(new Error('请输入正确的手机号码格式'));
	}
};

const changeCollege = () => {
	setTimeout(() => {
		if (formRef.value) formRef.value.clearValidate();
	}, 0);
};
const changeGradutionDate = (val) => {
	// console.log(val);
};

// 邮箱校验
const validateEmail = (rule, value, callback) => {
	// 需含”@“的，可添加多个，用英文逗号隔开；
	if (!value || String(value).includes('@')) {
		callback();
	} else {
		callback(new Error('请输入正确的邮箱格式'));
	}
};

// 学历相关校验
const validateDegree = (rule, value, callback, tips) => {
	// “员工类型”为外包、派遣类的且“是否大专及以上”是的，必填

	if (state.ruleForm.isCollege == 0 || (state.ruleForm.isCollege == 1 && value !== null && value !== undefined)) {
		callback();
	} else {
		callback(new Error(tips));
	}
};

const rules = computed(() => {
	/**
	 * 各类型均需填写的字段
	 */
	const common = {
		empNatrue: [{ required: true, message: '请选择员工类型', trigger: 'change' }],
		empName: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
		empIdcard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
		empSex: [{ required: true, message: '请选择性别', trigger: 'change' }],
		empBirthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
		empAge: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
		empPhone: [{ required: true, message: '请输入手机号', trigger: 'blur', validator: validatePhone }],
		empEmail: [{ trigger: 'blur', validator: validateEmail }],
		deptId: [{ required: true, message: '请选择项目', trigger: 'change' }],
		post: [{ required: true, message: '请填写就职岗位', trigger: 'blur' }],
	};

	/**
	 * 外包和派遣
	 */
	const outAndSendRules = {
		// validity: [{ required: true, message: '请选择身份证有效期', trigger: 'change' }],
		empIdcardValid: [{ required: true, message: '请选择身份证期限', trigger: 'change' }],
		validityStart: [{ required: true, message: '请选择身份证开始时间', trigger: 'change' }],
		validityEnd: [{ required: true, message: '请选择身份证结束时间', trigger: 'change' }],
		idAddress: [{ required: true, message: '请选择户籍所在地', trigger: 'change' }],
		empRegisType: [{ required: true, message: '请选择户口性质', trigger: 'change' }],
		fileAddress: [{ required: true, message: '请选择档案所在地', trigger: 'change' }],
		isCollege: [{ required: true, message: '请选择是否大专及以上', trigger: 'change' }],
		empNational: [{ required: true, message: '请选择民族', trigger: 'change' }],
		contactAddress: [{ required: true, message: '请填写通信地址', trigger: 'blur' }],
	};

	const needCollegeRules = {
		hignEducation: [
			{
				required: true,
				trigger: 'change',
				message: '请选择最高学历',
			},
		],
		school: [
			{
				required: true,
				trigger: 'blur',
				message: '请输入学校',
			},
		],
		major: [
			{
				required: true,
				trigger: 'blur',
				message: '请输入专业',
			},
		],
		admissionDate: [
			{
				required: true,
				trigger: 'change',
				message: '请选择入学时间',
			},
		],
		gradutionDate: [
			{
				required: true,
				trigger: 'change',
				message: '请选择毕业时间',
			},
		],
	};

	if (state.ruleForm.empNatrue == 2) {
		return common;
	}

	if (state.ruleForm.isCollege == 1) {
		//  大专及以上
		return Object.assign({}, common, outAndSendRules, needCollegeRules);
	}

	return Object.assign({}, common, outAndSendRules);
});

const changeType = () => {
	if (formRef.value) {
		setTimeout(() => {
			formRef.value.clearValidate();
		}, 0);
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

onMounted(() => {
	// console.log('get route:', route);
	const p = route.query;
	const params = route.params;
	if (params && params.id) {
		// 编辑页面
		state.isEdit = true;
		getDetail(params.id);
	} else {
		// 新增页面
		state.isEdit = false;
		const t = md5(p.empIdcard + p.empName);
		if (p._t !== t || (p.empIdcard.length != 15 && p.empIdcard.length != 18)) {
			// 数据合法性校验不通过
			goBack();
			return;
		}
		changeIDCard(p.empIdcard);
		state.ruleForm.empName = p.empName || null;
		state.ruleForm.empIdcard = p.empIdcard || null;
		state.ruleForm.empNatrue = '0'; // 默认外包

		setTimeout(() => {
			if (formRef.value) formRef.value.clearValidate();
		}, 600);
	}
	intiParams();
});

const getDetail = async (id) => {
	try {
		const res = await getStaffInfo(id);
		if (res && res.code === 200) {
			const data = res.data;
			state.ruleForm = data;
			// state.ruleForm.validity = [moment(data.validityStart).format('YYYY-MM-DD HH:mm:ss'), moment(data.validityEnd).format('YYYY-MM-DD HH:mm:ss')]; // 身份证有效期
			state.ruleForm.idAddress = data.idTown || data.idCity || data.idProvince;
			state.ruleForm.fileAddress = data.fileTown || data.fileCity || data.fileProvince;
			// 入学时间
			state.ruleForm.admissionDate = data.admissionDate ? moment(data.admissionDate).format('YYYY-MM-DD HH:mm:ss') : null;
			// 出生日期
			state.ruleForm.empBirthday = data.empBirthday ? moment(data.empBirthday).format('YYYY-MM-DD HH:mm:ss') : null;
			// 毕业时间
			state.ruleForm.gradutionDate = data.gradutionDate ? moment(data.gradutionDate).format('YYYY-MM-DD HH:mm:ss') : null;
			// 身份证期限
			state.ruleForm.empIdcardValid = data.validityEnd=='2999-12-31' ? 1 :data.validityEnd?0:null
			// console.log('get ruleForm:', state.ruleForm);
		} else {
			ElMessage.error(res.msg || '获取档案详情失败');
			goBack();
		}
	} catch (e) {
		console.log('get exception:', e);
		ElMessage.error((e && e.msg) || '获取档案详情失败');
		goBack();
	}
};

const getAllDeptList = () => {
	getAllDept().then((res) => {
		if (res && res.code === 200) {
			state.deptList = res.data;
		}
	});
};

/**
 * 加载字典值
 */
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			state.DICTS = res;
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};

/**
 * 初始化数据
 */
const intiParams = () => {
	getAllDeptList();
	loadDicts();
	// 获取省市区信息
	const json = getAreaJson();
	state.areaJson = json;
};

const changeIDCard = (val) => {
	const info = parseIDCardInfo(val);
	// console.log('get info:',info)
	state.ruleForm.empAge = info.age;
	state.ruleForm.empBirthday = info.birthday + ' 00:00:00';
	state.ruleForm.empSex = String(info.sex);
};

const changeValidity = (val) => {
	// 身份证有效期
	// console.log('get changeValidity:', val);
	// if (val) {
	// 	state.ruleForm.validityStart = val[0];
	// 	state.ruleForm.validityEnd = val[1];
	// } else {
	// 	state.ruleForm.validityStart = null;
	// 	state.ruleForm.validityEnd = null;
	// }
};
// 身份证期限
const changeIDCardValid = (val) => {
	if(val==null||val==undefined||val==''){
		state.ruleForm.validityStart = null;
		state.ruleForm.validityEnd = null;
	}else if(val==1){
		state.ruleForm.validityEnd = '2999-12-31';
	}else{
		state.ruleForm.validityEnd = null;
	}
	
};
// 身份证开始日期
const changeValidityStart = (val) => {
	state.ruleForm.validityStart = val;
	state.ruleForm.validityEnd = null;
};
const disabledDate = (current) => {
	if(state.ruleForm.validityStart){
		return current && current < moment(state.ruleForm.validityStart).add(1, 'days');
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
	let pro = null,
		city = null,
		town = null;
	// console.log('get values：', values);
	pro = values[0] || null;
	if (values.length > 1) city = values[1] || null;
	if (values.length > 2) town = values[2] || null;
	state.ruleForm.fileProvince = pro;
	state.ruleForm.fileCity = city;
	state.ruleForm.fileTown = town;
	// console.log('get fileAddress:', state.ruleForm.fileAddress);
};

const clearFileAddress = (val) => {
	if (!val) {
		state.ruleForm.fileProvince = null;
		state.ruleForm.fileCity = null;
		state.ruleForm.fileTown = null;
	}
};

const changeIdAddress = (val, node) => {
	// 获取户籍所在地
	const values = [val.id];
	if (node.parent && node.parent.level != 0) {
		// 获取市或者省
		values.unshift(node.parent.data.id);
		if (node.parent.parent && node.parent.parent.level != 0) {
			// 获取省
			values.unshift(node.parent.parent.data.id);
		}
	}

	let pro = null,
		city = null,
		town = null;

	pro = values[0] || null;
	if (values.length > 1) city = values[1] || null;
	if (values.length > 2) town = values[2] || null;
	state.ruleForm.idProvince = pro;
	state.ruleForm.idCity = city;
	state.ruleForm.idTown = town;
};

const clearIdAddress = (val) => {
	if (!val) {
		state.ruleForm.idProvince = null;
		state.ruleForm.idCity = null;
		state.ruleForm.idTown = null;
	}
};

const goBack = () => {
	// 返回上一级
	router.push('/archives/staff/online');
	emitRefresh(proxy, '/archives/staff/online');
	closeCurrentTab(route, proxy);
};

const onSubmit = () => {
	// 保存
	if (formRef.value) {
		formRef.value.validate(async (valid) => {
			if (valid) {
				const data = { ...state.ruleForm };
				data.validityEnd = data.empIdcardValid==1?'2999-12-31': data.validityEnd;
				// 项目ID
				const item = state.deptList.find((item) => item.id === data.deptId);
				if (item) {
					data.deptName = item.departName;
					data.deptNo = item.departNo;
				} else {
					data.deptName = null;
					data.deptNo = null;
				}
				delete data.validity; // 删除过期区间
				delete data.idAddress;
				delete data.fileAddress;

				// 表单校验成功
				if (data.id) {
					// 编辑
					try {
						const res = await updateStaffInfo(data);
						if (res && res.code === 200) {
							// 编辑成功
							ElMessage.success('编辑成功');
							goBack();
						} else {
							ElMessage.error(res.msg || '编辑失败');
						}
					} catch (e) {
						console.log('get exception:', e);
						ElMessage.error((e && e.msg) || '编辑失败');
					}
				} else {
					// 新增
					try {
						const res = await addStaffInfo(data);
						if (res && res.code === 200) {
							// 新增成功
							ElMessage.success('新增成功');
							goBack();
						} else {
							ElMessage.error(res.msg || '新增失败');
						}
					} catch (e) {
						console.log('get exception:', e);
						ElMessage.error((e && e.msg) || '新增失败');
					}
				}
			} else {
				ElMessage.error('填写信息校验不通过');
			}
		});
	}
};
</script>

<style lang="scss" scoped src="./css/editStaff.scss">

</style>
