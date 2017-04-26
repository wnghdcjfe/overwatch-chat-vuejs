<template> 
  <div class="login" :class="pickedHeroClass">
    <div class="loginWrap">
      <div class="picked">
        <i>선택한 영웅: {{pickedHeroName}}</i>
        <button type="button" @click="moveroom">시작하기</button>
      </div>
      <div class="cardMember">
        <div v-for="(hero,index) in heroList" @click="pick(index)">
          <img :src="hero.img" />
          <p>{{hero.name}}</p> 
        </div>
      </div>
      <!--<audio :src="">
            <source :src="pickedHeroMusic" type="audio/mp3"/>
      </audio> -->
      <audio :src="pickedHeroMusic" autoplay></audio>
    </div>
  </div> 
</template>

<script>
  var img1 = require('../assets/1.png');
  var img2 = require('../assets/2.png');
  var img3 = require('../assets/3.png');
  
  var music1 = require('../assets/music1.mp3');
  var music2 = require('../assets/music2.mp3');
  var music3 = require('../assets/music3.mp3');
  export default {
    props:['test'],
    name: 'Login',
    data() {
      return {
        loadingValue: false,
        isActive: true,
        heroList: [{
            name: "트레이서",
            img: img1,
            music:music1
          },
          {
            name: "자리야",
            img: img2,
            music:music2
          },
          {
            name: "한조",
            img: img3,
            music:music3
          }
        ],
        pickedHeroClass: {
          "bg-hero1": true
        },
        pickedHeroName: "자리야",
        pickedHeroMusic:music1
      }
    },
    computed: {

    },
    mounted() { 
      this.pick();
    },
    methods: {
      pick: function (index) { 
        if (index==undefined) {
          index = ~~(Math.random() * 3);
        } 
        this.pickedHeroClass = "bg-hero" + (index + 1);
        this.pickedHeroName = this.heroList[index].name;
        this.pickedHeroMusic = this.heroList[index].music; 
        var audio = document.getElementsByTagName("audio")[0]; 
        audio.play();  
      },
      moveroom: function(){ 
        var path = 'Room/'+this.pickedHeroName;
        var pathObj = {}; 
        pathObj["path"] = path;
        this.$router.replace(pathObj);
      }
    }
  }

</script>
<style scoped> 
  h2 {
    position: relative;
    color: white;
    margin: 0 auto;
    text-align: center;
    font-size: 60px;
  }

  .pickedMember {
    margin: 0 auto;
    text-align: center;
    padding: 20px;
  }

  /*button {
    color: white;
    font-family: 'overwatch';
    font-size: 40px;
    padding: 10px 20px;
    border: 3px solid rgba(255, 156, 0, 0.8);
    background-color: rgba(255, 156, 0, 0.8); 
  } */

  .picked {
    position: relative;
    margin: 0 auto;
    text-align: right;
    padding: 30px; 
  }

  .picked i {
    font-size: 60px;
    display: block;
    color: white;
  }

  .cardMember {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75%;
  }

  .cardMember > div {
    margin: 20px;
    text-align: center;
    position: relative; 
    opacity: 0;
    animation: cardSlide .3s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out; 
    width:300px;
    height:400px;
    transform: scale(1);  
    overflow: hidden; 
  }
  .cardMember > div:hover img{
    transform:scale(1.1); 
  }
  .cardMember img{
    transition: all 0.2s ease-out;
  }

  .cardMember>div:nth-child(1) { 
    animation-delay: .2s;  
  }

  .cardMember>div:nth-child(2) { 
    animation-delay: .3s;
  }

  .cardMember>div:nth-child(3) { 
    animation-delay: .4s;
  }  
  .cardMember img{
    width:100%; 
  } 
  .cardMember p{ 
    padding-bottom:10px;
    padding-top:10px;
    font-size: 40px;
    color: white;
    margin: 0 auto;
    position: absolute;
    margin-top: -64px;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
  }  

  .login {
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
  }

  .loginWrap {
    background-color: rgba(0, 0, 0, 0.5); 
    height: 100vh;
    width: 100vw;
  }

  .bg-hero1 {
    background-image: url('../assets/bg1.gif');
  }

  .bg-hero2 {
    background-image: url('../assets/bg2.gif');
  }

  .bg-hero3 {
    background-image: url('../assets/bg3.gif');
  }

</style>
