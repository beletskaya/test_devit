<template>
  <div class="weather-widjet">
    <h1>Current weather and air quality</h1>
    <location-weather></location-weather>
    <h2>Cities</h2>
    <div>
      <card-weather></card-weather>
    </div>
  </div>
</template>

<script>
import LocationWeather from "@/components/LocationWeather";
import CardWeather from "@/components/CardWeather";

export default {
  components: {LocationWeather, CardWeather},

}
</script>

<style scoped>
.weather-widjet {
  padding: 0 25px 40px;
}

</style>
