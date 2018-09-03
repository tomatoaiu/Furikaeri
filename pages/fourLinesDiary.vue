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
            reaawarenessnly
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
      <v-flex xs12>
        <p class="display-2">FACT</p>
        <v-select
          label="FACT"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="fourLinesDiaryFact"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeFact({ date, item: data.item })"
              :selected="data.selected"
              :color="fourLinesDiaryColor.fact"
              text-color="white"
            >
              <v-avatar :color="fourLinesDiaryColor.factAvatar">F</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12>
        <p class="display-2">AWARENESS</p>
        <v-select
          label="AWARENESS"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="fourLinesDiaryAwareness"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeAwareness({ date, item: data.item })"
              :selected="data.selected"
              :color="fourLinesDiaryColor.awareness"
              text-color="white"
            >
              <v-avatar :color="fourLinesDiaryColor.awarenessAvatar">A</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12>
        <p class="display-2">LESSON</p>
        <v-select
          label="LESSON"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="fourLinesDiaryLesson"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeLesson({ date, item: data.item })"
              :selected="data.selected"
              :color="fourLinesDiaryColor.lesson"
              text-color="white"
            >
              <v-avatar :color="fourLinesDiaryColor.lessonAvatar">L</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12>
        <p class="display-2">DECLARATION</p>
        <v-select
          label="DECLARATION"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="fourLinesDiaryDeclaration"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeDeclaration({ date, item: data.item })"
              :selected="data.selected"
              :color="fourLinesDiaryColor.declaration"
              text-color="white"
            >
              <v-avatar :color="fourLinesDiaryColor.declarationAvatar">D</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import FurikaeriDate from '~/mixins/FurikaeriDate'
import FurikaeriLocalStorage from '~/mixins/FurikaeriLocalStorage'
import { mapGetters, mapActions } from 'vuex'

export default {
  mixins: [ FurikaeriDate, FurikaeriLocalStorage ],
  data () {
    return {
      menu: false,
      date: undefined,
      registerDates: undefined
    }
  },
  computed: {
    ...mapGetters({
      baseColor: 'color/base',
      fourLinesDiaryColor: 'color/fourLinesDiary',
      fourLinesDiary: 'fourLinesDiary/fourLinesDiary'
    }),
    fourLinesDiaryFact: {
      get () {
        return this.getEachFourLinesDiary('fact')
      },
      set (list) {
        this.setFact({ date: this.date, list })
      }
    },
    fourLinesDiaryAwareness: {
      get () {
        return this.getEachFourLinesDiary('awareness')
      },
      set (list) {
        this.setAwareness({ date: this.date, list })
      }
    },
    fourLinesDiaryLesson: {
      get () {
        return this.getEachFourLinesDiary('lesson')
      },
      set (list) {
        this.setLesson({ date: this.date, list })
      }
    },
    fourLinesDiaryDeclaration: {
      get () {
        return this.getEachFourLinesDiary('declaration')
      },
      set (list) {
        this.setDeclaration({ date: this.date, list })
      }
    }
  },
  watch: {
    date (next, prev) {
      if (!this.hasDate(next)) {
        this.setNewFourLinesDiary(next)
      }
    }
  },
  mounted () {
    this.initFurikaeriLocalStorage()
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    if (!this.hasDate(this.date)) {
      this.setNewFourLinesDiary(this.date)
    }
    this.setRegisterDates()
  },
  methods: {
    ...mapActions({
      addFourLinesDiary: 'fourLinesDiary/addFourLinesDiary',
      setFact: 'fourLinesDiary/setFact',
      setAwareness: 'fourLinesDiary/setAwareness',
      setLesson: 'fourLinesDiary/setLesson',
      setDeclaration: 'fourLinesDiary/setDeclaration',
      removeFact: 'fourLinesDiary/removeFact',
      removeAwareness: 'fourLinesDiary/removeAwareness',
      removeLesson: 'fourLinesDiary/removeLesson',
      removeDeclaration: 'fourLinesDiary/removeDeclaration'
    }),
    hasDate (date) {
      if (date in this.fourLinesDiary) {
        return true
      } else {
        return false
      }
    },
    getEachFourLinesDiary (fourLinesDiaryWord) {
      if (this.hasDate(this.date)) {
        return this.fourLinesDiary[this.date][fourLinesDiaryWord]
      }
    },
    setNewFourLinesDiary (date) {
      this.addFourLinesDiary({
        date,
        content: { fact: [], awareness: [], lesson: [], declaration: [] }
      })
      this.setRegisterDates()
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.fourLinesDiary)
    }
  }
}
</script>
