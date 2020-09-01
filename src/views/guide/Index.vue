<template>
    <div>
        <b-row>
            <b-col sm="12" md="12">
                <b-card>
                    <h3> How To install widget to website </h3>
                    <p> Copy this to above &lt;/body&gt; tag <code class="highlighter-rouge"> &lt;script 
                        function loadScript() {
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = './js/app.js';
                            document.body.appendChild(script);
                            console.log('loadScript');

                            var headID = document.getElementsByTagName('head')[0];
                            var link = document.createElement('link');
                            link.type = 'text/css';
                            link.rel = 'stylesheet';

                            link.href = './css/app.css';
                            headID.appendChild(link);
                            console.log('loadCss');

                            var widget = document.createElement('chat-widget')
                            widget.website_id = "5e4943930ed33602fab23ed3"
                            widget.widget_id = "5f1b1d2f6a4a354a280d91e9"
                            widget.website_name = "testing_website"

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
                    "&gt;&lt;/script&gt;</code> </p>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>

export default {
    name : 'Super',
    mounted() {
        console.log(this.$route)
    },
}
</script>