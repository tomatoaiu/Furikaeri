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
  setGapAnalysis (state, { date, content }) {
    state.gapAnalysis[date] = content
  },
  setAsIs (state, { date, list }) {
    state.gapAnalysis[date].asis = list
  },
  setToBe (state, { date, list }) {
    state.gapAnalysis[date].tobe = list
  },
  setGap (state, { date, list }) {
    state.gapAnalysis[date].gap = list
  },
  removeAsIs (state, { date, item }) {
    state.gapAnalysis[date].asis.splice(state.gapAnalysis[date].asis.indexOf(item), 1)
  },
  removeToBe (state, { date, item }) {
    state.gapAnalysis[date].tobe.splice(state.gapAnalysis[date].tobe.indexOf(item), 1)
  },
  removeGap (state, { date, item }) {
    state.gapAnalysis[date].gap.splice(state.gapAnalysis[date].gap.indexOf(item), 1)
  }
}

export const getters = {
  gapAnalysis: state => state.gapAnalysis
}
