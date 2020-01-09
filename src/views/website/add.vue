<script>
// import { mapActions } from 'vuex'

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
        // ...mapActions(['POST_USER','PUT_USER']),
        save(e) {
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if (valid) {
                    // if(this.method == 'post') {
                    //     this.POST_USER({
                    //         name : this.form.name,
                    //         email : this.form.email,
                    //         password : this.form.password,
                    //         role : "administrator",
                    //         phone : this.form.phone,
                    //         website : null
                    //     })
                    //     this.$bvModal.hide('modal')
                    //     this.form = {}
                    // } else {
                    //     this.PUT_USER({
                    //         id : this.form._id,
                    //         name : this.form.name,
                    //         email : this.form.email,
                    //         phone : this.form.phone
                    //     })
                    //     this.$bvModal.hide('modal')
                    //     this.form = {}
                    // }
                    
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
                            v-model="form.email" v-validate="'required'" />
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