<script>
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
  methods: {
    hasDate (date) {
      if (this.furikaeri && date in this.furikaeri) {
        return true
      } else {
        return false
      }
    },
    getEachFurikaeriList (each) {
      if (this.hasDate(this.date) && this.furikaeri[this.date] && this.furikaeri[this.date][each]) {
        return this.furikaeri[this.date][each].filter(item => item != null) || []
      } else {
        return []
      }
    },
    setRegisterDates () {
      console.log(this.furikaeri)
      if (this.furikaeri) {
        this.registerDates = Object.keys(this.furikaeri)
      }
    }
  }
}
</script>
