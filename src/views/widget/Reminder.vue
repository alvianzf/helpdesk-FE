<template>
    <div>
        <b-row>
            <b-col md="6">
                <b-card :title="'Edit Widget'">
                    <b-form>
                        <div class="form-group">
                            <label>Reminder Duration <span class="tx-danger">*</span></label>
                            <input type="number" name="reminder_duration" class="form-control" placeholder="Enter duration" 
                                v-bind:class="errors.has('reminder_duration') ? 'form-control is-invalid' : 'form-control'" 
                                v-model="form.reminder_duration" v-validate="'required'"/>
                            <span v-show="errors.has('reminder_duration')" class="help is-danger text-red">{{ errors.first('reminder_duration') }}</span>
                        </div>
                        <div class="form-group">
                            <label for="">Reminder text <span class="tx-danger">*</span></label>
                            <input type="text" name="reminder_text" class="form-control" placeholder="Enter text" 
                                v-bind:class="errors.has('reminder_text') ? 'form-control is-invalid' : 'form-control'" 
                                v-model="form.reminder_text" v-validate="'required'"/>
                            <span v-show="errors.has('reminder_text')" class="help is-danger text-red">{{ errors.first('reminder_text') }}</span>
                        </div>
                        <b-button
                            variant="outline-secondary"
                            style=" margin-right: 15px"
                            @click="back"
                        >Cancel</b-button>
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

export default {
    name : 'Reminder',
    computed : mapGetters({
        widget : 'getWidget',
        response : 'getResponse'
    }),
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
        ...mapActions(['GET_WIDGET','UPDATE_REMINDER']),
        back() {
            this.$router.push('/widget/list')
        },
        update() {
            this.UPDATE_REMINDER({
                id : this.form._id,
                reminder_duration : this.form.reminder_duration,
                reminder_text : this.form.reminder_text,
            })
        }
    },
    mounted() {
        this.GET_WIDGET({id : this.$route.params.id})
    },
    data() {
        return {
            form : {}
        }
    }
}
</script>