<script>
export default {
  components: { },
  props: {
    user: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    title: {
      type: String,
      required: false,
      default: () => '',
    },
  },
  data() {
    return {}
  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu()
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar()
    },
  },
}
</script>

<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <!-- LOGO -->
    <div class="logo-box">
      <a href="index.html" class="logo text-center">
        <span class="logo-lg mg-t-20">
          Chat Helpdesk
        </span>
        <span class="logo-sm">
          Chat Helpdesk
        </span>
      </a>
    </div>

    <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
      <li>
        <button
          class="button-menu-mobile disable-btn waves-effect"
          @click="toggleMenu"
        >
          <i class="fe-menu"></i>
        </button>
      </li>

      <li>
        <h4 class="page-title-main">{{title || ''}}</h4>
      </li>

    </ul>
  </div>
  <!-- end Topbar -->
</template>

<style lang="scss">
.noti-scroll {
  height: 220px;
}
.ps > .ps__scrollbar-y-rail {
  width: 8px !important;
  background-color: transparent !important;
}
.ps > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps.ps--in-scrolling.ps--y > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:active > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:hover > .ps__scrollbar-y {
  width: 6px !important;
}
.button-menu-mobile {
  outline: none !important;
}
</style>
