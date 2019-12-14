<script>
import Layout from '@layouts/main'
import Add from './add'
export default {
    name : 'list',
    components : { Layout, Add },
    data() {
        return {
            columns: ['name', 'email', 'phone'],
            data: getData(),
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

function getData() {
  return [{
    email: "email@admin.com",
    name: "Administrator",
    created_at: "2015-04-24T01:46:50.459583",
    updated_at: "2015-04-24T01:46:50.459593",
    phone: "+62154845",
    id: 245
  }];
}
</script>
<template>
    <Layout>
        <div class="card">
            <div class="card-header">
                <ul class="list-unstyled topnav-menu float-right mb-0"> 
                    <li class="d-none d-sm-block">
                        <b-button v-b-modal.add class="btn btn-primary btn-block " variant="primary">Add New Admin</b-button>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <v-client-table :columns="columns" v-model="data" :options="options">

                    <div slot="uri">
                        <span>test</span>
                    </div>

                </v-client-table>
            </div>
        </div>
        <Add />
    </Layout>
</template>