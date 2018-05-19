<template>
  <div>
    <div v-if="isLoaded">
      <div>
        loaded
      </div>
    </div>
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
    if (!this.user) {
      this.credential = await auth()
    }
    await Promise.all([
      this.user ? Promise.resolve() : this.setCredential({ user: this.credential || null })
    ])
    this.isLoaded = true
  },
  methods: {
    ...mapActions({
      setCredential: 'user/setCredential'
    })
  }
}
</script>


