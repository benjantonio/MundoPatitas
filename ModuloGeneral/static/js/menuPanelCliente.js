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

    const detalleCitaBtn = document.querySelector("#detalleCita-btn")
    const detalleCita = document.querySelector("#detalleCita") /* ventana emergente del detalle de 1 cita */
    const contDetalleCita = document.querySelector("#contenedorCita")

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

    detalleCitaBtn.addEventListener('click', () =>{
        detalleCita.setAttribute("style", "opacity: 1; display:flex; ");
        contDetalleCita.setAttribute("style", "opacity: 1; display:flex; top:40%; transition: all 600ms ease;");
    });

     /* Ocultar detalle Cita con click fuera */
    detalleCita.addEventListener('click', () =>{
        detalleCita.setAttribute("style", "opacity: 0; display:none;");
        contDetalleCita.setAttribute("style", "opacity: 0; display:none;");
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