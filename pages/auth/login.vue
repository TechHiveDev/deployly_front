<template>
  <v-layout wrap row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card rounded>
          <v-card-text class="text-center">
            <v-avatar size="55" class="mb-2" color="blue">
              <v-icon size="30" color="white">mdi-login</v-icon>
            </v-avatar>
            <h1>Login</h1>
          </v-card-text>
          <v-card-text>
            <v-alert type="error" v-if="error">
              {{error}}
            </v-alert>
          </v-card-text>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                outlined
                v-model="email"
                :rules="rules"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                dense
              />
              <v-text-field
                outlined
                id="password"
                v-model="pass"
                :rules="rules"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                dense
              />
              <v-btn :disabled="loading" @click="login" class="white--text" width="100%" elevation="" color="blue">
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',
  middleware: 'guest',
  layout: 'auth',
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
        this.error = 'Please fill the form correctly';
        return false
      }
      try {
        await this.$auth.login( {
          data: {
            email: this.email,
            password: this.pass
          }
        })
        await this.$auth.fetchUser()
        await this.$router.push('/');
      } catch (e) {
        console.log(e)
        this.error = 'Invalid Credentials'
      }
    }
  }
}
</script>

<style scoped>

</style>
