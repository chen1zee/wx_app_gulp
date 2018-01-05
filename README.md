# wx_app_gulp
用gulp辅助开发微信小程序

## 使用

* (c)npm i

* src 编写 **.zee 文件，（小程序的单文件）src/pages/home/index.zee

    * .zee 单文件 大致结构如下
    
```html
<template>
    <view class="abc">
    32123213
    </view>    
</template>
```

```html
<script>
import a from '../../lib/runtime.js';

Page({
    // config 字段会编译 成 json 
    config: {
        pages: [
            'pages/home/index'
        ]    
    },
    data: {

    }
})
</script>
```

```html
<style lang="less">
.a {
    color: #000;
}

</style>
```
    
* 终端 `gulp zee-file`
* dist 为产出 目录