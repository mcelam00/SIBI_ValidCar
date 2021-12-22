import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logueado: false,
    currentAdvertisement: null,
    currentUser: null,
  },
  mutations: {
    changeStateLogueado(state) {
      state.logueado = !state.logueado;
      console.log("Estado logueado", state.logueado);
    },
    setStateLogueado(state, data) {
      state.logueado = data;
      console.log("Estado logueado", state.logueado);
    },
    setCurrentAdvertisement(state, data) {
      state.currentAdvertisement = data;
      console.log("current add", state.currentAdvertisement);
    },
    setCurrentUser(state, data) {
      console.log(data)
      state.currentUser = data;
      console.log("Current usuario", state.currentUser.nombre);
    },
    /* updateCollection(state, coleccionActualizada){
      state.currentColeccion = coleccionActualizada;
    }*/
  },
  actions: {
    //llamamos con el dispatch
    changeStateLogueadoAction(context) {
      context.commit("changeStateLogueado");
    },
    setStateLogueadoAction(context, data) {
      context.commit("setStateLogueado", data);
    },
    setCurrentAdvertisementAction(context, data) {
      context.commit("setCurrentAdvertisement", data); //a mutations
    },
    setCurrentUserAction(context, data) {
      context.commit("setCurrentUser", data);
    },
    /*updateCollectionAction(context, coleccionActualizada){

      context.commit("updateCollection", coleccionActualizada);
    },
*/
  },
  getters: {
    logueado(state) {
      return state.logueado;
    },
    currentAdvertisement(state) {
      return state.currentAdvertisement;
    },
    currentUser(state) {
      return state.currentUser;
    },
  },
  modules: {},
});
