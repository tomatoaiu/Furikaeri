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
            reareflectiveObservationnly
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
        <p class="display-2">CONCREATEEXPERIENCE</p>
        <v-select
          label="CONCREATEEXPERIENCE"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="experientialLearningConcreateExperience"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeConcreateExperience(data.item)"
              :selected="data.selected"
              :color="experientialLearningColor.concreateExperience"
              text-color="white"
            >
              <v-avatar :color="experientialLearningColor.concreateExperienceAvatar">C</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12>
        <p class="display-2">REFLECTIVEOBSERVATION</p>
        <v-select
          label="REFLECTIVEOBSERVATION"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="experientialLearningReflectiveObservation"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeReflectiveObservation(data.item)"
              :selected="data.selected"
              :color="experientialLearningColor.reflectiveObservation"
              text-color="white"
            >
              <v-avatar :color="experientialLearningColor.reflectiveObservationAvatar">R</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12>
        <p class="display-2">ABSTRACTCONCEPTUALIZATION</p>
        <v-select
          label="ABSTRACTCONCEPTUALIZATION"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="experientialLearningAbstractConceptualization"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeAbstractConceptualization(data.item)"
              :selected="data.selected"
              :color="experientialLearningColor.abstractConceptualization"
              text-color="white"
            >
              <v-avatar :color="experientialLearningColor.abstractConceptualizationAvatar">A</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12>
        <p class="display-2">ACTIVEEXPERIMENTATION</p>
        <v-select
          label="ACTIVEEXPERIMENTATION"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="experientialLearningActiveExperimentation"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeActiveExperimentation(data.item)"
              :selected="data.selected"
              :color="experientialLearningColor.activeExperimentation"
              text-color="white"
            >
              <v-avatar :color="experientialLearningColor.activeExperimentationAvatar">A</v-avatar>
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
      experientialLearningColor: 'color/experientialLearningColor',
      experientialLearning: 'experientialLearning/experientialLearning'
    }),
    experientialLearningConcreateExperience: {
      get () {
        return this.getEachExperientialLearning('concreateExperience')
      },
      set (list) {
        this.setEaceExperientialLearning('experientialLearning/setConcreateExperience', list)
      }
    },
    experientialLearningReflectiveObservation: {
      get () {
        return this.getEachExperientialLearning('reflectiveObservation')
      },
      set (list) {
        this.setEaceExperientialLearning('experientialLearning/setReflectiveObservation', list)
      }
    },
    experientialLearningAbstractConceptualization: {
      get () {
        return this.getEachExperientialLearning('abstractConceptualization')
      },
      set (list) {
        this.setEaceExperientialLearning('experientialLearning/setAbstractConceptualization', list)
      }
    },
    experientialLearningActiveExperimentation: {
      get () {
        return this.getEachExperientialLearning('activeExperimentation')
      },
      set (list) {
        this.setEaceExperientialLearning('experientialLearning/setActiveExperimentation', list)
      }
    }
  },
  watch: {
    date (next, prev) {
      if (!this.hasDate(next)) {
        this.setNewExperientialLearning(next)
      }
    }
  },
  mounted () {
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    this.setRegisterDates()
  },
  methods: {
    removeEaceExperientialLearning (experientialLearningWord, item) {
      this.$store.commit(experientialLearningWord, { date: this.date, item })
    },
    removeConcreateExperience (item) {
      this.removeEaceExperientialLearning('experientialLearning/removeConcreateExperience', item)
    },
    removeReflectiveObservation (item) {
      this.removeEaceExperientialLearning('experientialLearning/removeReflectiveObservation', item)
    },
    removeAbstractConceptualization (item) {
      this.removeEaceExperientialLearning('experientialLearning/removeAbstractConceptualization', item)
    },
    removeActiveExperimentation (item) {
      this.removeEaceExperientialLearning('experientialLearning/removeActiveExperimentation', item)
    },
    hasDate (date) {
      if (date in this.experientialLearning) {
        return true
      } else {
        return false
      }
    },
    getEachExperientialLearning (experientialLearningWord) {
      if (this.hasDate(this.date)) {
        return this.experientialLearning[this.date][experientialLearningWord]
      }
    },
    setEaceExperientialLearning (mutationWord, list) {
      if (this.hasDate(this.date)) {
        this.$store.commit(mutationWord, { date: this.date, list })
      } else {
        this.setNewExperientialLearning(this.date)
        this.$store.commit(mutationWord, { date: this.date, list })
      }
    },
    setNewExperientialLearning (date) {
      this.$store.commit('experientialLearning/setExperientialLearning', {
        date,
        content: { concreateExperience: [], reflectiveObservation: [], abstractConceptualization: [], activeExperimentation: [] }
      })
      this.setRegisterDates()
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.experientialLearning)
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
