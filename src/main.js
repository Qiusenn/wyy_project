import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(MintUI)
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    // 全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')
