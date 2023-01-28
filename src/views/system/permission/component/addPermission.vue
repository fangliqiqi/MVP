<template>
	<div class="system-dict-container">
		<div class="arch-pro-layout page-container">
      <div class="arch-pro-content-container">
        <div class="per-title">
          <em></em>
          数据权限设置
        </div>
        <div class="per-form">
          <el-form :model="state.ruleForm"  ref="ruleForm" :rules="rules" size="default" label-width="120px" label-position="right">
            <el-form-item label="选择关联账号" prop="linkType">
              <el-radio-group v-model="state.ruleForm.linkType" @change="changeLinktype">
                <el-radio label="0" >按用户组</el-radio>
                <el-radio label="1" >按用户</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="" prop="linkGroup" v-if="state.ruleForm.linkType==0">
              <el-select 
                v-model="state.ruleForm.linkGroup" 
                placeholder="请选择用户组" 
                clearable 
                class="w650"
                value-key="value"
              >
                <el-option 
                  v-for="item in state.userGroupList"
                  :key="item.value"
                  :label="item.label"
                  :value="{value:item.value,label:item.label}"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="linkuserId" v-else>
              <page-select
								ref="pageSelectRef"
								v-model="state.ruleForm.linkuserId"
								:request="request"
								title="nickname"
								search="nickname"
                value-key="userId"
                placeholder="请选择用户"
								:options="state.options"
                :selectwidth="'width:650px'"
                @change="changeLink"                
							>
							</page-select>
            </el-form-item>

            <el-form-item label="创建人访问">
              <el-select 
                v-model="state.ruleForm.menuCreateList" 
                multiple  
                placeholder="请选择创建人访问菜单" 
                clearable 
                filterable 
                class="w650"
                collapse-tags
                collapse-tags-tooltip
              >
                <el-option v-for="item in state.menulist"
                :key="item.menuId"
                :label="item.name"
                :value="item.menuId"
              >
                </el-option> 
              </el-select>
            </el-form-item>
            <el-form-item label="项目权限访问">
              <el-select 
                v-model="state.ruleForm.menuSettleList" 
                multiple 
                placeholder="请选择项目访问菜单" 
                clearable 
                filterable 
                class="w650"
                collapse-tags
                collapse-tags-tooltip
              >
                <el-option v-for="item in state.menulist"
                :key="item.menuId"
                :label="item.name"
                :value="item.menuId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门访问权限">
              <el-radio-group v-model="state.ruleForm.isDeptAuth">
                <el-radio label="0" size="large">关闭</el-radio>
                <el-radio label="1" size="large">本部门可见</el-radio>
                <el-radio label="2" size="large">多部门可见</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="" v-if="state.ruleForm.isDeptAuth!='0'" prop="menuDeptList">
              <el-select 
                v-model="state.ruleForm.menuDeptList" 
                multiple 
                placeholder="请选择部门访问菜单" 
                clearable 
                filterable 
                class="w650"
                collapse-tags
                collapse-tags-tooltip
              >
                <el-option v-for="item in state.menulist"
                :key="item.menuId"
                :label="item.name"
                :value="item.menuId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" v-if="state.ruleForm.isDeptAuth=='2'" prop="authDeptList">
              <el-tree-select
                v-model="state.ruleForm.authDeptList"
                ref="deptRef"
                :data="state.deptTree" 
                :props="state.menuProps"
                node-key="id"
                show-checkbox
                placeholder="请选择多部门"
                class="menu-data-tree w650"
                check-strictly
                filterable
                multiple 
              />
            </el-form-item>
            <div class="sql">
              <div class="sql_title">
                自定义规则
              </div>
              <div class="sql_body">
                <div class="sql_content" v-for="(item,i) in state.ruleForm.menuSqlList" :key="i">
                  <div class="w650">
                    <div class="sql_left w650">
                      <el-select
                        v-model="item.sqlMenuList"
                        placeholder="请选择自定义菜单" 
                        multiple 
                        clearable 
                        filterable 
                        style="width:100%;margin-bottom:12px"
                        collapse-tags
                        collapse-tags-tooltip
                      >
                        <el-option v-for="sql in sqlMenulist(item.sqlMenuList)"
                          :key="sql.menuId"
                          :label="sql.name"
                          :value="sql.menuId"
                          :disabled="sql.disabled"
                        >
                        </el-option>
                      </el-select>
                      <el-input
                        v-model="item.diySql"
                        type="textarea"  
                        placeholder="请输入自定义SQL语句" 
                        :autosize="{ minRows: 2, maxRows: 6 }">
                      </el-input>
                    </div>
                    <div class="sql_line" v-if="state.ruleForm.menuSqlList.length>1"></div>
                  </div>
                  <div class="sql_right">
                    <svg-icon v-if="i==0" :name="`iconfont icon-ic_edit_add`" @click="addSql"/>
                    <svg-icon v-else :name="`iconfont icon-ic_edit_delete`" @click="delSql(i)" />
                  </div> 
                </div>
              </div>
              
            </div>
          </el-form>
        </div>
      </div>
      <div class="footer">
        <el-button   @click="onCancel">取消</el-button>
        <el-button type="primary" :loading="isShowLoading" @click="submitFrom">保存</el-button>
      </div>
    </div>
    
  </div>
</template>

<script setup>
  import SvgIcon from '/@/components/svgIcon/index.vue';
  import {getDictbyType} from '/@/api/dict';
  import { getUserlist } from '/@/api/user';
  import {getMenuList} from '/@/api/menu';
  import {getDeptList} from '/@/api/dept';
  import {addPermission} from '/@/api/permission';
  import { ElMessage } from 'element-plus';
  import PageSelect from '/@/components/PageSelect/index.vue';
  import { getCurrentInstance } from 'vue';
  import { useRoute,useRouter } from 'vue-router';
  import  { emitRefresh } from '/@/utils/events'
  import { closeCurrentTab} from '/@/utils/utils';


  const ruleForm = ref(null)
  const pageSelectRef = ref(null)
  const deptRef = ref(null)
  const { proxy } = getCurrentInstance()
  const route = useRoute();
  const router = useRouter();

  // 初始数据
  const state = reactive({
    ruleForm:{
      linkType:'0', //关联账号
      linkuserId:'', //关联账号 用户id
      linkGroup:'', //关联账号 用户组

      linkUser:'',//关联账号 用户
      menuCreateList:[], //创建人访问菜单
      menuSettleList:[], //项目访问菜单
      isDeptAuth:'0', //部门访问权限
      authDeptList:[], //部门访问菜单
      menuDeptList:[], //部门访问菜单
      menuSqlList:[   //自定义菜单
         {
          diySql: "",
          sqlMenuList: []
         }
      ], 
    },
    menulist:[],//菜单列表
    userGroupList:[],//用户组列表
    deptTree:[],//部门列表
    menuProps:{
      children: 'children',
      label: 'name',
    },
  })

  // 规则
  const rules = {
    linkType: [
      { required: true, message: '请选择关联账号', trigger: 'change' },
    ],
    linkGroup: [
      { required: true, message: '请选择用户组关联账号', trigger: 'change' },
    ],
    linkuserId: [
      { required: true, message: '请选择用户关联账号', trigger: 'change' },
    ],
    authDeptList: [
      { required: true, message: '请选择多部门', trigger: 'change' },
    ],
    menuDeptList: [
      { required: true, message: '请选择部门访问菜单', trigger: 'change' },
    ],
  }

  // 用户列表请求
  const request = async (params) => {
    try {
      const res = await getUserlist(params);
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

  // 自定义的去重下拉列表
  const sqlMenulist = computed(() => {
    return (val)=>{
      let newList = JSON.parse(JSON.stringify(state.menulist));
      // arr 是选中的左右的id 的集合
      const arr = []
      state.ruleForm.menuSqlList.map(item => {
        item.sqlMenuList.map(item => {
          arr.push(item)
        })
      });
      // val 当前选中的值 
      newList.map(item => {
        // 存在所有选中的值中且不存在当前的值中
        if(arr.indexOf(item.menuId)>-1&&val.indexOf(item.menuId)==-1){
          item.disabled = true
          return item
        }else{
          item.disabled = false
          return item
        }
      })
      //返回Options显示数据
      return newList;
    } 
  })

  // 点击事件 关联账号
  const changeLinktype = () => {
    state.ruleForm.linkGroup = '';
    state.ruleForm.linkuserId = '';
  }
  // 用户下拉传参
  const changeLink = (val)=>{
    state.ruleForm.linkUser = val
  }
  // 自定义规则新增
  const addSql = () => {
    state.ruleForm.menuSqlList.push({
      diySql: "",
      sqlMenuList: []
    })
  }
  // 删除自定义规则
  const delSql = (index) => {
    state.ruleForm.menuSqlList.splice(index,1)
  }

  /*
    转换一下下拉选择菜单后 后台的传值
    changeArr 选中的数组
    type 是类型 创建人访问menuCreateList就是0  menuSettleList项目是1  menuDeptList部门是2
  */ 
  const  translateMenu = (changeArr,idtype,type=null) => {
    const arr = []
    if(idtype==0){
      type!=null?changeArr.forEach(item => {
        arr.push({
          menuId:item,
          type:type
        })
      }):changeArr.forEach(item => {
        arr.push({
          menuId:item,
        })
      })
    }else if(idtype==1){
      changeArr.forEach(item => {
        arr.push({
          deptId:item
        })
      })
    }
    return arr
  }

  const sqlFlag = ()=>{
    let flag = false               
    state.ruleForm.menuSqlList.map(item => {
      // 两个只要有一个没写就提醒组织提交
      if(!item.diySql&&item.sqlMenuList.length>0||item.diySql&&item.sqlMenuList.length==0){
        flag = true
      }
    })
    return flag
  }
  const isShowLoading = ref(false)
  // 提交
  const submitFrom = async () => {
    if(sqlFlag()){
      ElMessage.error('请填写完整自定义规则');
      return
    }

    let sqlArr = state.ruleForm.menuSqlList.filter(item=>{
      return item.diySql!=''&&item.sqlMenuList.length>0
    })
    
    const data = {
      sysDataAuth:{
        linkType:state.ruleForm.linkType,
        linkId:state.ruleForm.linkType=='0'?state.ruleForm.linkGroup.value:state.ruleForm.linkuserId,
        linkName:state.ruleForm.linkType=='0'?state.ruleForm.linkGroup.label:state.ruleForm.linkUser.nickname,
        isCreateAuth:state.ruleForm.menuCreateList.length > 0 ? 1 : 0,
        isSettleAuth:state.ruleForm.menuSettleList.length > 0 ? 1 : 0,
        isDeptAuth:Number(state.ruleForm.isDeptAuth),
        isDiySql:sqlArr.length>0?1:0,
      },
      menuCreateList:translateMenu(state.ruleForm.menuCreateList,0,0),
      menuSettleList:translateMenu(state.ruleForm.menuSettleList,0,1),
      menuDeptList:translateMenu(state.ruleForm.menuDeptList,0,2),
      authDeptList:translateMenu(state.ruleForm.authDeptList,1),
      authSqlList:sqlArr.length>0?sqlArr.map(item=>{
        return {
          diySql:item.diySql,
          sqlMenuList:translateMenu(item.sqlMenuList,0)
        }
      }):[]
    }
    // console.log('data',data)
    ruleForm.value.validate(async (valid) => {
      if (valid) {
        isShowLoading.value=true
        addPermission(data).then(res=>{
          if(res.code==200){
            ElMessage.success('数据权限新增成功');
            onCancel()
          }else{
            ElMessage.error(res.msg);
          }
        }).catch(e=>{
          ElMessage.error(e);
        }).finally(()=>{
          isShowLoading.value = false
        })
      }
    })
  }

  // 取消
  const onCancel = () => {
    router.push({
				path: '/system/permission/index',
				query: {},
		}); 
    emitRefresh(proxy,'/system/permission/index')
	  closeCurrentTab(route, proxy);
    // proxy.mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 1, ...route }));
  }

  
  // 加载
  onMounted( async () => {
    // 获取用户组
    let res1 = await getDictbyType('group_type')
    if(res1.code == 200){
      state.userGroupList = res1.data
    }else{
      state.userGroupList = []
      ElMessage.error(res1.msg)
    }
    
    // 获取菜单
    let res2 = await getMenuList({flag:0})
    if(res2.code == 200){
      state.menulist = res2.data
    }else{
      state.menulist = []
      ElMessage.error(res2.msg)
    }

    // 获取部门
    let res3 = await getDeptList()
    if(res3.code == 200){
      state.deptTree = res3.data
    }else{
      state.deptlist = []
      ElMessage.error(res3.msg)
    }

  })




</script>


<style scoped lang="scss" src="./css/addPermission.scss">

</style>>


