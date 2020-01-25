<template>
    <b-row>
        <b-colxx class="disable-text-selection">
            <b-row>
                <b-colxx xxs="12">
                    <h1>Welcome Message List</h1>
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
                                        <label>Message <span class="tx-danger">*</span></label>
                                        <vue-editor v-model="form.message"></vue-editor>
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
                    </div>
                    <piaf-breadcrumb/>
                    <div class="separator mb-5"/>
                </b-colxx>
            </b-row>
            <template v-if="isLoad">
                <b-row>
                    <b-colxx sm="12" md="12" class="mb-4">
                        <v-client-table :columns="columns" :data="rows" :options="options" ref="table">
                            <div slot="message" slot-scope="props">
                                <span v-html="props.row.message"></span>
                            </div>
                            <div slot="action" slot-scope="props">
                                <button type="button" class="btn btn-danger btn-icon delete" @click="destroy(props.row.id)">
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
import { VueEditor } from "vue2-editor";

export default {
    name : 'list',
    computed : mapGetters({
        widget : 'getWidget',
        response : 'getResponse'
    }),
    watch: {
        response (set) {
            if(set.success)
            {
                this.$notify('success', 'Success', set.message, { duration: 3000, permanent: false })
            } else {
                this.$notify('error', 'Error', set.message, { duration: 3000, permanent: false })
            }
        },
        widget(set) {
            this.rows = []
            set.welcome_text.forEach(v => {
                this.rows.push({
                    id : v._id,
                    message : v.message
                })
            })
        }
    },
    components: {
        VueEditor
    },
    methods: {
        ...mapActions(['GET_WIDGET','CREATE_WELCOME_TEXT','REMOVE_WELCOME_TEXT']),
        save(e) {
            this.CREATE_WELCOME_TEXT({ message : this.form.message ,id : this.$route.params.id })
            this.$bvModal.hide('modaladd')
            this.form = {}
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
                        this.REMOVE_WELCOME_TEXT({ widget_id : id, id : this.$route.params.id})
                        this.isLoad = true
                    }
                })
        }
    },
    mounted() {
        this.GET_WIDGET({id : this.$route.params.id}).then(() => this.isLoad = true)
    },
    data() {
        return {
            columns: ['message','action'],
            rows: [],
            options: {
                headings: {
                    message: 'Message'
                },
                sortable: ['message'],
                filterable: ['message']
            },
            method : 'post',
            isLoad : false,
            form : {}
        }
    }
}
</script>
