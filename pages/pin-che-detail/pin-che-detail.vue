<template>
	
	<view style="padding: 20rpx 40rpx;">
		<view style="padding: 20rpx 40rpx;" class="bt_primary">
			<view style="position: relative; display: flex;padding: 20rpx 0;">
				<view style="position: absolute;top: 0;right: 0;font-size: 28rpx;color: blue" @click="handlerToEdit"><text style="color: black;">帖子id:</text>{{this.item.id}}</view>
			<view>
				<view style="display: flex;justify-content: center;">
					<u-avatar size="150rpx" :src="userava"></u-avatar>
				</view>
			</view>
			<view class="" style="display: flex;flex-direction: column;justify-content: center;flex: 1;padding: 20rpx 0;">
				<view style="text-align: center;font-size: 36rpx;font-weight: 600;">昵称:{{this.user.nickname}}</view>
				<!-- <view style="text-align: center;font-size: 24rpx;color: #666;margin-top: 20rpx;">12-13 00:00发布</view> -->
			</view>
		</view>
		
		  <!-- 表单 -->
		  <view>
			  <view style="padding: 10rpx 0;border-bottom:2px solid #127c72;margin-bottom: 40rpx;" class="">
					<u-button type="error " :plain="true" text="举报" @click="jubao"></u-button>

			  </view>
		  	<view style="display: flex;padding: 10rpx 0;border-bottom:2px solid #127c72;margin-bottom: 40rpx;" class="">
		  		<text style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;">起点:</text>
		  		<text style="font-size: 30rpx;font-weight: bold;">{{this.item.source}}</text>
		  	</view>
		  	<view style="display: flex;padding: 10rpx 0;border-bottom:2px solid #127c72;margin-bottom: 40rpx;" class="">
		  		<text style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;">终点:</text>
		  		<text style="font-size: 30rpx;font-weight: bold;">{{this.item.destination}}</text>
		  	</view>
		  	<view style="display: flex;padding: 10rpx 0;border-bottom:2px solid #127c72;margin-bottom: 40rpx;" class="">
		  		<text style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;">所需人数:</text>
		  		<text style="font-size: 36rpx;font-weight: bold;color: red;">{{this.item.count}}<text style="color: black;margin-left: 20rpx;">人</text></text>
		  	</view>
			<view style="display: flex;padding: 10rpx 0;border-bottom:2px solid #127c72;margin-bottom: 40rpx;" class="">
				<text style="font-size: 28rpx;margin-right: 20rpx;color:#215fa5;font-weight: bold;">出发时间:</text>
				<text style="font-size: 30rpx;font-weight: bold;">{{this.item.time}}</text>
			</view>
			
			<!--实验区域 -->
			<view style="display: flex; flex-direction: column;">
			
			  <!-- 具体内容 -->
			  <view style="font-size: 28rpx; margin-right: 20rpx; color: #215fa5; font-weight: bold;">具体内容:</view>
			  
			  <view style="flex: 1; overflow-y: auto; background: white; padding: 10rpx; font-weight: 600;">
			    <text>{{this.item.content}}</text>
			    
			    <!-- 切割 -->
			    <view style="border-top: 1px solid #919191; margin-top: 20rpx;"></view>
			    <view style="margin-top: 20rpx;"></view>
			    
			    <!-- 图片位 -->
			    <image :src="imageurl" mode="widthFix"></image>
			    <!-- <u-avatar size="150rpx" :src="imageUrl"></u-avatar> -->
			  </view>
			
			</view>

			<!-- 评论区 -->
			<view class="bt_top_primary bt_bottom_primary" style="color: #215fa5;;text-align: center;padding:  20rpx 0;margin-top: 20rpx;">
				评论区
			</view>
			<!-- 回复框 -->
			<view style="font-size;height: 220rpx;overflow-y: auto;background: white;padding: 10rpx;font-weight: 600;">
				<textarea style="width: 100%; height: 100%;" v-model="messageText" placeholder="在这里输入回复"></textarea>
			</view>
			<view style="margin-top: 10rpx;">
				<u-button type="info " :plain="true" text="点击回帖" @click="handlerPush"></u-button>
			</view>
			
			<view style="margin-top: 20rpx;"></view>	
			<!-- 回复显示 -->
			<view class="comment-container">
				<view v-for="(item,index) in this.messageList" :key="index" style="padding: 20rpx; border: 1px solid #ccc; margin-bottom: 20rpx;">
					<view style="display: flex;align-items: center;">
						<u-avatar size="80rpx" :src="messageavaurl[index]"></u-avatar>
						<view style="color: #666;margin-left: 20rpx; font-size: 20rpx;">昵称: {{messageuser[index].nickname}}</view>
						<view style="color: #666;margin-left: 20rpx; font-size: 20rpx;">时间: {{formatTime(item.time)}}</view>
					</view>
					<view style="font-size: 50rpx;">
						<text>{{item.content}}</text>
					</view>
				</view>
			</view>
		  
		  </view>
	  </view>
	</view>
</template>

<script>
	export default {
		onLoad: async function (option) {
			this.item = JSON.parse(decodeURIComponent(option.item));
			this.base64String = this.item.imgurl;
			this.convertBase64ToImage();
			this.getMessages();
			
			try {
				this.user = await this.getUser();
				this.userava = 'data:image/jpg;base64,' + this.user.avaurl;
				// console.log('this.userava:', this.userava);
			} catch (error) {
				console.error('Error while getting user information', error);
			}
		},
		data() {
			return {
				base64String:'',//储存转换后图片URL
				customStyle: {
								 // 注意驼峰命名，并且值必须用引号包括，因为这是对象
								with: '100rpx'
							},
				item:"",
				messageText:"",
				user:"",
				userava:"",
				messageuser: [],
				messageavaurl: [],
				messageList: [],
			}
		},
		methods: {
			formatTime(timestamp) {
			        const date = new Date(timestamp);
			        // 这里可以根据需要定义时间的格式
			        const year = date.getFullYear();
			        const month = String(date.getMonth() + 1).padStart(2, '0');
			        const day = String(date.getDate()).padStart(2, '0');
			        const hours = String(date.getHours()).padStart(2, '0');
			        const minutes = String(date.getMinutes()).padStart(2, '0');
			        const seconds = String(date.getSeconds()).padStart(2, '0');
			
			        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			    },
			jubao(){
				uni.request({
				  url: 'http://localhost:8088/ssmDemo_war/user/jubao',
				  method: 'POST',
				  data: {
				    id: this.item.id
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
				      this.messageList = res.data; // 注意这里将返回数据赋值给this.list
					  // console.log(this.list),
				      console.log('请求成功', res.data);
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
			},
			getMessages(){
				uni.request({
				  url: 'http://localhost:8088/ssmDemo_war/message/opt',
				  method: 'GET',
				  data: {
				    postId: this.item.id
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
				      this.messageList = res.data; // 注意这里将返回数据赋值给this.list
					  // console.log(this.list),
				      // console.log('请求成功', res.data);
				      // 这里可以处理请求成功后的逻辑
					  this.getMessagerAva(res.data)
					  
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
			},
			getMessagerAva: async function (messageList) {
				for (var i = 0; i < messageList.length; i++) {
					this.messageuser.push(await this.getUserById(messageList[i].userid));
				}
				for (var i = 0; i < this.messageuser.length; i++) {
					this.messageavaurl.push('data:image/jpg;base64,'+ this.messageuser[i].avaurl)
				}
			},
			handlerPush(){
				// console.log("handlerPush调用");
				// console.log("回复文本：", this.messageText);
				const self=this;
				uni.request({
				    url: 'http://localhost:8088/ssmDemo_war/user/message', // 请求的 URL
					// withCredentials: true,
					// crossDomain:true,
				    method: 'POST', // 请求方法：GET, POST, PUT, DELETE 等
				    data: {
				        content: this.messageText, 
				        postId: this.item.id 
				    },
				    header: {
				        'content-type': 'application/x-www-form-urlencoded', // 请求头部信息
				    },
				    success: function (res) {
				        // 请求成功时的回调函数
				        if (res.statusCode === 200) {
				            // 请求成功
				            console.log('回复成功', res.data);
				            
							const newReply = {
								userid: self.item.userid, 
								time: new Date().getTime(), 
								content: self.messageText
							};
							
							// 使用数组的 unshift 方法将新回复添加到数组的开头
							self.messageList.unshift(newReply);
							
							// 清空回复框的内容
							self.messageText = '';
							
							// 将新的messageList赋值给组件的数据
							self.$set(self, 'messageList', [...self.messageList]);
							self.getMessages();
				        } else {
				            console.log('回复失败', res.statusCode, res.data);
				            // 处理请求失败的逻辑
				        }
				    },
				    fail: function (err) {
				        // 请求失败时的回调函数
				        console.error('回复失败', err);
				        // 处理请求失败的逻辑
						uni.switchTab({
							url:"/pages/index/index"
						})
				    }
				});
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
					url:"/pages/show-all-post/show-all-post"
				})
			},
			handlerToEdit(){
				uni.navigateTo({
					url:"/pages/edit-personal/edit-personal"
				})
			}
		}
	}
</script>

<style>
page{
	background: #f4f5f4;
}
.custom-style {
		
		width: 100rpx;
	}
</style>
