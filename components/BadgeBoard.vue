<template>
  <v-flex xs12 md4>
    <p class="display-2">{{ word.toUpperCase() }}</p>
    <v-combobox
      :label="word.toUpperCase()"
      chips
      multiple
      solo
      prepend-icon=""
      append-icon=""
      v-model="item"
    >
      <template slot="selection" slot-scope="data">
        <v-chip
          close
          @input="$emit('remove', { each: word, item: data.item })"
          :selected="data.selected"
          :color="color"
          text-color="white"
        >
          <v-avatar :color="avatarColor">{{ word.charAt(0).toUpperCase() }}</v-avatar>
          <strong>{{ data.item }}</strong>
        </v-chip>
      </template>
    </v-combobox>
  </v-flex>
</template>

<script>
export default {
  name: 'badge-board',
  props: ['word', 'color', 'avatarColor', 'model'],
  computed: {
    item: {
      get () {
        return (Object.values(this.model).filter(item => item))
      },
      set (list) {
        const item = list[list.length - 1]
        this.$emit('set', { each: this.word, item })
      }
    }
  }
}
</script>

