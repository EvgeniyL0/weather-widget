<template>
  <div class="card">
    <h1 class="card__title">{{ data.name }}, {{ data.sys.country }}</h1>
    <div class="card__image">
      <img
        :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"
        alt
      />
      <h2 class="card__subtitle">{{ data.main.temp }}°C</h2>
    </div>
    <div class="card__text">
      <p>
        Feels like: {{ data.main.feels_like }}°C. {{ data.weather[0].main }},
        {{ data.weather[0].description }}
      </p>
      <p>Wind: {{ data.wind.speed }} meter/sec</p>
      <p>Pressure: {{ data.main.pressure }} hPa</p>
      <p>Humidity: {{ data.main.humidity }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style lang="scss">
.card {
  width: 280px;
  padding-left: 20px;
  flex-shrink: 0;
}

.card__title {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
}

.card__subtitle {
  font-size: 24px;
  font-weight: normal;
}

.card__image {
  display: flex;
  align-items: center;
}

.card__text {
  width: 80%;
}
</style>