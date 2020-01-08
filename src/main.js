import Vue from 'vue'
import App from '@src/app'
import router from '@router'
import '@components/_globals'
import VueTables from 'vue-tables-2'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

Vue.use(BootstrapVue)
Vue.use(VueTables.ClientTable);
Vue.use(VeeValidate)
Vue.use(VueSweetalert2, options)

const app = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
