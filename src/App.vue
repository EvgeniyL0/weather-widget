<template>
  <div id="app">
    <button
      class="app__button app__button_slide app__button_slide_back"
      @click="shift += shiftStep"
      :disabled="shift == 20"
    >
      <img class="app__icon" src="./assets/images/back-icon.svg" alt="" />
    </button>
    <p class="app__error-text" v-if="loadErr">Loading error :(</p>
    <div
      class="app__cards-container"
      v-if="!loadErr"
      :style="{ left: shift + 'px' }"
    >
      <card v-for="(item, index) in locations" :key="index" :data="item" />
    </div>
    <button
      class="app__button app__button_slide app__button_slide_forward"
      @click="shift -= shiftStep"
      :disabled="Math.abs(shift) >= maxshift"
    >
      <img class="app__icon" src="./assets/images/forward-icon.svg" alt="" />
    </button>
    <button class="app__button app__button_config" @click="showConfig = true">
      <img class="app__icon" src="./assets/images/config-icon.svg" alt="" />
    </button>
    <popup v-show="showConfig" @closePopup="closeConfig" />
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
      loadErr: false,
      showConfig: false,
      shift: 20,
      shiftStep: 300,
      maxWidth: 320,
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
        return (
          this.$store.state.locations.length * this.shiftStep - this.maxWidth
        );
      }
    },
  },
  methods: {
    closeConfig() {
      this.showConfig = false;
      this.shift = 20;
    },
    getWeatherForCurrentLocation() {
      const store = this.$store;

      const success = async function (position) {
        await store
          .dispatch("getWeatherByCoords", {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
          .catch((err) => {
            this.loadErr = true;
            console.log(err);
          });
      };

      const error = async function () {
        await store
          .dispatch("getWeatherByCoords", defaultCoords)
          .catch((err) => {
            this.loadErr = true;
            console.log(err);
          });
      };

      this.loadErr = false;
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    },
  },
  created() {
    const IDs = JSON.parse(localStorage.getItem("cityIDs"));

    if (IDs === undefined) {
      this.getWeatherForCurrentLocation();
    } else {
      this.loadErr = false;
      this.$store.dispatch("getWeatherByIDs", IDs.join(",")).catch((err) => {
        this.loadErr = true;
        console.log(err);
      });
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
  position: relative;
  overflow: hidden;
  background-color: white;
}

.app__error-text {
  font-size: 24px;
  text-align: center;
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
  z-index: -1;
}

.app__button_slide {
  position: absolute;
  top: 50%;
  z-index: 1;
}

.app__button_slide_back {
  left: 0;
}

.app__button_slide_forward {
  right: 0;
}

.app__button_config {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
}

.app__icon {
  width: 20px;
  height: 20px;
}
</style>
