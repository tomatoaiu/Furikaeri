<template>
  <v-flex xs12 sm4>
    <v-card style="height: 100%; overflow: scroll;">
      <v-card-title>
        <div class="title">{{ column.name }}</div>
      </v-card-title>
      <hr class="my-1">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card v-for="(note, index) of column.notes" :key="index">
              <v-card-title class="pt-1 pl-2 pb-1">
                <div class="subheading">{{ note.title }}</div>
              </v-card-title>
              <v-card-text class="px-2 pt-1">
                {{ note.content }}
              </v-card-text>
              <div class="mb-3" v-if="index + 1 < column.notes.length" :key="index"></div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'borads-column',
  props: ['column']
}
</script>
