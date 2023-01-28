<template>
	<div class="staff-info-page">
		<div class="content">
			<div class="basic-info section-container">
				<div class="title">
					<span>基础信息</span>
					<div class="operate-log" @click="openLogDialog">
						<el-icon style="margin-right:3px"><Document /></el-icon>
						操作日志
					</div>
				</div>

				<el-row>
					<el-col v-for="item in state.staffInfoParams" :key="`basicInfo_${item}`" class="basic-info-item" :span="getColNumber(item)">
						<span class="desc-title" v-html="getStaffTitle(item)"></span>
						<div class="desc-content">
							<el-tooltip placement="top-start" effect="dark" popper-class="detail-tooltip-popper">
								<template #content>
									<div class="detail-tooltip-container">
										<span v-html="getStaffValue(item)"> </span>
									</div>
								</template>
								<span>{{ getStaffValue(item) }} </span>
							</el-tooltip>
						</div>
					</el-col>

					<!--离职库类型-->
					<template v-if="state.staffInfo && state.staffInfo.fileStatus == 1">
						<el-col v-for="item in state.withdrawnParams" :key="`basicInfo_${item}`" class="basic-info-item" :span="getColNumber(item)">
							<span class="desc-title" v-html="getStaffTitle(item)"> </span>
							<div class="desc-content">
								<el-tooltip placement="top-start" effect="dark" popper-class="detail-tooltip-popper">
									<template #content>
										<div class="detail-tooltip-container">
											<span v-html="getStaffValue(item)"> </span>
										</div>
									</template>
									<span>{{ getStaffValue(item) }} </span>
								</el-tooltip>
							</div>
						</el-col>
					</template>
				</el-row>
			</div>

			<!--附属信息部分-->
			<attach-section  v-if="state.staffInfo.empIdcard" :empIdcard="state.staffInfo.empIdcard" ></attach-section>

			<!--整体服务-->
			<service-section
				v-if="state.staffInfo.empIdcard"
				:info="state.staffInfo"
				:projects="state.projects"
				:getStaffTitle="getStaffTitle"
				:getStaffValue="getStaffValue"
				:getColNumber="getColNumber"
			></service-section>
		</div>

		<operate-log ref="operateLogRef"></operate-log>

		<div v-if="state.name === 'online-detail'" class="snap-btn" @click="goEleList">
			<div class="jump-icon">
				<el-icon style="vertical-align: text-top"><Document /></el-icon>
			</div>

			电子<br />档案
		</div>

		<div class="operation-container">
			<el-button @click="goBack" style="height: 100%">返 回</el-button>
		</div>
	</div>
</template>

<script setup name="editStaffPage">
import { useRoute, useRouter } from 'vue-router';
import { getStaffInfo } from '/@/api/staff';
import { getSubjectInfo, getProjectListByStaffId } from '/@/api/subject';
import { STAFF_INFO_DIC } from '/@/utils/header';
import { ElMessage } from 'element-plus';
import { getDictByItemTypes, EMPTY_PLACEHOLDER, getDictValue as getValue, closeCurrentTab } from '/@/utils/utils';
import { SEX_OPTION, SALARY_STATUS_OPTION } from '/@/utils/dicts';
import { idToArea } from '/@/utils/city';
import attachSection from './component/attachSection.vue';
import serviceSection from './component/serviceSection.vue';
import operateLog from './component/operateLog.vue';
import { Document } from '@element-plus/icons-vue';
import moment from 'moment';

const { proxy } = getCurrentInstance();

const router = useRouter();
const route = useRoute();
const operateLogRef = ref(null);

/**
 * 跳转电子档案，携带身份证信息
 */
const goEleList = () => {
	router.push('/archives/electronic?empIdcard=' + state.staffInfo.empIdcard);
};

const state = reactive({
	staffInfo: {}, // 员工信息
	projects: [], // 项目信息
	name: null, // 当前路由name
	staffId: null,
	projectId: null,
	staffInfoParams: [
		'empCode',
		'empNatrue',
		'empName',
		'validity',
		'empIdcard',
		'empSex',
		'empBirthday',
		'empAge',
		'empMarriStatus',
		'empNational',
		'politicalStatus',
		'empPhone',
		'empEmail',
		'idAddress',
		'empRegisType',
		'fileAddress',
		'isCollege',
		'hignEducation',
		'school',
		'major',
		'admissionDate',
		'gradutionDate',
		'fileSource',
		'status',
		'contactAddress',
		'remark',
	], // 显示字段数组，
	withdrawnParams: ['leaveTime', 'leaveReason', 'leaveRemark'],

	DICTS: {},
	dictKeys: [
		'emp_natrue',
		'emp_married',
		'emp_national',
		'emp_political',
		'emp_registype',
		'education',
		'commercial_satte',
		'social_ecurity_state',
		'fund_status',
		'personnel_state',
		'EMP_SOURCE',
		'social_reduce_reason',
	],
	collegeDict: {
		0: '否',
		1: '是',
	},
	attachActiveTab: 'first', // 附属信息选中当前tab
	familyColumns: [
		{ dataIndex: '', title: '成员姓名' },
		{ dataIndex: '', title: '与本人关系' },
		{ dataIndex: '', title: '出生日期' },
		{ dataIndex: '', title: '工作单位' },
		{ dataIndex: '', title: '联系电话' },
		{ dataIndex: '', title: '操作' },
	],
	fileStatusEnmu: {
		0: '草稿',
		1: '已审核',
	},
});

const getColNumber = (item) => {
	return 6;
};

const openLogDialog = () => {
	if (operateLogRef.value) operateLogRef.value.openDialog(state.staffInfo);
};

const getStaffTitle = (item) => {
	return STAFF_INFO_DIC[item];
};

const getDictValue = (type, value) => {
	return getValue(type, value, state.DICTS);
};

const getStaffValue = (item) => {
	let val = state.staffInfo[item];
	switch (item) {
		case 'empNatrue':
			// 员工类型
			val = getDictValue('emp_natrue', state.staffInfo[item]);
			break;
		case 'validity':
			// 身份证有效期
			const validityStart = state.staffInfo.validityStart;
			const validityEnd = state.staffInfo.validityEnd;
			if (validityStart && validityEnd) {
				val = `${moment(validityStart).format('YYYY-MM-DD')} 至 ${validityEnd=='2999-12-31'?'长期':moment(validityEnd).format('YYYY-MM-DD')}`;
			} else {
				val = EMPTY_PLACEHOLDER;
			}
			break;

		case 'empSex':
			// 性别
			val = SEX_OPTION[state.staffInfo[item]] || EMPTY_PLACEHOLDER;
			break;

		case 'empBirthday':
		case 'admissionDate':
		case 'gradutionDate':
			// 时间格式
			if (val) val = moment(val).format('YYYY-MM-DD');
			else val = EMPTY_PLACEHOLDER;
			break;

		case 'empMarriStatus':
			// 婚姻状况
			val = getDictValue('emp_married', state.staffInfo[item]);
			break;

		case 'empNational':
			// 民族
			val = getDictValue('emp_national', state.staffInfo[item]);
			break;

		case 'politicalStatus':
			//  政治面貌
			val = getDictValue('emp_political', state.staffInfo[item]);
			break;
		case 'empRegisType':
			val = getDictValue('emp_registype', state.staffInfo[item]);
			break;

		case 'hignEducation':
			// 最高学历
			val = getDictValue('education', state.staffInfo[item]);
			break;

		case 'isCollege':
			val = state.collegeDict[state.staffInfo[item]] || EMPTY_PLACEHOLDER;
			break;
		case 'idAddress':
			val = idToArea({ province: state.staffInfo.idProvince, city: state.staffInfo.idCity, town: state.staffInfo.idTown });
			break;
		case 'fileAddress':
			val = idToArea({ province: state.staffInfo.fileProvince, city: state.staffInfo.fileCity, town: state.staffInfo.fileTown });
			break;

		case 'contractStatus':
			val = getDictValue('personnel_state', state.staffInfo[item]);
			break;
		case 'socialStatus':
			val = getDictValue('social_ecurity_state', state.staffInfo[item]);
			break;
		case 'fundStatus':
			val = getDictValue('fund_status', state.staffInfo[item]);
			break;
		case 'insuranceStatus':
			val = getDictValue('commercial_satte', state.staffInfo[item]);
			break;
		case 'salaryStatus':
			val = SALARY_STATUS_OPTION[state.staffInfo[item]] || EMPTY_PLACEHOLDER;
			break;

		case 'fileSource':
			val = getDictValue('EMP_SOURCE', state.staffInfo[item]);
			break;

		case 'status':
			if (state.staffInfo.fileStatus == 1) {
				val = '已减档';
			} else {
				val = state.fileStatusEnmu[state.staffInfo[item]] || EMPTY_PLACEHOLDER;
			}

			break;

		case 'leaveReason':
			val = getDictValue('social_reduce_reason', state.staffInfo[item]);
			break;
		default:
			if (val === null || val === undefined || val == '') {
				// 默认为空 '--'
				return EMPTY_PLACEHOLDER;
			}
			break;
	}

	return val;
};

const goBack = () => {
	// 返回上一级
	const name = route.name;
	// console.log(route);
	// console.log(name);

	if (name === 'withdrawn-detail') {
		router.push('/archives/staff/withdrawn');
	} else if (name === 'subject-detail') {
		// router.push('/archives/subject');
		router.push({ path: '/archives/subject', query: { projectIdCard: route.query.projectIdCard} });

	} else {
		router.push('/archives/staff/online');
	}
	closeCurrentTab(route, proxy);
};

onMounted(async () => {
	const name = route.name;
	state.name = name;
	loadDicts();
	if (name === 'online-detail' || name === 'withdrawn-detail') {
		// 人员详情
		if (route.params && route.params.id) {
			state.staffId = route.params.id;
			loadDetailFromStaff(route.params.id);
		} else {
			ElMessage.error('不合法的路由地址');
			goBack();
		}
	} else if (name === 'subject-detail') {
		// 项目详情
		if (route.params && route.params.id) {
			state.projectId = route.params.id;
			loadDetailFormSubject(route.params.id);
		} else {
			ElMessage.error('不合法的路由地址');
			goBack();
		}
	}
});

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

// 从项目档案进入
const loadDetailFormSubject = async (id) => {
	// 加载详情信息
	try {
		const res = await getSubjectInfo(id);
		if (res && res.code === 200) {
			// console.log(`output->res.data`,res.data)
			state.projects = [res.data];
		}
		// 获取社保和公积金详情
		// console.log('[ 项目档案详情 ] >', res.data)

		const staffID = res.data.empId;
		loadStaffInfo(staffID);
	} catch (e) {
		console.log('get exception:', e);
		ElMessage.error('获取详情失败');
		goBack();
	}
};

/**
 * 通过人员档案列表进入
 * @param {*} id
 */
const loadDetailFromStaff = async (id) => {
	try {
		loadStaffInfo(id);
		const res = await getProjectListByStaffId({ empId: id });
		// console.log('[ 人员档案详情 ] >', res.data)
		if (res && res.code === 200) {
			state.projects = res.data || [];
		}
	} catch (e) {
		console.log('get exception:', e);
		ElMessage.error('获取详情失败');
		goBack();
	}
};

const loadStaffInfo = async (id) => {
	// 加载员工档案详情
	try {
		const res = await getStaffInfo(id);
		if (res && res.code === 200&&res.data) {
			const data = res.data;
			state.staffInfo = data;
		} else {
			ElMessage.error(res.msg || '获取档案详情失败');
			goBack();
		}
	} catch (e) {
		console.log('get exception:', e);
		ElMessage.error('获取档案详情失败');
		goBack();
	}
};
</script>

<style lang="scss" scoped src="./css/detail.scss">
</style>