<script>
import { mapActions } from 'vuex'

function getFurikaeriFromLocalStorage () {
  const state = {}
  // if ('kpt' in window.localStorage) {
  //   state.kpt = (JSON.parse(window.localStorage.getItem('kpt'))).kpt || {}
  // } else {
  //   state.kpt = {}
  // }
  if ('ywt' in window.localStorage) {
    state.ywt = (JSON.parse(window.localStorage.getItem('ywt'))).ywt || {}
  } else {
    state.ywt = {}
  }
  if ('fourLinesDiary' in window.localStorage) {
    state.fourLinesDiary = (JSON.parse(window.localStorage.getItem('fourLinesDiary'))).fourLinesDiary || {}
  } else {
    state.fourLinesDiary = {}
  }
  if ('lamda' in window.localStorage) {
    state.lamda = (JSON.parse(window.localStorage.getItem('lamda'))).lamda || {}
  } else {
    state.lamda = {}
  }
  if ('experientialLearning' in window.localStorage) {
    state.experientialLearning = (JSON.parse(window.localStorage.getItem('experientialLearning'))).experientialLearning || {}
  } else {
    state.experientialLearning = {}
  }
  if ('gapAnalysis' in window.localStorage) {
    state.gapAnalysis = (JSON.parse(window.localStorage.getItem('gapAnalysis'))).gapAnalysis || {}
  } else {
    state.gapAnalysis = {}
  }
  if ('pdca' in window.localStorage) {
    state.pdca = (JSON.parse(window.localStorage.getItem('pdca'))).pdca || {}
  } else {
    state.pdca = {}
  }
  return state
}

export default {
  methods: {
    ...mapActions({
      // setKpt: 'kpt/setKpt',
      setYwt: 'ywt/setYwt',
      setFourLinesDiary: 'fourLinesDiary/setFourLinesDiary',
      setLamda: 'lamda/setLamda',
      setExperientialLearning: 'experientialLearning/setExperientialLearning',
      setGapAnalysis: 'gapAnalysis/setGapAnalysis',
      setPdca: 'pdca/setPdca'
    }),
    initFurikaeriLocalStorage () {
      const state = getFurikaeriFromLocalStorage()
      // this.setKpt(state.kpt)
      this.setYwt(state.ywt)
      this.setFourLinesDiary(state.fourLinesDiary)
      this.setLamda(state.lamda)
      this.setExperientialLearning(state.experientialLearning)
      this.setGapAnalysis(state.gapAnalysis)
      this.setPdca(state.pdca)
    }
  }
}
</script>
