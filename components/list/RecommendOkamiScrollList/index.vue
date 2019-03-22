<template>
  <div 
    class="recommend-okami-scroll">
    <h3 class="scroll-title">大神推荐</h3>
    <cube-scroll
      ref="scroll"
      v-bind="$attrs"
      :data="data"
      direction="horizontal"
      class="horizontal-scroll-list-wrap"
      v-on="$listeners">
      <!-- 大神列表 -->
      <ul class="okami-list">
        <li 
          v-for="(item, index) in data" 
          :key="item.id || index"
          class="okami-list_item">
          <!-- 大神卡片 -->
          <nuxt-link :to="item.linkTo || ''">
            <div 
              :style="getItemStyle(item)" 
              class="okami-card">
              <h4 class="okami-card_title">{{ item.title }}</h4>
              <div class="okami-card_footer">
                <div class="card-footer_row">
                  <span class="okami-name">{{ item.name }}</span>
                  <level-label 
                    :type="item.level" 
                    :text="item.level"/>
                </div>
                <div class="card-footer_row">
                  <span class="okami-price">{{ item.price }}</span>
                  <span class="okami-order-times">接单{{ item.orderTimes }}次</span>
                </div>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import LevelLabel from '@/components/label/LevelLabel'
export default {
  components: {
    LevelLabel
  },
  props: {
    data: {
      type: Array,
      default() {
        return [
          // {
          //   title: '王者荣耀',
          //   avatar: 'http://119.27.167.20:8008//avatar/5ba1f8383c300.png',
          //   name: '小猫',
          //   level: '高级',
          //   price: '99/小时',
          //   orderTimes: 123
          // }
        ]
      }
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    nestMode: {
      type: String,
      default: 'native'
    }
  },
  mounted() {},
  methods: {
    // 背景样式,主要是计算背景图
    getItemStyle(item = {}) {
      return {
        backgroundImage: `url("${item.avatar}")`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-okami-scroll {
  // 最外层容器
  width: 100%;
  /deep/ {
    .horizontal-scroll-list-wrap {
      .cube-scroll-content {
        // 必须加这个,才能滚动?!!
        display: inline-block;
      }
    }
  }
}
.scroll-title {
  // 标题
  padding-top: 19px;
  margin-bottom: 14px;
  font-size: 14px;
  font-weight: normal;
  color: #1b1b1b;
}

.okami-list {
  // 列表
  font-size: 0;
  white-space: nowrap;
}
.okami-list_item {
  // 列表项
  display: inline-block;
  margin-left: 12px;
  font-size: 12px;
  &:first-child {
    margin-left: 0;
  }
}

.okami-card {
  // 大神卡片
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 140px;
  height: 140px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 3px;
}

.okami-card_title {
  // 列表项 标题
  position: relative;
  align-self: flex-start;
  height: 18px;
  padding: 0 5px;
  font-size: 10px;
  color: #1b1b1b;
  line-height: 18px;
  background-color: #fdef50;
  &:after {
    // 列表项 标题 label
    content: '\20';
    position: absolute;
    top: 0;
    right: -8px;
    display: block;
    width: 10px;
    height: 18px;
    background-image: url('./images/icon-okami-skill-label.png');
    background-position: top right;
    background-repeat: no-repeat;
    background-size: contain;
  }
}

.okami-card_footer {
  // 大神卡片 footer
  padding: 4px 8px;
  font-size: 10px;
  color: #fff;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0)
  );
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}

.card-footer_row {
  // 大神卡片 footer 行
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  &:first-child {
    margin-top: 0;
  }
}

.okami-name {
  // 大神姓名
  width: 0;
  flex: 1;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
