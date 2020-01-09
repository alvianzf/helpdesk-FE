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
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
                        <div class="box sb1">I'm speech bubble</div>
                        <div class="box sb2">I'm speech bubble</div>
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
                                <button type="button" class="btn btn-icon">
                                    <input type="file" class="file-pick" accept="image/jpeg,image/png"/>
                                    <i class="fas fa-paperclip"></i>
                                </button>
                                <button class="btn btn-icon">
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
    .header {
        border-bottom: 1px solid rgba(152,166,173,.3);
        overflow: hidden;
    }

    .chat-body-list {
        height: 60vh;
        padding: 25px;
        overflow-y: scroll;
    }

    .box {
        width: 300px;
        background: #71b6f9;
        padding: 10px;
        text-align: center;
        font-weight: 700;
        color: #fff;
        font-family: arial;
        position:relative;
        margin-bottom : 15px;
    }

    .sb1:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 5px solid #71b6f9;
        border-right: 5px solid transparent;
        border-top: 5px solid #71b6f9;
        border-bottom: 5px solid transparent;
        right: -10px;
        top: 6px;
    }

    .sb2:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 5px solid transparent;
        border-right: 5px solid #71b6f9;
        border-top: 5px solid #71b6f9;
        border-bottom: 5px solid transparent;
        left: -10px;
        top: 6px;
    }

    .btn-icon {
        background: #71b6f9;
    }
</style>