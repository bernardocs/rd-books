import Vue from 'vue'
import 'reset-css' // Eric Meyer's Reset CSS
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
