<template> 
     <nav>
      <a href="" @click.prevent="showMember"></a>
    </nav> 
</template>

<script> 
  export default {
    name: 'Header',
    data() {
      return { 

      }
    },
    computed: { 
    },
    mounted() {
      //   this.moveRoom();
    },
    methods: { 
      showMember: function(){
         this.$emit('showMember');
      }
    }
  }

</script>
<style scoped> 
  nav {
    width: 100%;
    background-color: rgba(40, 53, 79, .95);
    position: fixed;
    display: flex;
    height: 60px;
    text-align: center;
    align-items: center;
    justify-content: center;
    top:0; 
  }

  nav a {
    background-image: url('../../assets/logo-inline.png');
    width: 184px;
    height: 48px;
  }
</style>
