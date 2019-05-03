<template name="gracePopupMenu">
	<view>
		<view class="grace-popup-mask" v-if="show" @tap="hideMenu"></view>
		<view class="grace-popup-menu" :hidden="!show" :style="{top:top+'px', background:bgColor, width:menuWidth}">
			<slot></slot>
		</view>
	</view>
</template>
<script>
	export default {
		name: "gracePopupMenu",
		props: {
			show:{
				type : Boolean,
				default : false
			},
			top:{
				type : Number,
				default : 0
			},
			bgColor:{
				type : String,
				default :'#4c4c4c'
			},
			menuWidth :{
				type : String,
				default : '300upx'
			}
		},
		methods: {
			hideMenu : function() {
				this.$emit('hideMenu');
			}
		},
	}
</script>
<style>
.grace-popup-menu{background:#4c4c4c; width:300upx; padding:6px; right:0px; top:0px; position:absolute; z-index:9999; border-radius:5px;}
.grace-popup-mask{background:rgba(255,255,255, 0); width:100%; height:100%; position:fixed; left:0; top:0; z-index:9998;}
</style>