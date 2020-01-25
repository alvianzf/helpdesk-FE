<template>
    <b-row>
        <b-colxx class="disable-text-selection">
            <b-row>
                <b-colxx xxs="12">
                    <h1>Widget List</h1>

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
                                    <i class="simple-icon-pencil mg-r-0"></i>
                                </button>
                            </div>
                            <div slot="manage" slot-scope="props">
                                <button type="button" class="btn btn-primary btn-icon edit" @click="manageWelcome(props.row.id)">
                                    Manage Welcome Status
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
    name : 'list',
    computed : mapGetters({
        widgets : 'getWidgets',
        response : 'getResponse'
    }),
    watch: {
        widgets(set) {
            this.rows = []
            set.forEach(v => {
                this.rows.push({
                    id : v._id,
                    name : v.name,
                    title : v.title,
                    subtitle : v.subtitle,
                    background_color : v.background_color,
                    text_color : v.text_color,
                    welcome_text : v.welcome_text,
                    splashscreen : v.splashscreen,
                    splashscreenduration : v.splashscreenduration,
                    website : v.website.name
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
        }
    },
    methods: {
        ...mapActions(['GET_WIDGETS']),
        edit(id) {
            this.$router.push({ name : 'edit_widget', params : { id : id}})
        },
        manageWelcome(id) {
            this.$router.push({ name : 'manage_welcome', params : { id : id}})
        }
    },
    mounted() {
        this.GET_WIDGETS().then(() => this.isLoad = true)
    },
    data() {
        return {
            columns: ['name', 'title', 'subtitle','background_color','text_color','website','action','manage'],
            rows: [],
            options: {
                headings: {
                    name: 'Name',
                    title: 'Title',
                    subtitle: 'Subtitle',
                    background_color : 'Bg Color',
                    text_color : 'Text Color',
                    website : 'Website'
                },
                sortable: ['name', 'title','website'],
                filterable: ['name', 'title','website']
            },
            method : 'post',
            isLoad : false
        }
    }
}
</script>
