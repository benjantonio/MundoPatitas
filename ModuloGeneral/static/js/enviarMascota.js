const obtenerMascota = async(id) => {
    try {
        res = await fetch(`http://localhost:3000/mascota/${id}`),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        console.log(json);
        document.querySelector(".txtNombre").value = json.nombre
        document.querySelector(".txtRaza").value = json.raza
        document.querySelector(".txtEdad").value = json.edad
        document.querySelector(".txtTipo").value = json.tipo
        document.querySelector(".txtIdCli").value = json.id_cliente_id

    } catch (error) {
        let message = err.statusText || "Ocurrio un error"

    }
}

window.addEventListener('load', () => {
    obtenerMascotas()
})

const obtenerMascotas = async() => {
    try {
        res = await fetch(`http://localhost:3000/lista_mascota`),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        console.log(json);

    } catch (error) {
        let message = err.statusText || "Ocurrio un error"

    }
}

const agregarMascota = async() => {
    try {
        let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    nombre: document.querySelector("#nombre").value,
                    tipo: document.querySelector("#tipo").value,
                    raza: document.querySelector("#raza").value,
                    edad: document.querySelector("#edad").value,
                    id_cli: document.querySelector("#dueño").value
                })
            },
            res = await fetch("http://localhost:3000/enviar_mascota", options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Mascota Agregada con Exito!!',
                showConfirmButton: false,
                timer: 1500

            })
            setTimeout(retrasarReload, 1500);
        }
    } catch (error) {
        let message = err.statusText || "Ocurrio un error"

    }
};

const eliminarMascota = (id, nombre) => {
    Swal.fire({
        position: 'center',
        icon: 'question',
        text: `¿Desea eliminar a ${nombre}?`,
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
            res = await fetch(`http://localhost:3000/eliminar_mascota/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            location.reload();
        }
    } catch (error) {
        console.log(err)

    }
}

const actualizarMascota = async(id) => {
    try {
        let options = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    nombre: document.querySelector(".txtNombre").value,
                    raza: document.querySelector(".txtRaza").value,
                    edad: document.querySelector(".txtEdad").value,
                    tipo: document.querySelector(".txtTipo").value,
                    id_cli: document.querySelector(".txtIdCli").value
                })
            },
            res = await fetch(`http://localhost:3000/actualizar_mascota/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Mascota Actualizada con Exito!!',
                showConfirmButton: false,
                timer: 1500

            })
            setTimeout(retrasarReload, 1500);
        }
    } catch (error) {
        console.log(error)

    }
}

const resetFormModal = () => {
    console.log("CERRAR")
    $("#formMascota").reset();
}

function retrasarReload() {
    location.reload();
}