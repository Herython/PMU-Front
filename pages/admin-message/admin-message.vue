<template>
	<view style="padding: 20rpx 40rpx;">
		 <view class="bt_primary" style="display: flex;flex-direction: column;;background: #c6ead0;height: calc( 100vh - 90rpx);overflow-y: auto;border-radius: 20rpx;padding: 20rpx;">
			 <view class="bt_primary" style="background-color: white;padding: 20rpx;display: flex;align-items: center;justify-content: space-between;">
				 <view>管理员姓名:xxx</view>
				 <view class="bt_primary">帖子id:1222</view>
			 </view>
			 <view class="bt_primary" style="padding: 0 20rpx;flex: 1;margin-top: 20rpx;background-color: white;">
				<view style="display: flex;justify-content: center;padding: 20rpx 0;">
					<div class="bt_primary" style="padding: 20rpx 60rpx;border-radius: 60rpx;">通知内容</div>
				</view> 
				<view class="bt_primary" style="padding: 10rpx;font-size: 28rpx;">
					<text v-for="item  in 50">懵</text>
				</view>
			 </view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
