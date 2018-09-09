import firebase from '~/plugins/firebase'
const db = firebase.database()
const userRef = db.ref('/user')

export const state = () => ({
  kpt: {},
  ywt: {},
  fourLinesDiary: {},
  lamda: {},
  experientialLearning: {},
  gapAnalysis: {},
  pdca: {}
})

export const mutations = {
  SET_FURIKAERI (state, { furikaeri, list }) {
    state[furikaeri] = list
  },
  ADD_FURIKAERI (state, { furikaeri, date, content }) {
    state[furikaeri][date] = content
  },
  SET_FURIKAERI_ITEM (state, { furikaeri, date, each, list }) {
    state[furikaeri][date][each] = list
  },
  REMOVE_FURIKAERI_ITEM (state, { furikaeri, date, each, index }) {
    state[furikaeri][date][each].splice(index, 1)
  }
}

export const actions = {
  async setFurikaeri ({ commit }, { furikaeri, user }) {
    userRef.child(`${user.id}/${furikaeri}`).once('value')
      .then((snapshot) => {
        const list = snapshot.val()
        console.log(list)
        commit('SET_FURIKAERI', { furikaeri, list })
      })
  },
  async addFurikaeri ({ commit }, { furikaeri, user, date, content }) {
    await userRef.child(`${user.id}/${furikaeri}/${date}`).set({
      keep: content.keep,
      problem: content.problem,
      try: content.try
    })
    commit('ADD_FURIKAERI', { furikaeri, date, content })
  },
  async setFurikaeriItem ({ commit }, { furikaeri, user, date, each, list }) {
    await userRef.child(`${user.id}/${furikaeri}/${date}`).update({
      [`${each}`]: list
    })
    commit('SET_FURIKAERI_ITEM', { furikaeri, date, each, list })
  },
  async removeFurikaeriItem ({ commit }, { furikaeri, user, date, each, index }) {
    await userRef.child(`${user.id}/${furikaeri}/${date}`).update({
      [`${each}/${index}`]: null
    })
    commit('REMOVE_FURIKAERI_ITEM', { furikaeri, date, each, index })
  }
}

export const getters = {
  kpt: state => state.kpt,
  ywt: state => state.ywt,
  fourLinesDiary: state => state.fourLinesDiary,
  lamda: state => state.lamda,
  experientialLearning: state => state.experientialLearning,
  gapAnalysis: state => state.gapAnalysis,
  pdca: state => state.pdca,
  itemIndex: state => (furikaeri, each, date, item) => state[furikaeri][date][each].indexOf(item)
}
