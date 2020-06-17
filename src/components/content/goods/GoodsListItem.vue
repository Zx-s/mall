<template>
  <div class="goods-item" @click="itemClick">
      <div class="wrap">
        <img :src="goodsItem.show.img" alt="" @load="itemImageLoad">
      </div>
      <div class="goods-info">
        <p class="message">{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsList-item",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      itemImageLoad () {
        // 向事件总线 发送一个事件
        this.$bus.$emit('itemImageLoad')
      },
      itemClick () {
        console.log('--详情--');

      }
    }
  }
</script>

<style scoped>
  .goods-item {
    width: 150px;
    padding-bottom: 40px;

    position: relative;
  }
  .wrap {
    width: 150px;
    height: 220px;
    overflow: hidden;
    border-radius: 5px;

    position: relative;
  }

  .goods-item img {
    width: 150px;
    /*height: 220px;*/

    border-radius: 5px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .goods-info {
    font-size: 13px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .goods-info .message {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .goods-info {
    text-align: center;
    font-size: 13px;
  }

  .goods-info  .price {
    color: var(--color-high-text);
    margin-right: 25px;
  }

  .goods-info .collect {
    color: #999;
    position: relative;
  }

  .goods-info .collect::before {
    content: "";
    position: absolute;
    left: -15px;
    /*top: -2px;*/
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;

  }
</style>
