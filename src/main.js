// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import { store } from './store'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(VueToast);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
