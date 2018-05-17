<style>

#app {
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

<div id="app">
    <mqtt host="limero.ddns.net" port=1884></mqtt>
    <alive></alive>
    <img src="./assets/logo.png" width="60" height="60">
    <img src="https://hobbyundecided.files.wordpress.com/2018/04/thumb.png" width="90" height="90">

    <h1>{{ msg }} </h1>

</div>

</template>

<script>

import Mqtt from './components/Mqtt'
import Alive from './components/Alive'
export default {
    name: 'app',
    components: {
        Mqtt,
        Alive
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            devices:["tag1","drive","anchor1","anchor2","anchor3","anchor4"]
        }
    }
}

</script>
