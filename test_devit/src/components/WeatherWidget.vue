<template>
  <div class="weather-widjet">
    <h1>Current weather and air quality</h1>
    <location-weather
        @get-weather-city="getWeatherCity"
        @check-reload="checkReload"
        :incorrectCity="incorrectCity"
    />
    <h2>Cities</h2>
    <transition name="fade"  mode="out-in">
      <div v-if="loaded" key="content">
        <card-weather
            v-for="(item, index) in getItems"
            :data="item"
            :key="item.id"
            @delete-card="deleteCard(index)"
        />
        <vuejs-paginate
            :page-count="getPaginateCount"
            :prev-text="'<'"
            :next-text="'>'"
            :click-handler="paginateClickCallback"
            :container-class="'pagination justify-content-center'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-class="'page-item'"
            :prev-link-class="'page-link'"
            :next-class="'page-item'"
            :next-link-class="'page-link'"
            :first-last-button="true"
            :first-button-text="'<<'"
            :last-button-text="'>>'"
        ></vuejs-paginate>
      </div>
      <div v-else key="loading">
        <img src="../assets/Loading.gif" alt="loading">
      </div>
    </transition>
  </div>
</template>

<script>
import LocationWeather from "@/components/LocationWeather";
import CardWeather from "@/components/CardWeather";
import VuejsPaginate from "vuejs-paginate";
import {mapActions, mapState} from 'vuex'

export default {
  components: {LocationWeather, CardWeather, VuejsPaginate},
  data() {
    return {
      loaded: false,
      incorrectCity: false,
      noreload: true,
      currentPage: 1,
      perPage: 5
    }
  },
  mounted() {
    if (!this.weatherCities) {
      this.getGeolocation();
    } else {
      this.weatherCities.forEach((item) => {
        this.getWeatherCity(item.city, item.isDefault);
      })
    }
  },
  methods: {
    ...mapActions([
      'addWeatherData', 'addWeatherCity'
    ]),
    getWeatherInfo(lat, lon) {
      this.addWeatherData({lat, lon}).then((result) => {
        this.$store.commit('CHANGE_LOCALSTORAGE', [{'city': result.name, isDefault: true}]);
        this.loaded = true;
        return result
      })
      .catch((e) => {
        console.error(e.message);
        alert('Your browser does not support Navigator API');
      })
    },
    getGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.getWeatherInfo(position.coords.latitude, position.coords.longitude);
        })
      } else {
        alert('Your browser does not support Navigator API');
      }
    },
    getWeatherCity(city, isDefault = null) {
      this.loaded = false;
      this.addWeatherCity({city, isDefault}).then((result) => {
        this.incorrectCity = false;
        if (!this.noreload) {
          let storage = this.weatherCities;
          storage.push({'city': result.name});
          this.$store.commit('CHANGE_LOCALSTORAGE', storage);
        }
        this.loaded = true;
      })
      .catch(() => {
        this.incorrectCity = true;
        this.loaded = true;
      })
    },
    checkReload(val) {
      this.noreload = val;
    },
    deleteCard(index) {
      this.$store.commit('REMOVE_WEATHER_BY_INDEX', index);
      let storage = this.weatherCities;
      storage.splice(index, 1);
      this.$store.commit('CHANGE_LOCALSTORAGE', storage);
    },
    paginateClickCallback(pageNum) {
      this.currentPage = Number(pageNum);
    }
  },
  computed: {
    ...mapState(["weatherData", "weatherCities"]),
    getItems() {
      let start = (this.currentPage - 1) * this.perPage;
      let end = this.currentPage * this.perPage;
      return this.weatherData.slice(start, end);
    },
    getPaginateCount() {
      return Math.ceil(this.weatherData.length / this.perPage);
    }
  }
}
</script>

<style lang="scss">
.weather-widjet {
  padding: 0 25px 40px;

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;

    li {
      list-style: none;
      margin-right: 10px;

      a {
        padding: 10px;
        border: 1px solid #dad5d5;
        border-radius: 5px;
      }

      &.active {
        a {
          background-color: #0072f5;
          color: white;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>
