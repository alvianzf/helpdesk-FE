<template>
      <TheFooter>
        <div>
          <!--footer-->
          <a href="https://coreui.io">HoseChat</a>
          <span class="ml-1">&copy; 2020.</span>
        </div>
      </TheFooter>
</template>
<script>
import { Footer as TheFooter } from '@coreui/vue'
export default {
  name: 'DefaultFooter',
  components: {
    TheFooter
  },
}
</script>
