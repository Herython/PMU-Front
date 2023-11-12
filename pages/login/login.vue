<template>
	<view style="padding: 40rpx 60rpx;">
		<view>
			<view style="font-size: 38rpx;font-weight: 600;margin-top: 180rpx">登陆</view>
			<view style="font-size: 38rpx;font-weight: 600">帮帮群promaxultra</view>
		</view>
		<view style="margin-top: 60rpx;ma">
			<u--input placeholder="请输入学号" border="surround" v-model="form.username" ></u--input>
		</view>
		<view style="margin-top: 20rpx;">
			<u-input placeholder="请输入密码" type='password' v-if="!psType" border="surround" v-model="form.password"   >
				<template slot="suffix">
					<u-icon  name="eye" @click="psType=!psType"></u-icon>
				</template>
			</u-input>
			<u-input placeholder="请输入内容" type='text' v-else border="surround" v-model="form.password"   >
				<template slot="suffix">
					<u-icon  name="eye" @click="psType=!psType"></u-icon>
				</template>
			</u-input>
		</view>
		<view style="margin-top: 40rpx;">
			<u-radio-group v-model="form.type" >
				<u-radio :customStyle="{width:'50%',display:'flex',justifyContent: 'center'}"
					v-for="(item, index) in radiolist" :key="index" :label="item.name" :name="item.name">
				</u-radio>
			</u-radio-group>
		</view>
		<view @click="handlerToLogin" style="margin-top: 40rpx;display: flex;justify-content: center;">
			<view  style="
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
    border: 1px dashed skyblue;
    height: 80rpx;
    border-radius: 30rpx;">
				<text style="color: skyblue;" >登录</text>
			</view>
		</view>
		<view @click="handlerToRegister" style="margin-top: 40rpx;display: flex;justify-content: center;">
			<view style="
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
	background:  skyblue;
	height: 80rpx;
	border-radius: 30rpx;">
				<text style="color: black;" >注册</text>
			</view>
		</view>
		<view style="position: fixed;left:0;width: 100%;bottom: 20rpx;font-size: 28rpx;color: #999;text-align: center;">
			<div>忘记密码请联系管理员</div>
			<div>忘记密码请联系管理员</div>
			<div>忘记密码请联系管理员</div>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				form:{
					username:"",
					password:"",
					type:""
				},
				loginCondition: 0,
				psType:false,
				radiolist: [{
						name: '用户',
						disabled: false
					},
					{
						name: '管理员',
						disabled: false
					}
				]
			}
		},
		methods: {
			handlerToLogin(){
				if(!/[\w\u4e00-\u9fa5]+/.test(this.form.username)){
					uni.showToast({
					title:"学号不能为空",
					icon:"none",
					})
					return
				}

				if(!/[\w\u4e00-\u9fa5]+/.test(this.form.password)){
					uni.showToast({
					title:"密码不能为空",
					icon:"none",
					})
					return
				}
				if(!/[\w\u4e00-\u9fa5]+/.test(this.form.type)){
					uni.showToast({
					title:"请选择登陆身份",
					icon:"none",
					})
					return
				}
				if(this.form.type=='用户'){
					uni.request({
					    url: 'http://localhost:8088/ssmDemo_war/user/login', // 请求的 URL
						// withCredentials: true,
						// crossDomain:true,
					    method: 'POST', // 请求方法：GET, POST, PUT, DELETE 等
					    data: {
					        cardId: this.form.username, // 你的用户名
					        password: this.form.password // 你的密码
					    },
					    header: {
					        'content-type': 'application/x-www-form-urlencoded', // 请求头部信息
					    },
					    success: function (res) {
					        // 请求成功时的回调函数
					        if (res.statusCode === 200) {
					            // 请求成功
					            console.log('登录成功', res.data);
					            // 这里可以处理登录成功后的逻辑
								uni.switchTab({
									url:"/pages/index/index"
								})
					        } else {
					            console.log('请求失败', res.statusCode, res.data);
					            // 处理请求失败的逻辑
					        }
					    },
					    fail: function (err) {
					        // 请求失败时的回调函数
					        console.error('请求失败', err);
					        // 处理请求失败的逻辑
							uni.switchTab({
								url:"/pages/index/index"
							})
					    }
					});
				}else{
					uni.request({
					    url: 'http://localhost:8088/ssmDemo_war/admin/login', // 请求的 URL
					    method: 'POST', // 请求方法：GET, POST, PUT, DELETE 等
						// withCredentials: true,
						// crossDomain:true,
					    data: {
					        cardId: this.form.username, // 你的用户名
					        password: this.form.password // 你的密码
					    },
						
					    header: {
					        'content-type': 'application/x-www-form-urlencoded' ,// 请求头部信息
							    // 'Access-Control-Allow-Origin': '*', // 允许所有源访问
							    // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', // 允许的请求方法
							    // 'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', // 允许的请求头
					    },
					    success: function (res) {
							uni.showLoading({
								title: "正在登陆中..."
							})
					        // 请求成功时的回调函数
					        if (res.statusCode === 200) {
					            // 请求成功
					            // 这里可以处理登录成功后的逻辑
								this.loginCondition=1
								if(res.data.message!="无此用户!"){
									console.log('登录成功', res.data),
									uni.hideLoading(),
									uni.navigateTo({
										url:"/pages/post/post"
									})
								}
								else{
									uni.hideLoading()
									uni.showLoading({
										title: "登陆失败..."
									})
									uni.hideLoading()
								}
					        } else {
					            console.log('请求失败', res.statusCode, res.data);
					            // 处理请求失败的逻辑
								uni.hideLoading()
								this.loginCondition=0
					        }
					    },
					    fail: function (err) {
					        // 请求失败时的回调函数
					        console.error('请求失败', err);
					        // 处理请求失败的逻辑
					    }
					});
				}
			},
			handlerToRegister() {
             uni.navigateTo({
             	url:"/pages/register/register"
             })
			}
		}
	}
</script>

<style>

</style>