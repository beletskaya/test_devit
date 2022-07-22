<template>
  <div class="card-city">
    <p class="card-city__name">{{ dataCity.city }}</p>
    <div class="card-city__info">
      <p class="card-city__info-temp">
        {{ Math.round(dataCity.temp) }}°</p>
      <div class="card-city__info__weather">
        <p class="card-city__info__weather-text"><strong> {{ dataCity.weather }} </strong></p>
        <p v-if="dataCity.feels_like">Feels like {{ Math.round(dataCity.feels_like) }}°</p>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  data() {
    return {
      dataCity: {
        city: 'New York',
        temp: 26,
        weather: 'Clear',
        feels_like: 23
      }
    }
  }
}
</script>

<style scoped  lang="scss">
  .card-city{
    width: 30%;

    &__name{
      position: relative;
      display: inline-block;
      color: #87888a;

      &::after {
        content:'';
        position: absolute;
        width: 20px;
        height: 20px;
        background-image: url("'~@/assets/place-localizer.png");
        background-repeat: no-repeat;
        background-size: contain;
        transform: translate(-50%,0);
        left: -12px;
      }
     }

    &__info {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 15px;

      &-temp {
        font-size: 50px;
        font-weight: 600;
        margin: 10px 0;
        span {

        }
      }

      &__weather {
        text-align: left;
        margin-left: 12px;

        p {
          margin: 0;
        }
      }
    }
  }

</style>
