<template> 
  <div class="loading">
    <transition name="fade" mode="out-in"> 
      <div class="loading-logo" v-if="loadingValue" key="loading">
        <img src="../assets/logo.png">
      </div> 
      <Login key="login" v-else></Login>
    </transition>
  </div>
</template>

<script>
import Login from './Login.vue';
  export default {
    name: 'Loading',
    components:{
      Login:Login
    },
    data() {
      return {
        loadingValue: true 
      }
    },
    mounted() {
      this.moveRoom();
    },
    methods: {
      moveRoom: function () {
        var vm = this; 
        setTimeout(function () {
          vm.loadingValue = false; 
        }, 1500)  
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loading {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: black;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }  
</style>
