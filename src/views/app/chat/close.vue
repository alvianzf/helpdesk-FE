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
                    <b-colxx sm="12" md="12" class="mb-4" v-for="(chat,index) in chats" :key="index">
                        <b-card class="d-flex flex-row" no-body>
                            <div class="pl-2 d-flex flex-grow-1 min-width-zero">
                                <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                    <router-link :to="{ name : 'chat.detail', params : { id : chat._id}}" class="w-40 w-sm-100">
                                        <p class="list-item-heading mb-1 truncate">{{ chat.ticket_id}}</p>
                                    </router-link>
                                    <p class="mb-1 text-muted text-small w-15 w-sm-100">{{ date(chat.createdAt ) }}</p>
                                    <p class="mb-1 text-muted text-small w-15 w-sm-100">{{ chat.active_operator ? chat.active_operator.name : 'Not Served' }}</p>
                                    <div class="w-15 w-sm-100">
                                        <b-badge pill :variant="'danger'">Close</b-badge>
                                    </div>
                                </div>
                            </div>
                        </b-card>
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
            isLoad : true
        }
    },
    computed : mapGetters({
        chats : 'getChats'
    }),
    methods: {
        ...mapActions(['GET_RECENT_LIST_BY_WESBITE','GET_RECENT_LIST']),
        date: function (date) {
            return moment(date).format('MMM D YYYY, h:mm:ss a');
        }
    },
    mounted() {
        if(localStorage.getItem('user_role') == "customer service") {
            this.GET_RECENT_LIST_BY_WESBITE({
                website : localStorage.getItem('user_website'),
                operator : localStorage.getItem('user_id') 
            })
        } else {
            this.GET_RECENT_LIST()
        }
    },
}
</script>
