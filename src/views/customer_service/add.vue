<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name : 'add',
    props : ['method','data'],
    computed: mapGetters({
        websites : 'getWebsites'
    }),
    data() {
        return {
            form : {
                website : ""
            }
        }
    },
    watch : {
        data(set) {
            this.form = set
        }
    },
    mounted() {
        this.GET_WEBSITES()
    },
    methods : {
        ...mapActions(['POST_CSO','PUT_CSO','GET_WEBSITES']),
        save(e) {
            e.preventDefault()
            this.$validator.validate().then(valid => {
                if (valid) {
                    if(this.method == 'post') {
                        this.POST_CSO({
                            name : this.form.name,
                            email : this.form.email,
                            password : this.form.password,
                            role : "customer service",
                            phone : this.form.phone,
                            website : this.form.website
                        })
                        this.$bvModal.hide('modal')
                        this.form = {}
                    } else {
                        this.PUT_CSO({
                            id : this.form._id,
                            name : this.form.name,
                            email : this.form.email,
                            phone : this.form.phone,
                            website : this.form.website
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
    <b-modal id="modal" size="md" title="Form Customer Service" hide-footer>
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
                        <label>Email <span class="tx-danger">*</span></label>
                        <input type="email" name="email" class="form-control" placeholder="Enter email" 
                            v-bind:class="errors.has('email') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.email" v-validate="'required'" />
                        <span v-show="errors.has('email')" class="help is-danger text-red">{{ errors.first('email') }}</span>
                    </div>
                </div>
                <div v-if="method =='post'" class="col-12">
                    <div class="form-group">
                        <label>Password <span class="tx-danger">*</span></label>
                        <input class="form-control" name="password" placeholder="Enter password" type="password"
                            v-bind:class="errors.has('password') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.password" v-validate="'required'" />
                        <span v-show="errors.has('password')" class="help is-danger text-red">{{ errors.first('password') }}</span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>Phone </label>
                        <input type="text" name="phone" class="form-control" placeholder="Enter phone"
                            v-bind:class="errors.has('phone') ? 'form-control is-invalid' : 'form-control'" 
                            v-model="form.phone" v-validate="'required'" />
                        <span v-show="errors.has('phone')" class="help is-danger text-red">{{ errors.first('phone') }}</span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>Website </label>
                        <select v-bind:class="errors.has('website') ? 'form-control is-invalid' : 'form-control'"  v-model="form.website" name="manufacturing" v-validate="'required'">
                            <option selected="selected" value="">Choose Website</option>
                            <option v-for="website in websites" v-bind:key="website.index" v-bind:value="website._id">{{ website.name }}</option>
                        </select>
                        <span v-show="errors.has('website')" class="help is-danger text-red">{{ errors.first('website') }}</span>
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