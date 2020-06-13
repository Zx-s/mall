<template>

  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  // 这是一个利用 better-scroll 替代原生滚动
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    //定义属性,用于保存数据
    data() {
      return {
        scroll: null,
        isShow: false,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        //probeType: 用于开启和关闭 实时监听滚动位置
        // 由于这个组件是一个公共组件, probeType不能直接为监听所有滚动,当设置为监听所有滚动时,某一个组件使用这个组件时,
        // 它不需要监听滚动,但是这里还是在监听滚动,这样会消耗浏览器的性能的
        probeType: this.probeType,

        // pullUpLoad: true,  //开启上拉加载更多事件
        //这里也不能直接设置,要根据调用者需要是否开启这个事件来决定
        pullUpLoad: this.pullUpLoad,

        // 当点击对象为button ... 按钮时,无论是否设置 click:false, button 都能触发点击事件,
        // 当点击对象为 div,span,p ...标签等,必须设置 click:true ,那么才能触发点击事件
        click: true,
      })

      this.scroll.on('scroll',(position) => {
        // console.log(position);
        // console.log(this.probeType);
        this.$emit('scroll', position)
      })

      this.scroll.on('pullingUp', ()=> {
         this.$emit('pullingUp')
      })
    },
    methods: {
      //es6 新语法,参数可以设置默认值,当使用这个方法时,没有传递这个参数,就使用默认值
      scrollTo(x, y,time = 300) {
        //调用BScroll 的回到顶部的方法,
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll.refresh()
      }

    }
  }
</script>

<style scoped>

</style>
