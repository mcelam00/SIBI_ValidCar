<template>

<v-container grid-list-xs>

  <v-row>
   <v-col> 
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
     elevation="24"
     color="rgb(255, 255, 255, 0.8)"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://watermarkconsult.net/wp-content/uploads/2020/06/Most-Popular-Posts.jpg"
    ></v-img>

    <v-card-title>Los vehículos más populares</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          5.0 (413)
        </div>
      </v-row>
      <br>
      <div>¿No tienes claro qué comprar? ¡¡Echa un vistazo a los anuncios más populares entre los compradores!!.</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="blue darken-4"
        text
        @click="reserve"
         router
        to="/VehPopu"
      >
        Ver Anuncios
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-col>
  

<!--/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
<v-col>
<v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
    elevation="24"
    color="rgb(255, 255, 255, 0.8)"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://noticias-renting.aldautomotive.es/wp-content/uploads/2021/01/barcelonatrafico-600x330.jpg"
    ></v-img>

    <v-card-title>Los mejores vehículos para ciudad</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        

        
      </v-row>
      <br>
      <div>¿Uso mayoritario en ciudad? ¡¡Aquí tendrás tus mejores opciones, entra ya!!</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="blue darken-4"
        text
        @click="reserve"
         router
        to="/VehUrb"
      >
        Ver Anuncios
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
</v-row>



<!--/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
<v-row>
<v-col>
<v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
    elevation="24"
    color="rgb(255, 255, 255, 0.8)"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://www.mycoyote.es/blog/wp-content/uploads/2017/04/iStock-485427589.jpg"
    ></v-img>

    <v-card-title>Los mejores vehículos para viajar</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        

        
      </v-row>
      <br>
      <div>¿Tienes alma viajera? ¿Tu hábitat son carreteras y autopistas junto a recorrer largas distancias? ¡¡Mira qué buenas opciones!!</div>

    </v-card-text>
    <v-card-actions>
      <v-btn
        color="blue darken-4"
        text
        @click="reserve"
         router
        to="/VehViajar"
      >
        Ver Anuncios
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>


<!--/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
<v-col>
<v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
     elevation="24"
     color="rgb(255, 255, 255, 0.8)"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://static2.abc.es/media/motor/2020/11/27/coche-ocasion-U31585324082PUc-620x349@abc.jpg"
    ></v-img>

    <v-card-title>¿Una recomendación personalizada?</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        

        
      </v-row>
      <br>
      <div>¿Quieres una recomendación mas concreta en base a tu perfíl? ¿Quieres saber qué prefieren otras personas con un perfíl similar? Cuéntanos que necesitas y te ayudaremos</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="blue darken-4"
        text
        @click="reserve"
        router
        to="/Login"
      >
        Entrar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
</v-row>



<!--/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->



 </v-container>

</template>

<script>
export default {
  name: "Principal",

  mounted() {
    //this.traerColecciones();
    console.log("Colecciones traidas", this.albumes);
  },
  data: () => ({
    overlay: false,
    show: false,
    albumes: null,
    
  }),

  methods: {
    traerColecciones: function() {
      var request = new XMLHttpRequest();
      request.open("GET", "http://localhost:5000/baseDatos/Colecciones", false); // `false` makes the request synchronous
      request.send(null);

      if (request.status === 200) {
        this.albumes = JSON.parse(request.responseText);
        console.log(this.albumes);
        this.loaded = true;
      }
      
    },
    setCurrentColeccion: function(a) {
      this.$store.dispatch("setCurrentColeccionAction", a);

      this.$router.push({ path: "/ComprarAlbumYCartas" });
    },
  },
};
</script>


<style>
#app {
  background: url('https://wallpapercave.com/wp/wp4422328.jpg')
    no-repeat center center fixed !important ;
  background-size: cover;
}


</style>
