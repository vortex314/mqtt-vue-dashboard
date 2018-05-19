import Vue from 'vue';
import { EventBus } from './event-bus.js';


export const Mqtt = new Vue({
    name: 'mqtt',
    data() {
        return {
            counter: 1,
            subscriptions:[],
            connected:false,
            host:"limero.ddns.net",
            port : 1884
        }
    },
    created:function(){
      this.subscriptions=[];
    },
    methods: {
        connect: function() {
            console.log("Mqtt Connecting ...");
            this.client = new Paho.MQTT.Client(this.host, Number(this.port), "clientId2");
            // set callback handlers
            this.client.onConnectionLost = this.onConnectionLost;
            this.client.onMessageArrived = this.onMessageArrived;
            // connect the client
            this.client.connect({
                onSuccess: this.onConnectSuccess,
                onFailure: this.onConnectFailure,
                reconnect: true
            });
        },
        disconnect: function() {
          console.log(" Disconnecting.")
            this.client.disconnect()
            this.connected=false
        },
        onMessageArrived: function(message) {
            this.counter++;
            console.log(message.destinationName + "=" + message.payloadString)
            EventBus.publish(message.destinationName,message.payloadString)
        },
        onConnectionLost: function(error) {
          this.connected=false
            console.log("Connection lost. error : "+error.errorCode+" : "+error.errorMessage);
        },
        onConnectFailure: function(error) {
          this.connected=false
            console.log("Connection failure. error : "+error.errorCode+" : "+error.errorMessage);
        },
        onConnectSuccess: function() {
            console.log("Connected.");
            this.connected=true
            for(var i=0;i<this.subscriptions.length;i++) {
            this.client.subscribe(this.subscriptions[i],{
              qos:0,invocationContext:this,
              onSuccess:this.onSubscribeSuccess,
              onFailure:this.onSubscribeFailure,
              timeout:5
            })
          }
        },
        onSubscribeSuccess: function(context){
          console.log(" subcribe success."+context)
        },
        onSubscribeFailure: function(){
          console.log("subscribe failure.")
        },
        subscribe:function(pattern){
          console.log("subscribing '"+pattern+"'")
          this.subscriptions.push(pattern)
          if ( this.connected )
          this.client.subscribe(pattern,{
            qos:0,invocationContext:this,
            onSuccess:this.onSubscribeSuccess,
            onFailure:this.onSubscribeFailure,
            timeout:5
          })
        },
        publish: function(topic, msg) {
          console.log("MQTT Publish "+topic)
          this.client.send(topic,msg,0,false)
        }
    }
});
