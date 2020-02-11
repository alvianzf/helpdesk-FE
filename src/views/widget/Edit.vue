<template>
    <div>
        <b-row>
            <b-col md="6" sm="12">
                <b-card :title="'Edit Widget'">
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
                            <label>Subtitle </label>
                            <input type="text" name="subtitle" class="form-control" placeholder="Enter subtitle"
                                v-bind:class="errors.has('subtitle') ? 'form-control is-invalid' : 'form-control'" 
                                v-model="form.subtitle" v-validate="'required'" />
                            <span v-show="errors.has('subtitle')" class="help is-danger text-red">{{ errors.first('subtitle') }}</span>
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
                        <div class="form-group">
                            <label for="">Logo</label>
                            <picture-input @change="getLogo" ref="logo"
                                :prefill="form.logo ? `${url}/${form.logo}` : null"
                                name="logo" margin="16" accept="image/jpeg,image/png" size="4" 
                                width="500" 
                                height="500" buttonClass="btn"/>
                        </div>
                        <b-button
                            variant="outline-secondary"
                            style=" margin-right: 15px"
                            @click="back"
                        >Cencel</b-button>
                        <b-button
                            variant="primary"
                            class="mr-1"
                            @click="update"
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
import PictureInput from 'vue-picture-input'

export default {
    name : 'Edit',
    computed : mapGetters({
        widget : 'getWidget',
        response : 'getResponse'
    }),
    components : {
        colorpicker : Chrome,
        PictureInput
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
            this.form = {
                id : set._id,
                name : set.name,
                title : set.title,
                subtitle : set.subtitle,
                background_color : set.background_color,
                text_color : set.text_color,
                logo : set.logo
            }
        }
    },
    methods: {
        ...mapActions(['GET_WIDGET','UPDATE_WIDGET']),
        getLogo(image) {
            this.form = {
                ...this.form,
                logo : this.$refs.logo.file
            }
        },
        back() {
            this.$router.push('/widget/list')
        },
        update(e) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    var formData = new FormData()

                    formData.append('id', this.form.id)
                    formData.append('name', this.form.name)
                    formData.append('title', this.form.title)
                    formData.append('subtitle', this.form.subtitle)
                    formData.append('background_color', this.form.background_color.hex ? this.form.background_color.hex : this.form.background_color)
                    formData.append('text_color', this.form.text_color.hex ? this.form.text_color.hex : this.form.text_color)
                    if(this.form.logo) {
                        formData.append('logo', this.form.logo)
                    }

                    this.UPDATE_WIDGET(formData)
                }
            })
        }
    },
    mounted() {
        this.GET_WIDGET({id : this.$route.params.id})
    },
    data() {
        return {
            form : {
                name : "",
                title : "",
                subtitle : "",
                background_color : "#000000",
                text_color : "#000000"
            },
            url : process.env.VUE_APP_API
        }
    }
}
</script>