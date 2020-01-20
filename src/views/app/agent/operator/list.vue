<template>
    <b-row>
        <b-colxx class="disable-text-selection">
            <b-row>
                <b-colxx xxs="12">
                    <h1>Operator List</h1>
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

export default {
    name : 'active',
    data() {
        return {
            isLoad: true,
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
            method : 'post'
        }
    }
}
</script>
