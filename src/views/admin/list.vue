<script>
import Layout from '@layouts/main'
import Add from './add'
import { get } from '@api'

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
        }
    },
    mounted() {
        this.FETCH_ADMINS()
    },
    data() {
        return {
            columns: ['name', 'email', 'phone'],
            rows: [],
            options: {
                headings: {
                    name: 'Name',
                    email: 'Email',
                    phone: 'Phone'
                },
                sortable: ['name', 'email','phone'],
                filterable: ['name', 'email','phone']
            }
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
                        <b-button v-b-modal.add variant="primary">Add New Admin</b-button>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <v-client-table :columns="columns" :data="rows" :options="options">

                    <div slot="uri">
                        <span>test</span>
                    </div>

                </v-client-table>
            </div>
        </div>
        <Add />
    </Layout>
</template>