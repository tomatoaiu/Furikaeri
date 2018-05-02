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
  kptColor: state => state.color.kpt
}
