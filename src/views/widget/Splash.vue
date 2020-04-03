<template>
    <div>
        <b-row>
            <b-col md="6">
                <b-card :title="'Edit Widget'">
                    <b-form>
                        <div class="form-group">
                            <label>Splash Screen Duration <span class="tx-danger">*</span></label>
                            <input type="number" name="duration" class="form-control" placeholder="Enter duration" 
                                v-bind:class="errors.has('duration') ? 'form-control is-invalid' : 'form-control'" 
                                v-model="form.splashscreenduration" v-validate="'required'"/>
                            <span v-show="errors.has('duration')" class="help is-danger text-red">{{ errors.first('duration') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="">Image</label>
                            <picture-input @change="getImage" ref="splashscreen"
                                :prefill="form.splashscreen ? `${url}/${form.splashscreen}` : null"
                                name="splashscreen" margin="16" accept="image/*" size="4" 
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
import { mapGetters, mapActions } from 'vuex'
import PictureInput from 'vue-picture-input'

export default {
    name : 'Splash',
    computed : mapGetters({
        widget : 'getWidget',
        response : 'getResponse'
    }),
    components : {
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
            this.form = set
        }
    },
    methods: {
        ...mapActions(['GET_WIDGET','UPLOAD_SPLASH']),
        getImage(image) {
            this.form = {
                ...this.form,
                splashscreen : this.$refs.splashscreen.file
            }
        },
        back() {
            this.$router.push('/widget/list')
        },
        update(e) {
            var formData = new FormData()
            formData.append('id', this.form._id)
            formData.append('duration', this.form.splashscreenduration)
            if(this.form.splashscreen) {
                formData.append('attach', this.form.splashscreen)
            }

            this.UPLOAD_SPLASH(formData)
        }
    },
    mounted() {
        this.GET_WIDGET({id : this.$route.params.id})
    },
    data() {
        return {
            form : {},
            url : process.env.VUE_APP_API
        }
    }
}
</script>