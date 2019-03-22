<template>
  <div class="okami-rearch-result-list">
    <!-- 列表 -->
    <ul class="list">
      <li 
        v-for="(item,index) in data" 
        :key="index" 
        class="list-item">
        <nuxt-link 
          :to="item.linkTo || ''" 
          class="list-card">
          <!-- 头像 -->
          <img 
            :src="item.avatar"
            class="avatar" 
            alt="">
          <div class="list-card-center">
            <!-- 姓名 -->
            <h4 class="title">
              <span class="name">{{ item.name }}</span>
              <!-- 性别年龄 -->
              <age-label
                :sex="item.sex"
                :age="item.age" 
                class="sex" />
            </h4>
            <!-- 技能列表 -->
            <ul class="skills-list">
              <li
                v-for="(skill,index) in take3ItemsInArr(item.skills)"
                :key = "index"
                class="skills-list-item">{{ skill | truncateStr }}
              </li>
              <li 
                v-if="item.skills.length>3" 
                class="skills-list-item ellipsis">...</li>
            </ul>
          </div>
          <!-- 接单次数 -->
          <p class="order-times">{{ item.orderTimesStr }}</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import AgeLabel from '@/components/label/AgeLabel'
import fp from 'lodash/fp'

export default {
  components: {
    AgeLabel
  },
  filters: {
    // 中文超过4个字显示省略号
    truncateStr(value) {
      if (typeof value !== 'string') return value
      // 如果全部是英文和数字
      if (/^[a-zA-Z\d]+$/.test(value)) {
        return fp.truncate(
          {
            length: 6,
            omission: '...'
          },
          value
        )
      }
      // 不全是英文和数字
      return fp.truncate(
        {
          length: 4,
          omission: '...'
        },
        value
      )
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return [
          // {
          //   avatar: 'http://119.27.167.20:8008//avatar/5ba1f8383c300.png',
          //   name: '白日梦',
          //   sex: 'female',
          //   age: '20',
          //   orderTimes: 213,
          //   orderTimesStr: '接单213次',
          //   skills: ['声优聊天']
          // }
        ]
      }
    }
  },
  methods: {
    // 取得数组中的前三个元素
    take3ItemsInArr(arr) {
      return fp.take(3, arr)
    }
  }
}
</script>

<style lang="scss" scoped>
.okami-rearch-result-list {
  // 用于用了flex 所以重置一下lineHeight
  line-height: 1.2;
}
.list-item {
  // 列表项
  margin-top: 10px;
}
.list-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;
  background-color: #fff;
  line-height: 1.2;
}
.avatar {
  // 头像
  width: 41px;
  height: 41px;
  border-radius: 50%;
}
.list-card-center {
  width: 0;
  flex: 1;
  margin: 0 10px;
}
.title {
  display: flex;
  align-items: center;
  align-self: flex-start;
}
.name {
  // 姓名
  margin-right: 8px;
  font-size: 15px;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sex {
  flex-shrink: 0;
}
.skills-list {
  margin-top: 8px;
  font-size: 0;
  white-space: nowrap;
  overflow: hidden;
}
.skills-list-item {
  // 技能标签
  display: inline-block;
  height: 20px;
  padding: 0 10px;
  margin-right: 6px;
  // fix ip6 标签显示不完的bug
  margin-bottom: 1px;
  font-size: 11px;
  color: #a3a2a8;
  line-height: 20px;
  border-radius: 10px;
  border: solid 1px #a3a2a8;
  &.ellipsis {
    font-size: 14px;
    font-weight: bold;
    border-color: transparent;
  }
}
.order-times {
  flex-shrink: 0;
  align-self: flex-start;
  font-size: 11px;
  color: #a3a2a8;
}
</style>
