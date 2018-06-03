export const state = () => ({
  lamda: {
    '2018-05-01': {
      look: ['everyday commit to github'],
      ask: ['diet'],
      model: ['work for 10 minutes'],
      discuss: ['work for 10 minutes'],
      act: ['work for 10 minutes']
    },
    '2018-05-03': {
      look: ['lookda'],
      ask: ['askda'],
      model: ['modelwosuruzo'],
      discuss: ['discusssimasita'],
      act: ['work for 10 minutes']
    }
  }
})

export const mutations = {
  SET_LAMDA (state, { date, content }) {
    state.lamda[date] = content
  },
  SET_LOOK (state, { date, list }) {
    state.lamda[date].look = list
  },
  SET_ASK (state, { date, list }) {
    state.lamda[date].ask = list
  },
  SET_MODEL (state, { date, list }) {
    state.lamda[date].model = list
  },
  SET_DISCUSS (state, { date, list }) {
    state.lamda[date].discuss = list
  },
  SET_ACT (state, { date, list }) {
    state.lamda[date].act = list
  },
  REMOVE_LOOK (state, { date, item }) {
    state.lamda[date].look.splice(state.lamda[date].look.indexOf(item), 1)
  },
  REMOVE_ASK (state, { date, item }) {
    state.lamda[date].ask.splice(state.lamda[date].ask.indexOf(item), 1)
  },
  REMOVE_MODEL (state, { date, item }) {
    state.lamda[date].model.splice(state.lamda[date].model.indexOf(item), 1)
  },
  REMOVE_DISCUSS (state, { date, item }) {
    state.lamda[date].discuss.splice(state.lamda[date].discuss.indexOf(item), 1)
  },
  REMOVE_ACT (state, { date, item }) {
    state.lamda[date].act.splice(state.lamda[date].act.indexOf(item), 1)
  }
}

export const actions = {
  setLamda ({ commit }, { date, content }) {
    commit('SET_LAMDA', { date, content })
  },
  setLook ({ commit }, { date, list }) {
    commit('SET_LOOK', { date, list })
  },
  setAsk ({ commit }, { date, list }) {
    commit('SET_ASK', { date, list })
  },
  setModel ({ commit }, { date, list }) {
    commit('SET_MODEL', { date, list })
  },
  setDiscuss ({ commit }, { date, list }) {
    commit('SET_DISCUSS', { date, list })
  },
  setAct ({ commit }, { date, list }) {
    commit('SET_ACT', { date, list })
  },
  removeLook ({ commit }, { date, item }) {
    commit('REMOVE_LOOK', { date, item })
  },
  removeAsk ({ commit }, { date, item }) {
    commit('REMOVE_ASK', { date, item })
  },
  removeModel ({ commit }, { date, item }) {
    commit('REMOVE_MODEL', { date, item })
  },
  removeDiscuss ({ commit }, { date, item }) {
    commit('REMOVE_DISCUSS', { date, item })
  },
  removeAct ({ commit }, { date, item }) {
    commit('REMOVE_ACT', { date, item })
  }
}

export const getters = {
  lamda: state => state.lamda
}
