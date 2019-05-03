<template name="graceNumberBox">
	<view class="grace-number-box">
		<view class="doBtn" @tap="reduce">-</view>
		<input type="number" :value="inputNumber" :disabled="disabled" @blur="blur"></input>
		<view class="doBtn" @tap="add">+</view>
	</view>
</template>
<script>
export default {
	name: "graceNumberBox",
	props: {
		disabled :{
			type : Boolean,
			default : false
		},
		value : {
			type : Number,
			default : 0 
		},
		index : {
			type : Number,
			default : 0
		},
		maxNum:{
			type: Number,
			default: 20
		},
		minNum: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			inputNumber: this.value
		}
	},
	watch:{
		value (val){
			this.inputNumber = val;
		},
		inputNumber (val){
			if(val > this.maxNum){val = this.maxNum; this.inputNumber = val;}
			if(val < this.minNum){val = this.minNum; this.inputNumber = val; console.log(11)}
			this.$emit('change', [val, this.index]);
		}
	},
	methods: {
		add : function(){
			var newVal = this.inputNumber + 1;
			this.inputNumber = Number(newVal);
		},
		reduce: function () {
			var newVal = this.inputNumber - 1;
			this.inputNumber = newVal;
		},
		blur : function(e){
			this.inputNumber = Number(e.detail.value);
		}
  }
}
</script>
<style>
.grace-number-box{width:220upx; height:65upx; display:flex !important; overflow:hidden; flex-wrap:nowrap;}
.grace-number-box .doBtn{width:65upx; line-height:60upx; height:65upx; text-align:center; font-size:50upx; color:#333;}
.grace-number-box input{display:block; width:90upx !important; height:35upx !important; line-height:35upx !important; color:#333; padding:15upx 0 !important; background:#F3F4F5;  text-align:center !important;}
</style>