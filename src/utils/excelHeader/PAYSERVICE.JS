/*薪酬数据*/


export default {

  // 薪资导入申请表头

  // PAY_APPLY_HEADER:['员工姓名','工资应发','身份证号','工资实发'],

  // 劳务费导入表头
  LABOR_APPLY_HEADER: ['员工姓名', '工号', '劳务费', '身份证号', '是否新员工', '开户行总行', '是否个人承担部分税费',
    '开户行省', '工资发放时间（立即发、暂停发）','开户行市', '开户行支行', '银行卡号', '手机号码', '备注'
  ],

  // 稿酬导入表头
  BOOK_APPLY_HEADER: ['员工姓名', '身份证号', '稿酬', '工号', '是否新员工', '开户行总行', '开户行省', '开户行市', '开户行支行',
    '银行卡号', '手机号码', '备注'
  ],

  // 年终奖导入表头
  AWARD_APPLY_HEADER: {
    empName: '员工姓名',
    empIdcard: '身份证号',
    annualBonus: '待发年终奖',
    annualTSalary: '待发12月工资',
    isTSend: '12月工资是否已经发放',
    deductTaxSalary: '12月份应纳税所得额扣除费用',
  },

  // 薪酬人员查询-更新导入
  SALARY_PEOPLE_SEARCH_UPDATE_HEADER: ['员工姓名','身份证号',
  '开户行总行','开户行省','开户行市','开户行支行','银行卡号','手机号码','计税月份','在职状态'],

  // 薪酬人员查询-导入
  SALARY_PEOPLE_SEARCH_IMPORT_HEADER: {
    empName: '员工姓名',
    empIdcard: '身份证号',
    bankName: '开户行总行',
    bankProvince: '开户行省',
    bankCity: '开户行市',
    bankSubName: '开户行支行',
    bankNo: '银行卡号',
    empPhone: '手机号码',
    taxMonth: '计税月份',
  },

  // 员工报账-导出
  PEOPLE_BILL_EXPORT_HEADER: [
    { title: '员工姓名', dataIndex: 'empName', width: 100 },
    { title: '身份证号', dataIndex: 'empIdcard', width: 100 },
    { title: '手机号码', dataIndex: 'empPhone', width: 100 },
    { title: '银行卡号', dataIndex: 'bankNo', width: 100 },
    { title: '开户行总行', dataIndex: 'bankName', width: 100 },
    { title: '开户行省', dataIndex: 'bankProvince', width: 100 },
    { title: '开户行市', dataIndex: 'bankCity', width: 100 },
    { title: '开户行支行', dataIndex: 'bankSubName', width: 100 },
    { title: '表单类型', dataIndex: 'formType', width: 100 },
    { title: '薪酬月份', dataIndex: 'salaryMonth', width: 100 },
    { title: '应发薪酬', dataIndex: 'relaySalary', width: 100 },
    { title: '个税金额', dataIndex: 'salaryTax', width: 100 },
    { title: '项目名称', dataIndex: 'deptName', width: 100 },
    { title: '项目编码', dataIndex: 'deptNo', width: 100 },
    
  ],

  // 专项扣除导入头数据
  SPECIAL_DEDUCTION_HEADER: {
    name: '姓名',
    jobNumber: '工号',
    declareTitle: '申报单位',
    type: '证件类型',
    idNumber: '证件号码',
    createStart: '所得期间起',
    createEnd: '所得期间止',
    costReduction: '减除费用标准',
    currentIncome: '本期收入',
    currentIncomeTaxFree: '本期免税收入',
    otherMoney: '其他',
    donationAmount: '准予扣除的捐赠额',
    enterpriseAnnuity: '企业(职业)年金',
    fund: '住房公积金',
    insuranceMedical: '基本医疗保险费',
    insurancePension: '基本养老保险费',
    insuranceUnemployment: '失业保险费',
    sumChildEduMoney: '累计子女教育',
    sumContinuingEducationMoney: '累计继续教育',
    sumHousingLoanMoney: '累计住房贷款利息',
    sumHousingRentMoney: '累计住房租金',
    sumSupportElderlyMoney: '累计赡养老人',
    sumBabyMoney: '累计3岁以下婴幼儿照护',
    sumPrivatePension: '累计个人养老金',
    takingRisks: '商业健康保险',
    taxDeferredInsurance: '税延养老保险',
    taxSavings: '减免税额',
    taxesWithheld: '已缴税额',
    preTaxDeduction: '税前扣除项目合计',
    remark: '备注'
  },
  // 申报对象导入删除模板
  APPLY_DELETE_IMPORT_HEADER: ['姓名', '身份证号', '申报月份', '本期是否申报', '不申报原因'],
  //个税申报-回盘数据导入模板
  RECORD_DATA_IMPORT_HEADER: [
    '封面抬头全称',
    '姓名',
    '证件类型',
    '证照号码',
    '税款所属期起',
    '税款所属期止',
    '所得项目',
    '本期收入',
    '本期费用',
    '本期免税收入',
    '本期基本养老保险费',
    '本期基本医疗保险费',
    '本期失业保险费',
    '本期住房公积金',
    '本期企业(职业)年金',
    '本期商业健康保险费',
    '本期税延养老保险费',
    '本期其他扣除(其他)',
    '累计收入额',
    '累计免税收入',
    '累计减除费用',
    '累计专项扣除',
    '累计子女教育支出扣除',
    '累计继续教育支出扣除',
    '累计住房贷款利息支出扣除',
    '累计住房租金支出扣除',
    '累计赡养老人支出扣除',
    '累计3岁以下婴幼儿照护',
    '累计个人养老金',
    '累计其他扣除',
    '累计准予扣除的捐赠',
    '累计应纳税所得额',
    '税率',
    '速算扣除数',
    '累计应纳税额',
    '累计减免税额',
    '累计应扣缴税额',
    '累计已预缴税额',
    '累计应补(退)税额',
    '备注',
  ],
  // 专项扣除详情
  SPECIAL_DEDUCTION_DETAIL: {
    name: '姓名',
    createTime: '创建时间',
    createStart: '所得期间起',
    createEnd: '所得期间止',

    costReduction: '减除费用',
    createMonth: '导入月份',
    currentIncome: '本期收入',
    currentIncomeTaxFree: '本期免税收入',

    otherMoney: '其他金额',
    donationAmount: '准予扣除的捐赠额',
    enterpriseAnnuity: '企业（职业）年金',
    fund: '住房公积金',

    idNumber: '证照号码',
    insuranceMedical: '基本医疗保险费',
    insurancePension: '基本养老保险费',
    insuranceUnemployment: '失业保险费',

    sumChildEduMoney: '累计子女教育',
    sumContinuingEducationMoney: '累计继续教育',
    sumHousingLoanMoney: '累计住房贷款利息',
    sumHousingRentMoney: '累计住房租金',

    sumSupportElderlyMoney: '累计赡养老人',
    sumBabyMoney: '累计3岁以下婴幼儿照护',
    sumPrivatePension: '累计个人养老金',
    takingRisks: '商业健康保险',
    taxDeferredInsurance: '税延养老保险',

    taxSavings: '减免税额',
    taxesWithheld: '已扣缴税额',
    preTaxDeduction: '税前扣除项目合计',
    declareTitle: '申报单位',


  },

  // 薪资导出
  SALARY_EXPORT_HEADER: [
    {header:'薪酬状态',key:'status',width:15}, 
    // status 状态（0待提交1待审核2:待推送3已推送待发放4已发放5审核不通过6确认不通过7财务退回8：结算单调整待审核 9: 结算单调整待打印 10 推送失败）
    {header:'项目名称',key:'deptName',width:25},
    {header:'项目编码',key:'deptNo',width:15},
    {header:'发放月份',key:'sendMonth',width:15}, //根据项目薪查询里面的字段
    {header:'薪酬月份',key:'salaryMonth',width:15},
    {header:'员工姓名',key:'empName',width:15},
    {header:'工资发放方式',key:'salaryStyle',width:15}, //工资发放方式（0现金/1转账）
    {header:'身份证号',key:'empIdcard',width:25},
    {header:'手机号码',key:'empPhone',width:15},
    {header:'银行卡号',key:'bankNo',width:25},
    {header:'开户行总行',key:'bankName',width:25},
    {header:'开户行省',key:'bankProvince',width:15},
    {header:'开户行市',key:'bankCity',width:15},
    {header:'开户行支行',key:'bankSubName',width:25},
    {header:'工资发放时间',key:'salaryGiveTime',width:15}, //工资发放时间（0立即发、1暂停发）
    {header:'社保缴纳月份',key:'deduSocialMonth',width:15},
    {header:'公积金缴纳月份',key:'deduProvidentMonth',width:15},
    {header:'社保优先级',key:'socialPriority',width:15}, //0：生成；1：缴纳
    {header:'公积金优先级',key:'fundPriority',width:15}, //0：生成；1：缴纳
    {header:'年终奖扣税方案',key:'annualBonusType',width:15}, //年终奖扣税方案0：合并；1：单独
    {header:'是否扣除社保',key:'isDeductSocial',width:15}, //是否扣除社保 0:否,1:是
    {header:'是否扣除公积金',key:'isDeductFund',width:15}, //是否扣除公积金 0:否,1:是
    {header:'本月是否重复金额',key:'isRepeat',width:15}, //本月是否重复金额0：否；1：是重复导入的
    {header:'是否自有员工',key:'ownFlag',width:15}, //是否自有员工0：否；1：是自有员工
    {header:'是否薪资特殊值',key:'haveSpecialFlag',width:15}, //是否含有特殊金额0：否；1：是
    {header:'个人社保',key:'personSocial',width:15},
    {header:'个人实发合计',key:'actualSalary',width:15}, 
    {header:'减除费用',key:'costReduction',width:15},
    {header:'累计子女教育',key:'sumChildEduMoney',width:15},
    {header:'累计继续教育',key:'sumContinuingEducationMoney',width:15},
    {header:'累计住房贷款利息',key:'sumHousingLoanMoney',width:20},
    {header:'累计住房租金',key:'sumHousingRentMoney',width:15},
    {header:'累计赡养老人',key:'sumSupportElderlyMoney',width:15},
    {header:'累计3岁以下婴幼儿照护',key:'sumBabyMoney',width:20},
    {header:'累计个人养老金',key:'sumPrivatePension',width:15},
    {header:'应发工资',key:'relaySalary',width:15},
    {header:'单位社保',key:'unitSocial',width:15},
    {header:'个人公积金',key:'personFund',width:15},
    {header:'个税',key:'salaryTax',width:15}, 
    {header:'年终奖单独扣税税费',key:'annualBonusTax',width:20},
    {header:'单位公积金',key:'unitFund',width:15},
  ],
  // 劳务费导出
  LABOR_EXPORT_HEADER: [
    {header:'薪酬状态',key:'status',width:15}, 
    {header:'项目名称',key:'deptName',width:25},
    {header:'项目编码',key:'deptNo',width:15},
    {header:'发放月份',key:'sendMonth',width:15},
    {header:'薪酬月份',key:'salaryMonth',width:15},
    {header:'员工姓名',key:'empName',width:15},
    {header:'身份证号',key:'empIdcard',width:25},
    {header:'手机号码',key:'empPhone',width:15},
    {header:'银行卡号',key:'bankNo',width:25},
    {header:'开户行总行',key:'bankName',width:25},
    {header:'开户行省',key:'bankProvince',width:15},
    {header:'开户行市',key:'bankCity',width:15},
    {header:'开户行支行',key:'bankSubName',width:25},
    {header:'劳务费',key:'relaySalary',width:15}, 
    {header:'工资发放时间',key:'salaryGiveTime',width:15},
    {header:'是否个人承担部分税费',key:'isPersonTax',width:20},
    {header:'个税-个人承担',key:'salaryTax',width:15},
    {header:'个税-单位承担',key:'salaryTaxUnit',width:15},
    {header:'公司应发',key:'relaySalaryUnit',width:15},
    {header:'个人实收',key:'actualSalary',width:15},
    {header:'本月是否重复金额',key:'isRepeat',width:15},
    {header:'是否自有员工',key:'ownFlag',width:15},
    {header:'是否发薪员工',key:'haveSalaryFlag',width:15},//劳务费、稿酬是否含有发薪0：否；1：是"
  ],

  // 稿酬导出
  BOOK_EXPORT_HEADER: [
    {header:'薪酬状态',key:'status',width:15},
    {header:'项目名称',key:'deptName',width:25},
    {header:'项目编码',key:'deptNo',width:15},
    {header:'发放月份',key:'sendMonth',width:15},
    {header:'薪酬月份',key:'salaryMonth',width:15},
    {header:'员工姓名',key:'empName',width:15},
    {header:'身份证号',key:'empIdcard',width:25},
    {header:'手机号码',key:'empPhone',width:15},
    {header:'银行卡号',key:'bankNo',width:25},
    {header:'开户行总行',key:'bankName',width:25},
    {header:'开户行省',key:'bankProvince',width:15},
    {header:'开户行市',key:'bankCity',width:15},
    {header:'开户行支行',key:'bankSubName',width:25},
    {header:'稿酬',key:'relaySalary',width:15},
    {header:'个税',key:'salaryTax',width:15},
    {header:'个人实收',key:'actualSalary',width:15},
    {header:'本月是否重复金额',key:'isRepeat',width:15},
    {header:'是否自有员工',key:'ownFlag',width:15},
    {header:'是否发薪员工',key:'haveSalaryFlag',width:15},//劳务费、稿酬是否含有发薪0：否；1：是"
  ],
  
  //工资条查询导出
  PAY_SEARCH_EXPORT_HEADER: [
    {header:'工资月份',key:'salaryMonth',width:15},
    {header:'发放状态',key:'distributionFlag',width:15},
    {header:'结算月份',key:'settlementMonth',width:15},
    {header:'项目名称',key:'deptName',width:25},
    {header:'员工姓名',key:'empName',width:15},
    {header:'银行卡号',key:'bankNo',width:25},
    {header:'开户行',key:'bankName',width:30},
    {header:'身份证号',key:'empIdcard',width:25},
    {header:'工资发放方式',key:'salaryStyle',width:15},
    {header:'社保扣缴月份',key:'deduSocialMonth',width:15},
    {header:'公积金扣缴月份',key:'deduProvidentMonth',width:15},
    
    {header:'社保优先级',key:'socialPriority',width:15},
    {header:'公积金优先级',key:'fundPriority',width:15},
    {header:'年终奖扣税方案',key:'annualBonusType',width:15},
    {header:'是否扣除社保',key:'isDeductSocial',width:15},
    {header:'是否扣除公积金',key:'isDeductFund',width:15},
  ],

}