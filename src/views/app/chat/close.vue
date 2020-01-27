<template>
    <b-row>
        <b-colxx class="disable-text-selection">
            <b-row>
                <b-colxx xxs="12">
                    <h1>History Ticket List</h1>

                    <piaf-breadcrumb/>
                    <div class="separator mb-5"/>
                </b-colxx>
            </b-row>
            <template v-if="isLoad">
                <b-row>
                    <b-colxx sm="12" md="12" class="mb-4">
                        <v-client-table :columns="columns" :data="rows" :options="options" ref="table">
                            <div slot="time" slot-scope="props">
                                {{ date(props.row.createdAt) }}
                            </div>
                            <div slot="taken_by" slot-scope="props">
                                {{ props.row.active_operator ? props.row.active_operator.name : 'Not Served'}}
                            </div>
                            <div slot="action" slot-scope="props">
                                <router-link :to="{ name : 'chat.detail', params : { id : props.row.id}}" class="btn btn-info btn-icon">
                                    <i class="simple-icon-share-alt mg-r-0"></i>
                                </router-link>
                                <button v-if="role == 'administrator' || role == 'super admin'" type="button" class="btn btn-danger btn-icon delete" @click="destroy(props.row.id)">
                                    <i class="simple-icon-trash mg-r-0"></i>
                                </button>
                            </div>
                        </v-client-table>
                    </b-colxx>
                </b-row>
            </template>
            <template v-else>
                <div class="loading"></div>
            </template>
        </b-colxx>
    </b-row>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
    name : 'close',
    data() {
        return {
            isLoad : true,
            columns: ['ticket_id', 'time', 'taken_by','action'],
            rows: [],
            options: {
                headings: {
                    ticket_id: 'Number'
                },
                sortable: ['ticket_id'],
                filterable: ['ticket_id']
            },
            method : 'post',
            role : localStorage.getItem('user_role')
        }
    },
    computed : mapGetters({
        chats : 'getChats'
    }),
    watch: {
        chats(set) {
            this.rows = []
            set.forEach(v => {
                this.rows.push({
                    id : v._id,
                    ticket_id : v.ticket_id,
                    createdAt : v.createdAt,
                    active_operator : v.active_operator,
                    website : v.website
                })
            })
        },
        response (set) {
            if(set.success)
            {
                this.$notify('success', 'Success', set.message, { duration: 3000, permanent: false })
            } else {
                this.$notify('error', 'Error', set.message, { duration: 3000, permanent: false })
            }
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
    },
}
</script>
