<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card
              width="600"
              class="mx-auto mt-5"
              justify="center"
              color="grey lighten-3"

            >
              <v-card-title>
                <h1 class="font-weight-medium">Login</h1>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="name"
                    label="Usuario"
                    prepend-icon="mdi-account-circle"
                    type="text"
                  />
                  <v-text-field
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                  />
                </v-form>
              </v-card-text>
              <v-divider></v-divider>

              <v-alert id="error" type="error" v-show="visible"
                >El usuario y contraseña no son correctos</v-alert
              >

              <v-card-actions>
                <template>
                  <div class="text-center">
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-width="200"
                      offset-x
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="recuperarclave"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          Recuperar contraseña
                        </v-btn>

                        <v-btn
                          right
                          absolute
                          color="light-green lighten-3"
                          @click="
                            login();
                            mandarDatos();
                          "
                          >Login</v-btn
                        >
                      </template>

                      <v-card>
                        <v-list>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title
                                >¿Cómo recuperar su contraseña?</v-list-item-title
                              >
                              <v-list-item-subtitle
                                >Para recuperar su contraseña, debe ponerse en contacto con atención al 
                                cliente en el siguiente número +346666666660 <br> ó enviar un correo electrónico a soporte@validcar.es
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>

                        <v-divider></v-divider>
                      </v-card>
                    </v-menu>
                  </div>
                </template>
              </v-card-actions>
            </v-card>
            <v-spacer class="pt-2"></v-spacer>
            <v-card width="600" class="mx-auto " color="grey lighten-3">
              <v-card-title
                style="font-size:20px; padding-top: 15px; padding-left: 10px;"
                >¿Aún no está registrado?
                <v-btn
                  right
                  absolute
                  color=" light-green lighten-3"
                  route
                  to="/Registro"
                  >Registrarse</v-btn
                >
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container></v-main
    >

    <!--:to="{ path: '/' }"-->

  </v-app>
</template>

<script>
import store from "../store";

export default {
  name: "Login",

  data() {
    return {
      menu: null,
      visible: false,
      showPassword: false,
      name: "",
      password: "",
    };
  },
  methods: {
    mandarDatos: function() {
      var self = this;

      console.log("Nombre =", this.name);
      console.log("Palabra de paso = ", this.password);

      //peticion post que comprueba el loggueo
      var xhttp = new XMLHttpRequest();
      var url = "http://localhost:5000/login";
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText)
          if (this.responseText == "NO") {
            document.getElementById("error").style.display = "block";
          } else if (this.responseText == "SI") {
            self.$store.dispatch("changeStateLogueadoAction");
            console.log("cambiado estado logueado desde login");
            self.$router.push({ path: "/MiPerfil" });
          } 

          //traemos al socio
          var xhttp1 = new XMLHttpRequest();
          var url = "http://localhost:5000/traerUsrLoggeado";
          xhttp1.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              var user = JSON.parse(this.responseText);

              console.log("Current usuario", user);

              self.$store.dispatch("setCurrentUserAction", user);
              console.log("Guardado current user desde login");
            }
          };

          xhttp1.open("GET", url, false);
          xhttp1.send();
        }
      };

      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
      xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");

      xhttp.send(JSON.stringify({ user: this.name, password: this.password }));
    },

    




    login: function() {
      console.log("loggeando");
    },
  },
  components: {},
};
</script>
