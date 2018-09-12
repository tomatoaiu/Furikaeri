import Vue from 'vue'
import firebase from '~/plugins/firebase'
const db = firebase.database()
const userRef = db.ref('/user')

export const state = () => ({
  kpt: {}, // keep: {}, problem: {}, try: {}
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
    Vue.set(state[furikaeri], date, content)
  },
  SET_FURIKAERI_ITEM (state, { furikaeri, date, each, id, item }) {
    Vue.set(state[furikaeri][date][each], `${id}`, item)
  },
  REMOVE_FURIKAERI_ITEM (state, { furikaeri, date, each, index }) {
    Vue.delete(state[furikaeri][date][each], index)
  }
}

export const actions = {
  async setFurikaeri ({ commit }, { furikaeri, user }) {
    userRef.child(`${user.id}/${furikaeri}`).once('value')
      .then((snapshot) => {
        const list = snapshot.val()
        if (list) {
          commit('SET_FURIKAERI', { furikaeri, list })
        }
      })
  },
  async addFurikaeri ({ commit }, { furikaeri, user, date, content }) {
    await userRef.child(`${user.id}/${furikaeri}/${date}`).set({
      keep: {},
      problem: {},
      try: {}
    })
    commit('ADD_FURIKAERI', { furikaeri, date, content })
  },
  async setFurikaeriItem ({ commit }, { furikaeri, user, date, each, item }) {
    await userRef.child(`${user.id}/${furikaeri}/${date}/${each}`).push(item)
    userRef.child(`${user.id}/${furikaeri}/${date}/${each}`).once('value')
      .then((snapshot) => {
        const list = snapshot.val()
        const index = Object.keys(list).length - 1
        const lastKey = Object.keys(list)[index]
        commit('SET_FURIKAERI_ITEM', { furikaeri, date, each, id: lastKey, item })
      })
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
  itemIndex: state => (furikaeri, each, date, item) => {
    return Object.keys(state[furikaeri][date][each]).find(key => state[furikaeri][date][each][key] === item)
  }
}
