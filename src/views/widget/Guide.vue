<template>
    <div>
        <b-row>
            <b-col sm="12" md="12">
                <b-card>
                    <h3> How To install widget to website </h3>
                    <p> <strong> Step 1 </strong> </p>
                    <p> Copy this link in header tag <code class="highlighter-rouge">&lt;link rel="stylesheet" href="https://res.cloudinary.com/dtjnr7mrl/raw/upload/v1590760792/widget-prod-v1/css/app.css"&gt;</code> </p>
                    <p> <strong> Step 2 </strong> </p>
                    <p> Copy this to above &lt;/body&gt; tag <code class="highlighter-rouge"> &lt;script src="https://res.cloudinary.com/dtjnr7mrl/raw/upload/v1590760799/widget-prod-v1/js/app.js"&gt;&lt;/script&gt;</code> </p>
                    <p> <strong> Step 3 </strong> </p>
                    <p> Put this tag into body  <code class="highlighter-rouge">&lt;chat-widget website_name="{{ widget.website.name }}" website_id="{{ widget.website._id }}" widget_id="{{ widget._id }}"&gt;&lt;/chat-widget&gt;</code></p>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name : 'Guide',
    computed : mapGetters({
        widget : 'getWidget',
    }),
    methods: {
        ...mapActions(['GET_WIDGET'])
    },
    mounted() {
        this.GET_WIDGET({id : this.$route.params.id})
    },
}
</script>