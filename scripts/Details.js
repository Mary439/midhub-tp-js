console.log([document])
let query = location.search  
console.log(query)

let parametros = new URLSearchParams(query) 
console.log(parametros)

const id = parametros.get("id")

let resultado = data.events.find(valor => valor._id == id) 
console.log(resultado)


let categorias = document.querySelector(".all_box")

categorias.innerHTML =`<div class="box" style="display:inline; width:100%; height:900px ">
<img style="width: 60%; height:50%" src=${resultado.image}>
<h2 style="width: 100%" >${resultado.name}</h2>
<p style="margin: 15px; line-height: 1.5; text-align: center;"> Description: ${resultado.description}</p>
<p>date: ${resultado.date}</p>
<p>place: ${resultado.place}</p>
<p>capacity: ${resultado.capacity}</p>
<p>assistance: ${resultado.assistance}</p>
<p>price: ${resultado.price}</p>
<a href="./index.html">Volver</a>
</div>`