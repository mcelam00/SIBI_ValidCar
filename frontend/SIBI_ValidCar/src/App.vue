<template>  
  <v-app app>
    <navbar />

    <v-main class="mx-2 mb-4 pt-0">
      <router-view></router-view>
    </v-main>
    <v-footer
    dark
    padless
    
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="grey darken-2">
        <strong class="subheading">¡Síguenos en nuestras redes sociales!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
    &copy;2022 — <strong>VALIDCAR CORPORATION S.L.</strong>      
    </v-card-text>
    </v-card>
  </v-footer>


  </v-app>     

</template>

<script>
import Navbar from "./components/Navbar.vue";
import store from './store';

export default {
  components: { Navbar },
  name: "App",
  store,

data: () => ({
  icons: [
     'mdi-facebook',
     'mdi-twitter',
     'mdi-linkedin',
     'mdi-instagram',
  ],})

};
</script>
