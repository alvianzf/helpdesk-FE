<script>
import appConfig from '@/app.config'
import Layout from '@layouts/main'

export default {
  components : {
      Layout
  },
  page: {
    title: 'Dashboard',
    meta: [{ name: 'description', content: appConfig.description }],
  }
}
</script>

<template>
  <Layout>
    <div>
        <p>This is Dashboard Page </p>
    </div>
  </Layout>
</template>
