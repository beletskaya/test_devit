import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weatherData: []
  },
  getters: {
    getWeatherData(state) {
      return state.weatherData;
    }
  },
  mutations: {
    WEATHER_DATA(state, payload) {
      state.weatherData.push( payload );
    }
  },
  actions: {
    addWeatherData(context, data) {
      context.commit("WEATHER_DATA", data);
    }
  }
})
