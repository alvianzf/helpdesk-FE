/* eslint-disable vue/no-unused-components */
<template>
  <div>
    <b-row>
        <b-col md="3" xxs="12">
            <b-card :title="'Total Chat'">
                {{ total_chat }}
            </b-card> 
        </b-col>
        <b-col md="3" xxs="12">
            <b-card :title="'Total Open Chat'">
                {{ total_open }}
            </b-card> 
        </b-col>
        <b-col md="3" xxs="12">
            <b-card :title="'Total Active Chat'">
                {{ total_active }}
            </b-card> 
        </b-col>
        <b-col md="3" xxs="12">
            <b-card :title="'Total Close Chat'">
                {{ total_close }}
            </b-card> 
        </b-col>
        <b-col md="6" xxs="12" style="margin-top: 15px;">
            <b-card :title="'Chat Handling Chart'">
                <GChart
                    type="PieChart"
                    :data="chartData"
                    :options="chartOptions"
                />
            </b-card> 
        </b-col>
    </b-row>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import { GChart } from 'vue-google-charts'

export default {
    name : 'default',
    computed : mapGetters({
        total_chat : 'getTotalCount',
        total_open : 'getTotalOpen',
        total_active : 'getTotalActive',
        total_close : 'getTotalClose',
        chartData : 'getAdminChart'
    }),
    data() {
        return {
            chartOptions: {
                chart: {
                    title: 'Total Chat'
                }
            }
        }
    },
    components: {
        GChart
    },
    methods: {
        ...mapActions(['COUNT_ALL_CHAT_OPERATOR','COUNT_CHAT','COUNT_OPEN_CHAT_OPERATOR',
            'COUNT_CHAT_OPEN','COUNT_ACTIVE_CHAT_OPERATOR','COUNT_CHAT_ACTIVE',
            'COUNT_CLOSE_CHAT_OPERATOR','COUNT_CHAT_CLOSE','ADMIN_CHART'])
    },
    mounted() {
        if(localStorage.getItem('user_role') == "customer service" || localStorage.getItem('user_role') == "administrator") {
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
            this.ADMIN_CHART()
            this.COUNT_CHAT()
            this.COUNT_CHAT_OPEN()
            this.COUNT_CHAT_ACTIVE()
            this.COUNT_CHAT_CLOSE()
        }
    },
}
</script>
