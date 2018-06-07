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
              @input="removeConcreateExperience({ date, item: data.item })"
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
              @input="removeReflectiveObservation({ date, item: data.item })"
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
              @input="removeAbstractConceptualization({ date, item: data.item })"
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
              @input="removeActiveExperimentation({ date, item: data.item })"
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
      baseColor: 'color/baseColor',
      experientialLearningColor: 'color/experientialLearningColor',
      experientialLearning: 'experientialLearning/experientialLearning'
    }),
    experientialLearningConcreateExperience: {
      get () {
        return this.getEachExperientialLearning('concreateExperience')
      },
      set (list) {
        this.setConcreateExperience({ date: this.date, list })
      }
    },
    experientialLearningReflectiveObservation: {
      get () {
        return this.getEachExperientialLearning('reflectiveObservation')
      },
      set (list) {
        this.setReflectiveObservation({ date: this.date, list })
      }
    },
    experientialLearningAbstractConceptualization: {
      get () {
        return this.getEachExperientialLearning('abstractConceptualization')
      },
      set (list) {
        this.setAbstractConceptualization({ date: this.date, list })
      }
    },
    experientialLearningActiveExperimentation: {
      get () {
        return this.getEachExperientialLearning('activeExperimentation')
      },
      set (list) {
        this.setActiveExperimentation({ date: this.date, list })
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
    this.initFurikaeriLocalStorage()
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    if (!this.hasDate(this.date)) {
      this.setNewExperientialLearning(this.date)
    }
    this.setRegisterDates()
  },
  methods: {
    ...mapActions({
      addExperientialLearning: 'experientialLearning/addExperientialLearning',
      setConcreateExperience: 'experientialLearning/setConcreateExperience',
      setReflectiveObservation: 'experientialLearning/setReflectiveObservation',
      setAbstractConceptualization: 'experientialLearning/setAbstractConceptualization',
      setActiveExperimentation: 'experientialLearning/setActiveExperimentation',
      removeConcreateExperience: 'experientialLearning/removeConcreateExperience',
      removeReflectiveObservation: 'experientialLearning/removeReflectiveObservation',
      removeAbstractConceptualization: 'experientialLearning/removeAbstractConceptualization',
      removeActiveExperimentation: 'experientialLearning/removeActiveExperimentation'
    }),
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
      this.addExperientialLearning({
        date,
        content: { concreateExperience: [], reflectiveObservation: [], abstractConceptualization: [], activeExperimentation: [] }
      })
      this.setRegisterDates()
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.experientialLearning)
    }
  }
}
</script>
