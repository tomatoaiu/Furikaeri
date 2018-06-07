export const state = () => ({
  experientialLearning: {}
})

export const mutations = {
  SET_EXPERIENTAIL_LEARNING (state, { experientialLearning }) {
    state.experientialLearning = experientialLearning
  },
  ADD_EXPERIENTAIL_LEARNING (state, { date, content }) {
    state.experientialLearning[date] = content
  },
  SET_CONCREATE_EXPERIENCE (state, { date, list }) {
    state.experientialLearning[date].concreateExperience = list
  },
  SET_REFLECTIVE_OBSERVATION (state, { date, list }) {
    state.experientialLearning[date].reflectiveObservation = list
  },
  SET_ABSTRACT_CONCEPTUALIZATION (state, { date, list }) {
    state.experientialLearning[date].abstractConceptualization = list
  },
  SET_ACTIVE_EXPERIMENTATION (state, { date, list }) {
    state.experientialLearning[date].activeExperimentation = list
  },
  REMOVE_CONCREATE_EXPERIENCE (state, { date, item }) {
    state.experientialLearning[date].concreateExperience.splice(state.experientialLearning[date].concreateExperience.indexOf(item), 1)
  },
  REMOVE_REFLACTIVE_OBSERVATION (state, { date, item }) {
    state.experientialLearning[date].reflectiveObservation.splice(state.experientialLearning[date].reflectiveObservation.indexOf(item), 1)
  },
  REMOVE_ABSTRACT_CONCEPTUALIZATION (state, { date, item }) {
    state.experientialLearning[date].abstractConceptualization.splice(state.experientialLearning[date].abstractConceptualization.indexOf(item), 1)
  },
  REMOVE_ACTIVE_EXPERIMENTATION (state, { date, item }) {
    state.experientialLearning[date].activeExperimentation.splice(state.experientialLearning[date].activeExperimentation.indexOf(item), 1)
  }
}

export const actions = {
  setExperientialLearning ({ commit }, experientialLearning) {
    commit('SET_EXPERIENTAIL_LEARNING', { experientialLearning })
  },
  addExperientialLearning ({ commit }, { date, content }) {
    commit('SET_EXPERIENTAIL_LEARNING', { date, content })
  },
  setConcreateExperience ({ commit }, { date, list }) {
    commit('SET_CONCREATE_EXPERIENCE', { date, list })
  },
  setReflectiveObservation ({ commit }, { date, list }) {
    commit('SET_REFLECTIVE_OBSERVATION', { date, list })
  },
  setAbstractConceptualization ({ commit }, { date, list }) {
    commit('SET_ABSTRACT_CONCEPTUALIZATION', { date, list })
  },
  setActiveExperimentation ({ commit }, { date, list }) {
    commit('SET_ACTIVE_EXPERIMENTATION', { date, list })
  },
  removeConcreateExperience ({ commit }, { date, item }) {
    commit('REMOVE_CONCREATE_EXPERIENCE', { date, item })
  },
  removeReflectiveObservation ({ commit }, { date, item }) {
    commit('REMOVE_REFLACTIVE_OBSERVATION', { date, item })
  },
  removeAbstractConceptualization ({ commit }, { date, item }) {
    commit('REMOVE_ABSTRACT_CONCEPTUALIZATION', { date, item })
  },
  removeActiveExperimentation ({ commit }, { date, item }) {
    commit('REMOVE_ACTIVE_EXPERIMENTATION', { date, item })
  }
}

export const getters = {
  experientialLearning: state => state.experientialLearning
}
