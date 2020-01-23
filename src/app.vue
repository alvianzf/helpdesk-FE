<template>
  <div class="h-100">
    <router-view/>
  </div>
</template>
<script>
import { getDirection } from '@/utils'
import { mapActions, mapGetters } from 'vuex'

export default {
  name : 'app',
  computed: mapGetters({
    token : 'getCheckToken'
  }),
  methods: {
    ...mapActions(['CHECK_TOKEN'])
  },
  mounted() {
    this.CHECK_TOKEN({
      token : localStorage.getItem('token')
    })
  },
  beforeMount () {
    const direction = getDirection()
    if (direction.isRtl) {
      document.body.classList.add('rtl')
      document.dir = 'rtl'
      document.body.classList.remove('ltr')
    } else {
      document.body.classList.add('ltr')
      document.dir = 'ltr'
      document.body.classList.remove('rtl')
    }
  }
}
</script>
