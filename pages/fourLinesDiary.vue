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
          v-model="fourLinesDiaryPlan"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeFact(data.item)"
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
          v-model="fourLinesDiaryDo"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeAwareness(data.item)"
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
          v-model="fourLinesDiaryCheck"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeLesson(data.item)"
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
          v-model="fourLinesDiaryAction"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeDeclaration(data.item)"
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
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menu: false,
      date: undefined,
      registerDates: undefined
    }
  },
  computed: {
    ...mapGetters({
      baseColor: 'color/baseColor',
      fourLinesDiaryColor: 'color/fourLinesDiaryColor',
      fourLinesDiary: 'fourLinesDiary/fourLinesDiary'
    }),
    fourLinesDiaryPlan: {
      get () {
        return this.getEachFourLinesDiary('fact')
      },
      set (list) {
        this.setEaceFourLinesDiary('fourLinesDiary/setPlan', list)
      }
    },
    fourLinesDiaryDo: {
      get () {
        return this.getEachFourLinesDiary('awareness')
      },
      set (list) {
        this.setEaceFourLinesDiary('fourLinesDiary/setDo', list)
      }
    },
    fourLinesDiaryCheck: {
      get () {
        return this.getEachFourLinesDiary('lesson')
      },
      set (list) {
        this.setEaceFourLinesDiary('fourLinesDiary/setCheck', list)
      }
    },
    fourLinesDiaryAction: {
      get () {
        return this.getEachFourLinesDiary('declaration')
      },
      set (list) {
        this.setEaceFourLinesDiary('fourLinesDiary/setAction', list)
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
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    this.setRegisterDates()
  },
  methods: {
    removeEaceFourLinesDiary (fourLinesDiaryWord, item) {
      this.$store.commit(fourLinesDiaryWord, { date: this.date, item })
    },
    removeFact (item) {
      this.removeEaceFourLinesDiary('fourLinesDiary/removeFact', item)
    },
    removeAwareness (item) {
      this.removeEaceFourLinesDiary('fourLinesDiary/removeAwareness', item)
    },
    removeLesson (item) {
      this.removeEaceFourLinesDiary('fourLinesDiary/removeLesson', item)
    },
    removeDeclaration (item) {
      this.removeEaceFourLinesDiary('fourLinesDiary/removeDeclaration', item)
    },
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
    setEaceFourLinesDiary (mutationWord, list) {
      if (this.hasDate(this.date)) {
        this.$store.commit(mutationWord, { date: this.date, list })
      } else {
        this.setNewFourLinesDiary(this.date)
        this.$store.commit(mutationWord, { date: this.date, list })
      }
    },
    setNewFourLinesDiary (date) {
      this.$store.commit('fourLinesDiary/setFourLinesDiary', {
        date,
        content: { fact: [], awareness: [], lesson: [], declaration: [] }
      })
      this.setRegisterDates()
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.fourLinesDiary)
    },
    toTomorrow () {
      this.toNextDay(1)
    },
    toYesterday () {
      this.toNextDay(-1)
    },
    toNextWeek () {
      this.toNextDay(7)
    },
    toLastWeek () {
      this.toNextDay(-7)
    },
    toNextDay (direction) {
      const date = new Date(this.date)
      date.setDate(date.getDate() + direction)
      this.date = date.toJSON().slice(0, 10).replace(/-/g, '-')
    }
  }
}
</script>
