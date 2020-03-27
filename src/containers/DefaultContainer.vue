<template>
  <div class="app">
    <DefaultHeader/>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <DefaultFooter/>
    <div :class="getUnreadTotal(notifs) > 0 ? 'notification-button have-chat' : 'notification-button no-chat'" @click="setClicked(notifs)">
        <span> {{ getUnreadTotal(notifs) }} Requests </span>
      </div>
      <div class="notification-list">
          <div v-for="notif in notifs" :key="notif._id" @click="goToChatAndAssign(notif._id)" :class="notifs.length >= 1 && notifs.length <= 4 ? 'float-left normal-width' : notifs.length >= 5 && notifs.length <= 7 ? 'float-left rem10' : notifs.length >= 8 && notifs.length <= 11 ? 'float-left rem7' : notifs.length >= 12 && notifs.length <= 15 ? 'float-left rem5' :'float-left rem3'">
            <div v-if="notif.is_minimize == true && notif.active_operator == null" class="new-list">
              <span class="badge-number">{{ notif.unreadtotal }}</span>
              <button class="btn-close" @click="endChat(notif._id)"> 
                <i class="fa fa-close"></i>
              </button>
              <p>{{ notif.ticket_id }}</p>
            </div>
            <div :class="notif.unreadtotal > 0 ? 'current-list' : 'current-list no-unread'"  v-else-if="notif.is_minimize == true && notif.active_operator == current_user" @click="goToChat(notif._id, notif.website)">
              <span class="badge-number">{{ notif.unreadtotal }}</span>
              <button class="btn-close" @click="endChat(notif._id)"> 
                <i class="fa fa-close"></i>
              </button>
              <p>{{ notif.ticket_id }}</p>
            </div>
          </div>
      </div>
      <Modal ref="notifChatDetail" :id="selected"/>
  </div>
</template>

<script>
import nav from '@/_nav'
import { Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'
import { mapGetters, mapActions } from 'vuex'
import Modal from './Modal'
import {Howl, Howler} from 'howler';
import ding from '../assets/ding.mp3'

export default {
  name: 'DefaultContainer',
  components: {
    AppSidebar,
    AppAside,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    DefaultFooter,
    DefaultHeader,
    Modal
  },
  data () {
    return {
      nav: nav.items,
      show: false, 
      current_user : localStorage.getItem('user_id'),
      clicked : false,
      selected : null
    }
  },
  computed: {
    ...mapGetters({
      replyEvent : 'getReplyEvent',
      newTicketEvent : 'getNewTicketEvent',
      notifs : 'getNotifs'
    }),
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    },
    
  },
  watch: {
    async replyEvent(set) {
        await this.$notification.show(set.ticket_id, {
            body: 'You got the reply'
        }, {})
        var sound = new Howl({
          src: [ding]
        });
        sound.play();
        await this.GET_NOTIF({
          role : localStorage.getItem('user_role'),
          website : localStorage.getItem('user_website')
        }) 
    },
    async newTicketEvent(set) {
      await this.$notification.show(set.ticket_id, {
        body: 'You got the ticket'
      }, {})
      var sound = new Howl({
        src: [ding],
        preload : false
      });
      sound.play();
      await this.GET_NOTIF({
        role : localStorage.getItem('user_role'),
        website : localStorage.getItem('user_website')
      })
    }
  },
  methods: {
    ...mapActions(['GET_REPLY_EVENT','GET_NEW_TICKET_EVENT','GET_NOTIF',
      'ASSIGN_OPERATOR','GET_NOTIF_EVENT','CLOSE_CHAT']),
    setClicked(items) {
        let a = items.filter((v) => {
          return !v.active_operator
        })

        this.goToChatAndAssign(a[0]._id, a[0].website)
    },
    goToChat(id, website) {
      this.selected = id
      this.clicked = !this.clicked
      this.$refs.notifChatDetail.getChat(id, website)
        this.$bvModal.show('notifchatdetail')
    },
    goToChatAndAssign(id, website) {
      this.selected = id
      this.clicked = !this.clicked
      this.ASSIGN_OPERATOR({
          id : id,
          operator : localStorage.getItem('user_id'),
          website : localStorage.getItem('current_chat_web')
      })
      this.$refs.notifChatDetail.getChat(id, website)
      this.$bvModal.show('notifchatdetail')
    },
    getUnreadTotal(items) 
    {
      let total = 0;
      for(var i = 0; i < items.length; ++i){
          if(items[i].active_operator == null)
              total++;
      }
      return total
    },
    endChat(id) {
        this.$swal({
        title : 'Are You Sure To Close This Chat?',
        text : "You won't able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, close it!'
        }).then((result) => {
            if (result.value) {
                this.CLOSE_CHAT({
                    id : id
                })
            }
        })
        
    }
  },
  async mounted() {
    await this.GET_NOTIF({
      role : localStorage.getItem('user_role'),
      website : localStorage.getItem('user_website')
    })
    await this.GET_NOTIF_EVENT({
      role : localStorage.getItem('user_role'),
      website : localStorage.getItem('user_website')
    })
    await this.GET_REPLY_EVENT()
    await this.GET_NEW_TICKET_EVENT()
  }
}
</script>
