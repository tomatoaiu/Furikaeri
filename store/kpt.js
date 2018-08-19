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
  SET_KEEP (state, { date, list }) {
    state.kpt[date].keep = list
  },
  SET_PROBLEM (state, { date, list }) {
    state.kpt[date].problem = list
  },
  SET_TRY (state, { date, list }) {
    state.kpt[date].try = list
  },
  REMOVE_KEEP (state, { date, item }) {
    state.kpt[date].keep.splice(state.kpt[date].keep.indexOf(item), 1)
  },
  REMOVE_PROBLEM (state, { date, item }) {
    state.kpt[date].problem.splice(state.kpt[date].problem.indexOf(item), 1)
  },
  REMOVE_TRY (state, { date, item }) {
    state.kpt[date].try.splice(state.kpt[date].try.indexOf(item), 1)
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
  async setKeep ({ commit }, { user, date, list }) {
    await userRef.child(`${user.id}/kpt/${date}`).update({
      keep: list
    })
    commit('SET_KEEP', { date, list })
  },
  async setProblem ({ commit }, { user, date, list }) {
    await userRef.child(`${user.id}/kpt/${date}`).update({
      problem: list
    })
    commit('SET_PROBLEM', { date, list })
  },
  async setTry ({ commit }, { user, date, list }) {
    await userRef.child(`${user.id}/kpt/${date}`).update({
      try: list
    })
    commit('SET_TRY', { date, list })
  },
  async removeKeep ({ commit }, { user, date, item }) {
    console.log(state)
    console.log(state.kpt)
    console.log(state.kpt[date])
    console.log(state.kpt[date].keep.indexOf(item))
    // await userRef.child(`${user.id}/kpt/${date}`).update({
    //   keep: null
    // })
    // commit('REMOVE_KEEP', { user, date, item })
  },
  async removeProblem ({ commit }, { user, date, item }) {
    // await userRef.child(`${user.id}/kpt/${date}`).update({
    //   problem: null
    // })
    // commit('REMOVE_PROBLEM', { date, item })
  },
  async removeTry ({ commit }, { user, date, item }) {
    // await userRef.child(`${user.id}/kpt/${date}`).update({
    //   try: null
    // })
    // commit('REMOVE_TRY', { date, item })
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
