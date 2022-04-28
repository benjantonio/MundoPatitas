const sideMenu = document.querySelector("aside");
const misMascotasTab = document.querySelector(".tabMisMascotas")
const yoTab = document.querySelector(".tabPanelCliente")


const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const yoBtn = document.querySelector("#yo-btn")
const misMascotasBtn = document.querySelector("#misMascotas-btn")

menuBtn.addEventListener('click', () =>{
    sideMenu.style.display = 'block';
})

closeBtn.addEventListener('click', () =>{
    sideMenu.style = 'display:none;';
})

yoBtn.addEventListener('click', () =>{
    misMascotasTab.style = 'display:none;';
    yoTab.style = 'display:block;'
})

misMascotasBtn.addEventListener('click', () =>{
    yoTab.style = 'display:none;'
    misMascotasTab.style = 'display:block;';
})

function enviarAnchoWeb(){
    let ancho = document.documentElement.clientWidth;

    if (ancho >=751){
        sideMenu.style.display = 'block';
    }

}