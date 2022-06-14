var textAreaRes = document.querySelector('.respuestaForo')
const fondoNegroBlur = document.querySelector("#fondoNegroBlur2") /* fondo oscuro transparente */
const contenedorDetalle = document.querySelector("#contenedorPublicacion")

const creadorPublicacionTxt = document.querySelector(".creadorPublicacionTxt")
const cantPublicacionesTxt = document.querySelector(".cantPublicacionesTxt")
const fechaPublicacionTxt = document.querySelector(".fechaPublicacionTxt")
const tituloPublicacionTxt = document.querySelector(".tituloPublicacionTxt")
const descripcionPublicacionTxt = document.querySelector(".descripcionPublicacionTxt")



function enviarRespuesta(id_cliente, id_publicacion) {

    var fechaActual = moment().format("YYYY-MM-DD");
    var horaActual = moment().format("HH:mm:ss");
    var comentario;
    if (textAreaRes.innerHTML = "") {
        comenario = " ";
    } else {
        comentario = textAreaRes.value;
    }

    console.log("COMEN", comentario)
    try {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                fecha: fechaActual,
                hora: horaActual,
                comentario: comentario,
                id_cliente: id_cliente,
                id_publicacion: id_publicacion
            })
        },
            res = fetch(`http://localhost:3000/agregar_Respuesta_Foro/`, options),
            json = res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText }
    } catch (error) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            text: `Se ha agregado la respuesta.`,
            showCancelButton: false,
            cancelButtonColor: '#FF3333',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#09d882'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        })
    }
}

function abrirPublicacion(id_publicacion, creador, fecha, hora, titulo, descripcion) {
    console.log("PUBLICACION ABIERTA")

    creadorPublicacionTxt.innerHTML = creador;
    fechaPublicacionTxt.innerHTML = fecha + " " + hora;
    tituloPublicacionTxt.innerHTML = titulo;
    descripcionPublicacionTxt.innerHTML = descripcion;

    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/respuestas-publicacion/${id_publicacion}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
            success: function (response) {
                $.each(response, function (indice, fila) {


                    console.log("a")
                    $('#zona-respuestas').append("<p> eee</p")

                });
            }
        })
    });


    contenedorDetalle.setAttribute("style", "opacity: 1; display:block;");
    fondoNegroBlur.setAttribute("style", "opacity: 1; display:block;");
}

function cerrarPublicacion() {
    fondoNegroBlur.setAttribute("style", "opacity: 0; display:none;");
    contenedorDetalle.setAttribute("style", "opacity: 0; display:none;");

}