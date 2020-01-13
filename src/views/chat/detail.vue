<script>
import Layout from '@layouts/main'
import { mapActions, mapGetters } from 'vuex'

export default {
    name : 'detail',
    components : { Layout },
    computed : mapGetters({
        chat : 'getChat',
        response : 'getResponse',
        users : 'getUsers'
    }),
    watch: {
        response (set) {
            if(set.success)
            {
                this.$bvToast.toast(set.message, {
                    title: 'Success',
                    autoHideDelay: 5000,
                    toaster : 'b-toaster-top-right',
                    appendToast: false,
                    variant : 'success'
                })
            } else {
                this.$bvToast.toast(set.message, {
                    title: 'Error',
                    autoHideDelay: 5000,
                    toaster : 'b-toaster-top-right',
                    appendToast: false,
                    variant : 'error'
                })
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
            type : "warning",
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
            this.TRANSFER_CHAT({
                id : this.$route.params.id,
                operator : this.transfer.operator
            })
        }
    },
    mounted() {
        this.FIND_CHAT_BY_ID({
            id : this.$route.params.id
        })
        this.ASSIGN_OPERATOR({
            id : this.$route.params.id,
            operator : localStorage.getItem('user_id')
        })
        this.USERS_BY_WEBSITE({
            website : localStorage.getItem('user_website')
        })
    },
}
</script>
<template>
    <Layout>
        <b-row>
            <b-col cols="12">
                <b-card>
                    <header class="header">
                        <h4> {{ chat ? chat.name : null }} </h4>
                        <span> {{ chat ? chat.phone : null }} </span>
                    </header>
                    <div class="chat-body-list">
                        <div v-for="message in chat.message">
                            <div class='quote float-left' v-if="message.is_guest">
                                <div class='speech-bubble left'>
                                    <blockquote>
                                        <span v-if="!message.media">{{ message.message }}</span>
                                        <img v-bind:src="`${url}/${message.media}`" class="chat-image" v-else/>
                                    </blockquote>
                                    <p>
                                        <span class='time-ago'>
                                            {{ message.createdAt }}
                                        </span>
                                    </p>

                                </div>
                            </div>
                            <div class='quote float-right' v-else>
                                <div class='speech-bubble right grey'>
                                    <blockquote>
                                        <span v-if="!message.media">{{ message.message }}</span>
                                        <img v-bind:src="`${url}/${message.media}`" class="chat-image" v-else/>
                                    </blockquote>
                                    <p>
                                        <span class='time-ago'>
                                            {{ message.createdAt }}
                                        </span>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="chat && chat.is_open">
                        <div class="chat-form">
                            <b-input-group>
                                <b-form-textarea
                                id="textarea"
                                placeholder="Enter something..."
                                rows="2"
                                max-rows="6"
                                v-model="form.message"
                                ></b-form-textarea>
                                <b-input-group-append>
                                    <button type="button" class="btn btn-primary btn-icon">
                                        <input type="file" class="file-pick" accept="image/jpeg,image/png" @change="sendImage"/>
                                        <i class="fas fa-paperclip"></i>
                                    </button>
                                    <button class="btn btn-primary btn-icon" @click="sendMessage">
                                        <i class="mdi mdi-send"></i>
                                    </button>
                                </b-input-group-append>
                            </b-input-group>
                        </div>
                        <button type="button" v-b-modal.modal class="mg-t-10 mg-r-15 btn btn-primary"> Transfer Chat </button>
                        <button type="button" class="mg-t-10 btn btn-danger" @click="endChat"> End Chat </button>
                    </div>
                    <div v-else>
                        <p class="text-center">This chat has closed </p>
                    </div>
                </b-card>
            </b-col>
        </b-row>

        <b-modal id="modal" size="md" title="Choose CSO" hide-footer>
            <form @submit="transferChat"> 
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label>CSO </label>
                            <select v-bind:class="errors.has('operator') ? 'form-control is-invalid' : 'form-control'"  v-model="transfer.operator" name="operator" v-validate="'required'">
                                <option selected="selected" value="">Choose CSO</option>
                                <option v-for="user in users.filter( (v) => v._id != active_user )" v-bind:key="user.index" v-bind:value="user._id">{{ user.name }}</option>
                            </select>
                            <span v-show="errors.has('operator')" class="help is-danger text-red">{{ errors.first('operator') }}</span>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="float-right">
                            <button class="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </b-modal>

    </Layout>
</template>

<style lang="scss" scoped>

    .quote {
        display: inline-block;
        margin: 2ex 0em;
        clear: both;
    }
    .quote p {
        font-weight: 500;
    }
    .quote p .time-ago {
        font-size: 90%;
        color: tint(#2D4154, 40%);
    }
    .quote blockquote {
        color: tint(#2D4154, 20%);
        margin: 0;
    }
    .quote .round-avatar {
        border-radius: 50%;
        border: 1px solid #E0E8ED;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        float: left;
        margin-right: 0.5em;
        width: 60px;
        height: 60px;
    }
    .quote .speech-bubble {
        float: left;
    }
    .quote .speech-bubble.right {
        border: 1px solid #0078ec;
        border-radius: 6px;
        position: relative;
        margin-left: 9px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        margin-right: 4px;
        margin-bottom: 4px;
        padding: 1ex 1em;
        background: #0078ec;
        color: #fff;
    }
    .quote .speech-bubble.left {
        border: 1px solid #E0E8ED;
        border-radius: 6px;
        position: relative;
        margin-left: 9px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        margin-right: 4px;
        margin-bottom: 4px;
        padding: 1ex 1em;
        background: #FDFDFE;
    }
    
    .quote .speech-bubble.left:after, .quote .speech-bubble.left:before {
        content: "";
        display: block;
        position: absolute;
    }
    .quote .speech-bubble.left:after {
        top: 16px;
    }
    .quote .speech-bubble.left:before {
        top: 14px;
    }

    .quote .speech-bubble p {
        line-height: 1.3em;
        margin: 0;
        margin-top: 20px;
        color: #a5a5a5;
        font-weight: 400;
    }
    .header {
        border-bottom: 1px solid rgba(152,166,173,.3);
        overflow: hidden;
    }

    .chat-body-list {
        height: 60vh;
        padding: 0;
        overflow-y: scroll;
    }

    .chat-image {
        width: 500px;
    }

    .mg-t-10 {
        margin-top: 10px;
    }

    .mg-r-15 {
        margin-right: 15px;
    }
</style>