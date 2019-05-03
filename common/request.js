var ApiUrl = 'http://demo.hanyuan369.com/index.php/';
// let ajaxa={}

const ajax = (opt) => {
    opt = opt || {};
    opt.url = opt.url || '';
    opt.data = opt.data || null;
    opt.responseType = opt.responseType || null;
    opt.method = opt.method || 'post';
    opt.header = opt.header || {
        "Content-Type": "application/json"
    };
    opt.success = opt.success || function () {};
	
	opt.data.token=uni.getStorageSync('token')
	// console.log('得到的',uni.getStorageSync('token'))
	console.log('入参数',opt.data)
	
    uni.request({
        url: ApiUrl + opt.url,
        data: opt.data,
        method: opt.method,
        header: opt.header,
        dataType: 'json',
        success: function (res) {
            opt.success(res);
        },
        fail: function () {
            uni.showToast({
                title: '请稍后重试'
            });
        }
    })
}

export default ajax;
