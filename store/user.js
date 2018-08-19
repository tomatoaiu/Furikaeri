import firebase from '~/plugins/firebase'
const db = firebase.database()
const userRef = db.ref('/user')
const provider = new firebase.auth.GoogleAuthProvider()

export const state = () => ({
  user: {
    id: '',
    name: '',
    email: '',
    icon: ''
  }
})

export const mutations = {
  setUser (state, user) {
    state.user.id = user.id
    state.user.name = user.displayName
    state.user.email = user.email
    state.user.icon = user.photoURL
  }
}

export const actions = {
  callAuth () {
    firebase.auth().signInWithRedirect(provider)
  },
  async setCredential ({ commit }, { user }) {
    if (!user) return
    await userRef.child(user.uid).update({
      name: user.displayName,
      email: user.email,
      icon: user.photoURL
    })
    commit('setUser', {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    })
  }
}

export const getters = {
  user: state => state.user,
  isSignUp: state => (state.user.id !== '' || state.user.name !== '')
}
