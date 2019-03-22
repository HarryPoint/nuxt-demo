# SkillRecommendOkamiList 按技能推荐大神列表

# 用法

### 基础用法
```html
<skill-recommend-okami 
  :data="recommendPugbList" 
  title="绝地求生" />
```

## API
参数|说明|类型|默认值
---|---|---|---
data|渲染列表的数据,格式请参照代码的里的注释|Array|[]
title|列表的标题|String|标题

## event
事件名|说明|参数
---|---|---
btn-more-click|更多按钮点击事件|-
item-click|列表项点击事件,如果要阻止默认跳转,列表项的linkTo可以为空字符串|列表项的索引
