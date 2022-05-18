// Elementos para construir la ruta

const backend = 'http://localhost:8080/v1/' ;
const recurso = 'ppts/' ;

let pptId ;
let usuario ;


const PptDto = {
    pptId:0,
    nombre:"",
    usuario1:0,
    eleccion1:"",
    usuario2:0,
    eleccion2:"",
    ganador:0
};

function setPpt( Dto , miId ){
    this.PptDto.pptId = Dto.pptId;
    this.PptDto.nombre = Dto.nombre;
    this.PptDto.eleccion1 = Dto.eleccion1;
    this.PptDto.usuario2 = Dto.usuario2;
    this.PptDto.eleccion2 = Dto.eleccion2;
    this.PptDto.ganador = Dto.ganador;

    this.usuario = miId ;
}


const rock = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");

function juego(algo){

    let eleccion ;

    this.pptId = this.PptDto.pptId ;

    if ( usuario = this.PptDto.usuario1 )
        eleccion = this.PptDto.eleccion1 ;

    else
        eleccion = this.PptDto.eleccion2 ;


    let ruta = backend + recurso + pptId + "?usuarioId=" + usuario + "&accion=eleccion&eleccion=" + eleccion ;

    let peticion = new XMLHttpRequest();

    peticion.onreadystatechange = procesarJuegos;

    peticion.open("POST", ruta , true);

    peticion.setRequestHeader ( "Content-Type" , "application/json" ) ;

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
    if(this.status==204){

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
    } , 2000 ) ;
    }else{
        console.log(this.status);
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

