<script>
import auth from '~/plugins/auth'

export default {
  data () {
    return {
      date: undefined,
      registerDates: undefined
    }
  },
  watch: {
    furikaeri: {
      deep: true,
      handler () {
        this.setRegisterDates()
      }
    },
    date () {
      this.setRegisterDates()
    }
  },
  async mounted () {
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    if (this.isSignUp) {
      this.setFurikaeri({ user: this.user })
    } else {
      const user = await auth()
      await this.setCredential({ user: user || null })
      this.setFurikaeri({ user: this.user })
    }
  },
  methods: {
    hasDate (date) {
      if (this.furikaeri && date in this.furikaeri) {
        return true
      } else {
        return false
      }
    },
    async setEachFurikaeriList ({ each, list }) {
      if (!this.hasDate(this.date)) {
        await this.setNewFurikaeri()
      }
      this.setFurikaeriItem({ user: this.user, date: this.date, each, list })
    },
    getEachFurikaeriList (each) {
      if (this.hasDate(this.date) && this.furikaeri[this.date] && this.furikaeri[this.date][each]) {
        return this.furikaeri[this.date][each].filter(item => item != null) || []
      } else {
        return []
      }
    },
    removeEachFurikaeri ({ each, item }) {
      const index = this.itemIndex(each, this.date, item)
      this.removeFurikaeriItem({ user: this.user, date: this.date, each, index })
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.furikaeri)
    }
  }
}
</script>
