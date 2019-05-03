<template name="graceFullLoading">
	<view class="grace-full-loading" v-if="graceFullLoading">
		<view><image :src="logoUrl" mode="widthFix"></image></view>
	</view>
</template>
<script>
export default {
	name: "graceFullLoading",
	props: {
		graceFullLoading: {
			type    : Boolean,
			default : false
		},
		logoUrl : {
			type    : String,
			default : ""
		}
	}
}
</script>
<style>
@keyframes grace-fade{0% {opacity:0.6;} 25% {opacity:1;} 50% {opacity:0.6;} 75% {opacity:1;} 100% {opacity:0.6;}}
.grace-full-loading{width:100%; height:100%; background:#FFFFFF; position:fixed; z-index:99; left:0; top:0;}
.grace-full-loading view{width:150rpx; height:150rpx; background:#2FBF79; position:absolute; z-index:100;  left:50%; top:50%; transform: translate(-50%, -50%); border-radius:100%; animation:grace-fade 3500ms infinite linear; opacity:0.6; padding:10rpx;}
.grace-full-loading view image{width:150rpx; height:150rpx; border-radius:150rpx;}
</style>