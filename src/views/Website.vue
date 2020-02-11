<template>
    <div>
        <Loading :loading="loading" />
        <b-row>
            <b-col sm="12" md="12">
                <b-card>
                    <b-table responsive="sm" :items="websites" :fields="fields" :current-page="currentPage" :per-page="perPage" :fixed="true">
                        
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
                {   key: 'ip', label: 'Ip Address', sortable: true },
            ],
        }
    },
    methods: {
        ...mapActions(['GET_WEBSITES']),
        getRowCount: function () {
            return this.websites.length
        }
    },
    mounted() {
        this.GET_WEBSITES()
    }
}
</script>