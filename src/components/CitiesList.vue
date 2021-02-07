<template>
  <ul
    class="cities-list"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
  >
    <li
      v-for="(item, index) in listItems"
      :key="index"
      @dragstart="onDragStart(item, index)"
      @dragover="onDragOver(item, index)"
      draggable="true"
    >
      <span>{{ item }}</span>
      <button class="cities-list__button"
        @click="$emit('deleteItem', index)"
      >
        <img class="cities-list__button-icon" src="../assets/images/trash-icon.svg" alt />
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    listItems: Array,
  },
  data() {
    return {
      movingItem: "",
      movingIndex: "",
      targetItem: "",
      targetIndex: "",
    };
  },
  methods: {
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
  },
};
</script>

<style lang="scss">
@import "./src/assets/styles/_constants";
@import "./src/assets/styles/_blocks";

.cities-list {
  width: 80%;
  height: 60%;
  padding: 0;
  margin-left: auto;
  margin-top: 20px;
  margin-right: auto;
  margin-bottom: 20px;
  overflow-y: auto;
  list-style: none;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 10px;
    border-radius: 2px;
    background-color: $back-color;
    cursor: move;
  }
}

.cities-list__button {
  @extend button;
  background-color: $back-color;
}

.cities-list__button-icon {
  @extend icon;
}
</style>