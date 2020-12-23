import { weatherAPI } from "../assets/constants.js";
import Vue from 'vue'
import Vuex from 'vuex'

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
    addItem(state, payload) {
      state.locations.push(payload);
    },
    changeItem(state, payload) {
      state.locations.splice(payload.index, 1, payload.item);
    },
    deleteItem(state, payload) {
      state.locations.splice(payload, 1);
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
          context.commit('addItem', data);
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
          context.commit('addItem', data);
        })
    },
    getWeatherByIDs(context, payload) {
      return fetch(`https://api.openweathermap.org/data/2.5/group?id=${payload}&appid=${weatherAPI}&units=metric`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`${res.statusText}`);
        })
        .then((data) => {
          data.list.forEach(item => {
            context.commit('addItem', item);
          });
        })
    }
  },
  modules: {
  }
})
