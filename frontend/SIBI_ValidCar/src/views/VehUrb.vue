<template>
 <v-container>
  <v-card>
<v-card-title>

    <v-row>
        <v-col>
      Anuncios Vehículos Urbanos 
       </v-col>
  <v-col>
 <v-switch
              v-model="manual"
              label="Prefiero Manual"
              color="primary"
              hide-details
              @change="switchCambiado()"
            ></v-switch>
             </v-col>
 <v-col>
            <v-switch
              v-model="emisiones"
              label="No aplicar restricción emisiones"
              color="primary"
              hide-details
              @change="switchCambiado()"
            ></v-switch>
 </v-col>
    </v-row>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

 <v-data-table
    :headers="urbanos"
    :items="cochesUrbanos"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:item.price_financed="{ item }">
      <v-chip
        :color="getColor(item.price_financed, item.price)"
        dark
      >
        {{ item.price_financed }}
      </v-chip>
    </template>

<template v-slot:item.price="{ item }">
      <v-chip
        :color="getColor2(item.price)"
        dark
      >
        {{ item.price }}
      </v-chip>
    </template>

        <template v-slot:item.details="{ item }">
    
    <router-link 
     style="text-decoration: none; color: inherit;"
    to="/Anuncio">
      <v-icon
        small
        class="mr-2"
        @click="anuncioPicado(item)"
      >
        mdi-information-outline
      </v-icon>
            </router-link>
      
    </template>


    <template v-slot:item.popularity="{ item }">
    <v-chip
      class="ma-2"
      color="pink"
      label
      text-color="white"
    >
      <v-icon left>
        mdi-cards-heart
      </v-icon>
      {{item.popularity}}
    </v-chip>
        
      
    </template>

     <template v-slot:item.Image="{ item }">
     <img :src="item.Image" style="width: 50px; height: 50px" />
               
      
    </template>


  </v-data-table>
    </v-card>

</v-container>

</template>


<script>
  export default {

    mounted() {
    this.traerCochesUrbanos();

},
    data () {
      return {
        manual: false,
        preferencias: {
          anio:2001,
          cambio:"Automático"
      },
        emisiones: false,
        search: '',
        cochesUrbanos: [],
        urbanos: [
            {
            text: 'Popularity',
            align: 'start',
            value: 'popularity',
          },
          {
            text: 'Make',
            align: 'start',
            value: 'make',
          },
          { text: 'Model', value: 'model' },
          { text: 'Province', value: 'province' },
          { text: 'Fuel', value: 'fuel' },
          { text: 'Year', value: 'year' },
          { text: 'Kilometres', value: 'kms' },
          { text: 'Pice Financed (€)', value: 'price_financed' },
          { text: 'Pice (€)', value: 'price' },
          { text: 'Advertised Date', value: 'adv_date' },
          { text: 'Details', value: 'details', sortable: false},
          {text: 'Envr_Label', value: 'Image', sortable: true}

        ]
        
      }
    },
    methods: {
      getColor (price_financed, price) {
          var colour = null;
        if (price_financed >= 50000){
            colour = 'red'
            if(price_financed < price){
                colour = 'orange'
            }
        } 
        else if (price_financed >= 20000){
             colour = 'orange'   
             if(price_financed < price){
                 colour = 'green'
             }
        } 
        else if (price_financed < 20000){
             colour = 'green'   
        } 
        else{
            colour = 'blue'
        } 
        return colour
      },
      getColor2 (price) {
        if (price >= 50000) return 'red'
        else if (price >= 20000) return 'orange'
        else if (price < 20000) return 'green'
        else return 'blue'
      },

      traerCochesUrbanos: function() {
    this.cochesUrbanos = [];
          
      var request = new XMLHttpRequest();
      request.open("POST", "http://localhost:5000/traerUrbanos", false); // `false` makes the request synchronous
      request.setRequestHeader('Access-Control-Allow-Origin', '*')
      request.setRequestHeader('Content-type', 'application/json')

       
      request.send(JSON.stringify(this.preferencias));

      if (request.status === 200) {
        var datos = JSON.parse(request.responseText);

        for (let i = 0; i < datos.length; i++) {

            this.cochesUrbanos.push(datos[i]);
            
            this.calcularDistintivoAmbiental();
            
        }
        this.loaded = true;
      }
      
    },    

   
    calcularDistintivoAmbiental(){
        //cojo el ultimo de coches Urbanos, miro su año y le pongo un nuevo atributo
        if (this.cochesUrbanos[(this.cochesUrbanos.length)-1].fuel =="Híbrido enchufable" || this.cochesUrbanos[(this.cochesUrbanos.length)-1].fuel =="Híbrido" || 
        this.cochesUrbanos[(this.cochesUrbanos.length)-1].fuel =="Gas natural (CNG)" || this.cochesUrbanos[(this.cochesUrbanos.length)-1].fuel =="Gas licuado (GLP)"){
            //ECO
            this.cochesUrbanos[(this.cochesUrbanos.length)-1].Image = "https://sede.dgt.gob.es/sede-estaticos/Galerias/vehiculos/distintivo-ambiental/etiqueta-ambiental-eco.png";

        }else if(this.cochesUrbanos[(this.cochesUrbanos.length)-1].fuel == "Gasolina" && (this.cochesUrbanos[(this.cochesUrbanos.length)-1].year < 2006 && this.cochesUrbanos[(this.cochesUrbanos.length)-1].year >= 2001) ){
            //B
            this.cochesUrbanos[(this.cochesUrbanos.length)-1].Image = "https://sede.dgt.gob.es/sede-estaticos/Galerias/vehiculos/distintivo-ambiental/etiqueta-ambiental-b-amarilla.png";
        } else if(this.cochesUrbanos[(this.cochesUrbanos.length)-1].fuel == "Gasolina" && this.cochesUrbanos[(this.cochesUrbanos.length)-1].year >= 2006){
            //C
            this.cochesUrbanos[(this.cochesUrbanos.length)-1].Image = "https://sede.dgt.gob.es/sede-estaticos/Galerias/vehiculos/distintivo-ambiental/etiqueta-ambiental-c-verde.png";
        }else if(this.cochesUrbanos[(this.cochesUrbanos.length)-1].fuel == "Eléctrico"){
            //0
            this.cochesUrbanos[(this.cochesUrbanos.length)-1].Image = "https://sede.dgt.gob.es/sede-estaticos/Galerias/vehiculos/distintivo-ambiental/etiqueta-ambiental-0-azul.png";
        }

    },

    anuncioPicado(anuncio){

        //console.log(anuncio)
        this.$store.dispatch("setCurrentAdvertisementAction", anuncio);
    },
 
      
  



    switchCambiado(){
        //se activó o se desactivó
        console.log(this.emisiones)
        console.log(this.manual)

        if(this.emisiones == true){
            //tengo que fijarme en el manual o automatico
            if(this.manual == true){
                this.preferencias.anio = 1995;
                this.preferencias.cambio = "Manual";
                this.traerCochesUrbanos()


            }else if(this.manual == false){
                this.preferencias.anio = 1995;
                this.preferencias.cambio = "Automático";
                this.traerCochesUrbanos()

            }

        }else if(this.emisiones == false){
            //console.log(" quiero emisiones")

            if(this.manual == true){
                this.preferencias.anio = 2001;
                this.preferencias.cambio = "Manual";
                this.traerCochesUrbanos()

            }else if(this.manual == false){
                this.preferencias.anio = 2001;
                this.preferencias.cambio = "Automático";
                this.traerCochesUrbanos()
            }
        }
    },





    },
  }
</script>