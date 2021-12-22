<template>
  <v-main>
    <v-navigation-drawer v-model="drawer" app v-bind:width="325">
      <!--  -->
      <!---->
      <div v-if="$store.getters.logueado">
        <v-card flat class="mx-4 justify-center">
          <v-avatar size="120">
            <v-img src="https://thispersondoesnotexist.com/image"></v-img>
          </v-avatar>

          <v-card-title> {{ $store.getters.currentUser.nombre }} </v-card-title>

          <v-card-subtitle>
            {{ $store.getters.currentUser.apellidos }}</v-card-subtitle
          >
       
 <v-btn class="mb-4" color="primary" router to="/FColab">
            <span>Usuarios Similares</span>
            <v-icon right>mdi-account-circle</v-icon>
          </v-btn>

          <v-btn
            
            class="mb-4"
            color="primary"
            router
            to="/MiPerfil"
          >
            <span>Personalizada</span>
            <v-icon right>mdi-book-edit</v-icon>
          </v-btn>
        </v-card>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              router
              :to="item.ruta"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>

      <div v-if="!$store.getters.logueado">
        <v-card v-if="!$store.getters.logueado" flat class="ma-4">
          <h3 class="font-weight-light grey lighten-2 pa-2">
            Inicia sesión para acceder a tu perfil
          </h3>
        </v-card>
        <v-divider></v-divider>

        <v-list v-if="!$store.getters.logueado">
          <v-list-item-group v-model="selectedItem" color="primary">
            
            <v-list-item router to="/VehPopu">
              <v-list-item-icon>
                <v-icon>mdi-account-group-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Vehículos mas Populares</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router to="/VehUrb">
              <v-list-item-icon>
                <v-icon>mdi-city-variant-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Vehículos Urbanos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router to="/VehViajar">
              <v-list-item-icon>
                <v-icon>mdi-map</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Vehículos para Viajar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router to="/Login">
              <v-list-item-icon>
                <v-icon>mdi-face-agent</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Recomendacion Personalizada</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router to="/">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Menu Principal</v-list-item-title>
              </v-list-item-content>
            </v-list-item>


          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>  
        <router-link to="/">
      <v-img
  max-height="100"
  max-width="100"
  src="../../public/Logo.png"
></v-img>
</router-link>
</v-toolbar-title>
<template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab router
        to="/">Página Principal</v-tab>
          <v-tab router
        to="/Todos">Lista de Vehículos</v-tab>
        </v-tabs>
      </template>
      <v-btn
        v-if="$store.getters.logueado"
        color="primary"
        @click="
          changeStateLogueado();
          resetCurrentUser();
        "
        absolute
        right
        router
        to="/"
      >
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>


      <v-btn
        v-if="!$store.getters.logueado"
        absolute
        right
        color="primary"
        router
        to="/Login"
      >
        <span>Sign In</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <!--  -->
  </v-main>
</template>

<script>
import store from "../store";
export default {
  data: () => ({
    selectedItem: null,
    drawer: false,
    //isLogueado: $store.state.logueado,
    items: [
      { text: "Vehículos mas Populares", icon: "mdi-account-group-outline", ruta: "/VehPopu" },
      { text: "Vehículos Urbanos", icon: "mdi-city-variant-outline", ruta: "/VehUrb" },
      { text: "Vehículos para Viajar", icon: "mdi-map", ruta: "/VehViajar" },
      { text: "Recomendacion Personalizada", icon: "mdi-face-agent", ruta: "/MiPerfil" },
      { text: "Menu Principal", icon: "mdi-home", ruta: "/" },


    ],
  
    btnAdministrar: {
      text: "Administrar",
      icon: "mdi-start",
      ruta: "/Administracion",
    },
  }),
  computed: {},
  methods: {
    changeStateLogueado() {
      console.log("metodo de navbar");
      this.$store.dispatch("changeStateLogueadoAction");
    },
    resetCurrentUser() {
      console.log("Current user reseteado");
      this.$store.dispatch("setCurrentUserAction", null);








    },
  },
};
</script>
