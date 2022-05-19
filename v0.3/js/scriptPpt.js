// Elementos para construir la ruta

const backend = 'http://localhost:8080/v1/' ;
const recurso = 'ppts' ;

var usuarioId ;

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

    let pptId = PptDto.pptId ;

    let ruta = backend + recurso + '/' + pptId + "?usuarioId=" + this.usuarioId + "&action=eleccion&eleccion=" + userOption ;

    let peticion = new XMLHttpRequest();

    peticion.open("POST", ruta , true);

    peticion.setRequestHeader ( "Content-Type" , "application/json" ) ;
    peticion.setRequestHeader ( "Accept" , "application/json" ) ;

    peticion.send();

}

function obtenerResultados () {

    let pptId = PptDto.pptId ;

    let ruta = backend + recurso + '/' + pptId ;

    let peticion = new XMLHttpRequest();

    peticion.onreadystatechange = procesarJuegos;

    peticion.open("GET", ruta , true);

    peticion.setRequestHeader ( "Content-Type" , "application/json" ) ;
    peticion.setRequestHeader ( "Accept" , "application/json" ) ;


    peticion.send();

}

/*function play(userOption) {
    if(isPlaying) return;

    isPlaying = true;

    userImg.src = "img/" + userOption + ".svg";

    resultText.innerHTML = "Escojiendo";

    const interval = setInterval(function(){
        const machineOption = calcMachineOption();
        machineImg.src = "img/" + machineOption + ".svg";
    }, 200);

    setTimeout(function () {

        clearInterval(interval);

        const machineOption = calcMachineOption();
        const result = calcResult(userOption, machineOption);

        machineImg.src = "img/" + machineOption + ".svg";

        switch (result) {
            case TIE:
                resultText.innerHTML = "Empate";
                break;
            case WIN:
                resultText.innerHTML = "¡Ganaste!";
                break;
            case LOST:
                resultText.innerHTML = "¡Perdiste!";
                break;
        }
        isPlaying = false;
    }, 2000);
}

function calcMachineOption() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}
//Codigo que es posible quitar
function calcResult(userOption, machineOption) {
    if (userOption === machineOption) {
        return TIE;

    } else if (userOption === ROCK) {

        if (machineOption === PAPER) return LOST;
        if (machineOption === SCISSORS) return WIN;

    } else if (userOption === PAPER) {

        if (machineOption === SCISSORS) return LOST;
        if (machineOption === ROCK) return WIN;

    } else if (userOption === SCISSORS) {

        if (machineOption === ROCK) return LOST;
        if (machineOption === PAPER) return WIN;

    }
}

//Hasta aqui se tiene que quitar

function cargaTodo () {

    obtenerJuegoPPT () ;


}*/


function procesarJuegos(){
    if(this.status==200){

        let backPpt = JSON.parse ( this.responseText ) ;

        let election ;

        if ( backPpt.usuarioId1 == usuarioId )
            election = backPpt.eleccion1 ;

        else
            election = backPpt.eleccion2 ;

        document.getElementById('user-img').setAttribute ( "src" , "./images/" + election + ".svg" ) ;

        resultText.innerHTML = "Escojiendo";

        if ( backPpt.ganador == -1 )
            resultText.innerHTML = "Empate";

        else if ( backPpt.ganador == usuarioId )
                resultText.innerHTML = "¡Ganaste!";

        else
                resultText.innerHTML = "¡Perdiste!";

        console.log ( backPpt.ganador ) ;
                console.log ( usuarioId ) ;


/*

    const interval = setInterval(function(){
        machineImg.src = "../images/" + PptDto. + ".svg";
    }, 200);

    setTimeout(function () {

        clearInterval(interval);

        const machineOption = calcMachineOption();
        const result = calcResult(userOption, machineOption);

        machineImg.src = "../images/" + machineOption + ".svg";

        switch (result) {
            case TIE:
                resultText.innerHTML = "Empate";
                break;
            case WIN:
                resultText.innerHTML = "¡Ganaste!";
                break;
            case LOST:
                resultText.innerHTML = "¡Perdiste!";
                break;
        }
        isPlaying = false;
    } , 2000 ) ;
    }else{
        console.log(this.status);*/
    }



}

/*function gestorRespuestaPpt () {

    console.log("paso por aqui");
    //if ( this.readyState == 4 ) {

        switch (this.status){
            case 204:
                console.log("La petición se ha completado con éxito pero su respuesta no tiene ningún contenido");
                break;
            case 404:
                console.log("Algun tipo de error");
                break;
            case 503:
                console.log("El servidor no está listo para manejar la petición.");
                break;
            default:
                console.log("Error desconocido");
                break;
        }
        console.log("Este es el estado " + this.status);
    //}
};*/

