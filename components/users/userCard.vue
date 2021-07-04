<template>
  <v-card>
    <v-card-text>
      <v-row align-content="center" justify="center">
        <v-col class='text-center' cols="3" md="3">
          <v-avatar class="mx-auto" :color="randomColor"
                    size="60">
            <v-img :src="randomAvatar" aspect-ratio="1" contain
                   height="120" transition />
          </v-avatar>
        </v-col>
        <v-col cols="9" md="9">
          <h2 :class="user.isAdmin ? 'orange--text':''">{{user.name}}</h2>
          Groups In: {{user.groups.length}} <br>
          Email: {{user.email}} <br>
          Seen at: {{ $moment(user.lastLogin).format('yyyy-MM-DD hh:mm A') }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {cardColors} from "../../data/colors";

export default {
  name: "userCard",
  props: {
    user : {
      required : true
    }
  },
  computed: {
    randomAvatar: function () {
      return `https://avatars.dicebear.com/api/avataaars/${this.user.name.replace(" ",'')}${Math.floor(Math.random()*999999)}.svg?mood[]=happy&top[]=hijab&&top[]=longHair&top[]=bob&top[]=curvy&top[]=shortHair`;
    },
    randomColor: function () {
      return cardColors[Math.floor(Math.random()*cardColors.length)]
    }
  }
}
</script>

<style scoped>

</style>
