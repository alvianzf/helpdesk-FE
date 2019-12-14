<script>
import MetisMenu from 'metismenujs/dist/metismenujs'

export default {
  components: {},
  props: {
    user: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  mounted: function() {
    // eslint-disable-next-line no-unused-vars
    var menuRef = new MetisMenu('#side-menu')
  },
  methods: {}
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
        <li class="active">
          <router-link tag="a" :to="{ name : 'chat.list' }">
            <i class="mdi mdi-chat"></i>
            <span> Chat List </span>
          </router-link>
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
          </ul>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <!-- End Sidebar -->
  </div>
</template>

<style lang="scss">
@import '~metismenujs/scss/metismenujs';
</style>
