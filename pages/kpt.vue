<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm5>
        <v-menu
          ref="menu"
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
          :return-value.sync="date"
          :color="baseColor"
        >
          <v-text-field
            :color="baseColor"
            slot="activator"
            label="Picker in menu"
            v-model="date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="date"
            no-title scrollable
            :color="baseColor"
            event-color="green"
            :events="registerDates">
            <v-spacer></v-spacer>
            <v-btn flat :color="baseColor" @click="menu = false">Cancel</v-btn>
            <v-btn flat :color="baseColor" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-spacer />
      <v-flex xs3 sm3>
        <v-btn flat icon :color="baseColor"
         @click="toNextWeek">
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
        <v-btn flat icon :color="baseColor"
         @click="toLastWeek">
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
        <v-btn flat icon :color="baseColor"
         @click="toYesterday">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn flat icon :color="baseColor"
          @click="toTomorrow">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <badge-board
        :word="text.keep"
        :color="kptColor.keep"
        :avatarColor="kptColor.keepAvatar"
        :model="keep"
        @remove="removeEachKpt"
        @set="setEachKpt">
      </badge-board>
      <badge-board
        :word="text.problem"
        :color="kptColor.problem"
        :avatarColor="kptColor.problemAvatar"
        :model="problem"
        @remove="removeEachKpt"
        @set="setEachKpt">
      </badge-board>
      <badge-board
        :word="text.try"
        :color="kptColor.try"
        :avatarColor="kptColor.tryAvatar"
        :model="_try"
        @remove="removeEachKpt"
        @set="setEachKpt">
      </badge-board>
    </v-layout>
  </div>
</template>

<script>
import FurikaeriDate from '~/mixins/FurikaeriDate'
import BadgeBoard from '~/components/BadgeBoard.vue'
import { mapGetters, mapActions } from 'vuex'
import auth from '~/plugins/auth'

const KEEP = 'keep'
const PROBLEM = 'problem'
const TRY = 'try'

export default {
  mixins: [ FurikaeriDate ],
  components: {
    'badge-board': BadgeBoard
  },
  data () {
    return {
      menu: false,
      date: undefined,
      registerDates: undefined,
      text: {
        keep: KEEP,
        problem: PROBLEM,
        try: TRY
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isSignUp: 'user/isSignUp',
      baseColor: 'color/base',
      kptColor: 'color/kpt',
      kpt: 'kpt/kpt',
      itemIndex: 'kpt/itemIndex'
    }),
    keep () {
      return this.getEachKpt(KEEP)
    },
    problem () {
      return this.getEachKpt(PROBLEM)
    },
    _try () {
      return this.getEachKpt(TRY)
    }
  },
  watch: {
    kpt: {
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
      this.setKpt({ user: this.user })
    } else {
      const user = await auth()
      await this.setCredential({ user: user || null })
      this.setKpt({ user: this.user })
    }
  },
  methods: {
    ...mapActions({
      addKpt: 'kpt/addKpt',
      setKpt: 'kpt/setKpt',
      setKptItem: 'kpt/setKptItem',
      removeKptItem: 'kpt/removeKptItem',
      setCredential: 'user/setCredential'
    }),
    hasDate (date) {
      if (this.kpt && date in this.kpt) {
        return true
      } else {
        return false
      }
    },
    async setEachKpt ({ each, list }) {
      if (!this.hasDate(this.date)) {
        await this.setNewKpt()
      }
      this.setKptItem({ user: this.user, date: this.date, each, list })
    },
    getEachKpt (kptWord) {
      if (this.hasDate(this.date) && this.kpt[this.date] && this.kpt[this.date][kptWord]) {
        return this.kpt[this.date][kptWord].filter(item => item != null) || []
      } else {
        return []
      }
    },
    removeEachKpt ({ each, item }) {
      const index = this.itemIndex(each, this.date, item)
      this.removeKptItem({ user: this.user, date: this.date, each, index })
    },
    async setNewKpt () {
      await this.addKpt({
        user: this.user,
        date: this.date,
        content: { [`${KEEP}`]: [], [`${PROBLEM}`]: [], [`${TRY}`]: [] }
      })
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.kpt)
    }
  }
}
</script>

