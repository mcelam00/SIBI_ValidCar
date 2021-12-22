<template>
 
  <v-card>
<v-card-title>
      Todos Nuestros Vehículos
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
    :headers="headers"
    :items="coches"
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

</template>


<script>
  export default {

    mounted() {
    this.traerCoches();
    },
    data () {
      return {
        search: '',
        coches: [],
        headers: [
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
        
      }
    },
    methods: {
      getColor (price_financed, price) {
        console.log("que tal"+price_financed, price)
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
        console.log("hola")
        if (price >= 50000) return 'red'
        else if (price >= 20000) return 'orange'
        else if (price < 20000) return 'green'
        else return 'blue'
      },
      traerCoches: function() {
          
      var request = new XMLHttpRequest();
      request.open("GET", "http://localhost:5000/traerTodos", false); // `false` makes the request synchronous
      request.setRequestHeader('Access-Control-Allow-Origin', '*')
      request.send(null);

      if (request.status === 200) {
        var datos = JSON.parse(request.responseText);

        for (let i = 0; i < datos.length; i++) {
            this.coches.push(datos[i]);
        }
        this.loaded = true;
      }
      
    },
    anuncioPicado(anuncio){

        //console.log(anuncio)
        this.$store.dispatch("setCurrentAdvertisementAction", anuncio);
    }
 
      
    },
  }
</script>