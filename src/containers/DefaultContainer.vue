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
    <div :class="getUnreadTotal(getNotif) > 0 ? 'notification-button have-chat' : 'notification-button no-chat'" @click="setClicked(getNotif)">
        <span> {{ getUnreadTotal(getNotif) }} Requests </span>
      </div>
      <div class="notification-list">
        <span v-for="notif in getNotif" :key="notif._id">
          <div class="new-list" v-if="notif.is_minimize == true && notif.active_operator == null" @click="goToChatAndAssign(notif._id)">
            <span class="badge-number">{{ notif.unreadtotal }}</span>
            <button class="btn-close" @click="endChat(notif._id)"> 
              <i class="fa fa-close"></i>
            </button>
            <p>{{ notif.ticket_id }}</p>
          </div>
          <div :class="notif.unreadtotal > 0 ? 'current-list' : 'current-list no-unread'"  v-else-if="notif.is_minimize == true && notif.active_operator == current_user" @click="goToChat(notif._id)">
            <span class="badge-number">{{ notif.unreadtotal }}</span>
            <button class="btn-close" @click="endChat(notif._id)"> 
              <i class="fa fa-close"></i>
            </button>
            <p>{{ notif.ticket_id }}</p>
          </div>
        </span>
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
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    },
    ...mapGetters(['getNotif'])
  },
  watch: {
    getNotif(set) {
      // console.log(set)
      // if(set) {
      //   set.map(v => {
      //     if(v.active_operator == null && v.unreadtotal == 1 || v.unreadtotal == 0) {
      //       this.$notification.show(v.ticket_id, {
      //         body: 'You got the ticket'
      //       }, {})
      //       var sound = new Howl({
      //         src: [ding]
      //       });
      //       sound.play();
      //     }
      //     if(v.unreadtotal > 0 && v.active_operator == this.current_user) {
      //       this.$notification.show(v.ticket_id, {
      //         body: 'You got the reply'
      //       }, {})
      //     }
      //   })
        
      // }
    }
  },
  methods: {
    ...mapActions(['GET_NOTIFICATION','GET_NOTIFICATION_GROUP','ASSIGN_OPERATOR',
      'CLOSE_CHAT']),
    setClicked(items) {
      // console.log(items)
      // let total = 0;
      // for(var i = 0; i < items.length; ++i){
      //     if(items[i].active_operator == null)
      //         total++;
      // }
      // if(total > 0) {
        let a = items.filter((v) => {
          return !v.active_operator
        })

        this.goToChatAndAssign(a[0]._id)
      // }
    },
    goToChat(id) {
      this.selected = id
      this.clicked = !this.clicked
      this.$refs.notifChatDetail.getChat(id)
        this.$bvModal.show('notifchatdetail')
    },
    goToChatAndAssign(id) {
      this.selected = id
      this.clicked = !this.clicked
      this.ASSIGN_OPERATOR({
          id : id,
          operator : localStorage.getItem('user_id'),
          website : localStorage.getItem('current_chat_web')
      })
      this.$refs.notifChatDetail.getChat(id)
      this.$bvModal.show('notifchatdetail')
    },
    getUnreadTotal(items) 
    {
      // console.log(items)
      let total = 0;
      for(var i = 0; i < items.length; ++i){
          if(items[i].active_operator == null)
              total++;
      }
      return total
      // return items.length
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
        
    },
    playSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    }
  },
  mounted() {
    if(localStorage.getItem('user_role') == "customer service" || localStorage.getItem('user_role') == "administrator") {
      this.GET_NOTIFICATION_GROUP({
          website : localStorage.getItem('user_website')
      })
    } else {
      this.GET_NOTIFICATION()
    }
    
  },
}
</script>
