<template>
  <div class="chat-order-process-card">
    <!-- 订单描述 -->
    <chat-skill-card 
      v-bind="$attrs" 
      v-on="$listeners" />
    <!-- 订单进度 -->
    <process-bar 
      v-bind="$attrs" 
      class="order-process"/>
  </div>
</template>

<script>
import ChatSkillCard from '@/components/card/ChatSkillCard'
import ProcessBar from '@/components/display/ProcessBar'
export default {
  components: {
    ChatSkillCard,
    ProcessBar
  },
  props: {}
}
</script>

<style lang="scss" scoped>
.chat-order-process-card {
  background-color: #fff;
  padding-bottom: 8px;
  /deep/ {
    .chat-skill-card__desc {
      color: #1b1b1b;
    }
    .process-bar {
      margin: 0 15px;
      .process-bar__item {
        &::before {
          // 横线
          background-image: linear-gradient(
            to right,
            #e5e5e5 0,
            #e5e5e5 10px,
            #e5e5e5 15px,
            #e5e5e5 100%
          );
        }
        &::after {
          // 圆点
          background-color: #e5e5e5;
          opacity: 1;
        }
        &.active {
          &::before {
            background-image: linear-gradient(
              to right,
              #fed101 0,
              #fed101 calc(50% - 10px),
              #fed101 calc(50% - 5px),
              #e5e5e5 calc(50% + 5px),
              #e5e5e5 calc(50% + 10px),
              #e5e5e5 100%
            );
          }
          &::after {
            opacity: 1;
            background: #fed101;
          }
          &:not(.current-active) {
            &::before {
              background-image: linear-gradient(
                to right,
                #fed101 0,
                #fed101 calc(50% - 10px),
                #fed101 calc(50% - 5px),
                #fed101 calc(50% + 5px),
                #fed101 calc(50% + 10px),
                #fed101 100%
              );
            }
          }
          &:first-child {
            &::before {
              background-image: linear-gradient(
                to right,
                #e5e5e5 0,
                #e5e5e5 10px,
                #e5e5e5 15px,
                #e5e5e5 100%
              );
            }
            &:not(.current-active) {
              &::before {
                background-image: linear-gradient(
                  to right,
                  #fed101 0,
                  #fed101 10px,
                  #fed101 15px,
                  #fed101 100%
                );
              }
            }
          }
          &:last-child {
            &::before {
              background-image: linear-gradient(
                to right,
                #fed101 0,
                #fed101 calc(100% - 15px),
                #fed101 calc(100% - 10px),
                #fed101 100%
              );
            }
          }
        }
      }
    }
  }
}
</style>
