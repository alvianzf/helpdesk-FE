<script>
import Layout from '@layouts/main'
import Add from './add'
import { get,post,destroy } from '@api'

export default {
    name : 'list',
    components : { Layout, Add },
    methods: {
        FETCH_ADMINS() {
            get('api/auth/list/admin')
            .then((res) => {
                res.data.data.forEach(v => {
                    this.rows.push({
                        id : v._id,
                        name : v.name,
                        email : v.email,
                        phone : v.phone
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            })
        },
        edit(id) {
            console.log(id)
            post('api/auth/find', { id : id})
            .then((res) => {
                this.user = res.data.data
                this.$bvModal.show('modal')
                this.method = 'update'
            })
            .catch((err) => {
                console.log(err)
            })
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
                        destroy('api/auth/delete', { id : id})
                        .then((res) => {
                            this.$bvToast.toast(res.data.message, {
                                title: 'Success',
                                autoHideDelay: 5000,
                                toaster : 'b-toaster-top-right',
                                appendToast: false,
                                variant : 'success'
                            })
                        })
                        .catch((error) => {
                            this.$bvToast.toast(error.response.data.message, {
                                title: 'Error',
                                autoHideDelay: 5000,
                                toaster : 'b-toaster-top-right',
                                appendToast: false,
                                variant : 'error'
                            })
                        })
                    }
                })
        }
    },
    mounted() {
        this.FETCH_ADMINS()
    },
    data() {
        return {
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
            user : null,
            method : 'post'
        }
    }
}

</script>
<template>
    <Layout>
        <div class="card">
            <div class="card-header">
                <ul class="list-unstyled topnav-menu float-right mb-0"> 
                    <li class="d-none d-sm-block">
                        <b-button v-b-modal.modal variant="primary">Add New Admin</b-button>
                    </li>
                </ul>
            </div>
            <div class="card-body">
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
            </div>
        </div>
        <Add v-bind:method="method" v-bind:data="user" />
    </Layout>
</template>