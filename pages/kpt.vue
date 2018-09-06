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
    'badge-board': BadgeBoard
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

