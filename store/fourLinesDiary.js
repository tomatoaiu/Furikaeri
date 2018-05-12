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
  setFourLinesDiary (state, { date, content }) {
    state.fourLinesDiary[date] = content
  },
  setFact (state, { date, list }) {
    state.fourLinesDiary[date].fact = list
  },
  setAwareness (state, { date, list }) {
    state.fourLinesDiary[date].awareness = list
  },
  setLesson (state, { date, list }) {
    state.fourLinesDiary[date].lesson = list
  },
  setDeclaration (state, { date, list }) {
    state.fourLinesDiary[date].declaration = list
  },
  removeFact (state, { date, item }) {
    state.fourLinesDiary[date].fact.splice(state.fourLinesDiary[date].keep.indexOf(item), 1)
  },
  removeAwareness (state, { date, item }) {
    state.fourLinesDiary[date].awareness.splice(state.fourLinesDiary[date].awareness.indexOf(item), 1)
  },
  removeLesson (state, { date, item }) {
    state.fourLinesDiary[date].lesson.splice(state.fourLinesDiary[date].lesson.indexOf(item), 1)
  },
  removeDeclaration (state, { date, item }) {
    state.fourLinesDiary[date].declaration.splice(state.fourLinesDiary[date].declaration.indexOf(item), 1)
  }
}

export const getters = {
  fourLinesDiary: state => state.fourLinesDiary
}
