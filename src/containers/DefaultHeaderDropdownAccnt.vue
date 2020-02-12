<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="icon-user"> </i>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> 
        <router-link to="/account">User</router-link>
      </b-dropdown-item>
      <b-dropdown-item @click="logout"><i class="fa fa-lock"/> Logout</b-dropdown-item>

    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import { mapActions } from 'vuex'

export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },
  methods: {
    ...mapActions(['LOGOUT']),
    logout () {
      this.LOGOUT({
        token : localStorage.getItem('token')
      })
      localStorage.clear()
      this.$router.push('/auth/login')
    }
  },
}
</script>
