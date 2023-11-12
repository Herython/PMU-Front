<template>
	<view style="padding: 20rpx;">
		<image class="logo_1" style="display: block; margin: auto;" src="/static/img_2.jpg" ></image>
		<view style="margin: 20rpx;height: calc( 100vh - 330rpx);display: flex;flex-direction: column">
			<view class="bt_primary" style="height: 50%;margin-bottom: 20rpx;display: flex;flex-direction: column">
				<!-- 头部 -->
				<view class="bt_primary"
					style="text-align: center;font-size: 32rpx;padding: 10rpx 0; font-weight: 600;">公告栏</view>
				<!-- 主题内容 -->
				<view class="" style="padding: 20rpx 40rpx;flex: 1;overflow-y: auto">
					<!-- 子项目 -->
					
					<view @click="handlerToPath" 
						style="margin-bottom: 20rpx;text-align: center;border-radius: 20rpx;overflow: hidden;font-size: 24rpx;"
						class="bt_gary">
						<view class="bt_gary">公告1</view>
						<view style="height: 100rpx;word-break: break-all;overflow-y: auto">
							<text>
								老师分给高点呗~
							</text>
							
						</view>
					</view>
					
					
					<view @click="handlerToPath"
						style="margin-bottom: 20rpx;text-align: center;border-radius: 20rpx;overflow: hidden;font-size: 24rpx;"
						class="bt_gary">
						<view class="bt_gary">公告2</view>
						<view style="height: 100rpx;word-break: break-all;overflow-y: auto">
							<text>
								老师爱您~
							</text>
							
						</view>
					</view>
					
					<view @click="handlerToPath"
						style="margin-bottom: 20rpx;text-align: center;border-radius: 20rpx;overflow: hidden;font-size: 24rpx;"
						class="bt_gary">
						<view class="bt_gary">公告3</view>
						<view style="height: 100rpx;word-break: break-all;overflow-y: auto">
							<text>
								您看这还有滑动呢~
							</text>
							
						</view>
					</view>
					
					<view @click="handlerToPath"
						style="margin-bottom: 20rpx;text-align: center;border-radius: 20rpx;overflow: hidden;font-size: 24rpx;"
						class="bt_gary">
						<view class="bt_gary">公告4</view>
						<view style="height: 100rpx;word-break: break-all;overflow-y: auto">
							<text>
								每个公告内部也能滑哟~
								每个公告内部也能滑哟~
								每个公告内部也能滑哟~
								每个公告内部也能滑哟~
								每个公告内部也能滑哟~
								每个公告内部也能滑哟~
								每个公告内部也能滑哟~
								每个公告内部也能滑哟~
								每个公告内部也能滑哟~
							</text>
							
						</view>
					</view>
					
					
				</view>
			</view>
			<view class="bt_primary" style="height: 50%;display: flex;flex-direction: column">
				<!-- 头部 -->
				<view style="text-align: center;font-size: 32rpx;padding: 10rpx 0; font-weight: 600;">常用网站</view>
				<view class="notice_blank_2">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
						<view @click="openLink('https://sso.dlut.edu.cn/')" class="link">大连理工大学校园门户</view>
						<view @click="openLink('https://drise.dlut.edu.cn/')" class="link">大连理工大学国际信息与软件学院官网</view>
						<view @click="openLink('https://www.dlut.edu.cn/')" class="link">大连理工大学官网</view>
						<view @click="openLink('http://eda.dlut.edu.cn/index.jsp')" class="link">大连理工大学开发区校区官网</view>
						<view @click="openLink('http://teach.dlut.edu.cn/')" class="link">大连理工大学教务处</view>
						<view @click="openLink('https://webvpn.dlut.edu.cn/')" class="link">大连理工大学webVPN系统</view>
						<view @click="openLink('https://dutsa.dlut.edu.cn/')" class="link">大连理工大学学工系统</view>
						<view @click="openLink('https://cw.dlut.edu.cn/')" class="link">大连理工大学财务处</view>
						<view @click="openLink('https://perdep.dlut.edu.cn/')" class="link">大连理工大学人事处</view>
						<view @click="openLink('https://faculty.dlut.edu.cn/')" class="link">大连理工大学教师主页</view>
						<view @click="openLink('https://pfc.dlut.edu.cn/')" class="link">大连理工大学学位论文格式查询</view>
						<view @click="openLink('https://dypx.dlut.edu.cn/')" class="link">大连理工大学党员在线培训平台</view>
						<view @click="openLink('http://www.lib.dlut.edu.cn/')" class="link">大连理工大学图书馆</view>
						    
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
			}
		},
		onLoad() {

		},
		methods: {
		openLink(url) {
		    // uni.navigateTo({
		    //         url: '/pages/webview/webview?url=' + encodeURIComponent(url)
		    // });
			window.location.href = url;
			console.log(url)
		},
         handlerToPath(){
			 uni.navigateTo({
			 	url:"/pages/admin-message/admin-message"
			 })
		 }
		}
	}
</script>

<style lang="scss">
	.logo_1{
		height:300rpx;
		width: 700rpx;
	}
	.notice_blank_2{
		height: 400rpx;
		padding: 10rpx 0;
		border: 4rpx solid #163912;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		background-color: #fff;
	}
	.scroll-Y {
		height: 400rpx;
	}
	.link {
		justify-content: center;
		align-items: center;
		display: flex;
		font-size: 20rpx; /* 设置字体大小 */
		color: #007aff; /* 设置链接颜色 */
		margin-top: 10rpx;
		margin-bottom: 5rpx;
		font-weight: bold;
	}
</style>