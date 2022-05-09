/* VARIABLES DE MENU RESPONSIVO */
const sideMenu = document.querySelector("aside");

    /* Botones Abrir / Cerrar Menú */
    const menuBtnCli = document.querySelector("#menu-btncli");
    const closeBtnCli = document.querySelector("#close-btncli");

/* VARIABLES PARA ABRIR TABS ( Son los botones del Menú y las vistas de los tabs)*/
    /* Yo */
    const yoBtn = document.querySelector("#yo-btn")
    const yoTab = document.querySelector("#tabYo")

    /* Mis Mascotas */
    const misMascotasBtn = document.querySelector("#misMascotas-btn")
    const misMascotasTab = document.querySelector("#tabMisMascotas")

    /* Historial Citas */
    const historialCitasBtn = document.querySelector("#historialCitas-btn")
    const historialCitasTab = document.querySelector("#tabHistorialCitas")

        /* Botón Abrir y Cerrar Detalle */
        const detalleCitaBtn = document.querySelector("#detalleCita-btn")
        const cerrarDetalleCitaBtn = document.querySelector("#cerrar-detalle-btn")

        /* Contenedores */
        const fondoDetalleCita = document.querySelector("#fondoDetalleCita") /* fondo oscuro transparente */
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
    menuBtnCli.addEventListener('click', () =>{
        sideMenu.style = 'display:block;';
    });

    /* Botón Cerrar Menú */
    closeBtnCli.addEventListener('click', () =>{
        sideMenu.style = 'display:none;';
    });

/* ============================================================================= */

/* MOSTRAR/OCULTAR TABS PANEL CLIENTE*/

    /* Ventana "Yo" */
    yoBtn.addEventListener('click', () =>{
        yoTab.style = 'display:block;'
        misMascotasTab.style = 'display:none;';
        historialCitasTab.style = 'display:none;';
    });

    /* Ventana "Mis Mascotas" */
    misMascotasBtn.addEventListener('click', () =>{
        misMascotasTab.style = 'display:block;';
        yoTab.style = 'display:none;'
        historialCitasTab.style = 'display:none;';
    });

    /* Ventana "Historial Citas" */
    historialCitasBtn.addEventListener('click', () =>{
        historialCitasTab.style = 'display:block;';
        misMascotasTab.style = 'display:none;';
        yoTab.style = 'display:none;'
    });

/* ============================================================================= */

/* FUNCIONES */

    /* Abrir detalle Cita su botón */
    detalleCitaBtn.addEventListener('click', () =>{
        fondoDetalleCita.setAttribute("style", "opacity: 1; display:block; ");
        contDetalleCita.setAttribute("style", "opacity: 1; display:block;");
    });

     /* Ocultar detalle Cita con click fuera */
    fondoDetalleCita.addEventListener('click', () =>{
        fondoDetalleCita.setAttribute("style", "opacity: 0; display:none;");
        contDetalleCita.setAttribute("style", "opacity: 0; display:none;");
    });

     /* Ocultar detalle Cita con click en botón Regresar */
     cerrarDetalleCitaBtn.addEventListener('click', () =>{
        fondoDetalleCita.setAttribute("style", "opacity: 0; display:none;");
        contDetalleCita.setAttribute("style", "opacity: 0; display:none;");
    });

     /* Valorar Veterinario en el Detalle */
        /* Valoracion = 1 */
        val1Btn.addEventListener('click', () =>{
            ventanaNoValorado.style = 'display:none;';
            ventanaValorado.style = 'display:block;';
        });
        /* Valoracion = 2 */
        val2Btn.addEventListener('click', () =>{
            ventanaNoValorado.style = 'display:none;';
            ventanaValorado.style = 'display:block;';
        });
        /* Valoracion = 3 */
        val3Btn.addEventListener('click', () =>{
            ventanaNoValorado.style = 'display:none;';
            ventanaValorado.style = 'display:block;';
        });
        /* Valoracion = 4 */
        val4Btn.addEventListener('click', () =>{
            ventanaNoValorado.style = 'display:none;';
            ventanaValorado.style = 'display:block;';
        });
        /* Valoracion = 5 */
        val5Btn.addEventListener('click', () =>{
            ventanaNoValorado.style = 'display:none;';
            ventanaValorado.style = 'display:block;';
        });

function enviarAnchoWeb(){
    let ancho = document.documentElement.clientWidth;

    if (ancho >=751){
        console.log("ANCHO ES MAYOR A 750")
        sideMenu.style = 'display:block;';
    }else{
        sideMenu.style = 'display:none;';
    }

}