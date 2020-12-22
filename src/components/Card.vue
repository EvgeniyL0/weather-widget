<template>
  <div class="card">
    <p>{{data.name}}, {{data.sys.country}}</p>
    <div>
      <img :src="`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`" alt />
      <span>{{data.main.temp}}°C</span>
    </div>
    <p>Feels like: {{data.main.feels_like}}°C. {{data.weather[0].main}}, {{data.weather[0].description}}</p>
    <p>Wind: {{data.wind.speed}} meter/sec, {{data.wind.deg}}</p>
    <p>Pressure: {{data.main.pressure}} hPa</p>
    <p>Humidity: {{data.main.humidity}}%</p>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style>
.card {
  width: 300px;
  flex-shrink: 0;
}
</style>