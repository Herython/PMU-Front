<template>
	<view style="padding: 20rpx 40rpx;">
		<view style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
			<u-upload :fileList="fileList1" @afterRead="afterReadAva" @delete="deletePic"  multiple
				:maxCount="10"></u-upload>
			<text style="font-size: 28rpx;color: #999;">(上传头像)</text>
		</view>
		<view style="display: flex;align-items: center;margin-top: 40rpx;">
			<text style="width: 180rpx;text-align-last: justify;font-size: 30rpx;">*昵称：</text>
			<u--input placeholder="请输入内容" border="surround" v-model="form.nickName" ></u--input>
		</view>
		<view style="display: flex;align-items: center;margin-top: 40rpx;">
			<text style="width: 180rpx;text-align-last: justify;font-size: 30rpx;">*真实姓名：</text>
			<u--input placeholder="请输入内容" border="surround" v-model="form.realName" ></u--input>
		</view>
		<view style="display: flex;align-items: center;margin-top: 40rpx;">
			<text style="width: 180rpx;text-align-last: justify;font-size: 30rpx;">*学号：</text>
			<u--input placeholder="请输入内容" border="surround" v-model="form.number"></u--input>
		</view>
		<view style="display: flex;align-items: center;margin-top: 40rpx;">
			<text style="width: 180rpx;text-align-last: justify;font-size: 30rpx;">*年龄：</text>
			<u--input placeholder="请输入内容" border="surround" v-model="form.age"></u--input>
		</view>
		<view style="display: flex;align-items: center;margin-top: 40rpx;">
			<text style="width: 180rpx;text-align-last: justify;font-size: 30rpx;">*性别：</text>
			<u-radio-group v-model="form.sex" >
				<u-radio :customStyle="{width:'50%',display:'flex',justifyContent: 'center'}"
					v-for="(item, index) in radiolist" :key="index" :label="item.name" :name="item.name"
					@change="radioChange">
				</u-radio>
			</u-radio-group>
		</view>
		<view style="display: flex;align-items: center;margin-top: 40rpx;">
			<text style="width: 180rpx;text-align-last: justify;font-size: 30rpx;">*密码：</text>
			
			<u-input placeholder="请输入内容" type='password' v-if="!psType" border="surround" v-model="form.password"   >
				<template slot="suffix">
					<u-icon  name="eye" @click="showPassword"></u-icon>
				</template>
			</u-input>
			<u-input placeholder="请输入内容" type='text' v-else border="surround" v-model="form.password"   >
				<template slot="suffix">
					<u-icon  name="eye" @click="showPassword"></u-icon>
				</template>
			</u-input>
			

			
		</view>
		<view style="display: flex;align-items: center;margin-top: 40rpx;">
			<text style="width: 180rpx;text-align-last: justify;font-size: 30rpx;">*密码确认：</text>
			<u-input placeholder="请输入内容" type='password' v-if="!psType" border="surround" v-model="form.confirmPassword"   >
				<template slot="suffix">
					<u-icon  name="eye" @click="showPassword"></u-icon>
				</template>
			</u-input>
			<u-input placeholder="请输入内容" type='text' v-else border="surround" v-model="form.confirmPassword"   >
				<template slot="suffix">
					<u-icon  name="eye" @click="showPassword"></u-icon>
				</template>
			</u-input>
			
		</view>
		<view style="display: flex;flex-direction: column;margin-top: 40rpx;">
			<text style="width: 180rpx;text-align-last: justify;font-size: 30rpx;margin-bottom: 10rpx;">*个人简介：</text>
			<u--textarea v-model="form.description" placeholder="请输入内容"></u--textarea>

		</view>
		<view style="display: flex;flex-direction: column;margin-top: 40rpx;">
			<text style="width: 240rpx;text-align-last: justify;font-size: 30rpx;">上传玉兰卡照片：</text>
			<div class="" style="display: flex;justify-content: center;">
				<u-upload fileList="fileList2" @afterRead="afterReadCard" @delete="deletePic"
				multiple:maxCount="10"></u-upload>
			</div>
		
		</view>
		<view>
			   <u-checkbox
			                :customStyle="{marginBottom: '8px'}"
			                label="已经阅并同意(微信软件服务及许可协议)"
			                name="xx"
			            />
				
		</view>
		<view>
					<u-button type="primary" text="注册" @click="handlerRegister"></u-button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				psType:false,
				form:{
					 nickName:"",
					 realName:"",
					 sex:"",
					 age:"",
					 number:"",
					 password:"",
					 confirmPassword:"",
					 description:"",
					 avatarUrl:"",
					 cardImageUrl:""
				},
				radiolist: [{
						name: "男"
					},
					{
						name: "女"
					}
				],
				urlList: {
					avatarUrl: '', // Variable to store the uploaded avatar URL
					cardImageUrl: '', // Variable to store the uploaded card image URL
				}
			}
		},
		methods: {
		async afterReadAva(event) {
		  try {
			const base64Data = await this.getBlobData(event.file[0].url);
			this.form.avatarUrl = base64Data;
		  } catch (error) {
			console.error('Error: ' + error);
		  }
		},
		async afterReadCard(event) {
		  try {
			const base64Data = await this.getBlobData(event.file.url);
			this.form.cardImageUrl = base64Data;
		  } catch (error) {
			console.error('Error: ' + error);
		  }
		},
		getBlobData(blobUrl) {
		  return new Promise((resolve, reject) => {
			uni.request({
			  url: blobUrl,
			  method: 'GET',
			  responseType: 'arraybuffer',
			  success: res => {
				if (res.statusCode === 200) {
				  const base64Data = uni.arrayBufferToBase64(res.data);
				  // console.log(base64Data);

				  // 将base64Data解决Promise
				  resolve(base64Data);
				} else {
				  console.error('Failed to fetch Blob data. Status code: ' + res.statusCode);
				  reject('Failed to fetch Blob data');
				}
			  },
			  fail: error => {
				console.error('Failed to fetch Blob data: ' + error);
				reject('Failed to fetch Blob data');
			  },
			});
		  });
		},
		 handlerRegister(){
			 if(!/[\w\u4e00-\u9fa5]+/.test(this.form.nickName)){
			 	uni.showToast({
			 	title:"昵称不能为空",
			 	icon:"none",
			 	})
			 	return
			 }
			 if(!/[\w\u4e00-\u9fa5]+/.test(this.form.realName)){
			 	uni.showToast({
			 	title:"姓名不能为空",
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
			 if(!/[\w\u4e00-\u9fa5]+/.test(this.form.confirmPassword)){
			 	uni.showToast({
			 	title:"确认不能为空",
			 	icon:"none",
			 	})
			 	return
			 }
			 if(!/[\w\u4e00-\u9fa5]+/.test(this.form.number)){
			 	uni.showToast({
			 	title:"学号不能为空",
			 	icon:"none",
			 	})
			 	return
			 }
			 if(!/[\w\u4e00-\u9fa5]+/.test(this.form.age)){
			 	uni.showToast({
			 	title:"年龄不能为空",
			 	icon:"none",
			 	})
			 	return
			 }
			 if(!/[\w\u4e00-\u9fa5]+/.test(this.form.description)){
			 	uni.showToast({
			 	title:"描述不能为空",
			 	icon:"none",
			 	})
			 	return
			 }
			 if(!/[\w\u4e00-\u9fa5]+/.test(this.form.file)){
			 	uni.showToast({
			 	title:"图片不能为空",
			 	icon:"none",
			 	})
			 	return
			 }
			 uni.request({
			     url: 'http://localhost:8088/ssmDemo_war/guest/register', // 请求的 URL
			     method: 'POST', // 请求方法：GET, POST, PUT, DELETE 等
			     data: {
			         cardId: this.form.number,
					 nickName:this.form.nickName,
					 realName:this.form.realName,
					 age:this.form.age,
					 password:this.form.password,
					 sex:this.form.sex,
					 secretQuestion:"null",
					 avaUrl:this.form.avatarUrl,
					 cardUrl:this.form.cardImageUrl,
					 introduction:this.form.description
			     },
			     header: {
			         'content-type': 'application/x-www-form-urlencoded' // 请求头部信息
			     },
			     success: function (res) {
			 		uni.navigateTo({
			 			url:"/pages/post/post"
			 		})
			         // 请求成功时的回调函数
			         if (res.statusCode === 200) {
			             // 请求成功
			             console.log('注册成功', res.data);
			             // 这里可以处理登录成功后的逻辑
			         } else {
			             console.log('请求失败', res.statusCode, res.data);
			             // 处理请求失败的逻辑
			         }
			     },
			     fail: function (err) {
			         // 请求失败时的回调函数
			         console.error('请求失败', err);
			         // 处理请求失败的逻辑
			     }
			 });
		 },
         showPassword(){
			 console.log(this.psType)
			 this.psType=!this.psType
		 },
		 
		}
	}
</script>

<style>
.u-upload{
	flex: 0!important;
}
</style>