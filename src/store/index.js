import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './states'
import actions from './actions'
import getters from './getter'


Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
