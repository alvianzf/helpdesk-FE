<template>
    <div>
        <Loading :loading="loading" />
        <b-row>
            <b-col sm="12" md="12">
                <b-card>
                    <b-table responsive="sm" selectable :items="chats" :fields="fields" :current-page="currentPage" :per-page="perPage" :fixed="true" @row-selected="onRowSelected">
                        <template v-slot:cell(time)="data">
                            {{ date(data.item.createdAt) }}
                        </template>
                        <template v-slot:cell(message)="data">
                            {{ data.item.message[0].message }}
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
    name : 'New',
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
                'time',
                'message'
            ]
        }
    },
    methods: {
        ...mapActions(['GET_NEW_LIST_GLOBAL','GET_NEW_LIST_GROUP','ASSIGN_OPERATOR']),
        date: function (date) {
            return moment(date).format('MMM D YYYY, h:mm:ss a');
        },
        getRowCount: function () {
            return this.chats.length
        },
        onRowSelected(items) {
            if(items.length > 0) {
                this.$refs.modalDetail.getChat(items[0]._id)
                this.ASSIGN_OPERATOR({
                    id : items[0]._id,
                    operator : localStorage.getItem('user_id'),
                    website : localStorage.getItem('current_chat_web')
                })
                this.$bvModal.show('chatdetail')
            }
        },
    },
    mounted() {
        if(localStorage.getItem('user_role') == "customer service" || localStorage.getItem('user_role') == "administrator") {
            this.GET_NEW_LIST_GROUP({
                website : localStorage.getItem('user_website')
            })
        } else {
            this.GET_NEW_LIST_GLOBAL()
        }
    }
}
</script>