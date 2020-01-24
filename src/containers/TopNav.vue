<template>
  <nav class="navbar fixed-top">
    <div class="d-flex align-items-center navbar-left">
      <a
        href="#"
        class="menu-button d-none d-md-block"
        @click.prevent="changeSideMenuStatus({step :menuClickCount+1,classNames:menuType})"
      >
        <menu-icon />
      </a>
      <a
        href="#"
        class="menu-button-mobile d-xs-block d-sm-block d-md-none"
        @click.prevent="changeSideMenuForMobile(menuType)"
      >
        <mobile-menu-icon />
      </a>
    </div>
    <router-link class="navbar-logo" tag="a" to="/app/dashboard/default">
      Chat Helpdesk
    </router-link>

    <div class="navbar-right">
      <div class="user d-inline-block">
        <b-dropdown
          class="dropdown-menu-right"
          right
          variant="empty"
          toggle-class="p-0"
          menu-class="mt-3"
          no-caret
        >
          <template slot="button-content">
            <span class="name mr-1">{{ user.name }}</span>
            <span>
              {{ user.name }}
            </span>
          </template>
          <b-dropdown-item @click="goToAccount">Account</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item @click="logout">Sign out</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { MenuIcon, MobileMenuIcon } from '@/components/Svg'
import Switches from 'vue-switches'

import notifications from '@/data/notifications'
import {
  searchPath,
  menuHiddenBreakpoint,
  localeOptions,
  buyUrl,
  defaultColor
} from '@/constants/config'
import { getDirection, setDirection } from '@/utils'
export default {
  components: {
    MenuIcon,
    MobileMenuIcon,
    Switches
  },
  data () {
    return {
      selectedParentMenu: '',
      searchKeyword: '',
      isMobileSearch: false,
      isSearchOver: false,
      fullScreen: false,
      menuHiddenBreakpoint,
      searchPath,
      localeOptions,
      buyUrl,
      notifications,
      isDarkActive: false,
      current_name : localStorage.getItem('user_name')
    }
  },
  methods: {
    ...mapMutations(['changeSideMenuStatus', 'changeSideMenuForMobile']),
    ...mapActions(['setLang', 'signOut','CURRENT_USER']),
    search () {
      this.$router.push(`${this.searchPath}?search=${this.searchKeyword}`)
      this.searchKeyword = ''
    },
    searchClick () {
      if (window.innerWidth < this.menuHiddenBreakpoint) {
        if (!this.isMobileSearch) {
          this.isMobileSearch = true
        } else {
          this.search()
          this.isMobileSearch = false
        }
      } else {
        this.search()
      }
    },
    goToAccount() {
      this.$router.push('/app/account')
    },
    handleDocumentforMobileSearch () {
      if (!this.isSearchOver) {
        this.isMobileSearch = false
        this.searchKeyword = ''
      }
    },

    changeLocale (locale, direction) {
      const currentDirection = getDirection().direction
      if (direction !== currentDirection) {
        setDirection(direction)
      }

      this.setLang(locale)
    },
    logout () {
      localStorage.clear()
      this.$router.push('/user/login')
    },

    toggleFullScreen () {
      const isInFullScreen = this.isInFullScreen()

      var docElm = document.documentElement
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
      this.fullScreen = !isInFullScreen
    },
    getThemeColor () {
      return localStorage.getItem('themeColor')
        ? localStorage.getItem('themeColor')
        : defaultColor
    },
    isInFullScreen () {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
          document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
          document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      )
    }
  },
  computed: {
    ...mapGetters({
      menuType: 'getMenuType',
      menuClickCount: 'getMenuClickCount',
      user : 'getUser'
    })
  },
  mounted() {
    this.CURRENT_USER({
        id : localStorage.getItem('user_id')
    })
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleDocumentforMobileSearch)
  },
  created () {
    const color = this.getThemeColor()
    this.isDarkActive = color.indexOf('dark') > -1
  },
  watch: {
    '$i18n.locale' (to, from) {
      if (from !== to) {
        this.$router.go(this.$route.path)
      }
    },
    isDarkActive (val) {
      let color = this.getThemeColor()
      let isChange = false
      if (val && color.indexOf('light') > -1) {
        isChange = true
        color = color.replace('light', 'dark')
      } else if (!val && color.indexOf('dark') > -1) {
        isChange = true
        color = color.replace('dark', 'light')
      }
      if (isChange) {
        localStorage.setItem('themeColor', color)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
    },
    isMobileSearch (val) {
      if (val) {
        document.addEventListener('click', this.handleDocumentforMobileSearch)
      } else {
        document.removeEventListener(
          'click',
          this.handleDocumentforMobileSearch
        )
      }
    }
  }
}
</script>
