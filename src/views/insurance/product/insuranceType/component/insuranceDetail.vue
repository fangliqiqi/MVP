<template>
    <div class="detail-dialog">
        <el-dialog :title="state.info && state.info.name" :close-on-click-modal="false" v-model="state.isShowDialog" width="816px"
            @close="closeDialog">
            <el-row class="baseinfo">
                <el-row class="rowinfo">
                    <el-col :span="12">
                        <div class="label">保险公司</div>
                        <div class="value" title="12312">{{ fommatValue('insuranceCompanyName') }}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="label">收款单位</div>
                        <div class="value" title="12312">{{ fommatValue('receiptUnitName') }}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="label">收款银行</div>
                        <div class="value" title="12312">{{ fommatValue('bankName') }}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="label">收款银行账号</div>
                        <div class="value" title="12312">{{ fommatValue('bankNo') }}</div>
                    </el-col>
                </el-row>
            </el-row>
            <el-tabs type="card">
                <el-tab-pane label="购买标准">
                    <el-table header-cell-class-name="arch-pro-table-header-cell"
                        :data="state.info && state.info.insuranceTypeStandardList">
                        <el-table-column prop="buyStandard" label="购买标准(元)" />
                        <el-table-column prop="medicalQuota" :formatter="(row) => {
                            return fommatValue(row.medicalQuota, 2)
                        
                        }" label="医疗额度(万元)" />
                        <el-table-column prop="dieDisableQuota" :formatter="(row) => {
                            return fommatValue(row.dieDisableQuota, 2)
                        
                        }" label="身故和残疾(万元)" />
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="费率">
                    <el-table header-cell-class-name="arch-pro-table-header-cell"
                        :data="state.info && state.info.insuranceTypeRateList">
                        <el-table-column prop="month" label="购买月数" />
                        <el-table-column prop="rate" label="费率" />
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <el-button @click="state.isShowDialog = false" size="default" type="primary">关闭</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="insuranceDetailDialog">
import { insuranceTypeDetail } from '/@/api/insurance/company';
import { useRoute, useRouter } from 'vue-router';
import { getDictByItemTypes } from '/@/utils/utils';

const router = useRouter();
const formRef = ref(null);
const state = reactive({
    isShowDialog: false,
    info: {},
    DICTS: {},
    dictKeys: ['downshift_reason'], // 减档原因
    standList: []
});

onMounted(() => {
    loadDicts();
    fommatValue()
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

// 关闭弹窗
const closeDialog = () => {
    if (formRef.value) {
        formRef.value.resetFields()
    }
    state.isShowDialog = false;
};

/**获取险种详情 */
const getDetail = (id) => {
    insuranceTypeDetail(id).then(res => {
        if (res.code === 200) {
            state.info = res.data
        }
    })
}

// 打开弹窗
const openDialog = async (id) => {
    getDetail(id)
    state.isShowDialog = true;
};

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

const emits = defineEmits(['ok']);

// 暴露变量
defineExpose({
    openDialog,
    fommatValue
});

</script>

<style lang="scss" scoped src="./css/insuranceDetail.scss">
</style>
<style lang="scss">
    @import './css/insuranceDetail2.scss'
</style>
