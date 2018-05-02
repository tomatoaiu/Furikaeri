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
  setKpt (state, { date, content }) {
    state.kpt[date] = content
  },
  setKeep (state, { date, list }) {
    state.kpt[date].keep = list
  },
  setProblem (state, { date, list }) {
    state.kpt[date].problem = list
  },
  setTry (state, { date, list }) {
    state.kpt[date].try = list
  },
  removeKeep (state, { date, item }) {
    state.kpt[date].keep.splice(state.kpt[date].keep.indexOf(item), 1)
  },
  removeProblem (state, { date, item }) {
    state.kpt[date].problem.splice(state.kpt[date].problem.indexOf(item), 1)
  },
  removeTry (state, { date, item }) {
    state.kpt[date].try.splice(state.kpt[date].try.indexOf(item), 1)
  }
}

export const getters = {
  kpt: state => state.kpt
}
