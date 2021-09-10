<template>
  <div class="main">
    <button
      class="main__button_slide_back"
      @click="shift += shiftStep"
      :disabled="shift === initShift"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
        <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
      </svg>
    </button>
    <loader v-if="loading" />
    <p class="main__error-text" v-if="loadErr">Loading error</p>
    <div class="main__cards-container" v-if="!loadErr" :style="{ left: shift + 'px' }">
      <card v-for="(item, index) in locations" :key="index" :data="item" />
    </div>
    <button
      class="main__button_slide_forward"
      @click="shift -= shiftStep"
      :disabled="Math.abs(shift) >= maxshift"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <g>
          <path d="M0,0h24v24H0V0z" fill="none" />
        </g>
        <g>
          <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
        </g>
      </svg>
    </button>
    <button class="main__button_config" @click="showConfig = true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
        />
      </svg>
    </button>
    <popup v-show="showConfig" @closePopup="closeConfig" />
  </div>
</template>

<script>
import {
  defaultCoords,
  widgetWidth,
  sliderInitShift,
  sliderShiftStep
} from "../assets/constants.js";
import Card from "../components/Card.vue";
import Popup from "../components/Popup.vue";
import Loader from "../components/Loader.vue";

export default {
  components: {
    Card,
    Popup,
    Loader
  },
  data() {
    return {
      loading: false,
      loadErr: false,
      showConfig: false,
      initShift: sliderInitShift,
      shift: sliderInitShift,
      shiftStep: sliderShiftStep,
      maxWidth: widgetWidth
    };
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    },
    maxshift() {
      return (
        this.$store.state.locations.length * this.shiftStep - this.maxWidth
      );
    }
  },
  methods: {
    closeConfig() {
      this.showConfig = false;
      this.shift = sliderInitShift;
    },
    getWeatherForCurrentLocation() {
      const success = async function(position) {
        await this.$store
          .dispatch("getWeatherByCoords", {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
          .then(() => {
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            this.loadErr = true;
          });
      };

      const error = async function() {
        await this.$store
          .dispatch("getWeatherByCoords", defaultCoords)
          .then(() => {
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            this.loadErr = true;
          });
      };

      const boundSucces = success.bind(this);
      const boundError = error.bind(this);

      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
      } else {
        navigator.geolocation.getCurrentPosition(boundSucces, boundError);
      }
    }
  },
  created() {
    const copy = localStorage.getItem("copy");

    this.loadErr = false;
    this.loading = true;

    if (copy) {
      this.$store.commit("initStore", JSON.parse(copy));
      this.loading = false;
    } else {
      this.getWeatherForCurrentLocation();
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/styles/_mixins";

.main {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.main__error-text {
  font-size: 18px;
  text-align: center;
}

.main__cards-container {
  position: absolute;
  top: 50px;
  display: flex;
}

.main__button_config {
  @include button();
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
}

.main__button_slide_back {
  @include button_slide();
  left: 0;
}

.main__button_slide_forward {
  @include button_slide();
  right: 0;
}
</style>