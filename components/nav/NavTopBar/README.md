# ImageIcon 图片图标

## 用法
### 基础用法
```html
<nav-top-bar />
```

### 使用插槽&使标题居中
```html
<nav-top-bar>
  <!-- 标题 -->
  <h1 
    slot="center" 
    class="title">{{ title }}</h1>
  <!-- 搜索按钮 -->
  <div 
    slot="right" 
    class="btn-search">
    <image-icon type="search"/>
    <span>搜索</span>
  </div>
</nav-top-bar>
```
让标题文字看起来居中可以调整.nav-top-bar__content的左右内边距,这要根据实际情况来
```css
.page-accompany-header {
  /deep/ {
    .nav-top-bar__content {
      /*让标题文字看起来是居中的*/
      padding-left: 57px;
      line-height: 1.5;
    }
  }
}
```

## Slot
名称|说明
---|---
left|左侧插槽,默认是返回按钮
center|中间插槽,默认是文字"标题"
right|右侧插槽,没有为空