let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//Asigan el texto en pantalla (Juego del numero secreto y digita un numero del 1 a n)
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Verifica si el numero digitado es correcto al numero secreto 
function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('ValorUsuario').value);
    //conprueba si el numero del usuarioi es correcto al numero aleatorio
    if (numeroDeUsuario == numeroSecreto) {
        //le comunica al usuario que adivino el numero 
        asignarTextoElemento('p',`Acertaste el numero en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }//el usuario no acerto
    //se le da pistas al usuario 
    else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El numero es menor');
        }else{
            asignarTextoElemento('p', 'El numero es mayor');
        }
        intentos++;
        limpiarCaja();
        return;
    }
}
//limpia la caja cada donde se dijita el numero que el usuario ponga 
function limpiarCaja() {
    document.querySelector('#ValorUsuario').value = '';
}
//Genera un numero aleatorio secreto
function generarNumeroSecreto() {
    let numeroGenrado = Math.floor(Math.random()*numeroMaximo+1);

    console.log(numeroGenrado);
    console.log(listaNumerosSorteados);
    //si ya sorteamos todos los numeros
    //comprueba si todos lo numero ya fueron sorteados --> [1,2,3,4,5,6,7,8,9,10]
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p',`Se han sorteados todos lo numeros`);
    }else{
    
        //Si el numero generado esta incluidio en la lista
        if (listaNumerosSorteados.includes(numeroGenrado)) {
            //recursividad
            //vuelve ha generar de nuevo un numero
            generarNumeroSecreto();
        }else{
            //si el numero aleatorio no ha sido sorteado entonces se agraga a la lista de los numeros sorteados
            listaNumerosSorteados.push(numeroGenrado);
            return numeroGenrado;
        }
    }
}

//Son ejecutadas al principio del juego 
//Se ejecutan cada que el usuario adivina el numero secreto
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del numero secreto');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}
/*Cada que el usuario presiona el boton de "Nuevo juego" se ejecuta esta accion ya que el usuario 
ha fallado en el intento*/
function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}
//ejecucion inicial
condicionesIniciales();

