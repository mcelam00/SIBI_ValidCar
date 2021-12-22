<template>

  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col >
          <v-card
            width="600"
            class="mx-auto mt-5"
            justify="center"
            color="grey lighten-3"
          >
            <v-card-title>
              <h1 class="font-weight-medium">Registro</h1>
            </v-card-title>
            <v-card-text>
              <v-form>
              <v-text-field
                  v-model="nombre"
                  label="Nombre"
                  prepend-icon="mdi-account"
                  type="text"
                  :rules="[rules.required, rules.counter]"

                />
              <v-text-field
                  v-model="apellidos"
                  label="Apellidos"
                  prepend-icon="mdi-account"
                  type="text"
                  :rules="[rules.required, rules.counter]"
                />
               <v-text-field
                  v-model="email"
                  label="Correo Electrónico"
                  prepend-icon="mdi-at"
                  type="text"
                  :rules="[rules.required, rules.counter, rules.email]"
                />
                <v-text-field
                  v-model="name"
                  label="Usuario"
                  prepend-icon="mdi-account-circle"
                  type="text"
                  :rules="[rules.required, rules.counter]"
                />
                <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :rules="[rules.required, rules.counter]"
                />
                
              </v-form>
            </v-card-text>

            <v-card-actions>
            
              <template>
              
                <v-btn     
                        color="light-green lighten-3"
                        @click="mandarDatos()"
                        >Registro</v-btn
                      >
              </template>
            </v-card-actions>
          </v-card>
        </v-col>
    <v-col>
    
             <v-card
            width="600"
            class="mx-auto mt-5"
            justify="center"
            color="grey lighten-3"
          >
            <v-card-title>
              <h1 class="font-weight-medium">Ficha de Conductor</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="residencia"
                  label="Lugar de Residencia"
                  prepend-icon="mdi-home-city-outline"
                  type="text"
                  :rules="[rules.required, rules.counter]"

                />

 <v-select
      v-model="age"
      :items="edad"
      :error-messages="selectErrors"
      label="Rango de Edad"
      prepend-icon="mdi-card-account-details"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>

<v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Discapacidad motriz"
            prepend-icon="mdi-wheelchair-accessibility"

      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>


    <v-select
      v-model="select"
      :items="tipo"
      :error-messages="selectErrors"
      label="Estilo de Conducción"
               prepend-icon="mdi-car"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>



     <v-select
      v-model="select1"
      :items="eCivil"
      :error-messages="selectErrors"
      label="Condicionantes Familiares"
               prepend-icon="mdi-car-3-plus"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>

     <v-select
      v-model="select2"
      :items="km"
      :error-messages="selectErrors"
               prepend-icon="mdi-map-marker-distance"
      label="Kilometraje Anual"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>

        <v-select
      v-model="select3"
      :items="uso"
      :error-messages="selectErrors"
      label="Uso Mayoritario"
               prepend-icon="mdi-plus-circle-outline"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>


            </v-card-text>

            <v-card-actions>
            
           
            </v-card-actions>
          </v-card>
    
        </v-col>

     
 </v-row>
    </v-container>

    <!--:to="{ path: '/' }"-->

   
  </v-content>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      showPassword: false,
      checkbox: false,
      name: "",
      password: "",
      nombre: "",
      apellidos: "",
      DNI: "",
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
    
    edad: [
        'Joven (18-40 años)',
        'Adulto (40-60 años)',
        'Experto (60+ años)'
      ],
      tipo:[
        'Conducción Pausada',
        'Conducción Decidida'
      ],
      eCivil:[
        'Soltero/Pareja',
        'Con Hijos'
      ],
      uso:[
        'Urbano',
        'ExtraUrbano'
      ],
      km:[
        'Menos de 10.000',
        '10.000 - 20.000',
        '20.000 - 25.000',
        'Más de 25.000'
      ]

    };
  },
  methods: {

    mandarDatos: function () {
      console.log("gracias al v-model");

      var Nombre = this.nombre;
      var Apellidos = this.apellidos;
      var CorreoElectronico= this.email;
      var Usuario= this.name;
      var Contrasenya=this.password;
      var Residencia=this.residencia;
      var Edad=this.age;
      var Discapacidad=this.checkbox;
      var EstiloConduccion=this.select;
      var CondFamiliares=this.select1;
      var KmAnuales=this.select2;
      var UsoMayoritario=this.select3;

    console.log(Nombre+"/"+Apellidos+"/"+CorreoElectronico+"/"+Usuario+"/"+Contrasenya+"/"+Residencia+"/"+Edad+"/"+Discapacidad+"/"+EstiloConduccion+"/"+CondFamiliares+"/"+KmAnuales+"/"+UsoMayoritario);


      //peticion post que comprueba el loggueo
      var xhttp = new XMLHttpRequest();
      var url = "http://localhost:5000/registro";
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          window.location.href = "/#/Login";

        }
      };

      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
      xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");

      xhttp.send(JSON.stringify({ nombre: Nombre, apellidos: Apellidos, contrasenya: Contrasenya, usuario: Usuario, email: CorreoElectronico, residencia: Residencia, edad: Edad, discapaacidad: Discapacidad, estiloconduccion: EstiloConduccion, condFamiliares: CondFamiliares, kmAnuales: KmAnuales, usoMayoritario: UsoMayoritario }));
    },
  },
  components: {},
};
</script>


