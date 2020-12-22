<template>
  <div id="app">
    <button class="app__button" :disabled="locations.length <= 1">
      <svg
        width="20"
        height="20"
        viewBox="0 0 8 12"
        fill="#696969"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.40991 10.58L2.82991 6L7.40991 1.41L5.99991 0L-8.7738e-05 6L5.99991 12L7.40991 10.58Z"
        />
      </svg>
    </button>
    <div class="cards-container">
      <card v-for="(item, index) in locations" :key="index" :data="item" />
    </div>
    <button class="app__button" :disabled="locations.length <= 1">
      <svg
        width="20"
        height="20"
        viewBox="0 0 8 12"
        fill="#696969"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.590088 10.58L5.17009 6L0.590088 1.41L2.00009 0L8.00009 6L2.00009 12L0.590088 10.58Z"
        />
      </svg>
    </button>
    <button class="app__button app__button_config">
      <img class="app__config-icon" src="./assets/images/menu.svg" alt="">
    </button>
  </div>
</template>

<script>
import { defaultCoords } from "./assets/constants.js";
import Card from "./components/Card.vue";

export default {
  name: "App",
  components: {
    Card
  },
  data() {
    return {};
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    }
  },
  created() {
    const store = this.$store;

    const success = async function(position) {
      await store.dispatch("getWeather", {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    };

    const error = async function() {
      await store.dispatch("getWeather", defaultCoords);
    };

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
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

.app__button_config {
  position: absolute;
  top: 0;
  right: 0;
  width: 72px;
  height: 72px;
}

.app__config-icon {
  width: 72px;
}
</style>
