<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
            <p class=" text-white h2">Welcome Back</p>
            <p class="white mb-0">Please use your credentials to login.</p>
          </div>
          <div class="form-side">
            <h6 class="mb-4">{{ $t('user.login-title')}}</h6>
            <p class=" text-white h2">Welcome Back</p>
            <p class="white mb-0">Please use your credentials to login.</p>
            <b-form @submit.prevent="login">
              <label class="form-group has-float-label mb-4">
                <input type="text" class="form-control" v-model="form.username">
                <span>Username</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="password" class="form-control" v-model="form.password">
                <span>Password</span>
              </label>
              <div class="d-flex justify-content-between align-items-center">
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow" :disabled="processing">Submit</b-button>
              </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>

import { mapActions,mapGetters } from 'vuex'

export default {
    name : 'login',
    data() {
      return {
        form : {},
        processing : false
      }
    },
    computed : mapGetters({
        response : 'getResponse'
    }),
    watch: {
        response (set) {
            if(set.success)
            {
                this.$notify('success', 'Success', set.message, { duration: 3000, permanent: false })
                setTimeout(() => {
                  this.$router.push('/')
                }, 100)
            } else {
                this.$notify('error', 'Error', set.message, { duration: 3000, permanent: false })
            }
        }
    },
    methods: {
      ...mapActions(['POST_LOGIN']),
      login(e) {
        this.processing = true
        e.preventDefault();
        this.POST_LOGIN({
          username : this.form.username,
          password : this.form.password
        })
        .then(() => {
          this.processing = false
        })
      }
    },
}
</script>
