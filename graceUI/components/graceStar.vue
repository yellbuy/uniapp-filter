<template name="graceStart">
	<view class="grace-stars">
	  <view class="grace-stars-items" v-for="(item, index) in starNum" :key="index" @tap="changNum" :data-val="index">
		<image :src="currentNumber > index ? starImg[1] : starImg[0]" mode="widthFix"></image>
	  </view>
	</view>
</template>
<script>
export default {
	name: "graceStart",
	props:{
		starNum : {
		  type : Number,
		  default : 5
		},
		value : {
		  type : Number,
		  default : 0
		},
		starImg: {
			type : Array,
			default : function(){
				return [
					"../../static/imgs/star.png",
					"../../static/imgs/star-active.png"
				];
			}
		},
		canTap : {
		  type : Boolean,
		  default : true
		}
	},
	data() {
		return {
			currentNumber : 0
		}
	},
	created : function(){
		this.currentNumber = this.value;
	},
	methods: {
		changNum : function(e){
			if (!this.canTap){return ;}
			var val = Number(e.currentTarget.dataset.val);
			this.currentNumber = val + 1;
			this.$emit("starChange", this.currentNumber);
		}
	}
}
</script>
<style>
.grace-stars{padding:5px; display:flex; flex-wrap:nowrap; justify-content:space-between;}
.grace-stars-items{width:100%; margin:0 5px;}
.grace-stars-items image{width:100%;}
</style>