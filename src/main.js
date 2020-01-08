import Vue from 'vue'
import App from '@src/app'
import router from '@router'
import '@components/_globals'
import VueTables from 'vue-tables-2'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(VueTables.ClientTable);

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
