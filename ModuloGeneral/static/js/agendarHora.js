var comuna = document.getElementById("comuna");
var centros = document.getElementById("centroA");
var veterinarios = document.getElementById("veterinario")
var btnContinuarApagado = document.querySelector(".btnContinuarApagado");
var btnContinuar = document.querySelector(".btnContinuar");
var mostrarcuadrito = document.querySelector(".cuadrito2");
var nombreVet = document.querySelector(".nombreVet");
var clinicaVet = document.querySelector(".clinicaVet");
var cantPatitas = document.querySelector(".cantPatitas");

var diaConsulta = document.getElementById("diaConsulta");
var horaConsulta = document.getElementById("horaConsulta");

var fotoVet = document.querySelector(".fotoVet");

let idCentroSelect;
let idComunaSelect;
let idVeterinarioSelect;
let idDiaConsulta;

var motivoConsulta = document.getElementById("consulta");
var mascota = document.getElementById("mascota");



/*CUANDO HAYA UN CAMBIO EN SELECT MOTIVO CONSULTA*/
motivoConsulta.addEventListener('change', () => {
    var hola = "hola mundo";

    mascota.disabled = false;
    console.log(hola.slice(1, 6));
})

/*CUANDO HAYA UN CAMBIO EN SELECT MASCOTA*/
mascota.addEventListener('change', () => {
    centros.disabled = false;
})

/****************************************************************************************************************************/
/********************************************** CENTROS Y VETERINARIOS ******************************************************/
/****************************************************************************************************************************/

/*CUANDO SE REALICE UN CAMBIO EN EL SELECT "CENTROS" (centroA EN HTML)*/
centros.addEventListener('change', () => {

    limpiarSelectFecha();
    limpiarSelectHoras();
    limpiarPatitas();
    limpiarInfoVet();

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
    var vetSeleccionado = veterinarios.options[veterinarios.selectedIndex].text;
    nombreVet.innerHTML = vetSeleccionado;

    fotoVet.setAttribute("style", "opacity: 1;");
    
    mostrarcuadrito.setAttribute("style", "display:block; ");
    limpiarSelectFecha();
    buscarFechas();
    mostrarValoracion();
});

/****************************************************************************************************************************/
/************************************************** FECHAS Y HORAS **********************************************************/
/****************************************************************************************************************************/
function fechaMenor(fechaMenor, fechaMayor) {

    if (fechaMenor < fechaMayor) {
        return true;
    } else {
        return false;
    }
}


/*CUANDO SE REALICE UN CAMBIO EN EL SELECT "veterinarios"*/
veterinarios.addEventListener('change', () => {

    limpiarSelectFecha();
    limpiarSelectHoras();
    limpiarPatitas();
    limpiarInfoVet();
});

function limpiarInfoVet(){
    fotoVet.setAttribute("style", "opacity: 0;");
    nombreVet.innerHTML = "";

}


function buscarFechas() {

    eliminarFechasVencidas();

    const listaFechasDisponibles = [];

    /* Guardo id de veterinario seleccionado */
    idVeterinarioSelect = veterinarios.value;

    /* Llamar horas disponible según veterinario seleccionado */
    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/fechasDisponibles/${idVeterinarioSelect}`,
            success: function (response) {
                console.log("RESCATE LAS HORAS DISPONIBLES")
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

                    /* extraigo fecha actual */
                    let date = new Date();
                    let output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();
                    console.log(output);

                    var fechaCita = moment(fila.fecha, "DD-MM-YYYY HH:mm").add(fila.hora.slice(0, 2), 'hours').add(fila.hora.slice(3), 'minutes');
                    var fechaActual = moment();

                    if (!existe && !fechaMenor(fechaCita.add(1, 'minutes'), fechaActual)) {
                        listaFechasDisponibles.push(fila.fecha)
                        console.log("AÑADI AL SELECT LA FECHA: ", fila.fecha)
                        $('#diaConsulta').append("<option value='" + fila.fecha + "'>" + fechaNueva + "</option>")
                    }
                });

                if (response.length == 0) {
                    $('#diaConsulta').append("<option value='sinFechas'>" + "No hay fechas disponibles" + "</option>")
                }


                buscarHoras();
            }
        })
    })
}

function eliminarFechasVencidas() {
    const listaCitasDisponibles = [];

    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/fechasDisponibles/${idVeterinarioSelect}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
            success: function (response) {
                $.each(response, function (indice, filaA) {
                    listaCitasDisponibles.push(filaA)
                });
                eliminarFecha(listaCitasDisponibles);
            }
        })
    });

}

function eliminarFecha(unaListaX) {
    unaListaX.forEach(citaDisponible => {
        var fechaCita = moment(citaDisponible.fecha, "DD-MM-YYYY HH:mm").add(citaDisponible.hora.slice(0, 2), 'hours').add(citaDisponible.hora.slice(3), 'minutes');
        var fechaActual = moment();
        var id_cita_disponible = citaDisponible.id_cita;



        if (fechaMenor(fechaCita.add(1, 'minutes'), fechaActual)) {
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/eliminar_cita_disponible/${id_cita_disponible}`,
                success: function (response) {
                    fechaCita.add(-1, 'minutes')
                    console.log("HE ELIMINADO LA CITA ID:", citaDisponible.id_cita, fechaCita.format('DD-MM-YYYY HH:mm'))
                }
            });

        } else {
            fechaCita.add(-1, 'minutes')
            console.log("No eliminé: ", fechaCita.format('DD-MM-YYYY HH:mm'))
        }
    });
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

/* =================== FUNCION VALORACION VETERINARIO ============= */

function limpiarPatitas() {
    const huellaActiva1 = document.querySelector("#huellaActiva1");
    const huellaActiva2 = document.querySelector("#huellaActiva2");
    const huellaActiva3 = document.querySelector("#huellaActiva3");
    const huellaActiva4 = document.querySelector("#huellaActiva4");
    const huellaActiva5 = document.querySelector("#huellaActiva5");
    const huellaInactiva1 = document.querySelector("#huellaInactiva1");
    const huellaInactiva2 = document.querySelector("#huellaInactiva2");
    const huellaInactiva3 = document.querySelector("#huellaInactiva3");
    const huellaInactiva4 = document.querySelector("#huellaInactiva4");
    const huellaInactiva5 = document.querySelector("#huellaInactiva5");


    const cantPatitas = document.querySelector("#cantPatitas");
    const msg1_valo = document.querySelector(".message-valoracion-1");
    const msg2_valo = document.querySelector(".message-valoracion-2");
    const desc1_valo = document.querySelector(".descripcion-valoracion-1");
    const desc2_valo = document.querySelector(".descripcion-valoracion-2");
    const desc3_valo = document.querySelector(".descripcion-valoracion-3");

    huellaActiva1.setAttribute("style", "display:none; ");
    huellaActiva2.setAttribute("style", "display:none; ");
    huellaActiva3.setAttribute("style", "display:none; ");
    huellaActiva4.setAttribute("style", "display:none; ");
    huellaActiva5.setAttribute("style", "display:none; ");

    huellaInactiva1.setAttribute("style", "display:none; ");
    huellaInactiva2.setAttribute("style", "display:none; ");
    huellaInactiva3.setAttribute("style", "display:none; ");
    huellaInactiva4.setAttribute("style", "display:none; ");
    huellaInactiva5.setAttribute("style", "display:none; ");

    msg1_valo.setAttribute("style", "display:none; ");
    msg2_valo.setAttribute("style", "display:none; ");
}

function mostrarValoracion() {

    /* Llamo a la API con el ID del veterinario*/

    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/valoracion/${idVeterinarioSelect}`,
            success: function (response) {

                /* Declaro valor inicial valoración*/
                let valoracion = 0;
                valoracion = response[0].valoracion;

                const huellaActiva1 = document.querySelector("#huellaActiva1");
                const huellaActiva2 = document.querySelector("#huellaActiva2");
                const huellaActiva3 = document.querySelector("#huellaActiva3");
                const huellaActiva4 = document.querySelector("#huellaActiva4");
                const huellaActiva5 = document.querySelector("#huellaActiva5");
                const huellaInactiva1 = document.querySelector("#huellaInactiva1");
                const huellaInactiva2 = document.querySelector("#huellaInactiva2");
                const huellaInactiva3 = document.querySelector("#huellaInactiva3");
                const huellaInactiva4 = document.querySelector("#huellaInactiva4");
                const huellaInactiva5 = document.querySelector("#huellaInactiva5");


                const cantPatitas = document.querySelector("#cantPatitas");
                const msg1_valo = document.querySelector(".message-valoracion-1");
                const msg2_valo = document.querySelector(".message-valoracion-2");
                const desc1_valo = document.querySelector(".descripcion-valoracion-1");
                const desc2_valo = document.querySelector(".descripcion-valoracion-2");
                const desc3_valo = document.querySelector(".descripcion-valoracion-3");



                msg1_valo.style = 'display:block;';
                desc1_valo.setAttribute("style", "display:none; ");
                desc2_valo.setAttribute("style", "display:none; ");
                desc3_valo.setAttribute("style", "display:none; ");

                huellaInactiva1.setAttribute("style", "display:block; ");
                huellaInactiva2.setAttribute("style", "display:block; ");
                huellaInactiva3.setAttribute("style", "display:block; ");
                huellaInactiva4.setAttribute("style", "display:block; ");
                huellaInactiva5.setAttribute("style", "display:block; ");

                if (valoracion >= 1) {
                    huellaActiva1.style = 'display:block;';
                    huellaInactiva1.style = 'display:none;';
                    cantPatitas.innerHTML = valoracion;

                    msg1_valo.style = 'display:none;';
                    msg2_valo.style = 'display:grid;';
                    desc1_valo.style = 'display:block; text-align:center;';

                    if (valoracion >= 2) {
                        huellaActiva2.style = 'display:block;';
                        huellaInactiva2.style = 'display:none;';
                        desc1_valo.style = 'display:none;';
                        desc2_valo.style = 'display:block; text-align:center;';
                    }
                    if (valoracion >= 3) {
                        huellaActiva3.style = 'display:block;';
                        huellaInactiva3.style = 'display:none;';
                    }
                    if (valoracion >= 4) {
                        huellaActiva4.style = 'display:block;';
                        huellaInactiva4.style = 'display:none;';
                        desc2_valo.style = 'display:none;';
                        desc3_valo.style = 'display:block; text-align:center;';
                    }
                    if (valoracion >= 5) {
                        huellaActiva5.style = 'display:block;';
                        huellaInactiva5.style = 'display:none;';
                    }
                }
            }
        })





    })









}