<template>
  <div class="popup">
    <h1 class="popup__title">Settings</h1>
    <button class="popup__button popup__button_close" @click="closePopup">
      <img
        class="popup__icon popup__icon_close"
        src="../assets/images/close-icon.svg"
        alt
      />
    </button>
    <ul
      class="popup__list"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <li
        class="popup__list-item"
        v-for="(city, index) in cities"
        :key="index"
        @dragstart="onDragStart(city, index)"
        @dragover="onDragOver(city, index)"
        draggable="true"
      >
        <span>{{ city }}</span>
        <button
          class="popup__button popup__button_del"
          @click="deleteLocation(index)"
        >
          <img class="popup__icon" src="../assets/images/trash-icon.svg" alt />
        </button>
      </li>
    </ul>
    <form class="popup__form" @submit.prevent="addNewLocation">
      <fieldset>
        <label for="location">Add location:</label>
        <input class="popup__input" type="text" name="location" v-model="newCity" />
        <p class="popup__not-found-text" v-if="notFound">City not found :(</p>
      </fieldset>
      <button class="popup__button" type="submit" :disabled="newCity === ''">
        <img class="popup__icon" src="../assets/images/confirm-icon.svg" alt />
      </button>
    </form>
  </div>
</template>

<script>
export default {
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
    onDragStart(item, index) {
      this.movingItem = this.$store.getters.getLocation(item);
      this.movingIndex = index;
    },
    onDragOver(item, index) {
      this.currentItem = this.$store.getters.getLocation(item);
      this.currentIndex = index;
    },
    onDrop(event) {
      this.$store.commit("changeItem", {
        index: this.movingIndex,
        item: this.currentItem,
      });
      this.$store.commit("changeItem", {
        index: this.currentIndex,
        item: this.movingItem,
      });
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

<style>
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

.popup__button {
  padding: 0;
  background-color: white;
  border: none;
  cursor: pointer;
}

.popup__button_close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.popup__button_del {
  background-color: #f5f5f5;
}

.popup__list {
  width: 80%;
  height: 60%;
  padding: 0;
  margin-left: auto;
  margin-top: 20px;
  margin-right: auto;
  margin-bottom: 20px;
  overflow-y: auto;
  list-style: none;
}

.popup__list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 10px;
  border-radius: 2px;
  background-color: #f5f5f5;
  cursor: move;
}

.popup__form {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.popup__form fieldset {
  display: flex;
  flex-direction: column;
  padding: 0;
  border: none;
}

.popup__form fieldset label {
  font-weight: normal;
  margin-bottom: 5px;
}

.popup__input {
  box-sizing: border-box;
  width: 200px;
  height: 30px;
  border-radius: 2px;
  border: 1px solid;
}

.popup__input:focus {
  border-color: #1E90FF;
}

.popup__not-found-text {
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 14px;
  text-align: center;
}

.popup__icon {
  width: 20px;
  height: 20px;
}
</style>