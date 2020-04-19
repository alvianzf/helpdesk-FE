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
                        <template v-slot:cell(website)="data">
                            {{ data.item.website ? data.item.website.name : null }}
                        </template>
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
                        <label>Key <span class="tx-danger">*</span></label>
                        <input type="text" name="key" class="form-control" placeholder="Enter key" 
                            v-bind:class="errors.has('key') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.key" v-validate="'required'"/>
                        <span v-show="errors.has('key')" class="help is-danger text-red">{{ errors.first('key') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Description <span class="tx-danger">*</span></label>
                        <input type="text" name="description" class="form-control" placeholder="Enter description" 
                            v-bind:class="errors.has('description') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.description" v-validate="'required'"/>
                        <span v-show="errors.has('description')" class="help is-danger text-red">{{ errors.first('description') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Website </label>
                        <select v-bind:class="errors.has('website') ? 'form-control is-invalid' : 'form-control'"  v-model="form.website" name="manufacturing" v-validate="'required'">
                            <option selected="selected" value="">Choose Website</option>
                            <option v-for="website in websites" v-bind:key="website.index" v-bind:value="website._id">{{ website.name }}</option>
                        </select>
                        <span v-show="errors.has('website')" class="help is-danger text-red">{{ errors.first('website') }}</span>
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
                        <label>Key <span class="tx-danger">*</span></label>
                        <input type="text" name="key" class="form-control" placeholder="Enter key" 
                            v-bind:class="errors.has('key') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form_edit.key" v-validate="'required'"/>
                        <span v-show="errors.has('key')" class="help is-danger text-red">{{ errors.first('key') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Description <span class="tx-danger">*</span></label>
                        <input type="text" name="description" class="form-control" placeholder="Enter description" 
                            v-bind:class="errors.has('description') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form_edit.description" v-validate="'required'"/>
                        <span v-show="errors.has('description')" class="help is-danger text-red">{{ errors.first('description') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Website </label>
                        <select v-bind:class="errors.has('website') ? 'form-control is-invalid' : 'form-control'"  v-model="form_edit.website" name="manufacturing" v-validate="'required'">
                            <option selected="selected" value="">Choose Website</option>
                            <option v-for="website in websites" v-bind:key="website.index" v-bind:value="website._id">{{ website.name }}</option>
                        </select>
                        <span v-show="errors.has('website')" class="help is-danger text-red">{{ errors.first('website') }}</span>
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
            loading : 'getLoading',
            websites : 'getWebsites'
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
                    key : set.key,
                    description : set.description,
                    website : set.website
                }
            }
        }
    },
    data() {
        return {
            form : {
                website : ""
            },
            form_edit : {
                website : ""
            },
            currentPage: 1,
            perPage : 10,
            fields: [
                {   key: 'key', label: 'Key', sortable: true },
                {   key: 'description', label: 'Description', sortable: true },
                'website',
                'action'
            ],
        }
    },
    methods: {
        ...mapActions(['GET_SUGGESTS','STORE_SUGGEST','UPDATE_SUGGEST','DELETE_SUGGEST','GET_SUGGEST','GET_WEBSITES']),
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
                        description : this.form.description,
                        key : this.form.key,
                        website : this.form.website,
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
                        description : this.form_edit.description,
                        key : this.form_edit.key,
                        website : this.form_edit.website,
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
        this.GET_WEBSITES()
    }
}
</script>