<template>
	<view style="padding: 20rpx 40rpx;">
		<view style="position: relative;">
			<view style="display: flex;justify-content: center;">
				<u-avatar size="150rpx" :src="userava"></u-avatar>
			</view>
			<view style="text-align: center;font-size: 36rpx;font-weight: 600;margin-top: 20rpx;">{{this.user.nickname}}</view>
		</view>
		<!-- 表单 -->
		<view>
			<view style="display: flex;padding: 10rpx 0;border-bottom:2px solid #127c72;margin-bottom: 40rpx;" class="">
				<text style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;">昵称:</text>
				<input v-model="nickName" style="font-size: 30rpx;font-weight: bold;" placeholder="昵称"></input>
			</view>
<!-- 			<view style="display: flex;padding: 10rpx 0;border-bottom:2px solid #127c72;margin-bottom: 40rpx;" class="">
				<text style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;">学号:</text>
				<input style="font-size: 30rpx;font-weight: bold;" placeholder="学号"></input>
			</view -->
<!-- 			<view style="display: flex;padding: 10rpx 0;border-bottom:2px solid #127c72;margin-bottom: 40rpx;" class="">
				<text style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;">性别:</text>
				<div>
					<u-radio-group v-model="radiovalue1" @change="groupChange">
						<u-radio :customStyle="{width:'50%',display:'flex',justifyContent: 'center',marginLeft:'10rpx'}"
							v-for="(item, index) in radiolist" :key="index" :label="item.name" :name="item.name"
							@change="radioChange">
						</u-radio>
					</u-radio-group>
				</div>
			</view> -->
			<view>
				<view style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;margin-bottom: 20rpx">个人简介:</view>
				<textarea v-model="intro"  style="font-size;height: 220rpx;overflow-y: auto;background: white;padding: 10rpx;font-weight: 600;">
					
				</textarea>
			</view>
			<!-- <view style="border-color: #215fa5; margin-top: 60rpx; text-align: center; height: 80rpx; display: flex; align-items: center; justify-content: center; border-radius: 40rpx;" class="bt_primary"> -->
				<!-- <u-button type="info" :plain="true" text="修改" @click="update"></u-button> -->
				<view @click="update" style="border-color: #215fa5;;margin-top: 60rpx;;justify-content: center;;text-align: center;height: 80rpx;display: flex;;align-items: center;border-radius: 40rpx;" class="bt_primary">修改</view>
				
			<!-- </view>		 -->
		</view>
	</view>
</template>

<script>
	export default {
		onLoad: async function(option){
			const user = JSON.parse(decodeURIComponent(option.user));
			console.log(user)
			this.user=user;
			this.userava = 'data:image/jpg;base64,' + this.user.avaurl;
			// console.log("this.userava",this.userava)
		},
		data() {
			return {
				// radiolist: [{
				// 		name: "男"
				// 	},
				// 	{
				// 		name: "女"
				// 	}
				// ],
				nickName: "",
				intro: "",
				user:"",
				userava:""
			}
		},
		methods: {
			update(){
				
				uni.request({
				  url: 'http://localhost:8088/ssmDemo_war/user/update',
				  method: 'POST',
				  data: {
				    nickName: this.nickName,
					intro: this.intro,
				  },
				  header: {
				    'content-type': 'application/x-www-form-urlencoded',
				    // 'Access-Control-Allow-Origin': '*',
				    // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				    // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
				  },
				  success: (res) => {
				    if (res.statusCode === 200) {
				      // 请求成功
				      this.messageList = res.data; // 注意这里将返回数据赋值给this.list
					  // console.log(this.list),
				      console.log('请求成功', res.data);
				      // 这里可以处理请求成功后的逻辑
					  uni.$emit('forceUpdate'); // 发送事件通知刷新
					         
					  uni.navigateTo({
					  	url:"/pages/login/login",
					  	
					  })
				    } else {
				      console.log('请求失败', res.statusCode, res.data);
				      // 处理请求失败的逻辑
				    }
				  },
				  fail: (err) => {
				    // 请求失败时的回调函数
				    console.error('请求失败', err);
				    // 处理请求失败的逻辑
				  },
				});
			}
		}
	}
</script>

<style>
page{
	background: #f4f5f4;
}

</style>
