import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import "lib-flexible"

Vue.config.productionTip = false

// 利用原型添加一个事假总线 用于监听事件  Vue 实例可以用于作为事件总线 吧
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
