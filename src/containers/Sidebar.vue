
<template>
     <div class="sidebar" @mouseenter="isMenuOver=true" @mouseleave="isMenuOver=false"  @touchstart="isMenuOver=true" >
        <div class="main-menu">
            <vue-perfect-scrollbar class="scroll" :settings="{ suppressScrollX: true, wheelPropagation: false }" >
                <ul class="list-unstyled">

                    <router-link :class="{ active : selectedParentMenu==='dashboard' }" @click.native="changeSelectedParentHasNoSubmenu('dashboard')" to="/app/dashboard/default" tag="li">
                      <a><i class="iconsminds-shop"></i>  Dashboard</a>
                    </router-link>
                    <li :class="{ active : selectedParentMenu==='chat'}">
                        <a @click.prevent="openSubMenu($event,'chat')" href="#chat">
                          <i class="iconsminds-support"></i>Live Chat
                        </a>
                    </li>
                    <li :class="{ active : selectedParentMenu==='agent'}" v-if="role == 'super admin'|| role == 'administrator'">
                        <a @click.prevent="openSubMenu($event,'agent')" href="#agent">
                          <i class="iconsminds-conference"></i>Agent
                        </a>
                    </li>
                    <router-link :class="{ active : selectedParentMenu==='website' }" @click.native="changeSelectedParentHasNoSubmenu('website')" to="/app/website/list" tag="li" v-if="role == 'super admin'">
                      <a><i class="iconsminds-big-data"></i>  Website List</a>
                    </router-link>
                    <li :class="{ active : selectedParentMenu==='setting'}" v-if="role == 'super admin'">
                        <a @click.prevent="openSubMenu($event,'setting')" href="#setting">
                          <i class="simple-icon-settings"></i>Setting
                        </a>
                    </li>

                </ul>
            </vue-perfect-scrollbar>
        </div>

        <div class="sub-menu">
             <vue-perfect-scrollbar class="scroll" :settings="{ suppressScrollX: true, wheelPropagation: false }" >
                <ul class="list-unstyled" data-link="chat" :class="{'d-block':selectedParentMenu==='chat' }">
                    <router-link tag="li" to="/app/chat/open" @click.native.prevent="changeDefaultMenuType('menu-sub-hidden')"><a><span>New</span></a></router-link>
                    <router-link tag="li" to="/app/chat/active" @click.native.prevent="changeDefaultMenuType('menu-sub-hidden')"><a><span>Current</span></a></router-link>
                    <router-link tag="li" to="/app/chat/close" @click.native.prevent="changeDefaultMenuType('menu-sub-hidden')"><a><span>History</span></a></router-link>
                </ul>

                <ul class="list-unstyled" data-link="agent" :class="{'d-block':selectedParentMenu==='agent' }">
                    <router-link tag="li" v-if="role == 'super admin'" to="/app/agent/super" @click.native.prevent="changeDefaultMenuType('menu-sub-hidden')"><a><span>Super Admin</span></a></router-link>
                    <router-link tag="li" to="/app/agent/admin" @click.native.prevent="changeDefaultMenuType('menu-sub-hidden')"><a><span>Admin</span></a></router-link>
                    <router-link tag="li" to="/app/agent/operator" @click.native.prevent="changeDefaultMenuType('menu-sub-hidden')"><a><span>Operator</span></a></router-link>
                </ul>

                <ul class="list-unstyled" data-link="setting" :class="{'d-block':selectedParentMenu==='setting' }">
                    <router-link tag="li" to="/app/setting/widget" @click.native.prevent="changeDefaultMenuType('menu-sub-hidden')"><a><span>Widget</span></a></router-link>
                </ul>
            </vue-perfect-scrollbar>

        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { menuHiddenBreakpoint, subHiddenBreakpoint } from '@/constants/config'

export default {
  data () {
    return {
      selectedParentMenu: '',
      isMenuOver: false,
      role : localStorage.getItem('user_role')
    }
  },
  mounted () {
    this.selectMenu()
    window.addEventListener('resize', this.handleWindowResize)
    document.addEventListener('click', this.returnSelectedMenu)
    this.handleWindowResize()
  },
  beforeDestroy () {
    document.removeEventListener('click', this.returnSelectedMenu)
    window.removeEventListener('resize', this.handleWindowResize)
  },

  methods: {
    ...mapMutations(['changeSideMenuStatus', 'addMenuClassname', 'changeSelectedMenuHasSubItems']),
    selectMenu () {
      const currentParentUrl = this.$route.path.split('/').filter(x => x !== '')[1]
      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase()
      } else {
        this.selectedParentMenu = 'dashboards'
      }
    },
    changeSelectedParentHasNoSubmenu (parentMenu) {
      this.selectedParentMenu = parentMenu
      this.changeSelectedMenuHasSubItems(false)
      this.changeSideMenuStatus({ step: 0, classNames: this.menuType })
    },
    openSubMenu (e, selectedParent) {
      this.changeSelectedMenuHasSubItems(true)

      const currentClasses = this.menuType ? this.menuType.split(' ').filter(x => x !== '') : ''

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (this.menuClickCount === 2 || this.menuClickCount === 0)
        ) {
          this.changeSideMenuStatus({ step: 3, classNames: this.menuType })
        } else if (
          currentClasses.includes('menu-hidden') &&
          (this.menuClickCount === 1 || this.menuClickCount === 3)
        ) {
          this.changeSideMenuStatus({ step: 2, classNames: this.menuType })
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (this.menuClickCount === 1 || this.menuClickCount === 3)
        ) {
          this.changeSideMenuStatus({ step: 0, classNames: this.menuType })
        }
      } else {
        this.addMenuClassname({ classname: 'sub-show-temporary', currentClasses: this.menuType })
      }
      this.selectedParentMenu = selectedParent
    },
    addEvents () {
      document.addEventListener('click', this.handleDocumentClick)
    },
    removeEvents () {
      document.removeEventListener('click', this.handleDocumentClick)
    },
    returnSelectedMenu () {
      if (!this.isMenuOver) {
        this.selectMenu()
      }
    },
    handleDocumentClick (e) {
      if (!this.isMenuOver) {
        let cont = true
        e.path.map(p => {
          if (p.nodeName !== 'svg' && p.className !== undefined && p.className.indexOf('menu-button') > -1) {
            cont = false
          }
        })
        if (cont) {
          this.toggle()
        }
      }
    },
    toggle () {
      const currentClasses = this.menuType.split(' ').filter(x => x !== '')
      if (currentClasses.includes('menu-sub-hidden') && this.menuClickCount === 3) {
        this.changeSideMenuStatus({ step: 2, classNames: this.menuType })
      } else if (currentClasses.includes('menu-hidden') || currentClasses.includes('menu-mobile')) {
        this.changeSideMenuStatus({ step: 0, classNames: this.menuType })
      }
    },
    // Resize
    handleWindowResize (event) {
      if (event && !event.isTrusted) {
        return
      }
      let nextClasses = this.getMenuClassesForResize(this.menuType)
      this.changeSideMenuStatus({ step: 0, classNames: nextClasses.join(' ') })
    },
    getMenuClassesForResize (classes) {
      let nextClasses = classes.split(' ').filter(x => x !== '')
      const windowWidth = window.innerWidth

      if (windowWidth < menuHiddenBreakpoint) {
        nextClasses.push('menu-mobile')
      } else if (windowWidth < subHiddenBreakpoint) {
        nextClasses = nextClasses.filter(x => x !== 'menu-mobile')
        if (
          nextClasses.includes('menu-default') &&
          !nextClasses.includes('menu-sub-hidden')
        ) {
          nextClasses.push('menu-sub-hidden')
        }
      } else {
        nextClasses = nextClasses.filter(x => x !== 'menu-mobile')
        if (
          nextClasses.includes('menu-default') &&
          nextClasses.includes('menu-sub-hidden')
        ) {
          nextClasses = nextClasses.filter(x => x !== 'menu-sub-hidden')
        }
      }
      return nextClasses
    },
    // Change Default Menu Type
    changeDefaultMenuType (containerClassnames) {
      let nextClasses = this.getMenuClassesForResize(containerClassnames)
      this.changeSideMenuStatus({ step: 0, classNames: nextClasses.join(' ') })
    }
  },
  computed: {
    ...mapGetters({
      menuType: 'getMenuType',
      menuClickCount: 'getMenuClickCount',
      selectedMenuHasSubItems: 'getSelectedMenuHasSubItems'
    })
  },
  watch: {
    menuType: function (val) {
      if (val.indexOf('show-temporary') > -1) {
        this.addEvents()
      } else {
        this.removeEvents()
      }
    },
    '$route' (to, from) {
      if (to.path !== from.path) {
        this.changeSideMenuStatus({ step: 0, classNames: this.menuType })
        this.selectMenu()
        window.scrollTo(0, top)
      }
    }
  }
}
</script>
