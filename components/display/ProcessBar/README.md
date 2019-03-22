# ProcessBar 订单进度条

## 用法

### 基础用法
```html
<process-bar 
  :data="progressData" 
  :current-index="processCurrentIndex" />
```

## API
参数|说明|类型|默认值
---|---|---|---
data|进度条数据|Array|['待确定', '待服务', '进行中', '已完成']
currentIndex|当前进度的索引|String|0
