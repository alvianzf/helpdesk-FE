<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
import appConfig from '@/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
}
</script>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
@import '@scss';
</style>
