<style>

#mqtt {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
<template>
<div id="mqtt">
    Host :
    <input v-model="host"></input>
    Port :
    <input v-model="port"></input> # {{counter}}
    <p>
        <button v-on:click="connect()">Connect</button>
        <button v-on:click="publish('src/browser/system/upTime','HIDI')">Publish</button>
        <button v-on:click="disconnect()">Disconnect</button>
    </p>
    <p class="log"></p>
</div>
</template>

<script>

import Vue from 'vue';
import { EventBus } from '../event-bus.js';
import { Mqtt } from '../mqtt.js'


export default  {
    name: 'mqtt-control',
    data() {
        return {
            counter: 1,
            subscriptions:[]
        }
    },
    created:function(){
      this.subscriptions=[];
    },
    props: ['host', 'port'],
    methods: {
        connect: function() {
          Mqtt.connect();
        },
        disconnect: function() {
            Mqtt.disconnect()
        },
        publish: function(topic, msg) {
          Mqtt.publish("src/browser/system/tick",new Date().getTime().toString())
        }
    }
};

</script>
