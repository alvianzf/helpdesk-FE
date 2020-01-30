<template>
  <div id="app-container" :class="getMenuType">
    <top-nav/>
    <sidebar/>
    <main>
      <div class="container-fluid">
        <router-view :key="$route.fullPath"/>
        
      </div>
      <div class="notification-list">
          <div class="new-list" v-for="notif in getNewNotif" :key="notif._id">
            <router-link :to="{ name : 'chat.detail', params : { id : notif._id }}">
              <span class="badge-number">{{ notif.unreadtotal }}</span>
              <p>{{ notif.ticket_id }}</p>
            </router-link>
          </div>
          <div v-for="notif in getCurrentNofif" :key="notif._id" :class="notif.unreadtotal > 0 ? 'current-list' : 'current-list no-unread'" >
            <div v-if="current_user == notif.active_operator">
              <router-link :to="{ name : 'chat.detail', params : { id : notif._id }}">
                <span class="badge-number" v-if="notif.unreadtotal > 0">{{ notif.unreadtotal }}</span>
                <p>{{ notif.ticket_id }}</p>
              </router-link>
            </div>
          </div>
        </div>
    </main>
  </div>
</template>
<script>
import Sidebar from '@/containers/Sidebar'
import TopNav from '@/containers/TopNav'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return { show: false, current_user : localStorage.getItem('user_id') }
  },
  components: {
    TopNav,
    Sidebar
  },
  watch: {
    getNotifList(set)
    {
      if(set.length > 0) {
        this.$notification.show('New Ticket Open', {
          body: 'You have new ticket open'
        }, {})
      }
    }
  },
  computed: {
    ...mapGetters(['getMenuType','getNewNotif','getCurrentNofif'])
  },
  methods: {
    ...mapActions(['FETCH_NEW_NOTIF_GLOBAL','FETCH_NEW_NOTIF_GROUP','FETCH_CURRENT_NOTIF_GLOBAL'])
  },
  mounted() {
    if(localStorage.getItem('user_role') == "customer service" || localStorage.getItem('user_role') == "administrator") {
      this.FETCH_NEW_NOTIF_GROUP({
          website : localStorage.getItem('user_website')
      })
      this.FETCH_CURRENT_NOTIF_GROUP({
        website : localStorage.getItem('user_website')
      })
    } else {
      this.FETCH_NEW_NOTIF_GLOBAL()
      this.FETCH_CURRENT_NOTIF_GLOBAL()
    }
    this.$notification.requestPermission()
  },
}
</script>
