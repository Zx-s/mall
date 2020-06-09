<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";


  import {getHomeMultidata} from "network/home";


  export default {
    name: "Home",
    components: {
      HomeRecommendView,
      HomeSwiper,
      NavBar,
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {//声明周期函数  这里是当这个组件一创建完成 就执行这个函数
      //1.请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    }
  }



</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;
}
</style>
