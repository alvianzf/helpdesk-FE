<script>
import Layout from '@layouts/auth'
export default {
    name : 'login',
    components : { Layout }
}
</script>
<template>
    <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="text-center">
          <a href="/">
            <span>
                Logo
            </span>
          </a>
          <p class="text-muted mt-2 mb-4">Responsive Admin Dashboard</p>
        </div>

        <div class="card">
          <div class="card-body p-4">

            <div class="text-center mb-4">
              <h4 class="text-uppercase mt-0">Sign In</h4>
            </div>

            <b-alert
              variant="danger"
              dismissible
            >
              
            </b-alert>

            <b-form>
              <b-form-group
                id="input-group-1"
                label="Username"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="username"
                  type="text"
                  required
                  placeholder="Enter username"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Password"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="password"
                  type="password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="button-group"
                class="mt-4"
              >
                <b-button
                  type="submit"
                  variant="primary"
                  class="btn-block"
                >Log In</b-button>
              </b-form-group>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="row mt-3">
          <div class="col-12 text-center">
            <p>
              <router-link
                tag="a"
                to="/forget-password"
                class="text-muted ml-1"
              ><i class="fa fa-lock mr-1"></i>Forgot your password?</router-link>
            </p>
            <p class="text-muted">Don't have an account?
              <router-link
                tag="a"
                to="/register"
                class="text-dark ml-1"
              ><b>Sign Up</b></router-link>
            </p>
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>