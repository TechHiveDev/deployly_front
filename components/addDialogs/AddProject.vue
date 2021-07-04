<template>
  <v-dialog v-model="dialog" max-width="540" transition="dialog-top-transition" :persistent="persistent">
    <v-card v-if="group">
      <v-card-title class="text-h5">
        New Project in {{group.name}}
      </v-card-title>
      <v-card-text class="mt-2">
        <v-alert v-if="error" type="error">{{error}}</v-alert>
      </v-card-text>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="project.name"
            outlined
            dense
            :rules="rules.required"
            label="Name"
          />
          <v-text-field
            v-model="project.repoUrl"
            outlined
            dense
            :rules="rules.required"
            type="url"
            label="Repo URL"
          />
          <v-text-field
            v-model="project.branch"
            outlined
            :rules="rules.required"
            dense
            label="branch"
          />
          <v-text-field
            v-model="project.path"
            outlined
            dense
            :rules="rules.required"
            label="Path on server"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :loading="loading" @click="save" color="purple" class="white--text">
          <v-icon color="white" size="16" class="mx-1">mdi mdi-check-circle</v-icon>
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {rules} from '../../data/rules'

export default {
  name: 'AddProject',
  data () {
    return {
      error: null,
      valid: null,
      dialog: false,
      persistent: false,
      loading: false,
      project: {
        name: null,
        repoUrl: null,
        branch: 'development',
        path: null
      }
    }
  },
  props: {
    group: {
      required: true
    }
  },
  methods: {
    open() {
      this.dialog = true
    },
    async save() {
      this.error = null;
      if (!this.valid) {
        return false
      }
      this.persistent = true
      this.loading = true
      try {
        const data = await this.$axios.$post('projects',{
          ...this.project,
          group: this.group.id
        })
        this.persistent = false
        this.loading = false
        this.dialog = false
        this.$store.dispatch('groups/updateGroup',this.group.id)
      } catch (e) {
        this.persistent = false
        this.loading = false
        this.error = e.response.data.message
        console.log(e.response.data.message)
      }
    }
  },
  computed: {
    rules: () => rules
  }
}
</script>

<style scoped>

</style>
