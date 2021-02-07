<template>
  <div class="popup">
    <h1 class="popup__title">Settings</h1>
    <button class="popup__button_close" @click="closePopup">
      <img class="popup__button-icon" src="../assets/images/close-icon.svg" alt />
    </button>
    <cities-list :listItems="cities" @deleteItem="deleteLocation" />
    <form class="popup__form" @submit.prevent="addNewLocation">
      <fieldset>
        <label for="location">Add location:</label>
        <input type="text" name="location" v-model="newCity" />
        <p v-if="notFound">City not found :(</p>
      </fieldset>
      <button class="popup__button_submit" type="submit" :disabled="newCity === ''">
        <img class="popup__button-icon" src="../assets/images/confirm-icon.svg" alt />
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
      notFound: false,
      movingItem: "",
      movingIndex: "",
      targetItem: "",
      targetIndex: "",
    };
  },
  computed: {
    cities() {
      return this.$store.state.locations.map((item) => {
        return item.name;
      });
    },
  },
  methods: {
    addNewLocation() {
      this.notFound = false;
      this.$store
        .dispatch("getWeatherByCity", this.newCity)
        .then(() => {
          this.newCity = "";
        })
        .catch((err) => {
          this.notFound = true;
          console.log(err);
        });
    },
    deleteLocation(index) {
      this.$store.commit("deleteItem", index);
    },
    closePopup() {
      const cityIDs = this.$store.state.locations.map((item) => {
        return item.id;
      });

      localStorage.setItem("cityIDs", JSON.stringify(cityIDs));
      this.$emit("closePopup");
    },
  },
};
</script>

<style lang="scss">
@import "./src/assets/styles/_blocks";

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
  align-items: flex-end;
  fieldset {
    display: flex;
    flex-direction: column;
    padding: 0;
    border: none;
    label {
      font-weight: normal;
      margin-bottom: 5px;
    }
    p {
      margin-top: 5px;
      margin-bottom: 0;
      font-size: 14px;
      text-align: center;
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
      box-shadow: 0 0 0 3px #1e90ff;
    }
  }
}

.popup__button_close {
  @extend button;
  position: absolute;
  top: 10px;
  right: 10px;
}

.popup__button_submit {
  @extend button;
}

.popup__button-icon {
  @extend icon;
}
</style>