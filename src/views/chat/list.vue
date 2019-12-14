<script>
import Layout from '@layouts/main'

export default {
    name : 'list',
    components : { Layout }
}
</script>
<template>
    <Layout>
        <div class="row">
            <div class="col-md-12">
                <b-card>
                    <header class="header">
                        <h3 class="float-left"> Total 16 chats </h3>
                        <div class="search-box float-right">
                            <input placeholder="Search..." class="form-control">
                        </div>
                    </header>
                    <ul class="message-list">
                        <li class="unread">
                            <div class="row">
                                <div class="text-center col-md-1">
                                    <a href="#">
                                        <i class="mdi mdi-eye"></i>
                                    </a>
                                </div>
                                <div class="subject col-md-9">
                                    <span> Chat Subject here </span>
                                </div>
                                <div class="date col-md-2">11:49 am</div>
                            </div>
                        </li>
                        <li class="unread">
                            <div class="row">
                                <div class="text-center col-md-1">
                                    <a href="#">
                                        <i class="mdi mdi-eye"></i>
                                    </a>
                                </div>
                                <div class="subject col-md-9">
                                    <span> Chat Subject here </span>
                                </div>
                                <div class="date col-md-2">11:49 am</div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="text-center col-md-1">
                                    <a href="#">
                                        <i class="mdi mdi-eye"></i>
                                    </a>
                                </div>
                                <div class="subject col-md-9">
                                    <span> Chat Subject here </span>
                                </div>
                                <div class="date col-md-2">11:49 am</div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="text-center col-md-1">
                                    <a href="#">
                                        <i class="mdi mdi-eye"></i>
                                    </a>
                                </div>
                                <div class="subject col-md-9">
                                    <span> Chat Subject here </span>
                                </div>
                                <div class="date col-md-2">11:49 am</div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="text-center col-md-1">
                                    <a href="#">
                                        <i class="mdi mdi-eye"></i>
                                    </a>
                                </div>
                                <div class="subject col-md-9">
                                    <span> Chat Subject here </span>
                                </div>
                                <div class="date col-md-2">11:49 am</div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="text-center col-md-1">
                                    <a href="#">
                                        <i class="mdi mdi-eye"></i>
                                    </a>
                                </div>
                                <div class="subject col-md-9">
                                    <span> Chat Subject here </span>
                                </div>
                                <div class="date col-md-2">11:49 am</div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="text-center col-md-1">
                                    <a href="#">
                                        <i class="mdi mdi-eye"></i>
                                    </a>
                                </div>
                                <div class="subject col-md-9">
                                    <span> Chat Subject here </span>
                                </div>
                                <div class="date col-md-2">11:49 am</div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="text-center col-md-1">
                                    <a href="#">
                                        <i class="mdi mdi-eye"></i>
                                    </a>
                                </div>
                                <div class="subject col-md-9">
                                    <span> Chat Subject here </span>
                                </div>
                                <div class="date col-md-2">11:49 am</div>
                            </div>
                        </li>
                    </ul>
                </b-card>
            </div>
        </div>
    </Layout>
</template>

<style lang="scss" scoped>
    .header {
        padding: 12px 25px;
        border-bottom: 1px solid rgba(152,166,173,.3);
        overflow: hidden;
    }

    .message-list {
        display: block;
        padding-left: 0;
    }

    .message-list li.unread {
        font-weight: 500;
        color: #98a6ad;
    }

    .message-list li {
        position: relative;
        display: block;
        height: 50px;
        line-height: 50px;
        cursor: default;
        -webkit-transition-duration: .3s;
        transition-duration: .3s;
        color: #323a46;
        border-bottom: 1px solid #f3f3f3;
    }
</style>