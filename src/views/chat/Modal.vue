<template>
    <div>
        <b-modal id="chatdetail" size="lg" :hide-footer="true">
            <template v-slot:modal-header="{ close }">
                <h5>{{ chat.ticket_id }}</h5>
            </template>
            <b-row>
                <b-col sm="9" md="9">
                    <div class="chat-box">
                        <div v-for="message in chat.message" :key="message._id">
                            <div class="system-chat" v-if="message.is_system">
                                {{ message.message }}
                                <span class="time"> {{ date(message.createdAt) }} </span>
                            </div>
                            <div class="visitor-chat" v-if="message.is_guest">
                                <span class="visitor-title"> Visitor </span>
                                {{ message.message }}
                                <span class="time"> {{ date(message.createdAt) }} </span>
                            </div>
                            <div class="operator-chat" v-if="message.is_operator">
                                <span class="operator-title"> {{ singlechat.active_operator ? singlechat.active_operator.name : null }} </span>
                                {{ message.message }}
                                <span class="time"> {{ date(message.createdAt) }} </span>
                            </div>
                        </div>
                        <p class="text-center support-text" v-if="visitor_typing"> Visitor is typing.... </p>
                    </div>
                    <div class="chat-input" v-if="chat.is_open">
                        <b-form-textarea
                            id="textarea"
                            rows="6"
                            max-rows="6"
                            v-model="form.message" @keyup.native.enter="sendMessage" @input="sendTyping" @click="setRead"
                        ></b-form-textarea>
                        <div class="chat-attachment">
                            <div class="input-file-container">  
                                <input class="input-file" id="my-file" type="file"/>
                                <label tabindex="0" for="my-file" class="input-file-trigger">
                                    <i class="fa fa-paperclip"></i> Attach
                                </label>
                            </div>
                        </div>
                    </div>
                </b-col>
                <b-col sm="3" md="3">
                    <div class="chat-action" v-if="chat.is_open">
                        <div class="form-group">
                            <label>Transfer Chat To</label>
                            <select v-bind:class="errors.has('operator') ? 'form-control is-invalid' : 'form-control'"  v-model="transfer.operator" name="operator" v-validate="'required'">
                                <option selected="selected" value="">Choose CSO</option>
                                <option v-for="user in users.filter( (v) =>{
                                    if( v._id != active_user) {
                                        return false
                                    }
                                    if( v.is_online != true){
                                        return false
                                    }
                                })" v-bind:key="user.index" v-bind:value="user._id">{{ user.name }}</option>
                            </select>
                            <span v-show="errors.has('operator')" class="help is-danger text-red">{{ errors.first('operator') }}</span>
                        </div>
                        <b-button variant="primary" class="mt-15 btn-block btn-square">Transfer Ticket</b-button>
                        <b-button variant="danger" class="mt-15 btn-block btn-square" @click="endChat"> Close Ticket</b-button>
                    </div>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import $ from 'jquery'

export default {
    name : 'Modal',
    computed : mapGetters({
        chat : 'getChat',
        response : 'getResponse',
        users : 'getUsers',
        currentOperator : 'getCurrentOperator',
        visitor_typing : 'getVisitorTyping'
    }),
    data() {
        return {
            singlechat : {},
            form : {},
            url : process.env.VUE_APP_API,
            transfer : {
                operator : ""
            },
            active_user : localStorage.getItem('user_id')
        }
    },
    watch : {
        chat(set) {
            this.singlechat = set
            localStorage.setItem('current_chat_web', set.website)
            this.SET_READ({
                id : set._id,
                website : localStorage.getItem('current_chat_web')
            })
            this.scrollToEnd()
        }
    },
    methods: {
        ...mapActions(['FIND_CHAT_BY_ID','SEND_MESSAGE','ASSIGN_OPERATOR',
            'SEND_MESSAGE_IMAGE','CLOSE_CHAT','GET_USER_AS_ROLE_AS_WEB','TRANSFER_CHAT','SET_READ',
            'FETCH_OPERATOR_TYPING','GET_VISITOR_TYPING']),
        getChat(id) {
            this.FIND_CHAT_BY_ID({
                id : id
            })
            this.scrollToEnd()
        },
        sendTyping(e) {
            if(this.form.message != "") {
                this.FETCH_OPERATOR_TYPING(localStorage.getItem('user_name'))
            } else {
                this.FETCH_OPERATOR_TYPING(null)
            }
        },
        scrollToEnd(e) {
            $('.chat-box').animate({
				scrollTop: 999999999999999999
			}, 'slow');
        },
        sendMessage(e) {
            e.preventDefault();
            
            if(this.form.message) {
                this.SEND_MESSAGE({
                    message : this.form.message,
                    id : this.singlechat._id,
                    website : localStorage.getItem('website_id')
                })
                this.FETCH_OPERATOR_TYPING(null)
                this.form.message = null
                this.SET_READ({
                    id : this.singlechat._id,
                    website : localStorage.getItem('current_chat_web')
                })
                this.scrollToEnd()
            }
        },
        date: function (date) {
            return moment(date).format('h:mm a');
        },
        sendImage(e) {
            e.preventDefault();
            var form = {
                attach : e.target.files[0],
                id : this.singlechat._id
            }
            this.SEND_MESSAGE_IMAGE(form)
            this.SET_READ({
                id : this.singlechat._id,
                website : localStorage.getItem('current_chat_web')
            })
            this.scrollToEnd()
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
                        id : this.singlechat._id
                    })
                    this.scrollToEnd()
                }
            })
            
        },
        setRead(e) {
            this.SET_READ({
                id : this.singlechat._id,
                website : localStorage.getItem('current_chat_web')
            })
            this.scrollToEnd()
        },
        transferChat(e) {
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if(valid) {
                    this.TRANSFER_CHAT({
                        id : this.singlechat._id,
                        operator : this.transfer.operator
                    })
                }
            })
            this.scrollToEnd()
        }
    },
    mounted() {
        this.GET_VISITOR_TYPING()
        this.GET_USER_AS_ROLE_AS_WEB({
            role : "customer service",
            website : localStorage.getItem('current_chat_web')
        })
    },
}
</script>