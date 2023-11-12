<template>
	<view style="padding: 20rpx 40rpx;">
		<view>
			<u--form labelPosition="left" labelWidth="180rpx" :model="form" ref="uForm">

				<u-form-item label="发帖类型:" prop="form.type" borderBottom @click="()=>{showType = true}" ref="item1">
					<u--input v-model="form.type" disabled disabledColor="#ffffff" placeholder="发帖类型"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="主题" prop="form.subject" borderBottom ref="subject">
					<u--input v-model="form.subject" placeholder="例如 快递代取出资料等" border="none"></u--input>
				</u-form-item>
				<u-form-item label="源地址" prop="form.fromAddress" borderBottom ref="fromAddress">
					<u--input v-model="form.fromAddress" placeholder="非代取拼车业务请填无" border="none"></u--input>
				</u-form-item>
				<u-form-item label="目标地址" prop="form.toAddress" borderBottom ref="toAddress">
					<u--input v-model="form.toAddress" border="none" placeholder="非代取拼车业务请填无"></u--input>
				</u-form-item>
				<u-form-item label="出发时间" prop="form.time" borderBottom ref="time">
					<u--input v-model="form.time" border="none" placeholder="非拼车业务请填无"></u--input>
				</u-form-item>
				<u-form-item label="金额/人数" prop="form.number" borderBottom ref="number">
					<u--input v-model="form.number" type="digit" border="none" placeholder="请填写数字"></u--input>
				</u-form-item>
				<u-form-item label="详细信息" prop="form.descript" borderBottom ref="descript">
					<u--textarea v-model="form.descript" placeholder="请输入内容"></u--textarea>
				</u-form-item>
				<u-form-item label="上传图片" prop="form.file" borderBottom ref="descript">
					<u-upload :fileList="form.file" @afterRead="afterReadImg"  name="1" multiple
						:maxCount="10"></u-upload>
						<!-- 后加内容@he -->
					<!-- <view v-if="form.file && form.file.length">
						<view v-for="(item,index) in form.file" :key="index">
							<image :src="item.url" mode="aspectFill" style="width: 100px; height: 100px; margin-top: 10px"></image>
						</view>
					</view>	 -->			
				</u-form-item>
			</u--form>
		</view>
		<view style="margin-top: 10rpx;">
			<u-button type="info " :plain="true" text="点击发帖" @click="handlerPush"></u-button>
		</view>
		<view>
			<u-action-sheet :show="showType" :actions="actions" title="请选择" description=" " @close="showType = false"
				@select="handlsershowTypeSelect">
			</u-action-sheet>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actions: [{
						name: "生活类·快递/外卖代取"
					},
					{
						name: "生活类·拼车"
					},
					{
						name: "生活类·二手交易"
					},
					{
						name: "生活类·其他"
					},
					{
						name: "学习类·学习资料"
					},
					{
						name: "学习类·比赛招募"
					},
					{
						name: "学习类·其他"
					},
				],
				showType: false,
				form: {
					type: "",
					subject: "",
					fromAddress: "",
					toAddress: "",
					number: "",
					descript:"",
					// file:[],
					file:"",
				}
			}
		},
		methods: {
			afterRead({file}){
				this.form.file=[
					{
						...file[0]
					}
				]
			},
			// async afterReadImg(event) {
			// 	try {
			// 		const base64Data = await this.getBlobData(event.file[0].url);
			// 		this.form.file.push({ url: `data:image/jpeg;base64,${base64Data}` });
			// 	} catch (error) {
			// 		console.error('错误：' + error);
			// 	}
			// },
			handlerPush(){
				console.log('>>>>>>>>>>this.form',this.form)
				if(!/[\w\u4e00-\u9fa5]+/.test(this.form.type)){
					uni.showToast({
					title:"类型不能为空",
					icon:"none",
					})
					return
				}
				if(!/[\w\u4e00-\u9fa5]+/.test(this.form.subject)){
					uni.showToast({
					title:"主题不能为空",
					icon:"none",
					})
					return
				}
				if(!/[\w\u4e00-\u9fa5]+/.test(this.form.fromAddress)){
					uni.showToast({
					title:"源地址不能为空",
					icon:"none",
					})
					return
				}
				if(!/[\w\u4e00-\u9fa5]+/.test(this.form.toAddress)){
					uni.showToast({
					title:"目标地址不能为空",
					icon:"none",
					})
					return
				}
				if(!/[\w\u4e00-\u9fa5]+/.test(this.form.number)){
					uni.showToast({
					title:"金额/人数不能为空",
					icon:"none",
					})
					return
				}
				if(!/[\w\u4e00-\u9fa5]+/.test(this.form.descript)){
					uni.showToast({
					title:"描述不能为空",
					icon:"none",
					})
					return
				}
				// if(!/[\w\u4e00-\u9fa5]+/.test(this.form.file)){
				// 	uni.showToast({
				// 	title:"图片不能为空",
				// 	icon:"none",
				// 	})
				// 	return
				// }
				console.log(this.form)
				uni.request({
					    url: 'http://localhost:8088/ssmDemo_war/user/post', // 请求的 URL
						// withCredentials: true,
						// crossDomain:true,
					    method: 'POST', // 请求方法：GET, POST, PUT, DELETE 等
					    data: {
							 type: this.form.type, 
					         title: this.form.subject,
							 source: this.form.fromAddress,
							 destination: this.form.toAddress,
							 time: this.form.time,
							 count: this.form.number,
							 content: this.form.descript,
							 imgUrl: this.form.file
					    },
					    header: {
					        'content-type': 'application/x-www-form-urlencoded', // 请求头部信息
							    // 'Access-Control-Allow-Origin': '*', // 允许所有源访问
							    // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', // 允许的请求方法
							    // 'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', // 允许的请求头
					    },
					    success: function (res) {
					        // 请求成功时的回调函数
					        if (res.statusCode === 200) {
					            // 请求成功
					            console.log('发布成功', res.data);
					            // 这里可以处理登录成功后的逻辑
								uni.switchTab({
									url:"/pages/index/index"
								})
					        } else {
					            console.log('请求失败', res.statusCode, res.data);
					            // 处理请求失败的逻辑
								uni.switchTab({
									url:"/pages/index/index"
								})
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
				},
			handlsershowTypeSelect(res) {
				this.form.type = res.name
			},
			async afterReadImg(event) {
			  try {
				const base64Data = await this.getBlobData(event.file[0].url);
				this.form.file = base64Data;
				console.log(this.form.file)
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
				  success: res => {102
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
		}
	}
</script>

<style>

</style>