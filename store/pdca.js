export const state = () => ({
  pdca: {
    '2018-05-01': {
      plan: ['everyday commit to github'],
      do: ['diet'],
      check: ['work for 10 minutes'],
      action: ['work for 10 minutes']
    },
    '2018-05-03': {
      plan: ['planda'],
      do: ['doda'],
      check: ['checkwosuruzo'],
      action: ['actionsimasita']
    }
  }
})

export const mutations = {
  setPdca (state, { date, content }) {
    state.pdca[date] = content
  },
  setPlan (state, { date, list }) {
    state.pdca[date].plan = list
  },
  setDo (state, { date, list }) {
    state.pdca[date].do = list
  },
  setCheck (state, { date, list }) {
    state.pdca[date].check = list
  },
  setAction (state, { date, list }) {
    state.pdca[date].action = list
  },
  removePlan (state, { date, item }) {
    state.pdca[date].plan.splice(state.pdca[date].plan.indexOf(item), 1)
  },
  removeDo (state, { date, item }) {
    state.pdca[date].do.splice(state.pdca[date].do.indexOf(item), 1)
  },
  removeCheck (state, { date, item }) {
    state.pdca[date].check.splice(state.pdca[date].check.indexOf(item), 1)
  },
  removeAction (state, { date, item }) {
    state.pdca[date].action.splice(state.pdca[date].action.indexOf(item), 1)
  }
}

export const getters = {
  pdca: state => state.pdca
}
