<template>
    <div>
        <b-row>
            <b-col sm="12" md="12">
                <b-card>
                    <h3> How To install widget to website </h3>
                    <p> Copy this to above &lt;/body&gt; tag <code class="highlighter-rouge"> &lt;script&gt;
                        function loadScript() {
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = 'https://res.cloudinary.com/dtjnr7mrl/raw/upload/v1599142008/widget-prod-new-way-2/js/app.js';
                            document.body.appendChild(script);
                            console.log('loadScript');

                            var headID = document.getElementsByTagName('head')[0];
                            var link = document.createElement('link');
                            link.type = 'text/css';
                            link.rel = 'stylesheet';

                            link.href = 'https://res.cloudinary.com/dtjnr7mrl/raw/upload/v1599142010/widget-prod-new-way-2/css/app.css';
                            headID.appendChild(link);
                            console.log('loadCss');

                            var widget = document.createElement('chat-widget');
                            widget.website_id = "{{ widget.website._id }}";
                            widget.widget_id = "{{ widget._id }}";
                            widget.website_name = "{{ widget.website.name }}";

                            document.body.appendChild(widget);
                            console.log('loadWidget');

                            let params = (new URL(document.location)).searchParams;
                            let name = params.get("name");
                            console.log(name)
                        }


                        function initialize() {
                            console.log('initialize');
                        }

                        window.onload = loadScript; 
                    &lt;/script&gt;</code> </p>
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