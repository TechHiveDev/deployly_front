<template>
  <v-row justify="center" align="center">
    <project-groups />
  </v-row>
</template>

<script>

import ProjectGroups from "../components/home/project-groups";
export default {
  components: {ProjectGroups},
  middleware: ['auth'],
  methods: {

  },
  head(){
    return {
      title: 'Home',
    }
  }
}
</script>
