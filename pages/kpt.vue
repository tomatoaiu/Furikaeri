<template>
  <furikaeri
    :name="name"
    :model="furikaeri"
    :word="word"
    :color="furikaeriColor"
    >
  </furikaeri>
</template>

<script>
import Furikaeri from '~/components/Furikaeri.vue'
import { mapGetters } from 'vuex'

const FURIKAERI = 'kpt'
const WORD = ['keep', 'problem', 'try']

export default {
  components: {
    'furikaeri': Furikaeri
  },
  data () {
    return {
      name: FURIKAERI,
      word: WORD
    }
  },
  computed: {
    ...mapGetters({
      furikaeriColor: `color/${FURIKAERI}`,
      furikaeri: `furikaeri/${FURIKAERI}`
    })
  }
}
</script>
