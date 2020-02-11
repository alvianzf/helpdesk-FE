<template>
 <loading
     :show="loading"
     :label="label">
 </loading>
</template>

<script>
import loading from 'vue-full-loading'

export default {
    components: {
        loading
    },
    props : ['loading'],
    data(){
        return {
            label: 'Loading...'
        }
    }
}
</script>