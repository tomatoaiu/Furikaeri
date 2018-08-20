import firebase from '~/plugins/firebase'
const db = firebase.database()
const userRef = db.ref('/user')

export const state = () => ({
  kpt: {}
})

export const mutations = {
  SET_KPT (state, { kpt }) {
    state.kpt = kpt
  },
  ADD_KPT (state, { date, content }) {
    state.kpt[date] = content
  },
  SET_KPT_ITEM (state, { date, each, list }) {
    state.kpt[date][each] = list
  },
  REMOVE_KPT_ITEM (state, { date, each, index }) {
    state.kpt[date][each].splice(index)
  }
}

export const actions = {
  async setKpt ({ commit }, { user }) {
    userRef.child(`${user.id}/kpt`).once('value')
      .then((snapshot) => {
        const kpt = snapshot.val()
        console.log(kpt)
        commit('SET_KPT', { kpt })
      })
  },
  async addKpt ({ commit }, { user, date, content }) {
    await userRef.child(`${user.id}/kpt/${date}`).set({
      keep: content.keep,
      problem: content.problem,
      try: content.try
    })
    commit('ADD_KPT', { date, content })
  },
  async setKptItem ({ commit }, { user, date, each, list }) {
    await userRef.child(`${user.id}/kpt/${date}`).update({
      [`${each}`]: list
    })
    commit('SET_KPT_ITEM', { date, each, list })
  },
  async removeKptItem ({ commit }, { user, date, each, index }) {
    await userRef.child(`${user.id}/kpt/${date}`).update({
      [`${each}/${index}`]: null
    })
    commit('REMOVE_KPT_ITEM', { date, each, index })
  }
}

export const getters = {
  kpt: state => state.kpt,
  itemIndex: state => (each, date, item) => state.kpt[date][each].indexOf(item)
}
