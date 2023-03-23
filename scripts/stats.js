let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(urlAPI).then(response => response.json())
.then(data =>{
  let events = data.events
  eventoMayorMenorCapacidad = obtenerEventoMayorMenorCapacidad(events)
  let primeraTabla = document.querySelector(".primeraTabla");
  loadPrimeraTabla(eventoMayorMenorCapacidad, primeraTabla)
  
   // upcoming
  let segundaTabla = document.querySelector(".segundaTabla");
  filtroUpcoming = data.events.filter(element => element.date >= data.currentDate)
  infoUpcoming = obtenerDatos(filtroUpcoming, 'upcoming')
  loadTabla(infoUpcoming, segundaTabla)

  // pastEvents 
  let terceraTabla = document.querySelector(".terceraTabla");
  filtroPas = data.events.filter(element => element.date < data.currentDate)
  infoPast = obtenerDatos(filtroPas, 'past')
  loadTabla(infoPast, terceraTabla)


})

function obtenerEventoMayorMenorCapacidad(dato){
    diccionario = {}
    capMayor = 0
    mayor = 0
    datoInicial = dato[0]
    menor = (datoInicial['assistance'] * 100)/datoInicial['capacity']

    dato.forEach(element => {
        cap = element.capacity;
        prom = (element.assistance  * 100)/ element.capacity;

        if (capMayor < cap){
            capMayor = cap
            capNombre = element.name;
        }
        if (mayor < prom){
            mayor = prom
            nombreMayor = element.name;
        }else if (menor >= prom){
            menor = prom
            nombreMenor = element.name;
        }

    });
    diccionario['mayor'] = [nombreMayor, mayor]
    diccionario['menor'] = [nombreMenor, menor]
    diccionario['capacidad'] = [capNombre, capMayor]

    return diccionario
}


function loadPrimeraTabla(datoEventos, tabla) {
    let tableBodyHTML = "<tr></tr>";
    Object.keys(datoEventos).forEach(valor =>
        tableBodyHTML += `
        <td>${datoEventos[valor][0]}: ${datoEventos[valor][1]}</td>
    `);
    tabla.innerHTML = tableBodyHTML

}
function loadTabla(datoEventos, tabla) {
    let tableBodyHTML = "";
    Object.keys(datoEventos).forEach(valor =>
        tableBodyHTML += `<tr>
        <td>${valor}</td>
        <td>$ ${datoEventos[valor]['revenue']}</td>
        <td>${datoEventos[valor]['atendance']}%</td>
        </tr>`);
    tabla.innerHTML = tableBodyHTML

}


function obtenerDatos(filtro, time){
    listaEventos = [] 
    dicEventos = {}
    
    filtro.forEach(element => {
        if (dicEventos[element.category] == undefined){
            dicEventos[element.category]= {
                'price': element.price,
                'capacity': element.capacity, 
                'estimate': element.estimate,
                'assistance': element.assistance,
                
                'revenue_upcoming': element.estimate * element.price,
                'revenue_past': element.assistance * element.price,
            }
        }else{
            dicEventos[element.category]['price'] += element.price
            dicEventos[element.category]['capacity'] += element.capacity
            dicEventos[element.category]['estimate'] += element.estimate
            dicEventos[element.category]['assistance'] += element.assistance
            dicEventos[element.category]['revenue_upcoming'] += element.estimate * element.price
            dicEventos[element.category]['revenue_past'] += element.assistance * element.price

        }

    })
    Object.keys(dicEventos).forEach(element =>{
        if (time === 'past'){
            dicEventos[element]['atendance']= (dicEventos[element]['assistance'] * 100) / dicEventos[element]['capacity']
            dicEventos[element]['revenue'] = dicEventos[element]['revenue_past']
        }else if(time === 'upcoming'){
            dicEventos[element]['atendance']= (dicEventos[element]['estimate'] * 100) / dicEventos[element]['capacity']
            dicEventos[element]['revenue'] = dicEventos[element]['revenue_upcoming']

        }
    })
    return dicEventos
}
