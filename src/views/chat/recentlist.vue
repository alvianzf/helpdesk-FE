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
        ...mapActions(['GET_RECENT_LIST_BY_WESBITE'])
    },
    mounted() {
        if(localStorage.getItem('user_role') == "customer service") {
            this.GET_RECENT_LIST_BY_WESBITE({
                website : localStorage.getItem('user_website') 
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
                        <h3 class="float-left"> Total {{ chats.length }} chats </h3>
                    </header>
                    <table class="table">
                        <thead>
                            <tr>
                                <td>
                                   No 
                                </td>
                                <td>
                                    Name
                                </td>
                                <td>
                                    Email
                                </td>
                                <td>
                                    Phone
                                </td>
                                <td>
                                    CSO
                                </td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(chat , index) in chats" :key="chat._id">
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>
                                    <span> {{ chat.name }} </span>
                                </td>
                                <td>
                                    <span> {{ chat.email }} </span>
                                </td>
                                <td>
                                    <span> {{ chat.phone }} </span>
                                </td>
                                <td>
                                    <span> {{ chat.active_operator ? chat.active_operator.name : 'No Operator Yet' }} </span>
                                </td>
                                <td>
                                    <router-link tag="a" :to="({ name : 'chat.detail', params : { id : chat._id } })">
                                        <i class="mdi mdi-eye"></i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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

    thead {
        background: #0078ec;
        color: #fff;
    }

    thead tr td {
        border: 0;
    }

    tr.unoperator {
        background : #d7e4f1;
    }
</style>