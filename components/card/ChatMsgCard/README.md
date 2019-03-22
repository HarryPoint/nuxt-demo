# ChatMsgCard 聊天消息 Card

## 预览

### 基本样式

### 基本样式

## 用法

### 基础用法

```html
<chat-msg-card
  v-bind="$attrs"
  :avatar-position="avatarPosition"
  :class="cCardClass"
  content-type="tail"
  class="chat-mag-voice-card"
  v-on="$listeners"
  @content-click="handleContentClick">
  <!-- 头像在左侧时 -->
  <div
    v-if="avatarPosition==='left'"
    class="chat-msg-gift-center__left">
    {{ initialAudioDuration }}"
  </div>
  <div
    v-if="avatarPosition==='left'"
    class="chat-msg-gift-center__center">
    <image-icon-chat-audio
      :playing="isAudioPlaying"/>
  </div>
  <!-- 头像在右侧时 -->
  <div
    v-if="avatarPosition==='right'"
    class="chat-msg-gift-center__left">
    <image-icon-chat-audio
      :is-left="true"
      :playing="isAudioPlaying"/>
  </div>
  <div
    v-if="avatarPosition==='right'"
    class="chat-msg-gift-center__center">
    {{ initialAudioDuration }}{{ audioUrl }}"
  </div>
  <audio
    v-if="audioUrl"
    ref="audio"
    :src="audioUrl"
    style="display: none"
    @playing="onAudioPlaying"
    @pause="onAudioPause"
    @ended="onAudioEnded"/>
</chat-msg-card>
```

## API
参数|说明|类型|默认值
---|---|---|---
avatarUrl|头像url|String|-
avatarPosition|头像位置,left:头像在左,right:头像在右|String|left
contentType|内容卡片类型,tail:有尾巴,square:方正有圆角|String|tail
contentBgColor|内容卡片的背景颜色|String|-
text|文本内容|String|-

## event

| 事件名      | 说明          | 参数       |
| ----------- | ------------- | ---------- |
| avatar-click | 头像点击事件 | - |
| content-click | 内容点击事件 | - |
