import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//console.log("Vuex:",Vuex)
const store = new Vuex.Store({
    state: {
		baseUrl:"http://yb.ynwtzj.com",
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        isLogin: false,
		userInfo:{},
        userName: "che",
		img_list:[],
        
        shop_edit_index:'',
        shop_edit_info:{},
        
		form_data1:{},
		form_data2:{},
		form_data3:{},
        
        provider: "",
        clientid: "",
        token: ""
    },
    mutations: {
		getFullUrl(state,url){
			return this.$ybSvc.apiHost+url
		},
		setLogin(state, isLogin) {
		    state.isLogin = true;
			console.log('isLogin:',isLogin)
		},
        login(state, userInfo) {
            state.userInfo = userInfo || {};
			state.userName=userInfo.Name || userInfo.Nickname || userInfo.Username || "匿名用户"
            state.isLogin = true;
			console.log('state:',state)
        },
        logout(state) {
            state.userName = "";
            state.isLogin = false;
        },
		//店铺相册
		changeImgList(state,img_arr) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
			state.img_list = state.img_list.concat(img_arr);
		},
		//店铺信息-身份证
		changeShopEdit(state,inx) {   
			state.shop_edit_index = inx
		},
        
        changeShopEditInfo(state,obj) {   
        	state.shop_edit_info = obj
        },
        
        //店铺新增第一步信息
		changeFormData1(state,form_data1) {   
			state.form_data1 = form_data1
		},
         //店铺新增第2步信息
        changeFormData2(state,form_data2) {   
        	state.form_data2 = form_data2
        },
        //店铺新增第2步信息
        changeFormData3(state,form_data3) {   
        	state.form_data3 = form_data3
        },
        
        
        setProvider(state,provider){
            state.provider = provider;
        },
        setPushData(state,push_data){
            state.clientid = push_data.clientid;
            state.token = push_data.token;
        }
    },
	actions:{
		// 领劵
		eshopCouponSend(context,id){
			
		},
		getBaiduToken(context){
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
                        uni.setStorageSync('access_token', res.data.access_token);
                        uni.setStorageSync('expires_in', res.data.expires_in);
					}
				},
			})
		},
        closePush(context){
            uni.unsubscribePush({
            	provider: context.state.provider,
            	success: (e) => {
            		uni.showToast({
            			title: "已关闭收款语音"
            		})
            	}
            })
            uni.offPush({
            	provider: context.state.provider,
            	success: (e) => {
            		
            	}
            })
        },
        openPush(context){
            uni.subscribePush({
                provider: context.state.provider,
                success: (e2) => {
                    uni.showToast({
                        title: "已开启收款语音"
                    })
                    uni.onPush({
                        provider: context.state.provider,
                        success: (e) => {
                        },
                        fail: (e)=>{
                            
                        },
                        callback: (e) => {
                            uni.showToast({
                                title: "喜来邦到账"+ (JSON.parse(e.data).data.money_num - 0) +"元"
                            });
							plus.push.createMessage( "喜来邦到账"+ (JSON.parse(e.data).data.money_num - 0) +"元");
                            uni.getStorage({
                                key: 'access_token',
                                success: function (res) {
                                    let access_token = res.data;
                                    uni.getStorage({
                                        key: 'access_token',
                                        success: function (data) {
                                            let expires_in = data.data
                                            if(Date.parse(new Date())/1000 > expires_in - 3600*72){
                                                context.dispatch("getBaiduToken");
                                            }
                                            var data={
                                                tex: "喜来邦到账"+ (JSON.parse(e.data).data.money_num - 0) +"元",
                                                tok: access_token,
                                                cuid: context.state.token,
                                                ctp: 1,
                                                lan: "zh",
                                                spd: 3,
                                                pit: 6,
                                                vol: 15
                                            }
                                            console.log('http://tsn.baidu.com/text2audio?'+param(data))
                                            var audio = new Audio();
                                            audio.src = 'http://tsn.baidu.com/text2audio?'+param(data);
                                            audio.play();
                                        }
                                    });
                                }
                            });
                            function cleanArray(actual) {
                               const newArray = []
                               for (let i = 0; i < actual.length; i++) {
                                 if (actual[i]) {
                                   newArray.push(actual[i])
                                 }
                               }
                               return newArray
                            }
                            function param(json) {
                               if (!json) return ''
                               return cleanArray(Object.keys(json).map(key => {
                                 if (json[key] === undefined) return ''
                                 return encodeURIComponent(key) + '=' +
                                        encodeURIComponent(json[key])
                               })).join('&')
                            }
                        }
                    })
                }
            })
        },
        pushInit(context,ff_openid) {
        	uni.getProvider({
        		service: "push",
        		success: (e1) => {
                    context.commit("setProvider",e1.provider[0]);
        			var info = plus.push.getClientInfo();
                    context.commit("setPushData",info);
                    console.log(ff_openid)
        			uni.request({
        				url: 'http://demo.hanyuan369.com/index.php/merchants/index/xmlogin',
        				method: "POST",
        				data: {
        					token: info.token,
        					clientid: info.clientid,
                            ff_openid: ff_openid
        				},
        				success: (res) => {
                            console.log(JSON.stringify(res))
                            if(res.data.status == 1 && res.data.data.open_audio == 1){
                                context.dispatch("openPush");
                            }else{
                                uni.showToast({
                                	title: res.data.msg
                                })
                            }
        				}
        			})
        		},
        		fail: (e) => {
        			console.log("获取推送通道失败", e);
        		}
        	});
        }
	}
})

export default store
