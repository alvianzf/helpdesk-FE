<template>
    <b-row>
        <b-colxx class="disable-text-selection">
            <b-row>
                <b-colxx xxs="12">
                    <h1>Super Admin</h1>
                    <div class="top-right-button-container">
                        <b-button
                            v-b-modal.modaladd
                            variant="primary"
                            size="lg"
                            class="top-right-button"
                        >Add New
                        </b-button>
                            <b-modal
                                id="modaladd"
                                ref="modaladd"
                                :title="'Add New Super Admin'"
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
                                :title="'Update Super Admin'"
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
                    </div>
                    <piaf-breadcrumb/>
                    <div class="separator mb-5"/>
                </b-colxx>
            </b-row>
            <template v-if="isLoad">
                <b-row>
                    <b-colxx sm="12" md="12" class="mb-4">
                        <v-client-table :columns="columns" :data="rows" :options="options" ref="table">
                            <div slot="action" slot-scope="props">
                                <button type="button" class="btn btn-success btn-icon edit" @click="reset(props.row.id)" v-if="current_id != props.row.id">
                                    <i class="simple-icon-refresh mg-r-0"></i>
                                </button>
                                
                                <button type="button" class="btn btn-warning btn-icon edit" @click="edit(props.row.id)" v-if="current_id != props.row.id">
                                    <i class="simple-icon-pencil mg-r-0"></i>
                                </button>

                                <button type="button" class="btn btn-danger btn-icon delete" @click="destroy(props.row.id)" v-if="current_id != props.row.id">
                                    <i class="simple-icon-trash mg-r-0" style="color : #fff !important"></i>
                                </button>
                            </div>
                        </v-client-table>
                    </b-colxx>
                </b-row>
            </template>
            <template v-else>
                <div class="loading"></div>
            </template>
        </b-colxx>
    </b-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name : 'active',
    computed : mapGetters({
        users : 'getUsers',
        user : 'getUser',
        response : 'getResponse',
        websites : 'getWebsites'
    }),
    watch: {
        users(set) {
            this.rows = []
            set.forEach(v => {
                this.rows.push({
                    id : v._id,
                    name : v.name,
                    username : v.username
                })
            })
        },
        response (set) {
            if(set.success)
            {
                this.$notify('success', 'Success', set.message, { duration: 3000, permanent: false })
            } else {
                this.$notify('error', 'Error', set.message, { duration: 3000, permanent: false })
            }
        },
        user(set) {
            if(set) {
                this.form_edit = {
                    _id : set._id,
                    name : set.name,
                    username : set.username
                }
            }
        }
    },
    methods: {
        ...mapActions(['GET_USER_AS_ROLE','GET_USER','DELETE_USER','POST_USER','PUT_USER','RESET_PASSWORD']),
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
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.RESET_PASSWORD({ 
                            id : id,
                            call_role : "administrator",
                            call_website : localStorage.getItem('user_website') ? localStorage.getItem('user_website') : null
                        })
                        this.isLoad = true
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
                        role : "super admin",
                        website : this.form.website,
                        call_role : "super admin"
                    })
                    this.$bvModal.hide('modaladd')
                    this.form = {}
                    this.isLoad = true
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
                        call_role : "super admin"
                    })
                    this.$bvModal.hide('modaledit')
                    this.form_edit = {}
                    this.isLoad = true
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
                            call_role : "super admin"
                        })
                        this.isLoad = true
                    }
                })
        }
    },
    mounted() {
        this.GET_USER_AS_ROLE({
            role : "super admin"
        }).then(() => this.isLoad = true)
    },
    data() {
        return {
            isLoad : false,
            columns: ['name', 'username','action'],
            rows: [],
            options: {
                headings: {
                    name: 'Name',
                    username: 'Username',
                },
                sortable: ['name', 'username'],
                filterable: ['name', 'username']
            },
            method : 'post',
            form : {
                website : ""
            },
            form_edit : {
                website : ""
            },
            current_id : localStorage.getItem('user_id')
        }
    }
}
</script>
