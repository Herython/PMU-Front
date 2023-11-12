# 文件夹说明
本来前端的头像处是要读取后端数据，但是怕太麻烦就对前端做一个随机数，让它在1-20.jpg中随机展示，充当头像。
# 随机数说明
uniapp里随机数（这里是1-20）`num=Math.floor(Math.random()*20+1)`
# 对应前端代码更改部分
```
<view>
    <view style="display: flex;justify-content: center;">
        <u-avatar size="150rpx" src="https://img01.yzcdn.cn/vant/cat.jpeg"></u-avatar>
    </view>
</view>
```
中的`src`值
注：**src里不能是相对路径**
//假如嫌麻烦就改成<image>这个标签，然后image的标签里src可以是相对地址，也就是说直接把图片存在`static`文件夹里面就可以了。
类似于`<image src="/static/image/"+num+".jpg"></image>`
具体的style样式请查看https://uniapp.dcloud.net.cn/component/image.html#image