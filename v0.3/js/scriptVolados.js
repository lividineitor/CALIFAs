const CARA = 0;
        const CRUZ = 1;

        const ganar = 0;
        const perder = 1;

        const caraBtn = document.getElementById("cara");
        const cruzBtn = document.getElementById("cruz");

        caraBtn.addEventListener("click",()=>{
            play(CARA);
        });
        cruzBtn.addEventListener("click",()=>{
            play(CRUZ);
        });

        function play(userOption){
            const machineOption = Math.floor(Math.random()*2);
            const result = calcResult(userOption, machineOption);

            switch(result){
                case ganar:
                    alert(machineOption + "ganaste");
                    break;
                case perder:
                    alert(machineOption + "perdiste");
                    break;
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