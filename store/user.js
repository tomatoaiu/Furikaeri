import firebase from '~/plugins/firebase'
const db = firebase.database()
const userRef = db.ref('/user')
const provider = new firebase.auth.GoogleAuthProvider()

export const state = () => ({
  user: null
})

export const mutations = {
  SET_CREDENTAIL (state, { user }) {
    console.log(user)
    state.user = user
  }
}

export const actions = {
  callAuth () {
    firebase.auth().signInWithRedirect(provider)
  },
  async setCredential ({ commit }, { user }) {
    if (!user) return
    await userRef.child(user.email.replace('@', '_at_').replace(/\./g, '_dot_')).set({
      name: user.displayName,
      email: user.email,
      icon: user.photoURL
    })
    // commit('SET_CREDENTAIL', { user })
    console.log(user)
  }
}

export const getters = {
  user: state => state.user,
  isSignUp: state => !!state.user
}
