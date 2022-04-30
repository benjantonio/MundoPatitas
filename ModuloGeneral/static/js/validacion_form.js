var form = document.querySelector("#form");
var inputs = document.querySelectorAll("#form input");

const expresiones = {
    usuario: /^.{4,12}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    password: /^[a-zA-Z0-9]{8,50}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    celular: /^\d{9,9}$/,
    edad: /^\d{2,}$/,
    direccion: /^[a-zA-Z0-9]{8,50}$/,

}

const validacion = (e) => {
    switch (e.target.name) {
        case "username":
            validarCampo(expresiones.usuario, e.target, 'usuario')
            break;
        case "first_name":
            validarCampo(expresiones.nombre, e.target, 'nombre')
            break;
        case "email":
            validarCampo(expresiones.correo, e.target, 'correo')
            break;
        case "celular":
            validarCampo(expresiones.celular, e.target, 'celular')
            break;
        case "edad":
            validarEdad(expresiones.edad, e.target, 'edad')
            break;
        case "direccion":
            validarCampo(expresiones.direccion, e.target, 'direccion')
            break;
        case "comuna":
            validarSelect(e.target, 'direccion', 'valparaiso', 'metropolitana')
            break;
        case "perfil":
            validarSelect(e.target, 'perfil', 'cliente', 'centro')
            break;
    }
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.querySelector(`#${campo} input`).classList.add('border-succes')
        document.querySelector(`#${campo} input`).classList.remove('border-error')
        document.querySelector(`#${campo} span`).classList.add('oculto')
        document.querySelector(`#${campo} label`).classList.remove('label-err')
    } else {
        document.querySelector(`#${campo} input`).classList.add('border-error')
        document.querySelector(`#${campo} input`).classList.remove('border-succes')
        document.querySelector(`#${campo} span`).classList.remove('oculto')
        document.querySelector(`#${campo} label`).classList.add('label-err')
    }
}

const validarEdad = (expresion, input, campo) => {
    if (expresion.test(input.value) && input.value >= 18) {
        document.querySelector(`#${campo} input`).classList.add('border-succes')
        document.querySelector(`#${campo} input`).classList.remove('border-error')
        document.querySelector(`#${campo} span`).classList.add('oculto')
        document.querySelector(`#${campo} label`).classList.remove('label-err')
    } else {
        document.querySelector(`#${campo} input`).classList.add('border-error')
        document.querySelector(`#${campo} input`).classList.remove('border-succes')
        document.querySelector(`#${campo} span`).classList.remove('oculto')
        document.querySelector(`#${campo} label`).classList.add('label-err')
    }
}

const validarSelect = (input, campo, opcion1, opcion2) => {
    if (input.value == opcion1 || input.value == opcion2) {
        document.querySelector(`#${campo} input`).classList.add('border-succes')
        document.querySelector(`#${campo} input`).classList.remove('border-error')
        document.querySelector(`#${campo} span`).classList.add('oculto')
        document.querySelector(`#${campo} label`).classList.remove('label-err')
    } else {
        document.querySelector(`#${campo} input`).classList.add('border-error')
        document.querySelector(`#${campo} input`).classList.remove('border-succes')
        document.querySelector(`#${campo} span`).classList.remove('oculto')
        document.querySelector(`#${campo} label`).classList.add('label-err')
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validacion);
    input.addEventListener('blur', validacion);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

// $(document).ready(() => {
//     console.log('conectado')
// })