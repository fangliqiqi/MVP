<template>
    <div class="detail-dialog">
        <el-dialog :title="state.title" v-model="state.isShowDialog" :close-on-click-modal="false" width="816px" @close="closeDialog">
            <el-row>
                <el-col style="font-size:18px;margin-bottom:12px">
                    {{ state.info && state.info.name }}
                </el-col>
            </el-row>
            <el-row class="baseinfo">
                <el-row class="rowinfo">
                    <el-col :span="12">
                        <div class="label">保险公司</div>
                        <div class="value" title="12312">{{ state.info && state.info.insuranceCompanyName }}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="label">收款单位</div>
                        <div class="value" title="12312">{{ state.info && state.info.receiptUnitName }}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="label">收款银行</div>
                        <div class="value" title="12312">{{ state.info && state.info.bankName }}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="label">收款银行账号</div>
                        <div class="value" title="12312">{{ state.info && state.info.bankNo }}</div>
                    </el-col>
                </el-row>
            </el-row>


            <el-form :inline="true" :model="state.insureForm" :rules="state.insureRule" ref="insureForm"
                class="demo-form-inline">
                <template v-if="state.flag === 'standard'">
                    <el-form-item label="购买标准(元)" style="width:222px" prop="buyStandard">
                        <el-input v-model.trim="state.insureForm.buyStandard" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="医疗额度(万元)" style="width:222px" prop="medicalQuota">
                        <el-input v-model.trim="state.insureForm.medicalQuota" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="身故或残疾(万元)" style="width:222px" prop="dieDisableQuota">
                        <el-input v-model.trim="state.insureForm.dieDisableQuota" placeholder="请输入" />
                    </el-form-item>
                </template>
                <template v-if="state.flag === 'rate'">
                    <el-form-item label="购买月数" style="width:222px" prop="month">
                        <el-input v-model.trim="state.insureForm.month" placeholder="请输入" />
                    </el-form-item>
                    <el-form-item label="费率" style="width:222px" prop="rate">
                        <el-input v-model.trim="state.insureForm.rate" placeholder="请输入" />
                    </el-form-item>
                </template>
            </el-form>

            <el-table header-cell-class-name="arch-pro-table-header-cell" v-if="state.flag === 'rate'"
                :data="state.info && state.info.insuranceTypeRateList">
                <el-table-column prop="month" label="购买月数" />
                <el-table-column prop="rate" label="费率" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button :text="true" @click="handleDelete(scope.row.id)"
                            style="color: var(--el-color-primary)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-table header-cell-class-name="arch-pro-table-header-cell" v-if="state.flag === 'standard'"
                :data="state.info && state.info.insuranceTypeStandardList">
                <el-table-column prop="buyStandard" label="购买标准(元)" />
                <el-table-column prop="medicalQuota" label="医疗额度(万元)" :formatter="(row) => {
                    return fommatValue(row.medicalQuota, 2)
                }" />
                <el-table-column prop="dieDisableQuota" :formatter="(row) => {
                    return fommatValue(row.dieDisableQuota, 2)
                }" label="身故和残疾(万元)" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button :text="true" @click="handleDelete(scope.row.id)"
                            style="color: var(--el-color-primary)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="state.isShowDialog = false" size="default">关闭</el-button>
                    <el-button type="primary" @click="onSubmit" size="default">保存并继续创建</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="editInsuranceDialog">
import { useRoute, useRouter } from 'vue-router';
import { getDictByItemTypes } from '/@/utils/utils';
import { isIntNum, intNumDecimal, intNumDec } from '/@/utils/toolsValidate'
import { insuranceTypeDetail, saveInsuranceTypeStandard, delInsuranceTypeStandard, saveInsuranceTypeRate, delInsuranceTypeRate } from '/@/api/insurance/company';
import { ElMessageBox } from 'element-plus';

const router = useRouter();
const insureForm = ref(null);
const message = getCurrentInstance()?.appContext.config.globalProperties.$message;
const numInterger = (rule, value, callback) => {
    console.log("222", isIntNum(value))
    if (isIntNum(value)) {
        callback()
    } else {
        callback(new Error('请输入正整数!'))
    }
}

const intDecimal = (rule, value, callback) => {
    if (intNumDecimal(value)) {
        if (Number(value) === 0) {
            callback(new Error('请输入正数最多输入两位小数！'))
            return
        }
        if (Number(value) < 10000000) {
            callback()
        } else {
            callback(new Error('请输入9999999.99以内的数值！'))
        }
        callback()

    } else {
        callback(new Error('请输入正数最多输入两位小数！'))
    }
}
//允许输入0
const intDec = (rule, value, callback) => {
    if (value === '') {
        callback()
    } else {
        if (intNumDec(value)) {
            if (Number(value) < 10000000) {
                callback()
            } else {
                callback(new Error('请输入9999999.99以内的数值！'))

            }
            callback()

        } else {
            callback(new Error('请输入大于等于0的数字最多两位小数！'))
        }
    }

}

//格式化value
const fommatValue = (key, type) => {
    let _value;
    if (type === 2) {
        _value = key
    } else {
        _value = state.info[key]
    }

    if (Object.prototype.toString.call(_value) === '[object Number]') {
        return _value
    } else {
        if (_value) {
            return _value
        } else {
            return '--'
        }
    }

}
const state = reactive({
    isShowDialog: false,
    info: null,
    title: null,
    DICTS: {},
    dictKeys: ['downshift_reason'], // 减档原因
    flag: '',
    insureForm: {
        buyStandard: '',
        medicalQuota: '',
        dieDisableQuota: '',
        rate: '',
        month: ''
    },
    insureRule: {
        buyStandard: [{ required: true, message: '请输入购买标准', trigger: 'blur' }, { validator: intDecimal, trigger: 'blur' }],
        medicalQuota: [{ required: false, message: '请输入医疗额度', trigger: 'blur' }, { validator: intDec, trigger: 'blur' }],
        dieDisableQuota: [{ required: false, message: '请输入身故或残疾', trigger: 'blur' }, { validator: intDec, trigger: 'blur' }],
        rate: [{ required: true, message: '请输入费率', trigger: 'blur' }, { validator: intDecimal, trigger: 'blur' }],
        month: [{ required: true, message: '请输入购买月数', trigger: 'blur' }, { validator: numInterger, trigger: 'blur' }],
    }
});

onMounted(() => {
    loadDicts();
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

/**获取详情 */
const getDetail = (id) => {
    insuranceTypeDetail(id).then(res => {
        if (res.code === 200) {
            state.info = res.data
        }
    })
}

// 关闭弹窗
const closeDialog = () => {
    if (insureForm.value) {
        insureForm.value.resetFields()
    }
    state.isShowDialog = false;
};

// 打开弹窗
const openDialog = async (id, flag) => {
    if (flag === 'rate') {
        state.title = '费率'
    } else {
        state.title = '购买标准'
    }
    getDetail(id)
    state.flag = flag
    state.isShowDialog = true;
};

// 保存并继续创建
const onSubmit = () => {
    if (insureForm.value) {
        insureForm.value.validate(async (valid) => {
            // console.log("valid", valid)
            if (valid) {
                try {
                    if (state.flag === 'standard') {
                        const res = await saveInsuranceTypeStandard({ ...state.insureForm, ...{ insuranceTypeId: state.info.id } })
                        if (res.code === 200) {
                            message.success(res.msg || '操作成功')
                            getDetail(state.info.id)
                            // 这里是因为sonar规则校验，三元表达式会提示个错误，，所以才、改为ifelse
                            //  insureForm.value ? insureForm.value.resetFields() : null
                            if(insureForm.value){
                                insureForm.value.resetFields()
                            } else {
                                insureForm.value = null
                            }
                        } else {
                            message.error(res.msg || '操作失败')
                        }
                    }
                    if (state.flag === 'rate') {
                        const res = await saveInsuranceTypeRate({ ...state.insureForm, ...{ insuranceTypeId: state.info.id } })
                        if (res.code === 200) {
                            message.success(res.msg || '操作成功')
                            getDetail(state.info.id)
                            // 这里是因为sonar规则校验，三元表达式会提示个错误，，所以才、改为ifelse
                            // insureForm.value ? insureForm.value.resetFields() : null
                            if(insureForm.value){
                                insureForm.value.resetFields()
                            }else{
                                insureForm.value = null  
                            }
                        } else {
                            message.error(res.msg || '操作失败')
                        }
                    }

                } finally {

                }
            }

        })
    }
}

/**列表删除操作 */
const handleDelete = (id) => {
    const text = `<p style="font-size:16px;font-weight:600">是否确定删除?<br/>
				<span style="color:red;font-size:14px;font-weight:400">请谨慎操作！</span></p>`;

    ElMessageBox.confirm(text, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true,
    }).then(() => {
        if (state.flag === 'standard') {
            delInsuranceTypeStandard(id).then(res => {
                if (res.code === 200) {
                    message.success(res.msg || '操作成功')
                    getDetail(state.info.id)
                } else {
                    message.error(res.msg || '操作失败')
                }
            })
        }
        if (state.flag === 'rate') {
            delInsuranceTypeRate(id).then(res => {
                if (res.code === 200) {
                    message.success(res.msg || '操作成功')
                    getDetail(state.info.id)
                } else {
                    message.error(res.msg || '操作失败')
                }
            })
        }
    })

}

const emits = defineEmits(['ok']);
// 暴露变量
defineExpose({
    openDialog,
    onSubmit,
    fommatValue
});

</script>

<style lang="scss" scoped src="./css/editInsuranceDialog.scss">
</style>
<style lang="scss">
@import './css/editInsuranceDialog2.scss'
</style>
