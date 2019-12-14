<script>
export default {
  components: {},
  created: () => {
    document.body.classList.add('authentication-bg')
  },
}
</script>

<template>
  <div>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="#">
        Logo Here
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto" right>
        <b-nav-item href="#">Home</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="account-pages mg-t-25">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>
