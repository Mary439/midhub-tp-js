const divPrincipal = document.querySelector(".all_box");

// RADIO BUTTON
let filtrosPagina = document.querySelectorAll(".categorias input")
// evento que escucha si el boton fue clickeado
filtrosPagina.forEach(filtro => filtro.addEventListener('change',verificar))



// filtra data si el valor que le paso a la funcion cumple la condicion
function filtrarBotton(valor){
  let filtro = data.events.filter(elements => elements.category.toLowerCase() == valor.toLowerCase() && elements.date <= data.currentDate)

  console.log(filtro)
  return filtro 
  }
  // muestra la información de los elementos que cumplieron la condición
  function crearCards(arr){
    arr.forEach(item => {
      let seg_div = document.createElement('div');
      seg_div.classList.add('box');
      seg_div.style.width="500px";
      seg_div.style.height= "520px";
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
function limpiarHTML(value){
  divPrincipal.querySelectorAll('.box').forEach(card =>{
    if(card.id == value){
      divPrincipal.removeChild(card)
    }
  })
}

let listaElementos = []

function verificar(e){
  if(listaElementos.includes(e.target.value)){
    index = listaElementos.indexOf(e.target.value);
    listaElementos.splice(index, 1);    
    limpiarHTML(e.target.value)
  }else if(e.target.checked){
    listaElementos.push(e.target.value)
  }
  result = listaElementos.map(filtrarBotton)
  result.map(crearCards)
}

