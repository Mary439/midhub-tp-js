let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(urlAPI).then(response => response.json())
.then(data =>{

let query = location.search  
console.log(query)

let parametros = new URLSearchParams(query) 
console.log(parametros)

const id = parametros.get("id")

let resultado = data.events.find(valor => valor._id == id) 
console.log(resultado)


let categorias = document.querySelector(".all_box")

categorias.innerHTML =`<div class="box" style="display:inline; width:80%; height:750px ">
<img style="width: 50%; height:40%" src=${resultado.image}>
<h2 style="width: 100%" >${resultado.name}</h2>
<p>Description: ${resultado.description}</p>
<p>Date: ${resultado.date}</p>
<p>Place: ${resultado.place}</p>
<p>Capacity: ${resultado.capacity}</p>
<p>Assistance: ${resultado.assistance}</p>
<p>Price: $ ${resultado.price}</p>
<a href="./index.html">Volver</a>
</div>`
})