<template>
    <div>
        <Loading :loading="loading" />
        <b-row>
            <b-col sm="12" md="12">
                <b-card>
                    <b-button
                        v-b-modal.modaladd
                        variant="primary"
                        size="md"
                        class="mg-b-15"
                    >Add New </b-button>
                    <b-table responsive="sm" :items="rows" :fields="fields" :current-page="currentPage" :per-page="perPage" :fixed="true">
                        <template v-slot:cell(website)="data">
                            <span v-html="data.item.message"></span>
                        </template>
                        <template v-slot:cell(action)="data">
                            <b-button variant="danger" @click="destroy(data.item.id)" class="mg-b-15">
                                <i class="fa fa-trash"></i>
                            </b-button>
                        </template>
                    </b-table>
                    <nav>
                        <b-pagination :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
        </b-row>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '../misc/Loading'
import { VueEditor } from "vue2-editor";

export default {
    name : 'Trigger',
    components : {
        Loading,
        VueEditor
    },
    computed: {
        totalRows: function () { return this.getRowCount() },
        ...mapGetters({
            widget : 'getWidget',
            response : 'getResponse',
            loading : 'getLoading'
        }),
    },
    watch: {
        response (set) {
            if(set.success)
            {
                this.$toast.open({
                    message : set.message,
                    type : 'success',
                    position : 'top-right'
                })
            } else {
                this.$toast.open({
                    message : set.message,
                    type : 'error',
                    position : 'top-right'
                })
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
    data() {
        return {
            form : {},
            rows : [],
            currentPage: 1,
            perPage : 10,
            fields: [
                'message',
                'action'
            ],
        }
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
                    }
                })
        }
    },
    mounted() {
        this.GET_WIDGET({id : this.$route.params.id}).then(() => this.isLoad = true)
    }
}
</script>