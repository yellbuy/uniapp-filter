<template name="graceDate">
	<view class="grace-date" v-if="show">
		<view class="grace-date-header">
			<view class="grace-date-header-btn" @tap="prevYear">
				<text class="grace-iconfont icon-arrow-left"></text>
				<text class="grace-iconfont icon-arrow-left"></text>
			</view>
			<view class="grace-date-header-btn" @tap="prevMonth"><text class="grace-iconfont icon-arrow-left"></text></view>
			<view class="grace-date-header-date">{{cYear}}年{{cMonth}}月</view>
			<view class="grace-date-header-btn" @tap="nextMonth"><text class="grace-iconfont icon-arrow-right"></text></view>
			<view class="grace-date-header-btn" @tap="nextYear">
				<text class="grace-iconfont icon-arrow-right"></text>
				<text class="grace-iconfont icon-arrow-right"></text>
			</view>
		</view>
		<view class="grace-date-week">
			<view v-for="(item, index) in weeks" :key="index">{{item}}</view>
		</view>
		<view class="grace-date-days">
			<view :class="['items', currentDay == (cYear+'-'+cMonth+'-'+item.date) ? 'current' : '']" @tap="chooseDate" :data-date="cYear+'-'+cMonth+'-'+item.date" v-for="(item, index) in days" :key="index" :style="{'background' : item == '' ? 'none' : ''}">
				<view class="grace-date-day">{{item.date}}</view>
				<view class="grace-date-nl">{{item.nl}}</view>
			</view>
		</view>
		<view v-if="isTime">
			<view class="grace-date-time-title">时间</view>
			<view class="grace-date-time">
				<view class="timer">
					<picker mode="selector" :range="hours" @change="hourChange">
						<view>{{hours[currentHourD]}}</view>
					</picker>
				</view>
				<view class="timer-spliter">
					:
				</view>
				<view class="timer">
					<picker mode="selector" :range="minutes" @change="minuteChange">
						<view>{{minutes[currenMinuteD]}}</view>
					</picker>
				</view>
			</view>
			<view class="grace-date-btn">
				<button type="primary" @tap="submit">确定</button>
			</view>
		</view>
	</view>
</template>
<script>
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;
function GetBit(m, n){return (m >> n) & 1;}
//农历转换
function e2c() {
	TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
	var total, m, n, k;
	var isEnd = false;
	var tmp = TheDate.getYear();
	if (tmp < 1900) {tmp += 1900;}
	total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
	if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {total++;}
	for (m = 0; ; m++) {
		k = (CalendarData[m] < 0xfff) ? 11 : 12;
		for (n = k; n >= 0; n--) {
			if (total <= 29 + GetBit(CalendarData[m], n)) {isEnd = true; break;}
			total = total - 29 - GetBit(CalendarData[m], n);
		}
		if (isEnd) break;
	}
	cYear = 1921 + m;
	cMonth = k - n + 1;
	cDay = total;
	if (k == 12) {
		if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {cMonth = 1 - cMonth;}
		if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {cMonth--;}
	}
}
function GetcDateString() {
	var tmp = "";
	tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
	if (cDay % 10 != 0 || cDay == 10) {tmp += numString.charAt((cDay - 1) % 10);}
	return tmp;
}
function GetLunarDay(solarYear, solarMonth, solarDay) {
	if (solarYear < 1921 || solarYear > 2020) {return "";}
	solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
	e2c(solarYear, solarMonth, solarDay);
	return GetcDateString();
}
export default {
	name: "graceCountd",
	props: {
		show : {
			type : Boolean,
			default : false
		},
		currentHour : {
			type : Number,
			default : 0
		},
		currenMinute : {
			type : Number,
			default : 0
		},
		isTime : {
			type : Boolean,
			default :true
		}
	},
	data(){
		return {
			weeks : ['一', '二', '三', '四', '五', '六', '日'],
			cYear : 2016,
			cMonth : 6,
			days : [],
			currentDay : '2016',
			hours : [],
			minutes : [],
			currentHourD : 0,
			currenMinuteD : 0
		}
	},
	methods: {
		hourChange : function(e){
			var index = e.detail.value;
			this.currentHourD = index;
		},
		minuteChange : function(e){
			var index = e.detail.value;
			this.currenMinuteD = index;
		},
		getDaysInOneMonth : function (year, month){
			var d = new Date();
			d.setFullYear(year);
			d.setMonth(month);
			d.setDate(0);
			return d.getDate();
		},
		getDay: function (year, month, day){
			var d = new Date();
			d.setFullYear(year);
			d.setMonth(month);
			d.setDate(day);
			return d.getDay();
		},
		prevYear : function(){
			this.cYear = this.cYear - 1;
			this.changeMonth(this.cYear, this.cMonth);
		},
		prevMonth : function(){
			var month = this.cMonth - 1;
			var year = this.cYear;
			if (month < 1) { month = 12; year -= 1; }
			this.changeMonth(year, month);
		},
		nextMonth : function(){
			var month = this.cMonth + 1;
			var year = this.cYear;
			if (month > 12){month = 1; year += 1;}
			this.changeMonth(year, month);
		},
		nextYear : function(){
			this.cYear = this.cYear + 1;
			this.changeMonth(this.cYear, this.cMonth);
		},
		changeMonth:function(y, m){
			var daysList = [];
			var days = this.getDaysInOneMonth(y, m);
			var startWeek = this.getDay(y, m - 1, 0);
			var forSteps = 0;
			for (var i = (0 - startWeek); i < days; i++){
				if(i >= 0){
					daysList[forSteps] = {date : i + 1, nl : ''};
					daysList[forSteps].nl = GetLunarDay(y, m, i + 1);
				}else{
					daysList[forSteps] = '';
				}
				forSteps++;
			}
			this.days    = daysList;
			this.cYear   = y;
			this.cMonth = m;
		},
		chooseDate: function (e) {
			var sedDate = e.currentTarget.dataset.date;
			this.currentDay = sedDate;
			var arr = sedDate.split('-');
			if(arr[1] < 10){arr[1] = '0'+arr[1];}
			if (arr[2] < 10) { arr[2] = '0' + arr[2]; }
			if(this.isTime){return ;}
			this.$emit('changeDate', arr[0]+'-'+arr[1]+'-'+arr[2]);
		},
		submit : function(){
			var arr = this.currentDay.split('-');
			if(arr[1] < 10){arr[1] = '0'+arr[1];}
			if (arr[2] < 10) { arr[2] = '0' + arr[2]; }
			this.$emit('changeDate', arr[0]+'-'+arr[1]+'-'+arr[2]+' '+this.hours[this.currentHourD]+':'+this.minutes[this.currenMinuteD]);
		}
	},
	created:function(){
		var dateObj      = new Date();
		var year         = dateObj.getFullYear();
		var month        = dateObj.getMonth() + 1;
		var currentDay   = year + '-' + month + '-' + dateObj.getDate();
		this.cYear       = year;
		this.cMonth      = month;
		this.currentDay  = currentDay;
		this.changeMonth(year, month);
		//填充时间 hours : [], minute : []
		for(var i = 0; i <= 23; i++){
			var hour = i < 10 ? '0'+i : i+'';
			this.hours.push(hour);
		}
		for(var i = 0; i <= 59; i++){
			var minute = i < 10 ? '0'+i : i+'';
			this.minutes.push(minute);
		}
		this.currentHourD = this.currentHour;
		this.currenMinuteD = this.currenMinute;
	}
}
</script>
<style>
.grace-date{position:fixed; z-index:10; vertical-align:top; left:0; top:0; width:730upx; padding:10upx; height:100%; background:#FFF;}
/* #ifdef H5 */
.grace-date{top:44px;}
/* #endif */
.grace-date-header{display:flex; justify-content:center;}
.grace-date-header-btn{font-size:38upx; line-height:88upx; padding:0 10px;}
.grace-date-header-date{line-height:88upx; font-size:32upx; font-weight:700;}
.grace-date-week{height:auto; width:702upx; overflow:hidden; display:flex; flex-wrap:nowrap; margin:0 auto;}
.grace-date-week view{width:96upx; height:80upx; font-size:32upx; line-height:80upx; text-align:center; margin:2upx;}
.grace-date-days{padding:10upx 0; width:702upx; display:flex; flex-wrap:wrap; margin:0 auto;}
.grace-date-days .items{width:96upx; text-align:center; height:96upx; line-height:96upx; margin:2upx; background:#F1F2F3; font-size:30upx;}
.grace-date-days .current{background:#00B26A;}
.grace-date-days .current view{color:#FFFFFF;}
.grace-date-day{height:30upx; line-height:30upx; margin-top:30upx; justify-content:center;}
.grace-date-nl{height:22upx; line-height:22upx; color:#888888; font-size:18upx; justify-content:center;}
.grace-date-time-title{margin-top:15px; line-height:2em; text-align:center;}
.grace-date-time{width:80%; margin:8px 10%; display:flex; flex-wrap:nowrap;}
.grace-date-time .timer{width:50%;  height:40px; border-top:1px solid #F0F0F0; border-bottom:1px solid #F0F0F0;}
.grace-date-time .timer picker{width:100%; height:40px; line-height:40px; text-align:center;}
.grace-date-time .timer-spliter{width:30px; flex-shrink:0; text-align:center; line-height:40px; font-size:20px;}
.grace-date-btn{width:80%; margin:0 10%; margin-top:20px; text-align:center; line-height:46px;}
</style>
