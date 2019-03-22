# RecommendOkamiScrollList 推荐大神水平滚动列表

## 用法

### 基础用法
```html
<recommend-okami-scroll :data="cRecommendList" />
```

## API
参数|说明|类型|默认值
---|---|---|---
data|渲染列表的数据,格式请参照代码的里的注释|Array|[]

## event
事件名|说明|参数
---|---|---
btn-more-click|更多按钮点击事件|-
item-click|列表项点击事件|列表项的索引
