<template>
    <b-row>
        <b-colxx class="disable-text-selection">
            <b-row>
                <b-colxx xxs="12">
                    <h1>Website List</h1>
                    <piaf-breadcrumb/>
                    <div class="separator mb-5"/>
                </b-colxx>
            </b-row>
            <template v-if="isLoad">
                <b-row>
                    <b-colxx sm="12" md="12" class="mb-4">
                        <v-client-table :columns="columns" :data="rows" :options="options" ref="table">
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
    name : 'list',
    computed : mapGetters({
        websites : 'getWebsites'
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
        }
    },
    methods: {
        ...mapActions(['GET_WEBSITES']),
    },
    mounted() {
        this.GET_WEBSITES().then(() => this.isLoad = true)
    },
    data() {
        return {
            columns: ['name', 'ip'],
            rows: [],
            options: {
                headings: {
                    name: 'Name',
                    ip: 'Ip address'
                },
                sortable: ['name', 'ip'],
                filterable: ['name', 'ip']
            },
            method : 'post',
            isLoad : false
        }
    }
}
</script>
