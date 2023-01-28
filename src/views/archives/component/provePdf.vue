<template>
	<div class="system-add-user-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="600px" 	@close="onCancel">
      <div id="pdfDom">
      <!-- 在职证明 -->
        <div class="prove" v-if="state.ruleForm.type==0" >
          <div class="prove_body">
            <h2 class="prove_title">在职证明</h2>
            <div class="prove_content">
              <p>兹有<span>{{state.ruleForm.empName}}</span>,身份证号码 <span>{{state.ruleForm.empIdcard}}</span> 系我单位员工,
                现任职部门:<span>{{state.ruleForm.projectName}}</span>,现任 <span>{{state.ruleForm.post}}</span>一职,
                劳动合同期自<span>{{getYear('firstContractTime')}}</span>年<span>{{getMonth('firstContractTime')}}</span>月<span>{{getDate('firstContractTime')}}</span>日至<span>{{getYear('contractEnd')}}</span>年
                <span>{{getMonth('contractEnd')}}</span>月<span>{{getDate('contractEnd')}}</span>日。
              </p>
              <p>特此证明。</p>
            </div>
          </div>
          <div class="prove_footer">
            <p>{{state.ruleForm.seal}}</p>
            <p>{{getYear('openTime')}}年{{getMonth('openTime')}}月{{getDate('openTime')}}日</p>
          </div>
        </div>
        <!-- 离职证明 -->
        <div class="prove" v-if="state.ruleForm.type==1" >
          <div class="prove_body" >
            <h2 class="prove_title">离职证明</h2>
            <div class="prove_content">
              <p>兹有<span>{{state.ruleForm.empName}}</span>,身份证号码 <span>{{state.ruleForm.empIdcard}}</span> ,
                于<span>{{getYear('firstContractTime')}}</span>年 <span>{{getMonth('firstContractTime')}}</span>月
                <span>{{getDate('firstContractTime')}}</span>日入职,所属单位:<span>{{state.ruleForm.projectName}}</span>,
                岗位：<span>{{state.ruleForm.post}}</span>,员工于<span>{{getYear('leaveTime')}}</span>年
                <span>{{getMonth('leaveTime')}}</span>月<span>{{getDate('leaveTime')}}</span>日 
                因<span>{{state.ruleForm.leaveReason}}</span>已办理离职。
              </p>
              <p>特此证明。</p>
            </div>
          </div>
          <div class="prove_footer">
            <p>{{state.ruleForm.seal}}</p>
            <p>{{getYear('openTime')}}年{{getMonth('openTime')}}月{{getDate('openTime')}}日</p>
          </div>
        </div>
        <!-- 劳动终止 -->
        <div class="prove contract prove_relieve" v-if="state.ruleForm.type==2">
          <div class="contract_body">
            <div class="prove_body">
              <h2 class="prove_title" style="margin-bottom:10px">劳动合同终止（解除）证明书</h2>
              <div class="prove_content">
                <p>兹有<span>{{state.ruleForm.empName}}</span>同志,(身份证号:<span>{{state.ruleForm.empIdcard}}</span>),
                  于<span>{{getYear('entryTime')}}</span>年 <span>{{getMonth('entryTime')}}</span>月
                  <span>{{getDate('entryTime')}}</span>日来我单位工作,
                  并于<span>{{getYear('firstContractTime')}}</span>年<span>{{getMonth('firstContractTime')}}</span>月
                  <span>{{getDate('firstContractTime')}}</span>日签订劳动合同,
                  现因<span>{{state.ruleForm.leaveReason}}</span>终止（解除）劳动合同,现介绍去你处登记，请予办理。
                </p>
                <p>特此证明。</p>
              </div>
            </div>
            <div class="prove_footer" style="margin-bottom:0;margin-top:0">
              <p>{{state.ruleForm.seal}}</p>
              <p>{{getYear('openTime')}}年{{getMonth('openTime')}}月{{getDate('openTime')}}日</p>
            </div>
            
            <table aria-describedby="labor_contract_pdf">
              <tr>
                <td rowspan="2">姓名</td>
                <td rowspan="2">性别</td>
                <td rowspan="2">年龄</td>
                <td rowspan="2">工种</td>
                <td rowspan="2">技术等级</td>
                <td rowspan="2">月标准工资</td>
                <td rowspan="2">本单位工作时间</td>
                <td colspan="2">补偿金金额其中:</td>
                <td rowspan="2" class="no_td">备注</td>
              </tr>
              <tr>
                <td>经济补偿金</td>
                <td>医疗补助金</td>
                
              </tr>
              <tr>
                <td>{{state.ruleForm.empName}}</td>
                <td>{{state.ruleForm.sex==1?'男':'女'}}</td>
                <td>/</td>
                <td>/</td>
                <td>/</td>
                <td>/</td>
                <td>/</td>
                <td>/</td>
                <td>/</td>
                <td class="no_td">/</td>
              </tr>
            </table>
            
          </div>
          <div class="contract_foot">
            <p>注:①此证明书报市人力资源和社会保障局仲裁处、养老保险机构各一份，送本人及本人档案留存各一份。</p>
            <p>②职工个人应当持本证明书,自解除劳动合同之日起60日内,到失业保险经办机构办理失业登记和失业保险金申领手续。无法定理由,未在
            60日内办理失业登记和失业保险金申领手续,视为放弃领取本失业期的失业保险金。</p>
          </div>
        </div>
        <!-- 调档函 -->
        <div class="prove" v-if="state.ruleForm.type==3">
          <div class="prove_body">
            <h2 class="prove_title">介绍信</h2>
            <p class="prove_intro" v-if="state.ruleForm.introductionUnit">
              <span>{{state.ruleForm.introductionUnit}}</span>:
            </p>
            <p class="prove_intro_else" v-else>
              <span></span>:
            </p>
            <div class="prove_content">
              <p>兹有<span>{{state.ruleForm.empName}}</span>同志(身份证号码 <span>{{state.ruleForm.empIdcard}}</span> ),
                因其需要办理退休,故请贵单位将其个人档案调出给本人,请予以办理为感！
              </p>
            </div>
          </div>
          <div class="prove_footer">
            <p>{{state.ruleForm.seal}}</p>
            <p>{{getYear('openTime')}}年{{getMonth('openTime')}}月{{getDate('openTime')}}日</p>
          </div>
        </div>
        <!-- 代缴 证明-->
        <div class="prove" v-if="state.ruleForm.type==4">
          <div class="prove_body">
            <h2 class="prove_title">代缴证明</h2>
            <div class="prove_content">
              <p>兹有<span>{{state.ruleForm.empName}}</span>,身份证号码 <span>{{state.ruleForm.empIdcard}}</span> ,
                其<span>{{getYear('socialTime')}}</span>年<span>{{getMonth('socialTime')}}</span>月至今社保由<span>{{state.ruleForm.projectName}}</span>委托我司代其购买;
              </p>
              <p>特此证明。</p>
            </div>
          </div>
          <div class="prove_footer">
            <p>{{state.ruleForm.seal}}</p>
            <p>{{getYear('openTime')}}年{{getMonth('openTime')}}月{{getDate('openTime')}}日</p>
          </div>
        </div>
      </div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">关 闭</el-button>
					<el-button  @click="onDownload" size="default">下 载</el-button>
          <el-button type="primary"  size="default" v-print="'#pdfDom'">打 印</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import {savePdf} from '@/utils/savePdf';
import moment from 'moment';

const state = reactive({
	isShowDialog: false,
	title:'预览',
  ruleForm:{
		empName:'',
		empIdcard:'',
		empId:'',
		empCode:'',
		projectName:'',
		post:'',
		contractStart:'',
		contractEnd:'',
		seal:'安徽皖信人力资源管理有限公司（章）',
		openTime:moment().format('YYYY-MM-DD'),
		leaveTime:'',
		leaveReason:'',
		entryTime:'',
		firstContractTime:'',
		sex:'',
		introductionUnit:'',
		socialTime:'',
		type:''
	}
});

// 打开弹窗
const openDialog = (data) => {
  // console.log(data);
  state.ruleForm = data
  state.ruleForm.seal = state.ruleForm.seal?state.ruleForm.seal:'安徽皖信人力资源管理有限公司（章）'
  state.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
};

// 取消
const onCancel = () => {
	closeDialog();
};


// 下载
const onDownload = () => {
  const type = state.ruleForm.type;
  switch (Number(type)) {
    case 0:
      savePdf(document.getElementById('pdfDom'),'在职证明');
      break;
    case 1:
      savePdf(document.getElementById('pdfDom'),'离职证明');
    break;
    case 2:
      savePdf(document.getElementById('pdfDom'),'劳动合同终止（解除）证明书');
      break;
    case 3:
      savePdf(document.getElementById('pdfDom'),'调档函');
      break;
    case 4:
      savePdf(document.getElementById('pdfDom'),'代缴证明');
      break;
    default:
      break;
  }
  
};

const getYear = (t)=>{
  return  moment(state.ruleForm[t]).year()
}
const getMonth = (t)=>{
  return  moment(state.ruleForm[t]).month()+1
}
const getDate = (t)=>{
  return  moment(state.ruleForm[t]).date()
}


// 暴露变量
defineExpose({
	openDialog,
});

</script>
<style lang="scss" scoped src="./css/provePdf.scss"></style>
