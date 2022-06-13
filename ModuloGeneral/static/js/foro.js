var textAreaRes = document.querySelector('.respuestaForo')



function enviarRespuesta(id_cliente, id_publicacion){

    var fechaActual = moment().format("YYYY-MM-DD");
    var horaActual = moment().format("HH:mm:ss");
    var comentario;
    if (textAreaRes.innerHTML = ""){
        comenario=" ";
    }else{
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