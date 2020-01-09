<script>
import { mapActions } from 'vuex'

export default {
    name : 'add',
    props : ['method','data'],
    data() {
        return {
            form : {}
        }
    },
    watch : {
        data(set) {
            this.form = set
        }
    },
    methods : {
        ...mapActions(['POST_WEBSITE','PUT_WEBSITE']),
        save(e) {
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if (valid) {
                    if(this.method == 'post') {
                        this.POST_WEBSITE({
                            name : this.form.name,
                            ip : this.form.ip
                        })
                        this.$bvModal.hide('modal')
                        this.form = {}
                    } else {
                        this.PUT_WEBSITE({
                            id : this.form._id,
                            name : this.form.name,
                            ip : this.form.ip
                        })
                        this.$bvModal.hide('modal')
                        this.form = {}
                    }
                }
            });
        }
    }
}
</script>
<template>
    <b-modal id="modal" size="md" title="Form Admin" hide-footer>
        <form @submit="save"> 
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label>Name <span class="tx-danger">*</span></label>
                        <input type="text" name="name" class="form-control" placeholder="Enter name" 
                            v-bind:class="errors.has('name') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.name" v-validate="'required'"/>
                        <span v-show="errors.has('name')" class="help is-danger text-red">{{ errors.first('name') }}</span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>IP Address <span class="tx-danger">*</span></label>
                        <input type="text" name="ip" class="form-control" placeholder="Enter IP Address" 
                            v-bind:class="errors.has('ip') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.ip" v-validate="'required'" />
                        <span v-show="errors.has('ip')" class="help is-danger text-red">{{ errors.first('ip') }}</span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="float-right">
                        <button class="btn btn-primary" type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </form>
    </b-modal>
</template>