let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(urlAPI).then(response => response.json())
.then(data =>{
  let events = data.events

let divPrincipal = document.querySelector(".all_box");
// inicializo lista vacia
let listaElementos = []

// const events = data.events
crearCards(events)


function extraerNombres(clases){
  let nombre = []
  clases.forEach(clase =>{
    if(!nombre.includes(clase.category)){
      nombre.push(clase.category)
    }
  })
  return nombre
}
const nombreEventos = extraerNombres(events)

// RADIO BUTTON dinamico 
function visualizarBotton(listaDeNombres){
  let inputsBotton = document.querySelectorAll(".categorias")[0]

  listaDeNombres.map(type => {
    let nuevoBoton = document.createElement('input')
    let nuevoLabel = document.createElement('label')
    nuevoBoton.setAttribute('type','checkbox')
    nuevoLabel.innerHTML = type

    nuevoBoton.setAttribute('name','category')
    nuevoBoton.setAttribute('class',type)
    nuevoBoton.setAttribute('id',type)
    nuevoBoton.setAttribute('value',type)

    inputsBotton.appendChild(nuevoBoton)
    inputsBotton.appendChild(nuevoLabel)

  })
}
visualizarBotton(nombreEventos)

// evento que escucha si el boton fue clickeado
let filtroCheckbox = document.querySelectorAll(".categorias input[type=checkbox]")

filtroCheckbox.forEach(filtro => filtro.addEventListener('change',pruebaFiltro))
// evento que escucha el si ingreso algo en el input del texto
let filtroTexto = document.querySelector(".categorias input[type=text]")

// valido el texto ingresado.
filtroTexto.addEventListener("change", (e) => {
  limpiarPantalla = document.querySelectorAll(".box")
  limpiarPantalla.forEach(e => e.remove())

  resultado = filtrarInfo(e.target.value)
  if (resultado.length === 0){
    elemento_warning = document.createElement('div');
    elemento_warning.classList.add('box')
    elemento_warning.textContent = 'No existe coincidecias'
    elemento_warning.style.height = '30px'
    elemento_warning.style.width = '40%'
    divPrincipal.appendChild(elemento_warning)
  }else{
    crearCards(resultado)
  }
});

function pruebaFiltro(entrada){
  // limpio toda la pantalla
  limpiarPantalla = document.querySelectorAll(".box")
  limpiarPantalla.forEach(e => e.remove())

  if(entrada.target.checked){
    // agrego nuevo elemento a la lista
    listaElementos.push(entrada.target.value)
  }else{
    // elimino elemento de la lista a mostrar
    index = listaElementos.indexOf(entrada.target.value);
    listaElementos.splice(index, 1);
  }

  if(listaElementos.length === 0){
    crearCards(events)
  }else{
    // traigo los elemento que interesan del array data
    resultado = listaElementos.map(filtrarInfo)
    // muestro el resultado 
    resultado.map(crearCards)
  }
  
}

// filtra data si el valor que le paso a la funcion cumple la condicion
function filtrarInfo(valor){
  let filtro = events.filter(elements => elements.category.toLowerCase() == valor.toLowerCase())
  return filtro
}
  // muestra la información de los elementos que cumplieron la condición
  function crearCards(arr){
    arr.forEach(item => {
      let seg_div = document.createElement('div');
      seg_div.classList.add('box');
      seg_div.style.width="400px";
      seg_div.style.height= "380px";
      seg_div.style.textAlign="center";
      seg_div.style.fontFamily="time new roman";

      seg_div.id = item.category
      img = document.createElement("img");
      img.src = item.image;

      title = document.createElement('h2');
      title.textContent = item.name;
      title.style.fontFamily="time new roman";
      title.style.margin="2px";

      verMas = document.createElement('a');
      verMas.innerHTML = '<a href="./Details.html?id=' + item._id + '">Ver Mas</a>';
  
      seg_div.appendChild(img);
      seg_div.appendChild(title);
      seg_div.appendChild(verMas);

      divPrincipal.appendChild(seg_div)
    });
}
})
try{ 
}catch (error) {
  console.log(error.message);
}
