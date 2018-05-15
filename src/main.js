import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

var vue  = new Vue({
  el: '#app',
  render: h => h(App)
})
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
