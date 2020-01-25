<template>
  <div id="app-container" :class="getMenuType">
    <top-nav/>
    <sidebar/>
    <main>
      <div class="container-fluid">
        <router-view/>
      </div>
      <div class="notification-box" v-if="getNotifList.length > 0">
        <div v-for="message in getNotifList" :key="message._id">
          <div class="notification-child warning" v-if="message.active_operator == null">
            <span class="badge">{{message.unreadtotal}}</span>
            <router-link :to="{ name : 'chat.detail', params : { id : message._id}}">
                <span> {{ message.ticket_id }} </span>
            </router-link>
          </div>
          <div class="notification-child info" v-if="message.active_operator && message.unreadtotal > 0">
            <span class="badge">{{message.unreadtotal}}</span>
            <router-link :to="{ name : 'chat.detail', params : { id : message._id}}">
                <span> {{ message.ticket_id }} </span>
            </router-link>
          </div>
          <div class="notification-child success" v-if="message.active_operator && message.unreadtotal == 0">
            <router-link :to="{ name : 'chat.detail', params : { id : message._id}}">
                <span> {{ message.ticket_id }} </span>
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
    return { show: false }
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
    ...mapGetters(['getMenuType','getNotifList'])
  },
  methods: {
    ...mapActions(['WAITING_NEW_CHAT_ON_ADMIN','WAITING_NEW_CHAT_ON_OPERATOR'])
  },
  mounted() {
    this.WAITING_NEW_CHAT_ON_OPERATOR( {
      website : localStorage.getItem('user_website')
    })
    this.WAITING_NEW_CHAT_ON_ADMIN()
    this.$notification.requestPermission()
  },
}
</script>
