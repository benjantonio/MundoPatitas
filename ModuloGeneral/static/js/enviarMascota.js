// // var form = document.querySelector("#formMascota");

// // form.addEventListener("submit", (event) => {
// //     event.preventDefault();

// //     id = 0
// //     nombre = document.querySelector("#nombre").value
// //     tipo = document.querySelector("#tipo").value
// //     raza = document.querySelector("#raza").value
// //     edad = document.querySelector("#edad").value

// //     console.log(nombre, tipo, raza, edad);

// //     var formData = new FormData();
// //     formData.append("id", 0)
// //     formData.append("nombre", nombre)
// //     formData.append("tipo", tipo)
// //     formData.append("raza", raza)
// //     formData.append("edad", edad)
// //         // formData.append("id_cli", id_cli)

// //     $.ajax({
// //         url: 'http://localhost:3000/enviar_mascota',
// //         type: 'POST',
// //         datatype: 'JSON',
// //         data: formData,
// //         success: function(data) {
// //             Swal.fire({
// //                 position: 'top-end',
// //                 icon: 'success',
// //                 title: 'Mascota agregada!',
// //                 showConfirmButton: false,
// //                 timer: 1500
// //             });
// //             console.log("Se creo la mascota ", data)
// //         },
// //         error() {
// //             Swal.fire({
// //                 position: 'top-end',
// //                 icon: 'error',
// //                 title: 'Mascota NO agregada!',
// //                 showConfirmButton: false,
// //                 timer: 1500
// //             });
// //         }
// //     });
// // })


// const agregarMascota = (id_cli) => {

//     id = 0


//     console.log(nombre, tipo, raza, edad, id_cli);

//     var formData = new FormData();
//     formData.append("id", 0)
//     formData.append("nombre", nombre)
//     formData.append("tipo", tipo)
//     formData.append("raza", raza)
//     formData.append("edad", edad)
//     formData.append("id_cliente_id", id_cli)


//     $.ajax({
//         url: 'http://localhost:3000/enviar_mascota',
//         method: 'POST',
//         datatype: 'JSON',
//         data: {
//             nombre: nombre,
//             tipo: tipo,
//             raza: raza,
//             edad: edad
//         },
//         processData: false,
//         contentType: false,
//         success: function(data) {
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'success',
//                 title: 'Mascota agregada!',
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//             console.log("Se creo la mascota ", data)
//         },
//         error() {
//             Swal.fire({
//                 position: 'top-end',
//                 icon: 'error',
//                 title: 'Mascota NO agregada!',
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         }
//     });

// };


const ajax = (options) => {
    let { url, method, success, console, error, data } = options;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", e => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            let json = JSON.parse(xhr.responseText);
            success(json);
        } else {
            let message = xhr.statusText || "ERROR";
            error(`Error ${xhr.status}: ${message}`)
        }
    });
    xhr.open(method || "GET", url);
    xhr.setRequestHeader("Content-type", "application/json;charset=uft-8");
    xhr.send(JSON.stringify(data));
}

const agregarMascota = () => {
    nombre = document.querySelector("#nombre").value
    tipo = document.querySelector("#tipo").value
    raza = document.querySelector("#raza").value
    edad = document.querySelector("#edad").value
    id_cli = document.querySelector("#numero").value
    ajax({
        url: "http://localhost:3000/enviar_mascota",
        method: "POST",
        data: {
            nombre: nombre,
            tipo: tipo,
            raza: raza,
            edad: edad,
            id_cliente_id: id_cli
        },

    })
}