import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		img_list:[],
		img:'',
		access_token: "",
		expires_in: "",
    },
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        },
		//店铺相册
		changeImgList(state,img_arr) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
			state.img_list = state.img_list.concat(img_arr);
		},
		//详情删除
		changeImgList1(state,img_arr) {   
			state.img_list = img_arr
		},
		changeImg(state,img1) {   
			state.img = img1
		},
		set_baidu_data(state,data){
			state.access_token = data.access_token;
			state.expires_in = data.expires_in;
		}
    },
	actions:{
		getBaiduToken(context){
			var _this = this;
			uni.request({
				url: "https://openapi.baidu.com/oauth/2.0/token",
				method: "GET",
				data: {
					grant_type: "client_credentials",
					client_id: "1UnRLzK0437FLCGyVMvKyLvL",
					client_secret: "BEBFxIWeSAfqOSpaBfGKdoKF95T7K7lz"
				},
				success:(res)=>{                    
					console.log(JSON.stringify(res))
					if(res.data.access_token){
						context.dispatch("set_baidu_data",res.data)
					}
				},
			})
		}
	}
})

export default store
