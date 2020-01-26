<template>
    <b-row>
        <b-colxx class="disable-text-selection">
            <b-row>
                <b-colxx xxs="12">
                    <h1>New Ticket List</h1>

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
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
    name : 'active',
    data() {
        return {
            isLoad : true,
            columns: ['ticket_id', 'time','action'],
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
                    createdAt : v.createdAt
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
        ...mapActions(['LIST_UNOPERATOR_BY_WEBSITE','GET_ACTIVE_LIST']),
        date: function (date) {
            return moment(date).format('MMM D YYYY, h:mm:ss a');
        }
    },
    mounted() {
        if(localStorage.getItem('user_role') == "customer service") {
            this.LIST_UNOPERATOR_BY_WEBSITE({
                website : localStorage.getItem('user_website')
            })
        } else {
            this.GET_ACTIVE_LIST()
        }
    },
}
</script>
