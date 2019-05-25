<template>
	<view class="index-content">
		<!-- 搜索板块 -->
		<view class="index-header">
			<!-- filters：过滤选项设置， sortChanged：排序更改的事件监听方法，showShape：是否显示右侧模板选择按钮，shapeValue：初始化的模板值，2：双列，1：单列，具体可自行控制，shapeChanged:右侧的模板选择按钮事件监听方法-->	
			<goodsFilter :filters="goodsFilters" @sortChanged="goodsFilterChanged" @shapeChanged="goodsTemplateChanged" :showShape="true" :shapeValue="2"></goodsFilter>
		</view>
		<!-- 加载更多 -->
		<view class="text-center text-xs content text-gray">技术支持：QQ:997735479</view>
	</view>
</template>

<script>
import goodsFilter from '@/components/yb-filter/index.vue';
import utils from '@/common/utils.js';

export default {
	data() {
		return {
			// 默认双列显示
			goodsListTemplate: 2,
			// 过滤参数
			curCateFid:'',
			cateList:[{name:'卤菜',value:'100001'},{name:'凉菜',value:'100002'},{name:'酒水',value:'100003'}]
		};
	},
	methods: {
		// 排序，筛选更改
		goodsFilterChanged(filter){
			console.log("filter:",filter)
			// 此处可根据fitler数据，从服务器端加载数据
			// pageIndex = 0;
			// this.isEnd = false;
			// this.loadingType = 0;
			// this.curCateFid=filter.option || ""
			// // 加载数据
			// const resetData=true;
			// this.loadMoreGoods(filter,resetData);
		}
		// 点击了右侧的模板选择按钮：即单列还是双列展示商品
		,goodsTemplateChanged(templateValue){
			
			this.goodsListTemplate = templateValue;
		}
	},
	onReady: function() {
		//this.loadCouponListList();
	},
	onLoad: function(options) {
		console.log('options',options)
	},
	computed: {
		goodsListTemplateType: function() {
			return this.goodsListTemplate;
		},
		// 商品过滤器参数 <!-- //1：按距离，2：按销量，3：按人气，4：按最新，5：按价格 -->
		goodsFilters:function() {
			// 参考的下拉选项如下，可从服务器端加载：
			//options:[{name:'不限',value:""},{name:'酒水',value:"js",children:[{name:'啤酒',value:"pj"}]}]},
			// const cateOptions=this.cateList.map(function (item){
			// 	return {name:item.Name,value:item.Fid}
			// });
			const cateOptions = [{name:'推荐',value:'0'},...this.cateList];
			// filterType为0，普通方式，无排序，1：排序模式，2：下拉筛选模式，当前支持一级，多级可自行扩展
			return [
			{title:'类别',value:0,filterType:2,
				options:cateOptions},
			// {title:'推荐',value:0,filterType:0,disableAscDesc:true},
			{title:'距离',value:2,filterType:0},
			// {title:'人气', value:3, filterType:1},
			{title:'最新',value:4,filterType:1},
			{title:'价格',value:5,filterType:1, initAscState:true}]
		}
	},
	components: {
		goodsFilter
	}
};
</script>


