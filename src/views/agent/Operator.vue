<template>
    <div>
        <Loading :loading="loading" />
        <b-row>
            <b-col sm="12" md="12">
                <b-card>
                    <b-button
                        v-b-modal.modaladd
                        variant="primary"
                        size="md"
                        class="mg-b-15"
                    >Add New Operator</b-button>
                    <b-table responsive="sm" :items="users" :fields="fields" :current-page="currentPage" :per-page="perPage" :fixed="true">
                        <template v-slot:cell(website)="data">
                            {{ data.item.website ? data.item.website.name : null }}
                        </template>
                        <template v-slot:cell(action)="data">
                            <b-button-group v-if="data.item._id != current_id">
                                <b-button variant="info" @click="edit(data.item._id)">
                                    <i class="fa fa-pencil"></i>
                                </b-button>
                                <b-button variant="success" @click="reset(data.item._id)">
                                    <i class="fa fa-repeat"></i>
                                </b-button>
                                <b-button variant="danger" @click="destroy(data.item._id)">
                                    <i class="fa fa-trash"></i>
                                </b-button>
                            </b-button-group>
                        </template>
                    </b-table>
                    <nav>
                        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>

            <b-modal
                id="modaladd"
                ref="modaladd"
                :title="'Add New Operator'"
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
                        <label>Username <span class="tx-danger">*</span></label>
                        <input type="username" name="username" class="form-control" placeholder="Enter username" 
                            v-bind:class="errors.has('username') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.username" v-validate="'required'" />
                        <span v-show="errors.has('username')" class="help is-danger text-red">{{ errors.first('username') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Password <span class="tx-danger">*</span></label>
                        <input class="form-control" name="password" placeholder="Enter password" type="password"
                            v-bind:class="errors.has('password') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.password" v-validate="'required'" />
                        <span v-show="errors.has('password')" class="help is-danger text-red">{{ errors.first('password') }}</span>
                    </div>
                    <div class="form-group" v-if="user_role == 'super admin'">
                        <label>Website </label>
                        <select v-bind:class="errors.has('website') ? 'form-control is-invalid' : 'form-control'"  v-model="form.website" name="manufacturing" v-validate="'required'">
                            <option selected="selected" value="">Choose Website</option>
                            <option v-for="website in websites" v-bind:key="website.index" v-bind:value="website._id">{{ website.name }}</option>
                        </select>
                        <span v-show="errors.has('website')" class="help is-danger text-red">{{ errors.first('website') }}</span>
                    </div>
                    <div class="form-group" v-else>
                        <label>Website </label>
                        <select disabled v-bind:class="errors.has('website') ? 'form-control is-invalid' : 'form-control'"  v-model="form.website" name="manufacturing" v-validate="'required'">
                            <option selected="selected" value="">Choose Website</option>
                            <option v-for="website in websites" v-bind:key="website.index" v-bind:value="website._id">{{ website.name }}</option>
                        </select>
                        <span v-show="errors.has('website')" class="help is-danger text-red">{{ errors.first('website') }}</span>
                    </div>
                </b-form>
                <template slot="modal-footer">
                    <b-button
                        variant="outline-secondary"
                    >Cencel</b-button>
                    <b-button
                        variant="primary"
                        class="mr-1"
                        @click="save"
                    >Submit</b-button>
                </template>
            </b-modal>

            <b-modal
                id="modaledit"
                ref="modaledit"
                :title="'Update Operator'"
                class="modal-right"
            >
                <b-form>
                    <div class="form-group">
                        <label>Name <span class="tx-danger">*</span></label>
                        <input type="text" name="name" class="form-control" placeholder="Enter name" 
                            v-bind:class="errors.has('name') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form_edit.name" v-validate="'required'"/>
                        <span v-show="errors.has('name')" class="help is-danger text-red">{{ errors.first('name') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Username <span class="tx-danger">*</span></label>
                        <input type="username" name="username" class="form-control" placeholder="Enter username" 
                            v-bind:class="errors.has('username') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form_edit.username" v-validate="'required'" />
                        <span v-show="errors.has('username')" class="help is-danger text-red">{{ errors.first('username') }}</span>
                    </div>
                    <div class="form-group" v-if="user_role == 'super admin'">
                        <label>Website </label>
                        <select v-bind:class="errors.has('website') ? 'form-control is-invalid' : 'form-control'"  v-model="form_edit.website" name="manufacturing" v-validate="'required'">
                            <option selected="selected" value="">Choose Website</option>
                            <option v-for="website in websites" v-bind:key="website.index" v-bind:value="website._id">{{ website.name }}</option>
                        </select>
                        <span v-show="errors.has('website')" class="help is-danger text-red">{{ errors.first('website') }}</span>
                    </div>
                    <div class="form-group" v-else>
                        <label>Website </label>
                        <select disabled v-bind:class="errors.has('website') ? 'form-control is-invalid' : 'form-control'"  v-model="form_edit.website" name="manufacturing" v-validate="'required'">
                            <option selected="selected" value="">Choose Website</option>
                            <option v-for="website in websites" v-bind:key="website.index" v-bind:value="website._id">{{ website.name }}</option>
                        </select>
                        <span v-show="errors.has('website')" class="help is-danger text-red">{{ errors.first('website') }}</span>
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
        </b-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '../misc/Loading'

export default {
    name : 'Operator',
    components : {
        Loading
    },
    computed: {
        totalRows: function () { return this.getRowCount() },
        ...mapGetters({
            users : 'getUsers',
            user : 'getUser',
            response : 'getResponse',
            websites : 'getWebsites',
            loading : 'getLoading'
        })
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
            if(set) {
                this.form_edit = {
                    _id : set._id,
                    name : set.name,
                    username : set.username,
                    website : set.website ? set.website._id : null
                }
            }
        }
    },
    data() {
        return {
            form : {
                website : localStorage.getItem('user_role') == "administrator" ? localStorage.getItem('user_website') : ""
            },
            form_edit : {
                website : localStorage.getItem('user_role') == "administrator" ? localStorage.getItem('user_website') : ""
            },
            current_id : localStorage.getItem('user_id'),
            user_role : localStorage.getItem('user_role'),
            currentPage: 1,
            perPage : 10,
            fields: [
                {   key: 'name', label: 'Name', sortable: true },
                {   key: 'username', label: 'Username', sortable: true },
                'website',
                'action'
            ],
        }
    },
    methods: {
        ...mapActions(['GET_USER_AS_ROLE','GET_USER','DELETE_USER','POST_USER','PUT_USER','GET_WEBSITES','GET_USER_AS_ROLE_AS_WEB','RESET_PASSWORD']),
        edit(id) {
            this.GET_USER({id : id})
            this.$bvModal.show('modaledit')
            this.method = 'update'
        },
        reset(id){
            this.$swal({
                title : 'Are You Sure To Reset This User Password?',
                text : "You won't able to revert this!",
                type : "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, reset it!'
                }).then((result) => {
                    if (result.value) {
                        this.RESET_PASSWORD({ 
                            id : id,
                            call_role : "administrator",
                            call_website : localStorage.getItem('user_website') ? localStorage.getItem('user_website') : null
                        })
                    }
                })
        },
        save(e) {
            this.isLoad = false
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.POST_USER({
                        name : this.form.name,
                        username : this.form.username,
                        password : this.form.password,
                        role : "customer service",
                        website : this.form.website,
                        call_role : "customer service",
                        call_website : localStorage.getItem('user_website') ? localStorage.getItem('user_website') : null
                    })
                    this.$bvModal.hide('modaladd')
                    this.form = {}
                }
            });
        },
        update(e) {
            this.isLoad = false
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.PUT_USER({
                        id : this.form_edit._id,
                        name : this.form_edit.name,
                        username : this.form_edit.username,
                        phone : this.form_edit.phone,
                        website : this.form_edit.website,
                        call_role : "customer service",
                        call_website : localStorage.getItem('user_website') ? localStorage.getItem('user_website') : null
                    })
                    this.$bvModal.hide('modaledit')
                    this.form_edit = {}
                }
            });
        },
        destroy(id) {
            this.$swal({
                title : 'Are You Sure?',
                text : "You won't able to revert this!",
                type : "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.DELETE_USER({ 
                            id : id,
                            call_role : "customer service",
                            call_website : localStorage.getItem('user_website') ? localStorage.getItem('user_website') : null
                        })
                    }
                })
        },
        getRowCount: function () {
            return this.users.length
        }
    },
    async mounted() {
        if(localStorage.getItem('user_role') == "customer service" || localStorage.getItem('user_role') == "administrator") {
            await this.GET_USER_AS_ROLE_AS_WEB({
                role : "customer service",
                website : localStorage.getItem('user_website')
            }).then(() => this.isLoad = true)
        } else {
            await this.GET_USER_AS_ROLE({
                role : "customer service"
            }).then(() => this.isLoad = true)
        }
        this.GET_WEBSITES()
    }
}
</script>