var centros = document.getElementById("centroA");
var veterinarios = document.getElementById("veterinario")
var btnContinuarApagado = document.querySelector(".btnContinuarApagado");
var btnContinuar = document.querySelector("#btnContinuar");

let idCentroSelect;


$(document).ready(function() {
    if (centros.length == 1) {
        centros.options[0].text = "¡Oh!, Aún no hay centros en tu comuna.";
        veterinarios.options[0].text = "Sin Veterinarios.";
    } else {
        centros.options[0].setAttribute("style", "display: none; ");
    }
});


centros.addEventListener('change', () => {

    idCentroSelect = centros.value;
    veterinarios.disabled = false;

    btnContinuar.setAttribute("style", "display:block; ");
    btnContinuarApagado.setAttribute("style", "display:none; ");


    /* FUNCIONES CON AJAX:
    Llamar a los veteriarios segun centro médico*/
    $(function() {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/veterinarioCentro/${idCentroSelect}`,
            success: function(response) {
                for (var i = 0; i < veterinarios.length; i++) {
                    if (veterinarios.options[i].text != "Selecciona un veterinario") {
                        veterinarios.remove(i)
                    }
                }
                $.each(response, function(indice, fila) {
                    $('#veterinario').append("<option value='" + fila.id_veterinario + "'>" + fila.nombre_completo + "</option>")
                });
            }
        })
    })
});