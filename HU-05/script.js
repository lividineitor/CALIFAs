const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const backend = 'http://localhost:8080' ;
const recursoPpt = '/v1/ppt' ;

const ppt = new XMLHttpRequest () ;
//ppt.onreadystatechange = gestorRespuestaPpt ;

const TIE = 0;
const WIN = 1;
const LOST = 2;

let isPlaying = false;

const PptDto = {
    pptId:0, 
    nombre:"",
    usuario1:0,
    eleccion1:"",
    usuario2:0,
    eleccion2:"",
    ganador:0
}; 

function setPpt(Dtp){
    this.PptDto.pptId = Dtp.pptId; 
    this.PptDto.nombre = Dtp.nombre; 
    this.PptDto.eleccion1 = Dtp.eleccion1; 
    this.PptDto.usuario2 = Dtp.usuario2;
    this.PptDto.eleccion2 = Dtp.eleccion2; 
    this.PptDto.ganador = Dtp.ganador;  
}


const rock = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");

function juego(algo){

    let ruta = "http://localhost:8080/v1/ppts/1?usuarioId=1&accion=eleccion&eleccion=";

    let peticion = new XMLHttpRequest();

    peticion.onreadystatechange = procesarJuegos;

    //peticion.open("POST", ruta + algo, true);
    peticion.open("POST", "http://localhost:8080/v1/ppts/1?usuarioId=2&action=eleccion&eleccion=tijeras", true);


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

