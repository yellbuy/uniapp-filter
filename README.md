# uniapp-filter
基于uniapp的过滤、排序、模板选择通用组件，支持APP，H5和微信小程序
# 版本历史
## v1.1.0 
下拉选项可记住当前选择
## v1.0.0 
首次发布
# 使用方式
## 1、导入组件
App.vue文件中引入全局样式
<style lang="scss">
		@import './graceUI/graceUI.css';
		@import './colorui/main.css';
		@import './colorui/icon.css';
</style>

## 2、导入组件
import goodsFilter from '@/components/filter/index.vue';
## 3、设置组件属性
<goodsFilter :filters="goodsFilters" @sortChanged="goodsFilterChanged" @shapeChanged="goodsTemplateChanged" :showShape="true" :shapeValue="2"></goodsFilter>
## 4、关键属性定义参考
### 1）filters：参考如下
  [
			{title:'类别',value:0,filterType:2,
				options:[{name:'推荐',value:0},{name:'凉菜',value:1},{name:'酒水',value:2}]},
			{title:'距离',value:2,filterType:0},
			{title:'最新',value:4,filterType:1},
			{title:'价格',value:5,filterType:1,initAscState:true}]
其中：
filterType：0将呈现为普通过滤，无排序，下拉功能，1：将呈现为升降序模式，2：将呈现为下拉过滤方式
initAscState：初始升序还是降序，filterType为1时有效
options：下拉选项，filterType为2时有效

### 2）sortChanged：
可在父页面中监听过滤、排序点击事件，通常在该方法中完成服务器端列表数据的加载和呈现。返回的参数格式为：{"sort":sortField,"order":this.activeAscState?1:-1,"option":'1011'}，sort：排序字段名，order：升降序，option：所选择的下拉选项值。
### 3）showShape：
是否显示右侧的模板选择按钮，电商系统通常分单列显示和双列显示，具体效果可通过小程序体验
### 4）shapeValu：
初始显示模板，1：为单列，2：为双列，本属性需配合其他列表呈现组件使用。
### 5）shapeChanged：
可在父页面中监听点击了模板选项值的事件，通过监听模板选择更改后的值，可在父组件中控制列表的显示样式。

效果展示：
## 小程序体验
## QQ：997735419
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/qrcode.jpg?raw=true)
## 快速预览
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/1.png?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/2.png?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/3.png?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/4.png?raw=true)
## 小程序效果
## 商城小程序：提供租用，有偿等技术服务
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/module.png?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/0.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/1.1.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/1.2.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/1.3.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/1.4.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/2.1.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/2.2.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/2.3.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/5.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/6.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/7.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/8.jpg?raw=true)
![image](https://github.com/yellbuy/uniapp-filter/blob/master/demo/9.jpg?raw=true)