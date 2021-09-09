import { weatherAPI } from "../assets/constants.js";
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: []
  },
  getters: {
    getLocation: state => name => {
      return state.locations.find(item => item.name == name);
    },
  },
  mutations: {
    initStore(state, payload) {
      state.locations = payload.slice();
    },
    addItem(state, payload) {
      state.locations.push(payload);
      localStorage.removeItem("copy");
      localStorage.setItem("copy", JSON.stringify(state.locations));
    },
    changeItem(state, payload) {
      state.locations.splice(payload.index, 1, payload.item);
      localStorage.removeItem("copy");
      localStorage.setItem("copy", JSON.stringify(state.locations));
    },
    deleteItem(state, payload) {
      state.locations.splice(payload, 1);
      localStorage.removeItem("copy");
      localStorage.setItem("copy", JSON.stringify(state.locations));
    }
  },
  actions: {
    getWeatherByCoords(context, payload) {
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${payload.lat}&lon=${payload.lon}&appid=${weatherAPI}&units=metric`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`${res.statusText}`);
        })
        .then((data) => {
          context.commit("addItem", data);
        })
    },
    getWeatherByCity(context, payload) {
      return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${weatherAPI}&units=metric`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`${res.statusText}`);
        })
        .then((data) => {
          context.commit("addItem", data);
        })
    }
  },
  modules: {
  }
})
