<script>
import Layout from '@layouts/main'
import { mapActions, mapGetters } from 'vuex'

export default {
    name : 'activelist',
    components : { Layout },
    computed : mapGetters({
        chats : 'getChats'
    }),
    methods: {
        ...mapActions(['GET_ACTIVE_LIST','GET_ACTIVE_LIST_BY_OPERATOR'])
    },
    mounted() {
        if(localStorage.getItem('user_role') == "customer service") {
            this.GET_ACTIVE_LIST_BY_OPERATOR({
                active_operator : localStorage.getItem('user_id') 
            })
        } else {
            this.GET_ACTIVE_LIST()
        }
    },
}
</script>
<template>
    <Layout>
        <div class="row">
            <div class="col-md-12">
                <b-card>
                    <header class="header">
                        <h3 class="float-left"> Total 16 chats </h3>
                        <div class="search-box float-right">
                            <input placeholder="Search..." class="form-control">
                        </div>
                    </header>
                    <ul class="message-list">
                        <li v-for="chat in chats" :key="chat._id" class="unread">
                            <div class="row">
                                <div class="text-center col-md-1">
                                    <router-link tag="a" :to="{ name : 'chat.detail' }">
                                        <i class="mdi mdi-eye"></i>
                                    </router-link>
                                </div>
                                <div class="subject col-md-3">
                                    <span> {{ chat.name }} </span>
                                </div>
                                <div class="subject col-md-3">
                                    <span> {{ chat.email }} </span>
                                </div>
                                <div class="subject col-md-3">
                                    <span> {{ chat.phone }} </span>
                                </div>
                                <div class="date col-md-2">11:49 am</div>
                            </div>
                        </li>
                    </ul>
                </b-card>
            </div>
        </div>
    </Layout>
</template>

<style lang="scss" scoped>
    .header {
        padding: 12px 25px;
        border-bottom: 1px solid rgba(152,166,173,.3);
        overflow: hidden;
    }

    .message-list {
        display: block;
        padding-left: 0;
    }

    .message-list li.unread {
        font-weight: 200;
        color: #000000;
    }

    .message-list li {
        position: relative;
        display: block;
        height: 50px;
        line-height: 50px;
        cursor: default;
        -webkit-transition-duration: .3s;
        transition-duration: .3s;
        color: #323a46;
        border-bottom: 1px solid #f3f3f3;
    }
</style>