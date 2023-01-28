<template>
	<div class="permisssion-btns">
		<span v-for="(item, i) in showBtns" :key="`permission-key-${item.prop + i}`" class="pro-btn">
			<!-- <template v-if="item.isHide && !item.isHide(model, item.prop)">
					{{item.text}}11
			</template> -->
			<template v-if="item.isGray && item.isGray(model, item.prop)">
				<div style="display:inline-block">
					<a class="disabled">{{ item.text }}</a>
				</div>
			</template>

		<template v-else>
			<div style="display:inline-block">
				<a @click.stop="onClick(item)" > {{ item.text }}</a>
			</div>
		</template>
			
		</span>

		<!--navBtns-->
		<span v-if="navBtns && navBtns.length" class="dropdown pro-btn">
			<el-dropdown v-if="0">
				<span class="el-dropdown-link">
					更多
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item v-for="item2 in navBtns" :key="item2.prop">
							<span class="pro-btn">
								<template v-if="item2.isGray && item2.isGray(model, item2.prop)">
									<a class="disabled" style="color: var(--hro-color-text-disabeld)">{{ item2.text }}</a>
								</template>
								<template v-else>
									<a @click.stop="onClick(item2)"> {{ item2.text }}</a>
								</template>
							</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>

			<el-menu
				 mode="horizontal"
				class="el-menu-demo more_ul"
				background-color="transparent"
				active-text-color="transparent"
			>
				<el-sub-menu index="1" popper-class="more_sub">
					<template #title>更多</template>
					<el-menu-item :index="`1-${i}`" v-for="(item2,i) in navBtns" :key="item2.prop">
						<template v-if="item2.isGray && item2.isGray(model, item2.prop)">
							<a class="disabled" style="color: var(--hro-color-text-disabeld);display: block;">{{ item2.text }}</a>
						</template>
						<template v-else>
							<a @click.stop="onClick(item2)" style="display:block"> {{ item2.text }}</a>
						</template>
					</el-menu-item>
				</el-sub-menu>
			</el-menu>
		</span>
		<slot> </slot>
	</div>
</template>

<script>
import { ref, reactive, defineComponent, toRefs, toRef, computed, watch, onMounted } from 'vue';
import { store } from '/@/store/index';
import { ArrowDown } from '@element-plus/icons-vue';
export default defineComponent({
	name: 'ProButtons',
	components: {
		ArrowDown,
	},
	props: {
		array: {
			type: Array,
			default: () => [],
		},
		model: {
			type: Object,
			default: null,
		},
		limit: {
			type: Number,
			default: 4,
		},
	},
	emits: ['onClick'],
	setup(props, context) {
		const state = reactive({
			data: [], // 按钮信息
			showBtns: [], // 直接展示的按钮
			navBtns: [], // 更多下面的按钮组
		});

		watch(
			() => props.array,
			(newVal, oldVal) => {
				handlebtns(newVal);
			}
		);

		watch(
			() => props.model,
			(newVal, oldVal) => {
				handlebtns(props.array);
			}
		);


		const handlebtns = (newVal) => {
			// 添加按钮isHide属性 用于判断是否隐藏，两个按钮互斥显示的时候使用,例如薪酬导入申请
			newVal = newVal.filter(item=>item.isHide?!item.isHide(props.model):true)
			let target = [];
			if (newVal && newVal.length) {
				// 存在
				target = newVal.filter((item) => {
					let flag = true;
					const permission = item.permission;
					if (permission && permission.length) {
						// 需要校验权限
						flag = !!store.state.userInfos.permission.find((val) => {
							const target = permission.find((t) => t === val);
							return !!target;
						});
					}
					return flag;
				});
			}
			if (target.length > props.limit) {
				// 超出最大显示按钮数，需要分组
				state.showBtns = target.slice(0, props.limit - 1);
				state.navBtns = target.slice(props.limit - 1, target.length);
				return;
			}
			state.showBtns = target;
		};

		onMounted(() => {
			handlebtns(props.array);
		});

		const onClick = (item) => {
			context.emit('onClick', item.prop, props.model, item);
		};
		return {
			...toRefs(props),
			...toRefs(state),
			onClick,
		};
	},
});
</script>

<style lang="scss">
.permisssion-btns {
	.pro-btn {
		color: var(--el-color-primary);
		cursor: pointer;
		& + .pro-btn {
			margin-left: 20px;
		}
		a.disabled {
			color: var(--hro-color-text-disabeld);
		}

		.el-dropdown {
			color: var(--el-color-primary);
		}
		.el-loading-spinner{
			top:124%;
		}
		.el-loading-spinner .circular{
			height: 20px;
			width: 20px;
		}
	}
}
.dropdown{
	display: inline-block;
	width: 10px;
	margin-left: 0px !important;
}
.more_ul{
	padding: 0;
	height:20px;
	.el-sub-menu__title{
		color:var(--el-color-primary) !important;
	}
	.el-menu-hover-bg-color, .el-menu-item:hover, .el-sub-menu__title:hover{
		background: transparent !important;
	}

	.el-menu-item.is-active i, .el-menu-item.is-active span, .el-sub-menu.is-active .el-sub-menu__title i, .el-sub-menu.is-active .el-sub-menu__title span{
		color: var(--el-color-primary) !important;
	}
	
}
</style>
<style>
	.more_sub{
		box-shadow: 0px 0px 8px rgba(0,0, 0, 0.1);
		background: #fff;
		border:none;
		z-index: 2000 !important;
	}
	.more_sub .el-menu--popup{
		min-width: 40px;
	}
	.more_sub .el-menu{
		width: auto !important;
		line-height: normal !important;

	}
	.more_sub .el-menu-item{
		height: 40px !important;
		line-height: 40px !important;
		text-align: left !important;
		padding: 0 20px !important;
		display: block !important;
		color:var(--el-color-primary) !important;
	}
	.more_sub .el-menu-item.is-active{
		font-weight: normal;
	}
	.more_sub .el-menu-item:hover {
		background: var(--el-color-primary-light-9) !important;
	}
	.more_sub .el-menu-item:focus {
		background: var(--el-color-primary-light-9) !important;
	}
</style>