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
  setBaseColor (state, payload) {
    state.color.base = payload.color
  }
}

export const getters = {
  baseColor: state => state.color.base,
  kptColor: state => state.color.kpt,
  ywtColor: state => state.color.ywt,
  fourLinesDiaryColor: state => state.color.fourLinesDiary,
  pdcaColor: state => state.color.pdca
}
