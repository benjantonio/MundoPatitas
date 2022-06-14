/* VARIABLES DE MENU RESPONSIVO */
const sideMenu = document.querySelector("aside");

/* Botones Abrir / Cerrar Menú */
const menuBtnCli = document.querySelector("#menu-btncli");
const closeBtnCli = document.querySelector("#close-btncli");

/* VARIABLES PARA ABRIR TABS ( Son los botones del Menú y las vistas de los tabs)*/
const fondoNegroBlur = document.querySelector("#fondoNegroBlur") /* fondo oscuro transparente */

/* Yo */
const yoBtn = document.querySelector("#yo-btn")
const yoTab = document.querySelector("#tabYo")

/* Mis Mascotas */
const misMascotasBtn = document.querySelector("#misMascotas-btn")
const misMascotasTab = document.querySelector("#tabMisMascotas")


const cerrarModPetBtn = document.querySelector(".btnModCerrar")

/* Imagenes Perfil Modificar Mascotas */
const perfilPerroImg = document.querySelector(".perfilPetPerro")
const perfilGatoImg = document.querySelector(".perfilPetGato")
const perfilExoticoImg = document.querySelector(".perfilPetExotico")

/* Botones Tipo de Mascota */
const tipoPetPerroBtn = document.querySelector(".tipoPerroBtn")
const tipoPetGatoBtn = document.querySelector(".tipoGatoBtn")
const tipoPetExoticoBtn = document.querySelector(".tipoExoticoBtn")

/*Mis adopciones */
const btnAdopciones = document.querySelector("#misAdopciones-btn")
const tabAdopciones = document.querySelector("#tabMisAdopciones")

/* Contenedores */
const contModPet = document.querySelector("#contenedorModPet") /* ventana del detalle */

/* Historial Citas */
const historialCitasBtn = document.querySelector("#historialCitas-btn")
const historialCitasTab = document.querySelector("#tabHistorialCitas")

/* Botón Abrir y Cerrar Detalle */
const detalleCitaBtn = document.querySelector("#detalleCita-btn")
const cerrarDetalleCitaBtn = document.querySelector("#cerrar-detalle-btn")

/* Contenedores */
const contDetalleCita = document.querySelector("#contenedorDetalle") /* ventana del detalle */

/* Contenedor Valoración */
const ventanaNoValorado = document.querySelector("#noValorado")
const ventanaValorado = document.querySelector("#valorado")

/* Botones de Valoración */
const val1Btn = document.querySelector("#voto1")
const val2Btn = document.querySelector("#voto2")
const val3Btn = document.querySelector("#voto3")
const val4Btn = document.querySelector("#voto4")
const val5Btn = document.querySelector("#voto5")

/* =================================================================================================================== */

/* BOTONES RESPONSIVOS */

/* Botón Abrir Menú */
menuBtnCli.addEventListener('click', () => {
    sideMenu.style = 'display:block;';
});

/* Botón Cerrar Menú */
closeBtnCli.addEventListener('click', () => {
    sideMenu.style = 'display:none;';
});

/* ============================================================================= */

/* MOSTRAR/OCULTAR TABS PANEL CLIENTE*/


/* ============================ YO =================================*/

/* Ventana "Yo" */
yoBtn.addEventListener('click', () => {
    yoTab.style = 'display:block;'
    misMascotasTab.style = 'display:none;';
    historialCitasTab.style = 'display:none;';
    tabAdopciones.style = 'display:none;'
});

// document.querySelector(".btn-modificar").addEventListener('click', () => {
//     document.querySelector(".editarUsuario").style = 'display: block;'
// })

// document.querySelector("#cerrarEditUsu").addEventListener('click', () => {
//     document.querySelector(".editarUsuario").style = 'display: none;'
// })

/* ======================= MIS MASCOTAS ============================*/

/* Ventana "Mis Mascotas" */
misMascotasBtn.addEventListener('click', () => {
    misMascotasTab.style = 'display:block;';
    tabAdopciones.style = 'display:none;'
    yoTab.style = 'display:none;'

});


/* Botón Abrir y Cerrar Modificar Mascotas */
// if (document.querySelector(".modificar-mascota-btn")) {
//     // const modificarPetBtn = document.querySelector(".modificar-mascota-btn")
//     const modificarPetBtns = document.querySelectorAll(".modificar-mascota-btn")
//     modificarPetBtns.forEach(modificarPetBtn => {
//         modificarPetBtn.addEventListener('click', () => {
//             contModPet.setAttribute("style", "opacity: 1; display:block;");
//         });
//     });
// }

/*Funciones Adopciones */
btnAdopciones.addEventListener('click', () => {
    console.log("adopciones")
    tabAdopciones.style = 'display:block;'
    yoTab.style = 'display:none;'
    misMascotasTab.style = 'display:none;';
})


/* FUNCIONES */
/* Abrir Modificar Mascota  */

/* Ocultar Modificar Mascota  */
// if (cerrarModPetBtn) {
//     cerrarModPetBtn.addEventListener('click', () => {
//         console.log("Cerrar")
//             // fondoNegroBlur.setAttribute("style", "opacity: 0; display:none; ");
//         contModPet.setAttribute("style", "opacity: 0; display:none;");
//     });
// }


/* Cambiar imagen tipo de mascota con botones */
// tipoPetPerroBtn.addEventListener('click', () => {
//     perfilPerroImg.setAttribute("style", "opacity: 1; display:inline; ");
//     perfilGatoImg.setAttribute("style", "opacity: 0; display:none; ");
//     perfilExoticoImg.setAttribute("style", "opacity: 0; display:none; ");
// });

// tipoPetGatoBtn.addEventListener('click', () => {
//     perfilGatoImg.setAttribute("style", "opacity: 1; display:inline; ");
//     perfilPerroImg.setAttribute("style", "opacity: 0; display:none; ");
//     perfilExoticoImg.setAttribute("style", "opacity: 0; display:none; ");
// });

// tipoPetExoticoBtn.addEventListener('click', () => {
//     perfilExoticoImg.setAttribute("style", "opacity: 1; display:inline; ");
//     perfilPerroImg.setAttribute("style", "opacity: o; display:none; ");
//     perfilGatoImg.setAttribute("style", "opacity: 0; display:none; ");

// });


// /* ======================= HISTORIAL DE CITAS ============================*/

// /* Ventana "Historial Citas" */
// historialCitasBtn.addEventListener('click', () => {
//     historialCitasTab.style = 'display:block;';
//     misMascotasTab.style = 'display:none;';
//     yoTab.style = 'display:none;'
// });



// /* FUNCIONES */
// /* Abrir detalle Cita su botón */
// detalleCitaBtn.addEventListener('click', () => {
//     fondoNegroBlur.setAttribute("style", "opacity: 1; display:block; ");
//     contDetalleCita.setAttribute("style", "opacity: 1; display:block;");
// });



// /* Ocultar detalle Cita con click en botón Regresar */
// cerrarDetalleCitaBtn.addEventListener('click', () => {
//     fondoNegroBlur.setAttribute("style", "opacity: 0; display:none;");
//     contDetalleCita.setAttribute("style", "opacity: 0; display:none;");
// });

// /* Valorar Veterinario en el Detalle */
// /* Valoracion = 1 */
// val1Btn.addEventListener('click', () => {
//     ventanaNoValorado.style = 'display:none;';
//     ventanaValorado.style = 'display:block;';
// });
// /* Valoracion = 2 */
// val2Btn.addEventListener('click', () => {
//     ventanaNoValorado.style = 'display:none;';
//     ventanaValorado.style = 'display:block;';
// });
// /* Valoracion = 3 */
// val3Btn.addEventListener('click', () => {
//     ventanaNoValorado.style = 'display:none;';
//     ventanaValorado.style = 'display:block;';
// });
// /* Valoracion = 4 */
// val4Btn.addEventListener('click', () => {
//     ventanaNoValorado.style = 'display:none;';
//     ventanaValorado.style = 'display:block;';
// });
// /* Valoracion = 5 */
// val5Btn.addEventListener('click', () => {
//     ventanaNoValorado.style = 'display:none;';
//     ventanaValorado.style = 'display:block;';
// });


/* Ocultar ventanas emergentes con click en FONDO NEGRO BLUR */
// fondoNegroBlur.addEventListener('click', () => {
//     fondoNegroBlur.setAttribute("style", "opacity: 0; display:none;");
//     contDetalleCita.setAttribute("style", "opacity: 0; display:none;");
//     contModPet.setAttribute("style", "opacity: 0; display:none;");
// });

function enviarAnchoWeb() {
    let ancho = document.documentElement.clientWidth;

    if (ancho >= 751) {
        console.log("ANCHO ES MAYOR A 750")
        sideMenu.style = 'display:block;';
    } else {
        sideMenu.style = 'display:none;';
    }

}