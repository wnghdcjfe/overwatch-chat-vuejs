import Vue from 'vue'
import Router from 'vue-router'
import Loading from '@/components/Loading'
import Room from '@/components/Room' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Loading',
      component: Loading
    },
    {
      path: '/Room/:username',
      name: 'Room',
      component: Room
    }  
  ]
})
