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
