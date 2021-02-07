<template>
  <div class="loader"></div>
</template>

<style lang="scss">
@import "./src/assets/styles/_constants";

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loader {
  width: 40px;
  height: 40px;
  margin: 0;
  border: 2px solid $back-color;
  border-radius: 100%;
  border-left-color: #d3d3d3;
  animation: rotation 1s linear infinite;
}
</style>