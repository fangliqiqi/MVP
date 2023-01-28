<template>
	<div class="system-add-role-container">
		<el-dialog :title="state.title" v-model="state.isShowDialog" destroy-on-close width="769px" 	@close="onCancel" >
				<el-row :gutter="35" style="max-height:500px">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-tree
							ref="ruleForm"
							:data="state.menuData" 
							:props="state.menuProps"
							:default-checked-keys="state.defaultCheckedKeys" 
							node-key="id"
							show-checkbox
							class="menu-data-tree"
							check-strictly
							@check="onCheck"
							@check-change="onCheckChange"
						/>
					</el-col>
				</el-row>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" :loading="isShowLoading" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="systemAddManage">
import { getMenuTree,getMenuByRoleId } from '@/api/menu'
import {updateRolePerm} from '@/api/role'
import { ElMessage } from 'element-plus';

const ruleForm = ref(null)

const state = reactive({
	isShowDialog: false,
	roleId: '',
	title:'权限管理',
	menuData: [],
	menuProps: {
		children: 'children',
		label: 'label',
	},
	defaultCheckedKeys: [],
	fatherData: [],
});


// 打开弹窗
const openDialog = async (row) => {
	state.defaultCheckedKeys = [];
	state.roleId = row.roleId
	await getMenuData(row.roleId);
	state.isShowDialog = true;
	state.fatherData = treeObj(state.menuData);
};

// 关闭弹窗
const closeDialog = () => {
	state.defaultCheckedKeys = [];
	state.isShowDialog = false;
};

// 取消
const onCancel = () => {
	closeDialog();
};
const isShowLoading  = ref(false)

// 新增
const onSubmit = () => {
	isShowLoading.value = true
	const ids = ruleForm.value.getCheckedKeys()
	const data = {
		roleId: state.roleId,
		menuIds: ids.join(',')
	}
	updateRolePerm(data).then(res => {
		if(res.code==200){
			ElMessage.success('权限设置成功')
			closeDialog()
		}else{
			ElMessage.error(res.msg)
		}
	}).catch(err => {
		ElMessage.error(err.msg);
	}).finally(()=>{
		isShowLoading.value = false
	});
};


// 父级和子集数据对象
let treedata = []
const treeObj = (data)=>{
	data.map(item => {
		let arr = []
		if(item.children&&item.type=='0'){
			item.children.map(it=>{
				if(it.type=='0'){
					arr.push(it.id)
				}
			})
			treedata.push({parentId:item.id,child:arr,label:item.label,type:item.type})
			treeObj(item.children)
		}
	})
	return treedata
}

// 检查是选中的中是否有子集
//  parid 是父级id treeData 是父级下面的子集情况
const checkFlag = (treeData,parid)=>{
	const checkdata = ruleForm.value.getCheckedKeys()
	// 找到当前父级下面的所有子集
	const flag = treeData.find(item => item.parentId == parid)
	const reddata = flag?flag.child:[];
	// 对比选中的集合中是否有子集,只有有子集就是false ，没有就是true
	for (let i = 0; i < reddata.length; i++) {
    if (checkdata.includes(reddata[i])){
			return false
		}
  }
	return true
}
 
/*
	type ==1 是菜单 ==0 是按钮 
	如果点击选中的是菜单，那就需要把菜单下面的子集菜单全部选中，按钮不影响；同时要把菜单的父级菜单也选中
	如果点击的是按钮，需要把父级菜单选中
	如果父级菜单下面的子集都没有选中，响应的父级菜单也要取消选中
	如果父级菜单是空，则子集菜单以及按钮都要取消选中
*/

// 节点选择事件 data 是选中的节点  checked选中的各种集合
const onCheck = (data, checked) => {
	if(checkflg.value){
		checkParent(data,state.fatherData)
	}else{
		cancelCheck(data)
	}
}

// 选中，父菜单选中必须把下面所有的子菜单选中，同时父菜单也要选中
const checkParent = (data,treeData)=>{
	if(data.type==0&&data.children){
			data.children.forEach(item => {
				if(item.type==0){
					ruleForm.value.setChecked(item.id,true)
					checkParent(item,treeData)
				}
			})
		}
		// 父级也选中
		if(data.parentId!=-1){
				ruleForm.value.setChecked(data.parentId,true)
				treeData.map(item=>{
				if(item.child.length>0){
					if(item.child.includes(data.parentId)){
						ruleForm.value.setChecked(item.parentId,true)
						checkParent(item,treeData)
					}
				}
			})
		}
}

/*
	菜单按钮取消，下面所有的子菜单以及按钮都取消
	同时遍历查找如果同级的菜单都没有选中，那么父级菜单也要取消选中
	data 选中项 treeData 父级菜单 ids 选中的菜单
*/
const cancelCheck = (data)=>{
	if(data.type==0&&data.children){
		data.children.forEach(item => {
			ruleForm.value.setChecked(item.id,false)
			if(item.children){
				cancelCheck(item)
			}
		})
	}

	if(data.type==0){
		const flag = checkFlag(state.fatherData,data.parentId)
		if(flag){
			ruleForm.value.setChecked(data.parentId,false)
		}
		// 把父级的父级，如果同级没有也取消
		state.fatherData.map(item=>{
			if(item.child.length>0){
				if(item.child.includes(data.parentId)){
					cancelCheck(item)
				}
			}
		})
	}
}



// 当前节点是选中还是取消
const checkflg = ref(false)
const onCheckChange = (data, checked) => {
	checkflg.value = checked
}

// 获取菜单结构数据
const getMenuData = async(roleId) => {
	// 获取菜单
	const res = await getMenuTree()
	if(res.code==200){
		state.menuData = res.data;
	}else{
		ElMessage.warning(res.msg);
	}

	// 获取角色已有权限
	const res2 = await getMenuByRoleId(roleId)
	if(res2.code==200){ 
		state.defaultCheckedKeys = res2.data||[]
	}else{
		ElMessage.warning(res2.msg);
	}

};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style scoped lang="scss" src="./css/addManage.scss">
</style>
