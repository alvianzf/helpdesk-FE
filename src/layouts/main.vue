<script>
import NavBar from '@components/nav-bar'
import SideBar from '@components/side-bar'
import Footer from '@components/footer'

export default {
  name : 'Layout',
  components: { NavBar, SideBar, Footer },
  data() {
    return {
      isMenuCondensed: false,
      title: this.$route ? this.$route.meta.title || '' : '',
    }
  },
  created: () => {
    document.body.classList.remove('authentication-bg')
  },
  methods: {
    toggleMenu() {
      this.isMenuCondensed = !this.isMenuCondensed
      document.body.classList.toggle('sidebar-enable')
      if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
          navigator.userAgent
        )
      )
        document.body.classList.toggle('enlarged')
    },
    toggleRightSidebar() {
      document.body.classList.toggle('right-bar-enabled')
    },
  },
}
</script>

<template>
  <div id="wrapper">
    <NavBar
      :title="title"
    />
    <SideBar
      :is-condensed="isMenuCondensed"
    />
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="content-page">
      <div class="content">
        <!-- Start Content-->
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <Footer />
    </div>

  </div>
</template>
