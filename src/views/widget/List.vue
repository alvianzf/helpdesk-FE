<template>
    <div>
        <Loading :loading="loading" />
        <b-row>
            <b-col sm="12" md="12">
                <b-card>
                    <b-table responsive="sm" :items="widgets" :fields="fields" :current-page="currentPage" :per-page="perPage" :fixed="true">
                        <template v-slot:cell(website)="data">
                            {{ data.item.website ? data.item.website.name : null }}
                        </template>
                        <template v-slot:cell(action)="data">
                            <b-button variant="info" @click="edit(data.item._id)" class="mg-b-15">
                                <i class="fa fa-pencil"></i>
                            </b-button>
                            <b-button variant="success" @click="manageWelcome(data.item._id)" size="sm" class="mg-b-15">
                                Manage Trigger
                            </b-button>
                            <b-button variant="warning" @click="manageSplash(data.item._id)" size="sm" >
                                Manage Splash Screen
                            </b-button>
                        </template>
                    </b-table>
                    <nav>
                        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '../misc/Loading'

export default {
    name : 'Super',
    components : {
        Loading
    },
    computed: {
        totalRows: function () { return this.getRowCount() },
        ...mapGetters({
            response : 'getResponse',
            widgets : 'getWidgets',
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
        }
    },
    data() {
        return {
            currentPage: 1,
            perPage : 10,
            fields: [
                {   key: 'name', label: 'Name', sortable: true },
                {   key: 'title', label: 'Title', sortable: true },
                {   key: 'subtitle', label: 'Subtitle', sortable: true },
                {   key: 'background_color', label: 'Bg Color', sortable: false },
                {   key: 'text_color', label: 'Text Color', sortable: false },
                'website',
                'action'
            ],
        }
    },
    methods: {
        ...mapActions(['GET_WIDGETS']),
        edit(id) {
            this.$router.push({ name : 'Widget Edit', params : { id : id}})
        },
        manageWelcome(id) {
            this.$router.push({ name : 'Widget Splash', params : { id : id}})
        },
        manageSplash(id) {
            this.$router.push({ name : 'Widget Splash', params : { id : id}})
        },
        getRowCount: function () {
            return this.widgets.length
        }
    },
    mounted() {
        this.GET_WIDGETS()
    }
}
</script>