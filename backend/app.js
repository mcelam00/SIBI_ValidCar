//Peticiones cruzadas
const cors = require('cors');

//Requerimos el módulo express de nodejs
var express = require('express');


var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

//variable para el driver de neo4j
const neo4j = require('neo4j-driver');


const { exit } = require('process');
const { version } = require('os');
const { Console } = require('console');

//Inicializamos la app
var app = express();


/*CONFIGURACIONES*/
app.set('port', process.env.PORT || 5000); //se usará el puerto que proporcione el servicio cloud/S.O./máquina servidor y sino el 8080



/*MIDDLEWARE*/

//Motor gráfico
app.set('views', path.join(__dirname, 'views')); //Usaremos la carpeta views para poner las vistas
app.set('view engine', 'ejs'); //ejs será el motor gráfico

//Más middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); //La carpeta pública se llamará public 

app.use(express.json()); //para procesamiento de json
app.use(cors());

//Conexión con Neo4j
//const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '1234'));
const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', '1234'));
const session = driver.session();



/*MANEJADORAS DE PETICIONES*/


//Petición de todos los coches populares

app.get('/traerPopulares', (request, response) => {
    

    const session = driver.session();
    const promesa = session.run('MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WHERE v.popularity >= 1 RETURN v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type ORDER BY v.popularity DESC')
        
    promesa.then(function(resultado){

            var arrayCochesPopulares = [];
                         resultado.records.forEach(function(instancia){
                            coche = {
                               color : instancia._fields[0],
                               year : parseInt(instancia._fields[1]),
                               tel_num : instancia._fields[2],
                               version : instancia._fields[3],
                               kms : parseInt(instancia._fields[4]),
                               price_financed : instancia._fields[5],
                               province : instancia._fields[6],
                               price : parseInt(instancia._fields[7]),
                               dealer : instancia._fields[8],
                               model : instancia._fields[9],
                               power : parseInt(instancia._fields[10]),
                               adv_date : instancia._fields[11],
                               make : instancia._fields[12],
                               fuel : instancia._fields[13],
                               gearChange : instancia._fields[14],
                               popularity :  parseInt(instancia._fields[15]),
                               doors :  instancia._fields[16],
                               isProfessionalSeller :  instancia._fields[17]
                            }
             
                             //arrayPeliculas.push(peli); //meto el objeto en el array
                             //console.log(instancia._fields[0])
                            //console.log(instancia._fields[0].properties)
                            //console.log(coche)



                            //Una vez tenemos el coche con todos sus datos lo metemos en el arrray de objetos de tipo coche para ir por cada iteracion del foreach metiendo una instancia.

                            arrayCochesPopulares.push(coche)

                        });
                        session.close();
                        response.send(JSON.stringify(arrayCochesPopulares))

            
                       
        })
        .catch(function(error){
            console.log(error);
        })    

    


});





app.get('/guardarDiezMasPopulares', (request, response) => {
    
   
    const session = driver.session();

  
//MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WHERE v.popularity >= 1 RETURN v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type ORDER BY v.popularity DESC LIMIT 10

    //.run('MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WHERE v.popularity >= 1 WITH v, collect(distinct v) as already MATCH (x)-[:USES]->(f), (x)-[:IS]->(g), (x)-[:HAS_NUM_DOORS]->(n), (x)-[:PROFESSIONAL_SELLER]->(s) WHERE x.make = v.make and x.model = v.model and NOT x IN already RETURN x.color, x.year, x.tel_num, x.version, x.kms, x.price_financed, x.province, x.price, x.dealer, x.model, x.power, x.adv_date, x.make, f.name, g.type, x.popularity, n.num, s.type')

    //Trae los 10 mas populares
    const promesa = session.run('MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WHERE v.popularity >= 1 RETURN v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type ORDER BY v.popularity DESC LIMIT 10')
    promesa
    .then(function(resultado){
  
        var cochesMasPopulares = [];

                     resultado.records.forEach(function(instancia){
                        coche = {
                           color : instancia._fields[0],
                           year : parseInt(instancia._fields[1]),
                           tel_num : instancia._fields[2],
                           version : instancia._fields[3],
                           kms : parseInt(instancia._fields[4]),
                           price_financed : instancia._fields[5],
                           province : instancia._fields[6],
                           price : parseInt(instancia._fields[7]),
                           dealer : instancia._fields[8],
                           model : instancia._fields[9],
                           power : parseInt(instancia._fields[10]),
                           adv_date : instancia._fields[11],
                           make : instancia._fields[12],
                           fuel : instancia._fields[13],
                           gearChange : instancia._fields[14],
                           popularity :  parseInt(instancia._fields[15]),
                           doors :  instancia._fields[16],
                           isProfessionalSeller :  instancia._fields[17]
                        }
         


                        cochesMasPopulares.push(coche);

                     })
                     response.send(JSON.stringify(cochesMasPopulares))

                   session.close()
                    //Ya tengo los 10 mas populares, que constituyen el vector de referencia sobre el que calcularemos la similitud
                })
                .catch(function(error){
                    console.log(error);
                })
            
});



app.post('/traerRelacionados', (request, response) =>{

   

    var cochesRelacionados = [];

        const session = driver.session();
        cochePopular = request.body;

        //cochePopular=cochesMasPopulares[0]

        //SPor cada coche popular obtengo los anuncios relacionados en similitud a mas de un .75 de similitud coseno con él y los guardo en un vector (y así por cada uno de los 10 populares)
      const promesa = session.run("MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WITH v,s,g,f,n, collect(CASE n.num WHEN '"+cochePopular.doors+"' THEN 2 ELSE 0 END) as puertas, collect(CASE s.type WHEN '"+cochePopular.isProfessionalSeller+"' THEN 1 ELSE 0 END) as vendedor, collect(CASE f.name WHEN '"+cochePopular.fuel+"' THEN 4 ELSE 0 END) as combustible, collect(CASE g.type WHEN '"+cochePopular.gearChange+"' THEN 4 ELSE 0 END) as cambio, collect(CASE v.power WHEN "+cochePopular.power+" THEN 4 ELSE 0 END) as potencia,collect(CASE v.make WHEN '"+cochePopular.make+"' THEN 10 ELSE 0 END) as marca,  collect(CASE v.model WHEN '"+cochePopular.model+"' THEN 13 ELSE 0 END) as modelo, collect(CASE v.province WHEN '"+cochePopular.province+"' THEN 7 ELSE 0 END) as provincia, collect(CASE v.year WHEN "+cochePopular.year+" THEN 7 ELSE 0 END) as anio, collect(CASE v.color WHEN '"+cochePopular.color+"' THEN 1 ELSE 0 END) as color with v,s,g,f,n, gds.alpha.similarity.cosine([2,1,4,4,4,10,13,7,7,1], puertas+vendedor+combustible+cambio+potencia+marca+modelo+provincia+anio+color) as cosineSimilarity where cosineSimilarity > 0.79 and cosineSimilarity <1.0 return v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type, cosineSimilarity ORDER BY cosineSimilarity DESC")
      promesa.then(function(resultado){

                resultado.records.forEach(function(anuncioRelacionado){
                    anuncio = {
                        color : anuncioRelacionado._fields[0],
                        year : parseInt(anuncioRelacionado._fields[1]),
                        tel_num : anuncioRelacionado._fields[2],
                        version : anuncioRelacionado._fields[3],
                        kms : parseInt(anuncioRelacionado._fields[4]),
                        price_financed : anuncioRelacionado._fields[5],
                        province : anuncioRelacionado._fields[6],
                        price : parseInt(anuncioRelacionado._fields[7]),
                        dealer : anuncioRelacionado._fields[8],
                        model : anuncioRelacionado._fields[9],
                        power : parseInt(anuncioRelacionado._fields[10]),
                        adv_date : anuncioRelacionado._fields[11],
                        make : anuncioRelacionado._fields[12],
                        fuel : anuncioRelacionado._fields[13],
                        gearChange : anuncioRelacionado._fields[14],
                        popularity :  parseInt(anuncioRelacionado._fields[15]),
                        doors :  anuncioRelacionado._fields[16],
                        isProfessionalSeller :  anuncioRelacionado._fields[17]
                     }

                    if(anuncio.popularity >= 1){
                        //Ya está en otro de los populares que no es el que se ha usado para buscar similaridad (hay dos anuncios del mismo modelo en populares vaya, por eso pasa)
                        
                    }else{

                        cochesRelacionados.push(anuncio)
                     
                    }                              
                    

                });
                
                response.send(JSON.stringify(cochesRelacionados))
                session.close();


            }).catch(function(error){
                console.log(error);
                console.log("MAADREEE")
            })


       
        

        //MATCH (v:Vehicle)-[:USES]-(f), (v)-[:IS]-(g), (v)-[:HAS_NUM_DOORS]-(n), (v)-[:PROFESSIONAL_SELLER]-(s) WHERE v.popularity >= 1 with collect(v) as lista match (x:Vehicle) where not x in lista return x
//retorna los que no estan ya en populares
//de entre esos hay que traer los que igualen en marca y modelo a los 10 mas populares (interesa promocionar/ vender) aquellos coches que mas tirón tienen en el ranking, mejor que llenarlo con anuncios relacionados a 1000 vehículos populares todos mezclados

});







//Petición de todos los coches de la base de datos
app.get('/traerTodos', (request, response) => {
    session
        //.run('MATCH (n:Vehicle) RETURN n')
        .run('MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) RETURN v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type')
        .then(function(resultado){

            var arrayCoches = [];
                         resultado.records.forEach(function(instancia){
                            coche = {
                               color : instancia._fields[0],
                               year : parseInt(instancia._fields[1]),
                               tel_num : instancia._fields[2],
                               version : instancia._fields[3],
                               kms : parseInt(instancia._fields[4]),
                               price_financed : instancia._fields[5],
                               province : instancia._fields[6],
                               price : parseInt(instancia._fields[7]),
                               dealer : instancia._fields[8],
                               model : instancia._fields[9],
                               power : parseInt(instancia._fields[10]),
                               adv_date : instancia._fields[11],
                               make : instancia._fields[12],
                               fuel : instancia._fields[13],
                               gearChange : instancia._fields[14],
                               popularity :  parseInt(instancia._fields[15]),
                               doors :  instancia._fields[16],
                               isProfessionalSeller :  instancia._fields[17]
                            }
             
                             //arrayPeliculas.push(peli); //meto el objeto en el array
                             //console.log(instancia._fields[0])
                            //console.log(instancia._fields[0].properties)
                            //console.log(coche)



                            //Una vez tenemos el coche con todos sus datos lo metemos en el arrray de objetos de tipo coche para ir por cada iteracion del foreach metiendo una instancia.

                            arrayCoches.push(coche)

                        });
                        //console.log(arrayCoches)
                        response.send(JSON.stringify(arrayCoches))

            
                       
        })
        .catch(function(error){
            console.log(error);
        })    
    //response.send("Query exitosa");

});





//Suma la popularidad cuando se pica en contactar un anuncio

app.post('/sumarPopularidad', (request, response) => {

    actualizar = request.body;

    session
    //MATCH (n{id:{uuid}) SET n.prop=true
    .run("MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WHERE v.color = '"+actualizar.color+"' AND v.year = "+actualizar.year+" AND v.tel_num = '"+actualizar.tel_num+"' AND v.version = '"+actualizar.version+"' AND v.price = "+actualizar.price+" AND v.dealer = '"+actualizar.dealer+"' AND v.model = '"+actualizar.model+"' AND v.power = "+actualizar.power+"AND v.make = '"+actualizar.make+"' AND f.name = '"+actualizar.fuel+"' AND g.type = '"+actualizar.gearChange+"' AND n.num = '"+actualizar.doors+"' SET v.popularity = "+actualizar.popularity+"")
        .then(function(resultado){

                        
            
                       
        })
        .catch(function(error){
            console.log(error);
        })

    response.send("Se ha sumado la popularidad")
});







app.post('/traerUrbanos', (request, response) => {

    //turismos y furgonetas ligeras de gasolina matriculadas desde el 1 de enero de 2001.
    //Como existe la opción de que el visitante no le preocupe la legislación/ética por ahora, se pasa el año en el cuerpo del post para meterlo en la query 2001 ó 1995
    //se recomendarán únicamente vehículos gasolina,Híbrido enchufable,Híbrido, Eléctrico, Gas natural (CNG), Gas licuado (GLP)
    //automáticos aunque se da la opción de ver los manuales si se quiere (por si el usuario es fanático de los manuales)
    //máximo 100cv
   //Query ordenada por los mas populares

    preferencias = request.body;
 

    session
        .run("MATCH (v:Vehicle)-[:USES]->(f:Fuel), (v:Vehicle)-[:IS]->(g:Gears), (v:Vehicle)-[:HAS_NUM_DOORS]->(n:Doors), (v:Vehicle)-[:PROFESSIONAL_SELLER]->(s:Seller) WHERE v.year >="+preferencias.anio+" AND (f.name = 'Gasolina' OR f.name = 'Híbrido enchufable' OR f.name = 'Híbrido' OR f.name = 'Eléctrico' OR f.name = 'Gas natural (CNG)' OR f.name = 'Gas licuado (GLP)') AND g.type = '"+preferencias.cambio+"' AND v.power <=100 RETURN v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type ORDER BY v.popularity DESC")
        .then(function(resultado){

            var arrayCoches = [];
                         resultado.records.forEach(function(instancia){
                            coche = {
                               color : instancia._fields[0],
                               year : parseInt(instancia._fields[1]),
                               tel_num : instancia._fields[2],
                               version : instancia._fields[3],
                               kms : parseInt(instancia._fields[4]),
                               price_financed : instancia._fields[5],
                               province : instancia._fields[6],
                               price : parseInt(instancia._fields[7]),
                               dealer : instancia._fields[8],
                               model : instancia._fields[9],
                               power : parseInt(instancia._fields[10]),
                               adv_date : instancia._fields[11],
                               make : instancia._fields[12],
                               fuel : instancia._fields[13],
                               gearChange : instancia._fields[14],
                               popularity :  parseInt(instancia._fields[15]),
                               doors :  instancia._fields[16],
                               isProfessionalSeller :  instancia._fields[17]
                            }
             
                            
                            arrayCoches.push(coche)

                        });
                        response.send(JSON.stringify(arrayCoches))

            
                       
        })
        .catch(function(error){
            console.log(error);
        })    

});




app.get('/traerViajar', (request, response) => {

    //año mínimo 2010
    //Diesel, Gas natural (CNG), Gas licuado (GLP)
    //Manuales y automáticos
    //calculo relacion peso-potencia máximo 12 pero mas de 125cv
    //2,4 o 5 puertas
    
    //Query ordenada por los mas populares

    session
        .run("MATCH (v:Vehicle)-[:USES]->(f:Fuel), (v:Vehicle)-[:IS]->(g:Gears), (v:Vehicle)-[:HAS_NUM_DOORS]->(n:Doors), (v:Vehicle)-[:PROFESSIONAL_SELLER]->(s:Seller) WHERE v.year >= 2010 AND (f.name = 'Diésel' OR f.name = 'Gas natural (CNG)' OR f.name = 'Gas licuado (GLP)') AND v.power >= 125 AND ((n.num ='2' AND (v.version CONTAINS 'Cabrio' OR v.version CONTAINS 'CABRIO' OR v.version CONTAINS 'Coupe')) OR n.num='5' OR n.num ='4') RETURN v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type ORDER BY v.popularity DESC")
            .then(function(resultado){

            var arrayCoches = [];
                         resultado.records.forEach(function(instancia){
                            coche = {
                               color : instancia._fields[0],
                               year : parseInt(instancia._fields[1]),
                               tel_num : instancia._fields[2],
                               version : instancia._fields[3],
                               kms : parseInt(instancia._fields[4]),
                               price_financed : instancia._fields[5],
                               province : instancia._fields[6],
                               price : parseInt(instancia._fields[7]),
                               dealer : instancia._fields[8],
                               model : instancia._fields[9],
                               power : parseInt(instancia._fields[10]),
                               adv_date : instancia._fields[11],
                               make : instancia._fields[12],
                               fuel : instancia._fields[13],
                               gearChange : instancia._fields[14],
                               popularity :  parseInt(instancia._fields[15]),
                               doors :  instancia._fields[16],
                               isProfessionalSeller :  instancia._fields[17]
                            }
             
                            
                            arrayCoches.push(coche)

                        });
                        response.send(JSON.stringify(arrayCoches))

            
                       
        })
        .catch(function(error){
            console.log(error);
        })    

});


//si un usuario se registra, se crea un nodo con sus datos

app.post('/registro', (request, response) => {
   
    usuarioARegistrar = request.body;
    session
    .run("CREATE (u:User { nombre: '"+usuarioARegistrar.nombre+"', apellidos: '"+usuarioARegistrar.apellidos+"', contrasenya: '"+usuarioARegistrar.contrasenya+"', usuario: '"+usuarioARegistrar.usuario+"', email: '"+usuarioARegistrar.email+"', residencia: '"+usuarioARegistrar.residencia+"', edad: '"+usuarioARegistrar.edad+"', discapacidad: "+usuarioARegistrar.discapaacidad+", estiloconduccion: '"+usuarioARegistrar.estiloconduccion+"', condFamiliares: '"+usuarioARegistrar.condFamiliares+"', kmAnuales: '"+usuarioARegistrar.kmAnuales+"', usoMayoritario: '"+usuarioARegistrar.usoMayoritario+"'})")
    .then(function(resultado){

        response.send("Usuario registrado exitosamente");

     })
    .catch(function(error){
        console.log(error);
    }) 


});



//si un usuario se loggea se validan sus credenciales y se guardan sus datos para que cuando interacione se sepa que es el

usuarioActivo = ""; //variable de clase que mantiene la sesion del ususario que está conectado


app.post('/login', (request, response) => {
    usuarioALoggear = request.body;

    //si cuento los resultados con un count y vienn 0 pues es que retorno NO si viene 1 es que SI 
    session
    .run("MATCH (u:User) WHERE u.contrasenya = '"+usuarioALoggear.password+"' AND u.usuario = '"+usuarioALoggear.user+"' RETURN u.nombre, u.apellidos, u.contrasenya, u.usuario, u.email, u.residencia, u.edad, u.discapacidad, u.estiloconduccion, u.condFamiliares, u.kmAnuales, u.usoMayoritario")
    .then(function(resultado){
        if(resultado.records.length == 0){
            console.log("Login incorrecto")

            response.send("NO")

        }else{
            resultado.records.forEach(function(instancia){
            
                usuario={
                    nombre : instancia._fields[0],
                    apellidos : instancia._fields[1],
                    password : instancia._fields[2],
                    usuario : instancia._fields[3],
                    email : instancia._fields[4],
                    residencia : instancia._fields[5],
                    edad : instancia._fields[6],
                    discapacidad : instancia._fields[7],
                    estiloconduccion : instancia._fields[8],
                    condFamiliares : instancia._fields[9],
                    kmAnuales : instancia._fields[10],
                    usoMayoritario : instancia._fields[11] 
    
    
                }
    
    
                
                    console.log("Login correcto")
    
                    usuarioActivo = usuario;
                    response.send("SI")
                    return;
                
    
    
            });
        }


     })
    .catch(function(error){
        console.log(error);
    }) 

    

});

app.get('/traerUsrLoggeado', (request, response) => {
    
    response.send(JSON.stringify(usuarioActivo));

    
});



//si un usuario da que no le gusta un coche se crea realcion de dislike 


app.post('/noMeGusta', (request, response) => {

    anuncioDislikes = request.body;
    
    session
    .run("MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WHERE v.color = '"+anuncioDislikes.color+"' AND v.year = "+anuncioDislikes.year+" AND v.tel_num = '"+anuncioDislikes.tel_num+"' AND v.version = '"+anuncioDislikes.version+"' AND v.price = "+anuncioDislikes.price+" AND v.dealer = '"+anuncioDislikes.dealer+"' AND v.model = '"+anuncioDislikes.model+"' AND v.power = "+anuncioDislikes.power+" AND v.make = '"+anuncioDislikes.make+"' AND f.name = '"+anuncioDislikes.fuel+"' AND g.type = '"+anuncioDislikes.gearChange+"' AND n.num = '"+anuncioDislikes.doors+"' WITH v MATCH (u:User) WHERE u.nombre = '"+usuarioActivo.nombre+"'AND u.apellidos= '"+usuarioActivo.apellidos+"'AND u.contrasenya= '"+usuarioActivo.password+"' AND u.usuario = '"+usuarioActivo.usuario+"'AND u.email= '"+usuarioActivo.email+"'AND u.residencia= '"+usuarioActivo.residencia+"'AND u.edad= '"+usuarioActivo.edad+"'AND u.discapacidad = "+usuarioActivo.discapacidad+" AND u.estiloconduccion='"+usuarioActivo.estiloconduccion+"' AND u.condFamiliares = '"+usuarioActivo.condFamiliares+"'AND u.kmAnuales = '"+usuarioActivo.kmAnuales+"' AND u.usoMayoritario='"+usuarioActivo.usoMayoritario+"'  WITH u,v CREATE (u)-[:DISLIKES]->(v)")
    .then(function(resultado){

        console.log("Relacion de no me gusta creada")
        response.send();

     })
    .catch(function(error){
        console.log(error);
    }) 

});


//si un usuario da que le gusta entonces se crea una relacion de likes



app.post('/meGusta', (request, response) => {
    
    anuncioLikes = request.body;


    session
    .run("MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WHERE v.color = '"+anuncioLikes.color+"' AND v.year = "+anuncioLikes.year+" AND v.tel_num = '"+anuncioLikes.tel_num+"' AND v.version = '"+anuncioLikes.version+"' AND v.price = "+anuncioLikes.price+" AND v.dealer = '"+anuncioLikes.dealer+"' AND v.model = '"+anuncioLikes.model+"' AND v.power = "+anuncioLikes.power+" AND v.make = '"+anuncioLikes.make+"' AND f.name = '"+anuncioLikes.fuel+"' AND g.type = '"+anuncioLikes.gearChange+"' AND n.num = '"+anuncioLikes.doors+"' WITH v MATCH (u:User) WHERE u.nombre = '"+usuarioActivo.nombre+"'AND u.apellidos= '"+usuarioActivo.apellidos+"'AND u.contrasenya= '"+usuarioActivo.password+"' AND u.usuario = '"+usuarioActivo.usuario+"'AND u.email= '"+usuarioActivo.email+"'AND u.residencia= '"+usuarioActivo.residencia+"'AND u.edad= '"+usuarioActivo.edad+"'AND u.discapacidad = "+usuarioActivo.discapacidad+" AND u.estiloconduccion='"+usuarioActivo.estiloconduccion+"' AND u.condFamiliares = '"+usuarioActivo.condFamiliares+"'AND u.kmAnuales = '"+usuarioActivo.kmAnuales+"' AND u.usoMayoritario='"+usuarioActivo.usoMayoritario+"'  WITH u,v CREATE (u)-[:LIKES]->(v)")
    .then(function(resultado){

        console.log("Relacion de me gusta creada")
        response.send();

     })
    .catch(function(error){
        console.log(error);
    }) 

});





app.get('/traerFColab', (request, response) => {


    if(usuarioActivo.discapacidad == true){
        session
        .run("MATCH (u:User) WITH u, collect(CASE u.residencia WHEN '"+usuarioActivo.residencia+"' THEN 2 ELSE 1 END) as residencia, collect(CASE u.edad WHEN '"+usuarioActivo.edad+"' THEN 2 ELSE 0 END) as edad, collect(CASE u.discapacidad WHEN "+usuarioActivo.discapacidad+" THEN 15 ELSE 0 END) as discapacidad, collect(CASE u.estiloconduccion WHEN '"+usuarioActivo.estiloconduccion+"' THEN 2 ELSE 0 END) as estiloConduccion, collect(CASE u.condFamiliares WHEN '"+usuarioActivo.condFamiliares+"' THEN 2 ELSE 0 END) as condFamiliares, collect(CASE u.kmAnuales WHEN '"+usuarioActivo.kmAnuales+"' THEN 2 ELSE 0 END) as kms,  collect(CASE u.usoMayoritario WHEN '"+usuarioActivo.usoMayoritario+"' THEN 2 ELSE 0 END) as usoMayoritario with u, gds.alpha.similarity.cosine([2,2,15,2,2,2,2], residencia+edad+discapacidad+estiloConduccion+condFamiliares+kms+usoMayoritario) as cosineSimilarity WHERE cosineSimilarity >= 0.94 WITH u MATCH (u:User)-[:LIKES]->(v:Vehicle), (v:Vehicle)-[:USES]->(f:Fuel), (v:Vehicle)-[:IS]->(g:Gears), (v:Vehicle)-[:HAS_NUM_DOORS]->(n:Doors), (v:Vehicle)-[:PROFESSIONAL_SELLER]->(s:Seller) RETURN DISTINCT v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type ORDER BY v.popularity DESC")
        .then(function(resultado){

            var arrayCoches = [];
                        resultado.records.forEach(function(instancia){
                            coche = {
                            color : instancia._fields[0],
                            year : parseInt(instancia._fields[1]),
                            tel_num : instancia._fields[2],
                            version : instancia._fields[3],
                            kms : parseInt(instancia._fields[4]),
                            price_financed : instancia._fields[5],
                            province : instancia._fields[6],
                            price : parseInt(instancia._fields[7]),
                            dealer : instancia._fields[8],
                            model : instancia._fields[9],
                            power : parseInt(instancia._fields[10]),
                            adv_date : instancia._fields[11],
                            make : instancia._fields[12],
                            fuel : instancia._fields[13],
                            gearChange : instancia._fields[14],
                            popularity :  parseInt(instancia._fields[15]),
                            doors :  instancia._fields[16],
                            isProfessionalSeller :  instancia._fields[17]
                            }
            
                            arrayCoches.push(coche)

                        });
                        response.send(JSON.stringify(arrayCoches))

            
                    
        })
        .catch(function(error){
            console.log(error);
        }) 

    }else{

            session
            .run("MATCH (u:User) WITH u, collect(CASE u.residencia WHEN '"+usuarioActivo.residencia+"' THEN 2 ELSE 1 END) as residencia, collect(CASE u.edad WHEN '"+usuarioActivo.edad+"' THEN 2 ELSE 0 END) as edad, collect(CASE u.discapacidad WHEN "+usuarioActivo.discapacidad+" THEN 15 ELSE 0 END) as discapacidad, collect(CASE u.estiloconduccion WHEN '"+usuarioActivo.estiloconduccion+"' THEN 2 ELSE 0 END) as estiloConduccion, collect(CASE u.condFamiliares WHEN '"+usuarioActivo.condFamiliares+"' THEN 2 ELSE 0 END) as condFamiliares, collect(CASE u.kmAnuales WHEN '"+usuarioActivo.kmAnuales+"' THEN 2 ELSE 0 END) as kms,  collect(CASE u.usoMayoritario WHEN '"+usuarioActivo.usoMayoritario+"' THEN 2 ELSE 0 END) as usoMayoritario with u, gds.alpha.similarity.cosine([2,2,15,2,2,2,2], residencia+edad+discapacidad+estiloConduccion+condFamiliares+kms+usoMayoritario) as cosineSimilarity WHERE cosineSimilarity >= 0.96 WITH u MATCH (u:User)-[:LIKES]->(v:Vehicle), (v:Vehicle)-[:USES]->(f:Fuel), (v:Vehicle)-[:IS]->(g:Gears), (v:Vehicle)-[:HAS_NUM_DOORS]->(n:Doors), (v:Vehicle)-[:PROFESSIONAL_SELLER]->(s:Seller) RETURN DISTINCT v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type ORDER BY v.popularity DESC")
            .then(function(resultado){

                var arrayCoches = [];
                            resultado.records.forEach(function(instancia){
                                coche = {
                                color : instancia._fields[0],
                                year : parseInt(instancia._fields[1]),
                                tel_num : instancia._fields[2],
                                version : instancia._fields[3],
                                kms : parseInt(instancia._fields[4]),
                                price_financed : instancia._fields[5],
                                province : instancia._fields[6],
                                price : parseInt(instancia._fields[7]),
                                dealer : instancia._fields[8],
                                model : instancia._fields[9],
                                power : parseInt(instancia._fields[10]),
                                adv_date : instancia._fields[11],
                                make : instancia._fields[12],
                                fuel : instancia._fields[13],
                                gearChange : instancia._fields[14],
                                popularity :  parseInt(instancia._fields[15]),
                                doors :  instancia._fields[16],
                                isProfessionalSeller :  instancia._fields[17]
                                }
                
                                console.log(coche)
                                arrayCoches.push(coche)

                            });
                            response.send(JSON.stringify(arrayCoches))

                
                        
            })
            .catch(function(error){
                console.log(error);
            })    

        }


});


arrayCochesRecomendados = [];
arrayCochesNoGustan = [];


app.get('/traerPersonalizados', (request, response) => {

    arrayCochesRecomendados = [];
    arrayCochesNoGustan = [];

    var estiloConduccion = usuarioActivo.estiloconduccion; //150cv minimo decidida; pausada sin problemas de caballos
    var condicionesFamiliares = usuarioActivo.condFamiliares; //con hijos 5 puertas o 4; pareja o solterosn restriccion
    var KilometrajeAnual = usuarioActivo.kmAnuales; //los dos primeros tramos gasolina, el tercero gasoil o gasolina y el cuarto gasoil
    var usoMayoritario = usuarioActivo.usoMayoritario; //extraurbano meto gas, urbano meto híbridos y eléctricos

    var potencia;
    var puertas;
    var combustible;
    var combAlt;


    if(estiloConduccion == 'Conducción Decidida'){
        potencia = 150;
    }else{
        potencia = 0;
    }
     

    if(condicionesFamiliares == 'Con Hijos'){
        puertas = ["'4'","'5'"];
    }else{
        puertas = ["'2'","'3'","'4'","'5'"];
    }


    if(KilometrajeAnual == 'Menos de 10.000' || KilometrajeAnual == '10.000 - 20.000'){
        combustible = ["'Gasolina'"];
    }else if(KilometrajeAnual == '20.000 - 25.000'){
        combustible = ["'Gasolina'", "'Diésel'"];
    }else{
        combustible = ["'Diésel'"];
    }


    if(usoMayoritario == 'Urbano'){
        combAlt = ["'Híbrido enchufable'","'Híbrido'", "'Eléctrico'"];
    }else{
        combAlt = ["'Gas natural (CNG)'", "'Gas licuado (GLP)'"];
    }



    if(usuarioActivo.discapacidad == true){
        //v.color in ['Blanco', 'Azul'] and

        //coches que no les gustan a usuarios similares (no van a ser muchos)
        //MATCH (u:User) WITH u, collect(CASE u.residencia WHEN 'uituityui' THEN 2 ELSE 1 END) as residencia, collect(CASE u.edad WHEN 'Joven (18-40 años)' THEN 2 ELSE 0 END) as edad, collect(CASE u.discapacidad WHEN true THEN 15 ELSE 0 END) as discapacidad, collect(CASE u.estiloconduccion WHEN 'Conducción Pausada' THEN 2 ELSE 0 END) as estiloConduccion, collect(CASE u.condFamiliares WHEN 'Soltero/Pareja' THEN 2 ELSE 0 END) as condFamiliares, collect(CASE u.kmAnuales WHEN 'Menos de 10.000' THEN 2 ELSE 0 END) as kms,  collect(CASE u.usoMayoritario WHEN 'Urbano' THEN 2 ELSE 0 END) as usoMayoritario with u, gds.alpha.similarity.cosine([2,2,15,2,2,2,2], residencia+edad+discapacidad+estiloConduccion+condFamiliares+kms+usoMayoritario) as cosineSimilarity WHERE cosineSimilarity >= 0.94  with u match (u)-[:DISLIKES]->(v) return v


        const session = driver.session();
        const promesa = session.run("MATCH (u:User) WITH u, collect(CASE u.residencia WHEN '"+usuarioActivo.residencia+"' THEN 2 ELSE 1 END) as residencia, collect(CASE u.edad WHEN '"+usuarioActivo.edad+"' THEN 2 ELSE 0 END) as edad, collect(CASE u.discapacidad WHEN "+usuarioActivo.discapacidad+" THEN 15 ELSE 0 END) as discapacidad, collect(CASE u.estiloconduccion WHEN '"+usuarioActivo.estiloconduccion+"' THEN 2 ELSE 0 END) as estiloConduccion, collect(CASE u.condFamiliares WHEN '"+usuarioActivo.condFamiliares+"' THEN 2 ELSE 0 END) as condFamiliares, collect(CASE u.kmAnuales WHEN '"+usuarioActivo.kmAnuales+"' THEN 2 ELSE 0 END) as kms,  collect(CASE u.usoMayoritario WHEN '"+usuarioActivo.usoMayoritario+"' THEN 2 ELSE 0 END) as usoMayoritario with u, gds.alpha.similarity.cosine([2,2,15,2,2,2,2], residencia+edad+discapacidad+estiloConduccion+condFamiliares+kms+usoMayoritario) as cosineSimilarity WHERE cosineSimilarity >= 0.94 with u match (u)-[:DISLIKES]->(v), (v)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) RETURN DISTINCT v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type")

        promesa.then(function(resultado){
    
                             resultado.records.forEach(function(instancia){
                                coche = {
                                   color : instancia._fields[0],
                                   year : parseInt(instancia._fields[1]),
                                   tel_num : instancia._fields[2],
                                   version : instancia._fields[3],
                                   kms : parseInt(instancia._fields[4]),
                                   price_financed : instancia._fields[5],
                                   province : instancia._fields[6],
                                   price : parseInt(instancia._fields[7]),
                                   dealer : instancia._fields[8],
                                   model : instancia._fields[9],
                                   power : parseInt(instancia._fields[10]),
                                   adv_date : instancia._fields[11],
                                   make : instancia._fields[12],
                                   fuel : instancia._fields[13],
                                   gearChange : instancia._fields[14],
                                   popularity :  parseInt(instancia._fields[15]),
                                   doors :  instancia._fields[16],
                                   isProfessionalSeller :  instancia._fields[17]
                                }
                 
                                arrayCochesNoGustan.push(coche.version)
                                

    
                            });
                            session.close();




                                //de los coches recomendados quito los que no gustan
                                
                                        //coches que por filtrado de contenido me recomienda
                                        //MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WHERE v.power >= 0 and (f.name in ['Gasolina'] or f.name in ['Híbrido enchufable','Híbrido','Eléctrico']) and n.num in ['2','3','4','5'] RETURN v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type
                                
                                        
                                        
                                        const session1 = driver.session();
                                        const promesa1 = session1.run("MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WHERE v.power >= "+potencia+" and (f.name in ["+combustible+"] or f.name in ["+combAlt+"]) and n.num in ["+puertas+"] RETURN DISTINCT v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type")
                                            
                                        promesa1.then(function(resultado){
                                    
                                                             resultado.records.forEach(function(instancia){
                                                                coche = {
                                                                   color : instancia._fields[0],
                                                                   year : parseInt(instancia._fields[1]),
                                                                   tel_num : instancia._fields[2],
                                                                   version : instancia._fields[3],
                                                                   kms : parseInt(instancia._fields[4]),
                                                                   price_financed : instancia._fields[5],
                                                                   province : instancia._fields[6],
                                                                   price : parseInt(instancia._fields[7]),
                                                                   dealer : instancia._fields[8],
                                                                   model : instancia._fields[9],
                                                                   power : parseInt(instancia._fields[10]),
                                                                   adv_date : instancia._fields[11],
                                                                   make : instancia._fields[12],
                                                                   fuel : instancia._fields[13],
                                                                   gearChange : instancia._fields[14],
                                                                   popularity :  parseInt(instancia._fields[15]),
                                                                   doors :  instancia._fields[16],
                                                                   isProfessionalSeller :  instancia._fields[17]
                                                                }
                                                 
                                                             //si el array de coches que no gustan lo incluye que no lo meta
                                                                if(!arrayCochesNoGustan.includes(coche.version)){
                                                                    arrayCochesRecomendados.push(coche)
                                                                }
                                    
                                                            });
                                
                                                            session1.close();

                                                            response.send(JSON.stringify(arrayCochesRecomendados))
                                    
                                                
                                                           
                                            })
                                            .catch(function(error){
                                                console.log(error);
                                            }) 
                                      
                                           
              

                
                           
            })
            .catch(function(error){
                console.log(error);
            })

    }else{

           //coches que no les gustan a usuarios similares (no van a ser muchos)
        //MATCH (u:User) WITH u, collect(CASE u.residencia WHEN 'uituityui' THEN 2 ELSE 1 END) as residencia, collect(CASE u.edad WHEN 'Joven (18-40 años)' THEN 2 ELSE 0 END) as edad, collect(CASE u.discapacidad WHEN true THEN 15 ELSE 0 END) as discapacidad, collect(CASE u.estiloconduccion WHEN 'Conducción Pausada' THEN 2 ELSE 0 END) as estiloConduccion, collect(CASE u.condFamiliares WHEN 'Soltero/Pareja' THEN 2 ELSE 0 END) as condFamiliares, collect(CASE u.kmAnuales WHEN 'Menos de 10.000' THEN 2 ELSE 0 END) as kms,  collect(CASE u.usoMayoritario WHEN 'Urbano' THEN 2 ELSE 0 END) as usoMayoritario with u, gds.alpha.similarity.cosine([2,2,15,2,2,2,2], residencia+edad+discapacidad+estiloConduccion+condFamiliares+kms+usoMayoritario) as cosineSimilarity WHERE cosineSimilarity >= 0.94  with u match (u)-[:DISLIKES]->(v) return v


        const session = driver.session();
        const promesa = session.run("MATCH (u:User) WITH u, collect(CASE u.residencia WHEN '"+usuarioActivo.residencia+"' THEN 2 ELSE 1 END) as residencia, collect(CASE u.edad WHEN '"+usuarioActivo.edad+"' THEN 2 ELSE 0 END) as edad, collect(CASE u.discapacidad WHEN "+usuarioActivo.discapacidad+" THEN 15 ELSE 0 END) as discapacidad, collect(CASE u.estiloconduccion WHEN '"+usuarioActivo.estiloconduccion+"' THEN 2 ELSE 0 END) as estiloConduccion, collect(CASE u.condFamiliares WHEN '"+usuarioActivo.condFamiliares+"' THEN 2 ELSE 0 END) as condFamiliares, collect(CASE u.kmAnuales WHEN '"+usuarioActivo.kmAnuales+"' THEN 2 ELSE 0 END) as kms,  collect(CASE u.usoMayoritario WHEN '"+usuarioActivo.usoMayoritario+"' THEN 2 ELSE 0 END) as usoMayoritario with u, gds.alpha.similarity.cosine([2,2,15,2,2,2,2], residencia+edad+discapacidad+estiloConduccion+condFamiliares+kms+usoMayoritario) as cosineSimilarity WHERE cosineSimilarity >= 0.96 with u match (u)-[:DISLIKES]->(v), (v)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) RETURN DISTINCT v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type")

        promesa.then(function(resultado){
    
                             resultado.records.forEach(function(instancia){
                                coche = {
                                   color : instancia._fields[0],
                                   year : parseInt(instancia._fields[1]),
                                   tel_num : instancia._fields[2],
                                   version : instancia._fields[3],
                                   kms : parseInt(instancia._fields[4]),
                                   price_financed : instancia._fields[5],
                                   province : instancia._fields[6],
                                   price : parseInt(instancia._fields[7]),
                                   dealer : instancia._fields[8],
                                   model : instancia._fields[9],
                                   power : parseInt(instancia._fields[10]),
                                   adv_date : instancia._fields[11],
                                   make : instancia._fields[12],
                                   fuel : instancia._fields[13],
                                   gearChange : instancia._fields[14],
                                   popularity :  parseInt(instancia._fields[15]),
                                   doors :  instancia._fields[16],
                                   isProfessionalSeller :  instancia._fields[17]
                                }
                 
                                arrayCochesNoGustan.push(coche.version)
                                

    
                            });
                            session.close();




                                //de los coches recomendados quito los que no gustan
                                
                                        //coches que por filtrado de contenido me recomienda
                                        //MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WHERE v.power >= 0 and (f.name in ['Gasolina'] or f.name in ['Híbrido enchufable','Híbrido','Eléctrico']) and n.num in ['2','3','4','5'] RETURN v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type
                                
                                        
                                        
                                        const session1 = driver.session();
                                        const promesa1 = session1.run("MATCH (v:Vehicle)-[:USES]->(f), (v)-[:IS]->(g), (v)-[:HAS_NUM_DOORS]->(n), (v)-[:PROFESSIONAL_SELLER]->(s) WHERE v.power >= "+potencia+" and (f.name in ["+combustible+"] or f.name in ["+combAlt+"]) and n.num in ["+puertas+"] RETURN DISTINCT v.color, v.year, v.tel_num, v.version, v.kms, v.price_financed, v.province, v.price, v.dealer, v.model, v.power, v.adv_date, v.make, f.name, g.type, v.popularity, n.num, s.type")
                                            
                                        promesa1.then(function(resultado){
                                    
                                                             resultado.records.forEach(function(instancia){
                                                                coche = {
                                                                   color : instancia._fields[0],
                                                                   year : parseInt(instancia._fields[1]),
                                                                   tel_num : instancia._fields[2],
                                                                   version : instancia._fields[3],
                                                                   kms : parseInt(instancia._fields[4]),
                                                                   price_financed : instancia._fields[5],
                                                                   province : instancia._fields[6],
                                                                   price : parseInt(instancia._fields[7]),
                                                                   dealer : instancia._fields[8],
                                                                   model : instancia._fields[9],
                                                                   power : parseInt(instancia._fields[10]),
                                                                   adv_date : instancia._fields[11],
                                                                   make : instancia._fields[12],
                                                                   fuel : instancia._fields[13],
                                                                   gearChange : instancia._fields[14],
                                                                   popularity :  parseInt(instancia._fields[15]),
                                                                   doors :  instancia._fields[16],
                                                                   isProfessionalSeller :  instancia._fields[17]
                                                                }
                                                 
                                                             //si el array de coches que no gustan lo incluye que no lo meta
                                                                if(!arrayCochesNoGustan.includes(coche.version)){
                                                                    arrayCochesRecomendados.push(coche)
                                                                }
                                    
                                                            });
                                
                                                            session1.close();

                                                            response.send(JSON.stringify(arrayCochesRecomendados))
                                                
                                                           
                                            })
                                            .catch(function(error){
                                                console.log(error);
                                            }) 
                                      
                                           
              

                
                           
            })
            .catch(function(error){
                console.log(error);
            })




    }
    
    

    
    });



        

    








//Ponemos a escuchar el servidor
app.listen(app.get('port') , () =>{
    console.log('El servidor se encuentra escuchando en el puerto', app.get('port'));
});

module.exports = app;