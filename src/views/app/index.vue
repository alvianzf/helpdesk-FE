<template>
  <div id="app-container" :class="getMenuType">
    <top-nav/>
    <sidebar/>
    <main>
      <div class="container-fluid">
        <router-view/>
      </div>
      <div class="notification-box" v-if="getNewChat > 0">
        <router-link to="/app/chat/open">
            <span> You have new ticket open </span>
        </router-link>
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
  computed: {
    ...mapGetters(['getMenuType','getNewChat'])
  },
  methods: {
    ...mapActions(['GET_NEW_CHAT_ON_OPERATOR','GET_NEW_CHAT_ON_ADMIN'])
  },
  mounted() {
    this.GET_NEW_CHAT_ON_OPERATOR( {
      website : localStorage.getItem('user_website')
    })
    this.GET_NEW_CHAT_ON_ADMIN()
  },
}
</script>
