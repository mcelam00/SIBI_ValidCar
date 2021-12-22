<template>
  <v-container>
    <v-card class="mx-auto" max-width="1000" color="rgb(255, 255, 255, 0.0)">

<v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      eager
      v-for="(foto, i) in fotosCoche"
      :key="i"
      :src="foto"
    >
   
    </v-carousel-item>
  </v-carousel>
    </v-card>

    <v-card class="mx-auto" max-width="1000">
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-car</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-card-title> DETALLES DEL VEHÍCULO ANUNCIADO </v-card-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <v-card class="mx-auto" max-width="1000">
     <v-card-subtitle> <p class="text--disabled">
      Publlicado: {{Anuncio.adv_date}}
      </p></v-card-subtitle>

              <v-card class="ml-4 mr-4" elevation="18" outlined>

      <v-card-title class="pt-8 pb-0 mx-0"> {{Anuncio.version}} </v-card-title>
      <br><br>
        </v-card>


        <v-card class="mt-6 ml-4 mr-4" elevation="18" outlined>

      <v-row class="mt-4">
        <v-col>
      <div class="pl-4">Precio al contado:</div>
      <v-card-title class="pl-10">{{Anuncio.price}}€</v-card-title>
           <v-card-subtitle class="pl-10"> <p class="text--disabled">
      IVA incluido
      </p></v-card-subtitle>
        </v-col>
        <v-col>
      <div class="pl-4">Precio financiado:</div>
      <v-card-title class="pl-10">{{Anuncio.price_financed}}€</v-card-title>
      <v-card-subtitle class="pl-10"> <p class="text--disabled">
      Sujeto a Condiciones
      </p></v-card-subtitle>
        </v-col>

      </v-row>

        </v-card>

  
        <v-card class="mt-6 ml-4 mr-4" elevation="18" outlined>
 
  <v-row class="mt-4">
        <v-col>
      <div class="pl-4">Marca:</div>
      <v-card-title class="pl-4">{{Anuncio.make}}</v-card-title>
        </v-col>
        <v-col>
      <div class="pl-4">Modelo:</div>
      <v-card-title class="pl-4">{{Anuncio.model}}</v-card-title>
        </v-col>
        <v-col>
      <div class="pl-4">Año:</div>
      <v-card-title class="pl-4">{{Anuncio.year}}</v-card-title>
        </v-col>
 </v-row>
 <v-row>
          <v-col>
      <div class="pl-4">Kilometraje:</div>
      <v-card-title class="pl-4">{{Anuncio.kms}}</v-card-title>
        </v-col>
         <v-col>
      <div class="pl-4">Ubicación:</div>
      <v-card-title class="pl-4">{{Anuncio.province}}</v-card-title>
        </v-col>
        <v-col>
      <div class="pl-4">Cambio:</div>
      <v-card-title class="pl-4">{{Anuncio.gearChange}}</v-card-title>
        </v-col>

         </v-row>

          <v-row>
        <v-col>
      <div class="pl-4">Puertas:</div>
      <v-card-title class="pl-4">{{Anuncio.doors}}</v-card-title>
        </v-col>
        <v-col>
      <div class="pl-4">Potencia:</div>
      <v-card-title class="pl-4">{{Anuncio.power}}</v-card-title>
        </v-col>
        <v-col>
      <div class="pl-4">Color:</div>
      <v-card-title class="pl-4">{{Anuncio.color}}</v-card-title>
        </v-col>
 </v-row>
 <v-row>
          <v-col>
        <div class="pl-4">Combustible:</div>
      <v-card-title class="pl-4">{{Anuncio.fuel}}</v-card-title>
        </v-col>
 </v-row>

 </v-card>
 <v-card class="mt-6 ml-4 mr-4" elevation="18" outlined>

      <v-row class="mt-4">   
         
         <v-col v-if="Anuncio.isProfessionalSeller ===  'True'">
        <div class="pl-4">Datos del anunciante:</div>
      <v-card-title class="pl-10">{{Anuncio.dealer}}</v-card-title>
      <v-card-subtitle class="pl-10"> <p class="text--disabled">
      Vendedor Profesional
      </p></v-card-subtitle>
        </v-col>

          <v-col v-if="Anuncio.isProfessionalSeller === 'False'">
        <div class="pl-4">Anuncio de Particular</div>
      <v-card-title class="pl-10">Datos: {{Anuncio.dealer}}</v-card-title>
      
        </v-col>

       </v-row> 
 
 </v-card>


<v-card v-if="loggeado" class="mt-6 ml-4 mr-4" elevation="18" outlined >

      <v-row class="mt-4">   
                 <div class="pl-4">Valoración Del Anuncio:</div>

      </v-row>
            <v-row class="mt-4">
                       <v-col>

      <v-card-title class="pl-10">Me gusta<v-btn text icon @click="meGustaAnuncio();"><v-icon>mdi-thumb-up</v-icon></v-btn> </v-card-title>
      
        </v-col>
 <v-col>
      
      <v-card-title class="pl-10">No me gusta<v-btn text icon @click="noMeGustaAnuncio();"><v-icon>mdi-thumb-down</v-icon></v-btn> </v-card-title>
      
        </v-col>

       </v-row> 
 
 </v-card>




      <v-row justify="end" class="pr-16 pb-16 pt-10">
<v-dialog
        transition="dialog-top-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
        <v-btn color="secondary" 
            v-bind="attrs"
            v-on="on"
          >Contactar Vendedor</v-btn
        >
        </template>

        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="secondary"
              dark
            >Número de Teléfono</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">{{Anuncio.tel_num}}</div>
            </v-card-text>
             <v-card-subtitle class="pl-10"> <p class="text--disabled">
              Vieron el teléfono: {{Anuncio.popularity}}
              </p></v-card-subtitle>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="sumarPopularidad();dialog.value = false;"
                
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
</v-dialog>
      </v-row>
    </v-card>


    
  </v-container>
</template>





<script>
import store from "../store";


export default {

  mounted() {
    //console.log(store.getters.currentAdvertisement)
    this.Anuncio = store.getters.currentAdvertisement
    //Buscamos en google imágenes del vehículo que se anuncia
    this.buscarFotos();


},

  data() {
    return {
      loggeado: store.getters.logueado,
      Anuncio : null,
      fotosCoche: []
    };
  },

  methods: {

    meGustaAnuncio(){
      console.log("me gusta el anuncio")

      var request = new XMLHttpRequest();
      request.open("POST", "http://localhost:5000/meGusta", false); // `false` makes the request synchronous

      request.setRequestHeader('Access-Control-Allow-Origin', '*')
            request.setRequestHeader('Content-type', 'application/json')


      request.send(JSON.stringify(this.Anuncio));
    },

    noMeGustaAnuncio(){
      console.log("No me gusta el anuncio");

       var request = new XMLHttpRequest();
      request.open("POST", "http://localhost:5000/noMeGusta", false); // `false` makes the request synchronous

      request.setRequestHeader('Access-Control-Allow-Origin', '*')
            request.setRequestHeader('Content-type', 'application/json')


      request.send(JSON.stringify(this.Anuncio));
    },



    buscarFotos2(){
      
      var request = new XMLHttpRequest();
      request.open("GET", "https://www.googleapis.com/customsearch/v1?q="+this.Anuncio.version+"&cx=04fb2395981f044f2&key=AIzaSyDXCxyyCjpP_IIQ0IhPz_gSU45vFzy0kA4&searchType=image&alt=json", false); // `false` makes the request synchronous
      //request.setRequestHeader('Access-Control-Allow-Origin', '*')
      request.send(null);

      if (request.status === 200) {
        var datos = JSON.parse(request.responseText);
        //console.log(datos)
        
        var contador = 0

        for (let i = 0; i < datos.items.length; i++) {

            if((datos.items[i].link.substr(datos.items[i].link.length - 4)) == ".jpg"){
              this.fotosCoche.push(datos.items[i].link); 
              contador++;
            }

            if(contador == 10){
              break;
            }

        }
        
      }

    },
    buscarFotos(){
    

var request = new XMLHttpRequest();
      request.open("GET", "https://www.googleapis.com/customsearch/v1?q="+this.Anuncio.make+"+"+this.Anuncio.model+"+"+this.Anuncio.year+"&cx=04fb2395981f044f2&key=AIzaSyDXCxyyCjpP_IIQ0IhPz_gSU45vFzy0kA4&searchType=image&alt=json", false); // `false` makes the request synchronous
      //request.setRequestHeader('Access-Control-Allow-Origin', '*')
      request.send(null);

      if (request.status === 200) {
        var datos = JSON.parse(request.responseText);
        //console.log(datos)
        
        var contador = 0

        for (let i = 0; i < datos.items.length; i++) {

            if((datos.items[i].link.substr(datos.items[i].link.length - 4)) == ".jpg"){
              this.fotosCoche.push(datos.items[i].link); 
              contador++;
            }

            if(contador == 10){
              break;
            }

        }
this.buscarFotos2()
}



    },
    sumarPopularidad(){
      this.Anuncio.popularity++; 
      var request = new XMLHttpRequest();
      request.open("POST", "http://localhost:5000/sumarPopularidad", false); // `false` makes the request synchronous
      request.setRequestHeader('Access-Control-Allow-Origin', '*')
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      request.send(JSON.stringify(this.Anuncio));
      

    }
  }
};
</script>
