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
                    >Add New Suggestion</b-button>
                    <b-table responsive="sm" :items="suggests" :fields="fields" :current-page="currentPage" :per-page="perPage" :fixed="true">
                        <template v-slot:cell(action)="data">
                            <b-button-group>
                                <b-button variant="info" @click="edit(data.item._id)">
                                    <i class="fa fa-pencil"></i>
                                </b-button>
                                <b-button variant="danger" @click="destroy(data.item._id)">
                                    <i class="fa fa-trash"></i>
                                </b-button>
                            </b-button-group>
                        </template>
                    </b-table>
                    <nav>
                        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>

            <b-modal
                id="modaladd"
                ref="modaladd"
                :title="'Add New Suggestions'"
                class="modal-right"
            >
                <b-form>
                    <div class="form-group">
                        <label>Description <span class="tx-danger">*</span></label>
                        <input type="text" name="description" class="form-control" placeholder="Enter description" 
                            v-bind:class="errors.has('description') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.description" v-validate="'required'"/>
                        <span v-show="errors.has('description')" class="help is-danger text-red">{{ errors.first('description') }}</span>
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
                :title="'Update Suggestions'"
                class="modal-right"
            >
                <b-form>
                    <div class="form-group">
                        <label>Description <span class="tx-danger">*</span></label>
                        <input type="text" name="description" class="form-control" placeholder="Enter description" 
                            v-bind:class="errors.has('description') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form_edit.description" v-validate="'required'"/>
                        <span v-show="errors.has('description')" class="help is-danger text-red">{{ errors.first('description') }}</span>
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
        </b-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from './misc/Loading'

export default {
    name : 'Admin',
    components : {
        Loading
    },
    computed: {
        totalRows: function () { return this.getRowCount() },
        ...mapGetters({
            suggests : 'getSuggests',
            suggest : 'getSuggest',
            response : 'getResponse',
            loading : 'getLoading'
        })
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
        suggest(set) {
            if(set) {
                this.form_edit = {
                    _id : set._id,
                    description : set.description
                }
            }
        }
    },
    data() {
        return {
            form : {},
            form_edit : {},
            currentPage: 1,
            perPage : 10,
            fields: [
                {   key: 'description', label: 'Description', sortable: true },
                'action'
            ],
        }
    },
    methods: {
        ...mapActions(['GET_SUGGESTS','STORE_SUGGEST','UPDATE_SUGGEST','DELETE_SUGGEST','GET_SUGGEST']),
        edit(id) {
            this.GET_SUGGEST({id : id})
            this.$bvModal.show('modaledit')
            this.method = 'update'
        },
        save(e) {
            this.isLoad = false
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.STORE_SUGGEST({
                        description : this.form.description
                    })
                    this.$bvModal.hide('modaladd')
                    this.form = {}
                }
            });
        },
        update(e) {
            this.isLoad = false
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.UPDATE_SUGGEST({
                        id : this.form_edit._id,
                        description : this.form_edit.description
                    })
                    this.$bvModal.hide('modaledit')
                    this.form_edit = {}
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
                        this.DELETE_SUGGEST({ 
                            id : id
                        })
                    }
                })
        },
        getRowCount: function () {
            return this.suggests.length
        }
    },
    mounted() {
        this.GET_SUGGESTS()
    }
}
</script>