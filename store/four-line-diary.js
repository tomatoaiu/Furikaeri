export const state = () => ({
  diary: {
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
  setFourLineDiary (state, { date, content }) {
    state.diary[date] = content
  },
  setFact (state, { date, list }) {
    state.diary[date].fact = list
  },
  setAwareness (state, { date, list }) {
    state.diary[date].awareness = list
  },
  setLesson (state, { date, list }) {
    state.diary[date].lesson = list
  },
  setDeclaration (state, { date, list }) {
    state.diary[date].declaration = list
  },
  removeFact (state, { date, item }) {
    state.diary[date].fact.splice(state.diary[date].keep.indexOf(item), 1)
  },
  removeAwareness (state, { date, item }) {
    state.diary[date].awareness.splice(state.diary[date].awareness.indexOf(item), 1)
  },
  removeLesson (state, { date, item }) {
    state.diary[date].lesson.splice(state.diary[date].lesson.indexOf(item), 1)
  },
  removeDeclaration (state, { date, item }) {
    state.diary[date].declaration.splice(state.diary[date].declaration.indexOf(item), 1)
  }
}

export const getters = {
  fourLinesDiary: state => state.diary
}
