<template>
  <v-layout row wrap>
    <v-flex xs12 mb-3>
      <v-card color="shades" height="800">
        <v-container text-xs-center>
          <v-avatar
            class="icon-img"
            :class="{'activatingDragover': activatingDragover }"
            slot="activator" color="gray" size="400" title="user"
            @drop="uploadImage"
            @dragleave="dragleave"
            @dragover="dragover"
          >
            <label for="file_upload" class="select-file" id="js-select-file">
              <img :src="user.icon" alt="avatar" class="icon-img-src">
              <input type="file" id="file_upload">
            </label>
          </v-avatar>
        </v-container>
        <v-container text-xs-center class="display-3">
          Name: 
          {{ user.name }}
        </v-container>
        <v-container text-xs-center class="display-3">
          Email: 
          {{ user.email }}
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'profile',
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  data () {
    return {
      activatingDragover: false
    }
  },
  mounted () {
    console.log(this.user)
  },
  methods: {
    ...mapActions({
      attachImage: 'user/attachImage'
    }),
    dragover (event) {
      event.preventDefault()
      this.activatingDragover = true
    },
    dragleave () {
      this.deactivateStyle()
    },
    uploadImage (event) {
      event.preventDefault()
      const fileName = event.dataTransfer.files[0].name
      console.log(fileName)
      this.attachImage({
        inputFile: event.dataTransfer.files[0],
        id: this.user.id
      })
      this.deactivateStyle()
    },
    deactivateStyle () {
      this.activatingDragover = false
    }
  }
}
</script>
