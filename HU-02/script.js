function cargaTodo () {
    setUsuario () ;


    //obtenerJuegoVolado () ;
    //obtenerJuegos () ;
    //obtenerCola () ;
}

    var usuarioActivo ;

function setUsuario () {

    usuarioActivo = localStorage.getItem( "usuarioId" ) ;
    console.log ( 'usuario-->' + usuarioActivo ) ;
    console.log ( Storage.length ) ;
}

function cerrarSesion ( usuarioId ) {

    let peticion = new XMLHttpRequest () ;

    peticion.onreadystatechange = manejoDeSesion ;

    peticion.open ( "POST" , "http://localhost:8080/v1/ppts" , true ) ;

    peticion.setRequestHeader ( "Content-Type" , "application/json" ) ;
    peticion.setRequestHeader ( "Accept" , "application/json" ) ;

    peticion.send ( '{"usuarioId1":1,"usuarioId2":2}' ) ;

}

function manejoDeSesion () {

    if ( this.readyState == 4 ) {
        if ( this.status == 200 )
            console.log ( "Éxito" ) ;

        else if ( this.status == 501 )
            console.log ( "que pex" ) ;
    }

}

function obtenerJuegos() {

    let peticion = new XMLHttpRequest();

    peticion.onreadystatechange = procesarJuegos;

    peticion.open("GET", "https://califas.mocklab.io/v1/juegos", true);
    //
    peticion.send();
    //peticion.send({"nombre":"fulanito", "email":"fulanito@de.tal", "password":"losFulanitosSonPersonas"});


}

function procesarJuegos() {

    console.log(this.status);

    var respuesta = JSON.parse(this.responseText);

    var i;
    let out = "<table>";

    for (i = 0; i < respuesta.juegos.length; i++) {
        out += "<tr><td>" +
            respuesta.juegos[i].nombre +
            "</td><td>" +
            "<img id = imgjuegos src= " + respuesta.juegos[i].logotipo + "></img>" +
            "</td></tr>";
    }
    out += "</table>";
    document.getElementById("juego").innerHTML = out;


    //document.getElementById("cola").innerHTML = respuesta.juegos[0].nombre;

    console.log(respuesta);
    console.log(out);

}

function obtenerCola () {

  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          obtenerCola();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}


function obtenerJuegoVolado () {

  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          obtenerJuegoVolado();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}





/*
function obtenerCola() {

    let peticioncola = new XMLHttpRequest();

    peticioncola.onreadystatechange = procesarCola;
    peticioncola.open("GET", "https://califas.mocklab.io/v1/cola", true);

    peticioncola.send();
    //peticion.send({"nombre":"fulanito", "email":"fulanito@de.tal", "password":"losFulanitosSonPersonas"});


}

function procesarCola() {



    console.log(this.status);

    var respuestacola = JSON.parse(this.responseText);
    console.log(respuestacola);

    var i;
    let out = "<table>";

    for (i = 0; i < 2; i++) {
        out += "<tr><td>" +
            respuestacola.turnos[i].usuarioId +
            "</td><td>" +
            respuestacola.turnos[i].estadoDelTurno +
            "</td></tr>";
    }
    out += "</table>";
    document.getElementById("cola").innerHTML = out;


    //document.getElementById("cola").innerHTML = respuesta.juegos[0].nombre;

    //console.log(respuestacola);
    console.log(out);

}

*/







function cargajuego() {


    document.getElementById("objetojuego").setAttribute("data", "../HU-06/index.html");
    document.getElementById("imgjuego").setAttribute("style", "display:none");
    //document.getElementById("contenedorgeneral").contentWindow.removeAttribute("imgjuego");
    //document.getElementById("juego").contentWindow.location.reload();

}


function cargaplaylist() {

  var idplaylist = document.getElementById("txtbusqueda").value;

  document.getElementById("spoti-widget").setAttribute("src", "https://open.spotify.com/embed/playlist/" + idplaylist);
  document.getElementById("spoti-widget").contentWindow.location.reload();
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


