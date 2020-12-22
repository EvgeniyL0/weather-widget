<template>
  <div class="popup">
    <div class="popup__header">
      <span>Settings</span>
      <button @click="$emit('closePopup')">
        <img src="../assets/images/close-icon.svg" alt="" />
      </button>
    </div>
    <div class="popup__list">
      <list-item v-for="(city, index) in cities" :key="index" :name="city" />
    </div>
    <form class="popup__form" @submit.prevent="addNewLocation">
      <input type="text" v-model="newCity" />
      <button type="submit">
        <img src="../assets/images/confirm-icon.svg" alt="" required />
      </button>
    </form>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";

export default {
  components: {
    ListItem,
  },
  data() {
    return {
      newCity: "",
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
      this.$store
        .dispatch("getWeatherByCity", this.newCity)
        .then(() => {
          this.newCity = "";
        })
        .catch((err) => {
          console.log(err);
        });
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

.popup__header {
  height: 30px;
  display: flex;
  justify-content: space-between;
}

.popup__list {
  box-sizing: border-box;
  width: 90%;
  height: 340px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;
}

.popup__form {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>