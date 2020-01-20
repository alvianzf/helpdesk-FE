<template>
    <b-row>
        <b-colxx class="disable-text-selection">
            <b-row>
                <b-colxx xxs="12">
                    <h1>Admin</h1>
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
                                :title="'Add New Admin'"
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
                                        <label>Email <span class="tx-danger">*</span></label>
                                        <input type="email" name="email" class="form-control" placeholder="Enter email" 
                                            v-bind:class="errors.has('email') ? 'form-control is-invalid' : 'form-control'" 
                                            v-model="form.email" v-validate="'required'" />
                                        <span v-show="errors.has('email')" class="help is-danger text-red">{{ errors.first('email') }}</span>
                                    </div>
                                    <div class="form-group">
                                        <label>Password <span class="tx-danger">*</span></label>
                                        <input class="form-control" name="password" placeholder="Enter password" type="password"
                                            v-bind:class="errors.has('password') ? 'form-control is-invalid' : 'form-control'" 
                                            v-model="form.password" v-validate="'required'" />
                                        <span v-show="errors.has('password')" class="help is-danger text-red">{{ errors.first('password') }}</span>
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
                                        @click="save"
                                    >Submit</b-button>
                                </template>
                            </b-modal>

                            <b-modal
                                id="modaledit"
                                ref="modaledit"
                                :title="'Update Admin'"
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
                                        <label>Email <span class="tx-danger">*</span></label>
                                        <input type="email" name="email" class="form-control" placeholder="Enter email" 
                                            v-bind:class="errors.has('email') ? 'form-control is-invalid' : 'form-control'" 
                                            v-model="form_edit.email" v-validate="'required'" />
                                        <span v-show="errors.has('email')" class="help is-danger text-red">{{ errors.first('email') }}</span>
                                    </div>
                                    <div class="form-group">
                                        <label>Phone </label>
                                        <input type="text" name="phone" class="form-control" placeholder="Enter phone"
                                            v-bind:class="errors.has('phone') ? 'form-control is-invalid' : 'form-control'" 
                                            v-model="form_edit.phone" v-validate="'required'" />
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
                                <button type="button" class="btn btn-warning btn-icon edit" @click="edit(props.row.id)">
                                    <i class="fas fa-pencil-alt mg-r-0"></i>
                                </button>

                                <button type="button" class="btn btn-danger btn-icon delete" @click="destroy(props.row.id)">
                                    <i class="fas fa-trash mg-r-0" style="color : #fff !important"></i>
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
        response : 'getResponse'
    }),
    watch: {
        users(set) {
            this.rows = []
            set.forEach(v => {
                this.rows.push({
                    id : v._id,
                    name : v.name,
                    email : v.email,
                    phone : v.phone
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
            this.form_edit = set
        }
    },
    methods: {
        ...mapActions(['GET_ADMINS','GET_USER','DELETE_USER','POST_USER','PUT_USER']),
        edit(id) {
            this.GET_USER({id : id})
            this.$bvModal.show('modaledit')
            this.method = 'update'
        },
        save(e) {
            this.isLoad = false
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.POST_USER({
                        name : this.form.name,
                        email : this.form.email,
                        password : this.form.password,
                        role : "administrator",
                        phone : this.form.phone,
                        website : null
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
                        email : this.form_edit.email,
                        phone : this.form_edit.phone
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
                        this.DELETE_USER({ id : id})
                        this.isLoad = true
                    }
                })
        }
    },
    mounted() {
        this.GET_ADMINS().then(() => this.isLoad = true)
    },
    data() {
        return {
            isLoad : false,
            columns: ['name', 'email', 'phone','action'],
            rows: [],
            options: {
                headings: {
                    name: 'Name',
                    email: 'Email',
                    phone: 'Phone'
                },
                sortable: ['name', 'email','phone'],
                filterable: ['name', 'email','phone']
            },
            method : 'post',
            form : {},
            form_edit : {}
        }
    }
}
</script>
