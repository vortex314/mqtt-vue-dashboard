import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { EventBus } from './event-bus.js';
import { VueGridLayout } from 'vue-grid-layout'
import LinearGauge from 'vue-canvas-gauges/src/LinearGauge'
import RadialGauge from 'vue-canvas-gauges/src/RadialGauge'

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
