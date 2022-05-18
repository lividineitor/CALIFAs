var idVentanaGenerada = 0 ;

//const backend = 'https://califas.mocklab.io' ;

const backend = 'http://localhost:8080' ;
const recursoUsuarios = '/v1/usuarios' ;

const accionLogin = "/login"

/**
*
*   Dialogo de mensajes. Redirecciona los mensajes de error a los elementos HTML correspondientes
*
*   @param {string} tipo Tipo de mensaje emergente (alerta, error, éxtito, etc)
*   @param {string} mensaje Cadena con la información del mensaje
*
*/
function crearDialogo ( tipo , mensaje ) {

    let bandera = true ;
    let icono ;
    let boton ;

    /* validaciones necesarias */
    if ( typeof ( tipo ) !== "number" ) {
        bandera = false ;
        console.log ( "tipo: valor no permitido.\ntipo = number" ) ;
    }

    if ( typeof ( mensaje ) !== "string" || mensaje.length == 0 ) {
        bandera = false ;
        console.log ( "mensaje: valor no permitido.\nmensaje = string" ) ;
    }

    /* Muestra el mensaje emergente */
    if ( bandera ) {

        let idContenedor = gestorVentana.crearVentana ( "cuerpo" ) ;
        let ventana ;
        let ventanaInterna = gestorVentana.decorarVentana( idContenedor ) ;

        /* definimos ventana del mensaje */

        ventana = document.getElementById ( ventanaInterna ) ;
        ventana.setAttribute ( "style" , "width:400px;text-align:center;" ) ;

        /* imagen alerta */

        ventana.appendChild ( document.createElement ( "p" ) ) ;

        /* Definiendo imagen */
        switch ( tipo ) {

            /* Imagen error */
            case 0 :
                icono = '<i class="fa fa-exclamation-circle w3-xxlarge liv-text-red" ></i><br/><b>Error</b>' ;
            break ;

            /* Imagen alerta */
            case 1 :
                icono = '<i class="fa fa-exclamation-triangle w3-xxlarge liv-text-yellow" ></i><br/><b>Atención</b>' ;
            break ;

            /* Imagen éxito */
            case 2 :
                icono = '<i class="fa fa-check-circle w3-xxlarge liv-text-green" ></i><br/><b>Éxito</b>' ;
            break ;
        }

        ventana.childNodes[0].setAttribute ( "class" , "w3-content w3-margin liv-text-black" ) ;

        ventana.childNodes[0].innerHTML = icono ;

        /* mensaje */

        ventana.appendChild ( document.createElement ( "p" ) ) ;

        ventana.childNodes[1].setAttribute ( "class" , "w3-content w3-margin liv-text-black" ) ;

        ventana.childNodes[1].innerHTML = mensaje ;

        /* botón */

        /* definiendo contenido del botón */
        boton = "gestorVentana.eliminarVentana(" + idContenedor + ")" ;

        ventana.appendChild ( document.createElement ( "span" ) ) ;

        ventana.childNodes[2].setAttribute ( "class" , "w3-content w3-margin w3-round w3-tag liv-btn liv-btn-confirmation" ) ;
        ventana.childNodes[2].setAttribute ( "onclick" , boton ) ;

        ventana.childNodes[2].innerHTML = "Aceptar" ;

    }
}

/**
*
*   Crea un objeto gestor de ventanas
*
*/
class gestorVentana {

    /**
     *
     *  Crea una nueva etiqueta y la integra a un id definido
     *  @param {string} idPadre Id del selector al cual se le va a agregar el elemento
     *  @param {string} selector Selector que se va a agregar
     *  @param {string} idHijo  Id a asignar al selector hijo creado
     *
     */
    static crearElemento ( idPadre , selector , idHijo ) {

        let elementoTemporal = document.createElement ( selector ) ;
        elementoTemporal.setAttribute ( "id" , idHijo ) ;

        document.getElementById(idPadre).appendChild ( elementoTemporal ) ;

        return idHijo ;
    }

    /**
    *
    *   Crea una nueva ventana
    *   @param {string} selector Id del selector en donde vivirá la ventana
    *   @param {number} nombre Nombre de la ventana anterior, se incrementa el número en 1
    *   @return {string} Identificador de ventana o null de no haber más espacio
    *
    */
    static crearVentana ( selector ) {

        idVentanaGenerada ++ ;

        /* nombre con base en el tiempo en segundos */
        let nombre = idVentanaGenerada ;

        this.crearElemento ( selector , "div" , nombre ) ;

        /* regresa el identificador de la ventana */
        return nombre ;

    }

    /**
     *
     *  Crea los elementos para la ventana decorada
     *  @param {string} selector Selector de la ventana a decorar
     *  @return {string} Regresa el id de la ventana interna
     *
     */
    static decorarVentana ( selector ) {

        let ventanaInterna ;

        document.getElementById(selector).setAttribute ( "class" , "liv-pos-centro liv-scroll" ) ;
        document.getElementById(selector).setAttribute ( "style" , "background-color:rgba( 0 , 0 , 0 , 0.5 );height:100%;position:fixed;top:0;width:100%;z-index:10;" ) ;

        ventanaInterna = this.crearElemento ( selector , "div" , "ventana" + selector ) ;

        document.getElementById(ventanaInterna).setAttribute ( "class" , "liv-bg-white liv-ra" ) ;

        return ventanaInterna ;

    } ;

    /**
    *
    *   Elimina la ventana creada a partir de su identificador
    *   @param {string} identificador
    *
    */
    static eliminarVentana ( identificador ) {

        document.getElementById(identificador).remove () ;

    } ;

}

/**
 *
 *  Muestra la contraseña del campo pasado como argumento
 *
 *  @param {string} id Id del campo a cambiar
 */
function mostrarPass ( id ) {

    let selector = document.getElementById(id) ;
    let estado = selector.getAttribute ( "type" ) ;

    if ( estado == "text" ) {
        selector.setAttribute ( "type" , "password" ) ;
    }

    else {
        selector.setAttribute ( "type" , "text" ) ;
    }
}

// Elementos de login

/**
 *
 *  Valida que la información de usuario sea correcta y de ser así permite acceso al sistema
 *
 */
function validarUsuario () {

    let valido = true ;

    let usuarioNombre ;
    let usuarioPassword ;

    const usuario = document.getElementById ("usuarioForm") ;
    const password = document.getElementById ("passwordForm") ;

    // Validaciones necesarias
    if ( usuario.value == "" ) {
        crearDialogo ( 0 , "El usuario es obligatorio." ) ;
        valido = false ;
    }

    if ( password.value == "" ) {
        crearDialogo ( 0 , "La contraseña es obligatoria." ) ;
        valido = false ;
    }
    
    const login = new XMLHttpRequest () ;

    login.onreadystatechange = gestorRespuestaLogin ;



    if ( valido ) {

        usuarioCorreo = usuario.value ;
        usuarioPassword = password.value ;

        login.open ( "POST" , backend + recursoUsuarios + accionLogin, true ) ;
        login.setRequestHeader ( "Content-Type" , "application/json" ) ;
        login.setRequestHeader ( "Accept" , "application/json" ) ;

        login.send ( '{"email":"'+ usuarioCorreo + '","password":"' + usuarioPassword + '"}' ) ;
    }

} ;

/**
 *
 *  Función de callback.
 *  Gestiona la respuesta de la petición POST para el login del usuario.
 *
 */
function gestorRespuestaLogin () {
    
    if ( this.readyState == 4 ) {

        let cuerpoDelMensaje = JSON.parse ( this.responseText ) ;

        switch ( this.status ) {

            case 200 :
                sessionStorage.setItem ( "usuarioId" , cuerpoDelMensaje.usuarioId ) ;
                window.location.href = "./vistaPrincipal.html" ;
                break ;
                
            case 400 :
                crearDialogo ( 0 , "Solicitud mal construida." ) ;
                break ;
                
            case 401 :
            case 404 :
                crearDialogo ( 0 , "Usuario o password incorrectos." ) ;
                break ;
                
            case 409 :
                crearDialogo ( 0 , "La cuenta está activa." ) ;
                break ;
                
            case 500 :
                crearDialogo ( 0 , "Error interno del servidor." ) ;
                break ;
                
            case 501 :
                crearDialogo ( 0 , "Funcionalidad no implementada." ) ;
                break ;

            default :
                crearDialogo ( 0 , "Error desconocido." ) ;
        }
    }
} ;

// Elementos de registro

function registrarUsuario () {

    let valido = true ;

    const usuario = document.getElementById("usuarioForm") ;
    const email = document.getElementById("emailForm") ;
    const password = document.getElementById("passwordForm" ) ;
    const password2 = document.getElementById("password2Form" ) ;

    // Validaciones necesarias

    // Validación de usuario
    if ( usuario.value == "" ) {
        crearDialogo ( 0 , "El usuario es obligatorio." ) ;
        valido = false ;
    }

    // Validación de email
    if ( email.value == "" ) {
        crearDialogo ( 0 , "El correo es obligatorio." ) ;
        valido = false ;
    }

    else {

        if ( !esEmail ( email.value ) )
            crearDialogo ( 0 , 'Email inválido<br/>Ejemplo: "ejemplo@ejemplo.ejemplo"' ) ;
        }

    // Validación de contraseña
    if ( password.value == "" ) {
        crearDialogo ( 0 , "El password es obligatorio." ) ;
        valido = false ;
    }

    if ( password2.value == "" ) {
        crearDialogo ( 0 , "El password es obligatorio." ) ;
        valido = false ;
    }

    if ( password.value != password2.value ) {
        crearDialogo ( 0 , "Las contraseñas no coinciden." ) ;
        valido = false ;
    }

    const registrar = new XMLHttpRequest () ;

    registrar.onreadystatechange = gestorRespuestaRegistro ;

    if ( valido ) {

        registrar.open ( "POST" , backend + recursoUsuarios , true ) ;
        registrar.setRequestHeader ( "Content-Type" , "application/json" ) ;
        registrar.setRequestHeader ( "Accept" , "application/json" ) ;
        
        registrar.send ( '{"usuarioId": 0 ,"nombre": "' + usuario.value + '","email":"' + email.value + '","password":"' + password.value + '"}' ) ;
    }

}

function gestorRespuestaRegistro () {

   if ( this.readyState == 4 ) {

        switch ( this.status ) {

            case 201 :
                crearDialogo ( 2 , "Creación exitosa" ) ;
                window.location.href = "login.html" ;
                break ;

            case 400 :
                crearDialogo ( 0 , "Solicitud mal construida." ) ;
                break ;

            case 409 :
                crearDialogo ( 0 , "Usuario ya existente." ) ;
                break ;

            case 500 :
                crearDialogo ( 0 , "Error interno del servidor." ) ;
                break ;

            case 501 :
                crearDialogo ( 0 , "Funcionalidad no implementada." ) ;
                break ;

            default :
                crearDialogo ( 0 , "Error desconocido." ) ;

        }

    }
}

/**
 *
 *  Funciones accesorias
 * 
 */

function esEmail ( email ) {

    const regexEmail = /[^@]+@[^@]+\.[^@]+/;

    return regexEmail.test ( email ) ;

}
