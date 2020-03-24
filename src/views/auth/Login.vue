<template>
  <div class="app flex-row align-items-center">
    <Loading :loading="loading" />
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Username" autocomplete="username email" v-model="form.username"/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Password" autocomplete="current-password" v-model="form.password"/>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import Loading from '../misc/Loading'

export default {
  name: 'Login',
  data() {
    return {
      form : {},
      processing : false
    }
  },
  components : {
    Loading
  },
  computed : mapGetters({
    response : 'getResponse',
    loading : 'getLoading'
  }),
  watch: {
    response (set) {
      if(set.success)
      {
          this.$toast.open({
            message : set.message,
            type : 'success',
            position : 'top-right'
          })
          setTimeout(() => {
            window.location.href='/'

          }, 100)
      } else {
          this.$toast.open({
            message : set.message,
            type : 'error',
            position : 'top-right'
          })
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
