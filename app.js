let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = []; //alamcena los numeros que se van sorteando para no repetir
let numeroMAximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el numero en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        //activar boton 'nuevo juego'
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {                                     //quitamos el deshabilitado
        //El usuario no acerto
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El numero secreto es menor');
        } else {
            asignarTextoElemento('p','El numero secreto es mayor');
        }

        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){ //borrar numeros ingresado en la pagina para ingresar otro
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMAximo)+1;  
    
    //Si ya sorteamos todos los numeros mostrar un mensaje
    if (listaNumerosSorteados.length == numeroMAximo){ //si estan todos
        asignarTextoElemento('p','Ya se sortearon todos los numeros posibles');

    } else {// sino hacer esto
          //Si el numero generado esta incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)){  ///recorre la lista para que no se repita
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado); //guardo el numero en la lista que no vuelva a salir
            return numeroGenerado;
        }
    }
}

//esta funcion me va a mostrar los mensajes, genera numero aleatorio y inicializa intentos
function condicionesIniciales() {
   asignarTextoElemento('h1', 'Jego del numero secreto');
   asignarTextoElemento('p',`Indica un numero del 1 al ${numeroMAximo}`);
   numeroSecreto = generarNumeroSecreto();
   intentos = 1;
}

function reiniciarJuego() {
   //Limpiar caja
   limpiarCaja();

   //Indicar mensaje de intervalo de numeros 
   //Generar el numero aleatorio 
   //Inicializar el numero intentos
   condicionesIniciales();

   //Deshabilitar el boton de nuevo juego
   document.querySelector('#reiniciar').setAttribute('disabled','true')
                         //boton en htm esta en id.  //volvemos a colocar el deshabilitado con un valor
}

condicionesIniciales();
