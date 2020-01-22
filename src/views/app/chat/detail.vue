<template>
    <div>
        <b-row class="app-row">
            <b-colxx xxs="12" class="chat-app">
                <div>
                    <div class="d-flex flex-row chat-heading">
                        <div class="d-flex min-width-zero">
                            <div class="card-body pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                <div class="min-width-zero">
                                    <div>
                                        <p class="list-item-heading mb-1 truncate"> {{ chat.ticket_id }} ( {{ chat.is_open ? null : 'ticket closed'}} )</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="separator mb-5"/>
                    <vue-perfect-scrollbar class="scroll" :settings="{ suppressScrollX: true, wheelPropagation: false }" ref="chatArea">
                        <div v-for="message in chat.message">
                            <b-card no-body class="d-inline-block mb-3 float-left" v-if="message.is_guest">
                                <div class="position-absolute pt-1 pr-2 r-0">
                                    <span class="text-extra-small text-muted">11/11/2020</span>
                                </div>
                                <b-card-body>
                                    <div class="d-flex flex-row pb-1">
                                        <div class="d-flex flex-grow-1 min-width-zero">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                                <div class="min-width-zero">
                                                    <p class="mb-0 truncate list-item-heading f-12">Guest</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-left">
                                        <p class="mb-0 text-semi-muted f-15" v-if="!message.media">{{ message.message }}</p>
                                        <img v-bind:src="`${url}/${message.media}`" v-else class="img-responsive" style="width: 400px;"/>
                                    </div>
                                </b-card-body>
                            </b-card>
                            <b-card no-body class="d-inline-block mb-3 float-right" v-else>
                                <div class="position-absolute pt-1 pr-2 r-0">
                                    <span class="text-extra-small text-muted">11/11/2020</span>
                                </div>
                                <b-card-body>
                                    <div class="d-flex flex-row pb-1">
                                        <div class="d-flex flex-grow-1 min-width-zero">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                                <div class="min-width-zero">
                                                    <p class="mb-0 truncate list-item-heading f-12">You</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-left">
                                        <p class="mb-0 text-semi-muted f-15" v-if="!message.media">{{ message.message }}</p>
                                        <img v-bind:src="`${url}/${message.media}`" v-else class="img-responsive" style="width: 400px;"/>
                                    </div>
                                </b-card-body>
                            </b-card>
                            <div class="clearfix"/>
                        </div>
                    </vue-perfect-scrollbar>
                </div>
            </b-colxx>
        </b-row>
        <div class="chat-input-container d-flex justify-content-between align-items-center" v-if="chat.is_open">
            <b-input class="flex-grow-1" type="text" :placeholder="'Say Something...'" v-model="form.message" @keyup.native.enter="sendMessage"/>
            <div>
                <b-button variant="outline-primary" class="icon-button large ml-1">
                    <i class="simple-icon-paper-clip" />
                </b-button>
                <b-button variant="primary" class="icon-button large ml-1" @click="sendMessage">
                    <i class="simple-icon-arrow-right" />
                </b-button>
            </div>
        </div>
        <application-menu>
            <div class="form-group">
                <label>Transfer Chat To</label>
                <select v-bind:class="errors.has('operator') ? 'form-control is-invalid' : 'form-control'"  v-model="transfer.operator" name="operator" v-validate="'required'">
                    <option selected="selected" value="">Choose CSO</option>
                    <option v-for="user in users.filter( (v) => v._id != active_user )" v-bind:key="user.index" v-bind:value="user._id">{{ user.name }}</option>
                </select>
                <span v-show="errors.has('operator')" class="help is-danger text-red">{{ errors.first('operator') }}</span>
            </div>
            <b-button variant="primary" class="mt-15 btn-block btn-square" @click="transferChat">Transfer Ticket</b-button>
            <b-button variant="danger" class="mt-15 btn-block btn-square" @click="endChat"> Close Ticket</b-button>
        </application-menu>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ApplicationMenu from '@/components/Common/ApplicationMenu'
export default {
    name : 'detail',
    components: {
        ApplicationMenu
    },
    computed : mapGetters({
        chat : 'getChat',
        response : 'getResponse',
        users : 'getUsers'
    }),
    watch: {
        response (set) {
            if(set.success)
            {
                this.$notify('success', 'Success', set.message, { duration: 3000, permanent: false })
            } else {
                this.$notify('error', 'Error', set.message, { duration: 3000, permanent: false })
            }
        }
    },
    data() {
        return {
            form : {},
            url : process.env.VUE_APP_API,
            transfer : {
                operator : ""
            },
            active_user : localStorage.getItem('user_id')
        }
    },
    methods: {
        ...mapActions(['FIND_CHAT_BY_ID','SEND_MESSAGE','ASSIGN_OPERATOR',
            'SEND_MESSAGE_IMAGE','CLOSE_CHAT','USERS_BY_WEBSITE','TRANSFER_CHAT']),
        sendMessage(e) {
            e.preventDefault();
            this.SEND_MESSAGE({
                message : this.form.message,
                id : this.$route.params.id
            })
            this.form.message = null
        },
        sendImage(e) {
            e.preventDefault();
            var form = {
                attach : e.target.files[0],
                id : this.$route.params.id
            }
            this.SEND_MESSAGE_IMAGE(form)
        },
        endChat(e) {
            this.$swal({
            title : 'Are You Sure To Close This Chat?',
            text : "You won't able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, close it!'
            }).then((result) => {
                if (result.value) {
                    this.CLOSE_CHAT({
                        id : this.$route.params.id
                    })
                }
            })
            
        },
        transferChat(e) {
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if(valid) {
                    this.TRANSFER_CHAT({
                        id : this.$route.params.id,
                        operator : this.transfer.operator
                    })
                }
            })
        }
    },
    mounted() {
        this.FIND_CHAT_BY_ID({
            id : this.$route.params.id
        })
        this.ASSIGN_OPERATOR({
            id : this.$route.params.id,
            operator : localStorage.getItem('user_id'),
            website : localStorage.getItem('user_website')
        })
        this.USERS_BY_WEBSITE({
            website : localStorage.getItem('user_website')
        })
    },
}
</script>
