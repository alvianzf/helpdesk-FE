/* eslint-disable vue/no-unused-components */
<template>
    <div>
        <b-row>
            <b-col xxs="6">
                <b-card :title="'My Account'">
                    <strong> Name </strong>
                    <p>{{ user ? user.name : null}} </p>

                    <strong> Username </strong>
                    <p>{{ user ? user.username : null}} </p>

                    <strong> Role </strong>
                    <p>{{ user ? user.role : null}}  </p>

                    <b-button v-b-modal.modaleditaccount variant="primary" size="lg" style="margin-right : 15px;">Edit Account</b-button>
                    <b-button v-b-modal.modalchangepassword variant="secondary" size="lg">Change Password</b-button>
                </b-card> 
            </b-col>
        </b-row>

        <b-modal
            id="modaleditaccount"
            ref="modaleditaccount"
            :title="'Edit Account'"
            class="modal-right"
        >
            <b-form @submit="update">
                <div class="form-group">
                    <label>Name <span class="tx-danger">*</span></label>
                    <input type="text" name="name" class="form-control" placeholder="Enter name" 
                        v-bind:class="errors.has('name') ? 'form-control is-invalid' : 'form-control'" 
                        v-model="form.name" v-validate="'required'"/>
                    <span v-show="errors.has('name')" class="help is-danger text-red">{{ errors.first('name') }}</span>
                </div>
            </b-form>
            <template slot="modal-footer">
                <b-button
                    variant="outline-secondary"
                    @click="cancelEdit"
                >Cencel</b-button>
                <b-button
                    variant="primary"
                    class="mr-1"
                    @click="update"
                >Submit</b-button>
            </template>
        </b-modal>

        <b-modal
            id="modalchangepassword"
            ref="modalchangepassword"
            :title="'Change Password'"
            class="modal-right"
        >
            <b-form>
                <div class="form-group">
                    <label>Old Password <span class="tx-danger">*</span></label>
                    <input type="password" name="old_password" class="form-control" placeholder="Enter Old Password" 
                        v-bind:class="errors.has('old_password') ? 'form-control is-invalid' : 'form-control'" 
                        v-model="form.old_password" v-validate="'required'"/>
                    <span v-show="errors.has('old_password')" class="help is-danger text-red">{{ errors.first('old_password') }}</span>
                </div>
                <div class="form-group">
                    <label>New Password </label>
                    <input type="password" name="confirm_password" class="form-control" placeholder="Enter New Password"
                        v-bind:class="errors.has('confirm_password') ? 'form-control is-invalid' : 'form-control'" 
                        v-model="form.confirm_password" v-validate="'required'" />
                    <span v-show="errors.has('confirm_password')" class="help is-danger text-red">{{ errors.first('confirm_password') }}</span>
                </div>
            </b-form>
            <template slot="modal-footer">
                <b-button
                    variant="primary"
                    @click="cancelPassword"
                >Cencel</b-button>
                <b-button
                    variant="primary"
                    class="mr-1"
                    @click="changePassword"
                >Submit</b-button>
            </template>
        </b-modal>
    </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    name : 'account',
    computed : mapGetters({
        user : 'getLogined',
        response : 'getResponse'
    }),
    data() {
        return {
            form : {}
        }
    },
    watch: {
        response (set) {
            if(set.success)
            {
                this.$toast.open({
                    message : set.message,
                    type : 'success',
                    position : 'top-right'
                })
            } else {
                this.$toast.open({
                    message : set.message,
                    type : 'error',
                    position : 'top-right'
                })
            }
        },
        user(set) {
            this.form = set
        }
    },
    methods: {
        ...mapActions(['GET_LOGINED_USER','CHANGE_ACCOUNT','CHANGE_PASSWORD']),
        update(e) {
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.CHANGE_ACCOUNT({
                        id : localStorage.getItem('user_id'),
                        name : this.form.name,
                        phone : this.form.phone
                    })
                    this.$bvModal.hide('modaleditaccount')
                }
            });
        },
        changePassword(e) {
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.CHANGE_PASSWORD({
                        email : localStorage.getItem('user_email'),
                        old_password : this.form.old_password,
                        confirm_password : this.form.confirm_password
                    })
                    this.$bvModal.hide('modalchangepassword')
                    this.form.old_password = null
                    this.form.confirm_password = null
                }
            });
        },
        cancelEdit(e) {
            this.$bvModal.hide('modaleditaccount')
        },
        cancelPassword(e) {
            this.$bvModal.hide('modalchangepassword')
        }
    },
    mounted() {
        this.GET_LOGINED_USER({
            id : localStorage.getItem('user_id')
        })
    },
}
</script>
