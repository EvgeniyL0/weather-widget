import { weatherAPI } from "../assets/constants.js";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: []
  },
  mutations: {
    addItem(state, payload) {
      state.locations.push(payload);
    }
  },
  actions: {
    getWeatherByCoords(context, coords) {
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${weatherAPI}&units=metric`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`${res.statusText}`);
        })
        .then((data) => {
          context.commit('addItem', data);
        })
    },
    getWeatherByCity(context, city) {
      return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPI}&units=metric`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`${res.statusText}`);
        })
        .then((data) => {
          context.commit('addItem', data);
        })
    }
  },
  modules: {
  }
})
