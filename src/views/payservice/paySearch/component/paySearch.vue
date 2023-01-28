<template>
	<div class="pay-search-list">
		<el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="1200px" @close="closeDialog">
      <pro-table 
        ref="payProtableRef" 
        row-key="id" 
        :columns="columns"
        :dataSource="dataSource"
        :searchConfig="searchConfig"
        @onReset="onReset"
      >
        <template v-slot:option="item">
          <pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
        </template>
      </pro-table>
      <el-pagination
        v-model:currentPage="state.pagination.currentPage"
        :page-size="10"
        background
        layout="total, prev, pager, next, jumper"
        :total="totalNum"
        @current-change="handleCurrentChange"
        hide-on-single-page
      />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" :loading="isShowLoading" @click="onExport" size="default">导 出</el-button>
				</span>
			</template>
		</el-dialog>

    <!-- 详情 -->
    <table-detail 
      ref="tableDetailRef" 
      labelWidth="130px"
    ></table-detail>
	</div>
</template>

<script setup name="paySearch">
import { getDictByItemTypes } from '/@/utils/utils';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import TableDetail from '/@/components/TableDetail/index.vue';
import { ElMessage } from 'element-plus';
import {getpaySearechList} from '/@/api/payservice/paysearch'; 
import { exportExcelSheet } from '/@/utils/excel';
import {PAY_SEARCH_EXPORT_HEADER} from '/@/utils/header';
import moment from 'moment';

const payProtableRef = ref(null);
const tableDetailRef = ref(null);


const onSearch = (data,params) => {
  const p = Object.assign({},params);
  delete p.current;
  delete p.size;
  delete p.mId;
  // 如果p是空对象，就不传
  if (Object.keys(p).length === 0) {
    ElMessage.warning('请至少填写一个查询条件');
    return false;
  }
  getpaySearechList(p).then((res) => {
    if(res && res.code == 200 && res.data){
      state.salaryAccountList = res.data.salaryAccountList;
      state.accountTitle = res.data.accountTitle;
    }else{
      ElMessage.warning(res.msg);
    }
  }).catch((err) => {
    console.log(err);
    ElMessage.error('查询失败');
  });
};

const onReset = () => {
  state.salaryAccountList = [];
  state.accountTitle = [];
};

const state = reactive({
	isShowDialog: false,
	id: null, // 编辑时存在
	title: '工资条查询',
  searchConfig:{
    labelWidth: '80px',
    onSearch: onSearch,
  },
  columns:[
    {
      title: '员工姓名',
      dataIndex: 'empName',
      width: 120,
    },
    {
      title: '发放状态',
      dataIndex: 'distributionFlag',
      width: 120,
      hideInSearch: true,
    },
    {
      title: '工资发放方式',
      width: 120,
      dataIndex: 'salaryStyle',
      hideInSearch: true,
      valueEnum: {
				0: '现金',
				1: '转账',
			},
    },
    {
     title: '身份证号',
      dataIndex: 'empIdcard',
      width: 180,
    },
    {
      title: '银行卡号',
      dataIndex: 'bankNo',
      width: 180,
      hideInSearch: true,
    },
    {
      title: '开户行',
      dataIndex: 'bankName',
      width: 200,
      hideInSearch: true,
    },
    {
      title: '工资发放时间',
      dataIndex: 'salaryGiveTime',
      width: 120,
      hideInSearch: true,
      valueEnum: {
				0: '立即发',
				1: '暂停发',
			},
    },
    {
      title: '社保扣缴月份',
      dataIndex:'deduSocialMonth',
      width: 120,
      hideInSearch: true,
    },
    {
      title: '公积金扣缴月份',
      dataIndex:'deduProvidentMonth',
      width: 120,
      hideInSearch: true,
    },
    
    {
      title: '社保优先级',
      dataIndex:'socialPriority',
      width: 120,
      hideInSearch: true,
      valueEnum: {
				0: '生成',
				1: '缴纳',
			},
    },
    {
      title: '公积金优先级',
      dataIndex:'fundPriority',
      width: 120,
      hideInSearch: true,
      valueEnum: {
				0: '生成',
				1: '缴纳',
			},
    },
    {
      title: '年终奖扣税方案',
      dataIndex:'annualBonusType',
      width: 120,
      hideInSearch: true,
      valueEnum: {
				0: '合并',
				1: '单独',
			},
    },
    {
      title: '是否扣除社保',
      dataIndex:'isDeductSocial',
      width: 120,
      hideInSearch: true,
      valueEnum: {
				0: '否',
				1: '是',
			},
    },
    {
      title: '是否扣除公积金',
      dataIndex:'isDeductFund',
      width: 120,
      hideInSearch: true,
      valueEnum: {
				0: '否',
				1: '是',
			},
    },
    {
      title: '工资月份',
      dataIndex: 'salaryMonth',
      width: 120,
      hideInSearch: true,
    },
    {
      title: '结算月份',
      dataIndex: 'settlementMonth',
      width: 120,
      valueType:'date',
      selectType:'month',
      format:'YYYYMM',
      valueFormat:'YYYYMM',
    },
    {
      title: '项目名称',
      dataIndex: 'deptName',
      width: 200,
    },
    {
      title: '项目编码',
      dataIndex: 'deptNo',
      width: 120,
      hideInTable: true,
    },
    {
      dataIndex: 'option',
      title: '操作',
      key: 'option',
      minWidth:120,
      hideInSearch: true,
      fixed: 'right',
      scopedSlots: {
        customRender: 'option',
      },
			},
  ],
  cellBtns: [
			{
				text: '详情',
				prop: 'detail', // 唯一标识
				permission: [], // 权限标识
			},
		],
  pagination:{
    currentPage: 1,
  },
  salaryAccountList: [],//工资条全部数据
  accountTitle: [],//工资条详情标题
  dictKeys: ['distribution_flag'],
  dictValues: [],
  header:[],
});

const {columns,searchConfig,cellBtns} = toRefs(state);

// 数据分页
const dataSource = computed(() => {
  const dataList = state.salaryAccountList;
	if (dataList.length > 0) {
		const start = (state.pagination.currentPage - 1) * 10;
		const end = state.pagination.currentPage * 10;
		const data = dataList.slice(start, end);
		return { records: data };
	}
});
// 分页
const totalNum = computed(() => {
	return state.salaryAccountList ? state.salaryAccountList.length : 0;
});
const handleCurrentChange = (val) => {
	state.pagination.currentPage = val;
};

// 字典获取
const loadDicts = async () => {
  try {
    const res = await getDictByItemTypes(state.dictKeys);
    if (res) {
      state.dictValues = res;
      // 列表赋值
      state.columns.map(item=>{
        if(item.dataIndex === 'distributionFlag'){
         item.valueEnum = res['distribution_flag'];
        }
      })
    }
  } catch (e) {
    console.log('get exception:', e);
  }
};

onMounted(() => {
	loadDicts();
});

const onCellClick = async (prop, item) => {
  if (prop === 'detail') {
    const dataObj = {}
    const dataList = []
    item.saiList.map((item,index)=>{
      dataObj[item.cnName] = item.textValue||item.salaryMoney
      dataList.push({
        label:item.cnName,
        key:item.cnName
      })
    })
    tableDetailRef.value&&tableDetailRef.value.openDialog(dataObj,dataList,'详情')
  }
};



// 打开弹窗
const openDialog = async (row) => {
  state.isShowDialog = true
};


// 关闭弹窗
const closeDialog = () => {
	state.isShowDialog = false;
  state.salaryAccountList = []
  state.accountTitle = []
  payProtableRef.value&&payProtableRef.value.doReset()

};
// 取消
const onCancel = () => {
	closeDialog();
};

const isShowLoading = ref(false)
const isFlag = {
  0: '否',
  1: '是',
}


// 导出
const onExport = () => {
  if(state.salaryAccountList.length>0){
    state.header = JSON.parse(JSON.stringify(PAY_SEARCH_EXPORT_HEADER))
    // 组装导出头
    for(let t in state.accountTitle){
      state.header.push({
        header: t,
        key: state.accountTitle[t],
        width:15,
      })
    }
    // 导出数据
    isShowLoading.value = true
    const exportData = JSON.parse(JSON.stringify(state.salaryAccountList));
    exportData.map(item=>{
      item.salaryStyle = item.salaryStyle==0?'现金':'转账'
      item.salaryGiveTime = item.salaryGiveTime==0?'立即发':'暂停发'
      item.socialPriority = item.socialPriority==0?'生成':'缴纳'
      item.fundPriority = item.fundPriority==0?'生成':'缴纳'
      item.annualBonusType = item.annualBonusType==0?'合并':'单独'
      item.isDeductSocial = isFlag[item.isDeductSocial]
      item.isDeductFund = isFlag[item.isDeductFund]
      item.fundPriority = item.fundPriority==0?'生成':'缴纳'
      item.distributionFlag = state.dictValues['distribution_flag'][item.distributionFlag]
      for(let t in state.accountTitle){
        item[state.accountTitle[t]] = ''
      }
      item.saiList.map((sai,index)=>{
        item[sai.javaFiedName] = sai.textValue||sai.salaryMoney
      })

    })

    exportExcelSheet(state.header,exportData,`工资条查询导出${moment().format('YYYYMMDD')}`)
    ElMessage.success('导出成功')
    state.header = []
    isShowLoading.value = false
  }else{
    ElMessage.warning('请先查询数据')
  }
};


// 暴露变量
defineExpose({
	openDialog,
});

</script>

<style lang="scss" scoped src="./css/paySearch.scss"></style>
