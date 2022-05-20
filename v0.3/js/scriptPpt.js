// Elementos para construir la ruta

const backend = 'http://localhost:8080/v1/' ;
const recurso = 'ppts' ;

var usuarioId ;

let pptId ;

let refTimer ;

let PptDto = {

    pptId: 0 ,
    nombre: '' ,
    cantidadDeUsuariosMinima: 0 ,
    cantidadDeUsuariosMaxima: 0 ,
    logotipo: '' ,
    usuarioId1: 0 ,
    eleccion1: '' ,
    usuarioId2: 0 ,
    eleccion2: '' ,
    ganador: 0

} ;

function cargaDatos () {

    usuarioId = sessionStorage.getItem ( 'usuarioId' ) ;

    PptDto.pptId = sessionStorage.getItem ( 'pptId' ) ;
    PptDto.nombre = sessionStorage.getItem ( 'nombre' ) ;
    PptDto.cantidadDeUsuariosMinima = sessionStorage.getItem ( 'cantidadDeUsuariosMinima' ) ;
    PptDto.cantidadDeUsuariosMaxima = sessionStorage.getItem ( 'cantidadDeUsuariosMaxima' ) ;
    PptDto.logotipo = sessionStorage.getItem ( 'logotipo' ) ;
    PptDto.usuarioId1 = sessionStorage.getItem ( 'usuarioId1' ) ;
    PptDto.eleccion1 = sessionStorage.getItem ( 'eleccion1' ) ;
    PptDto.usuarioId2 = sessionStorage.getItem ( 'usuarioId2' ) ;
    PptDto.eleccion2 = sessionStorage.getItem ( 'eleccion2' ) ;
    PptDto.ganador = sessionStorage.getItem ( 'ganador' ) ;

    console.log ( this.PptDto ) ;

} ;

const rock = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");

function juego(userOption){

    pptId = PptDto.pptId ;

    refTimer = setInterval ( obtenerResultados , 1000 ) ;

    let ruta = backend + recurso + '/' + pptId + "?usuarioId=" + this.usuarioId + "&action=eleccion&eleccion=" + userOption ;

    let peticion = new XMLHttpRequest();

    peticion.open("POST", ruta , true);

    peticion.setRequestHeader ( "Content-Type" , "application/json" ) ;
    peticion.setRequestHeader ( "Accept" , "application/json" ) ;

    peticion.send();

    

}


/*
 *
 * Función que inicia un temporizador para obtener el resultado del juego
 *
 */
function obtenerResultados () {

    let lanzador = new XMLHttpRequest () ;

    lanzador.onreadystatechange = terminaJuego ;

    lanzador.open ( 'GET' , backend + recurso + '/' + pptId , true) ;

    lanzador.setRequestHeader ( 'Content-Type' , 'application/json' ) ;
    lanzador.setRequestHeader ( 'Accept' , 'application/json' ) ;

    lanzador.send () ;

}


/*
 *
 * Función que al encontrar el resultado detiene el temporizador
 *
 */
function terminaJuego () {

    if ( this.readyState == 4 ) {

        let cuerpo = JSON.parse ( this.responseText ) ;

        if ( cuerpo.ganador !== 0 ) {

            clearInterval ( refTimer ) ;

            let election ;

            if ( cuerpo.usuarioId1 == usuarioId )
                election = cuerpo.eleccion1 ;

            else
                election = cuerpo.eleccion2 ;

            document.getElementById('user-img').setAttribute ( "src" , "./images/" + election + ".svg" ) ;

            resultText.innerHTML = "Escojiendo";

            if ( cuerpo.ganador == -1 )
                resultText.innerHTML = "Empate";

            else if ( cuerpo.ganador == usuarioId )
                    resultText.innerHTML = "¡Ganaste!";

            else
                    resultText.innerHTML = "¡Perdiste!";

        }
    }
}
