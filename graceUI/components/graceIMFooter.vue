<template name="graceIMMsg">
	<view class="grace-footer-wrap">
		<view class="grace-im-footer">
			<view class="grace-im-menus graceIMFonts icon-voice" :style="{color : recShow === true ? '#00BA62;' : ''}" @tap="showRec"></view>
			<view class="grace-im-menus graceIMFonts icon-photograph" @tap='chooseImg'></view>
		  <view class="grace-im-input">
				<input type='text' v-model="inputMsg" fixed @confirm='sendTextMsg'></input>			
		  </view>
			<view class="grace-items" style="padding:0 8px; margin-right:6px;" @tap="sendTextMsgByBtn">发送</view>
		</view>
		<!-- 语音输入 -->
		<view class="grace-im-record" v-if="recShow">
		  <view class="grace-im-record-txt">{{recTxt}}</view>
		  <view class="grace-im-record-btn" @tap="rec" :class="[recing ? 'grace-im-recording' : '']"></view>
		  <view class="grace-im-record-txt" @tap="sendVoiceMsg" style="margin-top:12px; color:#00BA62;" v-if="tmpVoice != ''">
				发送语音
		  </view>
		  <view class="grace-im-record-close graceIMFonts icon-close" @tap="closeRec" v-if="!recing"></view>
		</view>
	</view>
</template>
<script>
export default {
	name: "graceIMMsg",
	props: {},
	data() {
		return {
			recShow         : false,
			recTxt          : "请点击绿色按钮开始录音",
			inputMsg        : "",
			recorderManager : null,
			recing          : false,
			tmpVoice        : '',
			voiceLen        : 0
		}
	},
	created : function(){
    var _self = this;
    this.recorderManager = uni.getRecorderManager();
    this.recorderManager.onStop((res) => {
      _self.tmpVoice     = res.tempFilePath;
    });
    this.recorderManager.onError(function () {
      uni.showToast({ title: '录音失败', icon: 'none' });
      _self.recing = false;
    });
  },
	methods:{
		// 录音
    rec : function(){
      if (this.recing) {
        this.recorderManager.stop();
        this.recing = false;
      } else {
        this.recorderManager.start({duration: 60000, format: 'mp3' });
        this.recing   = true;
				this.recTxt   =  "... 正在录音 ...";
      }
    },
    // 发送录音
    sendVoiceMsg : function(){
      if (this._self.tmpVoice == '') {
        uni.showToast({ title: "请先录制一段语音", icon: "none" });
        return;
      }
			this.$emit('sendVoiceMsg', this.tmpVoice);
      this.tmpVoice = '';
			this.recShow  = false;
    },
    // 展示录音界面
    showRec : function(){this.recShow = true;},
    // 关闭录音界面
    closeRec: function (){this.recShow = false;},
    // 发送文本消息
    sendTextMsg: function (e) {
      var msgText = e.detail.value;
      if (msgText.length < 1) { return false; }
      this.inputMsg = '';
			this.$emit('sendTextMsg', msgText);
    },
		sendTextMsgByBtn : function(){
			var msgText = this.inputMsg;
			if (msgText.length < 1) { return false; }
			this.inputMsg = '';
			this.$emit('sendTextMsg', msgText);
		},
    // 选择图片
    chooseImg : function(){
      var _self = this;
      uni.showLoading();
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success : function(res){
					_self.$emit('sendImgMsg', res.tempFilePaths[0]);
				},
        complete : function(){uni.hideLoading();}
      });
    }
	}
}
</script>
<style>
@font-face {font-family: "graceIMFonts"; src:url('data:application/x-font-woff;charset=utf-8;base64,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');}
.graceIMFonts {font-family:"graceIMFonts" !important; font-size:16px; font-style:normal;}
.icon-voice:before{content: "\e617";}
.icon-photograph:before {content:"\e60b";}
.icon-close:before {content:"\e78a";}
.grace-footer-wrap{width:100%; position:fixed; z-index:9; left:0; bottom:0;}
.grace-im-footer{display:flex; background:#FFFFFF; width:100%; height:50px; flex-wrap:nowrap; overflow:hidden; box-shadow:1px 1px 6px #888;}
.grace-im-footer .grace-items{width:auto; line-height:50px; flex-shrink:0;}
.grace-im-menus{width:44px; height:50px; flex-shrink:0; line-height:50px; text-align:center; font-size:32px;}
.grace-im-input{width:100%; margin:5px; padding:0 8px; background:#F4F5F6; border-radius:5px; height:40px; flex-wrap:nowrap; margin-left:10px;}
.grace-im-input input{width:100%; background:#F4F5F6; height:20px; margin:8px 0; line-height:20px; border-radius:5px;}
.grace-im-record{width:100%; position:fixed; bottom:0; background:#FFF; padding:30px 0; padding-bottom:50px; z-index:11; box-shadow:1px 1px 6px #888;}
.grace-im-record-close{width:50px; height:50px; position:absolute; top:0px; right:0px; z-index:100; justify-content:center; line-height:50px; color:#ccc; font-size:30px;}
.grace-im-record-txt{text-align:center; line-height:30px; padding-bottom:10px; color:#ccc;}
.grace-im-record-btn{width:60px; height:60px; margin:0 auto; border:5px solid #F1F2F3; border-radius:100%; background:#00B26A;}
.grace-im-recording{background:#FF0000;}
.grace-im-record-txt text{color:#333333; padding:0 12px;}
</style>