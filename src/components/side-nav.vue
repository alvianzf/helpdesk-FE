<script>
import MetisMenu from 'metismenujs/dist/metismenujs'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {},
  props: {
    user: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  computed: mapGetters({
    count : 'getCount'
  }),
  methods: {
    ...mapActions(['LIST_UNOPERATOR_BY_WEBSITE'])
  },
  mounted: function() {
    // eslint-disable-next-line no-unused-vars
    var menuRef = new MetisMenu('#side-menu')
    this.LIST_UNOPERATOR_BY_WEBSITE({
      website : localStorage.getItem('user_website')
    })
  }
}
</script>

<template>
  <div>
    <div class="user-box text-center">
      <div>
        <a href="#" class="text-dark dropdown-toggle h5 mt-2 mb-1 d-block">
          
        </a>
      </div>

      <p class="tx-primary tx-bold tx-15 mg-t-30 mg-b-3">Admin Name</p>
      <p class="text-muted tx-bold tx-14 mg-b-40">Admin Email</p>
    </div>

    <!--- Sidemenu -->
    <div id="sidebar-menu">
      <ul id="side-menu" class="metismenu">
        <li class="active">
          <router-link tag="a" :to="{ name : 'home' }">
            <i class="mdi mdi-view-dashboard"></i>
            <span> Dashboard </span>
          </router-link>
        </li>
        <li>
          <a
            href="javascript: void(0);"
            class="waves-effect"
          >
            <i class="mdi mdi-chat"></i>
            <span> Chat </span>
            <span class="menu-arrow"></span>
          </a>
          <ul
            class="nav-second-level nav"
            aria-expanded="false"
          >
            <li>
              <router-link tag="a" :to="{ name : 'chat.active.list' }">
                Active
              </router-link>
            </li>
            <li>
              <router-link tag="a" :to="{ name : 'chat.recent.list' }">
                Recent
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <a
            href="javascript: void(0);"
            class="waves-effect"
          >
            <i class="mdi mdi-account-multiple-outline"></i>
            <span> User Management </span>
            <span class="menu-arrow"></span>
          </a>
          <ul
            class="nav-second-level nav"
            aria-expanded="false"
          >
            <li>
              <router-link tag="a" :to="{ name : 'user.admin' }">
                Administrator
              </router-link>
            </li>
            <li>
              <router-link tag="a" :to="{ name : 'user.customer_service' }">
                Customer Service
              </router-link>
            </li>
          </ul>
        </li>
        <li class="active">
          <router-link tag="a" :to="{ name : 'website_management' }">
            <i class="mdi mdi-earth"></i>
            <span> Website List </span>
          </router-link>
        </li>
        <li class="active">
          <router-link tag="a" :to="{ name : 'auth.login' }">
            <i class="mdi mdi-logout"></i>
            <span> Logout </span>
          </router-link>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <!-- End Sidebar -->

    <div class="notification" v-if="count > 0">
      <div class="notification-box">
        <div class="notification-text">
          <router-link tag="a" :to="{ name : 'chat.active.list' }">
            <p> Have {{ count }} chat </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '~metismenujs/scss/metismenujs';
</style>
