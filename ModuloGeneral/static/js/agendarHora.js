var comuna = document.getElementById("comuna");
var centros = document.getElementById("centroA");
var veterinarios = document.getElementById("veterinario")
var btnContinuarApagado = document.querySelector(".btnContinuarApagado");
var btnContinuar = document.querySelector(".btnContinuar");
var mostrarcuadrito = document.querySelector(".cuadrito2");

var diaConsulta = document.getElementById("diaConsulta");
var horaConsulta = document.getElementById("horaConsulta");

let idCentroSelect;
let idComunaSelect;
let idVeterinarioSelect;
let idDiaConsulta;

/****************************************************************************************************************************/
/********************************************** CENTROS Y VETERINARIOS ******************************************************/
/****************************************************************************************************************************/

/*CUANDO SE REALICE UN CAMBIO EN EL SELECT "CENTROS" (centroA EN HTML)*/
centros.addEventListener('change', () => {

    /*Guardo la información que recibe el SELECT centroA y habilito el SELECT veterinarios*/
    idCentroSelect = centros.value;
    veterinarios.disabled = false;

    /*Limpio el SELECT veterinarios cuando no encuentra elementos*/
    function limpiarSelectVeterinarios() {
        const elements = document.getElementById("veterinario").getElementsByTagName("option");
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    /*Llamar a los veterinarios segun centro médico*/
    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/veterinarioCentro/${idCentroSelect}`,
            success: function (response) {
                for (var i = 0; i < veterinarios.length; i++) {
                    if (veterinarios.options[i].text != "Selecciona un veterinario") {
                        veterinarios.remove(i)
                    }
                }

                limpiarSelectVeterinarios();

                $.each(response, function (indice, fila) {
                    $('#veterinario').append("<option value='" + fila.id_veterinario + "'>" + fila.nombre_completo + "</option>")
                });

                if (response.length == 0) {
                    $('#veterinario').append("<option value='sinVet'>" + "No existen veterinarios" + "</option>")

                    btnContinuar.setAttribute("style", "display:none; ");
                    btnContinuarApagado.setAttribute("style", "display:flex; ");

                    mostrarcuadrito.setAttribute("style", "display:none; ");
                } else {
                    btnContinuar.setAttribute("style", "display:flex; ");
                    btnContinuarApagado.setAttribute("style", "display:none; ");
                }
            }
        })
    })

});
/* Limpiar Fechas */
function limpiarSelectFecha() {
    const elements = document.getElementById("diaConsulta").getElementsByTagName("option");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
};

btnContinuar.addEventListener('click', () => {
    mostrarcuadrito.setAttribute("style", "display:block; ");
    limpiarSelectFecha();
    buscarFechas();
});

/****************************************************************************************************************************/
/************************************************** FECHAS Y HORAS **********************************************************/
/****************************************************************************************************************************/





/*CUANDO SE REALICE UN CAMBIO EN EL SELECT "veterinarios"*/
veterinarios.addEventListener('change', () => {
    console.log("CHANGE VETERINARIO ACTIVO")
    limpiarSelectFecha();
    limpiarSelectHoras();
    buscarFechas();
});



function buscarFechas() {

    const listaFechasDisponibles = [];

    /* Guardo id de veterinario seleccionado */
    idVeterinarioSelect = veterinarios.value;

    /* Llamar horas disponible según veterinario seleccionado */
    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/fechasDisponibles/${idVeterinarioSelect}`,
            success: function (response) {

                var fechaNueva;

                $.each(response, function (indice, fila) {
                    if (fila.fecha.slice(3, 5) == "01") {
                        fechaNueva = fila.fecha.slice(0, 3) + "enero" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "02") {
                        fechaNueva = fila.fecha.slice(0, 3) + "febrero" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "03") {
                        fechaNueva = fila.fecha.slice(0, 3) + "marzo" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "04") {
                        fechaNueva = fila.fecha.slice(0, 3) + "abril" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "05") {
                        fechaNueva = fila.fecha.slice(0, 3) + "mayo" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "06") {
                        fechaNueva = fila.fecha.slice(0, 3) + "junio" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "07") {
                        fechaNueva = fila.fecha.slice(0, 3) + "julio" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "08") {
                        fechaNueva = fila.fecha.slice(0, 3) + "agosto" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "09") {
                        fechaNueva = fila.fecha.slice(0, 3) + "septiembre" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "10") {
                        fechaNueva = fila.fecha.slice(0, 3) + "octubre" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "11") {
                        fechaNueva = fila.fecha.slice(0, 3) + "noviembre" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "12") {
                        fechaNueva = fila.fecha.slice(0, 3) + "diciembre" + fila.fecha.slice(5, 11);
                    }


                    var existe = listaFechasDisponibles.some(fechaIn => fechaIn === fila.fecha);
                    if (!existe) {
                        listaFechasDisponibles.push(fila.fecha)
                        console.log("AGREGUE OPTION: -value:", fila.id_cita, "-fecha:", fechaNueva)
                        $('#diaConsulta').append("<option value='" + fila.fecha + "'>" + fechaNueva + "</option>")
                    }
                });

                console.log("La lista es", listaFechasDisponibles)

                if (response.length == 0) {
                    $('#diaConsulta').append("<option value='sinFechas'>" + "No hay fechas disponibles" + "</option>")
                }


                buscarHoras();
            }
        })
    })
}

/* Limpiar Horas */
function limpiarSelectHoras() {
    const elements = document.getElementById("horaConsulta").getElementsByTagName("option");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}



/*CUANDO SE REALICE UN CAMBIO EN EL SELECT "diaConsulta"*/
diaConsulta.addEventListener('change', () => {
    buscarHoras();
});

function buscarHoras() {
    idDiaConsulta = diaConsulta.value;
    horaConsulta.disabled = false;

    /*Listar horas disponibles según dia seleccionado*/
    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/horasDisponibles/${idDiaConsulta}/${idVeterinarioSelect}`,
            success: function (response) {

                limpiarSelectHoras();

                $.each(response, function (indice, fila) {
                    $('#horaConsulta').append("<option value='" + fila.id_cita + "'>" + fila.hora + "</option>")
                });

                if (response.length == 0) {
                    $('#horaConsulta').append("<option value='sinHoras'>" + "No existen horas disponibles" + "</option>")
                }
            }
        })
    })
}
