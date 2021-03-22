import firebase from '~/plugins/firebase'
const db = firebase.database()
const userRef = db.ref('/user')
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()
const storageRef = storage.ref()

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
  },
  setUrl (state, url) {
    state.user.icon = url
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
  },
  async findListStorage (childName) {
    const listRef = storageRef.child(childName)
    return listRef.listAll()
  },
  attachImage ({ commit }, { inputFile, id }) {
    const bucket = 'icons/'
    const file = inputFile
    if (!file || !bucket) {
      return
    }
    const uploadTask = storageRef.child(`${bucket}${file.name}`).put(file)
    uploadTask.on('state_changed',
      (snapshot) => {
        // 成功時の処理
        console.log('uploadに成功しました')
      },
      (error) => {
        // エラー
        console.log('err', error)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          // ファイルアップロードして使えるようになったときの処理
          await userRef.child(id).update({
            icon: downloadURL
          })
          commit('setUrl', downloadURL)
        })
      }
    )
  },
  findStorage (childName) {
    const downRef = storageRef.child(childName)
    downRef.getDownloadURL()
      .then((url) => {
        return url
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export const getters = {
  user: state => state.user,
  isSignUp: state => (state.user.id !== '' || state.user.name !== '')
}
