export default {
  FAMILY_HEADER: {
    // 批量导入家庭成员
    empName: '员工姓名',
    empIdcard: '身份证号',
    familyName: '成员姓名',
    relationshipSelf: '与本人关系',
    birthday: '出生日期',
    workUnit: '工作单位',
    contractTel: '手机号码',
  },

  FAMILY_HEADER_EXPORT: [
    // 批量导出家庭成员
    { header: '员工姓名', key: 'empName', width: 15 },
    { header: '身份证号', key: 'empIdcard', width: 20 },
    { header: '与本人关系', key: 'relationshipSelf', width: 20 },
    { header: '成员姓名', key: 'familyName', width: 15 },
    { header: '出生日期', key: 'birthday', width: 15 },
    { header: '工作单位', key: 'workUnit', width: 25 },
    { header: '手机号码', key: 'contractTel', width: 15 },
  ],
};