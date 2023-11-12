<template>
	<view style="display: flex;flex-direction: column;padding-top: 0rpx;">
		<u-sticky offset-top="0px">
			<!-- tab选中 -->
			<view style="display: flex;font-size: 30rpx;background: white;">
				<view @click="handleTabClick(item.value)" :class="[item.value==current?'text-white bg-127c72':'']"
					class="bt_primary"
					style="align-items: center;justify-content: center;display: flex;;flex: 0 0 25%;height: 80rpx;"
					v-for="item in tabList" :key="index">
					<rich-text style="text-align: center;" :nodes="item.name"></rich-text>
				</view>
			</view>
		</u-sticky>

		<!-- 内容区域 -->
		<view class="" style="flex: 1;padding: 20rpx 40rpx;">
			<!-- 分页tab -->
			<view v-show="current==1">
				<!-- 单个项目 -->
				<view v-for="item in this.list" @click="handlerToPath(`/pages/life-daiqu-detail/life-daiqu-detail`,item)"
					style="display: flex;border-radius: 60rpx;overflow: hidden;margin-bottom: 20rpx;"
					class="bt_primary">
					<view style="display: flex;flex-direction: column;align-items: center;padding: 20rpx;" class="">
						<u-avatar size="150rpx" :src="userava"></u-avatar>
						<text style="font-size: 24rpx; text-align: center;margin-top: 10rpx;">昵称:{{user.nickname}}</text>
					</view>
					<view style="display: flex;flex-direction: column;flex: 1;font-weight: 600;padding: 0 40rpx;"
						class="">
						<view style="flex: 1;display: flex;align-items: center;text-align: center;">原地址:{{item.source}}</view>
						<view style="flex: 1;display: flex;align-items: center;">送至:{{item.destination}}</view>
					</view>
				</view>
			</view>
			<view v-show="current==2">
				<!-- 单个项目 -->
				<view v-for="item in this.list" @click="handlerToPath(`/pages/pin-che-detail/pin-che-detail`,item)"
					style="display: flex;border-radius: 60rpx;overflow: hidden;margin-bottom: 20rpx;"
					class="bt_primary">
					<view style="justify-content: center;display: flex;flex-direction: column;align-items: center;padding: 20rpx;" class="">
						<u-avatar size="150rpx" :src="userava"></u-avatar>
						<text style="font-size: 24rpx; text-align: center;margin-top: 10rpx;">昵称:{{user.nickname}}</text>
					</view>
					<view style="display: flex;flex-direction: column;flex: 1;font-weight: 600;padding: 0 40rpx;"
						class="">
						<view style="padding: 20rpx 0;flex: 1;display: flex;align-items: center;text-align: center;">起点:{{item.source}}</view>
						<view style="padding: 20rpx 0;flex: 1;display: flex;align-items: center;">终点:{{item.destination}}</view>
						<view style="padding: 20rpx 0;flex: 1;display: flex;align-items: center;text-align: center;">所需人数:<text style="font-size: 60rpx;color: red;padding: 0 20rpx;">{{item.count}}</text>人</view>
						<view style="padding: 20rpx 0;flex: 1;display: flex;align-items: center;">出发时间:{{item.time}} </view>
					</view>
				</view>
			</view>
			<view v-show="current==3">
				<!-- 单个项目 -->
				<view v-for="item in this.list" @click="handlerToPath(`/pages/er-shou-detail/er-shou-detail`,item)"
					style="display: flex;border-radius: 60rpx;overflow: hidden;margin-bottom: 20rpx;"
					class="bt_primary">
					<view style="display: flex;flex-direction: column;align-items: center;padding: 20rpx;" class="">
						<u-avatar size="150rpx" :src="userava"></u-avatar>
						<text style="font-size: 24rpx; text-align: center;margin-top: 10rpx;">昵称:{{user.nickname}}</text>
					</view>
					<view style="display: flex;flex-direction: column;flex: 1;font-weight: 600;padding: 0 40rpx;"
						class="">
						<view style="flex: 1;flex: 1;display: flex;align-items: center;text-align: center;">物品名:{{item.title}}</view>
						<view style="flex: 1;display: flex;align-items: center;text-align: center;">价格:<text style="font-size: 50rpx;color: red;padding: 0 20rpx;">{{item.count}}</text></view>
						
					</view>
				</view>
			</view>
			<view v-show="current==4">
			<!-- 单个项目 -->
			<view v-for="item in this.list" @click="handlerToPath(`/pages/qi-ta-detail/qi-ta-detail`,item)"
				style="display: flex;border-radius: 60rpx;overflow: hidden;margin-bottom: 20rpx;"
				class="bt_primary">
				<view style="display: flex;flex-direction: column;align-items: center;padding: 20rpx;" class="">
						<u-avatar size="150rpx" :src="userava"></u-avatar>
					<text style="font-size: 24rpx; text-align: center;margin-top: 10rpx;">昵称:{{user.nickname}}</text>
				</view>
				<view style="display: flex;flex-direction: column;flex: 1;font-weight: 600;padding: 0 40rpx;"
					class="">
					<view style="flex: 0 0 50%;display: flex;align-items: center;text-align: center;" class="">主题:{{item.title}}</view>
					<view style="flex: 0 0 40%;display: flex;align-items: center;overflow: hidden;" class=" u-line-2">
						内容:{{item.content}}
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
			this.change(1)
			// console.log(this)			
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
				current: 1,
				tabList: [{
					name: "外卖/快递<br>代取",
					value: 1,
					type: "生活类·快递/外卖代取"
				}, {
					name: "拼车",
					value: 2,
					type: "生活类·拼车"
				}, {
					name: "二手交易",
					value: 3,
					type:"生活类·二手交易",
				}, {
					name: "其他",
					value: 4,
					type:"生活类·其他"
				}],
				curType:"",
				list:[]	,
				
				base64String:'',//储存转换后图片URL
				customStyle: {
								 // 注意驼峰命名，并且值必须用引号包括，因为这是对象
								with: '100rpx'
							},
				item:"",
				messageText:"",
				messageList: [],
				user:"",
				userava:"",
				messageuser: [],
				messageavaurl: []
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
			
			
			handlerToPath(path,item){
				// console.log(item)
				uni.navigateTo({
					url:path+'?item='+encodeURIComponent(JSON.stringify(item))
				})
			},
			handleTabClick(index) {
			    this.change(index);
			},
			  change(index) {
			    this.current = index;
			    this.curType = this.tabList[index - 1].type,
				console.log(this.curType),
			    // 发起网络请求
			    uni.request({
			      url: 'http://localhost:8088/ssmDemo_war/post/opt',
			      method: 'GET',
			      data: {
			        type: this.curType,
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
			          this.list = res.data; // 注意这里将返回数据赋值给this.list
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
			  }
		},
	}
</script>

<style>
	.text-white {
		color: white !important;
	}

	.bg-127c72 {
		background: #127c72 !important;
	}
</style>