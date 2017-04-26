<template>
  <div class="room">
    <app-header @showMember="showMember"></app-header>
    <div class="main">
      <list :userList="onlineUserList" :userCount="onlineUserCount"></list>
      <Chat :user="user" :messageList="messageList" @chatting="chat"></Chat>
    </div>
  </div>
</template>

<script>
  import io from '../../lib/socket.io';
  import Header from './room/Header.vue';
  import Chat from './room/Chat.vue';
  import List from './room/List.vue';
  import { EventBus } from '../event.js';
  export default {
    name: 'Room',
    data() {
      return {
        user: {},
        onlineUserList: [],
        onlineUserCount: 0,
        messageList: []
      }
    },
    components: {
      appHeader: Header,
      Chat: Chat,
      list: List
    },
    mounted() {
      this.connect(); 
      this.getFirebase();
    },
    methods: {
      showMember() {
        alert("신나는 오버워치 채팅방!") 
      }, 
      getFirebase: function () {
        // this.$http.get('http://127.0.0.1:52273/getfirebase').then(response => {
        //   this.messageList = response.data; 
        //   EventBus.$emit('gotfire', this.messageList);
        // });
        this.$http.get('/getfirebase').then(response => {
          this.messageList = response.data; 
          EventBus.$emit('gotfire', this.messageList);
        });
      },
      chat(obj) {
        var vm = this;
        vm.socketServer.emit('message', {
          type:"chat",
          msg: obj.message,
          msgUser: obj.user.name,
          date: obj.date
        })
      }, 
      connect() {
        var vm = this;
        var battleTag = ~~(Math.random() * 10000);
        var username = vm.$route.params.username + "#" + battleTag;
        vm.user = {
          id: battleTag,
          name: username
        };
        // vm.socketServer = io.connect('http://127.0.0.1:52273');
        vm.socketServer = io.connect('');
        vm.socketServer.emit('login', vm.user);
        vm.onlineUserList.push(vm.user);
        var updateList = function (obj) {
          vm.onlineUserList = obj.onlineUserList;
          vm.onlineUserCount = obj.onlineUserCount;
        }
        //login - broadcast 이벤트 관리(나를 제외한 이벤트) 
        vm.socketServer.on('login', function (obj) {
          vm.messageList.push({
            type: "info",
            msg: "유저 " + obj.user.name + "가 채팅에 참여하였습니다.",
            msgUser: obj.user
          })
          updateList(obj)
        })
        //login - emit 이벤트 관리(내 자신에게 보여주는 이벤트)
        vm.socketServer.on('loginSuccess', function (obj) {
          updateList(obj)
        });

        //logout 이벤트 관리 
        vm.socketServer.on('logout', function (obj) {
          vm.messageList.push({
            type: "info",
            msg: "유저" + obj.user.name + "가 채팅을 나갔습니다.",
            msgUser: obj.user
          })
          updateList(obj)
        })
        //message 이벤트 관리  
        vm.socketServer.on('message', function (obj) {
          vm.messageList.push({
            type: obj.type,
            msg: obj.msg,
            msgUser: obj.msgUser,
            date: obj.date
          })
        })
      }
    },
  }

</script>

<style scoped>
  .main {
    display: flex;
    align-items: stretch;
    height: calc(100vh - 60px);
    margin-top: 60px;
  }

</style>
