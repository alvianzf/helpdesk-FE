/* eslint-disable vue/no-unused-components */
<template>
    <div>
        <b-row>
            <b-colxx xxs="6">
                <b-card :title="'My Account'">
                    <strong> Name </strong>
                    <p>{{ user ? user.name : null}} </p>

                    <strong> Email </strong>
                    <p>{{ user ? user.email : null}} </p>

                    <strong> Phone </strong>
                    <p>{{ user ? user.phone : null}}  </p>

                    <b-button v-b-modal.modaleditaccount variant="primary" size="lg" style="margin-right : 15px;">Edit Account</b-button>
                    <b-button v-b-modal.modalchangepassword variant="secondary" size="lg">Change Password</b-button>
                </b-card> 
            </b-colxx>
        </b-row>

        <b-modal
            id="modaleditaccount"
            ref="modaleditaccount"
            :title="'Edit Account'"
            class="modal-right"
        >
            <b-form>
                <div class="form-group">
                    <label>Name <span class="tx-danger">*</span></label>
                    <input type="text" name="name" class="form-control" placeholder="Enter name" 
                        v-bind:class="errors.has('name') ? 'form-control is-invalid' : 'form-control'" 
                        v-model="form.name" v-validate="'required'"/>
                    <span v-show="errors.has('name')" class="help is-danger text-red">{{ errors.first('name') }}</span>
                </div>
                <div class="form-group">
                    <label>Phone </label>
                    <input type="text" name="phone" class="form-control" placeholder="Enter phone"
                        v-bind:class="errors.has('phone') ? 'form-control is-invalid' : 'form-control'" 
                        v-model="form.phone" v-validate="'required'" />
                    <span v-show="errors.has('phone')" class="help is-danger text-red">{{ errors.first('phone') }}</span>
                </div>
            </b-form>
            <template slot="modal-footer">
                <b-button
                    variant="outline-secondary"
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
                    variant="outline-secondary"
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
        user : 'getUser',
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
                this.$notify('success', 'Success', set.message, { duration: 3000, permanent: false })
            } else {
                this.$notify('error', 'Error', set.message, { duration: 3000, permanent: false })
            }
        },
        user(set) {
            this.form = set
        }
    },
    methods: {
        ...mapActions(['CURRENT_USER','CHANGE_ACCOUNT','CHANGE_PASSWORD']),
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
        }
    },
    mounted() {
        this.CURRENT_USER({
            id : localStorage.getItem('user_id')
        })
    },
}
</script>
