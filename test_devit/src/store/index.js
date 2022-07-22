import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weatherData: []
  },
  mutations: {
    WEATHER_DATA(state, payload) {
      state.weatherData.push( payload );
    },
    REMOVE_WEATHER_BY_INDEX(state, payload) {
      state.weatherData.splice(payload,1)
    }
  },
  actions: {
    addWeatherData(context, {lat, lon}) {
      try {
        return axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b4f2447b3b05c86e015a35a9e833b87a`
        ).then((data) => {
          let result = data.data
          result.isDefault = true
          context.commit("WEATHER_DATA", result);
          return result
        })
      }
      catch (error) {
        console.error(error)
      }
    },
    addWeatherCity(context, {city, isDefault}) {
      try {
        return axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b4f2447b3b05c86e015a35a9e833b87a`
        ).then((data) => {
          let result = data.data
          result.isDefault = isDefault;
          context.commit("WEATHER_DATA", result);
          return result
        })
      }
      catch (error) {
        console.error(error)
      }
    }
  }
})
