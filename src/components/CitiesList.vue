<template>
  <ul class="cities-list" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
    <li
      v-for="(item, index) in listItems"
      :key="index"
      :draggable="moveOn"
      @dragstart="onDragStart(item, index)"
      @dragover="onDragOver(item, index)"
    >
      <button class="cities-list__button_hum" @mousedown="moveOn = true" @mouseup="moveOn = false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>
      <span>{{ item }}</span>
      <button class="cities-list__button_delete" @click="$emit('deleteItem', index)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
          />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    listItems: Array
  },
  data() {
    return {
      movingItem: "",
      movingIndex: "",
      currentItem: "",
      currentIndex: "",
      moveOn: false
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
        item: this.currentItem
      });
      this.$store.commit("changeItem", {
        index: this.currentIndex,
        item: this.movingItem
      });
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/styles/_mixins";

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
    background-color: #f5f5f5;
  }
}

.cities-list__button_hum,
.cities-list__button_delete {
  @include button();
  background-color: #f5f5f5;
}

.cities-list__button_hum {
  cursor: move;
}
</style>