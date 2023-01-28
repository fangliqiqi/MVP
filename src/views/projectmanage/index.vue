<template>
  <div class="archives-withdrawn-container">
    <pro-table ref="proTableRef" row-key="id" :columns="columns" :request="request" :btn="btn" :multi="false"
      :searchConfig="searchConfig">
      <template v-slot:option="item">
        <pro-buttons :array="cellBtns" :model="item" @onClick="onCellClick"></pro-buttons>
      </template>

      <template v-slot:incommMain="item">
        <span v-if="(item.managementTag == 0)">{{ item.managementTag == 0 ? '管理费' : '' }}</span>
        <span v-if="(item.managementTag == 0 && item.riskFundTag == 0)">、</span>
        <span v-if="item.riskFundTag == 0">{{ item.riskFundTag == 0 ? '风险金' : '' }}</span>

        <span v-if="item.riskFundTag == 1 && item.managementTag == 1">--</span>

      </template>
      <template v-slot:stopFlag="item">
        <span v-if="(item.stopFlag == 0)">是</span>
        <span v-if="(item.stopFlag == 1 || item.stopFlag == 2)">否</span>
      </template>
    </pro-table>

  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, onUnmounted } from 'vue';
import ProTable from '/@/components/ProTable/ProTable.vue';
import ProButtons from '/@/components/ProButtons/index.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { onRefresh, offRefresh } from '/@/utils/events';
import { getProjectManageList, getExportList } from '/@/api/projectmanage/index';
import { PROJECTMANAGE_HEADER_EXPORT } from '/@/utils/header.js';
import { exportExcelSheet } from '/@/utils/excel';
import moment from 'moment';


export default {
  name: '项目管理',
  components: {
    ProTable,
    ProButtons,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const proTableRef = ref(null);
    const { proxy } = getCurrentInstance();
    const refreshList = () => {
      if (proTableRef.value) proTableRef.value.refresh();
    };
    const isShowLoading = ref(false)
    // 批量导出
    const handleBatchExport = () => {
      let p = Object.assign({}, state.params, proTableRef.value.getParams());
      delete p.size;
      delete p.current;
      isShowLoading.value = true
      getExportList( Object.assign({},p,{deleteFlag:0})).then((res) => {
        exportExcelSheet(
          PROJECTMANAGE_HEADER_EXPORT,
          (res.data || []).map((item) => {
            item.mrSettleType = item.mrSettleType == 1 ? '预估' : '实缴';
            item.stopFlag = item.stopFlag == 0 ? '是' : '否';
            if(item.managementTag == 0 && item.riskFundTag == 0){
              item.incomeForm = '管理费、风险金'
            }else if(item.managementTag == 0){
              item.incomeForm = '管理费'
            }else if(item.riskFundTag == 0){
              item.incomeForm = '风险金'
            }else if(item.managementTag != 0 && item.riskFundTag != 0){
              item.incomeForm='-'
            }
            return item;
          }),
          `项目信息批量导出${moment().format('YYYYMMDD-HHmmss')}`
        )
        ElMessage.success('导出成功');
      }).finally((e) => {
        isShowLoading.value = false
      });
    };
    // 获取结算主体
    const requestProName = async (params) => {
      try {
        const p = Object.assign({}, { deleteFlag: 0 }, params)
        const res = await getProjectManageList(p);
        if (res && res.code == 200 && res.data) {
          return {
            current: res.data.current,
            total: res.data.total,
            data: res.data.records,
          };
        } else {
          ElMessage.error(res.msg);
        }
      } catch (e) {
        console.log('get exception:', e);
      }
      return {
        current: 1,
        total: 0,
        data: [],
      };
    };

    const state = reactive({
      selectionChangeList: [], // 列表多选选中的内容
      searchConfig: {
        labelWidth: 112,
      },
      columns: [
        {
          dataIndex: 'departName',
          title: '项目名称',
          minWidth: 200,
          valueType: 'PageSelect',
          request: requestProName,
          pageProps: {
            valueKey: 'departName',
            title: 'departName',
            search: 'departName',
          },
          tooltip: true,
        },
        {
          dataIndex: 'departNo',
          title: '项目编码',
          minWidth: 140,
          ellipsis: true,
        },
        {
          dataIndex: 'customerName',
          title: '客户名称',
          minWidth: 160,
          tooltip: true,
          hideInSearch: true,
        },
        {
          dataIndex: 'customerNo',
          title: '客户编码',
          minWidth: 140,
          tooltip: true,
          hideInSearch: true,
        },
        {
          dataIndex: 'bpoFlag',
          title: '是否为BPO项目',
          minWidth: 160,
          hideInSearch: true,
        },
        {
          dataIndex: 'mrSettleType',
          title: '结算方式',
          minWidth: 110,
          valueEnum: {
            1: '预估',
            2: '实缴',
          },
          hideInSearch: true,
        },
        {
          dataIndex: '收入组成',
          title: '收入组成',
          multiple: true,
          hideInTable: true,
          hideInSearch: true,
          valueEnum: {
            0: '管理费',
            1: '风险金',
          }
        },
        {
          dataIndex: 'incomeForm',
          title: '收入组成',
          hideInSearch: true,
          minWidth: 180,
          valueType: 'custom',
          scopedSlots: { customRender: 'incommMain' },
        },
        {
          dataIndex: 'stopFlag',
          title: '是否可用',
          minWidth: 180,
          valueEnum: {
            0: '是',
            1: '否',
          },
          scopedSlots: { customRender: 'stopFlag' },
        },
        {
          dataIndex: 'invoiceTitleInsurance',
          title: '商险封面抬头',
          minWidth: 180,
          multiple: true,
          hideInTable: true,
          hideInSearch: true,
        },
        {
          dataIndex: 'invoiceTitleSalary',
          title: '薪资封面抬头',
          minWidth: 180,
          multiple: true,
          hideInTable: true,
          hideInSearch: true,
        },
        {
          dataIndex: 'option',
          title: '操作',
          key: 'option',
          width: 120,
          hideInSearch: true,
          fixed: 'right',
          scopedSlots: {
            customRender: 'option',
          },
        },
      ],
      btn: [
        {
          label: '批量导出',
          onClick: handleBatchExport,
          loading: isShowLoading,
          permission: ['employee_export_employee_leave'],
          icon: 'icon-ic_edit_export',
        },
      ],
      cellBtns: [
        {
          text: '查看',
          prop: 'detail', // 唯一标识
          permission: ['hro:archives-online-detail'], // 权限标识
        },
      ],
      params: {},
    });

    const request = async (params) => {
      try {
        const p = Object.assign({}, { deleteFlag: 0 }, params)
        const res = await getProjectManageList(p);
        if (res && res.code == 200 && res.data) {
          return {
            current: res.data.current,
            total: res.data.total,
            data: res.data.records,
          };
        }
      } catch (e) {
        console.log('get exception:', e);
      }
      return {
        current: 1,
        total: 0,
        data: [],
      };
    };
    const onCellClick = async (prop, item) => {
      if (prop == 'detail') {
        router.push({ name: 'projectmanage-detail', params: { id: item.id } });
      }
    };
    const listener = () => {
      onRefresh(proxy, route.path, () => {
        refreshList();
      });
    };
    onMounted(() => {
      listener();
    });
    onUnmounted(() => {
      offRefresh(proxy);
    });

    return {
      ...toRefs(state),
      request,
      onCellClick,
      proTableRef,
      refreshList,
      requestProName,

    };
  },
};
</script>
