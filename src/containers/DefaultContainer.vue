<template>
  <div class="app">
    <DefaultHeader/>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <DefaultFooter/>
    <div :class="getUnreadTotal(getNotif) > 0 ? 'notification-button have-chat' : 'notification-button no-chat'" @click="setClicked">
        <span> {{ getUnreadTotal(getNotif) }} Requests </span>
      </div>
      <div class="notification-list" v-if="clicked">
        <span v-for="notif in getNotif" :key="notif._id">
          <div class="new-list" v-if="notif.active_operator == null" @click="goToChatAndAssign(notif._id)">
            <span class="badge-number">{{ notif.unreadtotal }}</span>
            <p>{{ notif.ticket_id }}</p>
          </div>
          <div :class="notif.unreadtotal > 0 ? 'current-list' : 'current-list no-unread'"  v-else @click="goToChat(notif._id)">
            <span class="badge-number">{{ notif.unreadtotal }}</span>
            <p>{{ notif.ticket_id }}</p>
          </div>
        </span>
      </div>
      <Modal ref="notifChatDetail"/>
  </div>
</template>

<script>
import nav from '@/_nav'
import { Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'
import { mapGetters, mapActions } from 'vuex'
import Modal from './Modal'

export default {
  name: 'DefaultContainer',
  components: {
    AppSidebar,
    AppAside,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    DefaultFooter,
    DefaultHeader,
    Modal
  },
  data () {
    return {
      nav: nav.items,
      show: false, 
      current_user : localStorage.getItem('user_id'),
      clicked : false
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    },
    ...mapGetters(['getNotif'])
  },
  methods: {
    ...mapActions(['GET_NOTIFICATION','GET_NOTIFICATION_GROUP','ASSIGN_OPERATOR']),
    setClicked(e) {
      this.clicked = !this.clicked
    },
    goToChat(id) {
      this.clicked = !this.clicked
      this.$refs.notifChatDetail.getChat(id)
        this.$bvModal.show('notifchatdetail')
    },
    goToChatAndAssign(id) {
      this.clicked = !this.clicked
      this.ASSIGN_OPERATOR({
          id : id,
          operator : localStorage.getItem('user_id'),
          website : localStorage.getItem('current_chat_web')
      })
      this.$refs.notifChatDetail.getChat(id)
      this.$bvModal.show('notifchatdetail')
    },
    getUnreadTotal(items) 
    {
      let total = 0;
      items.map(v => {
        total = total + v.unreadtotal
      })

      return total
    }
  },
  mounted() {
    if(localStorage.getItem('user_role') == "customer service" || localStorage.getItem('user_role') == "administrator") {
      this.GET_NOTIFICATION_GROUP({
          website : localStorage.getItem('user_website')
      })
    } else {
      this.GET_NOTIFICATION()
    }
  },
}
</script>
