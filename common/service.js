module.exports = {
	USERS_KEY: "yb_mall_user",
	ybUrl: {
		user:{
			clickList:'/pages/statistics/click/list/index',
			collectList:'/pages/statistics/collect/list/index',
			faviorList:'/pages/statistics/favior/list/index',
			replyList:'/pages/statistics/reply/list/index',
			evalList:'/pages/statistics/eval/list/index',
			addressList:'/pages/user/address/list/index',
			profile:'/pages/eshop/profile/home/waimai',//外卖个人中心
			
		},
		cms:{
			articleList:'/pages/cms/article/list/index',
			articleDetail:'/pages/cms/article/detail/index'
		},
		eshop:{
			home:'/pages/eshop/index/waimai',
			cateList:'/pages/eshop/category/list/index',
			prepayList:'/pages/eshop/prepay/list/index',
			goodsDetail:'/pages/eshop/goods/detail/index',
			couponProfile:'/pages/eshop/coupon/list/profile',
			cart:'/pages/eshop/goods/cart/index',
			confirmation:'/pages/eshop/order/confirmation/index',
			orderList:'/pages/eshop/order/list/index',
			goodsEval:'/pages/eshop/goods/eval/index'
		},
		page_index: '/pages/index/index1',
		page_profile: '/pages/profile/profile1',
		page_shop_list: '/pages/shop/list/list1',
		page_forum_list: '/pages/forum/list/list1',
		page_shop_tenant: '/pages/shop/tenant/tenant1',
		page_shop_tenant_detail: '/pages/shop/tenant/detail',
	},
	getSelfAvatar:function(){
		let ret = '';
		ret = uni.getStorageSync(this.USERS_KEY);
		if (!ret) {
			ret = '{}';
		}
		const userInfo = JSON.parse(ret);
		return '/api/v1/avatar/user/'+((userInfo && userInfo.Id)||0)
	},
	getUserAvatar:function(uid){
		return '/api/v1/avatar/user/'+(uid||0)
	},
	getTenantLogo:function(tid){
		return '/api/v1/avatar/tenant/'+tid||0;
	},
	getUser: function() {
		let ret = '';
		ret = uni.getStorageSync(this.USERS_KEY);
		if (!ret) {
			ret = '{}';
		}
		return JSON.parse(ret);
	},
	addUser: function(userInfo) {
		
		uni.setStorageSync(this.USERS_KEY, JSON.stringify(userInfo));
	},
	logout: function() {
		uni.removeStorageSync(this.USERS_KEY);
	},
	json_add: function(a, b) {
		if (a == undefined || a.length == 0) return b;
		if (b == undefined || b.length == 0) return a;
		var s_a = JSON.stringify(a);
		var s_b = JSON.stringify(b);
		var c = s_a.substring(0, s_a.length - 1) + "," + s_b.substring(1);
		return JSON.parse(c);
	},
	goBack: function() {
		console.log(Router);
		this.$router.go(-1);
	},
	getCookie: function(name) {
		// #ifdef H5
		var strcookie = document.cookie;
		var arrcookie = strcookie.split("; ");
		for (var i = 0; i < arrcookie.length; i++) {
			var arr = arrcookie[i].split("=");
			if (arr[0] == name) {
				return arr[1];
			}
		}
		return "";
		// #endif
	},
	getAuthCode: function() {
		var authcode = uni.getStorageSync("authcode");
		if (!authcode) {
			authcode = this.getCookie("authcode");
		}
		return authcode;
	},
	setAuthCode: function($authcode) {
		uni.setStorageSync("authcode", $authcode);
	},
	getAuthCodeLong: function() {
		var authcode = uni.getStorageSync("authcodeLong");
		if (!authcode) {
			authcode = this.getCookie("authcodeLong");
		}
		return authcode;
	},
	setAuthCodeLong: function($authcode) {
		uni.setStorageSync("authcodeLong", $authcode);
	},
	setOpenid: function(openid) {
		uni.setStorageSync("openid", openid)
	},
	getOpenid: function(openid) {
		uni.getStorageSync("openid")
	},
	getLoginCode: function() {
		return uni.getStorageInfoSync("loginCode");
	},
	setLoginCode: function(code) {
		uni.setStorageSync("loginCode", code)
	},
	isWeixin: function() {
		// #ifdef H5
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		}
		// #endif
		return false;
	},
	goHome: function() {
		uni.redirectTo({
			url: "../index/index"
		})
	},
	goCart: function() {
		uni.switchTab({
			url: "../cart/index",
		})
	},
	goUser: function() {
		uni.switchTab({
			url: "../user/index",
		})
	},
	goProduct: function() {
		uni.switchTab({
			url: "../product/index",
		})
	},
	goFenlei: function() {
		uni.switchTab({
			url: "../fenlei/index",
		})
	},
	goLogin: function() {
		uni.navigateTo({
			url: "../login/index"
		})
	},
	goH5WeiXin: function(backurl) {
		// #ifdef H5
		var url = document.location.href.split('#')[0] + "#" + backurl;
		window.location = this.apiHost + '/index.php?m=open_weixin&a=Geturl&backurl=' + encodeURIComponent(url);
		// #endif
	},
	html: function(html) {
		if (html == '' || html == null) return '';
		html = html.replace(' style="', '  xstyle="');
		html = html.replace(/<img /g, '<img style="max-width:100%;height:auto;"');
		html = html.replace(/&hellip;/g, '');
		html = html.replace(' class="brush:html;toolbar:false"', " ");
		html = html.replace(/<pre /g, '<pre style="border:1px solid #eee;padding:10px;max-height:300px;overflow:auto;" ');
		html = html.replace(/<pre /g, "<div ");
		html = html.replace("</pre>", "</div>");
		html = html.replace(/\n/g, "<br />");
		html = html.replace(/<iframe /, '<div style="display:none" ');
		html = html.replace(/<\/iframe>/, '</div>');
		html = html.replace("<section ", "<div ");
		html = html.replace("</section>", "</div>");
		//console.log(html);
		return html;
	},
	getLocation: function() { //获取地理位置
		var latitude = uni.getStorageSync("latitude");
		var longitude = uni.getStorageSync("longitude");
		if (!latitude || !longitude) {
			// #ifdef MP-WEIXIN
			// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userLocation" 这个 scope
			wx.getSetting({
				success(res) {
					if (!res.authSetting['scope.userLocation']) {
						wx.authorize({
							scope: 'scope.userLocation',
							success() {
								wx.getLocation({
									type: 'wgs84',
									success(res) {
										uni.setStorageSync("latitude", res.latitude);
										uni.setStorageSync("longitude", res.longitude);
									},
									fail(err) {
										uni.showModal({
											title: '获取位置失败',
											content: JSON.stringify(err)
										});
									}
								});
							}
						});
					} else {
						wx.getLocation({
							type: 'wgs84',
							success(res) {
								uni.setStorageSync("latitude", res.latitude);
								uni.setStorageSync("longitude", res.longitude);
							},
							fail(err) {
								uni.showModal({
									title: '获取位置失败',
									content: JSON.stringify(err)
								});
							}
						});
					}
				}
			});
			// #endif
			//#ifdef APP-PLUS
			plus.geolocation.getCurrentPosition(function(s) { //成功事件
				uni.setStorageSync("latitude", s.coords.latitude);
				uni.setStorageSync("longitude", s.coords.longitude);
			}, function(e) { //失败事件
				let msg = '';
				switch (e.code) {
					case 1:
						msg = '请开启手机的定位服务功能';
						break;
					case 2:
						msg = '位置信息不可用';
						break;
					case 3:
						msg = '获取位置信息超时';
						break;
					case 4:
						msg = `定位失败：${e.code},${e.message}`;
						break;
				}
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: msg
				});
			}, {
				provider: "amap" //优先使用的定位模块，默认值按以下优先顺序获取（amap>baidu>system）
			});
			//#endif
		}
	},
	getLatitude: function() { //返回纬度
		var latitude = uni.getStorageSync("latitude") || "";
		return latitude;
	},
	getLongitude: function() { //返回经度
		var longitude = uni.getStorageSync("longitude") || "";
		return longitude;
	}
}
