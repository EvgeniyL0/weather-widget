<template>
  <div class="loader"></div>
</template>

<style lang="scss">
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
  border: 2px solid #f5f5f5;
  border-radius: 100%;
  border-left-color: #000;
  animation: rotation 1s linear infinite;
}
</style>