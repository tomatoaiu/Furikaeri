export const state = () => ({
  ywt: {
    '2018-05-10': {
      yattakoto: ['everyday commit to github'],
      wakattakoto: ['diet'],
      tsuginiyarukoto: ['work for 10 minutes']
    },
    '2018-05-11': {
      yattakoto: ['say hello'],
      wakattakoto: ['study'],
      tsuginiyarukoto: ['programming']
    }
  }
})

export const mutations = {
  ADD_YWT (state, { date, content }) {
    state.ywt[date] = content
  },
  SET_YATTAKOTO (state, { date, list }) {
    state.ywt[date].yattakoto = list
  },
  SET_WAKATTAKOTO (state, { date, list }) {
    state.ywt[date].wakattakoto = list
  },
  SET_TSUGINIYARUKOTO (state, { date, list }) {
    state.ywt[date].tsuginiyarukoto = list
  },
  REMOVE_YATTAKOTO (state, { date, item }) {
    state.ywt[date].yattakoto.splice(state.ywt[date].yattakoto.indexOf(item), 1)
  },
  REMOVE_WAKATTAKOTO (state, { date, item }) {
    state.ywt[date].wakattakoto.splice(state.ywt[date].wakattakoto.indexOf(item), 1)
  },
  REMOVE_TSUGINIYARUKOTO (state, { date, item }) {
    state.ywt[date].tsuginiyarukoto.splice(state.ywt[date].tsuginiyarukoto.indexOf(item), 1)
  }
}

export const actions = {
  addYwt ({ commit }, { date, content }) {
    commit('ADD_YWT', { date, content })
  },
  setYattakoto ({ commit }, { date, list }) {
    commit('SET_YATTAKOTO', { date, list })
  },
  setWakattakoto ({ commit }, { date, list }) {
    commit('SET_WAKATTAKOTO', { date, list })
  },
  setTsuginiyarukoto ({ commit }, { date, list }) {
    commit('SET_TSUGINIYARUKOTO', { date, list })
  },
  removeYattakoto ({ commit }, { date, item }) {
    commit('REMOVE_YATTAKOTO', { date, item })
  },
  removeWakattakoto ({ commit }, { date, item }) {
    commit('REMOVE_WAKATTAKOTO', { date, item })
  },
  removeTsuginiyarukoto ({ commit }, { date, item }) {
    commit('REMOVE_TSUGINIYARUKOTO', { date, item })
  }
}

export const getters = {
  ywt: state => state.ywt
}
