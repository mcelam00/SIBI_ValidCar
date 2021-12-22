<template>
 <v-container>
  <v-card>
<v-card-title>

    <v-row>
        <v-col>
Otros Usuarios con tus Necesidades Eligieron       </v-col>
 
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
    :items="cochesFColab"
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
    this.traerCochesFColab();

},
    data () {
      return {
        
        search: '',
        cochesFColab: [],
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

      traerCochesFColab: function() {
    
    this.cochesFColab = [];
          
      var request = new XMLHttpRequest();
      request.open("GET", "http://localhost:5000/traerFColab", false); // `false` makes the request synchronous
      request.setRequestHeader('Content-type', 'application/json')

       
      request.send();

      if (request.status === 200) {
        var datos = JSON.parse(request.responseText);

        for (let i = 0; i < datos.length; i++) {

            this.cochesFColab.push(datos[i]);
            
            this.calcularDistintivoAmbiental();
            
        }
        this.loaded = true;
      }
      
    },    

   
    calcularDistintivoAmbiental(){
        //cojo el ultimo de coches Urbanos, miro su año y le pongo un nuevo atributo
        if (this.cochesFColab[(this.cochesFColab.length)-1].fuel =="Híbrido enchufable" || this.cochesFColab[(this.cochesFColab.length)-1].fuel =="Híbrido" || 
        this.cochesFColab[(this.cochesFColab.length)-1].fuel =="Gas natural (CNG)" || this.cochesFColab[(this.cochesFColab.length)-1].fuel =="Gas licuado (GLP)"){
            //ECO
            this.cochesFColab[(this.cochesFColab.length)-1].Image = "https://sede.dgt.gob.es/sede-estaticos/Galerias/vehiculos/distintivo-ambiental/etiqueta-ambiental-eco.png";

        }else if(this.cochesFColab[(this.cochesFColab.length)-1].fuel == "Gasolina" && this.cochesFColab[(this.cochesFColab.length)-1].year < 2006){
            //B
            this.cochesFColab[(this.cochesFColab.length)-1].Image = "https://sede.dgt.gob.es/sede-estaticos/Galerias/vehiculos/distintivo-ambiental/etiqueta-ambiental-b-amarilla.png";
        } else if(this.cochesFColab[(this.cochesFColab.length)-1].fuel == "Gasolina" && this.cochesFColab[(this.cochesFColab.length)-1].year >= 2006){
            //C
            this.cochesFColab[(this.cochesFColab.length)-1].Image = "https://sede.dgt.gob.es/sede-estaticos/Galerias/vehiculos/distintivo-ambiental/etiqueta-ambiental-c-verde.png";
        }else if(this.cochesFColab[(this.cochesFColab.length)-1].fuel == "Eléctrico"){
            //0
            this.cochesFColab[(this.cochesFColab.length)-1].Image = "https://sede.dgt.gob.es/sede-estaticos/Galerias/vehiculos/distintivo-ambiental/etiqueta-ambiental-0-azul.png";
        }

    },

    anuncioPicado(anuncio){

        //console.log(anuncio)
        this.$store.dispatch("setCurrentAdvertisementAction", anuncio);
    },
 
      
  






    },
  }
</script>