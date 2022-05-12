const CARA = "cara";
const CRUZ = "cruz";

const ganar = 0;
const perder = 1;

const caraBtn = document.getElementById("cara");
const cruzBtn = document.getElementById("cruz");
const resultText = document.getElementById("start-text");
const userImge = document.getElementById("user-img")
const machineImg = document.getElementById("machine-img");

caraBtn.addEventListener("click",()=>{
    play(CARA);
});

cruzBtn.addEventListener("click",()=>{
   play(CRUZ);
});

function play(userOption){
    const machineOption = calcMachineOption();
    const result = calcResult(userOption, machineOption);
    


    machineImg.src =  eleccion();

    function eleccion(){
        if(machineOption == CARA){
            return "https://m.media-amazon.com/images/I/51kEkau11GL._AC_SX450_.jpg";
        }else{
            return "https://img.freepik.com/vector-gratis/moneda-oro-1609-segovia-silueta-hecha-mano-cortada-laser_589800-67.jpg?w=740";
        }
    }
    

    switch(result){
        case ganar:
            resultText.innerHTML = "¡GANASTE!";
            break;
        case perder:
            resultText.innerHTML = "¡PERDISTE!"
             break;
    }
}
function calcMachineOption(){
    const number = Math.floor(Math.random()*2);
    switch(number){
        case 0:
            return CARA;
        case 1:
            return CRUZ;
    }
    
}
function calcResult(userOption, machineOption){
    if(userOption === machineOption){
        return ganar;
    }else{
        return perder;
    }
}
        
function obtenerJuegos(){
            
    let peticion = new XMLHttpRequest();
            
    peticion.onreadystatechange = procesarJuegos;

    peticion.open("GET","https://califas.mocklab.io/v1/juegos", true);
            
    peticion.send();

}
function procesarJuegos(){
            
console.log(this.status);

    let respuesta = JSON.parse(this.responseText);

    console.log(respuesta);
}
