<template>
	<view style="padding: 20rpx 40rpx;">
		 <view class="bt_primary" style="border-radius: 20rpx;padding: 20rpx;margin-bottom: 20rpx;" v-for="item in postList">
			 <view style="font-size: 28rpx;padding: 20rpx;position: relative;" class="bt_primary">
				 <view>发布人id:{{item.userid}}</view>
				 <view>发布类别:{{item.type}}</view>
				 <view style="position: absolute;top: 10rpx;right: 10rpx;" class="bt_primary">帖子id:{{item.id}}</view>
			 </view>
			 <view style="text-align: center;margin-top: 20rpx;padding: 5rpx 0;" @click="handlerToPath(item)" class="bt_primary">点击查看原帖</view>
				<view class="bt_primary" @click="deletePost(item.id)" style="text-align: center;margin-top: 20rpx;padding: 5rpx 0;">删除</view>

<!-- 			<view style="text-align: center;margin-top: 20rpx;display: flex;justify-content: space-between;">

				<!-- <view class="bt_primary" @click="deletePost(item.id)" style="flex: 1;text-align: center;margin-left: 10rpx;">删除</view> -->
<!-- 				<view class="bt_primary" @click="deletePost(item.id)" style="text-align: center;margin-top: 20rpx;padding: 5rpx 0;">删除</view> -->
				
			</view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				postList: [],
				path: ""
			}
		},
		methods: {
			handlerToPath(item){
				// console.log(item.type)
				
				if(item.type=='生活类·快递/外卖代取'){
					this.path='/pages/life-daiqu-detail/life-daiqu-detail'
				}
				else if(item.type=='生活类·拼车'){
					this.path='/pages/pin-che-detail/pin-che-detail'
				}
				else if(item.type=='生活类·二手交易'){
					this.path='/pages/er-shou-detail/er-shou-detail'
				}
				else if(item.type=='生活类·其他'){
					this.path='/pages/qi-ta-detail/qi-ta-detail'
				}
				else if(item.type=='学习类·学习资料'){
					this.path='/pages/study-ziliao-detail/study-ziliao-detail'
				}
				else if(item.type=='学习类·比赛招募'){
					this.path='/pages/bi-sai-detai/bi-sai-detai'
				}
				else if(item.type=='学习类·其他'){
					this.path='/pages/study-other-detail/study-other-detail'
				}
				else{
					console.log(item.type)
				}
				uni.navigateTo({
					url:this.path+'?item='+encodeURIComponent(JSON.stringify(item))
				})
			},
			deletePost(id){
				console.log(id),
				uni.request({
				  url: 'http://localhost:8088/ssmDemo_war/post/opt',
				  method: 'Post',
				  data: {
				      postId: id,
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
					  console.log('请求成功',res.data)
				      // console.log('请求成功', res.data);
				      // 这里可以处理请求成功后的逻辑
					  this.refresh()
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
				})
				// onLoad()
			},
			refresh(){
				uni.request({
				  url: 'http://localhost:8088/ssmDemo_war/user/post',
				  method: 'GET',
				  // header: {
				  //   'content-type': 'application/x-www-form-urlencoded',
				  //   // 'Access-Control-Allow-Origin': '*',
				  //   // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				  //   // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
				  // },
				  success: (res) => {
				    if (res.statusCode === 200) {
				      // 请求成功
				      this.postList = res.data; // 注意这里将返回数据赋值给this.list
					  console.log('请求成功',res.data)
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
			},
			onLoad(){
				uni.request({
				  url: 'http://localhost:8088/ssmDemo_war/user/post',
				  method: 'GET',
				  // header: {
				  //   'content-type': 'application/x-www-form-urlencoded',
				  //   // 'Access-Control-Allow-Origin': '*',
				  //   // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				  //   // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
				  // },
				  success: (res) => {
				    if (res.statusCode === 200) {
				      // 请求成功
				      this.postList = res.data; // 注意这里将返回数据赋值给this.list
					  console.log('请求成功',res.data)
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
			}
		}
	}
</script>

<style>

</style>
