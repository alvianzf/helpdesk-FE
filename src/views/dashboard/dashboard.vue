<script>
import appConfig from '@/app.config'
import Layout from '@layouts/main'
import { mapGetters, mapActions } from 'vuex'

export default {
  components : {
      Layout
  },
  page: {
    title: 'Dashboard',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  computed: {
    ...mapGetters('test',['GET_TEST'])
  },
  methods: {
    ...mapActions('test',['fetchTest'])
  },
  mounted() {
    this.fetchTest()
  }
}
</script>

<template>
  <Layout>
    <div>
        <p>This is Dashboard Page {{GET_TEST}} </p>
    </div>
  </Layout>
</template>
