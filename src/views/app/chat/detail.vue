<template>
    <div>
        <b-row class="app-row">
            <b-colxx xxs="12" class="chat-app">
                <div>
                    <div class="d-flex flex-row chat-heading">
                        <div class="d-flex min-width-zero">
                            <div class="card-body pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                <div class="min-width-zero">
                                    <div>
                                        <p class="list-item-heading mb-1 truncate">User A</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="separator mb-5"/>
                    <vue-perfect-scrollbar class="scroll" :settings="{ suppressScrollX: true, wheelPropagation: false }" ref="chatArea">
                        <div>
                            <b-card no-body
                                :class="'d-inline-block mb-3 float-right'"
                            >
                                <div class="position-absolute pt-1 pr-2 r-0">
                                    <span class="text-extra-small text-muted">11/11/2020</span>
                                </div>
                                <b-card-body>
                                    <div class="d-flex flex-row pb-1">
                                        <div class="d-flex flex-grow-1 min-width-zero">
                                            <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                                <div class="min-width-zero">
                                                    <p class="mb-0 truncate list-item-heading">You</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-text-left">
                                        <p class="mb-0 text-semi-muted">Lorem Ipsum Dolor Sit Amet</p>
                                    </div>
                                </b-card-body>
                            </b-card>
                            <div class="clearfix"/>
                        </div>
                    </vue-perfect-scrollbar>
                </div>
            </b-colxx>
        </b-row>
        <div class="chat-input-container d-flex justify-content-between align-items-center">
            <b-input class="flex-grow-1" type="text" :placeholder="'Say Something...'"/>
            <div>
                <b-button variant="outline-primary" class="icon-button large ml-1">
                    <i class="simple-icon-paper-clip" />
                </b-button>
                <b-button variant="primary" class="icon-button large ml-1">
                    <i class="simple-icon-arrow-right" />
                </b-button>
            </div>
        </div>
        <application-menu>
            <div class="form-group">
                <label>Transfer Chat To</label>
                <select class="form-control">
                    <option val="">Choose Operator </option>
                </select>
            </div>
            <b-button variant="primary" class="mt-15 btn-block btn-square">Transfer Ticker</b-button>
            <b-button variant="danger" class="mt-15 btn-block btn-square">Close Ticker</b-button>
        </application-menu>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ApplicationMenu from '@/components/Common/ApplicationMenu'
export default {
  name : 'detail',
  components: {
    ApplicationMenu
  },
}
</script>
