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
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      isLoaded: false,
      credential: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  async mounted () {
    if (this.user.name === '') {
      this.credential = await auth()
    }
    await this.setCredential({ user: this.credential || null })
    this.isLoaded = true
  },
  methods: {
    ...mapActions({
      setCredential: 'user/setCredential'
    })
  }
}
</script>


