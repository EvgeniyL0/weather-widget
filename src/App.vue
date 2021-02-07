<template>
  <div id="app">
    <button
      class="app__button_slide_back"
      @click="shift += shiftStep"
      :disabled="shift == 20"
    >
      <img class="app__button-icon" src="./assets/images/back-icon.svg" alt />
    </button>
    <loader v-if="loading" />
    <p class="app__error-text" v-if="loadErr">Loading error :(</p>
    <div
      class="app__cards-container"
      v-if="!loadErr"
      :style="{ left: shift + 'px' }"
    >
      <card v-for="(item, index) in locations" :key="index" :data="item" />
    </div>
    <button
      class="app__button_slide_forward"
      @click="shift -= shiftStep"
      :disabled="Math.abs(shift) >= maxshift"
    >
      <img
        class="app__button-icon"
        src="./assets/images/forward-icon.svg"
        alt
      />
    </button>
    <button class="app__button_config" @click="showConfig = true">
      <img class="app__button-icon" src="./assets/images/config-icon.svg" alt />
    </button>
    <popup v-show="showConfig" @closePopup="closeConfig" />
  </div>
</template>

<script>
import store from "./store";
import { defaultCoords } from "./assets/constants.js";
import Card from "./components/Card.vue";
import Popup from "./components/Popup.vue";
import Loader from "./components/Loader.vue";

export default {
  store,
  name: "App",
  components: {
    Card,
    Popup,
    Loader,
  },
  data() {
    return {
      loading: false,
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
      const data = this.$data;
      const store = this.$store;

      const success = async function (position) {
        await store
          .dispatch("getWeatherByCoords", {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
          .then(() => {
            data.loading = false;
          })
          .catch((err) => {
            data.loading = false;
            data.loadErr = true;
            console.log(err);
          });
      };

      const error = async function () {
        await store
          .dispatch("getWeatherByCoords", defaultCoords)
          .then(() => {
            data.loading = false;
          })
          .catch((err) => {
            data.loading = false;
            data.loadErr = true;
            console.log(err);
          });
      };

      this.loadErr = false;
      this.loading = true;
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    },
  },
  created() {
    const IDs = JSON.parse(localStorage.getItem("cityIDs"));

    if (IDs) {
      this.loadErr = false;
      this.loading = true;
      this.$store
        .dispatch("getWeatherByIDs", IDs.join(","))
        .then(() => {
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.loadErr = true;
          console.log(err);
        });
    } else {
      this.getWeatherForCurrentLocation();
    }
  },
};
</script>

<style lang="scss">
@import "./src/assets/styles/_blocks";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  width: 320px;
  height: 400px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: white;
}

.app__error-text {
  font-size: 24px;
  text-align: center;
}

.app__cards-container {
  position: absolute;
  top: 50px;
  display: flex;
}

.app__button_slide_back {
  @extend button-slide;
  left: 0;
}

.app__button_slide_forward {
  @extend button-slide;
  right: 0;
}

.app__button_config {
  @extend button;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
}

.app__button-icon {
  @extend icon;
}
</style>
