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
import { mapActions } from 'vuex'

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
    ...mapActions([
      'addWeatherData', 'addWeatherCity'
    ]),
    getWeatherInfo(lat, lon) {
     this.addWeatherData({lat, lon}).then((result) => {
       localStorage.setItem('data-weather', JSON.stringify([{'city': result.name, isDefault: true}]))
        return result
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
      this.addWeatherCity({city, isDefault}).then( (result) => {
        this.incorrectCity = false;
        if (!this.noreload) {
          let storage = JSON.parse(localStorage.getItem('data-weather'))
          storage.push({'city': result.name})
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
