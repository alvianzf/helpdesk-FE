<template>
    <div>
        <Loading :loading="loading" />
        <b-row>
            <b-col sm="12" md="12">
                <b-card>
                    <b-table responsive="sm" selectable :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :fixed="true" @row-clicked="onRowSelected">
                        <template v-slot:cell(time)="data">
                            {{ date(data.item.createdAt) }}
                        </template>
                        <template v-slot:cell(message)="data">
                            {{ data.item.messages[0].message }}
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
    name : 'History',
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
        },
        chats(set) {
            set.forEach(v => {
                this.items.push({
                    id : v._id,
                    ticket_id : v.ticket_id,
                    createdAt : v.createdAt,
                    active_operator : v.active_operator,
                    website : v.website,
                    messages : v.message,
                    _rowVariant : v.active_operator ? null : 'no-operator'
                })
            })
        }
    },
    data() {
        return {
            items : [],
            currentPage: 1,
            perPage : 25,
            fields: [
                { key : 'ticket_id' , label : 'Name' },
                'agent',
                'time',
                'message'
            ],
        }
    },
    methods: {
        ...mapActions(['GET_CLOSE_LIST_GLOBAL','GET_CLOSE_LIST_GROUP','DELETE_CHAT']),
        date: function (date) {
            return moment(date).format('MMM D YYYY, h:mm:ss a');
        },
        destroy(id) {
            this.$swal({
                title : 'Are You Sure?',
                text : "You won't able to revert this!",
                type : "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.DELETE_CHAT({ 
                            id : id,
                            website : localStorage.getItem('user_website')
                        })
                        this.isLoad = true
                    }
                })
        },
        getRowCount: function () {
            return this.chats.length
        },
        async onRowSelected(record, index) {
            await this.$refs.modalDetail.getChat(record.id, record.website)
            this.$bvModal.show('chatdetail')
        }
    },
    mounted() {
        if(localStorage.getItem('user_role') == "customer service" || localStorage.getItem('user_role') == "administrator") {
            this.GET_CLOSE_LIST_GROUP({
                website : localStorage.getItem('user_website')
            })
        } else {
            this.GET_CLOSE_LIST_GLOBAL()
        }
    }
}
</script>