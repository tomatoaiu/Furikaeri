export const state = () => ({
  color: {
    base: 'light-blue'
  }
})

export const mutations = {
  setBaseColor (state, payload) {
    state.color.base = payload.color
  }
}

export const getters = {
  baseColor: state => state.color.base
}
