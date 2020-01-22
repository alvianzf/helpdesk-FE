<template>
  <div id="app-container" :class="getMenuType">
    <top-nav/>
    <sidebar/>
    <main>
      <div class="container-fluid">
        <router-view/>
      </div>
      <div class="notification-box">
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
import { mapGetters } from 'vuex'

export default {
  data () {
    return { show: false }
  },
  components: {
    TopNav,
    Sidebar
  },
  computed: {
    ...mapGetters(['getMenuType'])
  }
}
</script>
