<template>
	<view style="padding: 20rpx 40rpx;">
		<view style="position: relative;">
			<view style="position: absolute;top: 0;right: 0;font-size: 28rpx;color: blue" @click="handlerToEdit">更改个人信息</view>
			<view style="display: flex;justify-content: center;">
				<u-avatar size="150rpx" :src="userava"></u-avatar>
			</view>
			<view style="text-align: center;font-size: 36rpx;font-weight: 600;margin-top: 20rpx;">{{this.user.nickname}}</view>
		</view>
		<!-- 表单 -->
		<view>
			<view style="display: flex;padding: 10rpx 0;border-bottom:2px solid #127c72;margin-bottom: 40rpx;" class="">
				<text style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;">真实姓名:</text>
				<text style="font-size: 30rpx;font-weight: bold;">{{this.user.realname}}</text>
			</view>
			<view style="display: flex;padding: 10rpx 0;border-bottom:2px solid #127c72;margin-bottom: 40rpx;" class="">
				<text style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;">学号:</text>
				<text style="font-size: 30rpx;font-weight: bold;">{{this.user.cardid}}</text>
			</view>
			<view style="display: flex;padding: 10rpx 0;border-bottom:2px solid #127c72;margin-bottom: 40rpx;" class="">
				<text style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;">性别:</text>
				<text style="font-size: 30rpx;font-weight: bold;">{{this.user.sex}}</text>
			</view>
			<view>
				<view style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;">个人简介:</view>
				<view style="font-size;height: 220rpx;overflow-y: auto;background: white;padding: 10rpx;font-weight: 600;">
					<text >{{this.user.introduction}}</text>
				</view>
			</view>
			<view @click="handlerToAll" style="border-color: #215fa5;;margin-top: 60rpx;;justify-content: center;;text-align: center;height: 80rpx;display: flex;;align-items: center;border-radius: 40rpx;" class="bt_primary">查看所有发布的帖子</view>
			<view @click="logout" style="border-color: #215fa5;;margin-top: 60rpx;;justify-content: center;;text-align: center;height: 80rpx;display: flex;;align-items: center;border-radius: 40rpx;" class="bt_primary">退出登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad: async function (option){
			uni.request({
			  url: 'http://localhost:8088/ssmDemo_war/user/info',
			  method: 'GET',
			  header: {
			    'content-type': 'application/x-www-form-urlencoded',
			    // 'Access-Control-Allow-Origin': '*',
			    // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			    // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
			  },
			  success: (res) => {
			    if (res.statusCode === 200) {
			      // 请求成功
			      this.user = res.data; // 注意这里将返回数据赋值给this.list
				  // console.log(this.user);
				  console.log('请求成功')
			      // console.log('请求成功', res.data);
			      // 这里可以处理请求成功后的逻辑
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
			try {
					this.user = await this.getUser();
					console.log("this.user.nickname",this.user.nickname);
					
					this.userava = 'data:image/jpg;base64,' + this.user.avaurl;
					// console.log('this.userava:', this.userava);
				} catch (error) {
					console.error('Error while getting user information', error);
				}
			
		},
		data() {
			return {
				item:"",
				user:"",
				userava:"",
			}
		},
		methods: {
			getMessagerAva: async function (messageList) {
				for (var i = 0; i < messageList.length; i++) {
					this.messageuser.push(await this.getUserById(messageList[i].userid));
				}
				for (var i = 0; i < this.messageuser.length; i++) {
					this.messageavaurl.push('data:image/jpg;base64,'+ this.messageuser[i].avaurl)
				}
			},
			getUser() {
				return new Promise((resolve, reject) => {
					uni.request({
						url: 'http://localhost:8088/ssmDemo_war/user/info',
						method: 'GET',
						data: {
							id: this.item.userid,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
							'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
						},
						success: (res) => {
							if (res.statusCode === 200) {
								// 请求成功
								const user = res.data;
								console.log('获取用户请求成功', user);
								resolve(user); // 将user传递给resolve
			
							} else {
								console.log('请求失败', res.statusCode, res.data);
								reject('请求失败'); // 将错误信息传递给reject
							}
						},
						fail: (err) => {
							// 请求失败时的回调函数
							console.error('请求失败', err);
							reject('请求失败'); // 将错误信息传递给reject
						},
					});
				});
			},
			getUserById(userid) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: 'http://localhost:8088/ssmDemo_war/user/info',
						method: 'GET',
						data: {
							id: userid,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
							'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
						},
						success: (res) => {
							if (res.statusCode === 200) {
								// 请求成功
								const user = res.data;
								console.log('获取用户请求成功', user);
								resolve(user); // 将user传递给resolve
			
							} else {
								console.log('请求失败', res.statusCode, res.data);
								reject('请求失败'); // 将错误信息传递给reject
							}
						},
						fail: (err) => {
							// 请求失败时的回调函数
							console.error('请求失败', err);
							reject('请求失败'); // 将错误信息传递给reject
						},
					});
				});
			},
			convertBase64ToImage(){
				this.imageurl = 'data:image/jpg;base64,'+ this.base64String;
			},
			
			handlerToAll(){
				uni.navigateTo({
					url:"/pages/show-all-post/show-all-post",
					
				})
			},
			logout(){
				uni.navigateTo({
					url:"/pages/login/login",
				})
			},
			handlerToEdit(){
				uni.navigateTo({
					url:"/pages/edit-personal/edit-personal"+"?user="+encodeURIComponent(JSON.stringify(this.user)),
				})
			}
		}
	}
</script>

<style>
page{
	background: #f4f5f4;
}

</style>
