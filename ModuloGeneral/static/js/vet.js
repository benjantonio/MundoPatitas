window.addEventListener('load', () => {
    obtenerVet()
        // var id = document.querySelectorAll(".idV")
        // id.forEach(i => {
        //     console.log(i.value)
        // });
    var inputPAss = document.querySelectorAll(".passwordVet")
    inputPAss.forEach(i => {
        i.addEventListener('blur', () => {
            comprobarClaves()
        })
    });
})

var id = document.querySelectorAll(".idV")
var inputPAss = document.querySelectorAll(".passwordVet")
var btns = document.querySelectorAll("#verMas")
var spans = document.querySelectorAll(".aviso")
var clave = []
const obtenerVet = async() => {
    for (let i = 0; i < id.length; i++) {
        try {
            res = await fetch(`http://localhost:3000/veterinario/${id[i].value}`),
                json = await res.json();

            if (!res.ok) throw { status: res.status, statusText: res.statusText }
            console.log(json.clave)


            clave.push(json.clave)


        } catch (error) {
            console.log(error)

        }

    }
    console.log(clave)
}

const comprobarClaves = () => {
    for (let i = 0; i < clave.length; i++) {
        if (inputPAss[i].value == clave[i]) {
            btns[i].removeAttribute("class");
            spans[i].style = 'display:none'
        } else {
            btns[i].setAttribute("class", "desahabilitado");
            spans[i].style = 'display:block'
        }
    }
}

// id.forEach(async i => {
//     try {
//         res = await fetch(`http://localhost:3000/veterinario/${i.value}`),
//             json = await res.json();

//         if (!res.ok) throw { status: res.status, statusText: res.statusText }


//         var clave = []
//         clave.push(json.clave)
//         console.log(clave)

//     } catch (error) {
//         console.log(error)

//     }

// inputPAss.forEach(p => {
//     p.addEventListener('blur', function() {
//         var claveP = p.value
//         console.log(claveP)
//         id.forEach(i => {
//             console.log("for " + clave)
//             if (i.value == claveP) {
//                 var boton = document.querySelector("#verMas")
//                 boton.removeAttribute("class");
//                 console.log("son iguales")
//             }
//         });

//     })
// })







// document.querySelector(".passwordVet").addEventListener('blur', () => {
//     var claveP = document.querySelector(".passwordVet").value
//     id.forEach(i => {
//         if (i.value == claveP) {
//             var boton = document.querySelector("#verMas")
//             boton.removeAttribute("class");
//             console.log("son iguales")
//         }
//     });

// })