<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }

</script>

<style>  
  button {
    color: white;
    font-family: 'overwatch';
    font-size: 40px;
    padding: 10px 20px;
    border: 3px solid rgba(255, 156, 0, 0.8);
    background-color: rgba(255, 156, 0, 0.8); 
  } 
[v-cloak]{
  display: none;
}
  @font-face {
    font-family: 'overwatch';
    src: url('./assets/fonts/koverwatch.woff2');
  }
  
  #app {
    font-family: 'overwatch';
    margin: 0 auto; 
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1.5s
  }

  .slidein-enter,
  .slidein-leave-to {
    transform: translateX(100px); 
  }

  .slidein-enter-active,
  .slidein-leave-active {
    transition: all 1.5s
  }

  .slide-enter,
  .slide-leave-to {
    opacity: 0;
    transform: translateY(-60px) rotate3d(1, 0, 0, 45deg);
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s; 
  }

  @keyframes cardSlide {
    from{
      opacity: 0;  
      transform: translateX(-150px) rotate3d(0, 1, 0, 45deg);
    } 
    to {
      opacity: 1;
      transform: translate(0) rotate3d(0);
    }
  }

  @keyframes cardSlide2 {
    from{
      opacity: 0;  
      transform: translateY(-200px) rotate3d(0, 1, 0, 45deg);
    } 
    to {
      opacity: 1;
      transform: translate(0) rotate3d(0);
    }
  }  

</style>
