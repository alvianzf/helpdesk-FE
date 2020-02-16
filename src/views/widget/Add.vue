<template>
    <div>
        <b-row>
            <b-col md="6" sm="12">
                <b-card :title="'Add Widget'">
                    <b-form>
                        <div class="form-group">
                            <label>Name <span class="tx-danger">*</span></label>
                            <input type="text" name="name" class="form-control" placeholder="Enter name" 
                                v-bind:class="errors.has('name') ? 'form-control is-invalid' : 'form-control'" 
                                v-model="form.name" v-validate="'required'"/>
                            <span v-show="errors.has('name')" class="help is-danger text-red">{{ errors.first('name') }}</span>
                        </div>
                        <div class="form-group">
                            <label>Title <span class="tx-danger">*</span></label>
                            <input type="text" name="title" class="form-control" placeholder="Enter title" 
                                v-bind:class="errors.has('title') ? 'form-control is-invalid' : 'form-control'" 
                                v-model="form.title" v-validate="'required'" />
                            <span v-show="errors.has('title')" class="help is-danger text-red">{{ errors.first('title') }}</span>
                        </div>
                        <div class="form-group">
                            <label>Subtitle <span class="tx-danger">*</span></label>
                            <input type="text" name="subtitle" class="form-control" placeholder="Enter subtitle"
                                v-bind:class="errors.has('subtitle') ? 'form-control is-invalid' : 'form-control'" 
                                v-model="form.subtitle" v-validate="'required'" />
                            <span v-show="errors.has('subtitle')" class="help is-danger text-red">{{ errors.first('subtitle') }}</span>
                        </div>
                        <div class="form-group">
                            <label>Website </label>
                            <select v-bind:class="errors.has('website') ? 'form-control is-invalid' : 'form-control'"  v-model="form.website" name="manufacturing" v-validate="'required'">
                                <option selected="selected" value="">Choose Website</option>
                                <option v-for="website in websites" v-bind:key="website.index" v-bind:value="website._id">{{ website.name }}</option>
                            </select>
                            <span v-show="errors.has('website')" class="help is-danger text-red">{{ errors.first('website') }}</span>
                        </div>
                        <b-row>
                            <b-col md="6">
                                <div class="form-group">
                                    <label>Bg Color </label>
                                    <colorpicker v-model="form.background_color" />
                                </div>
                            </b-col>
                            <b-col md="6">
                                <div class="form-group">
                                    <label>Text Color </label>
                                    <colorpicker v-model="form.text_color" />
                                </div>
                            </b-col>
                        </b-row>
                        <b-button
                            variant="outline-secondary"
                            style=" margin-right: 15px"
                            @click="back"
                        >Cencel</b-button>
                        <b-button
                            variant="primary"
                            class="mr-1"
                            @click="store"
                        >Submit</b-button>
                    </b-form>
                </b-card> 
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { Chrome } from 'vue-color'
import { mapGetters, mapActions } from 'vuex'

export default {
    name : 'Add',
    computed : mapGetters({
        response : 'getResponse',
        websites : 'getWebsites'
    }),
    components : {
        colorpicker : Chrome
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
    methods: {
        ...mapActions(['GET_WEBSITES','STORE_WIDGET']),
        back() {
            this.$router.push('/widget/list')
        },
        store(e) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.STORE_WIDGET({
                        name : this.form.name,
                        title : this.form.title,
                        subtitle : this.form.subtitle,
                        background_color : this.form.background_color.hex ? this.form.background_color.hex : this.form.background_color,
                        text_color : this.form.text_color.hex ? this.form.text_color.hex : this.form.text_color,
                        website : this.form.website,
                    })
                }
            })
        }
    },
    mounted() {
        this.GET_WEBSITES()
    },
    data() {
        return {
            form : {
                name : "",
                title : "",
                subtitle : "",
                background_color : "#000000",
                text_color : "#000000",
                website : ""
            },
            url : process.env.VUE_APP_API
        }
    }
}
</script>