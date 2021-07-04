<template>
  <v-dialog v-model="dialog" max-width="540" transition="dialog-top-transition" :persistent="persistent">
    <v-card v-if="group">
      <v-card-title class="text-h5">
        New Group
      </v-card-title>
      <v-card-text class="mt-2">
        <v-alert v-if="error" type="error">{{error}}</v-alert>
      </v-card-text>
      <v-card-text>
        <v-form @submit.prevent="save" v-model="valid">
          <v-text-field
            v-model="group.name"
            outlined
            dense
            :rules="rules.required"
            label="Name"
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
  name: 'AddGroup',
  data () {
    return {
      error: null,
      valid: null,
      dialog: false,
      persistent: false,
      loading: false,
      group: {
        name: null,
      }
    }
  },
  methods: {
    open() {
      this.dialog = true
    },
    async save () {
      this.error = null;
      if (!this.valid) {
        return false
      }
      this.persistent = true
      this.loading = true
      try {
        const data = await this.$axios.$post('projectGroups',{
          ...this.group
        })
        console.log(data)
        this.persistent = false
        this.loading = false
        this.dialog = false
        this.$store.commit('groups/addGroup',data);
      } catch (e) {
        this.persistent = false
        this.loading = false
        this.error = e.response.data.message
      }
    }
  },
  computed: {
    rules: () => rules
  },
}
</script>

<style scoped>

</style>
