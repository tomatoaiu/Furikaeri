import firebase from '~/plugins/firebase'
import { firebaseMutations } from 'vuexfire'
const provider = new firebase.auth.GoogleAuthProvider()

export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, { user }) {
    state.user = user
  },
  ...firebaseMutations
}

export const actions = {
  callAuth () {
    firebase.auth().signInWithRedirect(provider)
  }
}

export const getters = {
  user: state => state.user,
  isSignUp: (state) => {
    if (state.user) {
      return true
    } else {
      return false
    }
  }
}
