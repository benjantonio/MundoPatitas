const listarComuna = (id, nombre_comuna => {
    try {
        let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    nombre_comuna: document.querySelector("#nombre").value,
                })
            },
            res = await fetch("http://localhost:3000/enviar_mascota", options),
            json = await res.json();

    } catch (error) {

    }
})