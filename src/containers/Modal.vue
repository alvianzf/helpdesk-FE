<template>
    <div>
        <b-modal id="notifchatdetail" size="lg" :hide-footer="true" ref="chat-modal" >
            <template v-slot:modal-header="{ close }">
                <h5>{{ chat.ticket_id }}</h5>
                <button class="btn btn-transparent btn-minimize" @click="closeModal"> 
                    <i class="fa fa-window-minimize" />
                </button>
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
                                <span v-if="!message.media"> {{ message.message }} </span>
                                <a :href="`${url}/${message.media}`" target="__blank" v-else>
                                    <img v-bind:src="`${url}/${message.media}`"  class="img-responsive" style="width: 250px;"/>
                                </a>
                                
                                <span class="time"> {{ date(message.createdAt) }} </span>
                            </div>
                            <div class="operator-chat" v-if="message.is_operator">
                                <span class="operator-title"> {{ singlechat.active_operator ? singlechat.active_operator.name : null }} </span>
                                <span v-if="!message.media"> {{ message.message }} </span>
                                <a :href="`${url}/${message.media}`" target="__blank" v-else>
                                    <img v-bind:src="`${url}/${message.media}`"  class="img-responsive" style="width: 250px;"/>
                                </a>
                                <span class="time"> {{ date(message.createdAt) }} </span>
                            </div>
                        </div>
                        <p class="text-center support-text" v-if="visitor_typing"> Pengunjung sedang mengetik ... </p>
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
                                <input class="input-file" id="my-file" type="file" @change="sendImage" accept="image/*"/>
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
                                <option selected="selected" value="">Pilih CS</option>
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
                        <b-button variant="primary" class="mt-15 btn-block btn-square" @click="transferChat">Transfer Chat</b-button>
                        <b-button variant="danger" class="mt-15 btn-block btn-square" @click="endChat"> Close Chat</b-button>
                    </div>

                    <div class="meta-data">
                        <b-row>
                            <b-col sm="4" md="4">
                                <span class="bold"> Meta Agent </span>
                            </b-col>
                            <b-col sm="2" md="2">
                                <span> : </span>
                            </b-col>
                            <b-col sm="6" md="6">
                                <span> {{ chat.meta_agent }} </span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" md="4">
                                <span class="bold"> Country </span>
                            </b-col>
                            <b-col sm="2" md="2">
                                <span> : </span>
                            </b-col>
                            <b-col sm="6" md="6">
                                <span> {{ chat.meta ? JSON.parse(chat.meta).country_name : null }} </span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" md="4">
                                <span class="bold"> City </span>
                            </b-col>
                            <b-col sm="2" md="2">
                                <span> : </span>
                            </b-col>
                            <b-col sm="6" md="6">
                                <span> {{ chat.meta ? JSON.parse(chat.meta).city : null }} </span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" md="4">
                                <span class="bold"> Timezone </span>
                            </b-col>
                            <b-col sm="2" md="2">
                                <span> : </span>
                            </b-col>
                            <b-col sm="6" md="6">
                                <span> {{ chat.meta ? JSON.parse(chat.meta).timezone_name : null}} </span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" md="4">
                                <span class="bold"> ISP </span>
                            </b-col>
                            <b-col sm="2" md="2">
                                <span> : </span>
                            </b-col>
                            <b-col sm="6" md="6">
                                <span> {{ chat.meta ? JSON.parse(chat.meta).isp : null}} </span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" md="4">
                                <span class="bold"> Ip Address </span>
                            </b-col>
                            <b-col sm="2" md="2">
                                <span> : </span>
                            </b-col>
                            <b-col sm="6" md="6">
                                <span> {{ chat.meta ? JSON.parse(chat.meta).ip : null}} </span>
                            </b-col>
                        </b-row>
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
    props : ['id'],
    computed : mapGetters({
        chat : 'getChat',
        response : 'getResponse',
        users : 'getUsers',
        currentOperator : 'getCurrentOperator',
        isLoad : 'getIsLoad',
        messageEvent : 'getMessageEvent',
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
                website : localStorage.getItem('current_chat_web'),
                role : localStorage.getItem('user_role')
            })
            this.scrollToEnd()
        },
        messageEvent(set) {            
            if(set.id == this.chat._id) {
                this.FIND_CHAT_BY_ID({
                    id : this.chat._id
                })
                
            }
        }
    },
    methods: {
        ...mapActions(['FIND_CHAT_BY_ID','SEND_MESSAGE','ASSIGN_OPERATOR','GET_MESSAGE_EVENT',
            'SEND_MESSAGE_IMAGE','CLOSE_CHAT','GET_USER_AS_ROLE_AS_WEB','TRANSFER_CHAT','SET_READ',
            'OPERATOR_TYPING','VISITOR_TYPING']),
        getChat(id) {
            this.FIND_CHAT_BY_ID({
                id : id
            })
            this.scrollToEnd()
        },
        sendTyping(e) {
            if(this.form.message != "") {
                this.OPERATOR_TYPING(true)
            } else {
                this.OPERATOR_TYPING(false)
            }
        },
        scrollToEnd(e) {
            $('.chat-box').animate({
				scrollTop: 999999999999999999
			}, 'slow');
        },
        async sendMessage(e) {
            e.preventDefault();
            
            if(this.form.message) {
                await this.SEND_MESSAGE({
                    message : this.form.message,
                    id : this.singlechat._id,
                    website : localStorage.getItem('website_id')
                })
                // this.FETCH_OPERATOR_TYPING(null)
                this.form.message = null
                await this.SET_READ({
                    id : this.singlechat._id,
                    website : localStorage.getItem('current_chat_web'),
                    role : localStorage.getItem('user_role')
                })
                await this.scrollToEnd()
            }
        },
        date: function (date) {
            return moment(date).format('h:mm a');
        },
        sendImage(e) {
            e.preventDefault();
            const size =  
               (e.target.files[0].size / 1024 / 1024).toFixed(2); 
  
            if (size > 4) { 
                alert("Max size is 4mb"); 
            } else { 
                var form = {
                    attach : e.target.files[0],
                    id : this.singlechat._id
                }
                this.SEND_MESSAGE_IMAGE(form)
                this.SET_READ({
                    id : this.singlechat._id,
                    website : localStorage.getItem('current_chat_web'),
                    role : localStorage.getItem('user_role')
                })
                this.scrollToEnd()
            } 
            
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
            if(localStorage.getItem('user_role') == "customer service" || localStorage.getItem('user_role') == "administrator") {
                this.SET_READ_OPERATOR({
                    id : this.singlechat._id,
                    website : localStorage.getItem('current_chat_web'),
                    role : localStorage.getItem('user_role')
                })
            } else {
                this.SET_READ({
                    id : this.singlechat._id,
                    website : localStorage.getItem('current_chat_web'),
                    role : localStorage.getItem('user_role')
                })
            }
            
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
        },
        closeModal() {
            this.$refs['chat-modal'].hide()
        }
    },
    mounted() {
        // $(this.$el).on('show.bs.modal', this.getChat(this.id));
        this.GET_MESSAGE_EVENT()
        this.GET_USER_AS_ROLE_AS_WEB({
            role : "customer service",
            website : localStorage.getItem('current_chat_web')
        })
        this.VISITOR_TYPING()
    },
}
</script>