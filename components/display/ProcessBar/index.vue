<template>
  <!-- 这个组件的结构和样式太复杂了不利于重用需要改进 -->
  <ol class="process-bar">
    <li 
      v-for="(item,index) in data"
      :key="index" 
      :class="{
        'active': index <= currentIndex,
        'current-active': index == currentIndex
      }"
      class="process-bar__item">
      {{ item }}
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    // 进度节点
    data: {
      type: Array,
      default() {
        return ['待确定', '待服务', '进行中', '已完成']
      }
    },
    // 当前进度index
    currentIndex: {
      type: Number,
      default: 3
    }
  }
}
</script>

<style lang="scss" scoped>
.process-bar {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 1.2;
}
.process-bar__item {
  position: relative;
  flex: 1;
  padding-top: 14px;
  text-align: center;
  color: rgba($color: #1b1b1b, $alpha: 0.5);
  &:first-child {
    flex: 0.5;
    text-align: left;
    &::before {
      background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0) 10px,
        rgba(255, 255, 255, 0.32) 15px,
        rgba(255, 255, 255, 0.32) 100%
      );
    }
    &::after {
      left: 0;
      transform: translateX(0);
    }
  }
  &:last-child {
    flex: 0.5;
    text-align: right;
    &::before {
      background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.32) 0,
        rgba(255, 255, 255, 0.32) calc(100% - 15px),
        rgba(255, 255, 255, 0) calc(100% - 10px),
        rgba(255, 255, 255, 0) 100%
      );
    }
    &::after {
      left: initial;
      right: 0;
      transform: translateX(0);
    }
  }
  &::before {
    // 横线
    position: absolute;
    left: 0;
    top: 3px;
    content: '\20';
    display: block;
    width: 100%;
    height: 3px;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.32) 0,
      rgba(255, 255, 255, 0.32) calc(50% - 10px),
      rgba(255, 255, 255, 0.1) calc(50% - 5px),
      rgba(255, 255, 255, 0.1) calc(50% + 5px),
      rgba(255, 255, 255, 0.32) calc(50% + 10px),
      rgba(255, 255, 255, 0.32) 100%
    );
    background-repeat: no-repeat;
    background-position: 0 top;
  }
  &::after {
    // 圆点
    position: absolute;
    left: 50%;
    top: 0;
    content: '\20';
    display: block;
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    border-radius: 5px;
    opacity: 0.57;
    transform: translateX(-50%);
  }
  &.active {
    &::before {
      // 横线
      background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0,
        rgba(255, 255, 255, 1) calc(50% - 10px),
        rgba(255, 255, 255, 0.1) calc(50% - 5px),
        rgba(255, 255, 255, 0.1) calc(50% + 5px),
        rgba(255, 255, 255, 0.32) calc(50% + 10px),
        rgba(255, 255, 255, 0.32) 100%
      );
    }
    &:not(.current-active) {
      &::before {
        background-image: linear-gradient(
          to right,
          rgba(255, 255, 255, 1) 0,
          rgba(255, 255, 255, 1) calc(50% - 10px),
          rgba(255, 255, 255, 0.1) calc(50% - 5px),
          rgba(255, 255, 255, 0.1) calc(50% + 5px),
          rgba(255, 255, 255, 1) calc(50% + 10px),
          rgba(255, 255, 255, 1) 100%
        );
      }
    }
    &::after {
      opacity: 1;
    }
    &:first-child {
      &::before {
        background-image: linear-gradient(
          to right,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.32) 15px,
          rgba(255, 255, 255, 0.32) 100%
        );
      }
      &:not(.current-active) {
        &::before {
          background-image: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0) 10px,
            rgba(255, 255, 255, 1) 15px,
            rgba(255, 255, 255, 1) 100%
          );
        }
      }
    }
    &:last-child {
      &::before {
        background-image: linear-gradient(
          to right,
          rgba(255, 255, 255, 1) 0,
          rgba(255, 255, 255, 1) calc(100% - 15px),
          rgba(255, 255, 255, 0) calc(100% - 10px),
          rgba(255, 255, 255, 0) 100%
        );
      }
    }
  }
  &.current-active {
    color: #1b1b1b;
    &::after {
      background-color: #fed101;
      box-shadow: 0px 1px 5px 0px rgba(254, 209, 1, 0.78);
      border-radius: 5px;
      border: solid 2px #1b1b1b;
    }
  }
}
</style>
