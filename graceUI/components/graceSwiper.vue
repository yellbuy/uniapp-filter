<template name="graceSwiper">
	<view>
		<swiper class="grace-swiper" autoplay="true" :indicator-dots="indicatorDots" indicator-color="rgba(255, 255, 255, 1)" indicator-active-color="#00B26A" :style="{height : swiperHeight + 'upx'}" :interval="interval">
			<swiper-item v-for="(item, index) in items" :key="index">
				<navigator :url='item.path' :open-type="item.openType">
					<image :src='item.imgUrl' :id="swiperId + '-item-1'" mode='widthFix'></image>
					<view class="title" v-if="!indicatorDots">{{item.title}}</view>
				</navigator>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
export default {
	name: "graceSwiper",
	props: {
		swiperId :{
			type : String,
			default: ""
		},
		items : {
			type : Array,
			default : function(){return [];}
		},
		indicatorDots:{
			type:Boolean,
			default:true
		},
		interval : {
			type:Number,
			default : 5000
		},
		swiperHeight : {
			type : Number,
			default : 100
		}
	},
	data() {
		return {
			runCount : 0,
		}
	}
}
</script>
<style>
.grace-swiper{width:100%; height:200upx; position:relative;}
.grace-swiper swiper-item{width:100%; font-size:0; line-height:0;}
.grace-swiper swiper-item image{width:100%;}
.grace-swiper .title{width:100%; height:68upx; line-height:68upx; overflow:hidden; text-align:center; position:absolute; z-index:99; left:0; bottom:0; background:rgba(0, 0, 0, 0.2); color:#FFF;}
.grace-swiper swiper-item navigator{width:100%;}
.grace-swiper swiper-item navigator image{width:100%;}
</style>