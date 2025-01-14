//SIMULADOR ENVIO DE EMAIL

document.addEventListener('DOMContentLoaded', () => {
    ////Evento-Contenedora que ejecuta cuando el DOM está listo (recomendable)

    //Selección HTML
    const formulario = document.querySelector('#formulario');
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const btnSumbit = document.querySelector('#btn-submit');
    const btnReset = document.querySelector('#btn-reset');
    const spinner = document.querySelector('#spinner');

    //Objeto Campos
    const campos = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Eventos
    cargarEventos();

    function cargarEventos() {
        inputEmail.addEventListener('blur', e => validar(e)); 
        /*
        inputEmail.addEventListener('blur', validar); 
        JavaScript permite inducir directamente los parametros, 
        es decir que las funciones implementan la asignación automática.
        */
        inputAsunto.addEventListener('blur', e => validar(e));

        inputMensaje.addEventListener('blur', e => validar(e));

        formulario.addEventListener('submit', e => enviarFormulario(e));

        btnReset.addEventListener('click', e => resetear(e));
    }

    //Funciones
    function validar(e) {
        const parent = e.target.parentElement; //= div contenedor
        const input = e.target.id;
        const value = e.target.value;
    
        if(value.trim() === '') {
            mostrarAlerta(parent, `El campo ${input} es obligatorio`);
            campos[input] = '';
            comprobarCampos(campos);
            return;
        }

        if(input === "email" && !validarEmail(value)) {
            mostrarAlerta(parent, `El email es incorrecto`);
            campos[input] = '';
            comprobarCampos(campos);
            return;
        }

        limpiarAlerta(parent);

        campos[input] = value.trim().toLowerCase();
        comprobarCampos(campos);
    }

    //--//
    function enviarFormulario(e) {
        e.preventDefault();
        
        spinner.classList.add('flex'); //Tailwind flex: Permite centrar el contenido
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetearFormulario();

            const alertExito = document.createElement('p');
            alertExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
            'font-bold', 'text-sm', 'uppercase');
            alertExito.textContent = 'Email enviado correctamente';

            formulario.appendChild(alertExito);

            setTimeout(() => {
                formulario.lastElementChild.remove();
            },2000)

        }, 2000);

        /*
        La función setTimeout() es una función que establece un temporizador 
        en milisegundos para ejecutar una función callback al finalizar dicho 
        temporizador. Dicho de otro modo, setTimeout() sirve para ejecutar una 
        función tras un periodo determinado.
        setTimeout(<función>, temporizador);
        Una función callback es una función que se pasa a otra función como un parametro.
        */
    }

    //--//
    function mostrarAlerta(parent, mensaje) {
        limpiarAlerta(parent);

        const error = document.createElement('p');
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center'); //Tailwind clases
        error.textContent = mensaje;

        parent.appendChild(error);
    }

    //--//
    function comprobarCampos(campos) {
        if(Object.values(campos).includes('')) {
            btnSumbit.classList.add('opacity-50');
            btnSumbit.disabled = true;
            return;
        }
        btnSumbit.classList.remove('opacity-50');
        btnSumbit.disabled = false; 
    }

    //--//
    function validarEmail(value) {
        const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; 
        /*
        Las expresiones regulares (RegEx) son una secuencia de caracteres que conforma un patrón de búsqueda 
        que usaremos para encontrar una o varias coincidencias en un texto. Esto nos permite comprobar 
        la validez de fechas, contraseñas, códigos postales, emails, entre otros formatos.
        RegEx correo: https://www.coderbox.net/blog/validar-email-usando-javascript-y-expresiones-regulares/
        */
       //.test(): Método Boolean que ejecuta una igualdad entre una expresión regular y una cadena especificada
        const resultado = validEmail.test(value);
        return resultado;
    }

    //--//
    function resetearFormulario() {
        campos.email = '';
        campos.asunto = '';
        campos.mensaje = '';

        formulario.reset(); //Los métodos submit(),reset() existen en el elemento <form></form>
        comprobarCampos(campos);
        eliminarAlertas(); //Utilizado en el botón reset
    }

    //--//
    function eliminarAlertas() {
        const alert1 = formulario.children[0];
        const alert2 = formulario.children[1];
        const alert3 = formulario.children[2];
        limpiarAlerta(alert1);
        limpiarAlerta(alert2);
        limpiarAlerta(alert3);
    }

    //--//
    function limpiarAlerta(parent) {
        if(parent.children[2]) {
            parent.removeChild(parent.children[2]);
        }
    }

    //--//
    function resetear(e) {
        e.preventDefault();
        resetearFormulario();
    }
});