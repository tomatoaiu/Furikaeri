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
        :word="text.keep"
        :color="furikaeriColor.keep"
        :avatarColor="furikaeriColor.keepAvatar"
        :model="keep"
        @remove="removeEachFurikaeri"
        @set="setEachFurikaeriList">
      </badge-board>
      <badge-board
        :word="text.problem"
        :color="furikaeriColor.problem"
        :avatarColor="furikaeriColor.problemAvatar"
        :model="problem"
        @remove="removeEachFurikaeri"
        @set="setEachFurikaeriList">
      </badge-board>
      <badge-board
        :word="text.try"
        :color="furikaeriColor.try"
        :avatarColor="furikaeriColor.tryAvatar"
        :model="_try"
        @remove="removeEachFurikaeri"
        @set="setEachFurikaeriList">
      </badge-board>
    </v-layout>
  </div>
</template>

<script>
import FurikaeriDate from '~/mixins/FurikaeriDate'
import Furikaeri from '~/mixins/Furikaeri.vue'
import BadgeBoard from '~/components/BadgeBoard.vue'
import FurikaeriHeader from '~/components/FurikaeriHeader.vue'
import { mapGetters, mapActions } from 'vuex'

const FURIKAERI = 'kpt'
const KEEP = 'keep'
const PROBLEM = 'problem'
const TRY = 'try'

export default {
  mixins: [ FurikaeriDate, Furikaeri ],
  data () {
    return {
      menu: false,
      date: undefined,
      registerDates: undefined,
      text: {
        keep: KEEP,
        problem: PROBLEM,
        try: TRY
      },
      name: FURIKAERI
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
      furikaeri: `${FURIKAERI}/${FURIKAERI}`,
      itemIndex: `${FURIKAERI}/itemIndex`
    }),
    keep () {
      return this.getEachFurikaeriList(KEEP)
    },
    problem () {
      return this.getEachFurikaeriList(PROBLEM)
    },
    _try () {
      return this.getEachFurikaeriList(TRY)
    }
  },
  methods: {
    ...mapActions({
      addFurikaeri: `${FURIKAERI}/add${FURIKAERI.charAt(0).toUpperCase()}${FURIKAERI.slice(1)}`,
      setFurikaeri: `${FURIKAERI}/set${FURIKAERI.charAt(0).toUpperCase()}${FURIKAERI.slice(1)}`,
      setFurikaeriItem: `${FURIKAERI}/set${FURIKAERI.charAt(0).toUpperCase()}${FURIKAERI.slice(1)}Item`,
      removeFurikaeriItem: `${FURIKAERI}/remove${FURIKAERI.charAt(0).toUpperCase()}${FURIKAERI.slice(1)}Item`,
      setCredential: 'user/setCredential'
    }),
    async setNewFurikaeri () {
      await this.addFurikaeri({
        user: this.user,
        date: this.date,
        content: { [`${KEEP}`]: [], [`${PROBLEM}`]: [], [`${TRY}`]: [] }
      })
    }
  }
}
</script>

