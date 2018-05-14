export const state = () => ({
  experientialLearning: {
    '2018-05-01': {
      concreateExperience: ['everyday commit to github'],
      reflectiveObservation: ['diet'],
      abstractConceptualization: ['work for 10 minutes'],
      activeExperimentation: ['work for 10 minutes']
    },
    '2018-05-03': {
      concreateExperience: ['concreateExperienceda'],
      reflectiveObservation: ['reflectiveObservationda'],
      abstractConceptualization: ['abstractConceptualizationwosuruzo'],
      activeExperimentation: ['activeExperimentationsimasita']
    }
  }
})

export const mutations = {
  setExperientialLearning (state, { date, content }) {
    state.experientialLearning[date] = content
  },
  setConcreateExperience (state, { date, list }) {
    state.experientialLearning[date].concreateExperience = list
  },
  setReflectiveObservation (state, { date, list }) {
    state.experientialLearning[date].reflectiveObservation = list
  },
  setAbstractConceptualization (state, { date, list }) {
    state.experientialLearning[date].abstractConceptualization = list
  },
  setActiveExperimentation (state, { date, list }) {
    state.experientialLearning[date].activeExperimentation = list
  },
  removeConcreateExperience (state, { date, item }) {
    state.experientialLearning[date].concreateExperience.splice(state.experientialLearning[date].concreateExperience.indexOf(item), 1)
  },
  removeReflectiveObservation (state, { date, item }) {
    state.experientialLearning[date].reflectiveObservation.splice(state.experientialLearning[date].reflectiveObservation.indexOf(item), 1)
  },
  removeAbstractConceptualization (state, { date, item }) {
    state.experientialLearning[date].abstractConceptualization.splice(state.experientialLearning[date].abstractConceptualization.indexOf(item), 1)
  },
  removeActiveExperimentation (state, { date, item }) {
    state.experientialLearning[date].activeExperimentation.splice(state.experientialLearning[date].activeExperimentation.indexOf(item), 1)
  }
}

export const getters = {
  experientialLearning: state => state.experientialLearning
}
