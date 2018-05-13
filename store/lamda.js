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
  setLamda (state, { date, content }) {
    state.lamda[date] = content
  },
  setFact (state, { date, list }) {
    state.lamda[date].look = list
  },
  setAwareness (state, { date, list }) {
    state.lamda[date].ask = list
  },
  setLesson (state, { date, list }) {
    state.lamda[date].model = list
  },
  setDeclaration (state, { date, list }) {
    state.lamda[date].discuss = list
  },
  setAct (state, { date, list }) {
    state.lamda[date].act = list
  },
  removeFact (state, { date, item }) {
    state.lamda[date].look.splice(state.lamda[date].look.indexOf(item), 1)
  },
  removeAwareness (state, { date, item }) {
    state.lamda[date].ask.splice(state.lamda[date].ask.indexOf(item), 1)
  },
  removeLesson (state, { date, item }) {
    state.lamda[date].model.splice(state.lamda[date].model.indexOf(item), 1)
  },
  removeDeclaration (state, { date, item }) {
    state.lamda[date].discuss.splice(state.lamda[date].discuss.indexOf(item), 1)
  },
  removeAct (state, { date, item }) {
    state.lamda[date].act.splice(state.lamda[date].act.indexOf(item), 1)
  }
}

export const getters = {
  lamda: state => state.lamda
}
