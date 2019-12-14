<script>
export default {
    name : 'add'
}
</script>
<template>
    <b-modal id="add" size="md">
        <template v-slot:modal-header="{ close }">
            <h4>New Customer Service</h4>
            <a @click="close"><i class="fas fa-times fa-lg mt-2"></i></a>
        </template>

        <template>
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label>Name <span class="tx-danger">*</span></label>
                        <input class="form-control" placeholder="Enter name" required/>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>Email <span class="tx-danger">*</span></label>
                        <input class="form-control" placeholder="Enter email" required/>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>Phone </label>
                        <input class="form-control" placeholder="Enter phone" required/>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:modal-footer="{ ok }">
            <b-button variant="primary" @click="ok">
            Submit
            </b-button>
        </template>
    </b-modal>
</template>