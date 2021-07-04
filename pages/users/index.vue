<template>
  <v-layout row wrap class="mt-4">
    <v-row>
      <v-col v-for="user in users" :key="user.id"
             cols="12" md="3">
        <user-card :user="user" />
      </v-col>
    </v-row>
    <AddUser />
  </v-layout>
</template>

<script>
import UserCard from "../../components/users/userCard";
import AddUser from "../../components/addDialogs/AddUser";
export default {
  name: "index",
  middleware: ['auth','isAdmin'],
  components: {AddUser, UserCard},
  head(){
    return {
      title: 'Users'
    }
  },
  async asyncData({ $axios,store }) {
    await store.dispatch('users/fetchUsers')
  },
  computed: {
    users: function () {
      return this.$store.state.users.users
    }
  }
}
</script>

<style scoped>

</style>
