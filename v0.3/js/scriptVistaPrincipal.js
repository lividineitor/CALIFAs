// Variables del sistema

var usuarioActivo ;

var backend = 'http://localhost:8080/v1/' ;

var recursoJuegos = 'juegos' ;
var recursoPpt = 'ppts' ;
var recursoUsuarios = 'usuarios' ;
var recursoVolados ;


const JuegoDto = {

    juegoId: 0 ,
    nombre: "" ,
    juegoIdReferencia: "" ,
    cantidadDeUsuariosMinima: 0 ,
    cantidadDeUsuariosMaxima: 0 ,
    logotipo: "" ,
    esperaEntreTurnos: 0

} ;

const PptDto = {

    pptId: 1 ,
    nombre: 'Piedra, papel o tijeras' ,
    cantidadDeUsuariosMinima: 2 ,
    cantidadDeUsuariosMaxima: 2 ,
    logotipo: '' ,
    usuarioId1: 1 ,
    eleccion1: '' ,
    usuarioId2: 2 ,
    eleccion2: '' ,
    ganador: 0

} ;

var VoladosDto ;

var respuestaPpt = PptDto ;
var respuestaJuego ;
var respuestaVolados ;

var respuestaTurno ;

function cargaTodo () {

    // Valida si la sesión está activa o regresa a la página de login
    validarSesion () ;

}


// Valida que la sesión se encuentre activa
function validarSesion () {

    usuarioActivo = sessionStorage.getItem( "usuarioId" ) ;

    if ( usuarioActivo != null && usuarioActivo !== 0 && usuarioActivo !== undefined ) {

        getCatalogoDeJuegos () ;

    }

    else {

        window.location.href = "./login.html" ;

    }
}


// Cierra la sesión activa
function cerrarSesion ( usuarioId ) {

    if ( usuarioActivo != null && usuarioActivo !== 0 && usuarioActivo !== undefined ) {

        let peticion = new XMLHttpRequest () ;

        peticion.onreadystatechange = manejoDeSesion ;

        peticion.open ( "POST" , backend + recursoUsuarios + '/logout' , true ) ;

        peticion.setRequestHeader ( "Content-Type" , "application/json" ) ;
        peticion.setRequestHeader ( "Accept" , "application/json" ) ;

        peticion.send ( '{"usuarioId":' + usuarioActivo + '}' ) ;
    }

    else
        console.log ( "Error: No hay usuario activo." ) ;

}

function manejoDeSesion () {

    if ( this.readyState == 4 ) {

        sessionStorage.clear() ;
        window.location.href = './login.html' ;
        
        switch ( this.status ) {

            case 204 :
                console.log ( 'Petición cerrar sesión, estado ' + this.status ) ;
                break ;
        
            case 501 :
                console.log ( 'Error: Petición cerrar sesión, estado ' + this.status ) ;
        }
    }

}


// Carga la información de inicialización del juego al cargar la página
function cargaPpt() {

    const peticion = new XMLHttpRequest () ;

    peticion.open ( "POST" , backend + recursoPpt , true ) ;

    peticion.setRequestHeader ( "Content-Type" , "application/json" ) ;
    peticion.setRequestHeader ( "Accept" , "application/json" ) ;

    peticion.send ( '{"usuarioId1":1,"usuarioId2":2}' ) ;


    sessionStorage.setItem ( 'pptId' , respuestaPpt.pptId ) ;
    sessionStorage.setItem ( 'nombre' , respuestaPpt.nombre ) ;
    sessionStorage.setItem ( 'cantidadDeUsuariosMinima' , respuestaPpt.cantidadDeUsuariosMinima ) ;
    sessionStorage.setItem ( 'cantidadDeUsuariosMaxima' , respuestaPpt.cantidadDeUsuariosMaxima ) ;
    sessionStorage.setItem ( 'logotipo' , respuestaPpt.logotipo ) ;
    sessionStorage.setItem ( 'usuarioId1' , respuestaPpt.usuarioId1 ) ;
    sessionStorage.setItem ( 'eleccion1' , respuestaPpt.eleccion1 ) ;
    sessionStorage.setItem ( 'usuarioId2' , respuestaPpt.usuarioId2 ) ;
    sessionStorage.setItem ( 'eleccion2' , respuestaPpt.eleccion2 ) ;
    sessionStorage.setItem ( 'ganador' , respuestaPpt.ganador ) ;

    document.getElementById("objetojuego").setAttribute("data", "./ppt.html");
    document.getElementById("imgjuego").setAttribute("style", "display:none");
    document.getElementById("objetojuego").setAttribute("height", "inherit");
    document.getElementById("objetojuego").setAttribute("width", "inherit");

}

function cargaVolados() {


    document.getElementById("objetojuego").setAttribute("data", "./volados.html");
    document.getElementById("imgjuego").setAttribute("style", "display:none");
    document.getElementById("objetojuego").setAttribute("height", "inherit");
    document.getElementById("objetojuego").setAttribute("width", "inherit");

}


function cargaplaylist() {

  var idplaylist = document.getElementById("txtbusqueda").value;

  document.getElementById("spoti-widget").setAttribute("src", "https://open.spotify.com/embed/playlist/" + idplaylist);
  document.getElementById("spoti-widget").contentWindow.location.reload();
}


// Obtiene el catálog de juegos
function getCatalogoDeJuegos () {

    const peticion = new XMLHttpRequest () ;

    peticion.onreadystatechange = gestorCatalogo ;

    peticion.open ( "GET" , backend + recursoJuegos + '/catalogo' , true ) ;

    peticion.setRequestHeader ( "Content-Type" , "application/json" ) ;
    peticion.setRequestHeader ( "Accept" , "application/json" ) ;

    peticion.send () ;
}

function gestorCatalogo () {

    if ( this.readyState == 4 ) {

        switch ( this.status ) {

            case 200 :
                respuestaJuego = JSON.parse ( this.responseText ) ;
                break ;

            case 400 :
                console.log ( 'Error: Petición al recurso ' + recursoJuegos + ', estado ' + this.status ) ;

            default :
                console.log ( 'Error: Petición al recurso ' + recursoJuegos + ', estado ' + this.status ) ;
        }

    }

}


/* INICIO DEL CODIGO PARA PUBLICAR TWEEET */



function twitterPost() {

  const got = require('got');
  const crypto = require('crypto');
  const OAuth = require('oauth-1.0a');
  const qs = require('querystring');

  var consumer_key='oNLIVcpxA29G3CVKuqNLmsmZw';
  var consumer_secret='Tx3qUptabj9GV9OComnS13YKXMujrIRA5foCn8wI7G6HCBrcBA';

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });


  // The code below sets the consumer key and consumer secret from your environment variables
  // To set environment variables on macOS or Linux, run the export commands below from the terminal:
  // export CONSUMER_KEY='YOUR-KEY'
  // export CONSUMER_SECRET='YOUR-SECRET'
  //const consumer_key = process.env.CONSUMER_KEY;
  //const consumer_secret = process.env.CONSUMER_SECRET;


  // Be sure to add replace the text of the with the text you wish to Tweet.
  // You can also add parameters to post polls, quote Tweets, Tweet with reply settings, and Tweet to Super Followers in addition to other features.
  const data = {
    "text": "Hello world! This is my first tweet from JS"
  };

  const endpointURL = `https://api.twitter.com/2/tweets`;

  // this example uses PIN-based OAuth to authorize the user
  const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
  const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
  const accessTokenURL = 'https://api.twitter.com/oauth/access_token';
  const oauth = OAuth({
    consumer: {
      key: consumer_key,
      secret: consumer_secret
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
  });

  async function input(prompt) {
    return new Promise(async (resolve, reject) => {
      readline.question(prompt, (out) => {
        readline.close();
        resolve(out);
      });
    });
  }

  async function requestToken() {
    const authHeader = oauth.toHeader(oauth.authorize({
      url: requestTokenURL,
      method: 'POST'
    }));

    const req = await got.post(requestTokenURL, {
      headers: {
        Authorization: authHeader["Authorization"]
      }
    });
    if (req.body) {
      return qs.parse(req.body);
    } else {
      throw new Error('Cannot get an OAuth request token');
    }
  }


  async function accessToken({
    oauth_token,
    oauth_token_secret
  }, verifier) {
    const authHeader = oauth.toHeader(oauth.authorize({
      url: accessTokenURL,
      method: 'POST'
    }));
    const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}`
    const req = await got.post(path, {
      headers: {
        Authorization: authHeader["Authorization"]
      }
    });
    if (req.body) {
      return qs.parse(req.body);
    } else {
      throw new Error('Cannot get an OAuth request token');
    }
  }


  async function getRequest({
    oauth_token,
    oauth_token_secret
  }) {

    const token = {
      key: oauth_token,
      secret: oauth_token_secret
    };

    const authHeader = oauth.toHeader(oauth.authorize({
      url: endpointURL,
      method: 'POST'
    }, token));

    const req = await got.post(endpointURL, {
      json: data,
      responseType: 'json',
      headers: {
        Authorization: authHeader["Authorization"],
        'user-agent': "v2CreateTweetJS",
        'content-type': "application/json",
        'accept': "application/json"
      }
    });
    if (req.body) {
      return req.body;
    } else {
      throw new Error('Unsuccessful request');
    }
  }


  (async () => {
    try {
      // Get request token
      const oAuthRequestToken = await requestToken();
      // Get authorization
      authorizeURL.searchParams.append('oauth_token', oAuthRequestToken.oauth_token);
      console.log('Please go here and authorize:', authorizeURL.href);
      const pin = await input('Paste the PIN here: ');
      // Get the access token
      const oAuthAccessToken = await accessToken(oAuthRequestToken, pin.trim());
      // Make the request
      const response = await getRequest(oAuthAccessToken);
      console.dir(response, {
        depth: null
      });
    } catch (e) {
      console.log(e);
      process.exit(-1);
    }
    process.exit();
  })();

  /*FIN DEL CÓDIGO PARA PUBLICAR UN TWEET*/

}


