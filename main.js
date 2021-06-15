import Vue from 'vue'
import '@/plugins/base64.js'
import '@/common/single.js'
import App from './App'
console.log(typeof (''+2));
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
