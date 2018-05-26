export const state = () => ({
  fourLinesDiary: {
    '2018-05-01': {
      fact: ['everyday commit to github'],
      awareness: ['diet'],
      lesson: ['work for 10 minutes'],
      declaration: ['work for 10 minutes']
    },
    '2018-05-03': {
      fact: ['factda'],
      awareness: ['awarenessda'],
      lesson: ['lessonwosuruzo'],
      declaration: ['declarationsimasita']
    }
  }
})

export const mutations = {
  SET_FOUR_LINES_DIARY (state, { date, content }) {
    state.fourLinesDiary[date] = content
  },
  SET_FACT (state, { date, list }) {
    state.fourLinesDiary[date].fact = list
  },
  SET_AWARENESS (state, { date, list }) {
    state.fourLinesDiary[date].awareness = list
  },
  SET_LESSON (state, { date, list }) {
    state.fourLinesDiary[date].lesson = list
  },
  SET_DECLARATION (state, { date, list }) {
    state.fourLinesDiary[date].declaration = list
  },
  REMOVE_FACT (state, { date, item }) {
    state.fourLinesDiary[date].fact.splice(state.fourLinesDiary[date].fact.indexOf(item), 1)
  },
  REMOVE_AWARENESS (state, { date, item }) {
    state.fourLinesDiary[date].awareness.splice(state.fourLinesDiary[date].awareness.indexOf(item), 1)
  },
  REMOVE_LESSON (state, { date, item }) {
    state.fourLinesDiary[date].lesson.splice(state.fourLinesDiary[date].lesson.indexOf(item), 1)
  },
  REMOVE_DECLARATION (state, { date, item }) {
    state.fourLinesDiary[date].declaration.splice(state.fourLinesDiary[date].declaration.indexOf(item), 1)
  }
}

export const actions = {
  setFourLinesDiary ({ commit }, { date, content }) {
    commit('SET_FOUR_LINES_DIARY', { date, content })
  },
  setFact ({ commit }, { date, list }) {
    commit('SET_FACT', { date, list })
  },
  setAwareness ({ commit }, { date, list }) {
    commit('SET_AWARENESS', { date, list })
  },
  setLesson ({ commit }, { date, list }) {
    commit('SET_LESSON', { date, list })
  },
  setDeclaration ({ commit }, { date, list }) {
    commit('SET_DECLARATION', { date, list })
  },
  removeFact ({ commit }, { date, item }) {
    commit('REMOVE_FACT', { date, item })
  },
  removeAwareness ({ commit }, { date, item }) {
    commit('REMOVE_AWARENESS', { date, item })
  },
  removeLesson ({ commit }, { date, item }) {
    commit('REMOVE_LESSON', { date, item })
  },
  removeDeclaration ({ commit }, { date, item }) {
    commit('REMOVE_DECLARATION', { date, item })
  }
}

export const getters = {
  fourLinesDiary: state => state.fourLinesDiary
}
