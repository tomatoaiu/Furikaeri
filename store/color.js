export const state = () => ({
  color: {
    base: 'light-blue',
    kpt: {
      keep: 'light-green',
      keepAvatar: 'green',
      problem: 'red darken-1',
      problemAvatar: 'red darken-4',
      try: 'orange',
      tryAvatar: 'deep-orange'
    },
    ywt: {
      yattakoto: 'light-green',
      yattakotoAvatar: 'green',
      wakattakoto: 'red darken-1',
      wakattakotoAvatar: 'red darken-4',
      tsuginiyarukoto: 'orange',
      tsuginiyarukotoAvatar: 'deep-orange'
    },
    fourLinesDiary: {
      fact: 'light-green',
      factAvatar: 'green',
      awareness: 'red darken-1',
      awarenessAvatar: 'red darken-4',
      lesson: 'orange',
      lessonAvatar: 'deep-orange',
      declaration: 'blue',
      declarationAvatar: 'blue darken-4'
    },
    lamda: {
      look: 'light-green',
      lookAvatar: 'green',
      ask: 'red darken-1',
      askAvatar: 'red darken-4',
      model: 'orange',
      modelAvatar: 'deep-orange',
      discuss: 'blue',
      discussAvatar: 'blue darken-4',
      act: 'purple lighten-4',
      actAvatar: 'purple lighten-1'
    },
    experientialLearning: {
      concreateExperience: 'light-green',
      concreateExperienceAvatar: 'green',
      reflectiveObservation: 'red darken-1',
      reflectiveObservationAvatar: 'red darken-4',
      abstractConceptualization: 'orange',
      abstractConceptualizationAvatar: 'deep-orange',
      activeExperimentation: 'blue',
      activeExperimentationAvatar: 'blue darken-4'
    },
    gapAnalysis: {
      asis: 'light-green',
      asisAvatar: 'green',
      tobe: 'red darken-1',
      tobeAvatar: 'red darken-4',
      gap: 'orange',
      gapAvatar: 'deep-orange'
    },
    pdca: {
      plan: 'light-green',
      planAvatar: 'green',
      do: 'red darken-1',
      doAvatar: 'red darken-4',
      check: 'orange',
      checkAvatar: 'deep-orange',
      action: 'blue',
      actionAvatar: 'blue darken-4'
    }
  }
})

export const mutations = {
  SET_BASE_COLOR (state, { color }) {
    state.color.base = color
  }
}

export const actions = {
  setBaseColor ({ commit }, { color }) {
    commit('SET_BASE_COLOR', { color })
  }
}

export const getters = {
  baseColor: state => state.color.base,
  kpt: state => state.color.kpt,
  ywt: state => state.color.ywt,
  fourLinesDiary: state => state.color.fourLinesDiary,
  lamdaColor: state => state.color.lamda,
  experientialLearningColor: state => state.color.experientialLearning,
  gapAnalysisColor: state => state.color.gapAnalysis,
  pdcaColor: state => state.color.pdca
}
