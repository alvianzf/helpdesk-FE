<template>
  <div id="app-container" :class="getMenuType">
    <top-nav/>
    <sidebar/>
    <main>
      <div class="container-fluid">
        <router-view/>
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
    ...mapGetters(['getMenuType'])
  },
  methods: {
    
  },
  mounted() {
    this.$notification.requestPermission()
  },
}
</script>
