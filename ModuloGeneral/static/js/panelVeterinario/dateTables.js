

$(document).ready(function () {

    $('#example').DataTable({
        "aaSorting": [],
        columns: [
            { key: 'Id', sortable: false},
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

                    if (fechaCita.format('DD-MM-YYYY HH:mm') < fechaActual.format('DD-MM-YYYY HH:mm') && citaPendiente.estado === 'En Espera') {
                        $.ajax({
                            type: 'GET',
                            url: `http://localhost:3000/actualizar_Horas_Pendientes/${id_cita_pendiente}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
                            success: function (response) {
                                console.log("HE CAMBIADO EL ESTADO DE LA CITA ID:", citaPendiente.id_cita, fechaCita.format('DD-MM-YYYY HH:mm'))
                                btnActualizar.setAttribute("style", "display: flex;");
                                buscarTabla.setAttribute("style", "display:grid; grid-template-columns: auto auto auto; ")
                                activo = true;
                            }
                        })
                    } else {
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

const eliminar = async(id) => {
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









