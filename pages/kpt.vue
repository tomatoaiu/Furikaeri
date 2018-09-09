<template>
  <div>
    <furikaeri-header
      :date="date"
      :menu="menu"
      :color="baseColor"
      :registerDates="registerDates"
      @toNextWeek="toNextWeek"
      @toLastWeek="toLastWeek"
      @toYesterday="toYesterday"
      @toTomorrow="toTomorrow">
    </furikaeri-header>
    <v-layout row wrap>
      <badge-board
        v-for="(w, i) in word" :key="i"
        :word="w"
        :color="furikaeriColor[w]"
        :avatarColor="furikaeriColor[`${w}Avatar`]"
        :model="date in furikaeri && w in furikaeri[date] ? furikaeri[date][w] : []"
        @remove="removeEachFurikaeri"
        @set="setEachFurikaeriList">
      </badge-board>
    </v-layout>
  </div>
</template>

<script>
import auth from '~/plugins/auth'
import FurikaeriDate from '~/mixins/FurikaeriDate'
import Furikaeri from '~/mixins/Furikaeri.vue'
import BadgeBoard from '~/components/BadgeBoard.vue'
import FurikaeriHeader from '~/components/FurikaeriHeader.vue'
import { mapGetters, mapActions } from 'vuex'

const FURIKAERI = 'kpt'
const WORD = ['keep', 'problem', 'try']

export default {
  mixins: [ FurikaeriDate, Furikaeri ],
  data () {
    return {
      menu: false,
      date: undefined,
      registerDates: undefined,
      word: WORD
    }
  },
  components: {
    'badge-board': BadgeBoard,
    'furikaeri-header': FurikaeriHeader
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isSignUp: 'user/isSignUp',
      baseColor: 'color/base',
      furikaeriColor: `color/${FURIKAERI}`,
      furikaeri: `furikaeri/${FURIKAERI}`,
      itemIndex: `furikaeri/itemIndex`
    })
  },
  async mounted () {
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    if (this.isSignUp) {
      this.setFurikaeri({ furikaeri: FURIKAERI, user: this.user })
    } else {
      const user = await auth()
      await this.setCredential({ user: user || null })
      this.setFurikaeri({ furikaeri: FURIKAERI, user: this.user })
    }
  },
  methods: {
    ...mapActions({
      addFurikaeri: 'furikaeri/addFurikaeri',
      setFurikaeri: 'furikaeri/setFurikaeri',
      setFurikaeriItem: 'furikaeri/setFurikaeriItem',
      removeFurikaeriItem: 'furikaeri/removeFurikaeriItem',
      setCredential: 'user/setCredential'
    }),
    async setEachFurikaeriList ({ each, list }) {
      if (!this.hasDate(this.date)) {
        await this.setNewFurikaeri()
      }
      this.setFurikaeriItem({ furikaeri: FURIKAERI, user: this.user, date: this.date, each, list })
    },
    removeEachFurikaeri ({ each, item }) {
      const index = this.itemIndex(FURIKAERI, each, this.date, item)
      this.removeFurikaeriItem({ furikaeri: FURIKAERI, user: this.user, date: this.date, each, index })
    },
    async setNewFurikaeri () {
      let content = {}
      for (const w of this.word) {
        content[w] = []
      }
      await this.addFurikaeri({ furikaeri: FURIKAERI, user: this.user, date: this.date, content })
    }
  }
}
</script>
