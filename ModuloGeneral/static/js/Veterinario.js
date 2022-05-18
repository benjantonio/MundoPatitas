window.addEventListener('load', () => {
    obtenerVeterinarios()
})

const obtenerVeterinarios = async() => {
    try {
        res = await fetch(`http://localhost:3000/lista_veterinario`),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        console.log(json);

    } catch (error) {
        let message = err.statusText || "Ocurrio un error"

    }
}


const agregarVeterinario = async() => {
    try {
        let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    nombre: document.querySelector("#nombre").value,
                    correo: document.querySelector("#email").value,
                    celular: document.querySelector("#celular").value,
                    id_perfil: document.querySelector("#perfil").value,
                    id_cli: document.querySelector("#id_cli").value
                })
            },
            res = await fetch("http://localhost:3000/enviar_veterinario", options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Veterinario Agregado con Exito!!',
                showConfirmButton: false,
                timer: 1500

            })
            setTimeout(retrasarReload, 1500);
        }
    } catch (error) {
        console.log(error)

    }
};

const eliminarVet = (id, nombre) => {
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
            res = await fetch(`http://localhost:3000/eliminar_veterinario/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            location.reload();
        }
    } catch (error) {
        console.log(err)

    }
}

const obtenerVet = async(id) => {
    try {
        res = await fetch(`http://localhost:3000/veterinario/${id}`),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        console.log(json);
        document.querySelector(".txtNombre").value = json.nombre_completo
        document.querySelector(".txtCorreo").value = json.correo
        document.querySelector(".txtCelular").value = json.celular
        document.querySelector(".txtIdCli").value = json.id_cliente_id

    } catch (error) {
        console.log(error)

    }
}

function retrasarReload() {
    location.reload();
}