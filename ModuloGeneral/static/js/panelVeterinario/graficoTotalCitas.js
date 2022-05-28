// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myAreaChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [{
      label: "Citas Realizadas",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 12
        }
      }],
      yAxes: [{
        ticks: {

          maxTicksLimit: 12
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});





/*
const mostrar = (datos) =>{
  datos.forEach(element => {
    myAreaChart.data['datasets'][0].data.push(element.id_veterinario_id)
  }); */

  var calculoFinal;
/* Llamo a la API */
let url = `http://localhost:3000/citas_concluidas/${1}`
fetch(url)
  .then(response => response.json())
  .then(datos => mostrar(datos))
  .catch(error => console.log(error))

const mostrar = (datos) => {
  let enero = 0;
  let febrero = 0;
  let marzo = 0;
  let abril = 0;
  let mayo = 0;
  let junio = 0;
  let julio = 0;
  let agosto = 0;
  let septiembre = 0;
  let octubre = 0;
  let noviembre = 0;
  let diciembre = 0;

  /* Recorro la API con las citas del veterinario logeado */
  datos.forEach(element => {
    if (element.fecha.slice(3) == "01-2022") {
      enero++;
    } else if (element.fecha.slice(3) == "02-2022") {
      febrero++;
    } else if (element.fecha.slice(3) == "03-2022") {
      marzo++;
    } else if (element.fecha.slice(3) == "04-2022") {
      abril++;
    } else if (element.fecha.slice(3) == "05-2022") {
      mayo++;
    } else if (element.fecha.slice(3) == "06-2022") {
      junio++;
    } else if (element.fecha.slice(3) == "07-2022") {
      julio++;
    } else if (element.fecha.slice(3) == "08-2022") {
      agosto++;
    } else if (element.fecha.slice(3) == "09-2022") {
      septiembre++;
    } else if (element.fecha.slice(3) == "10-2022") {
      octubre++;
    } else if (element.fecha.slice(3) == "11-2022") {
      noviembre++;
    } else if (element.fecha.slice(3) == "12-2022") {
      diciembre++;
    }
  });

  myAreaChart.data['datasets'][0].data.push(enero)
  myAreaChart.data['datasets'][0].data.push(febrero)
  myAreaChart.data['datasets'][0].data.push(marzo)
  myAreaChart.data['datasets'][0].data.push(abril)
  myAreaChart.data['datasets'][0].data.push(mayo)
  myAreaChart.data['datasets'][0].data.push(junio)
  myAreaChart.data['datasets'][0].data.push(julio)
  myAreaChart.data['datasets'][0].data.push(agosto)
  myAreaChart.data['datasets'][0].data.push(septiembre)
  myAreaChart.data['datasets'][0].data.push(octubre)
  myAreaChart.data['datasets'][0].data.push(noviembre)
  myAreaChart.data['datasets'][0].data.push(diciembre)

   update(); //actualizo el grafico
   
}

//función para actualizar el grafico
function update(){
  myAreaChart.update();
}


