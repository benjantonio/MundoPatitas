var select = document.getElementById("centroA");
var btnContinuarApagado = document.querySelector(".btnContinuarApagado");
var btnContinuar = document.querySelector("#btnContinuar");

let idCentroSelect;

select.addEventListener('change', () => {
    /*
    btnContinuar.setAttribute("style", "display:block; ");
    btnContinuarApagado.setAttribute("style", "display:none; ");
    */
    console.log(select.value);
    idCentroSelect = select.value;

    /*Llamo a la API con el ID del centro pa buscar un veterinario*/
    let urlCentroVete = `http://localhost:3000/veterinarioCentro/${idCentroSelect}`
    fetch(urlCentroVete)
        .then(response => response.json())
        .then(datos => verCentroVete(datos))
        .catch(error => console.log(error))

    /*Guardo info */
    const verCentroVete = (datos) => {
        datos.forEach(element => {
            console.log(element.nombre_completo)
        });
    }

    /* REVISAR FUNCIONES CON AJAX */

    $(function() {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/veterinarioCentro/${idCentroSelect}`,
            success: function(response) {

                $.each(response, function(indice, fila) {
                    $('#veterinario').append("<option value='" + fila.id_veterinario + "'>" + fila.nombre_completo + "</option>")
                });
            }
        })
    })




});