<script>
import Layout from '@layouts/main'
export default {
    name : 'detail',
    components : { Layout }
}
</script>
<template>
    <Layout>
        <b-row>
            <b-col cols="12">
                <b-card>
                    <header class="header">
                        <h4> Subject </h4>
                        <span> username </span>
                    </header>
                    <div class="chat-body-list">
                        <div class='quote float-left'>
                            <div class='speech-bubble left'>
                                <blockquote>
                                    <span>testing left</span>
                                </blockquote>
                                <p>
                                    <span class='time-ago'>
                                        17:30
                                    </span>
                                </p>

                            </div>
                        </div>
                        <div class='quote float-right'>
                            <div class='speech-bubble right grey'>
                                <blockquote>
                                    <span>testing right </span>
                                </blockquote>
                                <p>
                                    <span class='time-ago'>
                                        17:30
                                    </span>
                                </p>

                            </div>
                        </div>
                    </div>
                    <div class="chat-form">
                        <b-input-group>
                            <b-form-textarea
                            id="textarea"
                            placeholder="Enter something..."
                            rows="2"
                            max-rows="6"
                            ></b-form-textarea>
                            <b-input-group-append>
                                <button type="button" class="btn btn-primary btn-icon">
                                    <input type="file" class="file-pick" accept="image/jpeg,image/png"/>
                                    <i class="fas fa-paperclip"></i>
                                </button>
                                <button class="btn btn-primary btn-icon">
                                    <i class="mdi mdi-send"></i>
                                </button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                    <div class="col-md-12">
                        <b-dropdown id="dropdown-left" text="Options" variant="primary" class="m-2 float-right">
                            <b-dropdown-item href="#">Transfer Chat</b-dropdown-item>
                            <b-dropdown-item href="#">End Chat</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </Layout>
</template>

<style lang="scss" scoped>

    .quote {
        display: inline-block;
        margin: 2ex 0em;
        clear: both;
    }
    .quote p {
        font-weight: 500;
    }
    .quote p .time-ago {
        font-size: 90%;
        color: tint(#2D4154, 40%);
    }
    .quote blockquote {
        color: tint(#2D4154, 20%);
        margin: 0;
    }
    .quote .round-avatar {
        border-radius: 50%;
        border: 1px solid #E0E8ED;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        float: left;
        margin-right: 0.5em;
        width: 60px;
        height: 60px;
    }
    .quote .speech-bubble {
        float: left;
    }
    .quote .speech-bubble.right {
        border: 1px solid #0078ec;
        border-radius: 6px;
        position: relative;
        margin-left: 9px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        margin-right: 4px;
        margin-bottom: 4px;
        padding: 1ex 1em;
        background: #0078ec;
        color: #fff;
    }
    .quote .speech-bubble.left {
        border: 1px solid #E0E8ED;
        border-radius: 6px;
        position: relative;
        margin-left: 9px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        margin-right: 4px;
        margin-bottom: 4px;
        padding: 1ex 1em;
        background: #FDFDFE;
    }
    
    .quote .speech-bubble.left:after, .quote .speech-bubble.left:before {
        content: "";
        display: block;
        position: absolute;
    }
    .quote .speech-bubble.left:after {
        top: 16px;
    }
    .quote .speech-bubble.left:before {
        top: 14px;
    }

    .quote .speech-bubble p {
        line-height: 1.3em;
        margin: 0;
        margin-top: 20px;
        color: #a5a5a5;
        font-weight: 400;
    }
    .header {
        border-bottom: 1px solid rgba(152,166,173,.3);
        overflow: hidden;
    }

    .chat-body-list {
        height: 60vh;
        padding: 0;
        overflow-y: scroll;
    }
</style>