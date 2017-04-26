<template>
  <div class="chat">
    <div class="messageShow" id="messageShow">
      <transition-group name="slide">
        <div class="message" v-for="(item, index) in messageList" :key="index">
          <div class="info" v-if="item.type == 'info'">
            <span>{{item.msg}} </span>
          </div>
          <div class="chatWrap" v-if="item.type == 'chat'">
            <span class="messageWrap"> 
           <span> [{{item.msgUser}}]</span>
            <span class="messageDate">{{item.date}}</span>
            </span>
            <span class="messageWrap2">{{item.msg}} </span>
          </div>
        </div>
      </transition-group>
      <div class="endPoint" id="end"></div>
    </div>
    <div class="inputWrap">
      <input type="input" v-model="message" @keyup.enter="chatting">
      <button type="button" @click="chatting">입력</button>
    </div>
  </div>
</template>

<script>
  import {
    EventBus
  } from '../../event.js'; 
  export default {
    name: 'Chat',
    props: ['user', 'messageList'],
    data() {
      return {
        message: ''
      }
    },
    computed: {},
    mounted() {
      EventBus.$on('gotfire', messageList => {
        console.log(messageList); 
        var vm = this;
        setTimeout(function(){ 
          vm.scroll();
        }, 0); 
      });
    },
    methods: {
      scroll: function () { 
        var element = '#end';
        var duration = 1000;
        var options = {
          container: '#messageShow',
          easing: 'ease-out' 
        }
        this.$scrollTo(element, duration, options)
      },
      getDate: function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var hour = ("0" + now.getHours()).slice(-2);
        var day = ("0" + now.getDate()).slice(-2);
        var minutes = ("0" + now.getMinutes()).slice(-2);
        var result = year + "-" + month + "-" + day + " " + hour + ":" + minutes;
        return result;
      },
      chatting: function () {
        if (this.message.trim().length) {
          var obj = {};
          obj.message = this.message.trim();
          obj.user = this.user;
          obj.date = this.getDate();
          this.$emit('chatting', obj);
          this.message = '';
          this.scroll();
        }
      }
    }
  }

</script>
<style scoped>
  #end {
    height: 20px;
  }

  .messageShow>span {
    display: block;
  }

  .chat {
    flex: 2;
    display: block;
    display: flex;
    flex-direction: column;
    background-image: url('../../assets/bgchat.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .chatWrap {
    display: block;
    margin: 10px;
    font-size: 24px;
    position: relative;
  }

  .chatWrap>span {
    display: inline-block;
    vertical-align: middle;
  }

  .messageWrap>span {
    display: block;
    max-width: 200px;
    word-wrap: break-word;
  }

  .messageWrap2 {
    background-color: white;
    padding: 10px;
    margin-left: 10px;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }

  .messageWrap2::before {
    position: absolute;
    top: calc(50% - 7px);
    left: -13px;
    content: '';
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-right: 7px solid white;
    border-bottom: 7px solid transparent;
    border-left: 7px solid transparent;
  }

  .messageDate {
    font-size: 20px;
    color: #aaa;
  }

  .messageShow {
    flex: 14;
    overflow-y: scroll;
  }

  .messageShow::-webkit-scrollbar {
    width: 10px;
  }

  .messageShow::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  .messageShow::-webkit-scrollbar-thumb {
    background-color: rgba(255, 156, 0, 0.5);
  }

  .inputWrap {
    flex: 1;
    display: flex;
  }

  input {
    flex: 10;
    border: 3px solid #aaa;
    font-size: 24px;
    font-family: 'overwatch';
    vertical-align: middle;
  }

  button {
    flex: 1;
    padding: 10px;
    vertical-align: middle;
    font-size: 28px;
  }

  .info {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .info>span {
    padding: 5px 10px;
    background-color: #aaa;
  }

</style>
