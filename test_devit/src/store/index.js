import Vue from 'vue'
import Vuex from 'vuex'

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
    addWeatherData(context, data) {
      context.commit("WEATHER_DATA", data);
    }
  }
})
