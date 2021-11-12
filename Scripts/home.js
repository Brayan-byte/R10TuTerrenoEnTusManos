function esperarbasedeDatos() {
  return new Promise(subido => {
    setTimeout(() => {
      userId = verUsuario();
      subido('subido');
    }, 1500);
  });
}

var userId;
var terrainid;
var terrenoID;
const buy_button = document.getElementById("Buy");
buy_button.addEventListener('click',buy_terrain);

const cita_button = document.getElementById("Cita");
cita_button.addEventListener('click', apartarcita);

window.onload = async function(){
  verAutenticacion();

  getFirestore();
  await esperarbasedeDatos();
  
  console.log(userId);
  
  
}




function renderTerrain(datos){
  
  let ul= document.createElement("ul");
  let li= document.createElement("li");
  let name = document.createElement("li");
  let descriptionTitle = document.createElement("li");
  let description = document.createElement("li");
  let priceTitle = document.createElement("li");
  let price = document.createElement("li");
  let ubicationTitle = document.createElement("li");
  let ubication= document.createElement("li");
  let image = document.createElement("img");
  let button_select = document.createElement("button");

  ul.setAttribute('class',datos.id);
  image.setAttribute('src', datos.imagen);
  button_select.setAttribute('id', datos.id);
  button_select.setAttribute('class', "button_select");
  button_select.addEventListener('click',button_id);
  button_select.textContent = "Select";
  name.textContent = datos.Nombre;
  name.setAttribute('class',"Titulo");
  descriptionTitle.textContent = "Descripción:";
  descriptionTitle.setAttribute('class', "descriptionTitle");
  description.textContent =datos.Descripcion;
  priceTitle.textContent = "Precio: "
  priceTitle.setAttribute('class', "priceTitle");
  price.textContent =datos.Precio;
  ubicationTitle.textContent = "Ubicación: ";
  ubicationTitle.setAttribute('class', "ubicationTitle");
  ubication.textContent = datos.Ubicacion;
  

  ul.appendChild(li.appendChild(name));
  ul.appendChild(li.appendChild(descriptionTitle));
  ul.appendChild(li.appendChild(description));
  ul.appendChild(li.appendChild(priceTitle));
  ul.appendChild(li.appendChild(price));
  ul.appendChild(li.appendChild(ubicationTitle));
  ul.appendChild(li.appendChild(ubication));
  ul.appendChild(li.appendChild(image));
  ul.appendChild(li.appendChild(button_select));


  document.getElementById("terrain-list").appendChild(ul);

}
function getFirestore(){
  var db = firebase.firestore();
  db.collection("Terrenos").get().then((snapshot) => {
    snapshot.forEach(doc =>{
      terrenoID = doc.id;
      if(doc.data().vendido == false){
        renderTerrain(doc.data());
      }
      
    })

});
}

function button_id(){
  terrainid = this.id;
  alert("Terreno Seleccionado!");
}

function apartarcita(){
  var date = new Date();
  var day = date.getDate()+2;
  var month = date.getMonth()+1;
  var year = date.getFullYear();
  alert("Tu cita esta lista para la sig fecha: "+ day + "/" + month + "/" + year );
}
function buy_terrain(){

  alert("Terreno comprado exitosamente, acerquese a oficinas para un asesoramiento");
  
}

