$(document).ready(function () {

    $('#example').DataTable({

        columns: [
            { key: 'Id', sortable: true },
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
            "sSearch": "Buscar:",
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

    $('<div id="btnActualizar" style="display:flex;"><button id="actualizar-Pendientes" class="actualizarPendientes" style="margin: 0 10px 8px 30px; background:#ff9812; border: 0px; border-radius:20px; color:white; padding:2px 10px; box-shadow: 0.6px 1px 10px 0.6px #ff9812;" >Actualizar</button><p style="text-align: right; margin:3px 0 8px 5px; color: #ff9812; text-shadow: 1px 1px 1px #00000020; z-index: 99;">¡1 Cita atrasada!</p></div><div></div>').appendTo('div.dataTables_filter');

    const buscarTabla = document.querySelector('.dataTables_filter')
    const btnActualizar = document.getElementById('btnActualizar');

    btnActualizar.setAttribute("style", "display: none;");

    btnActualizar.addEventListener('click', () => {
        location.reload();
    });



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
                    var fechaCita = moment(citaPendiente.fecha, "DD-MM-YYYY").add(citaPendiente.hora.slice(0, 2), 'hours').add(citaPendiente.hora.slice(3), 'minutes');
                    var fechaActual = moment();
                    var id_cita_pendiente = citaPendiente.id_cita;

                    if (fechaCita.format('DD-MM-YYYY LT') < fechaActual.format('DD-MM-YYYY LT') && citaPendiente.estado === 'En Espera') {
                        $.ajax({
                            type: 'GET',
                            url: `http://localhost:3000/actualizar_Horas_Pendientes/${id_cita_pendiente}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
                            success: function (response) {
                                console.log("HE CAMBIADO EL ESTADO DE LA CITA ID:", citaPendiente.id_cita)
                                btnActualizar.setAttribute("style", "display: flex;");
                                buscarTabla.setAttribute("style", "display:grid; grid-template-columns: auto auto auto; ")
                            }
                        })
                    } else {
                        console.log("En Espera: ", fechaCita.format('DD-MM-YYYY LT'))
                    }

                });

            }

        }, contador * 3000);
        contador++
    }
});












