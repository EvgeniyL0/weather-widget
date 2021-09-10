<template>
  <div class="popup">
    <h1 class="popup__title">Settings</h1>
    <button class="popup__button_close" @click="$emit('closePopup')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        />
      </svg>
    </button>
    <cities-list :listItems="cities" @deleteItem="deleteLocation" />
    <form class="popup__form" @submit.prevent="addNewLocation">
      <fieldset>
        <label for="location">Add location:</label>
        <input type="text" name="location" v-model="newCity" />
        <p
          :class="[
            'popup__warning-text',
            { 'popup__warning-text_active': notFound },
          ]"
        >City not found :(</p>
      </fieldset>
      <button class="popup__button_submit" type="submit" :disabled="newCity === '' || searching">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7h-2z" />
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
import CitiesList from "./CitiesList.vue";

export default {
  components: { CitiesList },
  data() {
    return {
      newCity: "",
      searching: false,
      notFound: false
    };
  },
  computed: {
    cities() {
      return this.$store.state.locations.map(item => {
        return item.name;
      });
    }
  },
  methods: {
    addNewLocation() {
      this.notFound = false;
      this.searching = true;
      this.$store
        .dispatch("getWeatherByCity", this.newCity)
        .then(() => {
          this.newCity = "";
          this.searching = false;
        })
        .catch(err => {
          this.notFound = true;
          this.searching = false;
        });
    },
    deleteLocation(index) {
      this.$store.commit("deleteItem", index);
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/styles/_mixins";

.popup {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 2;
}

.popup__title {
  font-size: 16px;
  font-weight: normal;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.popup__form {
  display: flex;
  justify-content: center;
  align-items: center;
  fieldset {
    display: flex;
    flex-direction: column;
    padding: 0;
    border: none;
    label {
      font-weight: normal;
      margin-bottom: 5px;
    }
  }
  input {
    box-sizing: border-box;
    width: 200px;
    height: 25px;
    margin-right: 5px;
    border-radius: 2px;
    border: 1px solid;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #1e90ff;
    }
  }
}

.popup__button_close {
  @include button();
  position: absolute;
  top: 10px;
  right: 10px;
}

.popup__button_submit {
  @include button();
}

.popup__warning-text {
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
}

.popup__warning-text_active {
  color: #000;
}
</style>