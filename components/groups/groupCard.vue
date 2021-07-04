<template>
  <v-card :to="{name:'groups.single',params:{id:group.id,name:group.name.replace(' ','_')},}" dark :color="randomColor">
    <v-card-title>
      {{group.name}}
    </v-card-title>
    <v-card-text>
      <v-icon class="mr-1" size="18">mdi-account-group</v-icon>Users In Group: {{ group.users ? group.users.length : 0 }} <br>
      <v-icon class="mr-1" size="18">mdi-folder-open</v-icon> Projects in Group: {{ group.projects ? group.projects.length : 0}} <br>
      <v-icon class="mr-1" size="18">mdi-clock-outline</v-icon> Created at: {{ $moment(group.createdAt).format('yyy-MM-DD') }}
    </v-card-text>
  </v-card>
</template>

<script>

import {cardColors} from "../../data/colors";

export default {
  name: "groupCard",
  props: {
    group: {
      required: true
    }
  },
  computed: {
    randomColor: function () {
      return cardColors[Math.floor(Math.random()*cardColors.length)]
    }
  }
}
</script>

<style scoped>

</style>
