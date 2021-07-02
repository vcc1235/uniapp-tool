import Vue from 'vue'
import '@/common/single.js'
import '@/plugins/jsencrypt.js'
import App from './App'
import { xdecode, xencode } from '@/plugins/security.js'
console.log(typeof (''+2));
Vue.config.productionTip = false
App.mpType = 'app'


const string = xencode('hello world');
const result = xdecode(string);
console.log(string,result);
const app = new Vue({
    ...App
})
app.$mount()
