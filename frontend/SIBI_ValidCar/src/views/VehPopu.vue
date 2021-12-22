<template>
 <v-container>
  <v-card>
<v-card-title>
      Anuncios de los Vehículos Mas Populares
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
    :headers="populares"
    :items="cochesPopulares"
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


  </v-data-table>
    </v-card>
<!--//////////////////////////////////////////////////////////////////////-->

  <v-card class="mt-6" >
<v-card-title>
      Anuncios de Vehículos Relacionados
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
    :headers="relacionados"
    :items="cochesRelacionados"
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


  </v-data-table>
    </v-card>

</v-container>

</template>


<script>
  export default {

    mounted() {
    this.traerCochesPopulares();
    this.traerLosDiezMasPopulares();
    },
    data () {
      return {
        search: '',
        diezMasPopulares: [],
        cochesRelacionados: [],
        cochesPopulares: [],
        populares: [
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
          { text: 'Details', value: 'details', sortable: false}

        ],
        relacionados:[

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
          { text: 'Details', value: 'details', sortable: false}


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
      traerCochesPopulares: function() {
          
      var request = new XMLHttpRequest();
      request.open("GET", "http://localhost:5000/traerPopulares", false); // `false` makes the request synchronous
      request.setRequestHeader('Access-Control-Allow-Origin', '*')
      request.send(null);

      if (request.status === 200) {
        var datos = JSON.parse(request.responseText);

        for (let i = 0; i < datos.length; i++) {
            this.cochesPopulares.push(datos[i]);
        }
        this.loaded = true;
      }
      
    },
    
    traerLosDiezMasPopulares: function(){

      var request = new XMLHttpRequest();
      request.open("GET", "http://localhost:5000/guardarDiezMasPopulares", false); // `false` makes the request synchronous
      request.setRequestHeader('Access-Control-Allow-Origin', '*')
      request.send(null);

      if (request.status === 200) {
        var datos = JSON.parse(request.responseText);

        for (let i = 0; i < datos.length; i++) {
            this.diezMasPopulares.push(datos[i]);
            console.log(datos[i])
        }
        this.loaded = true;
      }

      //Ahora por cada uno de los diez coches mas populares vamos a hacer una consulta que nos traiga los anuncios relacionados a ellos con una similitud coseno mayor a 0.75

 for(let j = 0; j < this.diezMasPopulares.length; j++){
                  console.log(this.diezMasPopulares[j].make)

      var request2 = new XMLHttpRequest();
      request2.open("POST", "http://localhost:5000/traerRelacionados", false); // `false` makes the request2 synchronous
      request2.setRequestHeader('Access-Control-Allow-Origin', '*')
      request2.setRequestHeader('Content-type', 'application/json')

      
     

          request2.send(JSON.stringify(this.diezMasPopulares[j]));
      
          if (request2.status === 200) {
            var datos = JSON.parse(request2.responseText);
            for (let i = 0; i < datos.length; i++) {
                this.cochesRelacionados.push(datos[i]);
            }
            this.loaded = true;
          }

      }


        console.log(this.cochesRelacionados)


    },

    
  

     

   
    anuncioPicado(anuncio){

        //console.log(anuncio)
        this.$store.dispatch("setCurrentAdvertisementAction", anuncio);
    }
 
      
    },
  }
</script>