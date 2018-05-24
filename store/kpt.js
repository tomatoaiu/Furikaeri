export const state = () => ({
  kpt: {
    '2018-05-01': {
      keep: ['everyday commit to github'],
      problem: ['diet'],
      try: ['work for 10 minutes']
    },
    '2018-05-03': {
      keep: ['say hello'],
      problem: ['study'],
      try: ['work for 1000 minutes']
    }
  }
})

export const mutations = {
  SET_KPT (state, { date, content }) {
    state.kpt[date] = content
  },
  SET_KEEP (state, { date, list }) {
    state.kpt[date].keep = list
  },
  SET_PROBLEM (state, { date, list }) {
    state.kpt[date].problem = list
  },
  SET_TRY (state, { date, list }) {
    state.kpt[date].try = list
  },
  REMOVE_KEEP (state, { date, item }) {
    state.kpt[date].keep.splice(state.kpt[date].keep.indexOf(item), 1)
  },
  REMOVE_PROBLEM (state, { date, item }) {
    state.kpt[date].problem.splice(state.kpt[date].problem.indexOf(item), 1)
  },
  REMOVE_TRY (state, { date, item }) {
    state.kpt[date].try.splice(state.kpt[date].try.indexOf(item), 1)
  }
}

export const actions = {
  setKpt ({ commit }, { date, content }) {
    commit('SET_KPT', { date, content })
  },
  setKeep ({ commit }, { date, list }) {
    commit('SET_KEEP', { date, list })
  },
  setProblem ({ commit }, { date, list }) {
    commit('SET_PROBLEM', { date, list })
  },
  setTry ({ commit }, { date, list }) {
    commit('SET_TRY', { date, list })
  },
  removeKeep ({ commit }, { date, item }) {
    commit('REMOVE_KEEP', { date, item })
  },
  removeProblem ({ commit }, { date, item }) {
    commit('REMOVE_PROBLEM', { date, item })
  },
  removeTry ({ commit }, { date, item }) {
    commit('REMOVE_TRY', { date, item })
  }
}

export const getters = {
  kpt: state => state.kpt
}
