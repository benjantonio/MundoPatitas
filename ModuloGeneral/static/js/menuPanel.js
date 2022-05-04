const sideMenu = document.querySelector("aside");
const misMascotasTab = document.querySelector("#tabMisMascotas")
const yoTab = document.querySelector("#tabYo")

const yoTabVet = document.querySelector("#tabYoCen")
const VeterinarioTab = document.querySelector("#tabVeterinarios")
const btnYoCen = document.querySelector("#yoCen-btn")
const btnMisVeterinarios = document.querySelector("#misVeterinarios-btn")

const menuBtnCli = document.querySelector("#menu-btncli");
const closeBtnCli = document.querySelector("#close-btncli");
const yoBtn = document.querySelector("#yo-btn")
const misMascotasBtn = document.querySelector("#misMascotas-btn")

menuBtnCli.addEventListener('click', () => {
    sideMenu.style = 'display:block;';
});

closeBtnCli.addEventListener('click', () => {
    sideMenu.style = 'display:none;';
});

yoBtn.addEventListener('click', () => {
    misMascotasTab.style = 'display:none;';
    yoTab.style = 'display:block;'
});

btnYoCen.addEventListener('click', () => {
    VeterinarioTab.style = 'display:none;';
    yoTabVet.style = 'display:block;'
});

misMascotasBtn.addEventListener('click', () => {
    yoTab.style = 'display:none;'
    misMascotasTab.style = 'display:block;';
});

btnMisVeterinarios.addEventListener('click', () => {
    yoTabVet.style = 'display:none;'
    VeterinarioTab.style = 'display:block;';
});

function enviarAnchoWeb() {
    let ancho = document.documentElement.clientWidth;

    if (ancho >= 751) {
        console.log("ANCHO ES MAYOR A 750")
        sideMenu.style.display = 'block';
    }

}