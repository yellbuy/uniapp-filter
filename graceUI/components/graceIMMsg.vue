<template name="graceIMMsg">
	<view class='grace-im'>
		<scroll-view scroll-y :scroll-top="scrollTop" :style="{height:imHeight + 'px'}">
			<view style="height:10px;"></view>
			<view class="grace-im-msg">
				<view class="grace-im-system-msg" @tap="getHistoryMsg">{{historyLodginText}}</view>
			</view>
			<block v-for="(item, index) in msgs" :key="index">
				<view class="grace-im-msg" :class="[userid == item.id ? 'grace-im-msg-right' : 'grace-im-msg-left']" v-if="item.ctype == 1">
					<view class="face"><image :src="item.face" mode="widthFix"></image></view>
					<view>
					<view class="grace-im-name">
						<text v-if="userid != item.id">{{item.name}}</text>
						<text>{{item.date}}</text>
					</view>
					<view class='grace-im-content-in'>
						<view class="content">{{item.msg}}</view>
					</view>
					</view>
				</view>
				<view class="grace-im-msg" :class="[userid == item.id ? 'grace-im-msg-right' : 'grace-im-msg-left']" v-if="item.ctype == 2">
					<view class="face"><image :src="item.face" mode="widthFix"></image></view>
					<view>
						<view class="grace-im-name">
							<block v-if="userid != item.id">{{item.name}}</block>
							<text>{{item.date}}</text>
						</view>
						<view class='grace-im-content-in'>
							<view class="imgs">
							<image :src="item.msg" mode="widthFix" :data-index='index' @tap='showImgs'></image>
							</view>
						</view>
					</view>
				</view>
				<view class="grace-im-msg" :class="[userid == item.id ? 'grace-im-msg-right' : 'grace-im-msg-left']" v-if="item.ctype == 3">
					<view class="face"><image :src="item.face" mode="widthFix"></image></view>
					<view>
					<view class="grace-im-name">
						<block v-if="userid != item.id">{{item.name}}</block>
						<text>{{item.date}}</text>
					</view>
					<view class='grace-im-content-in'>
						<view class="content grace-im-voice-msg" :class="index == playIndex ? 'grace-im-playing' : ''" :data-voice="item.msg" :data-index='index' @tap='playVoice' style="width:300upx;">
						<text class="graceIMFont icon-audio"></text>
						</view>
					</view>
					</view>
				</view>
				<!-- 系统消息 -->
				<view class="grace-im-msg" v-if="item.ctype == 4">
					<view class="grace-im-system-msg">{{item.msg}}</view>
				</view>
			</block>
			<view style="height:20px;"></view>
		</scroll-view>
	</view>
</template>
<script>
export default {
	name: "graceIMMsg",
	props: {
		msgs : {
			type : Array,
			default : function(){
				return []
			},
		},
		userid: {
			type: Number,
			default: -1,
		},
		scrollTop : {
			type: Number,
			default: 99999,
		},
		historyLodginText :{
			type : String,
			default : "点击加载历史消息"
		}
	},
	data() {
		return {
			player : null,
			playIndex : -1,
			imHeight : 300
		}
	},
	created: function(){
		var _self = this;
		this.player = uni.getBackgroundAudioManager();
		this.player.onPlay(() => {});
		this.player.onEnded(function(){
			var cIndex     = _self.playIndex;
			if(cIndex < 0){return false;}
			_self.playIndex = -1;
			for (var i = cIndex + 1; i < _self.msgs.length; i++) {
				if (_self.msgs[i].ctype == 3) {
					_self.playNow(_self.msgs[i].msg, i);
					break;
					return;
				}
			}
		});
		// 调整界面大小
		uni.getSystemInfo({
			success: function (res) {
				console.log(JSON.stringify(res));
				_self.imHeight = res.windowHeight - 52;
				// #ifdef APP-PLUS
				var vendor =  plus.os.vendor;
				if(vendor != 'Google'){
					_self.imHeight = res.windowHeight - 105;
				}
				// #endif
			},
		});
  },
  methods: {
		// 历史消息
		getHistoryMsg : function(){
			this.$emit('getHistoryMsg');
		},
		// 播放语音
		playVoice: function (e) {
				var voicelUrl = e.currentTarget.dataset.voice;
				var index = e.currentTarget.dataset.index;
				if (this.playIndex == -1){return this.playNow(voicelUrl, index);}
				var _self = this;
				if (this.playIndex == index) {
					wx.getBackgroundAudioPlayerState({
						success(res) {
							const status = res.status
							switch (status) {
								case 0:
								_self.player.play();
								break;
								case 1:
								_self.player.pause();
								break;
								default:
								_self.player.play();
							}
						}
					});
				} else {
					this.player.stop();
					this.playNow(voicelUrl, index);
				}
		},
		// 语音播放基础函数
		playNow: function (voicelUrl, index){
				this.playIndex = index;
				this.player.src = voicelUrl;
				this.player.title = "graceUI";
				this.player.play();
				return true;
		},
		// 图片预览
		showImgs : function(e){
			var imgs        = [];
			var imgsCurrent = '';
			var imgIndex    = e.currentTarget.dataset.index;
			for (var i = 0; i < this.msgs.length; i++) {
				if (this.msgs[i].ctype == 2) {
					imgs.push(this.msgs[i].msg);
					if (imgIndex == i){ imgsCurrent =  this.msgs[i].msg;}
				}
			}
			wx.previewImage({urls : imgs, current : imgsCurrent});
		}
	}
}
</script>
<style>
.grace-im{padding:0 10px;}
.grace-im-system-msg{background:#C1C1C1; width:auto; color:#FFF; font-size:12px; line-height:1.5; padding:5px 10px; margin:0 auto; display:inline-block; border-radius:3px;}
.grace-im-msg{margin:20px 0; flex-wrap:nowrap; display:flex;}
.grace-im-msg .face{width:40px; height:40px; overflow:hidden; flex-shrink:0;}
.grace-im-msg .face image{width:100%; border-radius:3px;}
.grace-im-name{line-height:24rpx; height:24rpx; font-size:24rpx; padding-bottom:16rpx; text-indent:8px; color:#00B26A;  padding-left:8px;}
.grace-im-name text:last-child{color:#666; font-size:20rpx; margin-left:10px;}
.grace-im-msg .content{width:auto; padding:8px 12px; margin:0 15px; max-width:500rpx; background:#FFF; line-height:1.6; border-radius:3px; position:relative; word-break:break-all; display:inline-block;}
.grace-im-msg .imgs{margin-left:12px;}
.grace-im-msg .imgs image{width:500rpx; height:auto; font-size:0; border-radius:3px;}
.grace-im-msg .content::after {content: ""; position: absolute; height:10px; width:10px; background:#FFF; top:18px;}
.grace-im-msg-left .content::after {left:-5px; transform: translate(0,-50%) rotate(45deg);}
.grace-im-msg-right{flex-direction:row-reverse;}
.grace-im-msg-right .content{background:#00B26A; color:#FFF;}
.grace-im-msg-right .grace-im-name{display:flex; flex-direction:row-reverse;  padding-left:0px;  padding-right:10px;}
.grace-im-msg-right .content::after {right:-5px; transform: translate(0,-50%) rotate(45deg); background:#00B26A;}
.grace-im-msg-right .grace-im-content-in{display:flex; justify-content:flex-end;}
.grace-im-msg-right .imgs{margin:0; margin-right:12px;}
.grace-im-voice-msg{font-size:20rpx; min-width:100rpx; line-height:40rpx !important;}
.grace-im-voice-msg text{font-size:40rpx;}
.grace-im-playing{background:#007AFF !important; color:#FFF; border-color:#007AFF !important;}
.grace-im-playing text{color:#FFF;}
.grace-im-playing::after{background:#007AFF !important;}

@font-face {font-family: "graceIMFont"; src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAARIAAsAAAAABpAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY+dknyY21hcAAAAYAAAABKAAABcOkou6pnbHlmAAABzAAAAJgAAACcsQjN8WhlYWQAAAJkAAAALwAAADYTkbRlaGhlYQAAApQAAAAcAAAAJAfeA4NobXR4AAACsAAAAAgAAAAICAAAAGxvY2EAAAK4AAAABgAAAAYATgAAbWF4cAAAAsAAAAAgAAAAIAEQADxuYW1lAAAC4AAAAUUAAAJtPlT+fXBvc3QAAAQoAAAAHgAAAC/RhmVweJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGBxeMLxgYG7438AQw9zA0AAUZgTJAQDdeQvneJztkLENgDAQA8/KQ4EYgSo1s1Cxf80WycfAFrF0lnz66oEFKMmZBOhGjFxpZV/Y7IPqmxj+obW/c4cbrczs7uNb/tUL6i3WCXEAAHicY2BhYPj/mVmKmZeBj0GaQZ1Bn4GBkY+RXdyO0URNH0jLMTIbKBmLmwmAOGIC7CKm4mYmYLaIOoShxHSL0dNNJyA4OIBZl8XN8xsTk25VFbMuc+ppXX9/Fh1muzpFReaQcFbGhuQtnroBpx+fBCpkdt/8b7FOA6N3HbMOS86/l2ysrLrBt8KAHOfljMqxyszBwQAGoSFheJxjYGRgYADih0telMfz23xl4GZhAIEblhYmCPr/ZxYGZl4gl4OBCSQKAC7VCZ8AeJxjYGRgYG7438AQw8IAAkCSkQEVMAEARwgCawQAAAAEAAAAAAAAAABOAAAAAQAAAAIAMAAEAAAAAAACAAAACgAKAAAA/wAAAAAAAHicZY9NTsMwEIVf+gekEqqoYIfkBWIBKP0Rq25YVGr3XXTfpk6bKokjx63UA3AejsAJOALcgDvwSCebNpbH37x5Y08A3OAHHo7fLfeRPVwyO3INF7gXrlN/EG6QX4SbaONVuEX9TdjHM6bCbXRheYPXuGL2hHdhDx18CNdwjU/hOvUv4Qb5W7iJO/wKt9Dx6sI+5l5XuI1HL/bHVi+cXqnlQcWhySKTOb+CmV7vkoWt0uqca1vEJlODoF9JU51pW91T7NdD5yIVWZOqCas6SYzKrdnq0AUb5/JRrxeJHoQm5Vhj/rbGAo5xBYUlDowxQhhkiMro6DtVZvSvsUPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nGNgYoAALgbsgImRiZGZgTWxNCUzn4EBAAzjAi0AAA=='); /* iOS 4.1- */
}
.graceIMFont {font-family:"graceIMFont" !important; font-size:16px;}
.icon-audio:before {content:"\e800"; }
</style>