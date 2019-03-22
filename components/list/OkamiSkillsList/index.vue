<template>
  <ul class="okami-skills-list">
    <li 
      v-for="(item,index) in data" 
      :key="index"
      class="list-item"
      @click="$emit('item-click',item,index)">
      <nuxt-link 
        :to="item.linkTo || ''" 
        class="list-card">
        <!-- 图片 -->
        <div class="pic-container">
          <img 
            :src="item.pic"
            class="pic" 
            alt="">
          <span 
            v-if="item.discount" 
            class="discount">{{ item.discount }}</span>
        </div>
        <div class="list-card-center">
          <!-- 标题 -->
          <h4 class="title">
            <span class="title-text">{{ item.title }}</span>
            <level-label 
              :type="item.level"
              class="title-icon"
            />
          </h4>
          <p class="order-times">接单:{{ item.orderTimes }}次</p>
          <!-- 标签列表 -->
          <skill-tags-list
            v-if="item.tags && item.tags.length" 
            :data="item.tags" 
            class="tags-ist"/>
          <!-- 操作按钮 -->
          <span 
            v-if="item.video" 
            class="btn btn-play"
            @click="$emit('btn-play-click',item,index)">
            <image-icon type="play" />
          </span>
          <span 
            v-if="item.voice" 
            class="btn btn-voice"
            @click="$emit('btn-voice-click',item,index)">
            <image-icon type="voice" />
          </span>
        </div>
        <div class="list-card-right">
          <!-- 现价 -->
          <p class="price">{{ item.price }}</p>
          <!-- 原价 -->
          <p 
            v-if="item.originalPrice" 
            class="original-price"><del>{{ item.originalPrice }}</del></p>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import ImageIcon from '@/components/imageIcon'
import LevelLabel from '@/components/label/LevelLabel'
import SkillTagsList from '@/components/list/SkillTagsList'
export default {
  components: {
    ImageIcon,
    LevelLabel,
    SkillTagsList
  },
  props: {
    data: {
      type: Array,
      default() {
        return [
          // {
          //   pic: 'http://119.27.167.20:8008//cover/5b63b9b218866.jpg',
          //   title: '英雄联盟',
          //   level: '中级',
          //   originalPrice: '14Y币/半小时',
          //   price: '9Y币/半小时',
          //   orderTimes: 13,
          //   tags: ['男神系', '高冷系', '暖男系', '男神系', '高冷系', '暖男系'],
          //   discount: '2免1',
          //   voice: 'http://119.27.167.20:8008//voice/5b6db2f0ae2ba.mp3',
          //   video:
          //     'http://video.yay.com.cn/03349567aa844def98f9f238e9959ea1/92c6f6941ccd486cbdb1dcc57631d919-5287d2089db37e62345123a1be272f8b.mp4'
          // }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.okami-skills-list {
  padding-left: 15px;
  line-height: 1.5;
  font-size: 12px;
}
.list-item {
  // 列表项
  border-bottom: 1px solid #f1f1f1;
  &:last-child {
    border-bottom-color: transparent;
  }
}
.list-card {
  // 列表卡片
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px 15px 0;
}
.pic-container {
  // 图片容器
  position: relative;
  width: 75px;
  height: 75px;
  border-radius: 4px;
}
.pic {
  // 图片
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.discount {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 37px;
  height: 14px;
  font-size: 10px;
  color: #1b1b1b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  background-color: #ffe84c;
  border-bottom-right-radius: 7px;
}
.list-card-center {
  flex: 1 0 0;
  margin: 0 10px;
  overflow: hidden;
}
.title {
  // 标题
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: #1b1b1b;
}
.title-text {
  // 标题文字
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title-icon {
  // 标题图标
  margin-left: 6px;
  margin-top: -2px;
  flex-shrink: 0;
}
.order-times {
  // 接单次数
  margin: 0 2px;
  font-size: 12px;
  color: #a3a2a8;
}
.btn {
  display: inline-block;
  width: 27px;
  height: 13px;
  margin-right: 6px;
  line-height: 13px;
  text-align: center;
  border: solid 1px #a3a2a8;
  border-radius: 2px;
}
.list-card-right {
  align-self: flex-start;
}
.price {
  font-size: 14px;
  color: #fd5e68;
  text-align: right;
}
.original-price {
  font-size: 13px;
  color: #a3a2a8;
  text-align: right;
}
</style>
