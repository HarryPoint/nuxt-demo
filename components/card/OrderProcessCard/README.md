# OrderProcessCard 订单进度卡片

## 用法

### 基础用法
```html
<order-process-card
  :progress-data="progressData"
  :progress-current-index="0"/>
```

## API
参数|说明|类型|默认值
---|---|---|---
progressData|进度条数据|Array|ProcessBar参数data的默认值 ['待确定', '待服务', '进行中', '已完成']
processCurrentIndex|当前进度的索引|String|0

## event
事件名|说明|参数
---|---|---
btn-contact-click|联系TA按钮点击事件|-
