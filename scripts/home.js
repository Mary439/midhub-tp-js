const divPrincipal = document.querySelector(".all_box");

// RADIO BUTTON
let filtrosPagina = document.querySelectorAll(".categorias input")
// evento que escucha si el boton fue clickeado
filtrosPagina.forEach(filtro => filtro.addEventListener('change',verificarSelect))

// filtra data si el valor que le paso a la funcion cumple la condicion
function filtrarBotton(valor){
  let filtro = data.events.filter(elements => elements.category.toLowerCase() == valor.toLowerCase())

  return filtro
  }

  // muestra la información de los elementos que cumplieron la condición
  function crearCards(arr){
    arr.forEach(item => {
      let seg_div = document.createElement('div');
      seg_div.classList.add('box');
      seg_div.style.height= "520px";
      seg_div.style.textAlign="center";
      seg_div.style.fontFamily="time new roman";

      img = document.createElement("img");
      img.src = item.image;
      seg_div.appendChild(img);

      title = document.createElement('h2');
      title.textContent = item.name;
      title.style.fontFamily="time new roman";
      title.style.margin="2px";
 
      seg_div.appendChild(img);
      seg_div.appendChild(title);
      
      divPrincipal.appendChild(seg_div)

    });
}
// funcion que llama a las restantes para verificar y traer los resultados
function verificarSelect(){

  let seleccionado = Array.from(filtrosPagina).filter(valor => valor.checked || valor.id == 'texto')[0]

  botonesFiltrados = filtrarBotton(seleccionado.value)
  crearCards(botonesFiltrados)
}

