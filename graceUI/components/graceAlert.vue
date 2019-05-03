<template name="graceAlert">
	<view :class="[show ? 'ganimate-show grace-alert' : 'grace-alert']" :hidden="!show">
		<view class="icon gaicon" :class="['icon-'+msgtype,  msgtype]"></view>
		<view class="grace-alert-msg">{{msg}}</view>
	</view>
</template>
<script>
	export default {
		name: "graceAlert",
		props: {
			msgtype:{
				type : String,
				default : "msg"
			},
			msg: {
				type: String,
				default: ""
			},
			show:{
				type : Boolean,
				default : false
			}
		}
	}
</script>
<style>
@font-face {font-family: "gafont";
  src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAYgAAsAAAAACNgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8gUg0Y21hcAAAAYAAAABfAAABnLN3GspnbHlmAAAB4AAAAi4AAAKUUV0dImhlYWQAAAQQAAAAMQAAADYTC6HqaGhlYQAABEQAAAAgAAAAJAfaA3xobXR4AAAEZAAAABAAAAAQEAL/7mxvY2EAAAR0AAAACgAAAAoBlgC8bWF4cAAABIAAAAAfAAAAIAETAGduYW1lAAAEoAAAAUUAAAJtPlT+fXBvc3QAAAXoAAAANwAAAEgYppUxeJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWScwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByesTxTZm7438AQwzyPoR0ozAiSAwDh7gwweJztkEEOgDAIBAeppjEmfUSvHo0P8uTL+40K1IOPcMkQ2BAOC8yAGruRQG4E12WuhK+s4SdO27PVBC210mrv3ykkcZFjmvyzLPzaoh/vpp7awDNuZRC51gH6AM8SEgIAeJxNUc9rE0EUnrezs9OZ7G63+bGbbdeUpM2mVojm10ZUQg0VcioF0YJHwYP/gT8QqpeCF0FQMIGCEA9SPVTJSci5Qg8iFMJ66EE8CUJE8JSNLw2KM4+Pb2befPO+N4QRMt5WCd0mlKjEIh5ZIQSWEhW+lMxAuQG1qp/TEhlwTOBFKDSgrhFuEycgdZ8oyy39XLpkOPOO4a16pf6IsVF/imF0zBhkwxCyjEXHysPo9T3DMTBSnqfc/5fXH13B4/C/dIKDjn+M76oG3cV6aqRJSN6EAr7vEwdrsTWu2Y4d1Bsnm8tkUuB06ee13Fnwq0F5Eewk96t1CMpIQMtRcrmz1Q1nGeTDZ58WzNxpTrnhydJKPPelHQ2jdnr+9/ub71oGFW70Ubryq0wiiEBKuCrdpIzeStcqrgjnW3cAqYR98HRrtylsqavm5odb7XCxEL2Jfu3/dESxJj0ZfylRAu8hSAwUQT0UQX/Y9890j55BbxvkBvrzg0oZDdTRD7Y6aaPPqWXcm7ZfW5qAX/CDOs4CkgZgFxyba9zGq7QI1aCSRbcaZxN+EU44fAdDpJLP+1QddLsDde0CV2LWTLMFbNjrDZl69MowZ69fSq+aLnUzqAYK5XMWVagQsayVqqw/Erou4NoEo70JHk3gtjAVa//BTk9Vezvrd4ranKmw6uONzqGqHnaeHMTh/NoMpZrum9Ypd0FjYpZzwWL5fMEBhdfgBehxHQO2/xL8+j/O34yFAAB4nGNgZGBgAOKCRseeeH6brwzcLAwgcP3Hutcw+v+7/5UsvMzzgFwOBiaQKAB4yQ5gAAAAeJxjYGRgYG7438AQw8L0/93/ryy8DEARFMACAJ+ABl0EAAAABAAAAAQC/+4EAAAAAAAAAABMALwBSgAAeJxjYGRgYGBhiGZgZQABJiDmAkIGhv9gPgMAEgwBewB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICFkYmRmZGFkZWBNbWoKL+ItyojNS+9sDS1JLM4I5OtIjMxvyKTgQEApz8KfwA=');
}
.gaicon {
  font-family:"gafont" !important;
  font-size:22px;
  font-style:normal;
}
@keyframes g-show{from {top:-50px;} to {top:0;}}
.ganimate-show{animation: g-show 300ms linear forwards;}
.icon-error:before { content: "\e604";}
.icon-right:before { content: "\e60f";}
.icon-msg:before { content: "\e623";}
.grace-alert{display:flex; width:90%; padding:10px 5%; flex-wrap:nowrap; background:#FFF; position:fixed; z-index:99999; left:0; top:-60px; box-shadow:5px 3px 3px #F7F8F9;}
.grace-alert .right{color:#00B26A !important;}
.grace-alert .error{color:#FF0000 !important;}
.grace-alert .msg{color:#00B26A !important;}
.grace-alert .icon{width:25px; line-height:30px; justify-content:center; flex-shrink:0; margin-right:12px;}
.grace-alert-msg{line-height:30px; font-size:16px; overflow:hidden; justify-content:flex-start; width:100%; white-space:nowrap; text-overflow:ellipsis;}
</style>