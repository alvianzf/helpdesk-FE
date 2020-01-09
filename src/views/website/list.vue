<script>
import Layout from '@layouts/main'
import Add from './add'
import { mapGetters, mapActions } from 'vuex'

export default {
    name : 'list',
    components : { Layout, Add },
    computed : mapGetters({
        websites : 'getWebsites',
        website : 'getWebsite',
        response : 'getResponse'
    }),
    watch: {
        websites(set) {
            this.rows = []
            set.forEach(v => {
                this.rows.push({
                    id : v._id,
                    name : v.name,
                    ip : v.ip
                })
            })
        },
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
    methods: {
        ...mapActions(['GET_WEBSITES','GET_WEBSITE','DELETE_WEBSITE']),
        edit(id) {
            this.GET_WEBSITE({id : id})
            this.$bvModal.show('modal')
            this.method = 'update'
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
                        this.DELETE_WEBSITE({ id : id})
                    }
                })
        }
    },
    mounted() {
        this.GET_WEBSITES()
    },
    data() {
        return {
            columns: ['name', 'ip','action'],
            rows: [],
            options: {
                headings: {
                    name: 'Name',
                    ip: 'Ip Address'
                },
                sortable: ['name', 'ip'],
                filterable: ['name', 'ip']
            },
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
                        <b-button v-b-modal.modal variant="primary">Add New Website</b-button>
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
        <Add v-bind:method="method" v-bind:data="website"/>
    </Layout>
</template>