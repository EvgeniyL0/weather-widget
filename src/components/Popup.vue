<template>
  <div class="popup">
    <div class="popup__header">
      <span>Settings</span>
      <button class="popup__button" @click="$emit('closePopup')">
        <img class="popup__icon popup__icon_close" src="../assets/images/close-icon.svg" alt />
      </button>
    </div>
    <ul class="popup__list" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
      <li
        class="popup__list-item"
        v-for="(city, index) in cities"
        :key="index"
        @dragstart="onDragStart($event, index)"
        @dragover="dragoverIndex = index"
        draggable="true"
      >
        <button class="popup__button popup__button_drag">
          <img class="popup__icon" src="../assets/images/hum-icon.svg" alt />
        </button>
        <span>{{city}}</span>
        <button class="popup__button">
          <img class="popup__icon" src="../assets/images/trash-icon.svg" alt />
        </button>
      </li>
    </ul>
    <form class="popup__form" @submit.prevent="addNewLocation">
      <input class="popup__input" type="text" v-model="newCity" required />
      <button class="popup__button" type="submit">
        <img class="popup__icon" src="../assets/images/confirm-icon.svg" alt />
      </button>
    </form>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";

export default {
  components: {
    ListItem
  },
  data() {
    return {
      cities: [],
      newCity: "",
      dragoverIndex: '',
      movingItem: ''
    };
  },
  methods: {
    addNewLocation() {
      this.$store
        .dispatch("getWeatherByCity", this.newCity)
        .then(() => {
          this.cities.push(this.newCity);
          this.newCity = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    onDragStart(event, item, index) {
      event.dataTransfer.setData('itemIndex', index);
    },
    onDrop(event) {
      const itemIndex = event.dataTransfer.getData('itemIndex');
      const movingItems = this.cities.splice(itemIndex, 1);

      this.cities.splice(this.dragoverIndex, 0, movingItems[0]);
    }
  },
  created() {
    this.cities = this.$store.state.locations.map(item => {
      return item.name;
    });
  }
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

.popup__header {
  height: 30px;
  display: flex;
  justify-content: space-between;
}

.popup__list {
  width: 90%;
  height: 300px;
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
  background-color: gainsboro;
}

.popup__list-item_selected {
  opacity: 0.7;
}

.popup__form {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup__input {
  width: 60%;
  margin-right: 5px;
  border-radius: 2px;
}

.popup__button {
  padding: 0;
  background-color: white;
  border: none;
  cursor: pointer;
}

.popup__button_drag {
  background-color: gainsboro;
  cursor: move;
}

.popup__icon {
  width: 20px;
  height: 20px;
}

.popup__icon_close {
  width: 30px;
  height: 30px;
}
</style>