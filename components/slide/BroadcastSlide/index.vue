<template>
  <div class="broadcast-slide">
    <cube-slide
      v-bind="$attrs"
      :direction="direction"
      :show-dots="showDots"
      :data="data"
      v-on="$listeners">
      <!-- eslint-disable-next-line -->
      <cube-slide-item
        v-for="(item, index) in cData"
        :key="index" 
        class="slide-item">
        <img 
          :src="item | fImg" 
          class="slide-item_avatar" 
          alt="">
        <span class="slide-item_okaminame">{{ item | fName }}</span>
        <span class="slide-item_type">{{ item.type | type }}</span>
        <span class="slide-item_membername">{{ item | fMemberName }}</span>
        <span class="slide-item_desc">{{ getDesc(item) }}</span>
        <img 
          v-if="item.gif_img" 
          :src="item.gif_img" 
          class="slide-item__img"
          alt="" >
      </cube-slide-item>
    </cube-slide>
    <image-icon 
      class="broadcast-slide_icon" 
      type="msg" />
  </div>
</template>

<script>
import fp from 'lodash/fp'
import ImageIcon from '@/components/imageIcon'
export default {
  components: {
    ImageIcon
  },
  filters: {
    type(value) {
      switch (value) {
        case 'ord':
          return '接了'
        case 'inv':
          return '邀请'
        case 'gif':
          return '收到'
        default:
          return ''
      }
    },
    // 大神姓名
    fName(item) {
      switch (item.type) {
        case 'ord':
          return item.server_name
        case 'inv':
          return '邀请'
        case 'gif':
          return item.object_name
        default:
          return ''
      }
    },
    // 大神头像
    fImg(item) {
      switch (item.type) {
        case 'ord':
          return item.server_avatar
        case 'inv':
          return '邀请'
        case 'gif':
          return item.object_avatar
        default:
          return ''
      }
    },
    // 用户名称
    fMemberName(item) {
      switch (item.type) {
        case 'ord':
          return ''
        case 'inv':
          return ''
        case 'gif':
          return item.member_name
        default:
          return ''
      }
    }
  },
  props: {
    // 广播的列表数据
    data: {
      type: Array,
      default() {
        return []
      }
    },
    // 默认竖向滚动
    direction: {
      type: String,
      default: 'vertical'
    },
    showDots: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cData() {
      return this.data.filter(item => item.type !== 'inv')
    }
  },
  methods: {
    // 描述
    getDesc(item) {
      switch (item.type) {
        case 'ord':
          return `${item.num}单 ${item.product_name}`
        case 'inv':
          return ``
        case 'gif':
          return `的${item.title}*${item.num}`
        default:
          return ''
      }
    },
    // 昵称
    getName(item) {
      switch (item.type) {
        case 'ord':
          return ''
        case 'inv':
          return ''
        case 'gif':
          return item.member_name
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.broadcast-slide {
  position: relative;
  width: 100%;
  height: 30px;
  background-color: rgba($color: #ffdd00, $alpha: 0.06);
}
.slide-item {
  float: initial;
  display: flex;
  padding: 0 10px;
  font-size: 11px;
  color: #333;
  align-items: center;
}
.slide-item_avatar {
  display: block;
  width: 22px;
  height: 22px;
  margin: 0 10px 0 27px;
  border-radius: 50%;
}
.slide-item_type {
  margin: 0 5px;
  color: #a3a2a8;
}
.slide-item__img {
  height: 22px;
  margin-left: 8px;
}
.broadcast-slide_icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.slide-item_membername,
.slide-item_okaminame {
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
