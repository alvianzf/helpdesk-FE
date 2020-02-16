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
                    >Add New Website</b-button>
                    <b-table responsive="sm" :items="websites" :fields="fields" :current-page="currentPage" :per-page="perPage" :fixed="true">
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
                :title="'Add New Website'"
                class="modal-right"
            >
                <b-form>
                    <div class="form-group">
                        <label>Name <span class="tx-danger">*</span></label>
                        <input type="text" name="name" class="form-control" placeholder="Enter name" 
                            v-bind:class="errors.has('name') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.name" v-validate="'required'"/>
                        <span v-show="errors.has('name')" class="help is-danger text-red">{{ errors.first('name') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Ip <span class="tx-danger">*</span></label>
                        <input type="text" name="ip" class="form-control" placeholder="Enter ip address" 
                            v-bind:class="errors.has('ip') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.ip" v-validate="'required'" />
                        <span v-show="errors.has('ip')" class="help is-danger text-red">{{ errors.first('ip') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Domain <span class="tx-danger">*</span></label>
                        <input type="text" name="domain" class="form-control" placeholder="Enter domain" 
                            v-bind:class="errors.has('domain') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.domain" v-validate="'required'" />
                        <span v-show="errors.has('domain')" class="help is-danger text-red">{{ errors.first('domain') }}</span>
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
                :title="'Update Website'"
                class="modal-right"
            >
                <b-form>
                    <div class="form-group">
                        <label>Name <span class="tx-danger">*</span></label>
                        <input type="text" name="name" class="form-control" placeholder="Enter name" 
                            v-bind:class="errors.has('name') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form_edit.name" v-validate="'required'"/>
                        <span v-show="errors.has('name')" class="help is-danger text-red">{{ errors.first('name') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Ip <span class="tx-danger">*</span></label>
                        <input type="text" name="ip" class="form-control" placeholder="Enter ip address" 
                            v-bind:class="errors.has('ip') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form_edit.ip" v-validate="'required'" />
                        <span v-show="errors.has('ip')" class="help is-danger text-red">{{ errors.first('ip') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Domain <span class="tx-danger">*</span></label>
                        <input type="text" name="domain" class="form-control" placeholder="Enter domain" 
                            v-bind:class="errors.has('domain') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form_edit.domain" v-validate="'required'" />
                        <span v-show="errors.has('domain')" class="help is-danger text-red">{{ errors.first('domain') }}</span>
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
    name : 'Super',
    components : {
        Loading
    },
    computed: {
        totalRows: function () { return this.getRowCount() },
        ...mapGetters({
            response : 'getResponse',
            websites : 'getWebsites',
            loading : 'getLoading',
            website : 'getWebsite'
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
        website(set) {
            if(set) {
                this.form_edit = {
                    _id : set._id,
                    name : set.name,
                    ip : set.ip,
                    domain : set.domain
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
                {   key: 'name', label: 'Name', sortable: true },
                {   key: 'ip', label: 'Ip Address', sortable: true },
                {   key: 'domain', label: 'Domain', sortable: true },
                'action'
            ],
        }
    },
    methods: {
        ...mapActions(['GET_WEBSITES','POST_WEBSITE','PUT_WEBSITE','GET_WEBSITE','DELETE_WEBSITE']),
        getRowCount: function () {
            return this.websites.length
        },
        edit(id) {
            this.GET_WEBSITE({id : id})
            this.$bvModal.show('modaledit')
            this.method = 'update'
        },
        save(e) {
            this.isLoad = false
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.POST_WEBSITE({
                        name : this.form.name,
                        ip : this.form.ip,
                        domain : this.form.domain
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
                    this.PUT_WEBSITE({
                        id : this.form_edit._id,
                        name : this.form_edit.name,
                        ip : this.form_edit.ip,
                        domain : this.form_edit.domain
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
                        this.DELETE_WEBSITE({ 
                            id : id
                        })
                    }
                })
        },
    },
    mounted() {
        this.GET_WEBSITES()
    }
}
</script>