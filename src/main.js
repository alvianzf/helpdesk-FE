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
import VeeValidate from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import VueNativeNotification from 'vue-native-notification'

// todo
// cssVars()

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

Vue.use(BootstrapVue)
Vue.use(VueToast);
Vue.use(VeeValidate, { fieldsBagName: 'veeFields' })
Vue.use(VueSweetalert2, options)
Vue.use(VueNativeNotification, {
  requestOnNotify: true
})
Vue.use(require('vue-shortkey'))
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
