import FAMILY from './excelHeader/FAMILY.js';
import JOB from './excelHeader/JOB.js';
import DEGREE from './excelHeader/DEGREE.js';
import INVALIDISM from './excelHeader/INVALIDISM.js';
import PROFESSION from './excelHeader/PROFESSION.js';
import SUBJECT from './excelHeader/SUBJECT.js';
import ORDER from './excelHeader/ORDER.js';
import STAFF from './excelHeader/STAFF.js';
import CONTRACT from './excelHeader/CONTRACT.js';
import insurance from './excelHeader/insurance.js';
import OTHER from './excelHeader/OTHER.js';
import SOCIAIFUND from './excelHeader/SOCIAIFUND.js'; //社保公积金
import PREORDER from './excelHeader/PREORDER.js'; //社保公积预派单
import FEE from './excelHeader/FEE.js'; // 费用管理
import PAYSERVICE from './excelHeader/PAYSERVICE.js'; // 薪酬服务
import IDCARD from './excelHeader/IDCARD.js'; // 身份证检验表头
import PERMISSION from './excelHeader/PERMISSION.js'; // 身份证检验表头

// vite 该怎么用
// const insurance = new URL('./excelHeader/insurance.js', import.meta.url).href;
// const heads = require.context('./excelHeader', true, /\.js$/);
// module.exports = {};

const heads = Object.assign(
	{},
	FAMILY,
	JOB,
	DEGREE,
	INVALIDISM,
	PROFESSION,
	SUBJECT,
	ORDER,
	STAFF,
	CONTRACT,
	insurance,
	OTHER,
	SOCIAIFUND,
	PREORDER,
	FEE,
	PAYSERVICE,
	IDCARD,
	PERMISSION
);

// 代码生成
// const exportArr = [];
// Object.keys(heads).forEach((key) => {
// 	exportArr.push(`export const ${key} = heads.${key}`);
// });
// console.log(exportArr.join(';'));

// 必须这么写，有没有替代方案
export const FAMILY_HEADER = heads.FAMILY_HEADER;
export const FAMILY_HEADER_EXPORT = heads.FAMILY_HEADER_EXPORT;
export const JOB_HEADER = heads.JOB_HEADER;
export const JOB_HEADER_EXPORT = heads.JOB_HEADER_EXPORT;
export const DEGREE_HEADER = heads.DEGREE_HEADER;
export const DEGREE_HEADER_EXPORT = heads.DEGREE_HEADER_EXPORT;
export const DEGREE_HEADER_UPDATE = heads.DEGREE_HEADER_UPDATE;
export const INVALIDISM_HEADER = heads.INVALIDISM_HEADER;
export const INVALIDISM_HEADER_EXPORT = heads.INVALIDISM_HEADER_EXPORT;
export const PROFESSION_HEADER = heads.PROFESSION_HEADER;
export const PROFESSION_HEADER_EXPORT = heads.PROFESSION_HEADER_EXPORT;
export const SUBJECT_BATCH_COMMON_ERROR_HEADER = heads.SUBJECT_BATCH_COMMON_ERROR_HEADER;
export const SUBJECT_BATCH_DEL_ERROR_HEADER = heads.SUBJECT_BATCH_DEL_ERROR_HEADER;
export const SUBJECT_BATCH_REDUCE_ERROR_HEADER = heads.SUBJECT_BATCH_REDUCE_ERROR_HEADER;
export const SUBJECT_EXPORT_HEADER = heads.SUBJECT_EXPORT_HEADER;
export const SUBJECT_IMPORT_HEADER = heads.SUBJECT_IMPORT_HEADER;
export const SUBJECT_UPDATE_HEADER = heads.SUBJECT_UPDATE_HEADER;
export const SUBJECT_REDUCE_HEADER = heads.SUBJECT_REDUCE_HEADER;
export const SUBJECT_CHANGE_HEADER = heads.SUBJECT_CHANGE_HEADER;

export const ORDER_EXPORT_HEADER = heads.ORDER_EXPORT_HEADER;

export const STAFF_IMPORT_ERROR_HEADER = heads.STAFF_IMPORT_ERROR_HEADER;
export const STAFF_BATCH_DEL_ERROR_HEADER = heads.STAFF_BATCH_DEL_ERROR_HEADER;
export const STAFF_IMPORT_HEADER = heads.STAFF_IMPORT_HEADER;
export const STAFF_EXPORT_HEADER = heads.STAFF_EXPORT_HEADER;
export const STAFF_BATCH_UPDATE_HEADER = heads.STAFF_BATCH_UPDATE_HEADER;
export const STAFF_INFO_DIC = heads.STAFF_INFO_DIC;
export const SPECIAL_DEDUCTION_DETAIL = heads.SPECIAL_DEDUCTION_DETAIL;
export const STAFF_UPDATE_HEADER = heads.STAFF_UPDATE_HEADER;
export const STAFF_WITHDRAWN_EXPORT__HEADER = heads.STAFF_WITHDRAWN_EXPORT__HEADER;
export const STAFF_DOWNSHIFT_HEADER = heads.STAFF_DOWNSHIFT_HEADER;
export const CONTRACT_APPLY_HEADER = heads.CONTRACT_APPLY_HEADER;
export const CONTRACT_FILE_HEADER = heads.CONTRACT_FILE_HEADER;
export const ELE_CONTRACT_IMPORT_HEADER = heads.ELE_CONTRACT_IMPORT_HEADER;
export const CONTRACT_EXPORT_HEADER = heads.CONTRACT_EXPORT_HEADER;
export const CONTRACT_EXPORT_HEADER_HISTORY = heads.CONTRACT_EXPORT_HEADER_HISTORY;
export const CONTRACT_EXPORT_HEADER_RENEW = heads.CONTRACT_EXPORT_HEADER_RENEW;
export const CONTRACT_AUDIT_PARAMS = heads.CONTRACT_AUDIT_PARAMS;
export const BADNESS_HEADER = heads.BADNESS_HEADER;
export const ERROR_HEADER = heads.ERROR_HEADER;
export const IDCARD_HEADER = heads.IDCARD_HEADER; //身份证校验反馈
export const PROVE_HEADER_EXPORT = heads.PROVE_HEADER_EXPORT;
export const FILTER_LOG_PARAMS = heads.FILTER_LOG_PARAMS;
export const INSURE_ADD_HEADER = heads.INSURE_ADD_HEADER;
export const INSURE_BATCH_HEADER = heads.INSURE_BATCH_HEADER;
export const INSURE_REDUCE_HEADER = heads.INSURE_REDUCE_HEADER;
export const INSURE_REDUCE_HEADER_EXPORT = heads.INSURE_REDUCE_HEADER_EXPORT;
export const INSURED_HEADER_EXPORT = heads.INSURED_HEADER_EXPORT;
export const INSURE_CHANGE_HEADER = heads.INSURE_CHANGE_HEADER;
export const INSURE_HEADER_EXPORT = heads.INSURE_HEADER_EXPORT;
export const INSURE_POLICE_HEADER_EXPORT = heads.INSURE_POLICE_HEADER_EXPORT;
export const DEPT_CHANGE_HEADER = heads.DEPT_CHANGE_HEADER;
export const SETTLE_MONTH_CHANGE_HEADER = heads.SETTLE_MONTH_CHANGE_HEADER;
export const INSURE_REG_HEADER_EXPORT = heads.INSURE_REG_HEADER_EXPORT;
export const INSURE_INFORMATION_CHANGE_HEADER_EXPORT = heads.INSURE_INFORMATION_CHANGE_HEADER_EXPORT; // 变更参保信息 2022-12-8---zr
export const INSURE_INVOICE_HEADER_EXPORT = heads.INSURE_INVOICE_HEADER_EXPORT; // 商险登记发票号 2022-12-8---zr
export const HANDLE_INSURE_HEADER = heads.HANDLE_INSURE_HEADER; //导出办理表头(新增和批增)
export const HANDLE_REPLACE_INSURE_HEADER = heads.HANDLE_REPLACE_INSURE_HEADER; //导出办理表头(替换)
export const HANDLE_BACK_INSURANCE_HEADER = heads.HANDLE_BACK_INSURANCE_HEADER; //办理和退回
export const HANDLE_REFUND_INSURANCE_HEADER = heads.HANDLE_REFUND_INSURANCE_HEADER; // 减员办理错误情况导出头
export const INSURE_REFUND_BACK_HEADER = heads.INSURE_REFUND_BACK_HEADER; //更新减员退费
export const INSURE_EXPORT_REFUND_BACK_HEADER = heads.INSURE_EXPORT_REFUND_BACK_HEADER; // 更新减员退费表头
export const INSURE_MULITY_HEADER = heads.INSURE_MULITY_HEADER; // 办理成功
export const INSURE_REFUND_HEADER = heads.INSURE_REFUND_HEADER; // 登记退保费用
export const INSURE_REFUND_HEADER_EXPORT = heads.INSURE_REFUND_HEADER_EXPORT; // 登记退保费用 列表导出头

export const SOCIAIFUND_BASIC_INFO = heads.SOCIAIFUND_BASIC_INFO; //社保公积金基本信息
export const SOCIAIFUND_PROJECT_INFO = heads.SOCIAIFUND_PROJECT_INFO; //社保公积金项目信息
export const SOCIAIFUND_CONTRACT_INFO = heads.SOCIAIFUND_CONTRACT_INFO; //社保公积金合同信息
export const SOCIAIFUND_SOCIAL_INFO = heads.SOCIAIFUND_SOCIAL_INFO; //社保公积金社保信息
export const SOCIAIFUND_SOCIAL_TABLE = heads.SOCIAIFUND_SOCIAL_TABLE; //社保公积金社保表格
export const SOCIAIFUND_FUND_INFO = heads.SOCIAIFUND_FUND_INFO; //社保公积金公积金信息
export const SOCIAIFUND_FUND_TABLE = heads.SOCIAIFUND_FUND_TABLE; //社保公积金公积金表格
export const SOCIAIFUND_EXPORT_HEARED = heads.SOCIAIFUND_EXPORT_HEARED; //社保公积金查询导出表头
export const SOCIAIFUND_BATCH_BASE = heads.SOCIAIFUND_BATCH_BASE; //社保公积金批量调基
export const SOCIAIFUND_BASIC_TRANSLATE = heads.SOCIAIFUND_BASIC_TRANSLATE; //社保公积金调基字段翻译

export const PREORDER_HEADER = heads.PREORDER_HEADER; //预派单详情/编辑字段数据
export const PREORDER_HEADER_QUERY = heads.PREORDER_HEADER_QUERY; //预派单查询详情
export const PREORDER_HEADER_MINUS = heads.PREORDER_HEADER_MINUS; //预派单批量派减
export const PREORDER_HEADER_ADD = heads.PREORDER_HEADER_ADD; //预派单批量派增
export const PREORDER_HEADER_UPDATE = heads.PREORDER_HEADER_UPDATE; //预派单批量更新
export const PREORDER_HEADER_EXPORT = heads.PREORDER_HEADER_EXPORT; //预派单导出

export const ORDER_SEARCH_HEADER = heads.ORDER_SEARCH_HEADER; // 派单查询批量导出表头
export const SOCIAL_CONDUCT_ROSTER = heads.SOCIAL_CONDUCT_ROSTER; // 社保导出花名册

export const EXPORT_ESTIMATE_FEE_PARAMS = heads.EXPORT_ESTIMATE_FEE_PARAMS; // 预估费用批量导出
export const DATE_FORMAT_KEY = heads.DATE_FORMAT_KEY;

export const DISPATCH_BATCH_ADD_HEADER = heads.DISPATCH_BATCH_ADD_HEADER;
export const DISPATCH_BATH_REDUCE_HEADER = heads.DISPATCH_BATH_REDUCE_HEADER;

export const EXPORT_PAID_SOCIAL_HEADER = heads.EXPORT_PAID_SOCIAL_HEADER;
export const EXPORT_PAID_OTHER_HEADER = heads.EXPORT_PAID_OTHER_HEADER;
export const EXPORT_PAID_MEDIAL_HEADER = heads.EXPORT_PAID_MEDIAL_HEADER;
export const EXPORT_PAID_FUND_HEADER = heads.EXPORT_PAID_FUND_HEADER;

export const DISPATCH_REDUCE_SOCIALFUND_INFO = heads.DISPATCH_REDUCE_SOCIALFUND_INFO;
export const EXPORT_PAID_FEE_PARAMS = heads.EXPORT_PAID_FEE_PARAMS; // 实缴费用导出
export const EXPORT_PAID_FEE_PARAMS_MERGE = heads.EXPORT_PAID_FEE_PARAMS_MERGE; // 实缴费用合并导出
export const EXPORT_PAID_SOCIAL_FEEDBACK_HEADER = heads.EXPORT_PAID_SOCIAL_FEEDBACK_HEADER; // 实缴费用导出反馈

export const PAY_APPLY_HEADER = heads.PAY_APPLY_HEADER; //薪酬申请导入-薪资
export const LABOR_APPLY_HEADER = heads.LABOR_APPLY_HEADER; //薪酬申请导入-劳务费
export const BOOK_APPLY_HEADER = heads.BOOK_APPLY_HEADER; //薪酬申请导入-稿酬
export const AWARD_APPLY_HEADER = heads.AWARD_APPLY_HEADER; //年终奖测试计算
export const DEFAULT_CARD_HEADER = heads.DEFAULT_CARD_HEADER; //身份证表头检验
export const SALARSHOULD_CARD_HEADER = heads.SALARSHOULD_CARD_HEADER; //薪资应发身份证校验
export const SALARYREAL_CARD_HEADER = heads.SALARYREAL_CARD_HEADER; //薪资实发身份证校验

export const SPECIAL_DEDUCTION_HEADER = heads.SPECIAL_DEDUCTION_HEADER; //薪酬-专项扣除导入

export const APPLY_DELETE_IMPORT_HEADER = heads.APPLY_DELETE_IMPORT_HEADER; //薪酬-专项扣除导入
export const RECORD_DATA_IMPORT_HEADER = heads.RECORD_DATA_IMPORT_HEADER; //个税申报-回盘数据导入

export const PEOPLE_BILL_EXPORT_HEADER = heads.PEOPLE_BILL_EXPORT_HEADER; //薪酬人员查询-导出

export const SALARY_EXPORT_HEADER = heads.SALARY_EXPORT_HEADER; //薪资导出
export const LABOR_EXPORT_HEADER = heads.LABOR_EXPORT_HEADER; //劳务费导出
export const BOOK_EXPORT_HEADER = heads.BOOK_EXPORT_HEADER; //稿酬导出
export const PAY_SEARCH_EXPORT_HEADER = heads.PAY_SEARCH_EXPORT_HEADER; //工资条查询导出


export const SALARY_PEOPLE_SEARCH_UPDATE_HEADER = heads.SALARY_PEOPLE_SEARCH_UPDATE_HEADER; //薪酬人员查询-批量更新
export const SALARY_PEOPLE_SEARCH_IMPORT_HEADER = heads.SALARY_PEOPLE_SEARCH_IMPORT_HEADER; //薪酬人员查询-批量导入

export const PERMISSION_HEADER_EXPORT = heads.PERMISSION_HEADER_EXPORT; //项目权限导出

export const PERMISSION_SOCIALANDFUND_HEADER_EXPORT = heads.PERMISSION_SOCIALANDFUND_HEADER_EXPORT; //社保公积金审核权限
export const PERMISSION_SOCIAL_HEADER_EXPORT = heads.PERMISSION_SOCIAL_HEADER_EXPORT; //社保办理权限
export const PERMISSION_FUND_HEADER_EXPORT = heads.PERMISSION_FUND_HEADER_EXPORT; //公积金办理权限

export const PROJECTMANAGE_HEADER_EXPORT = heads.PROJECTMANAGE_HEADER_EXPORT; //项目管理前端导出
export const PROJECTMANAGE_INFO = heads.PROJECTMANAGE_INFO; //项目管理详情
