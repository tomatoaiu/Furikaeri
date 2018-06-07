export const state = () => ({
  gapAnalysis: {
    '2018-05-01': {
      asis: ['everyday commit to github'],
      tobe: ['diet'],
      gap: ['work for 10 minutes']
    },
    '2018-05-03': {
      asis: ['asisda'],
      tobe: ['tobeda'],
      gap: ['gapwosuruzo']
    }
  }
})

export const mutations = {
  SET_GAP_ANALYSIS (state, { gapAnalysis }) {
    state.gapAnalysis = gapAnalysis
  },
  ADD_GAP_ANALYSIS (state, { date, content }) {
    state.gapAnalysis[date] = content
  },
  SET_ASIS (state, { date, list }) {
    state.gapAnalysis[date].asis = list
  },
  SET_TOBE (state, { date, list }) {
    state.gapAnalysis[date].tobe = list
  },
  SET_GAP (state, { date, list }) {
    state.gapAnalysis[date].gap = list
  },
  REMOVE_ASIS (state, { date, item }) {
    state.gapAnalysis[date].asis.splice(state.gapAnalysis[date].asis.indexOf(item), 1)
  },
  REMOVE_TOBE (state, { date, item }) {
    state.gapAnalysis[date].tobe.splice(state.gapAnalysis[date].tobe.indexOf(item), 1)
  },
  REMOVE_GAP (state, { date, item }) {
    state.gapAnalysis[date].gap.splice(state.gapAnalysis[date].gap.indexOf(item), 1)
  }
}

export const actions = {
  setGapAnalysis ({ commit }, gapAnalysis) {
    commit('SET_GAP_ANALYSIS', { gapAnalysis })
  },
  addGapAnalysis ({ commit }, { date, content }) {
    commit('ADD_GAP_ANALYSIS', { date, content })
  },
  setAsis ({ commit }, { date, list }) {
    commit('SET_ASIS', { date, list })
  },
  setTobe ({ commit }, { date, list }) {
    commit('SET_TOBE', { date, list })
  },
  setGap ({ commit }, { date, list }) {
    commit('SET_GAP', { date, list })
  },
  removeAsis ({ commit }, { date, item }) {
    commit('REMOVE_ASIS', { date, item })
  },
  removeTobe ({ commit }, { date, item }) {
    commit('REMOVE_TOBE', { date, item })
  },
  removeGap ({ commit }, { date, item }) {
    commit('REMOVE_GAP', { date, item })
  }
}

export const getters = {
  gapAnalysis: state => state.gapAnalysis
}
