<template name="graceMaskView">
	<view class="grace-mask" v-if="show" >
		<view class="grace-mask-view" :style="{width: width}" v-if="show">
			<view class="grace-mask-close" @tap="close"><text class="grace-mask-icon icon-close"></text></view>
			<view class="grace-mask-view-content" :style="{background:bgcolor}">
				<slot></slot>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name : "graceMaskView",
	props :{
		width:{
			type : String,
			default : "80%"
		},
		show : {
			type : Boolean,
			default : false
		},
		bgcolor : {
			type : String,
			default : "#FFFFFF"
		}
	},
	methods:{
		close : function(){
			this.$emit('close')
		}
	}
}
</script>
<style>
.grace-mask{background:rgba(0, 0, 0, 0.5); position:fixed; width:100%; height:100%; left:0; top:0; z-index:1;}
.grace-mask-view{width:80%; position:fixed; left:50%; top:50%; border-radius:6px; z-index:99; transform: translate(-50%, -50%);}
.grace-mask-close{width:100%; height:35px; text-align:right; color:#FFF;}
.grace-mask-view-content{width:100%; border-radius:5px;}
@font-face {font-family: "grace-mask-icon";
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMcAAsAAAAABsgAAALNAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBVIFfATYCJAMICwYABCAFhG0HMBsFBsguIScbXkRDZb0wIhLsUaV71yu1ivPxEEG0H/vZe4dqUo1EMQtJLBUSpE79Egrta0jmzf/ar70T25CRnX7mCRFrp2+/+P4Fry4leqk0hgaNeDSagUOOjpRZizxg+f/dbIFNnM9vaXYqWT/t9A+TBG8Y1gCyv9aSQKA3gQH+Dy6nvwIKZB5QbnMMHhMwsDSgsTZFViABeMPYTQQP8DiBSh2iPAsDY3MQloFxgbhWpBqEC25ZdmLlQmnD0izuAOXpxvsA4JZ/Pz5COsIkJQVQsHPa34SuNzdMaOEfjCLAWc4IZxUFxoBMHDSGt/iEQ/apDPv1gGPlBm/+T7XiqH+eKAWyq0Gbzn4mDuY+anYCWbYvACeTbiMNtW2+xrmU5kOZFGEeHp6T3xZKWax2gziFRDI/e+XREub5HQ4WCAVhPJyjUJiP56fLMx0t3i4/u+7+6JH/sX3DNk/t03TF0pnf2lWrj+3nL7/++1br0b7lS8vnWOYo3BdZOXMT+atp//djv0IyzyDxqJKIe3qGIVfJiK0IrcCOFRd0AfxX5Jv5u79xPf6pUnd+h6syeF3d5M7/MsOsoPweLMG/5AysyzEPaFIOOY3WZGHS2IRKlfifaW/0MVXecuPxUK7l9q1l2jMolOtDM2kMSlQZh1LlpqHSqMHVVZpwPpErMGJbg1DvDpJaT6FQ7wXNpHco0aoFperDB5WOot+yykAoxHOsCWzS+jpVGpbJkE4QkTuD0rJe43kepywgdxUfTcWT5dggmsiXmOGuSGkhGGXcMuiAdhrqukVtbqnYEHFZCLucSLCmN8UblgHEPA7VCKiJqltHKRosJkZbC6Ty+RlIskxXwzuKRswLEOdSOqdS4pID0EGxOajoUV5xrZCkCQJDMZzFQA1og5BOZ6Hs5kEq1CDEyROCtrIEbMaGiuPbS40fyHLKAIoUsF+h9Gy5ZtYVAAAAAA==') format('woff2');
}
.grace-mask-icon {
  font-family: "grace-mask-icon" !important;
  font-size: 28px;
  font-style: normal;
}
.icon-close:before {
  content: "\e67f";
}
</style>