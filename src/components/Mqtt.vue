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

import { EventBus } from '../event-bus.js';

export default {
    name: 'mqtt',
    data() {
        return {
            //            host: 'limero.ddns.net',
            //          port: 1884,
            counter: 1
        }
    },
    props: ['host', 'port'],
    methods: {
        connect: function() {
            console.log(" connecting ");
            this.client = new Paho.MQTT.Client(this.host, Number(this.port), "clientId2");
            // set callback handlers
            this.client.onConnectionLost = this.onConnectionLost;
            this.client.onMessageArrived = this.onMessageArrived;
            // connect the client
            this.client.connect({
                onSuccess: this.onConnect
            });
        },
        disconnect: function() {
            this.client.disconnect()
        },
        onMessageArrived: function(message) {
            this.counter++;
            console.log(message.destinationName + "=" + message.payloadString)
            EventBus.publish(message.destinationName,message.payloadString)
        },
        onConnectionLost: function(error) {
            console.log("error : "+error.errorCode+" : "+error.errorMessage);
        },
        onUpTime:function (topic,message) {

        },
        onConnect: function() {
            console.log("3");
            this.client.subscribe("src/+/system/upTime",{
              qos:0,invocationContext:this,
              onSuccess:this.onSubscribeSuccess,
              onFailure:this.onSubscribeFailure,
              timeout:5
            })
          this.subscribe("src/+/system/upTime")
        },
        onSubscribeSuccess: function(){
          console.log(" subcribe success.")
        },
        onSubscribeFailure: function(){
          console.log("subscribe failure.")
        },
        subscribe:function(pattern){
          this.client.subscribe(pattern,{
            qos:0,invocationContext:this,
            onSuccess:this.onSubscribeSuccess,
            onFailure:this.onSubscribeFailure,
            timeout:5
          })
        },
        publish: function(topic, msg) {}
    }
}

</script>
