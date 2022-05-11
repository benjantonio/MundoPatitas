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
                title: 'Mascota agregada con exito!!',
                showConfirmButton: false,
                timer: 1500

            })
            setTimeout(location.reload(), 2000);
        }
    } catch (error) {
        let message = err.statusText || "Ocurrio un error"

    }
};

const eliminarMascota = async(id) => {
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

const resetFormModal = () => {
    console.log("CERRAR")
    $("#formMascota").reset();
}

// const retrasoReload = () => {
//     console.log("funciona")
//     setTimeout(alert("pasaron 2 segundos"), 2000)
// }