<template>
    <div>
        
        <b-modal id="chatdetail" size="lg" :hide-footer="true" ref="chat-modal">
            <template v-slot:modal-header="{ close }">
                <h5>{{ chat.ticket_id }}</h5>
                <button class="btn btn-transparent btn-minimize" @click="closeModal"> 
                    <i class="fa fa-window-minimize" />
                </button>
            </template>
            <b-row>
                <b-col sm="9" md="9">
                    <div class="chat-box" id="chat-box">
                        <div v-for="message in chat.message" :key="message._id">
                            <div class="system-chat" v-if="message.is_system">
                                {{ message.message }}
                                <span class="time"> {{ date(message.createdAt) }} </span>
                            </div>
                            <div class="visitor-chat" v-if="message.is_guest">
                                <span class="visitor-title"> Visitor </span>
                                <span v-if="!message.media"> {{ message.message }} </span>
                                <a :href="`${url}/${message.media}`" target="__blank" v-else>
                                    <img v-bind:src="`${url}/${message.media}`"  class="img-responsive" style="width: 150px; height: 150px;"/>
                                </a>
                                
                                <span class="time"> {{ date(message.createdAt) }} </span>
                            </div>
                            <div class="operator-chat" v-if="message.is_operator">
                                <span class="operator-title"> {{ singlechat.active_operator ? singlechat.active_operator.name : null }} </span>
                                <span v-if="!message.media"> {{ message.message }} </span>
                                <a :href="`${url}/${message.media}`" target="__blank" v-else>
                                    <img v-bind:src="`${url}/${message.media}`"  class="img-responsive" style="width: 150px; height: 150px;"/>
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
                        <b-button variant="danger" class="mt-15 btn-block btn-square" v-shortkey="['ctrl','.']" @shortkey="endChat" @click="endChat"> Close Chat</b-button>
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
    computed : mapGetters({
        chat : 'getChat',
        response : 'getResponse',
        users : 'getOnlineAgents',
        currentOperator : 'getCurrentOperator',
        visitor_typing : 'getVisitorTyping',
        isLoad : 'getIsLoad',
        messageEvent : 'getMessageEvent',
        options : 'getSuggests'
    }),
    data() {
        return {
            singlechat : {},
            form : {},
            url : process.env.VUE_APP_API,
            transfer : {
                operator : ""
            },
            active_user : localStorage.getItem('user_id'),
            textSuggestionState : false,
            scrollVisible : false,
            textSuggestionWidth : 0,
            referralSearch : [],
            selectedIndex : -1,
            referralSearchSelectedId : 0,
            inputValTemp : '',
            inputValIdTemp : 0,
        }
    },
    watch : {
        async chat(set) {
            this.singlechat = set
            await this.scrollToEnd()
        },
        isLoad(set) {
        
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
        ...mapActions(['FIND_CHAT_BY_ID','SEND_MESSAGE','ASSIGN_OPERATOR','GET_MESSAGE_EVENT','OPERATOR_TYPING',
            'SEND_MESSAGE_IMAGE','CLOSE_CHAT','GET_ONLINE_AGENT','TRANSFER_CHAT','SET_READ','CHAT_BY_ID','SET_READ_OPERATOR',
            'VISITOR_TYPING','GET_SUGGESTS']),
        async getChat(id, website) {
            await this.FIND_CHAT_BY_ID({
                id : id
            })
            await this.SET_READ({
                id : id,
                website : website,
                role : localStorage.getItem('user_role')
            })
            localStorage.setItem('current_chat_web', website)
        },
        sendTyping(e) {
            if(this.form.message != "" || this.form.message == null || this.form.message == undefined) {
                this.OPERATOR_TYPING(true)
            } else {
                this.OPERATOR_TYPING(false)
            }
        },
        scrollToEnd(e) {
            var objDiv = document.getElementById("chat-box");
        	objDiv.scrollTop = objDiv.scrollHeight;
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
                await this.SET_READ({
                    id : this.singlechat._id,
                    website : localStorage.getItem('current_chat_web'),
                    role : localStorage.getItem('user_role')
                })
                await this.OPERATOR_TYPING(false)
                await this.scrollToEnd()
                this.form.message = null
            }
        },
        date: function (date) {
            return moment(date).format('h:mm a');
        },
        async sendImage(e) {
            e.preventDefault();
            const size =  (e.target.files[0].size / 1024 / 1024).toFixed(2); 

            if (size > 2) { 
                alert("Max size is 2mb"); 
            } else { 
                var form = {
                    attach : e.target.files[0],
                    id : this.singlechat._id
                }
                await this.SEND_MESSAGE_IMAGE(form)
                await this.SET_READ({
                    id : this.singlechat._id,
                    website : localStorage.getItem('current_chat_web'),
                    role : localStorage.getItem('user_role')
                })
                await this.scrollToEnd()
                await this.OPERATOR_TYPING(false)
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
            }).then(async (result) => {
                if (result.value) {
                    await this.CLOSE_CHAT({
                        id : this.singlechat._id
                    })
                    await this.scrollToEnd()
                    await this.closeModal()
                }
            })
        },
        setRead(e) {
            this.SET_READ({
                id : this.singlechat._id,
                website : localStorage.getItem('current_chat_web'),
                role : localStorage.getItem('user_role')
            })
            
            // this.scrollToEnd()
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
        },
        getReferralSuggestion : function(query){
            if(event.keyCode == 13) {
                this.sendMessage(event)
            } else {
                $("#scrollContent1").scrollTop(0);
                this.selectedIndex = -1;
                this.textSuggestionWidth = this.$refs.textSuggestionRef.clientWidth;
                var state = false;
                if(query == ''){
                    this.referralSearch = [];
                    this.scrollVisible = false;
                }
                else{
                    this.referralSearch = [];
                    this.options.forEach(item => {
                        if ((item.description.includes(query))) {
                            state = true;
                            if(state){
                                var rTemp = {};
                                rTemp.id = item.id;
                                rTemp.text = item.description;
                                this.referralSearch.push(rTemp);
                                this.scrollVisible = true;
                            }
                            else this.selectedIndex = -1;
                        }
                        else{
                            this.scrollVisible = false;
                        }
                    });
                }
                if(this.form.message == '' || this.form.message == null || this.referralSearch.length == 0)
                {
                    this.textSuggestionState = false;
                }
                else {
                    this.textSuggestionState = true;
                }
            }
            
        },
        setScroll: function(){
            var selected = this.selectedIndex;
            var elHeight = $("#ulScrollContent").height();
            var scrollTop = $("#scrollContent1").scrollTop();
            var viewport = scrollTop + $("#scrollContent1").height();
            var elOffset = elHeight * selected;
            if (elOffset < scrollTop || (elOffset + elHeight) > viewport)
                $("#scrollContent1").scrollTop(elOffset);
        },
        setReferralTest : function(input){
            this.form.message = input.text;
            this.textSuggestionState = false;
        },
        textSuggestionControl : function () {
            var _this = this;
            setTimeout(function () {
                _this.textSuggestionState = false;
            },300)
        }
    },
    mounted() {
        // this.GET_VISITOR_TYPING()
        this.GET_MESSAGE_EVENT()
        this.GET_ONLINE_AGENT({
            role : "customer service",
            website : localStorage.getItem('current_chat_web')
        })
        this.VISITOR_TYPING()
        let that = this
        setTimeout(function(){ 
			// that.scrollToEnd()
		}, 2000);
        this.GET_SUGGESTS()
    }
}
</script>
<style scoped>
    .form-element-margin-btm {
        margin-bottom: 0px;
    }
    .margin-top-grid{
        margin-top: 8px;
    }
    .textArea-suggestion{
        position: absolute;
        z-index: 9999;
        background-color: #ffffff;
        box-shadow: 0px 0px 5px #1E90FF;
        transition: all .15s ease;
        -webkit-transform: translateY(-2px);
        max-height: 150px;
        min-height: 38px;
        overflow-y: auto;
    }
    .textArea-suggestion ul li{
        padding: 8px;
        font-weight: normal;
        border-bottom: 1px solid #FAFAFA;
        color : #777777;
    }
    .textArea-suggestion ul li:hover{
        background-color: #F5F5F5;
        cursor: pointer;
    }
    .scrollContent{
    }
    .selectedWithArrow{
        background-color: #F5F5F5;
    }
    textarea:focus {
        background-color: #fefefe;
        border: 1px solid #8a8a8a;
        box-shadow: 0 0 5px #1E90FF;
        outline: medium none;
        transition: box-shadow 0.5s ease 0s, border-color 0.25s ease-in-out 0s;
    }
    .form-element-margin-btm {
        margin-bottom: 0px;
    }
    .margin-top-grid{
        margin-top: 8px;
    }
    .textArea-suggestion{
        position: absolute;
        z-index: 9999;
        background-color: #ffffff;
        box-shadow: 0px 0px 5px #1E90FF;
        transition: all .15s ease;
        -webkit-transform: translateY(-2px);
        max-height: 150px;
        min-height: 38px;
        overflow-y: auto;
    }

    .textArea-suggestion ul li{
        padding: 8px;
        font-weight: normal;
        border-bottom: 1px solid #FAFAFA;
        color : #777777;
    }

    .textArea-suggestion ul li:hover{
        background-color: #F5F5F5;
        cursor: pointer;
    }

    .scrollContent{

    }
    .selectedWithArrow{
        background-color: #F5F5F5;
    }

    textarea:focus {
        background-color: #fefefe;
        border: 1px solid #8a8a8a;
        box-shadow: 0 0 5px #1E90FF;
        outline: medium none;
        transition: box-shadow 0.5s ease 0s, border-color 0.25s ease-in-out 0s;

    }
</style>