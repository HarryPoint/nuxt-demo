<template>
  <div class="skills-somment-list">
    <div class="list-header">
      <slot name="header">
        <h3 class="title">
          {{ title }}
        </h3>
        <span class="score">{{ score }}</span>
      </slot>
    </div>
    <ul class="list">
      <li 
        v-for="(item,index) in data" 
        :key="index" 
        class="list-item">
        <slot 
          :item="item" 
          name="list-item">
          <div class="list-card">
            <div class="card-left">
              <AvatarWithDecorate 
                :url="item.avatar" 
                :decorate-url="item.avatarDecorateUrl"
                class="card-avatar"/>
            </div>
            <div class="card-center">
              <h4 class="card-title"><span class="card-title__text">{{ item.title }}</span><exclusive-label 
                v-if="item.exclusiveLabelText" 
                :text="item.exclusiveLabelText"/> </h4>
              <p class="card-text">{{ item.text }}</p>
            </div>
            <div class="card-right">
              <StarRating 
                :rate="item.score" 
                size="small" />
            </div>
          </div>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
import AvatarWithDecorate from '@/components/display/AvatarWithDecorate'
import SkillsCommentList from '@/components/list/SkillsCommentList'
import StarRating from '@/components/form/StarRating'
import ExclusiveLabel from '@/components/label/ExclusiveLabel'
export default {
  components: {
    AvatarWithDecorate,
    StarRating,
    ExclusiveLabel
  },
  props: {
    // 标题
    title: {
      type: String,
      default: '评价'
    },
    // 评分
    score: {
      type: Number,
      default: 0
    },
    // 列表数据
    data: {
      type: Array,
      default() {
        return [
          // {
          //   avatar: 'http://119.27.167.20:8008//avatar/5b4ed49dcb7bf.jpg',
          //   avatarDecorateUrl: '',
          //   title:
          //     '杀巴特杀巴特杀巴特杀巴特杀巴特杀巴特杀巴特杀巴特杀巴特杀巴特杀巴特杀巴特杀巴特',
          //   score: 5,
          //   text: '每一种奇怪现象的背后，都有妖怪在作祟'
          //   exclusiveLabelText: ''
          // }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.skills-somment-list {
  font-size: 12px;
  line-height: 1.2;
  background-color: #fff;
  .card-avatar {
    width: 24px;
    height: 24px;
  }
}
.list-header {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 13px;
  border-bottom: solid 1px #f7f7f7;
}
.title {
  font-size: 13px;
  font-weight: normal;
  color: #222;
}
.score {
  display: inline-block;
  width: 20px;
  height: 15px;
  margin-left: 8px;
  font-size: 9px;
  color: #f0a520;
  line-height: 15px;
  text-align: center;
  border-radius: 8px;
  border: solid 1px #f0a520;
}
.list-item {
  background-image: linear-gradient(
    to right,
    transparent,
    transparent 45px,
    #f7f7f7 45px,
    #f7f7f7
  );
  background-repeat: no-repeat;
  background-position: 0 bottom;
  background-size: 100% 1px;
}
.list-card {
  display: flex;
  justify-content: space-between;
  padding: 13px;
}
.card-center {
  width: 0;
  flex: 1;
  padding: 0 8px;
}
.card-right {
  flex-shrink: 0;
}
.card-title {
  display: flex;
  line-height: 1.2;
  align-items: center;
  /deep/ {
    .exclusive-label {
      flex-shrink: 0;
      max-width: 50%;
      margin-left: 16px;
      transform: translateY(-1px);
    }
  }
}
.card-title__text {
  flex-shrink: 0;
  max-width: 40%;
  font-size: 12px;
  font-weight: normal;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-text {
  margin-top: 6px;
  font-size: 13px;
  font-weight: normal;
  color: #222;
}
</style>
