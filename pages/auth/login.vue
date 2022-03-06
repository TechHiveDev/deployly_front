<template>
  <v-layout wrap row>
    <v-row class="grow ">
      <v-col cols="12" sm="12" md="7" lg="9" />
      <v-col cols="12" sm="12" md="5" lg="3">
        <v-card class="fill-height" rounded>
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" sm="12">
              <v-card-text>
                <h2 style="font-weight: normal;" class="mb-2 gray--text lighten-4 text-light">
                  Welcome To Deloyly Dashboard
                </h2>
                <h1>Login</h1>
              </v-card-text>
              <v-card-text>
                <v-alert color="red lighten-3" v-if="error" type="error">
                  {{ error }}
                </v-alert>
              </v-card-text>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    v-model="email"
                    outlined
                    :rules="rules"
                    label="Login"
                    name="login"
                    type="text"
                  />
                  <v-text-field
                    id="password"
                    v-model="pass"
                    outlined
                    :rules="rules"
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <v-btn
                    color="green"
                    :disabled="loading"
                    class="white--text"
                    width="100%"
                    elevation=""
                    @click="login"
                  >
                    Login
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',
  layout: 'auth',
  middleware: 'guest',
  data () {
    return {
      rules: [
        v => !!v || 'Field is required'
      ],
      valid: null,
      error: null,
      loading: false,
      email: null,
      pass: null
    }
  },
  methods: {
    async login () {
      if (!this.valid) {
        this.error = 'Please fill the form correctly'
        return false
      }
      try {
        await this.$auth.login({
          data: {
            email: this.email,
            password: this.pass
          }
        })
        await this.$auth.fetchUser()
        // await this.$router.push('/')
        this.$store.dispatch('loadData')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        this.error = 'Invalid Credentials'
      }
    }
  }
}
</script>

<style scoped>

</style>
