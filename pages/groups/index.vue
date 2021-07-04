<template>
  <v-layout row wrap class="mt-4">
    <v-row>
      <v-col v-for="group in groups" :key="group.id"
             cols="12" md="3">
        <group-card :group="group" />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import GroupCard from "../../components/groups/groupCard";
export default {
  name: "index",
  middleware: ['auth','isAdmin'],
  head(){
    return {
      title: 'Groups',
    }
  },
  components: {GroupCard},
  computed: {
    groups: function () {
      return this.$store.state.groups.groups
    }
  }
}
</script>

<style scoped>

</style>
