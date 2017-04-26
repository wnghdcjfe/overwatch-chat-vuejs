<template>
  <div class="list">
    <div class="searchWrap">
      <input type="search" v-model="findUser"></input>
      <button type="button">
        <span></span>
      </button>
    </div>
    <h2>접속한 유저수: {{userCount}}명</h2>
    <transition-group name="slide">
      <div class="user" v-for="(item, index) in searchUserList" :key="index">
        <img :src="characterImg(item)">
        <span>{{item.name}}</span>
      </div>
    </transition-group>

  </div>
</template>

<script>
  export default {
    name: 'List',
    props: {
      userList: Array,
      userCount: Number
    },
    data() {
      return {
        findUser: '',
        characterImg: function (val) { 
          val = val.name;
          if (val.indexOf("트레이서") != -1) {
            return require('../../assets/small1.png')
          } else if (val.indexOf("자리야") != -1) {
            return require('../../assets/small2.png')
          } else if (val.indexOf("한조") != -1) {
            return require('../../assets/small3.png')
          }
        }
      }
    },
    computed: {
      searchUserList: function () { 
        var vm = this;
        return vm.userList.filter(function (val) {  
          return val.name.indexOf(vm.findUser) !== -1;
        })
      }
    },
    mounted() {},
    methods: {},
    filters: { 
      
    }
  }

</script>
<style scoped>
  h2 {
    text-align: center;
    color: white;
  }

  .list {
    background: linear-gradient(#136a8a, #267871);
    flex: 1;
    overflow-y: scroll;
  }
    .list::-webkit-scrollbar {
    width: 10px;
  }

  .list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  .list::-webkit-scrollbar-thumb {
    background-color: rgba(255, 156, 0, 0.5); 
  } 
  .user {
    background-color: white;
    padding: 10px;
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)
  }

  .user>img,
  .user>span {
    display: inline-block;
    vertical-align: middle;
  }

  .user>span {
    font-size: 24px;
  }

  .user>img {
    border-radius: 4px;
  }

  .searchWrap {
    border-radius: 50px;
    width: 92%;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    height: 70px;
    position: relative;
    margin: 0 auto;
    margin-top: 20px;
  }

  input {
    background: transparent;
    opacity: 1;
    position: absolute;
    top: 22px;
    left: 14px;
    color: #FFF;
    width: 77%;
    font-size: 26px;
    border: none;
    outline: none;
    border-radius: 6px;
    font-family: 'overwatch';
  }

  button {
    width: 50px;
    height: 50px;
    margin: 10px;
    border-radius: 30px;
    border: none;
    background: #FFF;
    padding: 0px;
    outline: none;
    position: relative;
    z-index: 2;
    float: right;
    cursor: pointer;
  }

  button span {
    width: 22px;
    height: 22px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    transform: rotate(-45deg);
  }

  button span::after {
    width: 14px;
    height: 14px;
    left: 0px;
    top: 0px;
    border-radius: 16px;
    border: 4px solid #267871;
  }

  button span::before,
  button span::after {
    position: absolute;
    content: '';
  }

  button span::before {
    width: 4px;
    height: 11px;
    left: 9px;
    top: 18px;
    border-radius: 2px;
    background: #267871;
  }

</style>
