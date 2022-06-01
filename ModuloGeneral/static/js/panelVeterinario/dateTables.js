

$(document).ready(function () {

    $('#example').DataTable({
        "aaSorting": [],
        columns: [
            { key: 'Id', sortable: false },
            { key: 'Hora', sortable: true },
            { key: 'Fecha', sortable: true },
            { key: 'Motivo Consulta', sortable: true },
            { key: 'Mascota', sortable: true },
            { key: 'Dueño', sortable: true },
            { key: 'Estado', sortable: true },
            { key: 'Acción', sortable: false }
        ],



        responsive: true,

        "language": {

            "sProcessing": "Procesando...",
            "sLengthMenu": "Max. citas por página: _MENU_ ",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "No se encontraron citas registradas.",
            "sInfo": "Mostrando _END_ de un total de _TOTAL_ citas.",
            "sInfoEmpty": "Mostrando citas del 0 al 0 de un total de 0 citas.",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar",
            "sSearchInput": "form-control WAWAWA",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
    $('#example input').addClass('uwaso');

    $('<div id="btnActualizar" style="display:flex;"><button id="actualizar-Pendientes" class="actualizarPendientes" style="margin: 0 10px 8px 30px; background:#ff9812; border: 0px; border-radius:20px; color:white; padding:2px 10px; box-shadow: 0.6px 1px 10px 0.6px #ff9812;" >Actualizar</button><p style="text-align: right; margin:3px 0 8px 5px; color: #ff9812; text-shadow: 1px 1px 1px #00000020; z-index: 99;">¡1 Cita atrasada!</p></div><div></div>').appendTo('div.dataTables_filter');

    const buscarTabla = document.querySelector('.dataTables_filter')
    const btnActualizar = document.getElementById('btnActualizar');

    btnActualizar.setAttribute("style", "display: none;");
    btnActualizar.addEventListener('click', () => {
        location.reload();
    });


    function fechaMenor(fechaMenor, fechaMayor){
        
        if ( fechaMenor < fechaMayor){
            return true;
        }else{
            return false;
        }
    }

    activo = false;
    contador = 0;
    contador2 = 0
    parar = false;
    while (contador != 99998) {
        setTimeout(function () {
            console.log("\n[ITERACIÓN]");

            const listaCitasPendientes = [];

            $(function () {
                $.ajax({
                    type: 'GET',
                    url: `http://localhost:3000/lista_Horas_Pendientes/${1}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
                    success: function (response) {
                        $.each(response, function (indice, fila) {
                            listaCitasPendientes.push(fila)
                        });
                        cambiarEstadoAtrasada(listaCitasPendientes);
                    }
                })
            });

            function cambiarEstadoAtrasada(unaListaX) {
                unaListaX.forEach(citaPendiente => {
                    var fechaCita = moment(citaPendiente.fecha, "DD-MM-YYYY HH:mm").add(citaPendiente.hora.slice(0, 2), 'hours').add(citaPendiente.hora.slice(3), 'minutes');
                    var fechaActual = moment();
                    var id_cita_pendiente = citaPendiente.id_cita;



                    if ( fechaMenor(fechaCita.add(1, 'minutes'), fechaActual) && citaPendiente.estado === 'En Espera') {
                                        $.ajax({
                                            type: 'GET',
                                            url: `http://localhost:3000/actualizar_Horas_Pendientes/${id_cita_pendiente}`,
                                            success: function (response) {
                                                fechaCita.add(-1, 'minutes')
                                                console.log("HE CAMBIADO EL ESTADO DE LA CITA ID:", citaPendiente.id_cita, fechaCita.format('DD-MM-YYYY HH:mm'))
                                                btnActualizar.setAttribute("style", "display: flex;");
                                                buscarTabla.setAttribute("style", "display:grid; grid-template-columns: auto auto auto; ")
                                                activo = true;
                                            }
                                        });

                    }else{
                        fechaCita.add(-1, 'minutes')
                        console.log("En Espera: ", fechaCita.format('DD-MM-YYYY HH:mm'))
                    }



                });

            }

        }, contador * 3000);
        contador++
    }
    const rezise = () => {
        if (activo) {
            if (innerWidth < 1199) {
                buscarTabla.setAttribute("style", "display:grid; grid-template-columns: auto; ")
                console.log("LLEGUÉ Y CAMBIÉ EL DISPLAY A GRID 1")
            } else {
                buscarTabla.setAttribute("style", "display:grid; grid-template-columns: auto auto auto; ")
            }
        }
    }

    addEventListener('resize', rezise)
    addEventListener('DOMContentLoaded', rezise)

});

/* funcion alerta eliminar */
const eliminarCita = (id, fecha, hora) => {
    Swal.fire({
        position: 'center',
        icon: 'question',
        text: `¿Desea eliminar la siguiente cita: ${hora} / ${fecha}?`,
        showCancelButton: true,
        cancelButtonColor: '#FF3333',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar',
        confirmButtonColor: '#09d882'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminar(id)
        }
    })
}

/* funcion eliminar Cita Pendiente */
const eliminar = async (id) => {
    try {
        let options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
        },
            res = await fetch(`http://localhost:3000/eliminar_cita_pendiente/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cita eliminada con éxito.',
                showConfirmButton: true
            }).then((result) => {
                if (result.isConfirmed || swal.close) {
                    location.reload();
                }
            })
        }
    } catch (error) {
        console.log(err)

    }
}

/* ========== FUNCION VER CITA ============= */

/* TEXTOS VER CITA */
const fechaCitaPendiente = document.querySelector('.fechaCitaPendiente')
const motivoConsultaPendiente = document.querySelector('.motivoConsultaPendiente')
const nombreDuenoPendiente = document.querySelector('.nombreDuenoPendiente')
const contactoDueñoPendiente = document.querySelector('.contactoDueñoPendiente')
const nombreMascotaPendiente = document.querySelector('.nombreMascotaPendiente')
const edadMascotaPendiente = document.querySelector('.edadMascotaPendiente')
const tipoMascotaPendiente = document.querySelector('.tipoMascotaPendiente')
const razaMascotaPendiente = document.querySelector('.razaMascotaPendiente')
const ultimaCitaConcluida = document.querySelector('.ultimaCitaConcluida')

const contenidoIniciar = document.querySelector('.contenido-iniciar') /* INICIAR */
const contenidoIniciando = document.querySelector('.contenidoIniciando') /* INICIANDO */
const contenidoEnMarcha = document.querySelector('.contenidoEnMarcha') /* EN MARCHA */
const contadorIniciando = document.querySelector('.contadorIniciando')
const candado1 = document.getElementById('candado1')
const candado2 = document.getElementById('candado2')
const textoBloqueado1 = document.getElementById('textoBloqueado')
const textoBloqueado2 = document.getElementById('textoBloqueado2')
const titulo1 = document.getElementById('titulo-wrapper')
const titulo2 = document.getElementById('titulo-wrapper2')
const textAreaTratamiento = document.querySelector('.tratamientoVeterinario')
const textAreaComentario = document.querySelector('.comentarioVeterinario')



/* VENTANA VER CITA */
const fondoNegroBlur = document.querySelector("#fondoNegroBlur") /* fondo oscuro transparente */
const contenedorVerCita = document.querySelector(".contenedorDetalle") /* fondo oscuro transparente */

function cambiarUltimaCita(id_cliente, id_veterinario) {
    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/ultima_cita_concluida/${id_veterinario}/${id_cliente}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
            success: function (response) {
                var ultimaCita = null;
                ultimaCita = response[0].fecha + ' ' + response[0].hora + 'hrs'
                if (ultimaCita != null) {
                    ultimaCitaConcluida.innerHTML = ultimaCita;
                }
            }
        })
    });
}


/* === MOSTRAR VER CITA === */
estadoComenzarCita = false;
function verCita(id_cliente, id_veterinario, fecha_cita, hora_cita, motivo_cita, nombre_dueno, apellido_dueno, contacto_dueno, nombre_mascota, edad_mascota, tipo_mascota, raza_mascota) {

    /* TEXTOS */
    cambiarUltimaCita(id_cliente, id_veterinario);
    fechaCitaPendiente.innerHTML = fecha_cita + ' | ' + hora_cita
    motivoConsultaPendiente.innerHTML = motivo_cita
    nombreDuenoPendiente.innerHTML = nombre_dueno + ' ' + apellido_dueno
    contactoDueñoPendiente.innerHTML = contacto_dueno
    nombreMascotaPendiente.innerHTML = nombre_mascota
    edadMascotaPendiente.innerHTML = edad_mascota
    tipoMascotaPendiente.innerHTML = tipo_mascota
    razaMascotaPendiente.innerHTML = raza_mascota

    /* MUESTRO VENTANA */
    fondoNegroBlur.setAttribute("style", "opacity: 1; display:block;");
    contenedorVerCita.setAttribute("style", "opacity: 1; display:block;");
}
/* === FIN VER === */


/* === COMENZAR CITA === */
function comenzarCita() {
    estadoComenzarCita = true;
    contenidoIniciar.setAttribute("style", "opacity: 0; display:none;");
    contenidoIniciando.setAttribute("style", "opacity: 1; display:grid;");

    var contador3 = 1;
    while (contador3 <= 3) {
        setTimeout(function () {
            contadorIniciando.innerHTML = contadorIniciando.innerHTML - 1;
            enMarcha(contadorIniciando.innerHTML);
        }, contador3 * 1000);
        contador3++
    }

    /* EN MARCHA */
    function enMarcha(contadorIni) {
        if (contadorIni == '0') {
            empezarDetener("Empezar");
            contenidoIniciando.setAttribute("style", "opacity: 0; display:0;");
            contenidoEnMarcha.setAttribute("style", "opacity: 1; display:grid;");
            textoBloqueado1.innerHTML = "Desbloqueado"
            textoBloqueado2.innerHTML = "Desbloqueado"
            titulo1.setAttribute("style", "color:#09d882;");
            titulo2.setAttribute("style", "color:#09d882;");
            textAreaTratamiento.disabled = false;
            textAreaComentario.disabled = false;
            textAreaTratamiento.placeholder = "Escribe un tratamiento...";
            textAreaComentario.placeholder = "Escribe un comentario..."
            candado1.innerHTML = "lock_open"
            candado2.innerHTML = "lock_open"

        }
    }
    /* FIN MARCHA */
}
/* === FIN COMENZAR === */


/* - - - - - - - - */

/* Función Cerrar Cita */
function cerrarCita() {
    if (!estadoComenzarCita) {
        fondoNegroBlur.setAttribute("style", "opacity: 0; display:none;");
        contenedorVerCita.setAttribute("style", "opacity: 0; display:none;");
    }
}

/* Ocultar ventanas emergentes con click en FONDO NEGRO BLUR */
fondoNegroBlur.addEventListener('click', () => {
    cerrarCita();
});


/* =============================== FUNCIONES CRONOMETRO ================================== */
var inicio = 0;
var timeout = 0;

function empezarDetener(elemento) {
    if (timeout == 0) {
        // empezar el cronometro

        elemento.value = "Detener";

        // Obtenemos el valor actual
        inicio = vuelta = new Date().getTime();

        // iniciamos el proceso
        funcionando();
    } else {
        // detemer el cronometro

        elemento.value = "Empezar";
        clearTimeout(timeout);
        timeout = 0;
    }
}

function funcionando() {
    // obteneos la fecha actual
    var actual = new Date().getTime();

    // obtenemos la diferencia entre la fecha actual y la de inicio
    var diff = new Date(actual - inicio);

    // mostramos la diferencia entre la fecha actual y la inicial
    var result = LeadingZero(diff.getUTCHours()) + ":" + LeadingZero(diff.getUTCMinutes()) + ":" + LeadingZero(diff.getUTCSeconds());
    document.getElementById('crono').innerHTML = result;

    // Indicamos que se ejecute esta función nuevamente dentro de 1 segundo
    timeout = setTimeout("funcionando()", 1000);
}

/* Funcion que pone un 0 delante de un valor si es necesario */
function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : + Time;
}

/* ======= FIN CRONOMETRO ======= */


