<template>
	<view>
		<view :style="{background:bgColor, height:height}" v-if="isImmersedStatusbar"></view>
	</view>
</template>
<script>
export default {
	props:{
		bgColor : {
			type : String,
			default : "#FFF"
		},
		height : {
			type : String,
			default : "20px"
		}
	},
	onLoad:function(){
		
		// #ifdef APP-PLUS
		var isImmersedStatusbar = plus.navigator.isImmersedStatusbar();
		if(!isImmersedStatusbar){
			this.height = '0px';
			return ;
		}
		this.isImmersedStatusbar = true;
		// 获取系统状态栏高度
		var lh = plus.navigator.getStatusbarHeight();
		this.height = lh + 'px';
		return ;
		// #endif
		this.height = '0px';
	},
	data() {
		return {
			isImmersedStatusbar : false
		};
	}
}
</script>
<style></style>