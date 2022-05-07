function cargaTodo () {

    obtenerJuegos () ;
    obtenerCola () ;

}


function obtenerJuegos() {

    let peticion = new XMLHttpRequest();

    peticion.onreadystatechange = procesarJuegos;

    peticion.open("GET", "https://califas.mocklab.io/v1/juegos", true);

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

$("#btnbusqueda").click(function () {

    //btnBusqueda = document.querySelector("#txtBusqueda").value;
    //var id = document.getElementById("txtBusqueda").value;

    var valor = $("#txtBusqueda").val();

    //$('#spoti').attr("src","https://open.spotify.com/embed/playlist/5TVCWg6F2GvmsfWhJEPlzC");
    document.getElementById("spoti").setAttribute("src", "https://open.spotify.com/embed/playlist/5TVCWg6F2GvmsfWhJEPlzC");
    document.getElementById("spoti").contentWindow.location.reload();
});


function cargaplaylist() {

    var idplaylist = document.getElementById("txtbusqueda").value;

    if (idplaylist == "") {


    }

    document.getElementById("spoti").setAttribute("src", "https://open.spotify.com/embed/playlist/" + idplaylist);
    document.getElementById("spoti").contentWindow.location.reload();
}
