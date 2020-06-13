<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    //在往子组件里传值时, :probe-type="3" 前面不加 冒号(:)时,传过去的就是一个字符串类型,加上冒号,传过去的就是一个Number类型的
    <scroll class="content" ref="scroll"  :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
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
      }
    },
    created() {//声明周期函数  这里是当这个组件一创建完成 就执行这个函数
      //1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
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
      },
      topClick() {
        //设置组件的ref,通过$refs 拿到这个组件对象,根据这个对象 来访问组件里面的属性和方法
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll (position) {
        //这里由于 position.y 得到的值是一个负值,需要将它转为正值来进行对比
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        // console.log('上拉加载更多');

        this.getHomeGoods(this.currentType)

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
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          // 在每次处罚上拉加载更多事件后,在函数调用的末尾,都应该调用 finishPullUp方法,在这个方法调用前,不会处罚下一次 pullingUp事件
          this.$refs.scroll.finishPullUp()
          this.$refs.scroll.refresh()
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
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*}*/

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
