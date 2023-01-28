<template>
	<div class="attach-info section-container">
		<div class="title">
			<span>附属信息</span>
			<div class="college-container" @click="triggerCollapse" style="color: var(--el-color-primary); font-weight: 600">
				{{ collapseText }}
				<!-- <el-icon class="el-icon--right" style="vertical-align: text-bottom"> -->

				<em :class="`iconfont icon-ic-arrow-down ${state.collapse ? 'isCollapse' : ''}`"> </em>
				<!-- </el-icon> -->
			</div>
		</div>
		<template v-if="state.collapse">
			<el-tabs v-model="state.attachActiveTab" type="card" class="attach-tabs" style="margin-top: 16px;margin-left:30px">
				<el-tab-pane v-for="item in state.config" :key="`attach_tab_${item.name}`" :label="item.label" :name="item.name">
					<pro-table row-key="id" :columns="item.columns" :request="item.request" :showHeader="false" customEmpty :searchConfig="state.searchConfig">
						<template #empty>
							<div>暂无数据</div>
						</template>

						<template v-slot:option="t">
							<span> <a @click.stop="onClick(item.name, { ...t })"> 详情</a></span>
						</template>
					</pro-table>
				</el-tab-pane>
			</el-tabs>
		</template>

		<!--详情弹框-->
		<attach-detail-vue ref="attachDetailRef"></attach-detail-vue>

		<!--详情-->
		<table-detail-vue ref="tableDetailRef"></table-detail-vue>
	</div>
</template>

<script setup name="attachSection">
import { getFamilyList, getJobRecordList, getEducationList, getDisabilityList, getProfessionalList, getBadnessList } from '/@/api/staff';
import ProTable from '/@/components/ProTable/ProTable.vue';
import attachDetailVue from '../../attach/component/attachDetail.vue';
import tableDetailVue from '/@/components/TableDetail/index.vue';
import { getDictByItemTypes, getDictValue as getValue } from '/@/utils/utils';
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';

const attachDetailRef = ref(null);
const tableDetailRef = ref(null);

const props = defineProps({
	empIdcard: {
		type: String,
		default: null,
	},
});

/**
 * 请求
 */
const request = async (params, api) => {
	if (props.empIdcard) {
		try {
			const res = await api(props.empIdcard);
			if (res && res.code == 200 && res.data) {
				const data = res.data || [];
				return {
					current: 1,
					total: data.length,
					data: data,
				};
			}
		} catch (e) {
			console.log('get exception:', e);
		}
	}

	return {
		current: 1,
		total: 0,
		data: [],
	};
};

const optionCol = {
	dataIndex: 'option',
	title: '操作',
	hideInSearch: true,
	key: 'option',
	width: 100,
	fixed: 'right',
	scopedSlots: {
		customRender: 'option',
	},
};

onMounted(async () => {
	await loadDicts();
});

/**
 * 加载字典值
 */
const loadDicts = async () => {
	try {
		const res = await getDictByItemTypes(state.dictKeys);
		if (res) {
			const result = Object.assign({}, res, state.DICTS);
			state.DICTS = result;
			loadEnmus(result);
		}
	} catch (e) {
		console.log('get exception:', e);
	}
};
const triggerCollapse = () => {
	state.collapse = !state.collapse;
};

const getDictValue = (type, value) => {
	return getValue(type, value, state.DICTS);
};

/**
 * 点击弹出详情
 */
const onClick = (type, target) => {
	const item = { ...target };
	switch (type) {
		case 'family':
			item.relationshipSelf = getDictValue('family_relation', item.relationshipSelf);
			item.birthday = item.birthday ? item.birthday.substring(0, 10) : '';
			if (attachDetailRef.value) attachDetailRef.value.openDialog(item, state.familyDetailConfig, '家庭信息详情');
			break;
		case 'education':
			item.startDate = item.startDate ? item.startDate.substring(0, 10) : '';
			item.endDate = item.endDate ? item.endDate.substring(0, 10) : '';
			item.educationName = getDictValue('education', item.educationName);
			item.type = getDictValue('education_type', item.type);
			item.highIdentification = getDictValue('flagDict', item.highIdentification);
			item.educationSystem = getDictValue('education_system', item.educationSystem);
			if (attachDetailRef.value) attachDetailRef.value.openDialog(item, state.educationDetailConf, '学历信息详情', true);
			break;
		case 'job':
			item.workingType = getDictValue('workinfo_type', item.workingType);
			item.workingStatus = item.workingStatus == 1 ? '离职' : '在职';
			item.startDate = item.startDate ? item.startDate.substring(0, 10) : '';
			item.endDate = item.endDate ? item.endDate.substring(0, 10) : '';
			if (attachDetailRef.value) attachDetailRef.value.openDialog(item, state.jobDetailConf, '工作记录详情');
			break;
		case 'disability':
			item.startTime = item.startTime ? item.startTime.substring(0, 10) : '';
			item.endTime = item.endTime ? item.endTime.substring(0, 10) : '';
			item.disabilityLevel = getDictValue('disability_grade', item.disabilityLevel);
			item.injuryIdentification = getDictValue('flagDict', item.injuryIdentification);
			if (attachDetailRef.value) attachDetailRef.value.openDialog(item, state.disabilityDetailConf, '伤残信息详情', true);
			break;
		case 'professional':
			item.obtainType = getDictValue('obtain_type', item.obtainType);
			item.qualificationType = getDictValue('qualification_type', item.qualificationType);
			item.qualificationLevel = getDictValue('qualification_level', item.qualificationLevel);
			item.heightIdentification = getDictValue('flagDict', item.heightIdentification);
			if (attachDetailRef.value) attachDetailRef.value.openDialog(item, state.professionalDetailConf, '职业资格详情', true);
			break;
		case 'bad':
			if (tableDetailRef.value) tableDetailRef.value.openDialog(item, state.badDetailConf, '不良记录详情', true);
			break;
	}
};

const loadEnmus = (res) => {
	if (res) {
		// 家庭信息
		state.config.forEach((item) => {
			const name = item.name;
			switch (name) {
				case 'family':
					item.columns = item.columns.map((col) => {
						const target = { ...col };
						if (col.dataIndex === 'relationshipSelf') {
							target.valueEnum = res['family_relation'];
						}
						return target;
					});
					break;
				case 'job':
					item.columns = item.columns.map((col) => {
						const target = { ...col };
						if (col.dataIndex === 'workingType') {
							target.valueEnum = res['workinfo_type'];
						}
						return target;
					});
					break;
				case 'education':
					item.columns = item.columns.map((col) => {
						const target = { ...col };
						if (col.dataIndex === 'educationName') {
							target.valueEnum = res['education'];
						} else if (col.dataIndex === 'type') {
							target.valueEnum = res['education_type'];
						} else if (col.dataIndex === 'educationSystem') {
							target.valueEnum = res['education_system'];
						}
						return target;
					});
					break;
				case 'disability':
					item.columns = item.columns.map((col) => {
						const target = { ...col };
						if (col.dataIndex === 'disabilityLevel') {
							target.valueEnum = res['disability_grade'];
						}
						return target;
					});
					break;
				case 'professional':
					item.columns = item.columns.map((col) => {
						const target = { ...col };
						if (col.dataIndex === 'obtainType') {
							target.valueEnum = res['obtain_type'];
						} else if (col.dataIndex === 'qualificationType') {
							target.valueEnum = res['qualification_type'];
						} else if (col.dataIndex === 'qualificationLevel') {
							target.valueEnum = res['qualification_level'];
						}
						return target;
					});
					break;
				case 'bad':
					break;
			}
		});
	}
};

const collapseText = computed(() => {
	return state.collapse ? '收起' : '展开';
});

const state = reactive({
	collapse: false, //是否展开

	flagDict: {
		0: '是',
		1: '否',
	},
	config: [
		{
			name: 'family',
			label: '家庭信息',
			columns: [
				{
					dataIndex: 'familyName',
					title: '成员姓名',
					ellipsis: true,
					minWidth: 100,
				},
				{
					dataIndex: 'relationshipSelf',
					title: '与本人关系',
					minWidth: 100,
				},
				{ dataIndex: 'birthday', title: '出生日期', dateFormat: 'YYYY-MM-DD', minWidth: 120 },
				{ dataIndex: 'workUnit', title: '工作单位', minWidth: 180, ellipsis: true },
				{ dataIndex: 'contractTel', title: '手机号码', minWidth: 140 },
				optionCol,
			],
			request: (params) => request(params, getFamilyList),
		},
		{
			name: 'job',
			label: '工作记录',
			columns: [
				{ dataIndex: 'workUnit', title: '工作单位', ellipsis: true, minWidth: 140 },
				{ dataIndex: 'workDepart', title: '工作部门', ellipsis: true, minWidth: 140 },
				{ dataIndex: 'workJob', title: '工作岗位', ellipsis: true, minWidth: 160 },
				{ dataIndex: 'workingType', title: '工作类型', ellipsis: true, minWidth: 120 },
				{
					dataIndex: 'workingStatus',
					title: '在职状态',
					ellipsis: true,
					minWidth: 120,
					valueEnum: {
						0: '在职',
						1: '离职',
					},
				},
				optionCol,
			],
			request: (params) => request(params, getJobRecordList),
		},
		{
			name: 'education',
			label: '学历信息',
			columns: [
				{ dataIndex: 'school', title: '学校', ellipsis: true, minWidth: 120 },
				{ dataIndex: 'collageSystem', title: '院系名称', ellipsis: true, minWidth: 140 },
				{ dataIndex: 'major', title: '专业', ellipsis: true, minWidth: 120 },
				{ dataIndex: 'educationName', title: '学历', ellipsis: true, minWidth: 120 },
				{ dataIndex: 'type', title: '学历类型', ellipsis: true, minWidth: 80 },
				{
					dataIndex: 'highIdentification',
					title: '最高学历',
					ellipsis: true,
					minWidth: 80,
					valueEnum: {
						0: '是',
						1: '否',
					},
				},
				{ dataIndex: 'educationSystem', title: '学制类型', ellipsis: true, minWidth: 100 },
				optionCol,
			],
			request: (params) => request(params, getEducationList),
		},
		{
			name: 'disability',
			label: '伤残信息',
			columns: [
				{ dataIndex: 'disabilityName', title: '伤残病名称', ellipsis: true, minWidth: 120 },
				{ dataIndex: 'occupationalDisease', title: '职业病名称', ellipsis: true, minWidth: 120 },
				{ dataIndex: 'disabilityLevel', title: '伤残等级', ellipsis: true, minWidth: 120 },
				{ dataIndex: 'startTime', title: '伤残开始时间', dateFormat: 'YYYY-MM-DD', minWidth: 120 },
				{ dataIndex: 'endTime', title: '伤残结束时间', dateFormat: 'YYYY-MM-DD', minWidth: 120 },
				{
					dataIndex: 'injuryIdentification',
					title: '是否工伤',
					valueEnum: {
						0: '是',
						1: '否',
					},
					minWidth: 80,
				},
				optionCol,
			],
			request: (params) => request(params, getDisabilityList),
		},
		{
			name: 'professional',
			label: '职业资格',
			columns: [
				{ dataIndex: 'certificationNo', title: '证书编号', ellipsis: true, minWidth: 120 },
				{ dataIndex: 'declareYear', title: '申报年度', minWidth: 100 },
				{ dataIndex: 'assessmentUnit', title: '评定机构', ellipsis: true, minWidth: 120 },
				{ dataIndex: 'obtainType', title: '获取方式', minWidth: 100 },
				{ dataIndex: 'qualificationType', title: '资格类型', minWidth: 120 },
				{ dataIndex: 'qualificationLevel', title: '资格等级', minWidth: 120 },
				{
					dataIndex: 'heightIdentification',
					title: '最高资格',
					minWidth: 100,
					valueEnum: {
						0: '是',
						1: '否',
					},
				},
				optionCol,
			],
			request: (params) => request(params, getProfessionalList),
		},

		{
			name: 'bad',
			label: '不良记录',
			columns: [
				{ dataIndex: 'project', title: '产生项目', hideInSearch: true, minWidth: 200, tooltip: true },
				{ dataIndex: 'happenTime', title: '发生时间', hideInSearch: true, minWidth: 120, dateFormat: 'YYYY-MM-DD', ellipsis: true },
				{ dataIndex: 'loseFee', title: '费用损失', hideInSearch: true, minWidth: 140 },
				{ dataIndex: 'loseFeeOther', title: '其他损失', hideInSearch: true, minWidth: 140 },
				{ dataIndex: 'createName', title: '创建人', minWidth: 160 },
				{ dataIndex: 'createTime', title: '创建时间', minWidth: 180, searchIndex: 'createTimes', valueType: 'dateTimeRange' },
				optionCol,
			],
			request: (params) => request(params, getBadnessList),
		},
	],
	searchConfig: {
		pagination: false,
	},
	DICTS: {
		flagDict: {
			0: '是',
			1: '否',
		},
	},
	dictKeys: [
		'family_relation',
		'education',
		'education_type',
		'education_system',
		'disability_grade',
		'workinfo_type',
		'obtain_type',
		'qualification_type',
		'qualification_level',
	],
	attachActiveTab: 'family', // 附属信息选中当前tab
	familyDetailConfig: [
		{ label: '员工姓名', key: 'empName',},
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '成员姓名', key: 'familyName' },
		{ label: '与本人关系', key: 'relationshipSelf' },
		{ label: '出生日期', key: 'birthday' },
		{ label: '工作单位', key: 'workUnit',tooltip:true},
		{ label: '手机号码', key: 'contractTel' },
		{ label: '创建时间', key: 'createTime' },
	],
	educationDetailConf: [
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '学校', key: 'school',tooltip:true},
		{ label: '院系名称', key: 'collageSystem' ,tooltip:true},
		{ label: '专业', key: 'major',tooltip:true },
		{ label: '学历', key: 'educationName' },
		{ label: '学历类型', key: 'type' },
		{ label: '最高学历', key: 'highIdentification' },
		{ label: '入学时间', key: 'entryDate' },
		{ label: '毕业时间', key: 'gradutionDate' },
		{ label: '学制类型', key: 'educationSystem' },
		{ label: '证书名称', key: 'certificationName',tooltip:true },
		{ label: '备注', key: 'remark', tooltip: 'true', size: 24 },
		{ label: '附件内容', key: '', file: 'true', size: 24 },
	],
	disabilityDetailConf: [
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '伤残病名称', key: 'disabilityName',tooltip:true},
		{ label: '职业病名称', key: 'occupationalDisease' ,tooltip:true},
		{ label: '伤残等级', key: 'disabilityLevel' },
		{ label: '是否工伤', key: 'injuryIdentification' },
		{ label: '伤残开始日期', key: 'startTime' },
		{ label: '伤残结束日期', key: 'endTime' },
		{ label: '备注', key: 'remark', tooltip: 'true', size: 24 },
		{ label: '附件内容', key: '', file: 'true', size: 24 },
	],
	jobDetailConf: [
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '工作单位', key: 'workUnit', tooltip: true },
		{ label: '工作部门', key: 'workDepart', tooltip: true },
		{ label: '工作岗位', key: 'workJob', tooltip: true },
		{ label: '工作类型', key: 'workingType' },
		{ label: '在职状态', key: 'workingStatus' },
		{ label: '开始工作日期', key: 'startDate' },
		{ label: '结束工作日期', key: 'endDate' },
		{ label: '创建人', key: 'createName' },
		{ label: '创建时间', key: 'createTime' },
	],

	professionalDetailConf: [
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '证书编号', key: 'certificationNo',tooltip:true },
		{ label: '申报年度', key: 'declareYear' },
		{ label: '评定机构', key: 'assessmentUnit',tooltip:true},
		{ label: '获取方式', key: 'obtainType' },
		{ label: '资格类型', key: 'qualificationType' },
		{ label: '是否最高资格', key: 'heightIdentification' },
		{ label: '资格等级', key: 'qualificationLevel', size: 24 },
		{ label: '备注', key: 'remark', tooltip: 'true', size: 24 },
		{ label: '附件内容', key: '', file: 'true', size: 24 },
	],

	badDetailConf: [
		{ label: '员工姓名', key: 'empName' },
		{ label: '身份证号', key: 'empIdcard' },
		{ label: '产生项目', key: 'project', tooltip: true },
		{ label: '项目编码', key: 'projectCode' },
		{ label: '发生时间', key: 'happenTime', date: 'YYYY-MM-DD' },
		{ label: '费用损失', key: 'loseFee' },
		{ label: '其他损失', key: 'loseFeeOther' },
		{ label: '创建人', key: 'createName' },
		{ label: '创建时间', key: 'createTime' },
		{ label: '不良记录描述', key: 'remark', size: 24, tooltip: true },
		{ label: '附件内容', key: '', file: 'true', size: 24 },
	],
});
</script>

<style lang="scss" scoped src="./css/attachSection.scss">

</style>
