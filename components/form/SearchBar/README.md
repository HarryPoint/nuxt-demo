# SearchBar 搜索输入框

## 用法
### 基础用法
```html
<search-bar 
  v-model="searchValue"
  @btn-del-click="handleBtnDelClick"
  @btn-search-click="handleBtnSearchClick"/>
```

## API
参数|说明|类型|默认值
---|---|---|---
v-model|输入框的值|String|-

## event
事件名|说明|参数
---|---|---
btn-del-click|删除按钮点击事件|-
btn-search-click|搜索按钮点击事件|输入框的值