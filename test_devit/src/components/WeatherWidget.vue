<template>
  <div class="weather-widjet">
    <h1>Current weather and air quality</h1>
    <location-weather
      @get-weather-city="getWeatherCity"
      @check-reload="checkReload"
      :incorrectCity="incorrectCity"
    />
    <h2>Cities</h2>
    <div v-if="getWeatherData">
      <card-weather
        v-for="(item, index) in getWeatherData"
        :data="item"
        :key="item.id"
        @delete-card="deleteCard(index)"
      />
    </div>
  </div>
</template>

<script>
import LocationWeather from "@/components/LocationWeather";
import CardWeather from "@/components/CardWeather";
import axios from "axios";

export default {
  components: {LocationWeather, CardWeather},
  data() {
    return {
      incorrectCity: false,
      noreload: true
    }
  },
  mounted() {
    if (!localStorage.getItem('data-weather')) {
      this.getGeolocation()
    } else {
      let storage = JSON.parse(localStorage.getItem('data-weather'));
      storage.forEach((item) => {
        this.getWeatherCity(item.city, item.isDefault)
      })
    }
  },
  methods: {
    getWeatherInfo(lat, lon) {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b4f2447b3b05c86e015a35a9e833b87a`)
          .then((result) => {
            let res = result.data;
            res.isDefault = true
            this.$store.dispatch('addWeatherData', res);
            return res
          })
          .then((result) => {
            localStorage.setItem('data-weather', JSON.stringify([{'city': result.name, isDefault: true}]))
          })
          .catch((e) => {
            console.error(e.message);
          })
    },
    getGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) =>  {
          this.getWeatherInfo(position.coords.latitude, position.coords.longitude)
        })
      } else {
        alert('Your browser does not support Navigator API');
      }
    },
    getWeatherCity(city, isDefault = null) {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b4f2447b3b05c86e015a35a9e833b87a`)
          .then((result) => {
            let res = result.data;
            res.isDefault = isDefault
            this.$store.dispatch('addWeatherData', res);
            this.incorrectCity = false;
            return res
          })
          .then((data) => {
            if (!this.noreload) {
              let storage = JSON.parse(localStorage.getItem('data-weather'))
              storage.push({'city': data.name})
              localStorage.setItem('data-weather', JSON.stringify(storage))
            }
          })
          .catch((e) => {
            this.incorrectCity = true
            console.error(e.message);
          })
    },
    checkReload(val) {
      this.noreload = val
    },
    deleteCard(index) {
      this.$store.commit('REMOVE_WEATHER_BY_INDEX', index)
      let storage = JSON.parse(localStorage.getItem('data-weather'))
      storage.splice(index, 1)
      localStorage.setItem('data-weather', JSON.stringify(storage))
    }
  },
  computed: {
    getWeatherData () {
      return this.$store.state.weatherData
    }
  }
}
</script>

<style scoped>
.weather-widjet {
  padding: 0 25px 40px;
}

</style>
