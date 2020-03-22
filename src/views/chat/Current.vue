<template>
    <div>
        <Loading :loading="loading" />
        <b-row>
            <b-col sm="12" md="12">
                <b-card>
                    <b-table responsive="sm" selectable :items="chats" :fields="fields" :current-page="currentPage" :per-page="perPage" :fixed="true" @row-clicked="onRowSelected">
                        <template v-slot:cell(time)="data">
                            {{ date(data.item.createdAt) }}
                        </template>
                        <template v-slot:cell(message)="data">
                            {{ data.item.message[0].message }}
                        </template>
                        <template v-slot:cell(agent)="data">
                            {{ data.item.active_operator ? data.item.active_operator.name : null }}
                        </template>
                    </b-table>
                    <nav>
                        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
        </b-row>
        <Modal ref="modalDetail"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '../misc/Loading'
import moment from 'moment'
import Modal from './Modal'

export default {
    name : 'Current',
    components : {
        Loading,
        Modal
    },
    computed: {
        totalRows: function () { return this.getRowCount() },
        ...mapGetters({
            response : 'getResponse',
            chats : 'getChats',
            loading : 'getLoading'
        })
    },
    watch: {
        response (set) {
            if(set.success)
            {
                this.$toast.open({
                    message : set.message,
                    type : 'success',
                    position : 'top-right'
                })
            } else {
                this.$toast.open({
                    message : set.message,
                    type : 'error',
                    position : 'top-right'
                })
            }
        }
    },
    data() {
        return {
            currentPage: 1,
            perPage : 10,
            fields: [
                { key : 'ticket_id' , label : 'Name' },
                'agent',
                'time',
                'message'
            ]
        }
    },
    methods: {
        ...mapActions(['GET_CURRENT_LIST']),
        date: function (date) {
            return moment(date).format('MMM D YYYY, h:mm:ss a');
        },
        getRowCount: function () {
            return this.chats.length
        },
        async onRowSelected(record, index) {
            await this.$refs.modalDetail.getChat(record._id)
            this.$bvModal.show('chatdetail')
        }
    },
    mounted() {
        this.GET_CURRENT_LIST({
            website : localStorage.getItem('user_website'),
            active_operator : localStorage.getItem('user_id') 
        })
    }
}
</script>