<template>
  <div id="app">
    <button class="app__button app__button_back" @click="shift += shiftStep" :disabled="shift == 20">
      <img class="app__icon" src="./assets/images/back-icon.svg" alt="" />
    </button>
    <div class="app__cards-container" :style="{ left: shift + 'px' }">
      <card v-for="(item, index) in locations" :key="index" :data="item" />
    </div>
    <button class="app__button app__button_forward" @click="shift -= shiftStep" :disabled="Math.abs(shift) >= maxshift">
      <img class="app__icon" src="./assets/images/forward-icon.svg" alt="" />
    </button>
    <button class="app__button app__button_config" @click="showConfig = true">
      <img class="app__icon" src="./assets/images/config-icon.svg" alt="" />
    </button>
    <popup v-show="showConfig" @closePopup="showConfig = false" />
  </div>
</template>

<script>
import { defaultCoords } from "./assets/constants.js";
import Card from "./components/Card.vue";
import Popup from "./components/Popup.vue";

export default {
  name: "App",
  components: {
    Card,
    Popup,
  },
  data() {
    return {
      showConfig: false,
      shift: 20,
      shiftStep: 300,
      maxWidth: 320
    };
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    },
    maxshift() {
      if (document.documentElement.clientWidth < this.maxWidth) {
        return (
          this.$store.state.locations.length * this.shiftStep -
          document.documentElement.clientWidth
        );
      } else {
        return this.$store.state.locations.length * this.shiftStep - this.maxWidth;
      }
    }
  },
  created() {
    const store = this.$store;

    const success = async function (position) {
      await store
        .dispatch("getWeatherByCoords", {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const error = async function () {
      await store.dispatch("getWeatherByCoords", defaultCoords).catch((err) => {
        console.log(err);
      });
    };

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  width: 320px;
  height: 400px;
  padding-top: 20px;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.app__cards-container {
  position: absolute;
  display: flex;
}

.app__button {
  padding: 0;
  background-color: white;
  border: none;
  cursor: pointer;
}

.app__button:disabled {
  opacity: 0;
}

.app__button_back {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.app__button_forward {
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}

.app__button_config {
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 2;
}

.app__icon {
  width: 20px;
  height: 20px;
}
</style>
