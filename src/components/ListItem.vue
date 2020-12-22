<template>
  <div class="list-item">
    <button>
      <img src="../assets/images/hum-icon.svg" alt="">
    </button>
    <p>{{name}}</p>
    <button>
      <img src="../assets/images/trash-icon.svg" alt="">
    </button>
  </div>
</template>

<script>
export default {
  props: ["name"]
}
</script>

<style>
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-bottom: 10px;
  background-color: gainsboro;
}
</style>