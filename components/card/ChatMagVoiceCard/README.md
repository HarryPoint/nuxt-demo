# ChatMagVoiceCard 聊天声音消息 Card

## 预览

### 基本样式

### 基本样式

## 用法

### 基础用法

```html
<chat-mag-voice-card
  v-else-if="item.itemType === 'voice'"
  :avatar-url="item.avatarUrl"
  :avatar-position="item.avatarPosition"
  :initial-audio-duration="item.initialAudioDuration"
  :audio-url="item.audioUrl"
  content-type="tail"
  @voice-click="$emit('voice-click',item,index)"/>
```

## API

| 参数                 | 说明                                       | 类型   | 默认值 |
| -------------------- | ------------------------------------------ | ------ | ------ |
| avatarUrl            | 头像 url                                   | String | -      |
| avatarPosition       | 头像位置,left:头像在左,right:头像在右      | String | left   |
| contentType          | 内容卡片类型,tail:有尾巴,square:方正有圆角 | String | tail   |
| contentBgColor       | 内容卡片的背景颜色                         | String | -      |
| text                 | 文本内容                                   | String | -      |
| initialAudioDuration | 初始的音频的长度                           | Number | 0      |
| audioUrl             | 音频的 url                                 | String | -      |

## event

| 事件名      | 说明          | 参数       |
| ----------- | ------------- | ---------- |
| voice-click | card 点击事件 | item,index |
