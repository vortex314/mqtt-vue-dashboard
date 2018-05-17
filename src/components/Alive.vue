<style>

div.green {
    background-color: #00ff00;
    foreground-color: #ffffff;
    color: #000000;
}

div.orange {
    background-color: #ff9900;
    foreground-color: #ffffff;
    color: #ffffff;
}

div.red {
    background-color: #ff0000;
    foreground-color: #ffffff;
    color: #ffffff;
}

</style>

<template>
  <table border="2">
      <tr v-for="device in devices">
          <td  >
            <div id="alive" v-bind:class="device.getColor()" >
                {{device.name}}
            </div>
          </td>
          <td  >
            <div id="alive" v-bind:class="device.getColor()" >
                {{device.value}}
            </div>
          </td>
      </tr>
  </table>


</template>

<script>

import { EventBus } from '../event-bus.js';
import  Topic  from '../topic.js'



class Device {
  constructor(name){
    this.name=name
    this.onUpdate("0")
  }
  onUpdate(message){
    this.level=5;
    this.lastUpdate = new Date().getTime()
    this.value=message
  }

  onTimeout(){
    if ( this.getDelta() < 2000 ) return;
    if (this.level <= 5 && this.level > 0) this.level--;
  }

  getColor() {
    if ( this.level > 4 ) return "green"
    if ( this.level >0 ) return "orange"
    return "red"
  }

  getDelta(){
    return new Date().getTime() - this.lastUpdate
  }

}
var DeviceRemoveTimeout=30000;

export default {
    name: 'alive',
    data() {
        return {
            devices:[new Device("dev-dead")]
        }
    },
    created: function() {
        var self = this;
        this.intervalId = setInterval(this.onTimeout,1000);
        EventBus.register('src/+/system/upTime',this.eventHandler)
    },
    methods: {
        eventHandler : function(event) {
          var deviceName = Topic.getDevice(event.topic)
          var device
          for (var i=0;i< this.devices.length;i++){
            device = this.devices[i]
            if ( device.name == deviceName) {
              device.onUpdate(event.message)
              return;
            }
          }
          this.devices.push(new Device(deviceName))
        },
        onTimeout: function() {
          console.log("timeout "+this.level)
          for (var i=0;i< this.devices.length;i++){
            this.devices[i].onTimeout();
            if ( this.devices[i].getDelta()>DeviceRemoveTimeout) this.devices.splice(i,1)
          }
        }
    }
}

</script>
