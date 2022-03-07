<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      class="pt-4"
      mini-variant
    >
      <v-avatar
        color="grey darken"
        size="36"
        class="d-block text-center mx-auto mb-9"
      ></v-avatar>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar
      app
      flat
      fixed
      elevation="1"
      height="50"
    >
      <v-app-bar-nav-icon
        class=""
        @click.stop="drawer = !drawer"/>
      <v-toolbar-title v-text="title"/>
      <v-spacer />
      <v-toolbar-title>
        <v-icon>mdi-account-circle</v-icon>
        {{$auth.user.name}}
      </v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-container fluid class="px-10">
        <nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import menu from '../data/menu'

export default {
  data () {
    return {
      title: 'AutoDeploy',
      drawer: true
    }
  },
  computed: {
    items () {
      if (!this.$auth.user.isAdmin)
        return menu.list.filter(item => !item.admin)
      return menu.list
    }
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.$store.dispatch('loadData')
    }
  }

}
</script>
