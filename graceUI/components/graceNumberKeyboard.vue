<template>
	<view>
		<view class="grace-mask" @tap="done" v-if="show"></view>
		<view class="grace-keyboard" v-if="show">
			<view class="keys-left">
				<view class="keys" data-keynumber="1" hover-class="keydown" @tap="inputNow">1</view>
				<view class="keys" data-keynumber="2" hover-class="keydown" @tap="inputNow">2</view>
				<view class="keys" data-keynumber="3" hover-class="keydown" @tap="inputNow">3</view>
				<view class="keys" data-keynumber="4" hover-class="keydown" @tap="inputNow">4</view>
				<view class="keys" data-keynumber="5" hover-class="keydown" @tap="inputNow">5</view>
				<view class="keys" data-keynumber="6" hover-class="keydown" @tap="inputNow">6</view>
				<view class="keys" data-keynumber="7" hover-class="keydown" @tap="inputNow">7</view>
				<view class="keys" data-keynumber="8" hover-class="keydown" @tap="inputNow">8</view>
				<view class="keys" data-keynumber="9" hover-class="keydown" @tap="inputNow">9</view>
				<view class="keys" style="width:259upx;" hover-class="keydown" data-keynumber="0" @tap="inputNow">0</view>
				<view class="keys" style="width:259upx;" hover-class="keydown" data-keynumber="." @tap="inputNow">.</view>
			</view>
			<view class="keys-right">
				<view class="keys graceNumberKeyboardFont-delete"  hover-class="keydown" @tap="deleteNow"></view>
				<view class="keys grace-keyboard-done" @tap="done">{{doneBtnName}}</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		show : {
			type : Boolean,
			default : false
		},
		doneBtnName : {
			type : String,
			default : "完成"
		}
	},
	methods: {
		inputNow : function (e){
			var k = e.currentTarget.dataset.keynumber;
			this.$emit('keyboardInput', k);
		},
		deleteNow : function (){
			this.$emit('keyboardDelete');
		},
		done : function(){
			this.$emit('keyboardDone');
		}
	},
}
</script>
<style>
@font-face {font-family:"graceNumberKeyboardFont"; src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAM4AAsAAAAABuQAAALqAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBWIFWATYCJAMICwYABCAFhG0HSBsUBsiuMG7hiYYIzBUsgLs29m0VBmAInuePvee+X9GWFrkoijYcVvJ00yjRAU30zTtnnwPi2KORPCCUw6TtKHtZ0h6yA9YAqMjRF4ZA/RP28/C2e3f32S4kYhCiKEtKIJpCbIKUbaYBAuZQtwTGc720kAT9n2Omi8S9geR/vjeXjLTCAY4HsgFF9SXZHdAB8A1jF7iE4xBgl5bFY6ioawP+jKxxAmSRBCPwz/kYGVnSSphrlgY5aVjzrl4A4Cz8ffmBLn8opsIq25rLLaDoZad5DenV5CPgz2cB2CowgCaAETLWxjZ4EUb2Yo95ywP7Khb8+699A7LXfx7SsgqdAJKQd098V3CrzAqAEe1hAbA76gPA0JPSGzrzVm3bH2q179w4wo7P31fx2l4+Po5W7u3VmfWOteFE5x77yO9Y29JMsK1jaf36PtTetrB68xzpbF/cunsKd3QuD/cf7tbEp/L097j1xLvR8zmxNX5W7esCw658qV+ErYlRT9+n9E/PnyizPMLvYlWJURRud+eajyzKXJY7vT40vkSpYAtiEfIUIRoUsQLGlO8f+zecZl38JCxva1AA+OvnIa+fA2A9vV3wGysCgNYRF1p6FaoMRFIWwtuT2nUnGsvl92WsKnTPKWEVunOHRSoFA6si0ohtgolDG8ysBmDXULnaIYDyIlFB3TgA4XUEitsvGHi9Io3Yz2AS9g/MvHmB3XaK2tKhnBRYSpGRIQs0dUPJTJzYMbLAqLgFCdxupFlhSOlA1C0FoValKSYrkRPROWa4ZUHHGIaYEgesAKchu51AFyVWZGYqkTFXjlqN675JZSYOEGiCQowYxAIy6QZJzAgn7DdnAks/3wIRcHZGtKWuxtoBodykziEtFU0PZKXM2avuXl5xkwl0GAaDMIpwgCqABbHbMQJy1Q+yQswYFXFExCWHGjXCfWWq9RWOr9sC2FlqleyvKNITCTeLUlNjK+MmyUhsXC9yo8noxNyEnAAAAAA=') format('woff2');}
.graceNumberKeyboardFont-delete:before {font-family: "graceNumberKeyboardFont" !important; content: "\e616";}
.grace-mask{background:rgba(255, 255, 255, 0); position:fixed; width:100%; height:100%; left:0; top:0; z-index:1;}
.grace-keyboard{background:#F4F5F6; position:fixed; width:100%; height:auto; left:0; bottom:0; z-index:99; padding:10px 0;}
.grace-keyboard .keys-left{width:562upx; float:left;}
.grace-keyboard .keys-right{width:187upx; float:right;}
.grace-keyboard .keys{width:166upx; height:100upx; margin:10upx; float:left; background:#FFFFFF; text-align:center; line-height:100upx; border-radius:8upx; font-weight:700; font-size:50upx;}
.grace-keyboard-done{height:340upx !important; line-height:340upx !important; font-size:36upx !important; font-weight:400 !important; background:#00C777 !important; color:#FFFFFF !important;}
.keydown{background:#00C777 !important; color:#FFFFFF !important;}
</style>