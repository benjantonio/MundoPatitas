var comuna = document.getElementById("comuna");
var centros = document.getElementById("centroA");
var veterinarios = document.getElementById("veterinario")
var btnContinuarApagado = document.querySelector(".btnContinuarApagado");
var btnContinuar = document.querySelector(".btnContinuar");
var mostrarcuadrito = document.querySelector(".cuadrito2");

let idCentroSelect;
let idComunaSelect;





centros.addEventListener('change', () => {

    idCentroSelect = centros.value;
    veterinarios.disabled = false;
    

    btnContinuar.setAttribute("style", "display:flex; ");
    btnContinuarApagado.setAttribute("style", "display:none; ");


    function limpiarSelectVeterinarios(){ 
    const elements = document.getElementById("veterinario").getElementsByTagName("option");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    /* FUNCIONES CON AJAX*/

    /*Llamar a los veterinarios segun centro médico*/
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

                limpiarSelectVeterinarios();

                $.each(response, function(indice, fila) {
                    $('#veterinario').append("<option value='" + fila.id_veterinario + "'>" + fila.nombre_completo + "</option>")
                });

                if( response.length == 0){
                    $('#veterinario').append("<option value='sinVet'>" + "No existen veterinarios" + "</option>")
                }
            }
        })
    })

    function mostrarcuadrito2(){
        mostrarcuadrito.setAttribute("style", "display:block; ");
        console.log("se esta mostrando la funcion btnContinuar")
    }
    
    btnContinuar.addEventListener('click', () =>{
        mostrarcuadrito2();
    })
    


});