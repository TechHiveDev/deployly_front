<template>
  <v-app>
    <v-main class="bg">
      <v-container class="fill-height" fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'auth'
}
</script>

<style scoped lang="scss">
.bg {
  background-image: url(/bg.webp);
  background-size: cover;
  position:relative;
*{
  z-index: 10;
}
  &:after {
    content: "";
    position: absolute;
    width: 100%;height: 100%;
    background-color:#000;
    opacity: 0.3;
    top: 0;left: 0;
  }
}

</style>
