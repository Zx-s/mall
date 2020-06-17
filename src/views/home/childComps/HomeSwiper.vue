<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>

  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },data() {
      return {
        isLoad:true
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        // 这里只需要获取一次这个值,只需要发送一次事件出去
        // 定义上面的变量, 用于控制只执行一次这个方法
        if (this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
