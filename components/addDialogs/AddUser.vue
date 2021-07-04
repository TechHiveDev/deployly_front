<template>
  <div id="add-user">
    <!-- floating button -->
    <v-btn
      @click.stop="dialog = !dialog"
      color="purple"
      rounded
      fixed
      large
      dark
      bottom
      right
      class="v-btn--example"
    >
      <v-icon>mdi-plus</v-icon>
      Add User
    </v-btn>

    <!-- Dialog Start -->
    <v-dialog v-model="dialog" max-width="540" transition="dialog-top-transition" :persistent="persistent">
      <v-card>
        <v-card-title class="text-h5">
          New User
        </v-card-title>
        <v-card-text class="mt-2">
          <v-alert v-if="error" type="error">{{error}}</v-alert>
        </v-card-text>
        <v-card-text>
          <v-form @submit.prevent="save" v-model="valid">
            <v-text-field
              v-model="user.name"
              outlined
              dense
              :rules="rules.required"
              label="User Name"
            />
            <v-text-field
              v-model="user.email"
              outlined
              dense
              :rules="rules.required"
              label="User Email"
            />
            <v-text-field
              v-model="user.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              outlined
              dense
              label="Password"
              hint="At least 6 characters"
              counter
              @click:append="show1 = !show1"
            />
            <v-text-field
              v-model="user.gitUsername"
              outlined
              dense
              :rules="rules.required"
              label="Github Username"
            />
            <v-switch
              v-model="user.isAdmin"
              label="Is Admin"
              color="red"
              value="1"
              hide-details />
          </v-form>
        </v-card-text>
        <v-card-actions class="pb-3 mt-2">
          <v-btn rounded width="150" :loading="loading" @click="save" color="purple" class="white--text mx-auto">
            <v-icon color="white" size="16" class="mx-1">mdi mdi-check-circle</v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {rules} from "../../data/rules";

export default {
  name: "AddUser",
  data: () => ({
    error: null,
    valid: null,
    dialog: false,
    show1: false,
    persistent: false,
    loading: false,
    user: {
      name: null,
      email: null,
      password: null,
      gitUsername: null,
      isAdmin: 0
    }
  }),
  computed: {
    rules: () => rules
  },
  methods: {
    save: async function () {
      this.error = null;
      if (!this.valid) {
        return false
      }
      this.persistent = true
      this.loading = true
      try {
        const data = await this.$axios.$post('users',{
          ...this.user
        })
        this.persistent = false
        this.loading = false
        this.dialog = false
        this.$store.commit('users/addUser',data);
      } catch (e) {
        this.persistent = false
        this.loading = false
        this.error = e.response.data.message
      }
    }
  }
}
</script>

<style scoped>

</style>
