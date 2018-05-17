import Vue from 'vue';
import Mqtt from './components/Mqtt'
import { Topic } from './topic.js'
export const EventBus = new Vue({
  data() {
      return {
        listeners:[]
      }
    },
  created: function() {

  },
  methods:{
    patternToRegexp : function(pattern) {
      var pat=pattern
      pat = pat.replace('\+','.*')
      pat = pat.replace('#','.*')
      return pat
    },
    register:function(pattern,handler) {
      console.log(" registering for "+pattern)
      var listener={pattern:pattern,regexp:this.patternToRegexp(pattern),handler:handler}
      this.listeners.push(listener)
      this.$on(pattern,handler)

    },
    publish:function(topic,message) {
        console.log(" EventBus publish "+topic)
        var listener
        for(var i =0;i< this.listeners.length;i++) {
          listener =  this.listeners[i]
          if ( topic.match(listener.regexp)) {
            this.$emit(listener.pattern,{topic:topic,message:message})
          }
        }
    }
  }
});
