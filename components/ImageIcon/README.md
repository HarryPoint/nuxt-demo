# ImageIcon 图片图标

## 注意
把所有图片放在一个index.vue可能会导致打包过大
所以现在正在分开放

## 用法

### 基础用法
```html
<image-icon type="vip_1" />
```

### 自定义图片地址和大小
```html
<image-icon 
  :url="require('./images/icon_ss.png')" 
  :width="50"
  :height="50"/>
```

## API
参数|说明|类型|默认值
---|---|---|---
type|图标的类型，有哪些图标请参考组件images文件夹中的图标文件，图标文件名icon-vip-1.png去掉前缀和后缀对应的type值为vip-1|String|-
url|图标的url|String|-
width|图标的宽度,如果为数字将进行rem转换|[String, Number]|-
height|图标的高度,如果为数字将进行rem转换|[String, Number]|-

## event
支持$listeners中的所有事件
