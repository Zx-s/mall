<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
<!--    //在往子组件里传值时, :probe-type="3" 前面不加 冒号(:)时,传过去的就是一个字符串类型,加上冒号,传过去的就是一个Number类型的-->
    <scroll class="content" ref="scroll"  :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
       <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="topClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {
    getHomeMultidata,
    getHomeGoods,
  } from "network/home";
  import {debounce} from "common/utils";


  export default {
    name: "Home",
    components: {// 注册组件
      HomeRecommendView,
      HomeSwiper,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    //生命周期函数
    created() {//声明周期函数  这里是当这个组件一创建完成 就执行这个函数
      //1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 调用下面的防抖函数 可以将refresh函数传入debounce函数中,生成一个新的函数,
      // 之后在调用非常频繁的时候,就调用这个新的函数
      // 注意: 在这里往debounce函数里面传值的时候 ,需要将这个函数传入,在传入的时候不要在函数后面加(),
      // 加上() 这个函数就执行了,传过去的就是函数执行结束后的返回值
      const refresh = debounce(this.$refs.scroll.refresh,50)
      // 用于监听goodsListItem 中的img图片是否加载完成
      this.$bus.$on('itemImageLoad',() => {
        refresh()
      })
    },
    // 当这个组件销毁时,执行的函数
    destroyed() {
      console.log('home destroyed');
    },
    // 当组件处于活跃时, 执行此函数
    activated() {
      // 指定移动到某个位置
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    // 离开组件(组件不处于活跃状态了), 执行此函数
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
    },

    //计算属性
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
    ,
    methods: {
      /*
      *  事件监听相关的方法
      * */
      tabClick (index ) {
        //根据index获取goods 对象里面的keys 值
        this.currentType = Object.keys(this.goods)[index]
        // console.log(this.currentType);

        // 由于我们上面使用了两次tabControl 这个组件,要使这个组件的状态一致
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      topClick() {
        //设置组件的ref,通过$refs 拿到这个组件对象,根据这个对象 来访问组件里面的属性和方法
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll (position) {
        // 判断backTop是否显示
        //这里由于 position.y 得到的值是一个负值,需要将它转为正值来进行对比
        this.isShowBackTop = (-position.y) > 1000

        //判断 tabControl 是否显示
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /*
      * 网络请求相关的方法
       */
      getHomeMultidata() {
        //1.请求多个数据
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      //2.请求多个商品数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1

        //调用network 网络请求模块里面的方法,用于请求数据
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          // 在每次处罚上拉加载更多事件后,在函数调用的末尾,都应该调用 finishPullUp方法,在这个方法调用前,不会处罚下一次 pullingUp事件
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }



</script>

<style scoped>

  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    /*注意: z-index 只对定位元素起作用*/
    z-index: 10;
  }

</style>
