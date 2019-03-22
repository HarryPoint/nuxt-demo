# OperationButton 操作按钮

## 预览
### 基本样式
![image](data:image/png;base64,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)

### 基本样式

## 用法

### 基础用法

```html
<operation-button @click="handleOperationButtonClick">{{ cOperationButtonTex  }}</operation-button>
```

## API

无

## Slot

| 名称    | 说明           |
| ------- | -------------- |
| default | 按钮内容(文字) |

## event

| 事件名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| click  | 操作按钮点击事件 | -    |
