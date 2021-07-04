<template>
  <v-layout wrap row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card>
          <v-card-text>
            <h1 v-if="error.statusCode === 404">
              {{ pageNotFound }}
            </h1>
            <h1 v-else>
              {{ otherError }}
            </h1>
          </v-card-text>
          <v-card-text>
            <pre>
              {{ error }}
            </pre>
          </v-card-text>
          <v-card-text>
            <NuxtLink to="/">
              Home page
            </NuxtLink>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
