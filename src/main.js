import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import Vuex from "vuex"
import storePage from "./store/index"
// import "./assets/css/lessIndex.less"
import "./assets/css/index.css"
require("./assets/css/lessIndex.less")
import "lib-flexible/flexible"
Vue.config.productionTip = false
Vue.use(Vuex)
const store = new Vuex.Store({
  ...storePage
})
console.log("main")
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')