import firebase from '~/plugins/firebase'
const db = firebase.database()
const userRef = db.ref('/user')
const provider = new firebase.auth.GoogleAuthProvider()

export const state = () => ({
  user: {
    name: '',
    email: '',
    icon: ''
  }
})

export const mutations = {
  setUser (state, user) {
    state.user.name = user.displayName
    state.user.email = user.email
    state.user.icon = user.photoURL
    console.log('1.5', user, state)
  }
}

export const actions = {
  callAuth () {
    firebase.auth().signInWithRedirect(provider)
  },
  async setCredential ({ commit }, { user }) {
    console.log('1', user)
    if (!user) return
    await userRef.child(user.email.replace('@', '_at_').replace(/\./g, '_dot_')).set({
      name: user.displayName,
      email: user.email,
      icon: user.photoURL
    })
    commit('setUser', {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    })
    console.log('2', user)
  }
}

export const getters = {
  user: state => state.user,
  isSignUp: state => !!state.user
}
