/* eslint-disable vue/no-unused-components */
<template>
  <div>
    <b-row>
        <b-colxx xxs="3">
            <b-card :title="'Total Chat'">
                {{ total_chat }}
            </b-card> 
        </b-colxx>
        <b-colxx xxs="3">
            <b-card :title="'Total Open Chat'">
                {{ total_open }}
            </b-card> 
        </b-colxx>
        <b-colxx xxs="3">
            <b-card :title="'Total Active Chat'">
                {{ total_active }}
            </b-card> 
        </b-colxx>
        <b-colxx xxs="3">
            <b-card :title="'Total Close Chat'">
                {{ total_close }}
            </b-card> 
        </b-colxx>
    </b-row>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name : 'default',
    computed : mapGetters({
        total_chat : 'getTotalCount',
        total_open : 'getTotalOpen',
        total_active : 'getTotalActive',
        total_close : 'getTotalClose'
    }),
    methods: {
        ...mapActions(['COUNT_ALL_CHAT_OPERATOR','COUNT_CHAT','COUNT_OPEN_CHAT_OPERATOR',
            'COUNT_CHAT_OPEN','COUNT_ACTIVE_CHAT_OPERATOR','COUNT_CHAT_ACTIVE',
            'COUNT_CLOSE_CHAT_OPERATOR'])
    },
    mounted() {
        if(localStorage.getItem('user_role') == "customer service") {
            this.COUNT_ALL_CHAT_OPERATOR({
                operator : localStorage.getItem('user_id')
            })
            this.COUNT_OPEN_CHAT_OPERATOR({
                website : localStorage.getItem('user_website'),
            })
            this.COUNT_ACTIVE_CHAT_OPERATOR({
                operator : localStorage.getItem('user_id')
            })
            this.COUNT_CLOSE_CHAT_OPERATOR({
                operator : localStorage.getItem('user_id')
            })
        } else {
            this.COUNT_CHAT()
            this.COUNT_CHAT_OPEN()
            this.COUNT_CHAT_ACTIVE()
            this.COUNT_CHAT_CLOSE()
        }
    },
}
</script>
