/* ZONA RESPONSIVA */
    const sideMenu = document.querySelector("aside");

    /* Botones Abrir / Cerrar Menú */
    const menuBtnCli = document.querySelector("#menu-btncli");
    const closeBtnCli = document.querySelector("#close-btncli");

/* ZONA TABS (Botones del Menú y las vistas)*/
    const yoBtn = document.querySelector("#yo-btn")
    const yoTab = document.querySelector("#tabYo")
    const misMascotasBtn = document.querySelector("#misMascotas-btn")
    const misMascotasTab = document.querySelector("#tabMisMascotas")
    const historialCitasBtn = document.querySelector("#historialCitas-btn")
    const historialCitasTab = document.querySelector("#tabHistorialCitas")

/* ======================================================================== */

/* BOTONES RESPONSIVOS */

    /* Botón Abrir Menú */
    menuBtnCli.addEventListener('click', () =>{
        sideMenu.style = 'display:block;';
    });

    /* Botón Cerrar Menú */
    closeBtnCli.addEventListener('click', () =>{
        sideMenu.style = 'display:none;';
    });

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

function enviarAnchoWeb(){
    let ancho = document.documentElement.clientWidth;

    if (ancho >=751){
        console.log("ANCHO ES MAYOR A 750")
        sideMenu.style.display = 'block';
    }

}