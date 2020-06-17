<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import router from "./router";
  import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: 'App',
  router,
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
