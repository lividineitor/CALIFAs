var x;


    function buscarPartida() {
        var t = document.getElementById("demo").innerHTML;
        if(t=="0m 0s") {
            document.getElementById("btnBuscar").innerHTML = "Cancelar"
            // Set the date we're counting down to
            const alPulsarBoton = new Date().getTime();

            // Update the count down every 1 second
            x = setInterval(function() {

                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = now - alPulsarBoton;

                // Time calculations for days, hours, minutes and seconds
                //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result in the element with id="demo"
                document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";

            }, 1000);
        }
        else {
            clearInterval(x);
            document.getElementById("btnBuscar").innerHTML = "Buscar Partida"
            document.getElementById("demo").innerHTML = "0m 0s"
        }
        
    }

    function obtenerTurno(){
    	if (document.getElementById("btnBuscar").innerHTML != "Buscar Partida"){
        let peticion = new XMLHttpRequest();
        
        peticion.onreadystatechange = procesarTurno;
        
        peticion.open("POST", "https://califas.mocklab.io/v1/turno", true);
        
        peticion.send({"usuarioid":"1234", "juegoid":"1234"});
      }
    	
    
    }
    function procesarTurno(){
      if (this.readyState == 4 && this.status == 201) {
        console.log(this.status);
        console.log(this.responseText);
      }
      
  
    }

    var xmlhttp = new XMLHttpRequest();
    var url = "https://califas.mocklab.io/v1/cola";

    xmlhttp.onreadystatechange=function() {
      if (this.readyState == 4 && this.status == 201) {
        myFunction(this.responseText);
        console.log(this.status);
      }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    function myFunction(response) {
      var arr = JSON.parse(response);
      var i;
      var out = "";

      for(i = 0; i < arr.turnos.length; i++) {
        out += "<h3>Jugador: " + 
        arr.turnos[i].usuarioId +
        "</h3>";
      }
      // out += "</table>";
      document.getElementById("id01").innerHTML = out;
    }
    
    
    window.onload = function() {
      //obtenerCola();
    };
    	
    function obtenerCola(){
      let peticion = new XMLHttpRequest();
      
      peticion.onreadystatechange = procesarCola;
      
      peticion.open("GET", "https://califas.mocklab.io/v1/cola", true);
      peticion.send(null)
    }

    
    function procesarCola(){
      let urs = '{name: hola, }'
    	console.log(this.status);
      var json = JSON.stringify(this.responseText);
      //var json = JSON.parse(json);
      console.log(this.responseText);
      // document.getElementById("nombre").innerHTML = respuesta;
      // console.log(respuesta.juegos[0].nombre); 
    
    }