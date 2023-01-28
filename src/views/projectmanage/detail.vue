<template>
	<div class="staff-info-page">
		<div class="content">
			<div class="basic-info section-container">
				<div class="title">
					<span>基本信息</span>
				</div>
				<el-row>
					<el-col v-for="item in state.detailInfoParams" :key="`basicInfo_${item}`" class="basic-info-item"
						:span="getColNumber(item)">
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
				</el-row>
			</div>
			<div class="basic-info section-container">
				<div class="title">
					<span>封面抬头信息</span>
				</div>
				<el-row>
					<el-col v-for="item in state.detailInfoParams2" :key="`basicInfo_${item}`" class="basic-info-item"
						:span="getColNumber(item)">
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
				</el-row>
			</div>
			<div class="basic-info section-container">
				<div class="title">
					<span>收入生成规则</span>
				</div>
				<el-row>
					<el-col v-for="item in state.detailInfoParams3" :key="`basicInfo_${item}`" class="basic-info-item"
						:span="getColNumber(item)">
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
				</el-row>
			</div>
			<div class="basic-info section-container">
				<div class="title">
					<span>管理费</span>
				</div>
				<el-row>
					<el-col v-for="item in state.detailInfoParams4" :key="`basicInfo_${item}`" class="basic-info-item"
						:span="getColNumber(item)">
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
				</el-row>
			</div>
			<div class="basic-info section-container">
				<div class="title">
					<span>风险金</span>
				</div>
				<el-row>
					<el-col v-for="item in state.detailInfoParams5" :key="`basicInfo_${item}`" class="basic-info-item"
						:span="getColNumber(item)">
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
				</el-row>
			</div>
		</div>
		<div class="operation-container">
			<el-button @click="goBack" style="height: 100%">返 回</el-button>
		</div>
	</div>
</template>

<script setup name="editStaffPage">
import { useRoute, useRouter } from 'vue-router';
import { getProjectManageDetail } from '/@/api/projectmanage/index';
import { PROJECTMANAGE_INFO } from '/@/utils/header';
import { ElMessage, ElLoading } from 'element-plus';
const router = useRouter();
const route = useRoute();
const state = reactive({
	projectDetailInfo: {}, // 员工信息
	name: null, // 当前路由name
	detailInfoParams: [
		'departName',
		'departNo',
		'customerName',
		'customerNo',
		'serviceTeam',
		'bpoFlag',
		'stopFlag',
	],
	detailInfoParams2: [
		'invoiceTitleInsurance',
		'invoiceTitleSalary',
	],
	detailInfoParams3: [
		'incomFrom',
		'mrSettleType',
	],
	detailInfoParams4: [
		'manageServerItem',
		'incomeStandManage',
		'managementType',
		'managementFee',
	],
	detailInfoParams5: [
		'riskServerItem',
		'incomeRiskManage',
		'riskFundType',
		'riskFundFee',
	],
});

const getColNumber = (item) => {
	return 6;
};
const getStaffTitle = (item) => {
	return PROJECTMANAGE_INFO[item];
};
const getStaffValue = (item) => {
	let val = state.projectDetailInfo[item];
	switch (item) {
		case 'stopFlag':
			val = state.projectDetailInfo.stopFlag == 0 ? '是' : '否'
			break;
		case 'incomFrom':
			if (state.projectDetailInfo.managementTag == 0 && state.projectDetailInfo.riskFundTag == 0) {
				val = '管理费、风险金'
			} else if (state.projectDetailInfo.managementTag == 0) {
				val = '管理费'
			} else if (state.projectDetailInfo.riskFundTag == 0) {
				val = '风险金'
			}
			break;
		case 'mrSettleType':
			val = state.projectDetailInfo.mrSettleType == 1 ? '预估':state.projectDetailInfo.mrSettleType == 2?'实缴':'--'
			break;
		case 'managementType':
			val = state.projectDetailInfo.managementType == 1 ? '按比例' : '固定金额'
			break;
		case 'riskFundType':
			val = state.projectDetailInfo.riskFundType == 1 ? '按比例' : '固定金额'
			break;
		case 'incomeStandManage':
			const typevalue = state.projectDetailInfo.managementType
			val = typevalue == 1 ? '--' : typevalue == 2 ? '人数' : '人次'
			break;
		case 'incomeRiskManage':
			const riskTypeValue = state.projectDetailInfo.riskFundType
			val = riskTypeValue == 1 ? '--' : riskTypeValue == 2 ? '人数' : '人次'
			break;
		case 'manageServerItem':
			const manageServerItemStr = state.projectDetailInfo.manageServerItem
			val = manageServerItemStr ? commServeItem(manageServerItemStr) : '--'
			break;
		case 'riskServerItem':
			const riskServerItemStr = state.projectDetailInfo.riskServerItem
			val = riskServerItemStr ? commServeItem(riskServerItemStr) : '--'
			break;
		default:
			if (val === null || val === undefined || val == '') {
				return '--';
			}
			break;
	}

	return val;
};
const commServeItem = (serStr) => {
	const mapDIc = new Map()
	mapDIc.set('1', '社保').set('2', '公积金').set('3', '商险').set('4', '薪酬').set('5', '非扣税项').set('6', '单位代扣');
	const splitStr = serStr.split(",")
	if (splitStr[0].length > 1) return serStr 
		let strSer = ''
		splitStr.forEach((item) => {
			strSer += mapDIc.get(item) + '、'
		})
		return strSer.substring(0, strSer.length - 1)
};
const goBack = () => {
	const name = route.name;
	if (name === 'projectmanage-detail') {
		router.push('/projectmanage/index');
	}
};
onMounted(async () => {
	const name = route.name;
	state.name = name;
	if (name === 'projectmanage-detail') {
		if (route.params && route.params.id) {
			loadProjectDetailInfo(route.params.id);
		} else {
			ElMessage.error('不合法的路由地址');
			goBack();
		}
	}
});

let loadingIcon = null
// 加载项目详情
const loadProjectDetailInfo = async (id) => {
	try {
		// loadingIcon = ElLoading.service({
		// 	lock: true,
		// 	text: '获取详情中...',
		// 	background: 'rgba(0, 0, 0, 0.7)',
		// });
		const res = await getProjectManageDetail(id);
		if (res && res.code === 200 && res.data) {
			const data = res.data;
			state.projectDetailInfo = data;
		} else {
			ElMessage.error(res.msg || '获取项目详情失败');
			goBack();
		}
	} catch (e) {
		console.log('get exception:', e);
		ElMessage.error('获取项目详情失败');
		goBack();
	}
};
</script>
<style lang="scss" scoped src="./css/detail.scss"></style>
