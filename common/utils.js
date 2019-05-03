function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}
function formatDate(inputTime){
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
}
function formatDateTime(inputTime){
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};
function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	compare: function(dateStr) {
		var date = this.parse(dateStr)
		console.log(date)
		var diff = date.getTime()-Date.now();
		if(diff>0){return 1}
		if(diff<0){return -1}
		return 0
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		return date.getFullYear() + '/' + this._format(date.getMonth() + 1) + '/' + this._format(date.getDate()) + ' ' +
			this._format(date.getHours()) + ':' + this._format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	},
	_format: function(number) {
		return (number < 10 ? ('0' + number) : number);
	},
	crtDate: function() { //获取当前日期yyyy-mm-dd
		var date = new Date();
		return date.getFullYear() + '-' + this._format(date.getMonth() + 1) + '-' + this._format(date.getDate());
	},
	crtTime: function() { //获取当前时间hh-mm
		var date = new Date();
		return this._format(date.getHours()) + ':' + this._format(date.getMinutes());
	},
	myFormat: function(dateStr) {
		var date = this.parse(dateStr);
		return date.getFullYear() + '/' + this._format(date.getMonth() + 1) + '/' + this._format(date.getDate()) + ' ' +
			this._format(date.getHours()) + ':' + this._format(date.getMinutes());
	},
	someDayBefore: function(x) { //获取x天前的日期yyyy-mm-dd
		if (!x || !parseInt(x)) {
			return '';
		}
		var timeStamp = new Date().getTime();
		var timeStamp2 = timeStamp - parseInt(x) * 24 * 60 * 60 * 1000;
		var date = new Date(timeStamp2);
		return date.getFullYear() + '-' + this._format(date.getMonth() + 1) + '-' + this._format(date.getDate());
	},
	getTimeStamp: function(x) { //获取x天前的时间戳，x为空表示获取现在的时间戳
		var timeStamp = new Date().getTime();
		if (!x || !parseInt(x)) {
			return timeStamp;
		} else {
			return timeStamp - parseInt(x) * 24 * 60 * 60 * 1000;
		}
	}
};

module.exports = {
	formatTime: formatTime,
	formatDate: formatDate,
	formatDateTime: formatDateTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils
}
