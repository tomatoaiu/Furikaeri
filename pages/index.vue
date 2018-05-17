<template>
  <div>
    <div v-if="isLoaded">loaded
      <br />{{ credential.displayName }}
      <br />{{ credential.email }}
      <br /><img :src="credential.photoURL" /></div>
    <div v-else>loading</div>
  </div>
</template>

<script>
import auth from '~/plugins/auth'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      isLoaded: false,
      credential: null
    }
  },
  async mounted () {
    if (process.browser) {
      if (!this.user) {
        this.credential = await auth()
        console.log(this.credential)
      }
      await Promise.all([
        this.user ? Promise.resolve() : this.setCredential({ user: this.credential || null })
      ])
      this.isLoaded = true
    }
  },
  methods: {
    ...mapActions({
      setCredential: 'user/setCredential'
    })
  }
}
</script>


