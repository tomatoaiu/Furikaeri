export const state = () => ({
  ywt: {
    '2018-05-10': {
      yattakoto: ['everyday commit to github'],
      wakattakoto: ['diet'],
      tsuginiyarukoto: ['work for 10 minutes']
    },
    '2018-05-11': {
      yattakoto: ['say hello'],
      wakattakoto: ['study'],
      tsuginiyarukoto: ['programming']
    }
  }
})

export const mutations = {
  setYwt (state, { date, content }) {
    state.ywt[date] = content
  },
  setYattakoto (state, { date, list }) {
    state.ywt[date].yattakoto = list
  },
  setWakattakoto (state, { date, list }) {
    state.ywt[date].wakattakoto = list
  },
  setTsuginiyarukoto (state, { date, list }) {
    state.ywt[date].tsuginiyarukoto = list
  },
  removeYattakoto (state, { date, item }) {
    state.ywt[date].yattakoto.splice(state.ywt[date].yattakoto.indexOf(item), 1)
  },
  removeWakattakoto (state, { date, item }) {
    state.ywt[date].wakattakoto.splice(state.ywt[date].wakattakoto.indexOf(item), 1)
  },
  removeTsuginiyarukoto (state, { date, item }) {
    state.ywt[date].tsuginiyarukoto.splice(state.ywt[date].tsuginiyarukoto.indexOf(item), 1)
  }
}

export const getters = {
  ywt: state => state.ywt
}
