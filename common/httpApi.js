/**
 * API接口配置文件
 */
module.exports = {
	eshop: {
		adList: "/api/v1/eshop/ads?kind=1", // 首页广告
		couponList: "/api/v1/eshop/activity/coupon", // 优惠劵活动
		coupon: "/api/v1/eshop/coupon", // 优惠劵领取
		cateList: "/api/v1/eshop/category", // 商品类目
		goodsList: "/api/v1/eshop/goods", // 商品列表
		goodsEval: "/api/v1/eshop/goods/eval", // 商品评价信息
		tenantList: "/api/v1/eshop/tenants", // 商家列表
		tenantDetail: "/api/v1/eshop/tenant", // 商家详情
		tenantCollect: "/api/v1/base/tenant/collect", // 商家收藏
		prepayList: "/api/v1/eshop/activity/prepay", // 充值活动
		couponProfileList: "/api/v1/eshop/coupons", // 当前登录用户领取的优惠劵列表
		juhusuan: "index/juhuasuanlist", // 首页聚划算推荐
		cart: "/api/v1/eshop/goods/cart", // 添加到购物车、购物车列表
		collect: "/api/v1/eshop/goods/collect", // 添加到购物车、购物车列表
		order: "/api/v1/eshop/order", // 订单
		orderStat: "/api/v1/eshop/order/statistics", // 订单统计
		orderCancel: "/api/v1/eshop/order/cancel", // 订单取消
		orderReceive: "/api/v1/eshop/order/receive", // 订单收货
		orderEval: "/api/v1/eshop/order/eval", // 订单评价
	},
	cms: {
		category: "/api/v1/cms/category", // 栏目分类列表
		article: "/api/v1/cms/article", // 文章
		articleFavior: "/api/v1/cms/article/favior", // 文章点赞
		articleLog: "/api/v1/cms/articlelog", // 文章发布
		articleReply: "/api/v1/cms/article/reply", // 文章评论
		update: "config/update", // 检测更新 
	},
	common: {
		areagroup:'/api/v1/eshop/area/group',
		areatree:'/api/v1/eshop/area/tree',
		couponlist: "index/couponlist", // 公共加载商品
		config: "config/getinfo", // 获取服务端配置
		update: "config/update", // 检测更新 
	},
	user:{
		login:"/api/v1/base/user/login", // 会员登录
		weixinOAuth:'/api/v1/oauth/weixin/login',//微信授权
		profile:"/api/v1/base/user/profile", // 用户个人信息获取或修改地址
		profileStatistics:"/api/v1/user/profile/statistics", // 个人中心统计
		profileClickList:"/api/v1/user/profile/click", // 用户中心足迹列表
		profileFaviorList:"/api/v1/user/profile/favior", // 用户中心点赞列表
		profileCollectList:"/api/v1/user/profile/collect", // 用户中心收藏列表
		profileReplyList:"/api/v1/user/profile/reply", // 用户中心评论列表
		profileEvalList:"/api/v1/user/profile/eval", // 用户中心评价列表
		couponProfileCount:"/api/v1/eshop/coupon/count", // 当前登录用户领取的优惠劵可用数量
		couponProfileList:"/api/v1/eshop/coupons", // 当前登录用户领取的优惠劵列表
		address:"/api/v1/eshop/address", // 当前登录用户领取的优惠劵列表
	},
	goods: {
		iteminfo: "items/goodsinfo", // 商品详情 加载 
	}
}
