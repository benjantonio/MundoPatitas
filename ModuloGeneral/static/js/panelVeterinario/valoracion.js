/* =================== FUNCION VALORACION VETERINARIO ============= */

/* Llamo a la API con el ID del veterinario*/
let urlValoracion = `http://localhost:3000/valoracion/${1}`
fetch(urlValoracion)
  .then(response => response.json())
  .then(datos => verValoracion(datos))
  .catch(error => console.log(error))

/* Guardo valoración */
const verValoracion = (datos) => {
    /* Declaro valor inicial valoración*/
    let valoracion = 0;
    valoracion=datos[0].valoracion;

    const huellaActiva1 = document.querySelector("#huellaActiva1");
    const huellaActiva2 = document.querySelector("#huellaActiva2");
    const huellaActiva3 = document.querySelector("#huellaActiva3");
    const huellaActiva4 = document.querySelector("#huellaActiva4");
    const huellaActiva5 = document.querySelector("#huellaActiva5");
    const huellaInactiva1 = document.querySelector("#huellaInactiva1");
    const huellaInactiva2 = document.querySelector("#huellaInactiva2");
    const huellaInactiva3 = document.querySelector("#huellaInactiva3");
    const huellaInactiva4 = document.querySelector("#huellaInactiva4");
    const huellaInactiva5 = document.querySelector("#huellaInactiva5");
    const cantPatitas = document.querySelector("#cantPatitas");
    
    
    if ( valoracion >= 1 ){
        huellaActiva1.style = 'display:block;';
        huellaInactiva1.style = 'display:none;';
        cantPatitas.innerHTML = valoracion;
        if ( valoracion >= 2 ){
            huellaActiva2.style = 'display:block;';
            huellaInactiva2.style = 'display:none;';
        }
        if ( valoracion >= 3 ){
            huellaActiva3.style = 'display:block;';
            huellaInactiva3.style = 'display:none;';
        }
        if ( valoracion >= 4 ){
            huellaActiva4.style = 'display:block;';
            huellaInactiva4.style = 'display:none;';
        }
        if ( valoracion >= 5 ){
            huellaActiva5.style = 'display:block;';
            huellaInactiva5.style = 'display:none;';
        }
    }



}




