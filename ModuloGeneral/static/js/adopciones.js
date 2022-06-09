/*Crear Publicación*/
var form = document.querySelector("#formAdop")

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)

    fetch("http://localhost:3000/enviar_adopcion", {
            method: 'POST',
            body: formData
        })
        .then((res) => recargar())
        .catch((err) => ("Erorr ", err))
});

/*Eliminar publicacion */
const eliminarPublicacion = (id, nombre) => {
    Swal.fire({
        position: 'center',
        icon: 'question',
        text: `¿Desea eliminar la publicación de ${nombre}?`,
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
                method: "DELETE"
            },
            res = await fetch(`http://localhost:3000/eliminar_adopcion/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            location.reload();
        }
    } catch (error) {
        console.log(err)

    }
}

/*Recargar Pagina*/
const recargar = () => {
    console.log("Hecho")
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Publicación agregada con exito!!',
        showConfirmButton: false,
        timer: 1500
    })
    setTimeout(retrasarReload, 1500)
}

function retrasarReload() {
    location.reload();
}