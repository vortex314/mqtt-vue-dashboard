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

<div id="alive" v-bind:class="color" >
    {{device}}
</div>

</template>

<script>

export default {
    name: 'alive',
    data() {
        return {
            lastUpdate: new Date(),
            upTime: 0,
            color: "green",
            level: 2
        }
    },
    created: function() {
        // subscribe to mqtt src/device/system/upTime
        // set timeout handler
        var self = this;
        this.intervalid1 = setInterval(self.onTimeout,2000);
    },
    props: ['device'],
    methods: {
        onUpdate: function() {
            this.color = "green"
        },
        onTimeout: function() {
          console.log("timeout "+this.level)
          if (this.level <= 2 && this.level > 0) this.level--;
          else return;
          if (this.level == 1) {
              this.color = "orange"
          } else {
              this.color = "red"
          }
        }
    }
}

</script>
