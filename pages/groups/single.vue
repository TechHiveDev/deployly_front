<template>
  <v-layout wrap row class="mt-3">
    <v-row class="white elevation-2">
      <v-col cols="12" md="4">
        <v-flex>
          <h2>{{ group.name }}</h2>
          <v-icon class="mr-1" size="18">mdi-account-group</v-icon>Users In Group: {{ group.users.length }} <br>
          <v-icon class="mr-1" size="18">mdi-folder-open</v-icon> Projects in Group: {{ group.projects.length}} <br>
          <v-icon class="mr-1" size="18">mdi-clock-outline</v-icon> Created at: {{ $moment(group.createdAt).format('yyy-MM-DD') }}
        </v-flex>
        <br>
        <v-btn v-if="$auth.user.isAdmin" @click="dialog = !dialog" dark color="blue" text>
          <v-icon class="mr-1">mdi-account-plus</v-icon>
          Add User
        </v-btn>
        <v-btn @click="deleteGroup" v-if="$auth.user.isAdmin" dark color="red" text>
          <v-icon class="mr-1">
            mdi-trash-can-outline
          </v-icon>
          Delete Group
        </v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <h3>Group Users</h3>
        <br>
        <v-row>
          <v-col v-for="user in group.users" :key="user.id" cols="12" md="5">
            <UserCard :user="user" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- add user to group dialog -->
    <v-dialog v-model="dialog" max-width="540" transition="dialog-top-transition" :persistent="persistent">
      <v-card>
        <v-card-title>
          Add User to {{group.name}}
        </v-card-title>
        <br>
        <v-card-text v-if="error">
          <v-alert type="error">{{ error }}</v-alert>
          <br>
        </v-card-text>
        <v-card-text>
          <v-form @submit.prevent="addUser">
            <v-select
              v-model="newUser"
              :items="$store.state.users.users"
              item-text="name"
              item-value="id"
              outlined
              dense
              label="Select User"
            />
          </v-form>
          <v-btn class="mx-auto" dark :loading="loading" color="blue" rounded width="120" @click="addUser">
            <v-icon class="mr-1">mdi-account-plus</v-icon>
            Add User
          </v-btn>
        </v-card-text>
        <v-card-actions>

        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>
import UserCard from "../../components/users/userCard";
export default {
  name: "single",
  components: {UserCard},
  async asyncData({params,$axios,error}) {
    try {
      const group = await $axios.$get(`projectGroups/${params.id}`);
      return {group: group}
    } catch (e) {
      error({statusCode:404,message:'Group Not Found'})
    }
  },
  head(){
    return {
      title: this.$route.params.name.replace('_',' ')
    }
  },
  data(){
    return {
      error: null,
      dialog: false,
      persistent: false,
      loading: false,
      newUser: null
    }
  },
  methods: {
    async addUser() {
      if (this.newUser==null) {
        this.error = "Please Select a user to add";
        return;
      }
      this.persistent = this.loading = true;
      try {
        const req = await this.$axios.$post('/projectGroups/assignUser', {
          user_id: this.newUser,
          group_id: this.group.id
        })
        await this.$store.dispatch('groups/updateGroup',this.group.id);
        this.groups = req;
        this.dialog = this.persistent = this.loading = false;
      } catch (e) {
        this.persistent = this.loading = false;
        this.error = e.response.data.message
        console.log(e.response);
        return;
      }
    },
    async deleteGroup() {
      this.$swal.fire({
        title: 'Are You Sure You Want To Delete This Project Group?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        icon: 'warning'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.$axios.$delete('projectGroups/' + this.group.id)
            this.$swal.fire({
              title: 'Project Group Deleted',
              icon: 'success'
            })
            await this.$router.push('/groups')
          } catch (e) {
            this.$swal.fire({
              title: 'Failed To Complete Your Action',
              icon: 'error'
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
