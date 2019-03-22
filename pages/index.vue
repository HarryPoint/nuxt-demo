<template>
  <div class="page-accompany">
    <!-- 头部 -->
    <div 
      v-if="!isYeDone" 
      class="page-accompany-header">
      <nav-top-bar>
        <!-- 标题 -->
        <h1 
          slot="center" 
          class="title">YAY陪玩</h1>
        <!-- 搜索按钮 -->
        <router-link
          slot="right" 
          class="btn-search"
          tag="div" 
          to="/search">
          <image-icon type="search"/>
          <span>搜索</span>
        </router-link>
      </nav-top-bar>
    </div>
    <!-- 主要内容 -->
    <div class="page-accompany-main">
      <cube-scroll 
        ref="scroll" 
        :options="cScrollOptions"
        :data="cScrollData"
        @pulling-up="onPullingUp">
        <!-- banner -->
        <div class="banner">
          <fake-search-bar
            v-if="isYeDone" 
            class="fake-search-bar" 
            @bar-click="$router.push('/search')"/>
          <!-- 图片轮播 -->
          <banner-slide :data="cBannerList"/>
          <!-- 导航轮播 -->
          <nav-list-slide 
            :data="navList"
            class="nav-list-scroll"/>
          <!-- 消息轮播 -->
          <broadcast-slide 
            :data="barrageList" 
            class="broadcast-slide" />
        </div>
        <div class="lists-panel">
          <!-- 大神推荐列表 -->
          <recommend-okami-scroll-list-for-christmas :data="cRecommendList" />
          <!-- 技能热门推荐 -->
          <skill-recommend-okami-list 
            v-for="list in cSkillRecommendOkamiListsRes"
            :key="list.id" 
            :data="list.data | fSkillRecommendOkamiList"
            :title="list.title"
            @btn-more-click="handleBtnMoreClick(list.data && list.data[0] && list.data[0].alias)" />
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import fp from 'lodash/fp'
import store2 from 'store2'
import pWaitFor from 'p-wait-for'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import NavTopBar from '@/components/nav/NavTopBar'
import ImageIcon from '@/components/imageIcon'
import BannerSlide from '@/components/slide/BannerSlide'
import NavListSlide from '@/components/nav/NavListSlide'
import BroadcastSlide from '@/components/slide/BroadcastSlide'
import RecommendOkamiScrollListForChristmas from '@/components/list/RecommendOkamiScrollListForChristmas'
import SkillRecommendOkamiList from '@/components/list/SkillRecommendOkamiList'
import FakeSearchBar from '@/components/form/FakeSearchBar'
import LinkPoupGoToRecharge from '@/components/display/LinkPopup/LinkPoupGoToRecharge'
import GoCallBackResultIfNeeded from '@/mixins/GoCallBackResultIfNeeded'
import imLoginIfNeeded from '@/mixins/imLoginIfNeeded'
import setAppNav from '@/mixins/setAppNav'

export default {
  components: {
    NavTopBar,
    ImageIcon,
    BannerSlide,
    NavListSlide,
    BroadcastSlide,
    RecommendOkamiScrollListForChristmas,
    SkillRecommendOkamiList,
    FakeSearchBar,
    LinkPoupGoToRecharge
  },
  layout: 'widthBottomNav',
  mixins: [GoCallBackResultIfNeeded, imLoginIfNeeded, setAppNav],
  async asyncData({ app }) {
    const rs = {
      // app里的title
      title: 'YAY陪玩',
      // 图片轮播数据
      bannerList: [{}],
      // 导航轮播数据
      navList: [],
      // 广播轮播数据
      barrageList: [],
      // 推荐大神数据
      recommendList: [],
      // 当前请求的热门推荐合集index
      currentFetchIndex: 0,
      // 热门推荐集合
      skillRecommendOkamiListsRes: [],
      // 是否正在加载更多
      isPullingUp: false,
      // 是否还有更多数据
      noMoreData: false
    }
    // 请求数据
    try {
      const [
        banner,
        nav,
        barrage,
        recommend,
        pugbList,
        lolList
      ] = await Promise.all([
        // 图片轮播数据
        app.$api.getBanner().catch(() => ({})),
        // 导航轮播数据
        app.$api.getNav().catch(() => ({})),
        // 广播轮播数据
        app.$api.getBarrage().catch(() => ({})),
        // 推荐大神数据
        app.$api.getIndexRecommend().catch(() => ({}))
      ])
      // 更新数据
      rs.bannerList = app.$utils.getResData(banner)
      rs.navList = app.$utils.getResData(nav)
      rs.barrageList = app.$utils.getResData(barrage)
      rs.recommendList = app.$utils.getResData(recommend)
      rs.recommendPugbList = app.$utils.getResData(pugbList)
      rs.recommendLolList = app.$utils.getResData(lolList)
      // 请求索引为0的热门推荐合集
      const navId = fp.get('_id', rs.navList[0])
      console.log('navId', navId)
      await app.$api
        .getSkillList({
          product_id: navId,
          page: 1,
          row: 4
        })
        .then(res => {
          const data = app.$utils.getResData(res, [])
          const title = fp.get('[0].product_name', data) || ''
          const id = fp.get('[0].alias', data) || ''
          rs.skillRecommendOkamiListsRes.push({
            id,
            data,
            title
          })
          rs.currentFetchIndex = 1
        })
    } catch (error) {
      app.$fetchCatch(error)
    }
    return rs
  },
  computed: {
    ...mapGetters('ua', ['isYeDone']),
    ...mapState('im', ['isImLogged']),
    ...mapGetters('user', ['authentication']),
    // appNavTitle
    appNavTitle() {
      return '陪玩首页'
    },
    // 滚动组件的options,
    cScrollOptions() {
      return {
        pullUpLoad: {
          txt: { more: '上拉加载更多', noMore: '-加载完毕-' }
        }
      }
    },
    // 滚动容器需要的data
    cScrollData() {
      return [
        this.bannerList,
        this.navList,
        this.barrageList,
        this.skillRecommendOkamiListsRes
      ]
    },
    // 当前是否可以上拉加载
    cCanPullUp() {
      return (
        !this.isPullingUp &&
        !this.noMoreData &&
        this.currentFetchIndex < this.navList.length
      )
    },
    // 图片轮播数据,转换成组件需要的格式
    cBannerList() {
      return this.bannerList.map(item => ({
        url: item.url,
        image: item.img
      }))
    },
    // 推荐大神轮播数据,转换成组件需要的格式
    cRecommendList() {
      return this.recommendList.map(item => ({
        id: item._id,
        title: item.product_name,
        avatar: item.member_avatar,
        name: item.member_name,
        level: item.level,
        price: `${item.price}${item.unit}`,
        priceNum: item.price,
        priceUnit: item.unit,
        orderTimes: item.serve_num,
        linkTo: `/skill/${item.alias}/${item.member_id}`,
        labelsArr: item.titles
      }))
    },
    cSkillRecommendOkamiListsRes() {
      return this.skillRecommendOkamiListsRes.filter(
        item => fp.size(fp.get('data', item)) !== 0
      )
    }
  },
  head() {
    return {
      title: 'YAY游戏陪玩-LOL陪玩-美女陪玩-电竞陪玩平台',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'YAY,YAY陪玩,游戏陪玩,LOL陪玩,美女陪玩,陪玩平台,陪玩网站,电竞陪玩'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'YAY是专业的线上游戏陪玩平台,提供LOL陪玩,绝地求生,王者荣耀等游戏陪玩以及声优聊天娱乐服务,众多为你比心的美女陪玩小姐姐在YAY等着你。'
        }
      ],
      link: [
        {
          ref: 'canonical',
          href: 'https://pei.yay.com.cn/'
        }
      ]
    }
  },
  beforeMount() {},
  mounted() {
    this.$nextTick(() => {
      this.fetchMsgList()
    })
  },
  methods: {
    ...mapActions('im', ['fetchImMsgsListIfNeeded']),
    // 推荐列表更多按钮点击事件
    handleBtnMoreClick(type = '') {
      this.$router.push(`/skill/${type}`)
    },
    // 上拉加载
    onPullingUp() {
      console.log('onPullingUp')
      // 没有更多数据就不必加载了
      if (!this.cCanPullUp) {
        console.log('当前不必加载')
        return this.$refs.scroll.forceUpdate()
      }
      this.isPullingUp = true
      // 请求数据
      const navId = fp.get('_id', this.navList[this.currentFetchIndex])
      this.$api
        .getSkillList({
          product_id: navId,
          page: 1,
          row: 4
        })
        .then(res => {
          const data = this.$utils.getResData(res) || []
          const title = fp.get('[0].product_name', data) || ''
          const id = fp.get('[0].alias', data) || ''
          this.skillRecommendOkamiListsRes.push({
            id,
            data,
            title
          })
          this.currentFetchIndex++
          this.isPullingUp = false
        })
        .catch(error => {
          this.$fetchCatch(error)
          this.isPullingUp = false
        })
    },
    // 轮询是否可以拉取消息,直到拉取成功
    fetchMsgList() {
      // 等待im登录成功后且gImMsgsList为空再去请求最近消息列表
      if (!this.authentication) {
        return
      }
      pWaitFor(
        () => {
          console.log('尝试请求消息列表')
          if (this.isImLogged) {
            return true
          }
          return false
        },
        {
          interval: 2000,
          timeout: 20000
        }
      )
        .then(() => {
          console.log('等待im登录成功后再去请求最近消息列表')
          this.fetchImMsgsListIfNeeded().finally(() => {
            console.log('finally')
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-accompany {
  // 页面
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .page-accompany-header {
    // 页面 header
    /deep/ {
      .nav-top-bar__content {
        // 让标题文字看起来是居中的
        padding-left: 57px;
        line-height: 1.5;
      }
    }
  }
  .title {
    // 页面 标题
    font-size: 17px;
    color: #1b1b1b;
  }
  .btn-search {
    // 页面 header 搜索按钮
    width: 65px;
    height: 25px;
    font-size: 12px;
    color: #4e4e4e;
    line-height: 25px;
    border-radius: 13px;
    text-align: center;
    vertical-align: middle;
    background-color: rgba($color: #ffe777, $alpha: 0.3);
    /deep/ {
      .image-icon {
        margin-top: -2px;
      }
    }
  }
  .page-accompany-main {
    // 页面主体
    flex: 1;
    overflow: hidden;
    background-color: #f7f7f7;
  }
  .banner {
    // banner
    padding: 10px 15px 7px 15px;
    background-color: #fff;
  }
  .nav-list-scroll {
    // 导航轮播
    margin-top: 16px;
  }
  .fake-search-bar {
    margin-top: 0;
    margin-bottom: 8px;
  }
  .broadcast-slide {
    // 广播轮播
    margin-top: 9px;
  }
  .lists-panel {
    padding: 0 15px;
    margin-top: 8px;
    background-color: #fff;
  }
}
</style>
