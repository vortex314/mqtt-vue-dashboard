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
    <img src="./assets/logo.png" width="60" height="60">
    <img src="https://hobbyundecided.files.wordpress.com/2018/04/thumb.png" width="90" height="90">
    <table border="1">
        <tr>
            <td v-for="device in devices" width="200">
                <alive v-bind:device="device"></alive>
            </td>
        </tr>
    </table>
    <h1>{{ msg }} </h1>
    <h2>Essential Links</h2>
    <ul>
        <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
        <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
        <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
        <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
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
