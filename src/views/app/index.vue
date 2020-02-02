<template>
  <div id="app-container" :class="getMenuType">
    <top-nav/>
    <sidebar/>
    <main>
      <div class="container-fluid">
        <router-view :key="$route.fullPath"/>
      </div>
      <div class="notification-button" @click="setClicked">
        <span> {{ getNotif.length }} Requests </span>
      </div>
      <div class="notification-list" v-if="clicked">
        <span v-for="notif in getNotif" :key="notif._id">
          <div class="new-list" v-if="notif.active_operator == null" @click="goToChat(notif._id)">
            <span class="badge-number">{{ notif.unreadtotal }}</span>
            <p>{{ notif.ticket_id }}</p>
          </div>
          <div :class="notif.unreadtotal > 0 ? 'current-list' : 'current-list no-unread'"  v-else @click="goToChat(notif._id)">
            <span class="badge-number">{{ notif.unreadtotal }}</span>
            <p>{{ notif.ticket_id }}</p>
          </div>
        </span>
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
    return { 
      show: false, 
      current_user : localStorage.getItem('user_id'),
      clicked : false
    }
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
    ...mapGetters(['getMenuType','getNotif'])
  },
  methods: {
    ...mapActions(['GET_NOTIFICATION','GET_NOTIFICATION_GROUP']),
    setClicked(e) {
      this.clicked = !this.clicked
    },
    goToChat(id) {
      this.clicked = !this.clicked
      this.$router.push({ name : 'chat.detail', params : { id : id }})
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
    this.$notification.requestPermission()
  },
}
</script>
