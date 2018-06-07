export const state = () => ({
  pdca: {}
})

export const mutations = {
  SET_PDCA (state, { pdca }) {
    state.pdca = pdca
  },
  ADD_PDCA (state, { date, content }) {
    state.pdca[date] = content
  },
  SET_PLAN (state, { date, list }) {
    state.pdca[date].plan = list
  },
  SET_DO (state, { date, list }) {
    state.pdca[date].do = list
  },
  SET_CHECK (state, { date, list }) {
    state.pdca[date].check = list
  },
  SET_ACTION (state, { date, list }) {
    state.pdca[date].action = list
  },
  REMOVE_PLAN (state, { date, item }) {
    state.pdca[date].plan.splice(state.pdca[date].plan.indexOf(item), 1)
  },
  REMOVE_DO (state, { date, item }) {
    state.pdca[date].do.splice(state.pdca[date].do.indexOf(item), 1)
  },
  REMOVE_CHECK (state, { date, item }) {
    state.pdca[date].check.splice(state.pdca[date].check.indexOf(item), 1)
  },
  REMOVE_ACTION (state, { date, item }) {
    state.pdca[date].action.splice(state.pdca[date].action.indexOf(item), 1)
  }
}

export const actions = {
  setPdca ({ commit }, { date, content }) {
    commit('SET_PDCA', { date, content })
  },
  addPdca ({ commit }, pdca) {
    commit('ADD_PDCA', { pdca })
  },
  setPlan ({ commit }, { date, list }) {
    commit('SET_PLAN', { date, list })
  },
  setDo ({ commit }, { date, list }) {
    commit('SET_DO', { date, list })
  },
  setCheck ({ commit }, { date, list }) {
    commit('SET_CHECK', { date, list })
  },
  setAction ({ commit }, { date, list }) {
    commit('SET_ACTION', { date, list })
  },
  removePlan ({ commit }, { date, item }) {
    commit('REMOVE_PLAN', { date, item })
  },
  removeDo ({ commit }, { date, item }) {
    commit('REMOVE_DO', { date, item })
  },
  removeCheck ({ commit }, { date, item }) {
    commit('REMOVE_CHECK', { date, item })
  },
  removeAction ({ commit }, { date, item }) {
    commit('REMOVE_ACTION', { date, item })
  }
}

export const getters = {
  pdca: state => state.pdca
}
